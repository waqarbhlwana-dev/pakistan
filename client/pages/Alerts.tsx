import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Alerts() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navigation />

      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Alerts & News</h1>
            <p className="text-lg text-muted-foreground">
              Stay updated with market alerts and the latest financial news.
            </p>
          </div>

          <div className="grid gap-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-semibold mb-2">Price Alerts</h3>
              <p className="text-sm text-muted-foreground">
                Set alerts for price movements.
              </p>
            </div>

            <div className="text-center mt-6">
              <Link
                to="/"
                className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
