import { RequestHandler } from "express";

export const handleGetPsxSummary: RequestHandler = async (_req, res) => {
  try {
    const response = await fetch("https://dps.psx.com.pk/market-summary", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; FusionBot/1.0; +https://builder.io)",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      redirect: "follow",
    });

    if (!response.ok) {
      return res
        .status(502)
        .json({ error: `Upstream error: ${response.status}` });
    }

    const html = await response.text();
    const regex = /var\s+summaryData\s*=\s*(\[.*?\]);/s;
    const match = html.match(regex);

    if (!match) {
      return res.status(500).json({ error: "Data not found" });
    }

    const data = JSON.parse(match[1]);
    res.setHeader("Cache-Control", "no-store");
    return res.json(data);
  } catch (error) {
    console.error("PSX summary fetch error:", error);
    return res.status(500).json({ error: "Internal error" });
  }
};
