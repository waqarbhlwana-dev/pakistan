import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  TrendingUp,
  BarChart3,
  Briefcase,
  BookOpen,
  Users,
  Award,
  ArrowRight,
  Eye,
  X,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface Company {
  symbol: string;
  name: string;
}

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* YouTube Commercial */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-xl overflow-hidden border border-border">
              <iframe
                width="100%"
                height="400"
                src="https://www.youtube.com/embed/cIPDWBAl_q0?autoplay=1&mute=1&loop=1&playlist=cIPDWBAl_q0"
                title="PSX Capital - Pakistan Stock Exchange Learning Platform"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Live Price Chart */}
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Live Price Charts</h3>
              <p className="text-muted-foreground mb-4">
                Real-time charts and market data for Pakistan's top companies.
                Track market trends instantly.
              </p>
              <Link
                to="/"
                className="inline-flex items-center text-primary font-semibold hover:gap-2 transition-all"
              >
                Explore Charts <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            {/* Portfolio Management */}
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Briefcase className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2">Portfolio Management</h3>
              <p className="text-muted-foreground mb-4">
                Manage your investments efficiently with advanced portfolio
                tracking tools and analytics.
              </p>
              <Link
                to="/portfolio-managment"
                className="inline-flex items-center text-primary font-semibold hover:gap-2 transition-all"
              >
                Manage Portfolio <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            {/* Reports & Analysis */}
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Company Reports</h3>
              <p className="text-muted-foreground mb-4">
                Detailed company reports, financials, and analyst summaries to
                help evaluate investments.
              </p>
              <Link
                to="/reports"
                className="inline-flex items-center text-primary font-semibold hover:gap-2 transition-all"
              >
                View Reports <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            {/* Online Courses */}
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2">Free Courses</h3>
              <p className="text-muted-foreground mb-4">
                Access free learning materials and courses to build your
                investing skills.
              </p>
              <Link
                to="/courses"
                className="inline-flex items-center text-primary font-semibold hover:gap-2 transition-all"
              >
                Explore Courses <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            {/* YouTube Content */}
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Video Content</h3>
              <p className="text-muted-foreground mb-4">
                Watch expert analysis and tutorials on our YouTube channel
                covering market insights and strategies.
              </p>
              <Link
                to="/"
                className="inline-flex items-center text-primary font-semibold hover:gap-2 transition-all"
              >
                Watch Videos <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            {/* Company Survey */}
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2">Company</h3>
              <p className="text-muted-foreground mb-4">
                Participate in detailed research about 15+ leading companies and
                share your market insights.
              </p>
              <Link
                to="/survey"
                className="inline-flex items-center text-primary font-semibold hover:gap-2 transition-all"
              >
                Take <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
