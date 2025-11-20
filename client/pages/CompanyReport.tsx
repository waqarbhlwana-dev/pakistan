import { useState } from "react";
import { useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CompanyReportForm from "@/components/CompanyReportForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CompanyReportPage() {
  const { symbol } = useParams<{ symbol: string }>();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <main className="max-w-7xl mx-auto p-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{symbol} - Company Report</h1>
          <p className="text-muted-foreground">
            Comprehensive company analysis and financial metrics
          </p>
        </div>

        {!isEditing ? (
          <div className="space-y-8">
            <div className="flex justify-end">
              <Button onClick={requestEditAccess} className="px-6 py-2">
                Edit Report
              </Button>
            </div>
            <CompanyReportForm symbol={symbol || ""} isEditing={false} />
          </div>
        ) : (
          <CompanyReportForm
            symbol={symbol || ""}
            isEditing={true}
            onEditComplete={() => setIsEditing(false)}
          />
        )}
      </main>

      <Footer />

      <Dialog open={isAuthOpen} onOpenChange={setIsAuthOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter edit password</DialogTitle>
            <DialogDescription>
              Only authorized users can edit company reports.
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
