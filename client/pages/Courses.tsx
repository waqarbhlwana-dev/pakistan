import { Link } from "react-router-dom";
import { Play, X } from "lucide-react";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Video {
  id: string;
  title: string;
  description: string;
  duration: string;
  url: string;
}

export default function Courses() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const getYouTubeVideoId = (url: string) => {
    const videoIdMatch = url.match(
      /(?:youtu\.be\/|youtube\.com\/watch\?v=)([^&\n?#]+)/,
    );
    return videoIdMatch && videoIdMatch[1] ? videoIdMatch[1] : null;
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = getYouTubeVideoId(url);
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  };

  const getYouTubeThumbnailUrl = (url: string) => {
    const videoId = getYouTubeVideoId(url);
    if (videoId) {
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    }
    return null;
  };

  const mockVideos: Video[] = [
    {
      id: "1",
      title: "Introduction to Stock Market Basics",
      description: "Learn the fundamentals of how stock markets work",
      duration: "15:32",
      url: "https://youtu.be/vZdq5B_IxDM?si=VjirIddDN4Z5QHMd",
    },
    {
      id: "2",
      title: "Understanding Stock Valuation",
      description: "Master the techniques to value stocks properly",
      duration: "22:15",
      url: "https://youtu.be/vZdq5B_IxDM?si=VjirIddDN4Z5QHMd",
    },
    {
      id: "3",
      title: "Reading Financial Statements",
      description: "Interpret balance sheets, P&L and cash flow statements",
      duration: "28:44",
      url: "https://youtu.be/fAWPDirax7U?si=IHnC66PNvamm4SN8",
    },
    {
      id: "4",
      title: "Technical Analysis for Beginners",
      description: "Learn candlestick patterns and chart analysis",
      duration: "18:20",
      url: "https://youtu.be/Q5p7j_CHuhs?si=vr_XMphEXE4Kih9z",
    },
    {
      id: "5",
      title: "Portfolio Management Strategies",
      description: "Build a diversified investment portfolio",
      duration: "32:10",
      url: "https://youtu.be/B6nSzNrt6c0?si=ie-83OvWoKrKlAe5",
    },
    {
      id: "6",
      title: "Risk Management in Trading",
      description: "Protect your capital with proper risk management",
      duration: "25:55",
      url: "https://youtu.be/24Gxeaems3s?si=wZo-XR-90ButotDF",
    },
    {
      id: "7",
      title: "Dividend Investing 101",
      description: "Generate passive income through dividend stocks",
      duration: "20:30",
      url: "https://youtu.be/_h56DAza6jo?si=lcFATIeQj83WJ4Pz",
    },
    {
      id: "8",
      title: "IPO Investment Guide",
      description: "How to invest in Initial Public Offerings",
      duration: "17:45",
      url: "https://youtu.be/6ESB-XXlDB0?si=svfjvwhfE-M2RsfM",
    },
    {
      id: "9",
      title: "Market Analysis Techniques",
      description: "Learn fundamental and technical analysis methods",
      duration: "31:22",
      url: "https://youtu.be/23qtM2AXVlY?si=NJ3ysUcIi--Jwrc9",
    },
    {
      id: "10",
      title: "Trading Psychology Mastery",
      description: "Control emotions and develop trading discipline",
      duration: "26:15",
      url: "https://youtu.be/Ytqvf7l4xpI?si=VC54UsNlhi2mAMQ5",
    },
    {
      id: "11",
      title: "Sector Analysis Deep Dive",
      description: "Understand different sectors of the stock market",
      duration: "29:40",
      url: "https://youtu.be/HkTRSV5QFIk?si=deH2GNsFQu4AHYc9",
    },
    {
      id: "12",
      title: "Company Fundamentals Analysis",
      description: "Evaluate companies based on financial metrics",
      duration: "24:50",
      url: "https://youtu.be/yokDBXraYM4?si=XS973ND3FGoIhctv",
    },
    {
      id: "13",
      title: "Long Term Investment Strategy",
      description: "Build wealth through long-term investing",
      duration: "19:35",
      url: "https://youtu.be/p21FI4hcRPI?si=ALba8VSefzoEBL3x",
    },
    {
      id: "14",
      title: "Market Trends and Cycles",
      description: "Recognize market patterns and economic cycles",
      duration: "27:18",
      url: "https://youtu.be/ml8j5w6BMps?si=YUTYlD918ey9J9bT",
    },
    {
      id: "15",
      title: "Investment Tools and Platforms",
      description: "Navigate trading platforms and investment tools",
      duration: "21:10",
      url: "https://youtu.be/NzSPAZR73f8?si=JwHLxDVG6zZSgqh9",
    },
    {
      id: "16",
      title: "Advanced Trading Techniques",
      description: "Master options, futures, and advanced strategies",
      duration: "35:25",
      url: "https://youtu.be/ZpbMvFvI0Jk?si=3-_T3yl8SLmQPDlj",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navigation />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h1 className="text-3xl font-bold mb-2">Free Video Courses</h1>
            <p className="text-lg text-muted-foreground">
              Learn investing, trading, and market analysis with our
              comprehensive video courses. Start your journey to financial
              literacy today.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockVideos.map((video) => (
              <button
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary transition-all duration-300 hover:shadow-lg text-left"
              >
                <div className="relative w-full aspect-video bg-slate-900 flex items-center justify-center overflow-hidden">
                  <img
                    src={getYouTubeThumbnailUrl(video.url) || ""}
                    alt={video.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="bg-red-600 rounded-full p-3 transform group-hover:scale-110 transition-transform">
                      <Play className="h-6 w-6 text-white fill-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/75 px-2 py-1 rounded text-xs font-semibold text-white">
                    {video.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                    {video.description}
                  </p>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/"
              className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      <Dialog
        open={!!selectedVideo}
        onOpenChange={(open) => !open && setSelectedVideo(null)}
      >
        <DialogContent className="max-w-6xl w-full max-h-[90vh] flex flex-col p-0 gap-0">
          <DialogHeader className="px-6 pt-6 pb-0">
            <DialogTitle>{selectedVideo?.title}</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col lg:flex-row gap-4 flex-1 overflow-hidden px-6 py-4">
            <div className="flex-1 flex flex-col gap-4">
              <div className="w-full aspect-video rounded-lg overflow-hidden bg-black">
                {selectedVideo && (
                  <iframe
                    width="100%"
                    height="100%"
                    src={getYouTubeEmbedUrl(selectedVideo.url)}
                    title={selectedVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {selectedVideo?.description}
              </p>
            </div>

            <div className="w-full lg:w-72 flex flex-col gap-2 bg-muted/30 rounded-lg p-4 overflow-y-auto max-h-96 lg:max-h-full">
              <h3 className="font-semibold text-sm mb-2">More Videos</h3>
              <div className="space-y-2">
                {selectedVideo &&
                mockVideos.slice(
                  mockVideos.findIndex((v) => v.id === selectedVideo.id) + 1,
                ).length > 0 ? (
                  mockVideos
                    .slice(
                      mockVideos.findIndex((v) => v.id === selectedVideo.id) +
                        1,
                    )
                    .map((video) => (
                      <button
                        key={video.id}
                        onClick={() => setSelectedVideo(video)}
                        className="w-full text-left p-2 rounded-lg transition-all duration-200 hover:bg-accent border border-transparent hover:border-primary"
                      >
                        <div className="flex gap-2">
                          <div className="w-16 h-10 rounded flex-shrink-0 bg-slate-800 flex items-center justify-center overflow-hidden relative">
                            <img
                              src={getYouTubeThumbnailUrl(video.url) || ""}
                              alt={video.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                            <Play className="h-3 w-3 text-white fill-white opacity-60 absolute" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold line-clamp-2">
                              {video.title}
                            </p>
                            <p className="text-xs opacity-75">
                              {video.duration}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))
                ) : (
                  <p className="text-xs text-muted-foreground text-center py-4">
                    No more videos in the list
                  </p>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
