import { Link as RouterLink } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function LiveUpdates() {
  const YOUTUBE_CHANNEL = "https://www.youtube.com/@waqarbhlwanaofficial9857";

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navigation />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Live Market Updates</h1>
          <p className="text-muted-foreground mb-8">
            Real-time market data with live streaming from our YouTube channel.
          </p>

          {/* YouTube Stream */}
          <div className="w-full">
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="aspect-video bg-black flex items-center justify-center">
                <a
                  href={YOUTUBE_CHANNEL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center h-full w-full bg-gradient-to-b from-slate-900 to-black hover:from-slate-800 transition-colors p-4"
                >
                  <svg
                    className="w-16 h-16 text-red-500 mb-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  <span className="text-white font-semibold mb-2">
                    Watch Live Stream
                  </span>
                  <span className="text-sm text-muted-foreground text-center">
                    PSX CAPITALS
                  </span>
                  <span className="inline-flex items-center gap-1 mt-4 px-3 py-1 bg-red-500 text-white rounded-full text-xs font-semibold">
                    LIVE
                  </span>
                </a>
              </div>
              <div className="p-4">
                <a
                  href={YOUTUBE_CHANNEL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-semibold transition-colors"
                >
                  Open Channel
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <RouterLink
              to="/"
              className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Back to Home
            </RouterLink>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
