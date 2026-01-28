import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageRenderer } from "@/components/ImageRenderer";

interface CompanyOverview {
  business_description?: string;
  number_of_business_segments?: string;
  market_position_highlights?: string;
}

interface KeyFinancialMetrics {
  market_capitalization?: string;
  share_price?: string;
  eps?: string;
  pe_ratio?: string;
  equity?: string;
  roa?: string;
  dividend?: string;
  current_ratio?: string;
  quick_ratio?: string;
  "52_week_high"?: string;
  "52_week_low"?: string;
  total_assets?: string;
  total_liabilities?: string;
  fcff?: string;
  fcfe?: string;
}

interface ShareholdingStructure {
  promoters_major_holders?: string;
  institutional_investors?: string;
  retail_investors?: string;
  others?: string;
}

interface BusinessSegment {
  segment?: string;
  products_services?: string;
  revenue_contribution?: string;
}

interface AnalystRecommendation {
  recommendation?: string;
  rationale?: string;
}

interface TechnicalAnalysis {
  chart?: string;
  support_levels?: string;
  resistance_levels?: string;
  trend_analysis?: string;
}

interface AssetData {
  symbol?: string;
  company_name?: string;
  company_logo?: string;
  company_overview?: CompanyOverview;
  key_financial_metrics?: KeyFinancialMetrics;
  shareholding_structure?: ShareholdingStructure;
  business_segments_products?: BusinessSegment[];
  analyst_recommendation?: AnalystRecommendation;
  technical_analysis?: TechnicalAnalysis;
  summary_key_notes?: string[];
  // Legacy fields for backward compatibility
  sector?: string;
  subsector?: string;
  founded_year?: string;
  headquarters?: string;
  website?: string;
  business_overview?: string;
  product_lines?: string[];
  key_strengths?: string[];
  challenges?: string[];
  market_share?: string;
  recent_developments?: string[];
  financial_highlights?: {
    revenue?: string;
    profit?: string;
    growth_rate?: string;
  };
  management_team?: Array<{ name?: string; position?: string }>;
  notes?: string;
}

interface AssetDataCardProps {
  assetSymbol: string;
}

