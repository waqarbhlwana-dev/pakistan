import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


export default function BookDetail() {
  const navigate = useNavigate();
  const [selectedPage, setSelectedPage] = useState<string>("1");

  const bookInfo = {
    title: "PSX Capitals - کتاب برائے اسٹاک مارکیٹ",
    description:
      "یہ کتاب خاص طور پر نئے سرمایہ کاروں کے لیے مرتب کی گئی ہے۔ اس میں اسٹاک مارکیٹ کی بنیادی باتیں، کمپنیوں کے مالیاتی بیانات کی تشریح، تکنیکی اور بنیادی تجزیہ، پورٹ فولیو مینجمنٹ حکمتِ عملیاں اور رسک مینجمنٹ شامل ہیں۔",
    chapters: [
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
    ],
  };

  const handlePageClick = (pageNum: number) => {
    navigate(`/book/page/${pageNum}`);
  };

  const handlePageSelect = (value: string) => {
    setSelectedPage(value);
    handlePageClick(parseInt(value));
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navigation />

      <main className="flex-1 max-w-6xl mx-auto w-full p-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Book Cover and Info */}
          <div className="md:col-span-2">
            <div className="bg-card border border-border rounded-xl p-6">
              <h1 className="text-3xl font-bold mb-4">{bookInfo.title}</h1>
              <p className="text-muted-foreground mb-6 leading-relaxed whitespace-pre-line">
                {bookInfo.description}
              </p>

              <h2 className="text-lg font-semibold mt-8 mb-4">
                کتاب میں شامل کورسز
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {bookInfo.chapters.map((chapter, idx) => (
                  <li
                    key={idx}
                    className="flex items-start text-muted-foreground"
                  >
                    <span className="mr-3 font-semibold text-primary">
                      {idx + 1}.
                    </span>
                    <span>{chapter}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar - Quick Info */}
          <div className="bg-card border border-border rounded-xl p-6 h-fit">
            <h2 className="text-lg font-semibold mb-4">کتاب کی معلومات</h2>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">
                  کل صفحات
                </p>
                <p className="text-2xl font-bold">100</p>
              </div>
              <div className="border-t border-border pt-4">
                <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">
                  زبان
                </p>
                <p className="font-semibold">اردو</p>
              </div>
              <div className="border-t border-border pt-4">
                <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">
                  مصنف
                </p>
                <p className="font-semibold">PSX Capitals</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pages Navigation */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">صفحات</h2>
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="max-w-xs">
              <Select value={selectedPage} onValueChange={handlePageSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="صفحہ منتخب کریں" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 100 }, (_, i) => i + 1).map((pageNum) => (
                    <SelectItem key={pageNum} value={pageNum.toString()}>
                      صفحہ {pageNum}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">
            گھر پر ڈیلیوری کی سہولت
          </h2>
          <p className="text-muted-foreground mb-4">
            ہم کتاب آپ کے گھر پہنچا دیتے ہیں۔ ڈیلیوری چارجز علاقے کے مطابق الگ
            سے ہوں گے۔ آرڈر کی تصدیق کے بعد آپ کو فون پر آگاہ کیا جائے گا۔
          </p>
          <div className="bg-slate-800/30 rounded-lg p-4 border border-border">
            <p className="text-muted-foreground mb-2">
              <strong>رابطہ/آرڈر سبمشن:</strong> waqarbhlwana@gmail.com
            </p>
            <p className="text-muted-foreground">
              <strong>فون:</strong> 0345-0119580
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
