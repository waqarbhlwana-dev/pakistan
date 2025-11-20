import { RequestHandler } from "express";
import fs from "fs";
import path from "path";

export interface Report {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

const DATA_DIR = path.join(process.cwd(), ".data");
const REPORTS_FILE = path.join(DATA_DIR, "reports.json");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function loadReports(): Record<string, Report> {
  ensureDataDir();
  try {
    if (fs.existsSync(REPORTS_FILE)) {
      const data = fs.readFileSync(REPORTS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error loading reports from file:", err);
  }
  return {};
}

function saveReports(reports: Record<string, Report>) {
  ensureDataDir();
  try {
    fs.writeFileSync(REPORTS_FILE, JSON.stringify(reports, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving reports to file:", err);
  }
}

let reportsCache: Record<string, Report> = loadReports();

export const handleGetReports: RequestHandler = (_req, res) => {
  try {
    const freshReports = loadReports();
    const reportsList = Object.values(freshReports);
    return res.json({ data: reportsList });
  } catch (err) {
    console.error("Error retrieving reports:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const handleGetReport: RequestHandler = (req, res) => {
  try {
    const { reportId } = req.query as { reportId?: string };

    if (!reportId) {
      return res.status(400).json({ error: "Report ID is required" });
    }

    const freshReports = loadReports();
    const report = freshReports[reportId];

    if (!report) {
      return res.status(404).json({ data: null });
    }

    return res.json({ data: report });
  } catch (err) {
    console.error("Error retrieving report:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const handleCreateReport: RequestHandler = (req, res) => {
  try {
    const { title, content } = req.body as {
      title?: string;
      content?: string;
    };

    if (!title) {
      return res.status(400).json({ error: "Report title is required" });
    }

    if (!content) {
      return res.status(400).json({ error: "Report content is required" });
    }

    const reportId = Date.now().toString();
    const now = new Date().toISOString();

    const newReport: Report = {
      id: reportId,
      title,
      content,
      createdAt: now,
      updatedAt: now,
    };

    reportsCache[reportId] = newReport;
    saveReports(reportsCache);

    return res.status(201).json({
      ok: true,
      message: "Report created successfully",
      data: newReport,
    });
  } catch (err) {
    console.error("Error creating report:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const handleUpdateReport: RequestHandler = (req, res) => {
  try {
    const { reportId } = req.query as { reportId?: string };
    const { title, content } = req.body as {
      title?: string;
      content?: string;
    };

    if (!reportId) {
      return res.status(400).json({ error: "Report ID is required" });
    }

    const freshReports = loadReports();
    const report = freshReports[reportId];

    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }

    if (title) {
      report.title = title;
    }

    if (content) {
      report.content = content;
    }

    report.updatedAt = new Date().toISOString();

    reportsCache = freshReports;
    saveReports(reportsCache);

    return res.json({
      ok: true,
      message: "Report updated successfully",
      data: report,
    });
  } catch (err) {
    console.error("Error updating report:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const handleDeleteReport: RequestHandler = (req, res) => {
  try {
    const { reportId } = req.query as { reportId?: string };

    if (!reportId) {
      return res.status(400).json({ error: "Report ID is required" });
    }

    const freshReports = loadReports();

    if (!freshReports[reportId]) {
      return res.status(404).json({ error: "Report not found" });
    }

    delete freshReports[reportId];
    reportsCache = freshReports;
    saveReports(reportsCache);

    return res.json({
      ok: true,
      message: "Report deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting report:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
