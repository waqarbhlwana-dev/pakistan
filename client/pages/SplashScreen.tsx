import { useEffect, useState } from "react";

interface SplashScreenProps {
  onComplete?: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [timeLeft, setTimeLeft] = useState(20);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, 20000); // 20 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-8 px-4 pt-20">
        {/* CEO Image with Animation */}
        <div className="animate-fade-in-scale">
          <div className="relative">
            {/* Outer glow ring */}
            <div
              className="absolute -inset-4 bg-gradient-to-r from-primary via-accent to-primary rounded-full blur-xl opacity-40 animate-spin"
              style={{ animationDuration: "8s" }}
            />

            {/* Image container */}
            <div className="relative w-64 h-80 rounded-2xl overflow-hidden border-2 border-primary/50 shadow-2xl">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F383534c40d3c4b8d93cb428ed33a5022%2Fdedc7d80c43f41b9a636660a2a7ec7eb?format=webp&width=800"
                alt="CEO - PSX Capitals"
                className="w-full h-full object-cover animate-zoom-in"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </div>
        </div>

        {/* Heading */}
        <div
          className="text-center animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          <h1 className="text-5xl sm:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">
              CEO
            </span>
          </h1>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            PSX CAPITALS
          </h2>
        </div>

        {/* Loading indicator */}
        <div
          className="animate-fade-in mt-8"
          style={{ animationDelay: "0.6s" }}
        >
          <div className="flex gap-2 items-center justify-center">
            <div
              className="w-2 h-2 bg-primary rounded-full animate-bounce"
              style={{ animationDelay: "0s" }}
            />
            <div
              className="w-2 h-2 bg-accent rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            />
            <div
              className="w-2 h-2 bg-primary rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            />
          </div>
          <p className="text-center text-muted-foreground text-sm mt-4">
            Redirecting to home page...
          </p>
        </div>

        {/* Timer display */}
        <div className="mt-12 text-center">
          <div className="text-2xl font-bold text-primary animate-pulse">
            {timeLeft}s
          </div>
        </div>
      </div>
    </div>
  );
}
