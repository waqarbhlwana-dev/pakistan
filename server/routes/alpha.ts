import { RequestHandler } from "express";

const API_KEY = process.env.MARKET_API_KEY || "";
const CACHE_TTL = 30 * 1000; // 30 seconds

interface QuoteCacheItem {
  value: any;
  expiresAt: number;
}

const quoteCache = new Map<string, QuoteCacheItem>();

function setCache(key: string, value: any, ttl = CACHE_TTL) {
  quoteCache.set(key, { value, expiresAt: Date.now() + ttl });
}

function getCache(key: string) {
  const item = quoteCache.get(key);
  if (!item) return null;
  if (Date.now() > item.expiresAt) {
    quoteCache.delete(key);
    return null;
  }
  return item.value;
}

// GET /api/av/quotes?symbols=SYM1,SYM2
export const handleGetQuotes: RequestHandler = async (req, res) => {
  try {
    const symbolsParam = (req.query.symbols as string) || "";
    const symbols = symbolsParam
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (!symbols.length)
      return res.status(400).json({ error: "No symbols provided" });
    if (!API_KEY)
      return res.status(500).json({ error: "Server missing API key" });

    const results: any[] = [];

    for (const symbol of symbols) {
      const cacheKey = `quote:${symbol}`;
      const cached = getCache(cacheKey);
      if (cached) {
        results.push(cached);
        continue;
      }

      // Fetch single global quote
      const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${encodeURIComponent(
        symbol,
      )}&apikey=${API_KEY}`;

      const resp = await fetch(url);
      if (!resp.ok) {
        // push null item with error
        results.push({ symbol, error: `Upstream ${resp.status}` });
        continue;
      }

      const json = await resp.json();
      const gq = json["Global Quote"] || json["Global_quote"] || {};

      const mapped = {
        symbol,
        price: gq["05. price"] ? Number(gq["05. price"]) : null,
        change: gq["09. change"] ? Number(gq["09. change"]) : null,
        changePercent: gq["10. change percent"]
          ? parseFloat((gq["10. change percent"] + "").replace("%", ""))
          : null,
        high: gq["03. high"] ? Number(gq["03. high"]) : null,
        low: gq["04. low"] ? Number(gq["04. low"]) : null,
        volume: gq["06. volume"] ? Number(gq["06. volume"]) : null,
        raw: gq,
      };

      setCache(cacheKey, mapped);
      results.push(mapped);

      // Respect free-tier rate limits roughly
      await new Promise((r) => setTimeout(r, 1200));
    }

    return res.json({ quotes: results, timestamp: new Date().toISOString() });
  } catch (error) {
    console.error("Alpha quotes error:", error);
    return res.status(500).json({ error: "Internal error" });
  }
};

// GET /api/av/chart?symbol=SYM&interval=60min
export const handleGetChart: RequestHandler = async (req, res) => {
  try {
    const symbol = (req.query.symbol as string) || "PSX";
    const interval = (req.query.interval as string) || "60min";

    if (!API_KEY)
      return res.status(500).json({ error: "Server missing API key" });

    const cacheKey = `chart:${symbol}:${interval}`;
    const cached = getCache(cacheKey);
    if (cached) return res.json(cached);

    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${encodeURIComponent(
      symbol,
    )}&interval=${encodeURIComponent(interval)}&outputsize=compact&apikey=${API_KEY}`;

    const resp = await fetch(url);
    if (!resp.ok)
      return res.status(502).json({ error: `Upstream error: ${resp.status}` });

    const json = await resp.json();
    // The API returns a key like "Time Series (60min)"
    const seriesKey = Object.keys(json).find((k) => /Time Series/i.test(k));
    const series = seriesKey ? (json as any)[seriesKey] : null;

    if (!series) return res.status(500).json({ error: "No time series data" });

    const data: {
      time: string;
      open: number;
      high: number;
      low: number;
      close: number;
      volume: number;
    }[] = Object.keys(series)
      .map((time) => ({
        time,
        open: Number(series[time]["1. open"]),
        high: Number(series[time]["2. high"]),
        low: Number(series[time]["3. low"]),
        close: Number(series[time]["4. close"]),
        volume: Number(series[time]["5. volume"]) || 0,
      }))
      .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())
      .map((d) => ({
        time: new Date(d.time).toLocaleTimeString(),
        open: d.open,
        high: d.high,
        low: d.low,
        close: d.close,
        volume: d.volume,
      }));

    const current = data[data.length - 1]?.close || 0;
    const previous = data[0]?.close || current;
    const change = parseFloat((current - previous).toFixed(2));
    const changePercent = previous
      ? parseFloat(((change / previous) * 100).toFixed(2))
      : 0;

    const result = { symbol, data, current, change, changePercent };
    setCache(cacheKey, result, 60 * 1000); // cache 60s

    return res.json(result);
  } catch (error) {
    console.error("Alpha chart error:", error);
    return res.status(500).json({ error: "Internal error" });
  }
};
