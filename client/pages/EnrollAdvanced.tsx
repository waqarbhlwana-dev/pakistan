import { useState } from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function EnrollAdvanced() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    paymentMethod: "bank-transfer",
    agreeTerms: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.phone) {
      alert("Please fill in all required fields");
      return;
    }

    if (!formData.agreeTerms) {
      alert("Please agree to terms and conditions");
      return;
    }

    setLoading(true);

    try {
      const enrollmentData = {
        package: "Advanced",
        price: 75000,
        ...formData,
        timestamp: new Date().toISOString(),
      };

      console.log("Enrollment Data:", enrollmentData);

      setSubmitted(true);

      setTimeout(() => {
        window.location.href = "/paid-course";
      }, 3000);
    } catch (error) {
      console.error("Error submitting enrollment:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="bg-card border border-border rounded-2xl p-8 max-w-md w-full text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                <Check className="w-8 h-8 text-green-400" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">Enrollment Successful!</h2>
            <p className="text-muted-foreground mb-6">
              Thank you for enrolling in the Advanced Package. We'll send you
              further instructions and access details to your email shortly.
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Redirecting you back to courses page...
            </p>
            <Link
              to="/paid-course"
              className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90"
            >
              Back to Courses
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navigation />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <Link
            to="/paid-course"
            className="text-primary hover:text-primary/80 font-semibold text-sm mb-6 inline-block"
          >
            ← Back to Courses
          </Link>

          <div className="bg-card border border-primary/30 rounded-2xl p-8 relative">
            <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold">
              PREMIUM
            </div>

            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">
                Enroll in Advanced Package
              </h1>
              <p className="text-muted-foreground">
                Unlock premium features and become a professional investor.
              </p>
            </div>

            {/* Package Summary */}
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-6 mb-8 border border-primary/20">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">Advanced Package</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    For serious investors and traders
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">₨75,000</div>
                  <p className="text-sm text-green-400 mt-1">
                    One-time payment
                  </p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-400" />
                  <span>Full Video Access to 16 Courses</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-400" />
                  <span>Advanced Trading Strategies</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-400" />
                  <span>4K Video Quality</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-400" />
                  <span>Priority Email Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-400" />
                  <span>Live Q&A Sessions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-400" />
                  <span>Certificate of Completion</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-400" />
                  <span>Lifetime Access</span>
                </div>
              </div>
            </div>

            {/* Enrollment Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Phone Number <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="0300-0000000"
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Payment Method <span className="text-red-400">*</span>
                </label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-primary"
                >
                  <option value="bank-transfer">Bank Transfer</option>
                  <option value="jazz-cash">JazzCash</option>
                  <option value="easypaisa">Easypaisa</option>
                  <option value="credit-card">Credit Card</option>
                  <option value="debit-card">Debit Card</option>
                </select>
              </div>

              <div className="bg-slate-800/30 rounded-lg p-4 border border-border">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 accent-primary"
                  />
                  <span className="text-sm">
                    I agree to the{" "}
                    <span className="text-primary font-semibold">
                      Terms and Conditions
                    </span>{" "}
                    and{" "}
                    <span className="text-primary font-semibold">
                      Privacy Policy
                    </span>
                    . I also agree to receive course updates, offers, and
                    premium content via email.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Processing..." : "Complete Enrollment"}
              </button>

              <p className="text-xs text-muted-foreground text-center">
                Your payment will be securely processed. We accept all major
                payment methods.
              </p>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
