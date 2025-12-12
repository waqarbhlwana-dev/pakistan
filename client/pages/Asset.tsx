import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Download, X } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AssetDataCard from "@/components/AssetDataCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ASSET_ACCESS_CODE = "98sb";

export default function AssetPage() {
  const { symbol } = useParams<{ symbol: string }>();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(true);
  const [code, setCode] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);

  const handleVerifyCode = async () => {
    setVerifying(true);
    setAuthError(null);

    if (code === ASSET_ACCESS_CODE) {
      setIsAuthorized(true);
      setIsAuthOpen(false);
      setCode("");
    } else {
      setAuthError("Invalid code. Contact for code at 0345-0119580");
      setCode("");
    }

    setVerifying(false);
  };

  const handleDownloadReport = async () => {
    if (!symbol) return;

    try {
      const response = await fetch(`/api/company-report?symbol=${symbol}`);

      if (!response.ok) {
        alert(
          `Failed to fetch report. Server returned status ${response.status}`,
        );
        return;
      }

      const result = await response.json();
      const reportData = result.data;

      if (!reportData) {
        alert("No report data available for download");
        return;
      }

      const textContent = generateReportText(symbol, reportData);
      const blob = new Blob([textContent], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${symbol}-report.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading report:", error);
      alert("Failed to download report. Please try again.");
    }
  };

  const generateReportText = (symbol: string, data: any): string => {
    let text = `${symbol} - COMPANY REPORT\n`;
    text += `${"=".repeat(50)}\n\n`;

    if (data.businessDescription) {
      text += `BUSINESS DESCRIPTION:\n${data.businessDescription}\n\n`;
    }

    if (data.marketPosition) {
      text += `MARKET POSITION & HIGHLIGHTS:\n${data.marketPosition}\n\n`;
    }

    if (
      data.marketCap ||
      data.sharePrice ||
      data.peRatio ||
      data.eps ||
      data.roa
    ) {
      text += `KEY FINANCIAL METRICS:\n`;
      if (data.marketCap) text += `Market Cap: ${data.marketCap}\n`;
      if (data.sharePrice) text += `Share Price: ${data.sharePrice}\n`;
      if (data.peRatio) text += `P/E Ratio: ${data.peRatio}\n`;
      if (data.eps) text += `EPS: ${data.eps}\n`;
      if (data.roa) text += `ROA: ${data.roa}\n`;
      if (data.dividend) text += `Dividend: ${data.dividend}\n`;
      if (data.currentRatio) text += `Current Ratio: ${data.currentRatio}\n`;
      if (data.quickRatio) text += `Quick Ratio: ${data.quickRatio}\n`;
      text += "\n";
    }

    if (data.recommendation) {
      text += `ANALYST RECOMMENDATION: ${data.recommendation}\n`;
      if (data.recommendationRationale) {
        text += `Rationale: ${data.recommendationRationale}\n`;
      }
      text += "\n";
    }

    if (data.technicalChart) {
      text += `TECHNICAL ANALYSIS:\n${data.technicalChart}\n`;
      if (data.supportLevels) text += `Support Levels: ${data.supportLevels}\n`;
      if (data.resistanceLevels)
        text += `Resistance Levels: ${data.resistanceLevels}\n`;
      if (data.trendAnalysis) text += `Trend: ${data.trendAnalysis}\n`;
      text += "\n";
    }

    if (data.summary) {
      text += `SUMMARY:\n${data.summary}\n\n`;
    }

    if (data.keyNotes) {
      text += `KEY NOTES:\n${data.keyNotes}\n`;
    }

    return text;
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <Dialog open={isAuthOpen} onOpenChange={setIsAuthOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Asset Report Access</DialogTitle>
              <DialogDescription>
                Enter your access code to view {symbol} asset report
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {authError && (
                <p className="text-sm text-red-500 bg-red-50 dark:bg-red-950 p-3 rounded-lg">
                  {authError}
                </p>
              )}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Access Code
                </label>
                <Input
                  type="password"
                  placeholder="Enter access code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleVerifyCode();
                    }
                  }}
                  disabled={verifying}
                />
              </div>
              <div className="flex gap-2 pt-2">
                <Button
                  onClick={handleVerifyCode}
                  disabled={verifying || !code}
                  className="flex-1"
                >
                  {verifying ? "Verifying..." : "Verify"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <main className="max-w-7xl mx-auto p-4">
        <div className="bg-card border border-border rounded-xl p-8">
          <div>
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">{symbol || "Asset"}</h1>
                <p className="text-muted-foreground">
                  Add your analysis and notes for this asset
                </p>
              </div>
              {symbol && (
                <Button
                  onClick={handleDownloadReport}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white"
                >
                  <Download className="h-5 w-5" />
                  Download Report
                </Button>
              )}
            </div>

            {symbol && <AssetDataCard assetSymbol={symbol} />}
          </div>

          <div className="mt-8 flex gap-4">
            <Link
              to="/"
              className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
