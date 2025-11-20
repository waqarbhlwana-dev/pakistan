import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ReportsManager from "@/components/ReportsManager";

export default function Reports() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navigation />

      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <ReportsManager />

          <div className="mt-12">
            <div className="text-center">
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
