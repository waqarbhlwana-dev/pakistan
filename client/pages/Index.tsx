import { useState } from "react";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  BarChart3,
  Briefcase,
  BookOpen,
  Users,
  Award,
  ArrowRight,
  Play,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface FeatureCard {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  label: string;
}

export default function Index() {
  const [isVideoHovered, setIsVideoHovered] = useState(false);

  const features: FeatureCard[] = [
    {
      id: "charts",
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Live Price Charts",
      description: "Real-time charts and market data for Pakistan's top companies. Track market trends instantly with advanced analytics.",
      link: "/",
      label: "Explore Charts",
    },
    {
      id: "portfolio",
      icon: <Briefcase className="h-6 w-6" />,
      title: "Portfolio Management",
      description: "Manage your investments efficiently with advanced portfolio tracking tools and comprehensive analytics.",
      link: "/portfolio-managment",
      label: "Manage Portfolio",
    },
    {
      id: "reports",
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Company Reports",
      description: "Detailed company reports, financials, and analyst summaries to help evaluate investments strategically.",
      link: "/reports",
      label: "View Reports",
    },
    {
      id: "courses",
      icon: <BookOpen className="h-6 w-6" />,
      title: "Free Courses",
      description: "Access comprehensive learning materials and courses to build your investing skills from beginner to expert.",
      link: "/courses",
      label: "Explore Courses",
    },
    {
      id: "videos",
      icon: <Award className="h-6 w-6" />,
      title: "Video Content",
      description: "Watch expert analysis and tutorials on our YouTube channel covering market insights and investment strategies.",
      link: "/",
      label: "Watch Videos",
    },
    {
      id: "survey",
      icon: <Users className="h-6 w-6" />,
      title: "Company Survey",
      description: "Participate in detailed research about 15+ leading companies and share your valuable market insights.",
      link: "/survey",
      label: "Take Survey",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <Navigation />

      {/* Hero Section with Gradient Background */}
      <section className="relative w-full overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        
        {/* Floating elements for visual interest */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-40 animate-pulse" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-30 animate-pulse" />

        <div className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Hero Content */}
            <div className="text-center mb-12">
              <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-6 leading-tight">
                Master Pakistan's Stock Market
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Learn, analyze, and invest with confidence. Access real-time market data, expert courses, and comprehensive company reports all in one platform.
              </p>
            </div>

            {/* YouTube Video Section - Prominent Placement */}
            <div className="mb-16">
              <div 
                className="relative group mx-auto max-w-4xl"
                onMouseEnter={() => setIsVideoHovered(true)}
                onMouseLeave={() => setIsVideoHovered(false)}
              >
                {/* Video Container with Enhanced Styling */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary rounded-2xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                
                <div className="relative rounded-2xl overflow-hidden border border-primary/30 bg-card shadow-2xl group-hover:shadow-primary/20 transition-all duration-500">
                  {/* Video Aspect Ratio Container */}
                  <div className="relative w-full aspect-video bg-slate-950 overflow-hidden">
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/cIPDWBAl_q0?autoplay=1&mute=1&loop=1&playlist=cIPDWBAl_q0&controls=1&modestbranding=1"
                      title="PSX Capital - Pakistan Stock Exchange Learning Platform"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                      style={{ border: 'none' }}
                    />
                    
                    {/* Play indicator overlay */}
                    {!isVideoHovered && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                          <Play className="h-6 w-6 text-white fill-white" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Video Info */}
                  <div className="p-4 bg-card/50 backdrop-blur-sm border-t border-border/50">
                    <h3 className="font-semibold text-lg mb-1">PSX Capital - Learning Platform</h3>
                    <p className="text-sm text-muted-foreground">Master stock market trading with expert insights and real-time analysis</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Scrolling indicator */}
            <div className="flex justify-center">
              <div className="animate-bounce text-primary/60">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Tools & Resources</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to succeed in the stock market, all integrated in one platform
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className="group relative overflow-hidden rounded-xl border border-border bg-card/50 backdrop-blur-sm p-8 hover:bg-card/80 transition-all duration-500 hover:border-primary/50 hover:shadow-xl"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Animated border glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-transparent to-accent opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-lg" />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon Container */}
                  <div className="mb-6 inline-block p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                    {feature.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* CTA Link */}
                  <Link
                    to={feature.link}
                    className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300 group/link"
                  >
                    {feature.label}
                    <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 backdrop-blur-sm p-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Start Your Investment Journey?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of investors who are already using PSX Capital to make informed decisions and grow their portfolios.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/account-opening"
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 inline-flex items-center justify-center gap-2 group"
              >
                Get Started
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                to="/courses"
                className="px-8 py-3 border border-primary/50 text-primary rounded-lg font-semibold hover:bg-primary/10 transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
