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

interface AssetData {
  symbol: string;
  company_name?: string;
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

          // Check if data is essentially empty (all empty strings/arrays)
          const hasContent =
            data.company_name ||
            data.sector ||
            data.business_overview ||
            (data.product_lines && data.product_lines.length > 0) ||
            (data.key_strengths && data.key_strengths.length > 0) ||
            (data.recent_developments && data.recent_developments.length > 0) ||
            data.notes;

          setIsEmpty(!hasContent);
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

          const hasContent =
            data.company_name ||
            data.sector ||
            data.business_overview ||
            (data.product_lines && data.product_lines.length > 0) ||
            (data.key_strengths && data.key_strengths.length > 0) ||
            (data.recent_developments && data.recent_developments.length > 0) ||
            data.notes;

          setIsEmpty(!hasContent);
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
        {assetData?.company_name && (
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground mb-2">
              Company Name
            </h4>
            <p className="text-foreground font-semibold">
              {assetData.company_name}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {assetData?.sector && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground mb-1 uppercase">
                Sector
              </h4>
              <p className="text-foreground">{assetData.sector}</p>
            </div>
          )}
          {assetData?.subsector && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground mb-1 uppercase">
                Subsector
              </h4>
              <p className="text-foreground">{assetData.subsector}</p>
            </div>
          )}
          {assetData?.founded_year && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground mb-1 uppercase">
                Founded Year
              </h4>
              <p className="text-foreground">{assetData.founded_year}</p>
            </div>
          )}
          {assetData?.headquarters && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground mb-1 uppercase">
                Headquarters
              </h4>
              <p className="text-foreground">{assetData.headquarters}</p>
            </div>
          )}
          {assetData?.market_share && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground mb-1 uppercase">
                Market Share
              </h4>
              <p className="text-foreground">{assetData.market_share}</p>
            </div>
          )}
          {assetData?.website && (
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

        {assetData?.business_overview && (
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground mb-2">
              Business Overview
            </h4>
            <p className="text-foreground whitespace-pre-wrap">
              {assetData.business_overview}
            </p>
          </div>
        )}

        {assetData?.product_lines && assetData.product_lines.length > 0 && (
          <div>
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
          <div>
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
          <div>
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
            <div>
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
            <div>
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
          <div>
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
          <div>
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
