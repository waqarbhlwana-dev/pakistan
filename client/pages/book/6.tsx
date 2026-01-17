import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function BookPage6() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navigation />
      <main className="flex-1 max-w-4xl mx-auto w-full p-4 py-8">
        <div className="bg-card border border-border rounded-xl p-8">
          <h1 className="text-2xl font-bold mb-4">Page 6</h1>
          <div className="prose prose-invert max-w-none">
            {/* Page content will be added here */}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
