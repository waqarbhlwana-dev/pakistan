import { useState, useEffect } from "react";
import { Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface BusinessSegment {
  name: string;
  products: string;
  revenue?: string;
}

interface ShareholderInfo {
  promoters: string;
  institutional: string;
  retail: string;
  others: string;
}

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
  segments: BusinessSegment[];
  recommendation: string;
  recommendationRationale: string;
  technicalChart: string;
  supportLevels: string;
  resistanceLevels: string;
  trendAnalysis: string;
  summary: string;
  keyNotes: string;
}

const defaultData: CompanyReportData = {
  businessDescription: "",
  businessSegments: "",
  marketPosition: "",
  marketCap: "",
  sharePrice: "",
  eps: "",
  peRatio: "",
  roa: "",
  dividend: "",
  currentRatio: "",
  quickRatio: "",
  weekHigh: "",
  weekLow: "",
  totalAssets: "",
  totalLiabilities: "",
  fcff: "",
  fcfe: "",
  shareholderPromoters: "",
  shareholderInstitutional: "",
  shareholderRetail: "",
  shareholderOthers: "",
  segments: [],
  recommendation: "Hold",
  recommendationRationale: "",
  technicalChart: "",
  supportLevels: "",
  resistanceLevels: "",
  trendAnalysis: "Sideways",
  summary: "",
  keyNotes: "",
};

interface CompanyReportFormProps {
  symbol: string;
  isEditing: boolean;
  onEditComplete?: () => void;
}

