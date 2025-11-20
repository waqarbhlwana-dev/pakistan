import { RequestHandler } from "express";
import fs from "fs";
import path from "path";

interface ManualInfo {
  analysis: string;
  rating: string;
  notes: string;
}

// File-based persistent storage for manual asset info
const DATA_DIR = path.join(process.cwd(), ".data");
const MANUAL_INFO_FILE = path.join(DATA_DIR, "manual-asset-info.json");

// Ensure data directory exists
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// Load all manual asset info from file
function loadManualAssetInfo(): Record<string, ManualInfo> {
  ensureDataDir();
  try {
    if (fs.existsSync(MANUAL_INFO_FILE)) {
      const data = fs.readFileSync(MANUAL_INFO_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error loading manual asset info from file:", err);
  }
  return {};
}

// Save all manual asset info to file
function saveManualAssetInfo(info: Record<string, ManualInfo>) {
  ensureDataDir();
  try {
    fs.writeFileSync(MANUAL_INFO_FILE, JSON.stringify(info, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving manual asset info to file:", err);
  }
}

// In-memory cache that persists to file
let manualAssetInfo: Record<string, ManualInfo> = loadManualAssetInfo();

export const handleSaveManualAssetInfo: RequestHandler = (req, res) => {
  try {
    const { assetSymbol, data } = req.body as {
      assetSymbol?: string;
      data?: ManualInfo;
    };

    if (!assetSymbol) {
      return res.status(400).json({ error: "Asset symbol is required" });
    }

    if (!data) {
      return res.status(400).json({ error: "Manual info data is required" });
    }

    const upperSymbol = assetSymbol.toUpperCase();
    manualAssetInfo[upperSymbol] = data;
    saveManualAssetInfo(manualAssetInfo);

    return res.json({
      ok: true,
      message: "Manual asset info saved successfully",
    });
  } catch (err) {
    console.error("Error saving manual asset info:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const handleGetManualAssetInfo: RequestHandler = (req, res) => {
  try {
    const { assetSymbol } = req.query as { assetSymbol?: string };

    if (!assetSymbol) {
      return res.status(400).json({ error: "Asset symbol is required" });
    }

    // Reload from file to ensure we have the latest data
    const freshInfo = loadManualAssetInfo();
    const info = freshInfo[assetSymbol.toUpperCase()];

    if (!info) {
      return res.status(404).json({ data: null });
    }

    return res.json({ data: info });
  } catch (err) {
    console.error("Error retrieving manual asset info:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const handleDeleteManualAssetInfo: RequestHandler = (req, res) => {
  try {
    const { assetSymbol } = req.query as { assetSymbol?: string };

    if (!assetSymbol) {
      return res.status(400).json({ error: "Asset symbol is required" });
    }

    const upperSymbol = assetSymbol.toUpperCase();
    if (manualAssetInfo[upperSymbol]) {
      delete manualAssetInfo[upperSymbol];
      saveManualAssetInfo(manualAssetInfo);
    }

    return res.json({
      ok: true,
      message: "Manual asset info deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting manual asset info:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
