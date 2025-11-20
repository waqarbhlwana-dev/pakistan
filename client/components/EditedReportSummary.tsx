import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

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

interface EditedReportSummaryProps {
  assetSymbol: string;
}

export default function EditedReportSummary({
  assetSymbol,
}: EditedReportSummaryProps) {
  const [reportData, setReportData] = useState<CompanyReportData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReport = async () => {
      try {
        const response = await fetch(
          `/api/company-report?symbol=${assetSymbol}`,
        );
        if (response.ok) {
          const result = await response.json();
          if (result.data) {
            setReportData(result.data);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.error("Error loading report from server:", err);
      }

      // Fallback to localStorage if server data is not available
      try {
        const stored = localStorage.getItem(`company-report-${assetSymbol}`);
        if (stored) {
          const parsed = JSON.parse(stored);
          setReportData(parsed);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.error("Error loading report from localStorage:", err);
      }

      setLoading(false);
    };

    setLoading(true);
    loadReport();
  }, [assetSymbol]);

  if (loading) {
    return null;
  }

  if (!reportData) {
    return null;
  }

  // Check if there's ANY significant content in the report
  const hasReportContent =
    reportData.businessDescription ||
    reportData.businessSegments ||
    reportData.marketPosition ||
    reportData.marketCap ||
    reportData.sharePrice ||
    reportData.peRatio ||
    reportData.eps ||
    reportData.roa ||
    reportData.dividend ||
    reportData.currentRatio ||
    reportData.quickRatio ||
    reportData.weekHigh ||
    reportData.weekLow ||
    reportData.totalAssets ||
    reportData.totalLiabilities ||
    reportData.fcff ||
    reportData.fcfe ||
    reportData.shareholderPromoters ||
    reportData.shareholderInstitutional ||
    reportData.shareholderRetail ||
    reportData.shareholderOthers ||
    (reportData.segments && reportData.segments.length > 0) ||
    reportData.recommendation ||
    reportData.recommendationRationale ||
    reportData.technicalChart ||
    reportData.supportLevels ||
    reportData.resistanceLevels ||
    reportData.trendAnalysis ||
    reportData.summary ||
    reportData.keyNotes;

  if (!hasReportContent) {
    return null;
  }

  return (
    <div className="mb-8 space-y-6">
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-blue-500" />
            Edited Report Summary
          </CardTitle>
          <CardDescription>
            Key information from the company report
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {reportData.businessDescription && (
            <div>
              <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                Business Description
              </h4>
              <p className="text-foreground whitespace-pre-wrap line-clamp-3">
                {reportData.businessDescription}
              </p>
            </div>
          )}

          {reportData.marketPosition && (
            <div>
              <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                Market Position & Highlights
              </h4>
              <p className="text-foreground whitespace-pre-wrap line-clamp-3">
                {reportData.marketPosition}
              </p>
            </div>
          )}

          {(reportData.marketCap ||
            reportData.sharePrice ||
            reportData.peRatio ||
            reportData.eps) && (
            <div>
              <h4 className="text-sm font-semibold text-muted-foreground mb-3">
                Key Financial Metrics
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {reportData.marketCap && (
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">
                      Market Cap
                    </div>
                    <div className="text-sm font-semibold">
                      {reportData.marketCap}
                    </div>
                  </div>
                )}
                {reportData.sharePrice && (
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">
                      Share Price
                    </div>
                    <div className="text-sm font-semibold">
                      {reportData.sharePrice}
                    </div>
                  </div>
                )}
                {reportData.peRatio && (
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">
                      P/E Ratio
                    </div>
                    <div className="text-sm font-semibold">
                      {reportData.peRatio}
                    </div>
                  </div>
                )}
                {reportData.eps && (
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">
                      EPS
                    </div>
                    <div className="text-sm font-semibold">
                      {reportData.eps}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {reportData.recommendation && (
            <div>
              <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                Analyst Recommendation
              </h4>
              <div className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-lg font-semibold">
                {reportData.recommendation}
              </div>
              {reportData.recommendationRationale && (
                <p className="text-sm text-foreground mt-3 whitespace-pre-wrap">
                  {reportData.recommendationRationale}
                </p>
              )}
            </div>
          )}

          {reportData.summary && (
            <div>
              <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                Summary
              </h4>
              <p className="text-sm text-foreground whitespace-pre-wrap">
                {reportData.summary}
              </p>
            </div>
          )}

          {reportData.trendAnalysis && (
            <div>
              <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                Trend Analysis
              </h4>
              <div className="inline-block px-3 py-1 bg-muted rounded-lg text-sm font-semibold">
                {reportData.trendAnalysis}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
