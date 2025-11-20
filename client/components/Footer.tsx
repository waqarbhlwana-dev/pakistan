import { TrendingUp, Facebook, Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="logo-container h-10 w-10 rounded-full flex items-center justify-center cursor-pointer">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Fc0c96233b0fd4d3f8a042ddef2a72cd5%2F2aa968830ebb45beb2e708fd74f12b8a?format=webp&width=800"
                  alt="PSX Capitals logo"
                  className="h-full w-full object-contain rounded-full"
                />
              </div>
              <span className="logo-text font-bold text-lg">PSX CAPITALS</span>
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
