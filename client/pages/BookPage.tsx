import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function BookPage() {
  const { pageNum } = useParams();
  const navigate = useNavigate();
  const currentPage = parseInt(pageNum || "1", 10);
  const totalPages = 100;
  const [PageContent, setPageContent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Validate page number
  const isValidPage = currentPage >= 1 && currentPage <= totalPages;

  useEffect(() => {
    if (!isValidPage) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    // Dynamically import the book page component
    import(`./book/${currentPage}.tsx`)
      .then((module) => {
        setPageContent(() => module.default);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [currentPage, isValidPage]);

  const handlePrevious = () => {
    if (currentPage > 1) {
      navigate(`/book/page/${currentPage - 1}`);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      navigate(`/book/page/${currentPage + 1}`);
    }
  };

  const handlePageClick = (pageNum: number) => {
    navigate(`/book/page/${pageNum}`);
  };

  if (!isValidPage) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Invalid Page</h1>
            <p className="text-muted-foreground mb-4">
              Please select a page between 1 and {totalPages}
            </p>
            <button
              onClick={() => navigate("/book")}
              className="inline-flex items-center bg-primary text-primary-foreground px-4 py-2 rounded-md font-semibold hover:opacity-90"
            >
              Back to Book
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Show fallback content immediately while loading
  const pageContent = PageContent ? (
    <PageContent />
  ) : (
    <div className="bg-card border border-border rounded-xl p-8 mb-8">
      <h1 className="text-2xl font-bold mb-4">صفحہ {currentPage}</h1>
      <div className="prose prose-invert max-w-none">
        <p className="text-muted-foreground leading-relaxed">
          یہاں صفحہ {currentPage} کا مواد ہوگا۔
        </p>
        <p className="text-muted-foreground leading-relaxed mt-4">
          This is the content area for page {currentPage}. Add your book content here.
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navigation />

      <main className="flex-1 max-w-6xl mx-auto w-full p-4 py-8">
        {/* Render the page content or fallback */}
        {pageContent}

        {/* Navigation Controls */}
        <div className="bg-card border border-border rounded-xl p-6 mb-8 mt-8">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={18} />
              Previous
            </button>

            <div className="flex-1 text-center">
              <div className="inline-flex items-center gap-2 bg-background px-4 py-2 rounded-md border border-border">
                <input
                  type="number"
                  min="1"
                  max={totalPages}
                  value={currentPage}
                  onChange={(e) => {
                    const page = parseInt(e.target.value, 10);
                    if (page >= 1 && page <= totalPages) {
                      handlePageClick(page);
                    }
                  }}
                  className="w-16 bg-background text-foreground text-center focus:outline-none"
                />
                <span className="text-muted-foreground">/ {totalPages}</span>
              </div>
            </div>

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/book")}
            className="inline-flex items-center bg-secondary text-secondary-foreground px-6 py-2 rounded-md font-semibold hover:opacity-90"
          >
            Back to Book Overview
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
