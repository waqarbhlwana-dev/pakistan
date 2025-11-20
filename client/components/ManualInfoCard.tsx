import { useState, useEffect } from "react";
import { Save, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ManualInfo {
  analysis: string;
  rating: string;
  notes: string;
}

interface ManualInfoCardProps {
  assetSymbol: string;
}

export default function ManualInfoCard({ assetSymbol }: ManualInfoCardProps) {
  const [manualInfo, setManualInfo] = useState<ManualInfo>({
    analysis: "",
    rating: "neutral",
    notes: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Load manual info from server on component mount
  useEffect(() => {
    const loadManualInfo = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/manual-asset-info?assetSymbol=${assetSymbol.toUpperCase()}`,
        );
        if (response.ok) {
          const result = await response.json();
          if (result.data) {
            setManualInfo(result.data);
            return;
          }
        }
      } catch (err) {
        console.error("Error loading manual info from server:", err);
      }

      // Fallback to localStorage for backward compatibility
      try {
        const stored = localStorage.getItem(`manual-info-${assetSymbol}`);
        if (stored) {
          setManualInfo(JSON.parse(stored));
        }
      } catch (err) {
        console.error("Error loading manual info from localStorage:", err);
      }

      setIsLoading(false);
    };

    loadManualInfo();
  }, [assetSymbol]);

  const handleSave = async () => {
    setSaveError(null);
    let savedToServer = false;

    // Always save to localStorage first for offline access
    try {
      localStorage.setItem(
        `manual-info-${assetSymbol}`,
        JSON.stringify(manualInfo),
      );
    } catch (err) {
      console.error("Error saving to localStorage:", err);
      setSaveError("Could not save info. Please try again.");
      return;
    }

    // Try to save to server
    try {
      const response = await fetch("/api/manual-asset-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assetSymbol: assetSymbol.toUpperCase(),
          data: manualInfo,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || "Failed to save info to server";
        throw new Error(errorMessage);
      }

      const result = await response.json();
      if (result.ok) {
        savedToServer = true;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      console.error("Error saving manual info to server:", errorMessage);
      setSaveError(
        "Info saved locally. Server save failed - other users may not see this info immediately.",
      );
    }

    setIsEditing(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleClear = async () => {
    const newInfo = { analysis: "", rating: "neutral", notes: "" };
    setManualInfo(newInfo);
    localStorage.removeItem(`manual-info-${assetSymbol}`);

    // Delete from server
    try {
      await fetch(
        `/api/manual-asset-info?assetSymbol=${assetSymbol.toUpperCase()}`,
        {
          method: "DELETE",
        },
      );
    } catch (err) {
      console.error("Error deleting manual info from server:", err);
    }
  };

  const requestEditAccess = () => {
    setAuthError(null);
    setPassword("");
    setIsAuthOpen(true);
  };

  const verifyPasswordAndEdit = async () => {
    setVerifying(true);
    setAuthError(null);
    try {
      const resp = await fetch("/api/research/edit-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (resp.ok) {
        setIsAuthOpen(false);
        setIsEditing(true);
      } else {
        setAuthError("Incorrect password.");
      }
    } catch (err) {
      setAuthError("Unable to verify access. Please try again.");
    } finally {
      setVerifying(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-slate-800 p-8 rounded-lg border border-slate-700">
        <div className="text-center text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 p-8 rounded-lg border border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-semibold">Manual Analysis & Notes</h3>
        {!isEditing && (manualInfo.analysis || manualInfo.notes) && (
          <button
            onClick={requestEditAccess}
            className="text-sm px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-md transition-colors"
          >
            Edit
          </button>
        )}
      </div>

      {!isEditing ? (
        <div className="space-y-4 text-sm text-muted-foreground">
          {manualInfo.analysis || manualInfo.notes ? (
            <>
              {manualInfo.analysis && (
                <div>
                  <dt className="text-xs text-slate-400 font-semibold uppercase tracking-wide">
                    Analysis
                  </dt>
                  <dd className="text-white mt-2 text-base leading-relaxed whitespace-pre-wrap">
                    {manualInfo.analysis}
                  </dd>
                </div>
              )}
              {manualInfo.rating && manualInfo.rating !== "neutral" && (
                <div>
                  <dt className="text-xs text-slate-400 font-semibold uppercase tracking-wide">
                    Rating
                  </dt>
                  <dd className="text-white mt-2 text-base">
                    <span className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full capitalize font-semibold">
                      {manualInfo.rating.replace(/_/g, " ")}
                    </span>
                  </dd>
                </div>
              )}
              {manualInfo.notes && (
                <div>
                  <dt className="text-xs text-slate-400 font-semibold uppercase tracking-wide">
                    Additional Notes
                  </dt>
                  <dd className="text-white mt-2 text-base leading-relaxed whitespace-pre-wrap">
                    {manualInfo.notes}
                  </dd>
                </div>
              )}
              <button
                onClick={requestEditAccess}
                className="text-primary hover:underline text-sm mt-4"
              >
                ✏️ Edit Information
              </button>
            </>
          ) : (
            <button
              onClick={requestEditAccess}
              className="text-primary hover:underline text-base"
            >
              + Add your analysis and notes
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wide">
              Analysis
            </label>
            <textarea
              value={manualInfo.analysis}
              onChange={(e) =>
                setManualInfo({ ...manualInfo, analysis: e.target.value })
              }
              placeholder="Enter your detailed analysis for this asset..."
              className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              rows={5}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wide">
              Rating
            </label>
            <select
              value={manualInfo.rating}
              onChange={(e) =>
                setManualInfo({ ...manualInfo, rating: e.target.value })
              }
              className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            >
              <option value="neutral">Neutral</option>
              <option value="bullish">Bullish</option>
              <option value="bearish">Bearish</option>
              <option value="strong_buy">Strong Buy</option>
              <option value="strong_sell">Strong Sell</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wide">
              Additional Notes
            </label>
            <textarea
              value={manualInfo.notes}
              onChange={(e) =>
                setManualInfo({ ...manualInfo, notes: e.target.value })
              }
              placeholder="Add any additional observations or notes..."
              className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              rows={5}
            />
          </div>

          <div className="flex gap-3 pt-4 border-t border-slate-700">
            <button
              onClick={handleSave}
              className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-3 rounded-lg font-semibold transition-colors"
            >
              <Save className="h-5 w-5" />
              Save Information
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="flex-1 flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-3 rounded-lg font-semibold transition-colors"
            >
              Cancel
            </button>
            {(manualInfo.analysis || manualInfo.notes) && (
              <button
                onClick={handleClear}
                className="flex items-center justify-center gap-2 bg-red-900/30 hover:bg-red-900/50 text-red-400 px-4 py-3 rounded-lg transition-colors"
                title="Clear all information"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {saveError && (
            <div className="text-sm text-yellow-400 text-center bg-yellow-400/10 py-2 rounded-lg">
              ⚠️ {saveError}
            </div>
          )}

          {isSaved && !saveError && (
            <div className="text-sm text-green-400 text-center bg-green-400/10 py-2 rounded-lg">
              ✓ Information saved successfully!
            </div>
          )}
        </div>
      )}
      <Dialog open={isAuthOpen} onOpenChange={setIsAuthOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter edit password</DialogTitle>
            <DialogDescription>
              Only authorized users can edit research notes.
            </DialogDescription>
          </DialogHeader>
          {authError && <p className="text-sm text-red-500">{authError}</p>}
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                verifyPasswordAndEdit();
              }
            }}
          />
          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="ghost"
              onClick={() => setIsAuthOpen(false)}
              disabled={verifying}
            >
              Cancel
            </Button>
            <Button
              onClick={verifyPasswordAndEdit}
              disabled={verifying || !password}
            >
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
