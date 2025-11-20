import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleGetStocks, handleSearchStocks } from "./routes/stocks";
import { handleGetChart } from "./routes/chart";
import { handleGetPsxSummary } from "./routes/psx";
import {
  handleGetQuotes,
  handleGetChart as handleGetAvChart,
} from "./routes/alpha";
import { handleAccountOpening } from "./routes/account-opening";
import { handlePortfolioManagement } from "./routes/portfolio-management";
import { handleOrderBook } from "./routes/order-book";
import { handleResearchEditAuth } from "./routes/research-auth";
import {
  handleSaveCompanyReport,
  handleGetCompanyReport,
} from "./routes/company-report";
import {
  handleSaveManualAssetInfo,
  handleGetManualAssetInfo,
  handleDeleteManualAssetInfo,
} from "./routes/manual-asset-info";
import {
  handleGetReports,
  handleGetReport,
  handleCreateReport,
  handleUpdateReport,
  handleDeleteReport,
} from "./routes/reports";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Stock market API routes
  app.get("/api/stocks", handleGetStocks);
  app.get("/api/stocks/search", handleSearchStocks);
  app.get("/api/chart", handleGetChart);

  // Live PSX market summary via HTML scrape
  app.get("/api/psx/summary", handleGetPsxSummary);

  // Alpha Vantage proxy routes
  app.get("/api/av/quotes", handleGetQuotes);
  app.get("/api/av/chart", handleGetAvChart);

  // Account Opening API route
  app.post("/api/account-opening", handleAccountOpening);

  // Portfolio Management API route
  app.post("/api/portfolio-management", handlePortfolioManagement);

  // Order Book API route
  app.post("/api/order-book", handleOrderBook);

  // Research edit auth route
  app.post("/api/research/edit-auth", handleResearchEditAuth);

  // Company report routes
  app.post("/api/company-report", handleSaveCompanyReport);
  app.get("/api/company-report", handleGetCompanyReport);

  // Manual asset info routes
  app.post("/api/manual-asset-info", handleSaveManualAssetInfo);
  app.get("/api/manual-asset-info", handleGetManualAssetInfo);
  app.delete("/api/manual-asset-info", handleDeleteManualAssetInfo);

  // Reports routes
  app.get("/api/reports", handleGetReports);
  app.get("/api/reports/detail", handleGetReport);
  app.post("/api/reports", handleCreateReport);
  app.put("/api/reports", handleUpdateReport);
  app.delete("/api/reports", handleDeleteReport);

  return app;
}
