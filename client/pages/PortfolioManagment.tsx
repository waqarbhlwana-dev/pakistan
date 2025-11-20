import { useState, useMemo } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  portfolioValue: string;
  riskLevel: "low" | "medium" | "high";
  strategy: "growth" | "income" | "balanced";
  targetReturn: string;
  notes: string;
}

export default function PortfolioManagment() {
  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    phone: "",
    portfolioValue: "",
    riskLevel: "medium",
    strategy: "balanced",
    targetReturn: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const COMMISSION_RATE = 0.1; // 10%

  const portfolioAmount = useMemo(() => {
    const n = Number((form.portfolioValue || "").replace(/[^0-9.]/g, ""));
    return Number.isFinite(n) ? n : 0;
  }, [form.portfolioValue]);

  const commissionAmount = useMemo(() => {
    return Math.round(portfolioAmount * COMMISSION_RATE);
  }, [portfolioAmount]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.phone) {
      alert("Please fill in Full Name, Email and Phone");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/portfolio-management", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          commissionRate: 0.1,
          commissionAmount,
          portfolioAmount,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to submit");
      alert("Submitted successfully. We will contact you via email.");
      setForm({
        fullName: "",
        email: "",
        phone: "",
        portfolioValue: "",
        riskLevel: "medium",
        strategy: "balanced",
        targetReturn: "",
        notes: "",
      });
    } catch (err: any) {
      alert(err?.message || "Submission failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navigation />

      <main className="flex-1 max-w-4xl mx-auto w-full p-4">
        <div className="bg-card border border-border rounded-xl p-6">
          <h1 className="text-2xl font-bold mb-2">Portfolio Managment</h1>
          <p className="text-muted-foreground mb-6">
            Apply for professional portfolio management. Management commission
            is fixed at 10% of the managed amount.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-slate-800/30 rounded-lg p-4 border border-border">
              <div className="text-sm text-slate-300">Commission Rate</div>
              <div className="text-xl font-bold text-primary">10%</div>
            </div>
            <div className="bg-slate-800/30 rounded-lg p-4 border border-border">
              <div className="text-sm text-slate-300">Portfolio Amount (₨)</div>
              <div className="text-xl font-bold">
                {portfolioAmount.toLocaleString()}
              </div>
            </div>
            <div className="bg-slate-800/30 rounded-lg p-4 border border-border">
              <div className="text-sm text-slate-300">
                Estimated Commission (₨)
              </div>
              <div className="text-xl font-bold text-green-400">
                {commissionAmount.toLocaleString()}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                  required
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Phone Number <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="0300-0000000"
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Portfolio Amount (₨)
                </label>
                <input
                  type="number"
                  name="portfolioValue"
                  value={form.portfolioValue}
                  onChange={handleChange}
                  placeholder="500000"
                  min={0}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Risk Level
                </label>
                <select
                  name="riskLevel"
                  value={form.riskLevel}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-primary"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Strategy
                </label>
                <select
                  name="strategy"
                  value={form.strategy}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-primary"
                >
                  <option value="growth">Growth</option>
                  <option value="income">Income</option>
                  <option value="balanced">Balanced</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Target Return (%)
                </label>
                <input
                  type="number"
                  name="targetReturn"
                  value={form.targetReturn}
                  onChange={handleChange}
                  placeholder="e.g. 25"
                  min={0}
                  max={100}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Notes</label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Anything we should know about your goals or constraints"
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary min-h-[100px]"
              />
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                By submitting, you agree to the 10% management commission.
              </p>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center bg-primary text-primary-foreground px-4 py-2 rounded-md font-semibold disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Submit Request"}
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
