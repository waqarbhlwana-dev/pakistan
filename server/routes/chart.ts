import { RequestHandler } from "express";

interface ChartDataPoint {
  time: string;
  price: number;
  volume: number;
}

interface ChartResponse {
  symbol: string;
  data: ChartDataPoint[];
  current: number;
  change: number;
  changePercent: number;
}

export const handleGetChart: RequestHandler = async (req, res) => {
  try {
    const symbol = (req.query.symbol as string) || "KSE";

    // Generate mock intraday chart data
    const generateChartData = (basePrice: number): ChartDataPoint[] => {
      const data: ChartDataPoint[] = [];
      let currentPrice = basePrice;

      const now = new Date();
      for (let i = 0; i < 24; i++) {
        // create timestamps for past 24 hours
        const d = new Date(now.getTime() - (23 - i) * 60 * 60 * 1000);
        const display = d.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        data.push({
          time: display,
          price: currentPrice,
          volume: Math.floor(Math.random() * 100000) + 50000,
        });

        // Simulate price movement
        currentPrice = currentPrice * (1 + (Math.random() - 0.5) * 0.01);
      }

      return data;
    };

    // Symbol-based base prices (KSE mapped to PSX index level)
    const basePrices: Record<string, number> = {
      PSX: 65000,
      KSE: 65000,
      HABIB: 87.45,
      NBP: 65.2,
      UBL: 542.8,
      ENGRO: 385.75,
      LUCK: 618.9,
      PPL: 145.3,
      OGDC: 205.6,
      DCCI: 875.2,
      PTCL: 32.45,
      ZONG: 8.65,
      MAPLE: 45.8,
      SIEMENS: 5280.5,
      PIA: 12.3,
      ICI: 2245.8,
    };

    const basePrice = basePrices[symbol.toUpperCase()] || 50000;
    const chartData = generateChartData(basePrice);
    const currentPrice = chartData[chartData.length - 1]?.price || basePrice;
    const previousPrice = chartData[0]?.price || basePrice;
    const change = currentPrice - previousPrice;
    const changePercent = parseFloat(
      ((change / previousPrice) * 100).toFixed(2),
    );

    const response: ChartResponse = {
      symbol,
      data: chartData,
      current: parseFloat(currentPrice.toFixed(2)),
      change: parseFloat(change.toFixed(2)),
      changePercent,
    };

    res.json(response);
  } catch (error) {
    console.error("Error fetching chart data:", error);
    res.status(500).json({ error: "Failed to fetch chart data" });
  }
};
