import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Investment() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navigation />

      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Investment</h1>
          <p className="text-muted-foreground mb-6">
            Investment resources and guidance for new and experienced investors.
          </p>

          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-sm text-muted-foreground">
              Content coming soon.
            </p>
          </div>

          <div className="mt-6">
            <Link
              to="/"
              className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
