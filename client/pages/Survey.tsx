import { useState } from "react";
import { ArrowLeft, CheckCircle, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface CompanyQuestion {
  id: string;
  company: string;
  question: string;
  description: string;
  options: string[];
}

const COMPANIES = [
  "Bank Habib Ltd",
  "National Bank",
  "United Breweries",
  "Engro Corporation",
  "Lucky Cement",
  "Pakistan Petroleum",
  "Oil & Gas Development",
  "Dow Chemical Pakistan",
  "Pakistan Telecom",
  "Zong Pakistan",
  "Maple Leaf",
  "Siemens Pakistan",
  "Pakistan Airline",
  "Pakistan Steel",
  "ICI Pakistan",
];

const SURVEY_QUESTIONS: CompanyQuestion[] = [
  {
    id: "q1",
    company: COMPANIES[0],
    question: "What is your confidence level for this company's future growth?",
    description: "Rate your confidence in this company's financial prospects",
    options: ["Very Low", "Low", "Neutral", "High", "Very High"],
  },
  {
    id: "q2",
    company: COMPANIES[1],
    question: "How would you rate their management quality?",
    description: "Assess the leadership and management effectiveness",
    options: ["Poor", "Fair", "Good", "Very Good", "Excellent"],
  },
  {
    id: "q3",
    company: COMPANIES[2],
    question: "Is this a good investment for long-term holding?",
    description: "Share your opinion on long-term investment potential",
    options: [
      "Strongly Disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly Agree",
    ],
  },
  {
    id: "q4",
    company: COMPANIES[3],
    question: "What is your confidence level for this company's future growth?",
    description: "Rate your confidence in this company's financial prospects",
    options: ["Very Low", "Low", "Neutral", "High", "Very High"],
  },
  {
    id: "q5",
    company: COMPANIES[4],
    question: "How would you rate their management quality?",
    description: "Assess the leadership and management effectiveness",
    options: ["Poor", "Fair", "Good", "Very Good", "Excellent"],
  },
];

export default function Survey() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showSummary, setShowSummary] = useState(false);
  const [expandedCompanies, setExpandedCompanies] = useState<
    Record<string, boolean>
  >({});

  const question = SURVEY_QUESTIONS[currentQuestion];
  const progress =
    ((currentQuestion + Object.keys(answers).length) /
      (SURVEY_QUESTIONS.length * 2)) *
    100;

  const handleAnswer = (answer: string) => {
    setAnswers({
      ...answers,
      [question.id]: answer,
    });

    if (currentQuestion < SURVEY_QUESTIONS.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      setTimeout(() => setShowSummary(true), 300);
    }
  };

  const handleGoBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const toggleCompany = (company: string) => {
    setExpandedCompanies({
      ...expandedCompanies,
      [company]: !expandedCompanies[company],
    });
  };

  if (showSummary) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Navigation />

        <div className="flex-1 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-xl p-8 text-center shadow-lg">
              <div className="mb-6">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h1 className="text-4xl font-bold mb-4">Completed!</h1>
                <p className="text-lg text-muted-foreground">
                  Thank you for participating. Your insights help us understand
                  investor sentiment across Pakistan's top companies.
                </p>
              </div>

              <div className="bg-secondary/50 border border-border rounded-lg p-8 my-8">
                <h2 className="text-2xl font-bold mb-6">
                  Your Responses Summary
                </h2>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {SURVEY_QUESTIONS.slice(0, currentQuestion + 1).map((q) => (
                    <div
                      key={q.id}
                      className="text-left border-b border-border pb-4"
                    >
                      <p className="font-semibold text-sm text-primary mb-1">
                        {q.company}
                      </p>
                      <p className="font-medium mb-2">{q.question}</p>
                      <p className="text-accent font-bold">{answers[q.id]}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Your data has been recorded and will help us improve our
                  analysis and recommendations.
                </p>
                <Link
                  to="/"
                  className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navigation />

      <div className="flex-1 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all mb-6 font-semibold"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Home
            </Link>

            <h1 className="text-4xl font-bold mb-2">Pakistan Stock Market</h1>
            <p className="text-lg text-muted-foreground">
              Help us understand investor sentiment. Your opinions matter.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-medium">
                Question {currentQuestion + 1} of {SURVEY_QUESTIONS.length}
              </p>
              <p className="text-sm text-muted-foreground">
                {Math.round(progress)}%
              </p>
            </div>
            <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-card border border-border rounded-xl p-8 shadow-lg mb-8">
            <div className="mb-6">
              <p className="text-sm text-accent font-semibold mb-2">
                {question.company}
              </p>
              <h2 className="text-2xl font-bold mb-2">{question.question}</h2>
              <p className="text-muted-foreground">{question.description}</p>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className={`w-full p-4 rounded-lg border-2 font-medium transition-all text-left ${
                    answers[question.id] === option
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border bg-secondary/50 text-muted-foreground hover:border-primary/50 hover:bg-secondary"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {answers[question.id] === option && (
                      <CheckCircle className="h-5 w-5 text-primary" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleGoBack}
              disabled={currentQuestion === 0}
              className="px-6 py-3 border border-border rounded-lg font-semibold hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <div className="flex-1" />
            {currentQuestion === SURVEY_QUESTIONS.length - 1 &&
              answers[question.id] && (
                <button
                  onClick={() => setShowSummary(true)}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Finish
                </button>
              )}
          </div>

          {/* Company Accordion */}
          <div className="mt-12 pt-8 border-t border-border">
            <h3 className="text-xl font-bold mb-4">Coverage</h3>
            <div className="space-y-2">
              {COMPANIES.map((company) => (
                <button
                  key={company}
                  onClick={() => toggleCompany(company)}
                  className="w-full flex items-center justify-between p-4 bg-secondary/50 border border-border rounded-lg hover:bg-secondary transition-colors"
                >
                  <span className="font-medium">{company}</span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      expandedCompanies[company] ? "rotate-180" : ""
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
