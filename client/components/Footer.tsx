import { TrendingUp, Facebook, Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F0c52bb94a8fc4cc08912fe4d89fdbf38%2F33cc917dc3c84c538d4c1a508e4f96b3?format=webp&width=800"
                  alt="PSX Capitals logo"
                  className="h-full w-full object-contain rounded-lg"
                />
              </div>
              <span className="font-bold text-lg">PSX CAPITALS</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              site build by psx capitals & fixorium (fixercoin) crypto network
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
