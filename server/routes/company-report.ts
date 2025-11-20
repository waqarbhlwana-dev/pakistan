import { RequestHandler } from "express";
import fs from "fs";
import path from "path";

interface CompanyReportData {
  businessDescription: string;
  businessSegments: string;
  marketPosition: string;
  marketCap: string;
  sharePrice: string;
  eps: string;
  peRatio: string;
  roa: string;
  dividend: string;
  currentRatio: string;
  quickRatio: string;
  weekHigh: string;
  weekLow: string;
  totalAssets: string;
  totalLiabilities: string;
  fcff: string;
  fcfe: string;
  shareholderPromoters: string;
  shareholderInstitutional: string;
  shareholderRetail: string;
  shareholderOthers: string;
  segments: Array<{
    name: string;
    products: string;
    revenue?: string;
  }>;
  recommendation: string;
  recommendationRationale: string;
  technicalChart: string;
  supportLevels: string;
  resistanceLevels: string;
  trendAnalysis: string;
  summary: string;
  keyNotes: string;
}

// File-based persistent storage for company reports
const DATA_DIR = path.join(process.cwd(), ".data");
const REPORTS_FILE = path.join(DATA_DIR, "company-reports.json");

// Ensure data directory exists
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// Load all company reports from file
function loadCompanyReports(): Record<string, CompanyReportData> {
  ensureDataDir();
  try {
    if (fs.existsSync(REPORTS_FILE)) {
      const data = fs.readFileSync(REPORTS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error loading company reports from file:", err);
  }
  return {};
}

// Save all company reports to file
function saveCompanyReports(reports: Record<string, CompanyReportData>) {
  ensureDataDir();
  try {
    fs.writeFileSync(REPORTS_FILE, JSON.stringify(reports, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving company reports to file:", err);
  }
}

// In-memory cache that persists to file
let companyReports: Record<string, CompanyReportData> = loadCompanyReports();

export const handleSaveCompanyReport: RequestHandler = (req, res) => {
  try {
    const { symbol, data } = req.body as {
      symbol?: string;
      data?: CompanyReportData;
    };

    if (!symbol) {
      return res.status(400).json({ error: "Symbol is required" });
    }

    if (!data) {
      return res.status(400).json({ error: "Report data is required" });
    }

    const upperSymbol = symbol.toUpperCase();
    companyReports[upperSymbol] = data;
    saveCompanyReports(companyReports);

    return res.json({ ok: true, message: "Report saved successfully" });
  } catch (err) {
    console.error("Error saving company report:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const handleGetCompanyReport: RequestHandler = (req, res) => {
  try {
    const { symbol } = req.query as { symbol?: string };

    if (!symbol) {
      return res.status(400).json({ error: "Symbol is required" });
    }

    // Reload from file to ensure we have the latest data from all sources
    const freshReports = loadCompanyReports();
    const report = freshReports[symbol.toUpperCase()];

    return res.json({ data: report || null });
  } catch (err) {
    console.error("Error retrieving company report:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