export default function AssetDataCard({ assetSymbol }: AssetDataCardProps) {
  const [assetData, setAssetData] = useState<AssetData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    const loadAssetData = async () => {
      setLoading(true);
      setError(null);
      setIsEmpty(false);

      try {
        const response = await fetch(
          `/assets/${assetSymbol.toUpperCase()}.json`,
        );
        if (response.ok) {
          const data: AssetData = await response.json();
          setAssetData(data);

          const hasNewContent =
            data.company_name ||
            (data.company_overview &&
              (data.company_overview.business_description ||
                data.company_overview.number_of_business_segments ||
                data.company_overview.market_position_highlights)) ||
            (data.key_financial_metrics &&
              Object.values(data.key_financial_metrics).some((v) => v)) ||
            (data.shareholding_structure &&
              Object.values(data.shareholding_structure).some((v) => v)) ||
            (data.business_segments_products &&
              data.business_segments_products.length > 0) ||
            (data.analyst_recommendation &&
              (data.analyst_recommendation.recommendation ||
                data.analyst_recommendation.rationale)) ||
            (data.technical_analysis &&
              Object.values(data.technical_analysis).some((v) => v)) ||
            (data.summary_key_notes && data.summary_key_notes.length > 0);

          const hasLegacyContent =
            data.sector ||
            data.business_overview ||
            (data.product_lines && data.product_lines.length > 0) ||
            (data.key_strengths && data.key_strengths.length > 0) ||
            (data.recent_developments && data.recent_developments.length > 0) ||
            data.notes;

          setIsEmpty(!hasNewContent && !hasLegacyContent);
        } else {
          setError("Asset data file not found");
        }
      } catch (err) {
        console.error("Error loading asset data:", err);
        setError("Failed to load asset data");
      } finally {
        setLoading(false);
      }
    };

    loadAssetData();
  }, [assetSymbol]);

  const handleRefresh = () => {
    setLoading(true);
    const loadAssetData = async () => {
      try {
        const response = await fetch(
          `/assets/${assetSymbol.toUpperCase()}.json?t=${Date.now()}`,
        );
        if (response.ok) {
          const data: AssetData = await response.json();
          setAssetData(data);
          setError(null);

          const hasNewContent =
            data.company_name ||
            (data.company_overview &&
              (data.company_overview.business_description ||
                data.company_overview.number_of_business_segments ||
                data.company_overview.market_position_highlights)) ||
            (data.key_financial_metrics &&
              Object.values(data.key_financial_metrics).some((v) => v)) ||
            (data.shareholding_structure &&
              Object.values(data.shareholding_structure).some((v) => v)) ||
            (data.business_segments_products &&
              data.business_segments_products.length > 0) ||
            (data.analyst_recommendation &&
              (data.analyst_recommendation.recommendation ||
                data.analyst_recommendation.rationale)) ||
            (data.technical_analysis &&
              Object.values(data.technical_analysis).some((v) => v)) ||
            (data.summary_key_notes && data.summary_key_notes.length > 0);

          const hasLegacyContent =
            data.sector ||
            data.business_overview ||
            (data.product_lines && data.product_lines.length > 0) ||
            (data.key_strengths && data.key_strengths.length > 0) ||
            (data.recent_developments && data.recent_developments.length > 0) ||
            data.notes;

          setIsEmpty(!hasNewContent && !hasLegacyContent);
        } else {
          setError("Asset data file not found");
        }
      } catch (err) {
        console.error("Error loading asset data:", err);
        setError("Failed to load asset data");
      } finally {
        setLoading(false);
      }
    };

    loadAssetData();
  };

  if (loading) {
    return (
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>Asset Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-8">
            Loading asset data...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-yellow-500" />
            Asset Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-8">
            <p className="mb-4">{error}</p>
            <Button onClick={handleRefresh} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isEmpty) {
    return (
      <Card className="border-border bg-card border-dashed">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-blue-500" />
            Asset Information
          </CardTitle>
          <CardDescription>
            Data will appear here after it's added to GitHub
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-12">
            <p className="mb-4 text-sm">
              This card is currently blank. Asset data will be loaded once you
              save the updated files to GitHub.
            </p>
            <Button onClick={handleRefresh} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border bg-card mb-8">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Asset Information</CardTitle>
            <CardDescription>Company profile and details</CardDescription>
          </div>
          <Button onClick={handleRefresh} variant="ghost" size="sm">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {assetData?.company_logo && (
          <div>
            <img
              src={assetData.company_logo}
              alt={assetData.company_name || "Company Logo"}
              className="h-16 object-contain"
            />
          </div>
        )}

        {assetData?.company_name && (
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground mb-2">
              Company Name
            </h4>
            <p className="text-foreground font-semibold text-lg">
              {assetData.company_name}
            </p>
          </div>
        )}

        {assetData?.company_overview && (
          <div className="border-t pt-6">
            <h3 className="text-lg font-bold mb-4">Company Overview</h3>
            <div className="space-y-4">
              {assetData.company_overview.business_description && (
                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                    Business Description
                  </h4>
                  <p className="text-foreground whitespace-pre-wrap">
                    {assetData.company_overview.business_description}
                  </p>
                </div>
              )}
              {assetData.company_overview.number_of_business_segments && (
                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                    Number of Business Segments
                  </h4>
                  <p className="text-foreground">
                    {assetData.company_overview.number_of_business_segments}
                  </p>
                </div>
              )}
              {assetData.company_overview.market_position_highlights && (
                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                    Market Position Highlights
                  </h4>
                  <p className="text-foreground whitespace-pre-wrap">
                    {assetData.company_overview.market_position_highlights}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {assetData?.key_financial_metrics &&
          Object.values(assetData.key_financial_metrics).some((v) => v) && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-bold mb-4">Key Financial Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {assetData.key_financial_metrics.market_capitalization && (
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">
                      Market Capitalization
                    </div>
                    <div className="text-sm font-semibold">
                      {assetData.key_financial_metrics.market_capitalization}
                    </div>
                  </div>
                )}
                {assetData.key_financial_metrics.share_price && (
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">
                      Share Price
                    </div>
                    <div className="text-sm font-semibold">
                      {assetData.key_financial_metrics.share_price}
                    </div>
                  </div>
                )}
                {assetData.key_financial_metrics.eps && (
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">
                      EPS
                    </div>
                    <div className="text-sm font-semibold">
                      {assetData.key_financial_metrics.eps}
                    </div>
                  </div>
                )}
                {assetData.key_financial_metrics.pe_ratio && (
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">
                      P/E Ratio
                    </div>
                    <div className="text-sm font-semibold">
                      {assetData.key_financial_metrics.pe_ratio}
                    </div>
                  </div>
                )}
                {assetData.key_financial_metrics.equity && (
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">
                      Equity
                    </div>
                    <div className="text-sm font-semibold">
                      {assetData.key_financial_metrics.equity}
                    </div>
                  </div>
                )}
                {assetData.key_financial_metrics.roa && (
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">
                      ROA
                    </div>
                    <div className="text-sm font-semibold">
                      {assetData.key_financial_metrics.roa}
                    </div>
                  </div>
                )}
                {assetData.key_financial_metrics.dividend && (
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">
                      Dividend
                    </div>
                    <div className="text-sm font-semibold">
                      {assetData.key_financial_metrics.dividend}
                    </div>
                  </div>
                )}
                {assetData.key_financial_metrics.current_ratio && (
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">
                      Current Ratio
                    </div>
                    <div className="text-sm font-semibold">
                      {assetData.key_financial_metrics.current_ratio}
                    </div>
                  </div>
                )}
                {assetData.key_financial_metrics.quick_ratio && (
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">
                      Quick Ratio
                    </div>
                    <div className="text-sm font-semibold">
                      {assetData.key_financial_metrics.quick_ratio}
                    </div>
                  </div>
                )}
                {assetData.key_financial_metrics["52_week_high"] && (
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">
                      52 Week High
                    </div>
                    <div className="text-sm font-semibold">
                      {assetData.key_financial_metrics["52_week_high"]}
                    </div>
                  </div>
                )}
                {assetData.key_financial_metrics["52_week_low"] && (
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">
                      52 Week Low
                    </div>
                    <div className="text-sm font-semibold">
                      {assetData.key_financial_metrics["52_week_low"]}
                    </div>
                  </div>
                )}
                {assetData.key_financial_metrics.total_assets && (
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">
                      Total Assets
                    </div>
                    <div className="text-sm font-semibold">
                      {assetData.key_financial_metrics.total_assets}
                    </div>
                  </div>
                )}
                {assetData.key_financial_metrics.total_liabilities && (
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">
                      Total Liabilities
                    </div>
                    <div className="text-sm font-semibold">
                      {assetData.key_financial_metrics.total_liabilities}
                    </div>
                  </div>
                )}
                {assetData.key_financial_metrics.fcff && (
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">
                      FCFF
                    </div>
                    <div className="text-sm font-semibold">
                      {assetData.key_financial_metrics.fcff}
                    </div>
                  </div>
                )}
                {assetData.key_financial_metrics.fcfe && (
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">
                      FCFE
                    </div>
                    <div className="text-sm font-semibold">
                      {assetData.key_financial_metrics.fcfe}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

        {assetData?.shareholding_structure &&
          Object.values(assetData.shareholding_structure).some((v) => v) && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-bold mb-4">Shareholding Structure</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {assetData.shareholding_structure.promoters_major_holders && (
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">
                      Promoters & Major Holders
                    </div>
                    <div className="text-sm font-semibold">
                      {assetData.shareholding_structure.promoters_major_holders}
                    </div>
                  </div>
                )}
                {assetData.shareholding_structure.institutional_investors && (
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">
                      Institutional Investors
                    </div>
                    <div className="text-sm font-semibold">
                      {assetData.shareholding_structure.institutional_investors}
                    </div>
                  </div>
                )}
                {assetData.shareholding_structure.retail_investors && (
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">
                      Retail Investors
                    </div>
                    <div className="text-sm font-semibold">
                      {assetData.shareholding_structure.retail_investors}
                    </div>
                  </div>
                )}
                {assetData.shareholding_structure.others && (
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">
                      Others
                    </div>
                    <div className="text-sm font-semibold">
                      {assetData.shareholding_structure.others}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

        {assetData?.business_segments_products &&
          assetData.business_segments_products.length > 0 && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-bold mb-4">Business Segments & Products</h3>
              <div className="space-y-4">
                {assetData.business_segments_products.map((segment, idx) => (
                  <div
                    key={idx}
                    className="bg-muted/50 rounded-lg p-4 border border-border"
                  >
                    {segment.segment && (
                      <div className="mb-3">
                        <h5 className="font-semibold text-foreground">
                          {segment.segment}
                        </h5>
                      </div>
                    )}
                    {segment.products_services && (
                      <div className="mb-2">
                        <h6 className="text-xs font-semibold text-muted-foreground mb-1">
                          Products/Services
                        </h6>
                        <p className="text-sm text-foreground">
                          {segment.products_services}
                        </p>
                      </div>
                    )}
                    {segment.revenue_contribution && (
                      <div>
                        <h6 className="text-xs font-semibold text-muted-foreground mb-1">
                          Revenue Contribution
                        </h6>
                        <p className="text-sm text-foreground">
                          {segment.revenue_contribution}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        {assetData?.analyst_recommendation &&
          (assetData.analyst_recommendation.recommendation ||
            assetData.analyst_recommendation.rationale) && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-bold mb-4">Analyst Recommendation</h3>
              <div className="space-y-4">
                {assetData.analyst_recommendation.recommendation && (
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                      Recommendation
                    </h4>
                    <p className="text-foreground font-semibold text-lg">
                      {assetData.analyst_recommendation.recommendation}
                    </p>
                  </div>
                )}
                {assetData.analyst_recommendation.rationale && (
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                      Rationale
                    </h4>
                    <p className="text-foreground whitespace-pre-wrap">
                      {assetData.analyst_recommendation.rationale}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

        {assetData?.technical_analysis &&
          Object.values(assetData.technical_analysis).some((v) => v) && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-bold mb-4">Technical Analysis</h3>
              <div className="space-y-4">
                {assetData.technical_analysis.chart && (
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                      Chart
                    </h4>
                    <p className="text-foreground whitespace-pre-wrap">
                      {assetData.technical_analysis.chart}
                    </p>
                  </div>
                )}
                {assetData.technical_analysis.support_levels && (
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                      Support Levels
                    </h4>
                    <p className="text-foreground whitespace-pre-wrap">
                      {assetData.technical_analysis.support_levels}
                    </p>
                  </div>
                )}
                {assetData.technical_analysis.resistance_levels && (
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                      Resistance Levels
                    </h4>
                    <p className="text-foreground whitespace-pre-wrap">
                      {assetData.technical_analysis.resistance_levels}
                    </p>
                  </div>
                )}
                {assetData.technical_analysis.trend_analysis && (
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                      Trend Analysis
                    </h4>
                    <p className="text-foreground whitespace-pre-wrap">
                      {assetData.technical_analysis.trend_analysis}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

        {assetData?.summary_key_notes &&
          assetData.summary_key_notes.length > 0 && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-bold mb-4">Summary Key Notes</h3>
              <ul className="space-y-2">
                {assetData.summary_key_notes.map((note, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-foreground bg-muted/50 rounded-lg p-3"
                  >
                    <span className="text-primary font-semibold mt-0.5">
                      {idx + 1}.
                    </span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        {assetData?.sector && (
          <div className="border-t pt-6">
            <h3 className="text-lg font-bold mb-4">Legacy Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {assetData.sector && (
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground mb-1 uppercase">
                    Sector
                  </h4>
                  <p className="text-foreground">{assetData.sector}</p>
                </div>
              )}
              {assetData.subsector && (
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground mb-1 uppercase">
                    Subsector
                  </h4>
                  <p className="text-foreground">{assetData.subsector}</p>
                </div>
              )}
              {assetData.founded_year && (
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground mb-1 uppercase">
                    Founded Year
                  </h4>
                  <p className="text-foreground">{assetData.founded_year}</p>
                </div>
              )}
              {assetData.headquarters && (
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground mb-1 uppercase">
                    Headquarters
                  </h4>
                  <p className="text-foreground">{assetData.headquarters}</p>
                </div>
              )}
              {assetData.market_share && (
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground mb-1 uppercase">
                    Market Share
                  </h4>
                  <p className="text-foreground">{assetData.market_share}</p>
                </div>
              )}
              {assetData.website && (
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground mb-1 uppercase">
                    Website
                  </h4>
                  <a
                    href={assetData.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {assetData.website}
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

        {assetData?.business_overview && (
          <div className="border-t pt-6">
            <h4 className="text-sm font-semibold text-muted-foreground mb-2">
              Business Overview
            </h4>
            <p className="text-foreground whitespace-pre-wrap">
              {assetData.business_overview}
            </p>
          </div>
        )}

        {assetData?.product_lines && assetData.product_lines.length > 0 && (
          <div className="border-t pt-6">
            <h4 className="text-sm font-semibold text-muted-foreground mb-3">
              Product Lines
            </h4>
            <ul className="space-y-2">
              {assetData.product_lines.map((product, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-foreground"
                >
                  <span className="text-primary mt-1">•</span>
                  <span>{product}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {assetData?.key_strengths && assetData.key_strengths.length > 0 && (
          <div className="border-t pt-6">
            <h4 className="text-sm font-semibold text-muted-foreground mb-3">
              Key Strengths
            </h4>
            <ul className="space-y-2">
              {assetData.key_strengths.map((strength, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-foreground"
                >
                  <span className="text-green-500 mt-1">✓</span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {assetData?.challenges && assetData.challenges.length > 0 && (
          <div className="border-t pt-6">
            <h4 className="text-sm font-semibold text-muted-foreground mb-3">
              Challenges
            </h4>
            <ul className="space-y-2">
              {assetData.challenges.map((challenge, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-foreground"
                >
                  <span className="text-orange-500 mt-1">⚠</span>
                  <span>{challenge}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {assetData?.recent_developments &&
          assetData.recent_developments.length > 0 && (
            <div className="border-t pt-6">
              <h4 className="text-sm font-semibold text-muted-foreground mb-3">
                Recent Developments
              </h4>
              <ul className="space-y-2">
                {assetData.recent_developments.map((dev, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-foreground"
                  >
                    <span className="text-blue-500 mt-1">→</span>
                    <span>{dev}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        {assetData?.financial_highlights &&
          (assetData.financial_highlights.revenue ||
            assetData.financial_highlights.profit ||
            assetData.financial_highlights.growth_rate) && (
            <div className="border-t pt-6">
              <h4 className="text-sm font-semibold text-muted-foreground mb-3">
                Financial Highlights
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {assetData.financial_highlights.revenue && (
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">
                      Revenue
                    </div>
                    <div className="text-sm font-semibold">
                      {assetData.financial_highlights.revenue}
                    </div>
                  </div>
                )}
                {assetData.financial_highlights.profit && (
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">
                      Profit
                    </div>
                    <div className="text-sm font-semibold">
                      {assetData.financial_highlights.profit}
                    </div>
                  </div>
                )}
                {assetData.financial_highlights.growth_rate && (
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">
                      Growth Rate
                    </div>
                    <div className="text-sm font-semibold">
                      {assetData.financial_highlights.growth_rate}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

        {assetData?.management_team && assetData.management_team.length > 0 && (
          <div className="border-t pt-6">
            <h4 className="text-sm font-semibold text-muted-foreground mb-3">
              Management Team
            </h4>
            <div className="space-y-2">
              {assetData.management_team.map((member, idx) => (
                <div
                  key={idx}
                  className="bg-muted/50 rounded-lg p-3 flex justify-between items-start"
                >
                  <div>
                    {member.name && (
                      <p className="font-semibold text-foreground">
                        {member.name}
                      </p>
                    )}
                    {member.position && (
                      <p className="text-sm text-muted-foreground">
                        {member.position}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {assetData?.notes && (
          <div className="border-t pt-6">
            <h4 className="text-sm font-semibold text-muted-foreground mb-2">
              Notes
            </h4>
            <p className="text-foreground whitespace-pre-wrap">
              {assetData.notes}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
