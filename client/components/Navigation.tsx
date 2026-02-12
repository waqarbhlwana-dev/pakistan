import { Link } from "react-router-dom";
import { TrendingUp, Menu, X, ChevronDown, Search } from "lucide-react";
import { useState } from "react";

interface DropdownItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href?: string;
  submenu?: DropdownItem[];
}

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const kse100Symbols = [
    "ABL","ABOT","AGP","AICL","AKBL","APL","ATLH","ATRL","AIRLINK","BAFL","BNWM","BAHL","BOP",
    "BYCO","BWCL","CHCC","CHPL","COLG","CNERGY","CHPL","CRYL","DCR","DGKC","DHPL",
    "DAWH","DOHM","DCCI","EFUG","EFERT","EPCL","ENGRO","FATIMA","FAYS","FFC",
    "FFL","FCCL","FFBL","FHAM","FPJM","GATM","GAL","GADT","GHNI","GLAXO",
    "GRLE","GHGL","HBL","HABIB","HUMNL","HGFA","HALEON","HMB","HCAR","HUBC","ICI",
    "IBFL","INDU","ISL","IPMV","JDWS","KAPCO","KEL","KTML","LUCK","LOTCHEM","MAPLE",
    "MARI","MEHT","MUREB","MCB","MEBL","MLCF","MTL","NBP","NCL","NESTLE",
    "NML","NATF","NWPL","OGDC","OIL","PAP","PAKT","PAEL","PIBTL","PIA","PLHC","PTC",
    "POL","POIC","POWER","PPL","PREL","PSMC","PSEL","PSO","PSX","PGLC","PUL","PKGP",
    "RMPL","SHELL","SSOM","SHEL","SEARL","SYS","SHFA","SNGP","SSGC","SIEMENS","TASS",
    "TOMCL","TRG","THALL","TPLRFF1","TVMH","UBL","UPFL","UNITY","WADT",
    "WAVESEED","YOUW","ZONG","ZTBL"
  ];

  const otherPsxSymbols = ["AVN","PIBT","CENERGY"];

  const initialSymbols = [...kse100Symbols, ...otherPsxSymbols];

  const psxAssets: DropdownItem[] = initialSymbols.map((s) => ({
    label: s,
    href: `/assets/${s}`,
  }));

  const navItems: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "Account Managment", href: "/account-managment" },
    {
      label: "SERVICE",
      submenu: [
        { label: "Stock Market Book", href: "/stock-market-book" },
        { label: "Portfolio Managment", href: "/portfolio-managment" },
        { label: "Live Update", href: "/live" },
        { label: "Free Course", href: "/free-course" },
        { label: "Paid Course", href: "/paid-course" },
        { label: "Account Opening", href: "/account-opening" },
        { label: "Live Seesion", href: "/live-seesion" },
      ],
    },
    {
      label: "Research Report",
      submenu: psxAssets,
    },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-700 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="font-bold text-lg">PSX CAPITALS</Link>

          <div className="hidden md:flex">
            {navItems.map((item, index) => (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button className="px-4 py-2 flex items-center gap-1">
                  {item.label}
                  {item.submenu && <ChevronDown size={16} />}
                </button>

                {item.submenu && openDropdown === item.label && (
                  <div className="absolute left-0 w-56 bg-slate-800 border border-slate-700 rounded-md shadow-lg z-50">
                    {item.label === "Research Report" && (
                      <div className="p-3 border-b border-slate-700">
                        <div className="relative">
                          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4" />
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search assets..."
                            className="w-full pl-8 px-2 py-1 bg-slate-700 rounded"
                          />
                        </div>
                      </div>
                    )}

                    <div className="max-h-64 overflow-y-auto">
                      {item.submenu
                        .filter((s) =>
                          s.label
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase())
                        )
                        .map((s, i) => (
                          <Link
                            key={i}
                            to={s.href}
                            className="block px-4 py-2 hover:bg-slate-700"
                          >
                            {s.label}
                          </Link>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </nav>
  );
}
