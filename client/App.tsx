import "./global.css";
import { useEffect, useState } from "react";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Survey from "./pages/Survey";
import Courses from "./pages/Courses";
import PaidCourse from "./pages/PaidCourse";
import EnrollBeginner from "./pages/EnrollBeginner";
import EnrollAdvanced from "./pages/EnrollAdvanced";
import AccountOpening from "./pages/AccountOpening";
import LiveSession from "./pages/LiveSession";
import Reports from "./pages/Reports";
import Analysis from "./pages/Analysis";
import Alerts from "./pages/Alerts";
import LiveUpdates from "./pages/LiveUpdates";
import Investment from "./pages/Investment";
import NotFound from "./pages/NotFound";
import AssetPage from "./pages/Asset";
import AccountManagement from "./pages/AccountManagement";
import PortfolioManagment from "./pages/PortfolioManagment";
import StockMarketBook from "./pages/StockMarketBook";
import SplashScreen from "./pages/SplashScreen";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(() => {
    // Check if splash screen was already shown in this session
    const hasShownSplash = sessionStorage.getItem("splashShown");
    return !hasShownSplash;
  });

  useEffect(() => {
    try {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark");
    } catch (e) {
      // ignore server-side
    }
  }, []);

  const handleSplashComplete = () => {
    sessionStorage.setItem("splashShown", "true");
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/survey" element={<Survey />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/free-course" element={<Courses />} />
            <Route path="/paid-course" element={<PaidCourse />} />
            <Route path="/enroll-beginner" element={<EnrollBeginner />} />
            <Route path="/enroll-advanced" element={<EnrollAdvanced />} />
            <Route path="/account-opening" element={<AccountOpening />} />
            <Route path="/live-seesion" element={<LiveSession />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/live" element={<LiveUpdates />} />
            <Route path="/investment" element={<Investment />} />
            <Route path="/assets/:symbol" element={<AssetPage />} />
            <Route path="/account-managment" element={<AccountManagement />} />
            <Route
              path="/portfolio-managment"
              element={<PortfolioManagment />}
            />
            <Route path="/stock-market-book" element={<StockMarketBook />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
