import { Link, useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface Package {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
}

export default function PaidCourse() {
  const packages: Package[] = [
    {
      id: "beginner",
      name: "Beginner Package",
      price: 50000,
      description: "Perfect for newcomers to the stock market",
      features: [
        "Full Video Access",
        "16 Comprehensive Courses",
        "Lifetime Access",
        "HD Video Quality",
        "Course Materials Download",
        "Basic Community Support",
      ],
      popular: false,
    },
    {
      id: "advanced",
      name: "Advanced Package",
      price: 75000,
      description: "For serious investors and traders",
      features: [
        "Full Video Access",
        "16 Comprehensive Courses",
        "Advanced Trading Strategies",
        "4K Video Quality",
        "Course Materials & Workbooks",
        "Priority Email Support",
        "Live Q&A Sessions",
        "Exclusive Analysis Reports",
        "Lifetime Access",
        "Certificate of Completion",
      ],
      popular: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navigation />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Premium Course Packages</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Invest in your financial education with our comprehensive paid
              course packages. Choose the plan that fits your learning goals and
              start your investment journey today.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl ${
                  pkg.popular
                    ? "border-2 border-primary shadow-2xl md:scale-105"
                    : "border border-border hover:border-primary/50"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-sm font-bold rounded-bl-lg">
                    POPULAR
                  </div>
                )}

                <div className="bg-card p-8">
                  <h2 className="text-2xl font-bold mb-2">{pkg.name}</h2>
                  <p className="text-muted-foreground text-sm mb-6">
                    {pkg.description}
                  </p>

                  <div className="mb-8">
                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="text-4xl font-bold">
                        ₨{pkg.price.toLocaleString()}
                      </span>
                      <span className="text-muted-foreground">
                        One-time payment
                      </span>
                    </div>
                    <p className="text-sm text-green-400 font-semibold">
                      Lifetime access included
                    </p>
                  </div>

                  <Link
                    to={
                      pkg.id === "beginner"
                        ? "/enroll-beginner"
                        : "/enroll-advanced"
                    }
                    className={`block w-full py-3 rounded-lg font-semibold transition-colors mb-8 text-center ${
                      pkg.popular
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "bg-slate-800 text-white hover:bg-slate-700 border border-primary/30"
                    }`}
                  >
                    Enroll Now
                  </Link>

                  <div className="space-y-4">
                    <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                      What's Included
                    </p>
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto bg-card border border-border rounded-xl p-8 mb-12">
            <h3 className="text-2xl font-bold mb-8 text-center">
              Frequently Asked Questions
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-lg mb-2">
                  Do I get lifetime access?
                </h4>
                <p className="text-muted-foreground">
                  Yes! Once you purchase any package, you have lifetime access
                  to all course materials, videos, and resources.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2">
                  Can I upgrade from Beginner to Advanced?
                </h4>
                <p className="text-muted-foreground">
                  Yes, if you purchase the Beginner package first, you can
                  upgrade to Advanced later and we'll credit the difference.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2">
                  Is there a money-back guarantee?
                </h4>
                <p className="text-muted-foreground">
                  We offer a 7-day money-back guarantee if you're not satisfied
                  with the course content.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2">
                  What payment methods do you accept?
                </h4>
                <p className="text-muted-foreground">
                  We accept credit cards, bank transfers, and mobile payment
                  options for your convenience.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2">
                  Will I receive a certificate?
                </h4>
                <p className="text-muted-foreground">
                  The Advanced package includes a Certificate of Completion. The
                  Beginner package includes course completion badges.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-8 text-center mb-12">
            <h3 className="text-2xl font-bold mb-4">
              Still deciding? Start with Free Courses First
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Try our free video courses to get a feel for our teaching style
              and content quality before investing in a paid package.
            </p>
            <Link
              to="/free-course"
              className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Explore Free Courses
            </Link>
          </div>

          <div className="text-center">
            <Link
              to="/"
              className="inline-block px-8 py-3 bg-slate-800 text-white rounded-lg font-semibold hover:bg-slate-700 transition-colors"
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
