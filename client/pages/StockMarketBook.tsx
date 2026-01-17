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
        body: JSON.stringify({ ...form }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to submit");
      alert("Order submitted. We will contact you to confirm delivery.");
      setForm({ fullName: "", email: "", phone: "", address: "", quantity: 1 });
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
              style={{ width: "100%" }}
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
              className="inline-flex items-center bg-primary text-primary-foreground px-6 py-2 rounded-md font-semibold hover:opacity-90 transition-opacity mb-6"
            >
              READ NOW
            </button>
            
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              {coursesIncluded.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>

            <h2 className="text-lg font-semibold mt-6 mb-2">
              گھر پر ڈیلیوری کی سہولت
            </h2>
            <p className="text-muted-foreground">
              ہم کتاب آپ کے گھر پہنچا دیتے ہیں۔ ڈیلیوری چارجز علاقے کے مطابق الگ
              سے ہوں گے۔ آرڈر کی تصدیق کے بعد آپ کو فون پر آگاہ کیا جائے گا۔
            </p>

            <div className="mt-6 bg-slate-800/30 rounded-lg p-4 border border-border">
              <h3 className="font-semibold mb-2">قیمت و آرڈر کی معلومات</h3>
              <p className="text-muted-foreground mb-2">
                کپیاں: دستیاب اسٹاک کے مطابق
              </p>
              <p className="text-muted-foreground">
                رابطہ/آرڈر سبمشن: waqarbhlwana@gmail.com
              </p>
              <p className="text-muted-foreground">فون: 0345-0119580</p>
            </div>
          </div>

          <aside className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">آرڈر بک کریں</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">نام</label>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-md border border-border bg-background"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  ای میل
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-md border border-border bg-background"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  فون نمبر
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-md border border-border bg-background"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  ڈیلیوری پتہ
                </label>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange as any}
                  className="w-full px-3 py-2 rounded-md border border-border bg-background min-h-[80px]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  کتنی کاپیاں
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={form.quantity}
                  min={1}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-md border border-border bg-background"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  ہم آپ کو آرڈر کی تصدیق ای میل پر بھیجیں گے
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center bg-primary text-primary-foreground px-4 py-2 rounded-md font-semibold disabled:opacity-50"
                >
                  {submitting ? "ارسال ہو رہا ہے..." : "آرڈر بھیجیں"}
                </button>
              </div>
            </form>

            <div className="mt-4 text-sm text-muted-foreground">
              یا براہِ راست کال کریں:{" "}
              <strong className="text-white">0345-0119580</strong>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
