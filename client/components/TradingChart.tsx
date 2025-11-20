import { useState, useEffect } from "react";
import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Bar,
  Area,
  Customized,
} from "recharts";

interface ChartData {
  time: string;
  open?: number;
  high?: number;
  low?: number;
  close?: number;
  price?: number; // alias for close
  volume: number;
}

interface ChartResponse {
  symbol: string;
  data: ChartData[];
  current: number;
  change: number;
  changePercent: number;
}

export default function TradingChart() {
  const defaultSymbols = [
    "HABIB",
    "NBP",
    "UBL",
    "ENGRO",
    "LUCK",
    "PPL",
    "OGDC",
    "DCCI",
    "PTCL",
    "ZONG",
  ];
  const [selectedSymbol, setSelectedSymbol] = useState<string>(
    defaultSymbols[0],
  );
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [current, setCurrent] = useState(0);
  const [change, setChange] = useState(0);
  const [changePercent, setChangePercent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<string>("");

  useEffect(() => {
    const trackedSymbols = defaultSymbols.slice();
    let currentIndex = trackedSymbols.indexOf(selectedSymbol.toUpperCase());
    if (currentIndex === -1) currentIndex = 0;
    let cycleTimer: any = null;
    let pollingInterval: any = null;

    const fetchForSymbol = async (symbol: string) => {
      try {
        const sym = String(symbol || "").toUpperCase();
        setSelectedSymbol(sym);
        setLoading(true);
        // Try Alpha Vantage chart via proxy
        const resp = await fetch(
          `/api/av/chart?symbol=${encodeURIComponent(symbol)}&interval=60min`,
        );
        if (resp.ok) {
          const data: ChartResponse = await resp.json();
          if (data && Array.isArray(data.data) && data.data.length) {
            setChartData(data.data);
            setCurrent(data.current);
            setChange(data.change);
            setChangePercent(data.changePercent);
            setLastUpdate(new Date().toLocaleTimeString());
            setLoading(false);
            return true;
          }
        }

        // Fallback: try server-generated chart for symbol
        const fallback = await (
          await fetch(`/api/chart?symbol=${encodeURIComponent(symbol)}`)
        ).json();
        if (fallback && Array.isArray(fallback.data) && fallback.data.length) {
          setChartData(fallback.data);
          setCurrent(fallback.current);
          setChange(fallback.change);
          setChangePercent(fallback.changePercent);
          setLastUpdate(new Date().toLocaleTimeString());
          setLoading(false);
          return true;
        }

        // Try Alpha Vantage global quote to synthesize intraday series
        try {
          const qresp = await fetch(
            `/api/av/quotes?symbols=${encodeURIComponent(symbol)}`,
          );
          if (qresp.ok) {
            const qjson = await qresp.json();
            const quote = Array.isArray(qjson.quotes) ? qjson.quotes[0] : null;
            const base = quote && quote.price ? Number(quote.price) : null;
            if (base && !isNaN(base)) {
              const generated: ChartData[] = [];
              let cp = base;
              const now = Date.now();
              // create 60 points (last 60 minutes)
              for (let i = 0; i < 60; i++) {
                const t = new Date(now - (59 - i) * 60 * 1000);
                generated.push({
                  time: t.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                  price: parseFloat(cp.toFixed(2)),
                  volume: Math.floor(Math.random() * 100000) + 1000,
                });
                cp = cp * (1 + (Math.random() - 0.5) * 0.002);
              }

              const cur = generated[generated.length - 1].price;
              const prev = generated[0].price;
              const ch = parseFloat((cur - prev).toFixed(2));
              const chp = prev ? parseFloat(((ch / prev) * 100).toFixed(2)) : 0;

              setChartData(generated);
              setCurrent(cur);
              setChange(ch);
              setChangePercent(chp);
              setLastUpdate(new Date().toLocaleTimeString());
              setLoading(false);
              return true;
            }
          }
        } catch (e) {
          // ignore
        }

        // No data; still update selected symbol so header reflects user choice
        setSelectedSymbol(sym);
        setLoading(false);
        return false;
      } catch (err) {
        console.error("Error fetching chart for", symbol, err);
        setLoading(false);
        return false;
      }
    };

    const startCycle = () => {
      // Immediately fetch currentIndex symbol
      fetchForSymbol(trackedSymbols[currentIndex]);

      cycleTimer = setInterval(
        async () => {
          currentIndex = (currentIndex + 1) % trackedSymbols.length;
          await fetchForSymbol(trackedSymbols[currentIndex]);
        },
        5 * 60 * 1000,
      ); // 5 minutes
    };

    startCycle();

    // Polling for current symbol every 5 seconds to update live chart data for visible symbol
    pollingInterval = setInterval(async () => {
      // refresh currently displayed symbol
      const visibleSymbol = trackedSymbols[currentIndex];
      await fetchForSymbol(visibleSymbol);
    }, 5000);

    // Listen for user selection
    const onSelect = async (e: any) => {
      const symbol = e?.detail;
      if (!symbol) return;
      // Find index in trackedSymbols, if not present add it
      const idx = trackedSymbols.indexOf(symbol.toUpperCase());
      if (idx >= 0) currentIndex = idx;
      else {
        trackedSymbols.push(symbol.toUpperCase());
        currentIndex = trackedSymbols.length - 1;
      }

      // fetch immediately
      await fetchForSymbol(symbol);

      // reset cycle timer so next auto switch occurs after 5 minutes
      if (cycleTimer) clearInterval(cycleTimer);
      cycleTimer = setInterval(
        async () => {
          currentIndex = (currentIndex + 1) % trackedSymbols.length;
          await fetchForSymbol(trackedSymbols[currentIndex]);
        },
        5 * 60 * 1000,
      );
    };

    window.addEventListener("select-asset", onSelect as EventListener);

    return () => {
      if (cycleTimer) clearInterval(cycleTimer);
      if (pollingInterval) clearInterval(pollingInterval);
      window.removeEventListener("select-asset", onSelect as EventListener);
    };
  }, []);

  if (loading) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 animate-pulse">
        <div className="h-8 bg-slate-700 rounded mb-4 w-32" />
        <div className="h-64 bg-slate-700 rounded" />
      </div>
    );
  }

  // compute SMA(10) and prepare chart data with sma
  const prices = chartData
    .map((d) => Number(d.close ?? d.price))
    .filter((p) => !isNaN(p));
  const minPrice = prices.length ? Math.min(...prices) : 0;
  const maxPrice = prices.length ? Math.max(...prices) : 0;

  const computeSMA = (arr: number[], windowSize: number) => {
    const res: (number | null)[] = [];
    for (let i = 0; i < arr.length; i++) {
      if (i < windowSize - 1) {
        res.push(null);
      } else {
        const slice = arr.slice(i - windowSize + 1, i + 1);
        const avg = slice.reduce((a, b) => a + b, 0) / windowSize;
        res.push(Number(avg.toFixed(2)));
      }
    }
    return res;
  };

  const pricesForSMA = chartData.map((d) => Number(d.close ?? d.price));
  const sma10 = computeSMA(pricesForSMA, 10);
  const chartWithSMA = chartData.map((d, i) => ({
    ...d,
    price: Number(d.close ?? d.price),
    sma10: sma10[i] ?? undefined,
  }));

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 w-full">
      <div className="mb-6">
        <div className="flex items-end justify-between mb-2">
          <h3 className="text-2xl font-bold text-white">{selectedSymbol}</h3>
          <div className="text-right">
            <div className="text-3xl font-bold text-white">
              {Number(current || 0).toFixed(2)}
            </div>
            <div
              className={`text-lg font-semibold ${
                (change || 0) >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {(change || 0) >= 0 ? "+" : ""}
              {Number(change || 0).toFixed(2)} (
              {Number(changePercent || 0).toFixed(2)}%)
            </div>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={360}>
        <ComposedChart
          data={chartWithSMA}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
          <XAxis dataKey="time" stroke="#94a3b8" style={{ fontSize: "12px" }} />
          <YAxis
            yAxisId="left"
            domain={[minPrice * 0.99 || 0, maxPrice * 1.01 || 1]}
            stroke="#94a3b8"
            style={{ fontSize: "12px" }}
          />
          <YAxis yAxisId="right" orientation="right" hide />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "1px solid #475569",
              borderRadius: "8px",
              padding: "8px 12px",
            }}
            labelStyle={{ color: "#e2e8f0" }}
            formatter={(value, name) => {
              if (name === "volume")
                return [Number(value).toLocaleString(), "Volume"];
              return [`₨${Number(value).toFixed(2)}`, "Price"];
            }}
          />

          {/* Area for price with subtle fill */}
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="price"
            strokeWidth={0}
            fill={change >= 0 ? "rgba(34,197,94,0.08)" : "rgba(239,68,68,0.08)"}
          />

          {/* Price line */}
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="price"
            stroke={change >= 0 ? "#22c55e" : "#ef4444"}
            strokeWidth={2}
            dot={false}
            isAnimationActive={true}
          />

          {/* Simple moving average (10) */}
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="sma10"
            stroke="#60a5fa"
            strokeWidth={1}
            dot={false}
            strokeDasharray="4 4"
            isAnimationActive={false}
          />

          {/* Volume bars */}
          <Bar yAxisId="right" dataKey="volume" barSize={20} fill="#94a3b8" />

          {/* Custom candlestick renderer using SVG inside Customized */}
          <Customized
            component={(props: any) => {
              try {
                const { width, height, offset, chartWidth, chartHeight } =
                  props;
                const plotWidth =
                  (typeof chartWidth === "number" ? chartWidth : width) -
                  (offset?.left || 0) -
                  (offset?.right || 0);
                const plotHeight =
                  (typeof chartHeight === "number" ? chartHeight : height) -
                  (offset?.top || 0) -
                  (offset?.bottom || 0);
                const left = offset?.left || 0;
                const top = offset?.top || 0;
                const dataArr = Array.isArray(chartWithSMA) ? chartWithSMA : [];

                if (
                  !dataArr.length ||
                  !Number.isFinite(plotWidth) ||
                  !Number.isFinite(plotHeight) ||
                  plotWidth <= 0 ||
                  plotHeight <= 0
                )
                  return null;

                const step = plotWidth / Math.max(1, dataArr.length);
                const candleWidth = Math.max(4, step * 0.6);

                const safeMin = Number.isFinite(minPrice) ? minPrice : 0;
                const safeMax = Number.isFinite(maxPrice)
                  ? maxPrice
                  : safeMin + 1;
                const range = safeMax - safeMin;

                const yFor = (price: number) => {
                  const p = Number(price);
                  if (!Number.isFinite(p) || range === 0)
                    return top + plotHeight / 2;
                  return top + ((safeMax - p) / range) * plotHeight;
                };

                return (
                  <g>
                    {dataArr.map((d: any, i: number) => {
                      const x = left + i * step + step / 2;

                      if (!Number.isFinite(x)) return null;

                      const o = Number(d.open ?? d.price ?? d.close ?? NaN);
                      const c = Number(d.close ?? d.price ?? o);
                      const h = Number(d.high ?? Math.max(o || 0, c || 0));
                      const l = Number(d.low ?? Math.min(o || 0, c || 0));

                      if (![o, c, h, l].every(Number.isFinite)) return null;

                      const yHigh = yFor(h);
                      const yLow = yFor(l);
                      const yOpen = yFor(o);
                      const yClose = yFor(c);

                      if (![yHigh, yLow, yOpen, yClose].every(Number.isFinite))
                        return null;

                      const rectY = Math.min(yOpen, yClose);
                      const rectH = Math.max(1, Math.abs(yClose - yOpen));
                      const color = c >= o ? "#22c55e" : "#ef4444";

                      const rectX = Number.isFinite(candleWidth)
                        ? x - candleWidth / 2
                        : x - 2;

                      return (
                        <g key={`candle-${i}`}>
                          {/* high-low line */}
                          <line
                            x1={x}
                            x2={x}
                            y1={yHigh}
                            y2={yLow}
                            stroke={color}
                            strokeWidth={1}
                          />
                          {/* open-close rect */}
                          <rect
                            x={rectX}
                            y={rectY}
                            width={
                              Number.isFinite(candleWidth) ? candleWidth : 4
                            }
                            height={rectH}
                            fill={color}
                          />
                        </g>
                      );
                    })}
                  </g>
                );
              } catch (e) {
                return null;
              }
            }}
          />
        </ComposedChart>
      </ResponsiveContainer>

      <div className="mt-6 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-slate-400 text-xs mb-1">High</p>
          <p className="text-white font-semibold">{maxPrice.toFixed(0)}</p>
        </div>
        <div>
          <p className="text-slate-400 text-xs mb-1">Low</p>
          <p className="text-white font-semibold">{minPrice.toFixed(0)}</p>
        </div>
        <div>
          <p className="text-slate-400 text-xs mb-1">Range</p>
          <p className="text-white font-semibold">
            {(maxPrice - minPrice).toFixed(0)}
          </p>
        </div>
      </div>

      <div className="mt-4 text-xs text-slate-400 text-center">
        Last updated: {lastUpdate}
      </div>
    </div>
  );
}