export default function CompanyReportForm({
  symbol,
  isEditing,
  onEditComplete,
}: CompanyReportFormProps) {
  const [data, setData] = useState<CompanyReportData>(defaultData);
  const [isSaved, setIsSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [newSegment, setNewSegment] = useState<BusinessSegment>({
    name: "",
    products: "",
    revenue: "",
  });

  useEffect(() => {
    const loadReport = async () => {
      if (!symbol) {
        setData(defaultData);
        return;
      }

      const upperSymbol = symbol.toUpperCase();

      try {
        // First, try to load from server
        const response = await fetch(
          `/api/company-report?symbol=${upperSymbol}`,
        );
        if (response.ok) {
          const result = await response.json();
          if (result.data) {
            setData(result.data);
            return;
          }
        }
      } catch (err) {
        console.error("Error loading report from server:", err);
      }

      // Fallback to localStorage for backward compatibility
      try {
        const stored = localStorage.getItem(`company-report-${upperSymbol}`);
        if (stored) {
          setData(JSON.parse(stored));
          return;
        }
      } catch (err) {
        console.error("Error loading report from localStorage:", err);
      }

      setData(defaultData);
    };

    loadReport();
  }, [symbol]);

  const handleSave = async () => {
    setSaveError(null);
    let savedToServer = false;

    // Always save to localStorage first for offline access
    try {
      localStorage.setItem(`company-report-${symbol}`, JSON.stringify(data));
    } catch (err) {
      console.error("Error saving to localStorage:", err);
      setSaveError("Could not save report. Please try again.");
      return;
    }

    // Try to save to server
    try {
      const response = await fetch("/api/company-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symbol: symbol.toUpperCase(), data }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage =
          errorData.error || "Failed to save report to server";
        throw new Error(errorMessage);
      }

      const result = await response.json();
      if (result.ok) {
        savedToServer = true;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      console.error("Error saving report to server:", errorMessage);
      setSaveError(
        "Report saved locally. Server save failed - other users may not see this report immediately.",
      );
    }

    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      if (savedToServer) {
        onEditComplete?.();
      }
    }, 2000);
  };

  const handleClear = () => {
    setData(defaultData);
    localStorage.removeItem(`company-report-${symbol.toUpperCase()}`);
  };

  const addSegment = () => {
    if (newSegment.name && newSegment.products) {
      setData({
        ...data,
        segments: [...data.segments, newSegment],
      });
      setNewSegment({ name: "", products: "", revenue: "" });
    }
  };

  const removeSegment = (index: number) => {
    setData({
      ...data,
      segments: data.segments.filter((_, i) => i !== index),
    });
  };

  if (!isEditing) {
    return <CompanyReportView data={data} />;
  }

  return (
    <div className="space-y-8">
      {/* Company Overview */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>1. Company Overview</CardTitle>
          <CardDescription>
            Basic information about the company and its business
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Business Description
            </label>
            <Textarea
              value={data.businessDescription}
              onChange={(e) =>
                setData({ ...data, businessDescription: e.target.value })
              }
              placeholder="Brief description of what the company does, its main products/services, and key business segments"
              rows={4}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">
              Number of Business Segments
            </label>
            <Input
              type="text"
              value={data.businessSegments}
              onChange={(e) =>
                setData({ ...data, businessSegments: e.target.value })
              }
              placeholder="Number of segments / divisions"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">
              Market Position & Highlights
            </label>
            <Textarea
              value={data.marketPosition}
              onChange={(e) =>
                setData({ ...data, marketPosition: e.target.value })
              }
              placeholder="Market position, competitive advantage, and recent developments"
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Key Financial Metrics */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>2. Key Financial Metrics</CardTitle>
          <CardDescription>
            Important financial indicators and ratios
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Market Capitalization
              </label>
              <Input
                type="text"
                value={data.marketCap}
                onChange={(e) =>
                  setData({ ...data, marketCap: e.target.value })
                }
                placeholder="Market Capitalization"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Share Price
              </label>
              <Input
                type="text"
                value={data.sharePrice}
                onChange={(e) =>
                  setData({ ...data, sharePrice: e.target.value })
                }
                placeholder="Share Price"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">EPS</label>
              <Input
                type="text"
                value={data.eps}
                onChange={(e) => setData({ ...data, eps: e.target.value })}
                placeholder="EPS"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                P/E Ratio
              </label>
              <Input
                type="text"
                value={data.peRatio}
                onChange={(e) => setData({ ...data, peRatio: e.target.value })}
                placeholder="P/E Ratio"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">ROA</label>
              <Input
                type="text"
                value={data.roa}
                onChange={(e) => setData({ ...data, roa: e.target.value })}
                placeholder="ROA"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Dividend
              </label>
              <Input
                type="text"
                value={data.dividend}
                onChange={(e) => setData({ ...data, dividend: e.target.value })}
                placeholder="Dividend"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Current Ratio
              </label>
              <Input
                type="text"
                value={data.currentRatio}
                onChange={(e) =>
                  setData({ ...data, currentRatio: e.target.value })
                }
                placeholder="Current Ratio"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Quick Ratio
              </label>
              <Input
                type="text"
                value={data.quickRatio}
                onChange={(e) =>
                  setData({ ...data, quickRatio: e.target.value })
                }
                placeholder="Quick Ratio"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                52-Week High
              </label>
              <Input
                type="text"
                value={data.weekHigh}
                onChange={(e) => setData({ ...data, weekHigh: e.target.value })}
                placeholder="52-Week High"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                52-Week Low
              </label>
              <Input
                type="text"
                value={data.weekLow}
                onChange={(e) => setData({ ...data, weekLow: e.target.value })}
                placeholder="52-Week Low"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Total Assets
              </label>
              <Input
                type="text"
                value={data.totalAssets}
                onChange={(e) =>
                  setData({ ...data, totalAssets: e.target.value })
                }
                placeholder="Total Assets"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Total Liabilities
              </label>
              <Input
                type="text"
                value={data.totalLiabilities}
                onChange={(e) =>
                  setData({ ...data, totalLiabilities: e.target.value })
                }
                placeholder="Total Liabilities"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Free Cash Flow to Firm (FCFF)
              </label>
              <Input
                type="text"
                value={data.fcff}
                onChange={(e) => setData({ ...data, fcff: e.target.value })}
                placeholder="FCFF"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Free Cash Flow to Equity (FCFE)
              </label>
              <Input
                type="text"
                value={data.fcfe}
                onChange={(e) => setData({ ...data, fcfe: e.target.value })}
                placeholder="FCFE"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shareholding Structure */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>3. Shareholding Structure</CardTitle>
          <CardDescription>Distribution of company ownership</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Promoters / Major Holders
              </label>
              <Input
                type="text"
                value={data.shareholderPromoters}
                onChange={(e) =>
                  setData({ ...data, shareholderPromoters: e.target.value })
                }
                placeholder="X%"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Institutional Investors
              </label>
              <Input
                type="text"
                value={data.shareholderInstitutional}
                onChange={(e) =>
                  setData({
                    ...data,
                    shareholderInstitutional: e.target.value,
                  })
                }
                placeholder="X%"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Retail Investors
              </label>
              <Input
                type="text"
                value={data.shareholderRetail}
                onChange={(e) =>
                  setData({ ...data, shareholderRetail: e.target.value })
                }
                placeholder="X%"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Others</label>
              <Input
                type="text"
                value={data.shareholderOthers}
                onChange={(e) =>
                  setData({ ...data, shareholderOthers: e.target.value })
                }
                placeholder="X%"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Business Segments & Products */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>4. Business Segments & Products</CardTitle>
          <CardDescription>
            Add company business segments and their services
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Segment Name
                </label>
                <Input
                  type="text"
                  value={newSegment.name}
                  onChange={(e) =>
                    setNewSegment({ ...newSegment, name: e.target.value })
                  }
                  placeholder="e.g., Manufacturing"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Products / Services
                </label>
                <Input
                  type="text"
                  value={newSegment.products}
                  onChange={(e) =>
                    setNewSegment({ ...newSegment, products: e.target.value })
                  }
                  placeholder="e.g., Textiles, Home Goods"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Revenue Contribution (Optional)
                </label>
                <Input
                  type="text"
                  value={newSegment.revenue}
                  onChange={(e) =>
                    setNewSegment({ ...newSegment, revenue: e.target.value })
                  }
                  placeholder="X%"
                />
              </div>
            </div>
            <Button onClick={addSegment} variant="outline">
              + Add Segment
            </Button>
          </div>

          {data.segments.length > 0 && (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Segment</TableHead>
                    <TableHead>Products / Services</TableHead>
                    <TableHead>Revenue Contribution</TableHead>
                    <TableHead className="w-10"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.segments.map((segment, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{segment.name}</TableCell>
                      <TableCell>{segment.products}</TableCell>
                      <TableCell>{segment.revenue || "-"}</TableCell>
                      <TableCell>
                        <button
                          onClick={() => removeSegment(idx)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Analyst Recommendation */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>5. Analyst Recommendation</CardTitle>
          <CardDescription>
            Investment recommendation and rationale
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Recommendation
            </label>
            <select
              value={data.recommendation}
              onChange={(e) =>
                setData({ ...data, recommendation: e.target.value })
              }
              className="w-full border border-border rounded-lg px-4 py-2 bg-background"
            >
              <option value="Buy">Buy</option>
              <option value="Hold">Hold</option>
              <option value="Sell">Sell</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">
              Rationale
            </label>
            <Textarea
              value={data.recommendationRationale}
              onChange={(e) =>
                setData({ ...data, recommendationRationale: e.target.value })
              }
              placeholder="Reasons why this recommendation is made, including financial and market considerations"
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Technical Analysis */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>6. Technical Analysis</CardTitle>
          <CardDescription>Chart analysis and technical levels</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Chart (URL or Description)
            </label>
            <Textarea
              value={data.technicalChart}
              onChange={(e) =>
                setData({ ...data, technicalChart: e.target.value })
              }
              placeholder="Insert Technical Chart URL or description"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">
              Support Levels
            </label>
            <Input
              type="text"
              value={data.supportLevels}
              onChange={(e) =>
                setData({ ...data, supportLevels: e.target.value })
              }
              placeholder="e.g., 100, 95, 90"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">
              Resistance Levels
            </label>
            <Input
              type="text"
              value={data.resistanceLevels}
              onChange={(e) =>
                setData({ ...data, resistanceLevels: e.target.value })
              }
              placeholder="e.g., 120, 125, 130"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">
              Trend Analysis
            </label>
            <select
              value={data.trendAnalysis}
              onChange={(e) =>
                setData({ ...data, trendAnalysis: e.target.value })
              }
              className="w-full border border-border rounded-lg px-4 py-2 bg-background"
            >
              <option value="Uptrend">Uptrend</option>
              <option value="Downtrend">Downtrend</option>
              <option value="Sideways">Sideways</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Summary & Key Notes */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>7. Summary & Key Notes</CardTitle>
          <CardDescription>
            Key takeaways and important information for investors
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Summary</label>
            <Textarea
              value={data.summary}
              onChange={(e) => setData({ ...data, summary: e.target.value })}
              placeholder="Brief summary of the company's financial health, market position, and potential risks"
              rows={4}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">
              Key Notes
            </label>
            <Textarea
              value={data.keyNotes}
              onChange={(e) => setData({ ...data, keyNotes: e.target.value })}
              placeholder="Notes for investors regarding market trends, upcoming events, or dividend expectations"
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4 border-t border-border sticky bottom-0 bg-background py-4">
        <Button onClick={handleSave} className="flex-1">
          <Save className="h-5 w-5 mr-2" />
          Save Report
        </Button>
        <Button
          onClick={() => onEditComplete?.()}
          variant="outline"
          className="flex-1"
        >
          Cancel
        </Button>
        {(data.businessDescription || data.summary) && (
          <Button onClick={handleClear} variant="destructive" className="px-6">
            <X className="h-5 w-5 mr-2" />
            Clear
          </Button>
        )}
      </div>

      {isSaved && (
        <div className="fixed bottom-4 right-4 text-sm text-green-400 bg-green-400/10 px-4 py-3 rounded-lg border border-green-400/30">
          ✓ Report saved successfully!
        </div>
      )}
    </div>
  );
}

function CompanyReportView({ data }: { data: CompanyReportData }) {
  return (
    <div className="space-y-8">
      {/* Company Overview */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>1. Company Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.businessDescription && (
            <div>
              <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                Business Description
              </h4>
              <p className="whitespace-pre-wrap">{data.businessDescription}</p>
            </div>
          )}
          {data.businessSegments && (
            <div>
              <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                Number of Business Segments
              </h4>
              <p>{data.businessSegments}</p>
            </div>
          )}
          {data.marketPosition && (
            <div>
              <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                Market Position & Highlights
              </h4>
              <p className="whitespace-pre-wrap">{data.marketPosition}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Key Financial Metrics */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>2. Key Financial Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableBody>
                <MetricRow
                  label="Market Capitalization"
                  value={data.marketCap}
                />
                <MetricRow label="Share Price" value={data.sharePrice} />
                <MetricRow label="EPS" value={data.eps} />
                <MetricRow label="P/E Ratio" value={data.peRatio} />
                <MetricRow label="ROA" value={data.roa} />
                <MetricRow label="Dividend" value={data.dividend} />
                <MetricRow label="Current Ratio" value={data.currentRatio} />
                <MetricRow label="Quick Ratio" value={data.quickRatio} />
                <MetricRow label="52-Week High" value={data.weekHigh} />
                <MetricRow label="52-Week Low" value={data.weekLow} />
                <MetricRow label="Total Assets" value={data.totalAssets} />
                <MetricRow
                  label="Total Liabilities"
                  value={data.totalLiabilities}
                />
                <MetricRow
                  label="Free Cash Flow to Firm (FCFF)"
                  value={data.fcff}
                />
                <MetricRow
                  label="Free Cash Flow to Equity (FCFE)"
                  value={data.fcfe}
                />
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Shareholding Structure */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>3. Shareholding Structure</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableBody>
                <MetricRow
                  label="Promoters / Major Holders"
                  value={data.shareholderPromoters}
                />
                <MetricRow
                  label="Institutional Investors"
                  value={data.shareholderInstitutional}
                />
                <MetricRow
                  label="Retail Investors"
                  value={data.shareholderRetail}
                />
                <MetricRow label="Others" value={data.shareholderOthers} />
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Business Segments */}
      {data.segments.length > 0 && (
        <Card className="border-border">
          <CardHeader>
            <CardTitle>4. Business Segments & Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Segment</TableHead>
                    <TableHead>Products / Services</TableHead>
                    <TableHead>Revenue Contribution</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.segments.map((segment, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{segment.name}</TableCell>
                      <TableCell>{segment.products}</TableCell>
                      <TableCell>{segment.revenue || "-"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analyst Recommendation */}
      {data.recommendation && (
        <Card className="border-border">
          <CardHeader>
            <CardTitle>5. Analyst Recommendation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                Recommendation
              </h4>
              <p className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-lg font-semibold">
                {data.recommendation}
              </p>
            </div>
            {data.recommendationRationale && (
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                  Rationale
                </h4>
                <p className="whitespace-pre-wrap">
                  {data.recommendationRationale}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Technical Analysis */}
      {(data.technicalChart ||
        data.supportLevels ||
        data.resistanceLevels ||
        data.trendAnalysis) && (
        <Card className="border-border">
          <CardHeader>
            <CardTitle>6. Technical Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.technicalChart && (
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                  Chart
                </h4>
                <p className="whitespace-pre-wrap">{data.technicalChart}</p>
              </div>
            )}
            {data.supportLevels && (
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                  Support Levels
                </h4>
                <p>{data.supportLevels}</p>
              </div>
            )}
            {data.resistanceLevels && (
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                  Resistance Levels
                </h4>
                <p>{data.resistanceLevels}</p>
              </div>
            )}
            {data.trendAnalysis && (
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                  Trend Analysis
                </h4>
                <p>{data.trendAnalysis}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Summary & Key Notes */}
      {(data.summary || data.keyNotes) && (
        <Card className="border-border">
          <CardHeader>
            <CardTitle>7. Summary & Key Notes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.summary && (
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                  Summary
                </h4>
                <p className="whitespace-pre-wrap">{data.summary}</p>
              </div>
            )}
            {data.keyNotes && (
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                  Key Notes
                </h4>
                <p className="whitespace-pre-wrap">{data.keyNotes}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Disclaimer */}
      <Card className="border-border bg-muted/50">
        <CardHeader>
          <CardTitle className="text-base">
            8. DISCLAIMER FOR PSX COMPANIES, REPORTS & SURVEYS
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-3">
          <p>
            The information, reports, surveys, and market data related to
            Pakistan Stock Exchange (PSX) companies provided on this platform
            are for general informational purposes only. All financial figures,
            stock prices, company details, and market analysis are sourced from
            publicly available data and may contain delays, inaccuracies, or
            updates beyond our control.
          </p>
          <p>
            This material does not constitute financial advice, investment
            recommendations, or trading guidance. Users should not rely solely
            on these reports for making investment decisions. Always conduct
            your own research or consult a certified financial advisor before
            investing in any PSX-listed company.
          </p>
          <p>
            We do not guarantee the accuracy, completeness, reliability, or
            timeliness of any PSX-related information presented. Any reliance on
            the provided data is strictly at the user's own risk. The platform
            and its developers are not responsible for any financial losses,
            decisions, or actions taken based on this content.
          </p>
          <p>
            All trademarks, company names, and stock symbols belong to their
            respective owners. The platform is not affiliated with the Pakistan
            Stock Exchange or any regulatory authority.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function MetricRow({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <TableRow>
      <TableCell className="font-semibold text-muted-foreground">
        {label}
      </TableCell>
      <TableCell>{value}</TableCell>
    </TableRow>
  );
}
