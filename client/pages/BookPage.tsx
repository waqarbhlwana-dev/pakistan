import { useParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function BookPage() {
  const { pageNum } = useParams();
  const navigate = useNavigate();
  const currentPage = parseInt(pageNum || "1", 10);
  const totalPages = 100;

  // Validate page number
  const isValidPage = currentPage >= 1 && currentPage <= totalPages;

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

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navigation />

      <main className="flex-1 max-w-6xl mx-auto w-full p-4 py-8">
        {/* Page Content */}
        <div className="bg-card border border-border rounded-xl p-8 mb-8">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-border">
            <h1 className="text-2xl font-bold">Page {currentPage}</h1>
            <span className="text-muted-foreground">
              {currentPage} of {totalPages}
            </span>
          </div>

          {/* Page Viewer */}
          <div className="bg-background rounded-lg p-8 min-h-96 flex items-center justify-center border border-border/50">
            <div className="text-center">
              <div className="text-6xl font-light text-muted-foreground mb-4">
                {currentPage}
              </div>
              <p className="text-muted-foreground">
                Page content would be displayed here
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="bg-card border border-border rounded-xl p-6 mb-8">
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

        {/* Page Grid */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">All Pages</h2>
          <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-15 gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageClick(pageNum)}
                className={`aspect-square flex items-center justify-center rounded-md border font-semibold text-sm transition-colors ${
                  currentPage === pageNum
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border bg-background hover:bg-primary hover:text-primary-foreground"
                }`}
              >
                {pageNum}
              </button>
            ))}
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
