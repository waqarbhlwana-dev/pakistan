import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MarqueeStock {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

export default function MarqueeWidget() {
  const [stocks, setStocks] = useState<MarqueeStock[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch stocks data from Alpha Vantage via server proxy
    const fetchStocks = async () => {
      try {
        // Default tracked symbols
        const symbols = [
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
        const response = await fetch(
          `/api/av/quotes?symbols=${symbols.join(",")}`,
        );
        try {
          if (response.ok) {
            const data = await response.json();
            const normalized = (data.quotes || []).map((q: any) => ({
              symbol: q.symbol,
              price:
                q.price != null && !isNaN(Number(q.price))
                  ? Number(q.price)
                  : null,
              change:
                q.change != null && !isNaN(Number(q.change))
                  ? Number(q.change)
                  : null,
              changePercent:
                q.changePercent != null && !isNaN(Number(q.changePercent))
                  ? Number(q.changePercent)
                  : null,
            }));

            const hasValid = normalized.some(
              (s: any) => s.price != null && s.price > 0,
            );
            if (!hasValid) {
              console.warn(
                "Alpha Vantage returned no valid prices, falling back to mocks",
              );
              const fallback = await (await fetch("/api/stocks")).json();
              const formattedStocks = fallback.stocks.map((stock: any) => ({
                symbol: stock.symbol,
                price: stock.price,
                change: stock.change,
                changePercent: stock.changePercent,
              }));
              setStocks(formattedStocks);
            } else {
              setStocks(
                normalized.map((s: any) => ({
                  symbol: s.symbol,
                  price: s.price ?? 0,
                  change: s.change ?? 0,
                  changePercent: s.changePercent ?? 0,
                })),
              );
            }
          } else {
            console.warn("Alpha Vantage quotes failed, falling back to mocks");
            const fallback = await (await fetch("/api/stocks")).json();
            setStocks(
              fallback.stocks.map((stock: any) => ({
                symbol: stock.symbol,
                price: stock.price,
                change: stock.change,
                changePercent: stock.changePercent,
              })),
            );
          }
        } catch (err) {
          console.warn(
            "Network error fetching Alpha quotes, using local mocks",
            err,
          );
          try {
            // Try local fallback data
            const fallbackResp = await fetch("/api/stocks");
            if (fallbackResp.ok) {
              const fallback = await fallbackResp.json();
              setStocks(
                fallback.stocks.map((stock: any) => ({
                  symbol: stock.symbol,
                  price: stock.price,
                  change: stock.change,
                  changePercent: stock.changePercent,
                })),
              );
            } else {
              console.error(
                "Local fallback /api/stocks returned non-ok status",
                fallbackResp.status,
              );
              setStocks([]);
            }
          } catch (e) {
            console.error("Fallback fetch failed:", e);
            setStocks([]);
          }
        }

        setLoading(false);
      } catch (error) {
        // Final fallback: network-level failure (e.g. server down or CORS). Use local mock if possible and avoid throwing.
        console.error("Error fetching stocks:", error);
        try {
          const fallbackResp = await fetch("/api/stocks");
          if (fallbackResp.ok) {
            const fallback = await fallbackResp.json();
            setStocks(
              fallback.stocks.map((stock: any) => ({
                symbol: stock.symbol,
                price: stock.price,
                change: stock.change,
                changePercent: stock.changePercent,
              })),
            );
          } else {
            setStocks([]);
          }
        } catch (e) {
          console.error("Fallback fetch failed in outer catch:", e);
          setStocks([]);
        }

        setLoading(false);
      }
    };

    fetchStocks();

    // Set up real-time polling with safer interval (update every 10 seconds)
    const interval = setInterval(fetchStocks, 10000);

    return () => clearInterval(interval);
  }, []);

  if (loading || stocks.length === 0) {
    return (
      <div className="w-full bg-slate-800 border-b border-slate-700 py-3 overflow-hidden">
        <div className="text-center py-2 text-slate-400">
          Loading market data...
        </div>
      </div>
    );
  }

  // Faster marquee: lower base and multiplier so items scroll quicker
  const durationSeconds = Math.max(6, Math.floor(8 + stocks.length * 0.6));

  return (
    <div className="w-full bg-slate-800 border-b border-slate-700 py-3 overflow-hidden">
      <div
        className="flex animate-marquee gap-8 px-4"
        style={{ ["--marquee-duration" as any]: `${durationSeconds}s` }}
      >
        {[...stocks, ...stocks].map((stock, index) => (
          <div
            key={index}
            onClick={() =>
              window.dispatchEvent(
                new CustomEvent("select-asset", { detail: stock.symbol }),
              )
            }
            className="flex-shrink-0 flex items-center gap-3 whitespace-nowrap cursor-pointer"
          >
            <span className="font-bold text-sm text-white w-16">
              {stock.symbol}
            </span>
            <span className="text-slate-300 text-sm">
              ₨{(stock.price ?? 0).toFixed(2)}
            </span>
            <div
              className={`flex items-center gap-1 text-sm font-semibold ${
                (stock.change ?? 0) >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {(stock.change ?? 0) >= 0 ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {(stock.change ?? 0) >= 0 ? "+" : ""}
              {Number(stock.change ?? 0).toFixed(2)} (
              {Number(stock.changePercent ?? 0).toFixed(2)}%)
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee var(--marquee-duration, 20s) linear infinite;
        }

        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
