import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const COVER_IMAGE =
  "https://cdn.builder.io/api/v1/image/assets%2F0c52bb94a8fc4cc08912fe4d89fdbf38%2F288e885f49c646048da1fe2e2bd8abaf?format=webp&width=800";

export default function StockMarketBook() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    quantity: 1,
  });
  const [submitting, setSubmitting] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setForm((s) => ({
      ...s,
      [name]: name === "quantity" ? Number(value) : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.fullName || !form.email || !form.phone || !form.address) {
      alert("Please fill in all required fields");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/order-book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to submit");

      alert("Order submitted. We will contact you to confirm delivery.");
      setForm({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        quantity: 1,
      });
    } catch (err: any) {
      alert(err?.message || "Submission failed");
    } finally {
      setSubmitting(false);
    }
  }

  const coursesIncluded = [
    "Introduction to Stock Market Basics",
    "Understanding Stock Valuation",
    "Reading Financial Statements",
    "Technical Analysis for Beginners",
    "Portfolio Management Strategies",
    "Risk Management in Trading",
    "Dividend Investing 101",
    "IPO Investment Guide",
    "Market Analysis Techniques",
    "Trading Psychology Mastery",
    "Sector Analysis Deep Dive",
    "Company Fundamentals Analysis",
    "Long Term Investment Strategy",
    "Market Trends and Cycles",
    "Investment Tools and Platforms",
    "Advanced Trading Techniques",
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navigation />

      <main className="flex-1 max-w-5xl mx-auto w-full p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <div className="md:col-span-2 bg-card border border-border rounded-xl p-6">
            <img
              src={COVER_IMAGE}
              alt="PSX Capitals Book Cover"
              className="w-full rounded-md mb-4 object-cover max-h-96"
            />

            <h1 className="text-2xl font-bold mb-2">
              PSX Capitals - کتاب برائے اسٹاک مارکیٹ
            </h1>

            <p className="text-muted-foreground mb-4 whitespace-pre-line">
              یہ کتاب خاص طور پر نئے سرمایہ کاروں کے لیے مرتب کی گئی ہے۔ اس میں
              اسٹاک مارکیٹ کی بنیادی باتیں، کمپنیوں کے مالیاتی بیانات کی تشریح،
              تکنیکی اور بنیادی تجزیہ، پورٹ فولیو مینجمنٹ حکمتِ عملیاں اور رسک
              مینجمنٹ شامل ہیں۔
            </p>

            <h2 className="text-lg font-semibold mt-6 mb-2">
              کتاب میں شامل کورسز
            </h2>

            <button
              onClick={() => navigate("/book")}
              className="inline-flex items-center bg-primary text-primary-foreground px-6 py-2 rounded-md font-semibold hover:opacity-90 mb-6"
            >
              READ NOW
            </button>

            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              {coursesIncluded.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>

          <aside className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">آرڈر بک کریں</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="fullName"
                placeholder="نام"
                value={form.fullName}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md border"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="ای میل"
                value={form.email}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md border"
                required
              />

              <input
                type="tel"
                name="phone"
                placeholder="فون نمبر"
                value={form.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md border"
                required
              />

              <textarea
                name="address"
                placeholder="ڈیلیوری پتہ"
                value={form.address}
                onChange={handleChange as any}
                className="w-full px-3 py-2 rounded-md border min-h-[80px]"
                required
              />

              <input
                type="number"
                name="quantity"
                min={1}
                value={form.quantity}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md border"
              />

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary text-primary-foreground py-2 rounded-md font-semibold"
              >
                {submitting ? "ارسال ہو رہا ہے..." : "آرڈر بھیجیں"}
              </button>
            </form>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
