import { useState } from "react";
import { Link } from "react-router-dom";
import { Upload, Check, AlertCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  motherName: string;
  idCardNumber: string;
  bankName: string;
  accountNumber: string;
  nominee: string;
  initialDeposit: number;
}

interface Files {
  idCardFront: File | null;
  idCardBack: File | null;
  bankStatement: File | null;
}

export default function AccountOpening() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    motherName: "",
    idCardNumber: "",
    bankName: "",
    accountNumber: "",
    nominee: "",
    initialDeposit: 5000,
  });

  const [files, setFiles] = useState<Files>({
    idCardFront: null,
    idCardBack: null,
    bankStatement: null,
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "initialDeposit" ? parseInt(value) : value,
    }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof Files,
  ) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        setError(`File size must be less than 10MB for ${fieldName}`);
        return;
      }
      setFiles((prev) => ({
        ...prev,
        [fieldName]: file,
      }));
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.motherName
    ) {
      setError("Please fill in all required fields");
      return;
    }

    if (!files.idCardFront || !files.idCardBack || !files.bankStatement) {
      setError("Please upload all required documents");
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value.toString());
      });

      if (files.idCardFront) {
        formDataToSend.append("files.idCardFront", files.idCardFront);
      }
      if (files.idCardBack) {
        formDataToSend.append("files.idCardBack", files.idCardBack);
      }
      if (files.bankStatement) {
        formDataToSend.append("files.bankStatement", files.bankStatement);
      }

      const response = await fetch("/api/account-opening", {
        method: "POST",
        body: JSON.stringify({
          ...formData,
          files: {
            idCardFront: files.idCardFront?.name,
            idCardBack: files.idCardBack?.name,
            bankStatement: files.bankStatement?.name,
          },
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setSubmitted(true);

      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Failed to submit account opening request. Please try again.");
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
            <h2 className="text-2xl font-bold mb-2">Application Submitted!</h2>
            <p className="text-muted-foreground mb-6">
              Your account opening request has been submitted successfully.
              We'll review your documents and contact you shortly with further
              instructions.
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Redirecting you to home page...
            </p>
            <Link
              to="/"
              className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90"
            >
              Back to Home
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
        <div className="max-w-4xl mx-auto">
          <Link
            to="/"
            className="text-primary hover:text-primary/80 font-semibold text-sm mb-6 inline-block"
          >
            ← Back to Home
          </Link>

          <div className="bg-card border border-border rounded-2xl p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Account Opening Form</h1>
              <p className="text-muted-foreground">
                Complete your account opening with PSX Capital. Please fill in
                all required fields and upload the necessary documents.
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-300">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information Section */}
              <div>
                <h3 className="text-xl font-semibold mb-4 border-b border-border pb-2">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
                      placeholder="0300-0000000"
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Mother's Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="motherName"
                      value={formData.motherName}
                      onChange={handleInputChange}
                      placeholder="Enter mother's name"
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      ID Card Number
                    </label>
                    <input
                      type="text"
                      name="idCardNumber"
                      value={formData.idCardNumber}
                      onChange={handleInputChange}
                      placeholder="XXXXX-XXXXXXX-X"
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Bank Details Section */}
              <div>
                <h3 className="text-xl font-semibold mb-4 border-b border-border pb-2">
                  Bank Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Bank Name
                    </label>
                    <input
                      type="text"
                      name="bankName"
                      value={formData.bankName}
                      onChange={handleInputChange}
                      placeholder="e.g., HBL, UBL, MCB"
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Account Number
                    </label>
                    <input
                      type="text"
                      name="accountNumber"
                      value={formData.accountNumber}
                      onChange={handleInputChange}
                      placeholder="Enter your account number"
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Nominee Name
                    </label>
                    <input
                      type="text"
                      name="nominee"
                      value={formData.nominee}
                      onChange={handleInputChange}
                      placeholder="Enter nominee's name"
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Initial Deposit (₨)
                    </label>
                    <input
                      type="number"
                      name="initialDeposit"
                      value={formData.initialDeposit}
                      onChange={handleInputChange}
                      placeholder="5000"
                      min="5000"
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Document Upload Section */}
              <div>
                <h3 className="text-xl font-semibold mb-4 border-b border-border pb-2">
                  Document Upload
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      ID Card - Front <span className="text-red-400">*</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "idCardFront")}
                        className="hidden"
                        id="idCardFront"
                      />
                      <label
                        htmlFor="idCardFront"
                        className="flex-1 px-4 py-3 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors flex items-center gap-2"
                      >
                        <Upload className="h-5 w-5 text-muted-foreground" />
                        <span className="text-sm">
                          {files.idCardFront
                            ? files.idCardFront.name
                            : "Click to upload ID card front"}
                        </span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      ID Card - Back <span className="text-red-400">*</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "idCardBack")}
                        className="hidden"
                        id="idCardBack"
                      />
                      <label
                        htmlFor="idCardBack"
                        className="flex-1 px-4 py-3 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors flex items-center gap-2"
                      >
                        <Upload className="h-5 w-5 text-muted-foreground" />
                        <span className="text-sm">
                          {files.idCardBack
                            ? files.idCardBack.name
                            : "Click to upload ID card back"}
                        </span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Bank Statement (Last 3 Months){" "}
                      <span className="text-red-400">*</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        accept=".pdf,image/*"
                        onChange={(e) => handleFileChange(e, "bankStatement")}
                        className="hidden"
                        id="bankStatement"
                      />
                      <label
                        htmlFor="bankStatement"
                        className="flex-1 px-4 py-3 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors flex items-center gap-2"
                      >
                        <Upload className="h-5 w-5 text-muted-foreground" />
                        <span className="text-sm">
                          {files.bankStatement
                            ? files.bankStatement.name
                            : "Click to upload bank statement"}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms Section */}
              <div className="bg-slate-800/30 rounded-lg p-4 border border-border">
                <p className="text-sm text-muted-foreground mb-4">
                  By submitting this form, you agree to our terms and
                  conditions. All information provided will be securely
                  transmitted and used only for account opening purposes.
                </p>
                <p className="text-xs text-muted-foreground">
                  Required deposit: ₨5,000 minimum
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting..." : "Submit Account Opening Request"}
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
