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
    "ABL",
    "ABOT",
    "AGP",
    "AICL",
    "AKBL",
    "APL",
    "ATRL",
    "ATLH",
    "BAFL",
    "BAHL",
    "BYCO",
    "BWCL",
    "CHCC",
    "COLG",
    "CRYL",
    "DCR",
    "DGKC",
    "DAWH",
    "DCCI",
    "EFUG",
    "EFERT",
    "EPCL",
    "ENGRO",
    "FATIMA",
    "FAYS",
    "FFC",
    "FFBL",
    "FHAM",
    "FPJM",
    "GATM",
    "GLAXO",
    "GRLE",
    "HBL",
    "HABIB",
    "HMB",
    "HCAR",
    "HUBC",
    "ICI",
    "INDU",
    "IPMV",
    "JDWS",
    "KAPCO",
    "KEL",
    "KTML",
    "LUCK",
    "MAPLE",
    "MARI",
    "MCB",
    "MEBL",
    "MLCF",
    "MTL",
    "NBP",
    "NCL",
    "NESTLE",
    "NML",
    "NWPL",
    "OGDC",
    "OIL",
    "PAP",
    "PAEL",
    "PIBTL",
    "PIA",
    "PLHC",
    "POL",
    "POIC",
    "POWER",
    "PPL",
    "PREL",
    "PSMC",
    "PSO",
    "PSX",
    "PTCL",
    "PUL",
    "RMPL",
    "SHELL",
    "SHEL",
    "SNGP",
    "SSGC",
    "SIEMENS",
    "TASS",
    "TRG",
    "TVMH",
    "UBL",
    "UNITY",
    "WADT",
    "WAVESEED",
    "ZADCO",
    "ZONG",
    "ZTBL",
    "BTIL",
    "CANDL",
    "CEPB",
    "CPLC",
    "EDPL",
    "FEPL",
    "FPWL",
    "GTYR",
    "GYPC",
    "HASCOL",
    "HIGHNOON",
    "HUZAIMA",
    "IPELCO",
    "IRTC",
    "KBBL",
    "KMC",
    "LEVY",
    "LOADS",
    "MIRZA",
    "NCCPL",
    "NETSOL",
    "PKLI",
    "SABAFON",
    "SEALING",
    "SHAFCO",
    "SNGL",
    "STBL",
    "SURL",
    "SYSTEM",
  ];

  const otherPsxSymbols = [
    "786",
    "AABS",
    "ABSON",
    "ACPL",
    "ADAMS",
    "AGIC",
    "AGIL",
    "AGTL",
    "AGHA",
    "AHCL",
    "AHL",
    "AHTM",
    "AIRLINK",
    "AKDSL",
    "AKGL",
    "ALAC",
    "ALIFE",
    "ALNRS",
    "AMILCO",
    "AMTL",
    "ANDL",
    "ANIL",
    "ANWL",
    "APWC",
    "ARUP",
    "ASLL",
    "ASL",
    "ASLM",
    "AATM",
    "AAL",
    "AASM",
    "ACIETF",
    "ADMM",
    "AGLNCPS",
    "AGSML",
    "ALHDL",
    "ALSC",
    "AMZL",
    "ANSM",
    "AQCL",
    "AQGL",
    "AQIC",
    "AQLC",
    "ARIL",
    "ARKL",
    "ARPM",
    "ARSL",
    "ARTL",
    "ARZM",
    "ASB",
    "ASCL",
    "ASIC",
    "ASML",
    "ASSC",
    "ATAL",
    "ATFC",
    "ATHM",
    "ATIF",
    "ATKL",
    "ATML",
    "ATSC",
    "AUFC",
    "AUGR",
    "AUTC",
    "AUTL",
    "AVCL",
    "AVDL",
    "AVFS",
    "AVGC",
    "AVGL",
    "AVIS",
    "AWCL",
    "AWDL",
    "AWIL",
    "AWPL",
    "AWSC",
    "AWSL",
    "AXFL",
    "AXGL",
    "AXIL",
    "AYLL",
    "AZBL",
    "AZFL",
    "AZRL",
    "AZSL",
    "AZWL",
    "AZIBL",
    "AZIZ",
    "BABL",
    "BACL",
    "BADL",
    "BAFL",
    "BAGL",
    "BAHL",
    "BAIL",
    "BAJL",
    "BAKL",
    "BALL",
    "BAML",
    "BANL",
    "BAPL",
    "BARL",
    "BASL",
    "BOP",
    "BATL",
    "BAUL",
    "BAVL",
    "BAWL",
    "BAXL",
    "BAYL",
    "BAZL",
    "BCAL",
    "BCBL",
    "BCCL",
    "BCDL",
    "BCEL",
    "BCFL",
    "BCGL",
    "BCHL",
    "BCIL",
    "BCJL",
    "BCKL",
    "BCLL",
    "BCML",
    "BCNL",
    "BCOL",
    "BCPL",
    "BCQL",
    "BCRL",
    "BCSL",
    "BCTL",
    "BCUL",
    "BCVL",
    "BCWL",
    "BCXL",
    "BCYL",
    "BCZL",
    "BDAL",
    "BDBL",
    "BDCL",
    "BDEL",
    "BDFL",
    "BDGL",
    "BDHL",
    "BDIL",
    "BDJL",
    "BDKL",
    "BDLL",
    "BDML",
    "BDNL",
    "BDOL",
    "BDPL",
    "BDRL",
    "BDSL",
    "BDTL",
    "BDUL",
    "BDVL",
    "BDWL",
    "BDXL",
    "BDYL",
    "BDZL",
    "BEAL",
    "BEBL",
    "BECL",
    "BEDL",
    "BEEL",
    "BEFL",
    "BEGL",
    "BEHL",
    "BEIL",
    "BEJL",
    "BEKL",
    "BELL",
    "BEML",
    "BENL",
    "BEOL",
    "BEPL",
    "BERQ",
    "BERL",
    "BESL",
    "BETL",
    "BEUL",
    "BEVL",
    "BEWL",
    "BEXL",
    "BEYL",
    "BEZL",
    "BFAL",
    "BFBL",
    "BFCL",
    "BFDL",
    "BFEL",
    "BFFL",
    "BFGL",
    "BFHL",
    "BFIL",
    "BFJL",
    "BFKL",
    "BFLL",
    "BFML",
    "BFNL",
    "BFOL",
    "BFPL",
    "BFQL",
    "BFRL",
    "BFSL",
    "BFTL",
    "BFUL",
    "BFVL",
    "BFWL",
    "BFXL",
    "BFYL",
    "BFZL",
    "CANDL",
    "CEPB",
    "CGCL",
    "CHCC",
    "CLCL",
    "COML",
    "COLG",
    "COMEC",
    "CPERL",
    "CPPL",
    "CRPL",
    "CRYL",
    "CSML",
    "CTBL",
    "CTNL",
    "CTML",
    "CTPL",
    "CTRL",
    "CSIL",
    "DARB",
    "DCDL",
    "DCCL",
    "DCML",
    "DCPL",
    "DCRL",
    "DCSL",
    "DCTC",
    "DCWL",
    "DCYL",
    "DFEL",
    "DKGL",
    "ECPL",
    "EDPL",
    "EFUG",
    "ENGRO",
    "EPCL",
    "FACCL",
    "FATIMA",
    "FAYS",
    "FEPL",
    "FGBL",
    "FHTML",
    "FILTERSPL",
    "FIMM",
    "FKBL",
    "FLAPL",
    "FLEL",
    "FLYNG",
    "FMFML",
    "FNBSF",
    "FOUKL",
    "FOWL",
    "FPWL",
    "FRBL",
    "FRDL",
    "FREEL",
    "FRHL",
    "FRPL",
    "FRSL",
    "FSIL",
    "FUEL",
    "FULCL",
    "FUSPL",
    "GALH",
    "GAUMT",
    "GBLPL",
    "GDAL",
    "GDKC",
    "GDPL",
    "GFCL",
    "GGCL",
    "GGFL",
    "GGLCL",
    "GGPL",
    "GGSL",
    "GGTL",
    "GLAXO",
    "GLPL",
    "GMSM",
    "GNMCL",
    "GPPL",
    "GPSL",
    "GPTL",
    "GRCL",
    "GRFL",
    "GRGL",
    "GRILE",
    "GRLE",
    "GRLIL",
    "GRMCL",
    "GRNL",
    "GRSPL",
    "GTCL",
    "GTYR",
    "GUBBL",
    "GUCL",
    "GUDL",
    "GUEL",
    "GUFL",
    "GUGL",
    "GUHL",
    "GUIL",
    "GUJL",
    "GUKL",
    "GULL",
    "GUML",
    "GUNL",
    "GUOL",
    "GUPL",
    "GUQL",
    "GURL",
    "GUSL",
    "GUTL",
    "GUUL",
    "GUVL",
    "GUWL",
    "GUXL",
    "GUYL",
    "GUZL",
    "GYPC",
    "HASCOL",
    "HCAR",
    "HELLO",
    "HIGHNOON",
    "HK",
    "HMB",
    "HPAL",
    "HPCL",
    "HRIL",
    "HUBC",
    "HUZAIMA",
    "IAMOLD",
    "IAMTECH",
    "ICCL",
    "ICDL",
    "ICEL",
    "ICFL",
    "ICGL",
    "ICHC",
    "ICHL",
    "ICIL",
    "ICKL",
    "ICLH",
    "ICLL",
    "ICML",
    "ICNL",
    "ICOL",
    "ICPL",
    "ICRML",
    "ICRL",
    "ICSL",
    "ICTC",
    "ICUL",
    "ICVL",
    "ICWL",
    "ICXL",
    "ICYL",
    "ICZL",
    "IDCL",
    "IDFCL",
    "IDFL",
    "IDGL",
    "IDHL",
    "IDIL",
    "IDJL",
    "IDKL",
    "IDLL",
    "IDML",
    "IDNL",
    "IDOL",
    "IDPL",
    "IDQL",
    "IDRL",
    "IDSL",
    "IDTL",
    "IDUL",
    "IDVL",
    "IDWL",
    "IDXL",
    "IDYL",
    "IDZL",
    "IFEL",
    "IFFL",
    "IFGL",
    "IFHL",
    "IFIL",
    "IFJL",
    "IFKL",
    "IFLL",
    "IFML",
    "IFNL",
    "IFOL",
    "IFPL",
    "IFQL",
    "IFRL",
    "IFSL",
    "IFTL",
    "IFUL",
    "IFVL",
    "IFWL",
    "IFXL",
    "IFYL",
    "IFZL",
    "IGAS",
    "IGCL",
    "IGDL",
    "IGEL",
    "IGFL",
    "IGGL",
    "IGHL",
    "IGIL",
    "IGJL",
    "IGKL",
    "IGLL",
    "IGML",
    "IGNL",
    "IGOL",
    "IGPL",
    "IGQL",
    "IGRL",
    "IGSL",
    "IGTL",
    "IGUL",
    "IGVL",
    "IGWL",
    "IGXL",
    "IGYL",
    "IGZL",
    "IHCL",
    "IHDL",
    "IHEL",
    "IHFL",
    "IHGL",
    "IHHL",
    "IHIL",
    "IHJL",
    "IHKL",
    "IHLL",
    "IHML",
    "IHNL",
    "IHOL",
    "IHPL",
    "IHQL",
    "IHRL",
    "IHSL",
    "IHTL",
    "IHUL",
    "IHVL",
    "IHWL",
    "IHXL",
    "IHYL",
    "IHZL",
    "IJAL",
    "IJBL",
    "IJCL",
    "IJDL",
    "IJEL",
    "IJFL",
    "IJGL",
    "IJHL",
    "IJIL",
    "IJJL",
    "IJKL",
    "IJLL",
    "IJML",
    "IJNL",
    "IJOL",
    "IJPL",
    "IJQL",
    "IJRL",
    "IJSL",
    "IJTL",
    "IJUL",
    "IJVL",
    "IJWL",
    "IJXL",
    "IJYL",
    "IJZL",
    "IKAL",
    "IKBL",
    "IKCL",
    "IKDL",
    "IKEL",
    "IKFL",
    "IKGL",
    "IKHL",
    "IKIL",
    "IKJL",
    "IKKL",
    "IKLL",
    "IKML",
    "IKNL",
    "IKOL",
    "IKPL",
    "IKQL",
    "IKRL",
    "IKSL",
    "IKTL",
    "IKUL",
    "IKVL",
    "IKWL",
    "IKXL",
    "IKYL",
    "IKZL",
    "ILAL",
    "ILBL",
    "ILCL",
    "ILDL",
    "ILEL",
    "ILFL",
    "ILGL",
    "ILHL",
    "ILIL",
    "ILJL",
    "ILKL",
    "ILLL",
    "ILML",
    "ILNL",
    "ILOL",
    "ILPL",
    "ILQL",
    "ILRL",
    "ILSL",
    "ILTL",
    "ILUL",
    "ILVL",
    "ILWL",
    "ILXL",
    "ILYL",
    "ILZL",
    "IMEL",
    "IMFL",
    "IMGEL",
    "IMGL",
    "IMHL",
    "IMIL",
    "IMJL",
    "IMKL",
    "IMLL",
    "IMML",
    "IMNL",
    "IMOL",
    "IMPL",
    "IMQL",
    "IMRL",
    "IMSL",
    "IMTL",
    "IMUL",
    "IMVL",
    "IMWL",
    "IMXL",
    "IMYL",
    "IMZL",
    "INAL",
    "INBL",
    "INCL",
    "INDL",
    "INEL",
    "INFL",
    "INGL",
    "INHL",
    "INIL",
    "INJL",
    "INKL",
    "INLL",
    "INML",
    "INNL",
    "INOL",
    "INPL",
    "INQL",
    "INRL",
    "INSL",
    "INTL",
    "INUL",
    "INVL",
    "INWL",
    "INXL",
    "INYL",
    "INZL",
    "IOAL",
    "IOBL",
    "IOCL",
    "IODL",
    "IOEL",
    "IOFL",
    "IOGL",
    "IOHL",
    "IOIL",
    "IOJL",
    "IOKL",
    "IOLL",
    "IOML",
    "IONL",
    "IOOL",
    "IOPL",
    "IOQL",
    "IORL",
    "IOSL",
    "IOTL",
    "IOUL",
    "IOVL",
    "IOWL",
    "IOXL",
    "IOYL",
    "IOZL",
    "PRL",
    "SZTM",
    "TSPL",
    "GCWL",
    "ALAC",
    "SHNI",
    "DWAE",
    "ZAL",
    "PKGP",
    "OTSU",
    "SERT",
    "NRSL",
    "PREMA",
    "PINL",
    "SHEZ",
    "PIOC",
    "BAWH",
    "RPL",
    "NATF",
    "SCBPL",
    "KOHC",
    "HINOON",
    "JVDC",
    "THALL",
    "LCI",
    "SRVI",
    "BECO",
    "HAEL",
    "ILP",
    "HGFA",
    "NCPL",
    "TGL",
    "PABC",
    "YOUW",
    "SAZEW",
    "INIL",
    "FCEPL",
    "GHGL",
    "MUGHL",
    "FABL",
    "NPL",
    "ISL",
    "MLC",
    "DCKC",
    "KOSM",
    "SEARL",
    "LOTHCHEM",
    "PTC",
    "AVN",
    "POB",
    "CENERGY",
    "PIBT",
  ];

  const initialSymbols = [...kse100Symbols, ...otherPsxSymbols];

  // Build a 100-item assets list with all KSE100 companies
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
    <nav className="sticky top-0 z-50 border-b border-slate-700 bg-slate-900 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="logo-container h-10 w-10 rounded-full flex items-center justify-center cursor-pointer">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Fc0c96233b0fd4d3f8a042ddef2a72cd5%2F2aa968830ebb45beb2e708fd74f12b8a?format=webp&width=800"
                alt="PSX Capitals logo"
                className="h-full w-full object-contain rounded-lg"
              />
            </div>
            <span className="logo-text font-bold text-lg">PSX CAPITALS</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-0">
            {navItems.map((item, index) => (
              <div key={`desktop-${index}`} className="relative group">
                {item.href && !item.submenu ? (
                  <Link
                    to={item.href}
                    className="px-4 py-2 text-sm font-medium text-slate-200 hover:text-white hover:bg-slate-800 transition-colors rounded-md"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <>
                    <button
                      className="px-4 py-2 text-sm font-medium text-slate-200 hover:text-white hover:bg-slate-800 transition-colors rounded-md flex items-center gap-1"
                      onMouseEnter={() => setOpenDropdown(item.label)}
                      onMouseLeave={() => {
                        setOpenDropdown(null);
                        if (item.label === "Research Report") {
                          setSearchQuery("");
                        }
                      }}
                    >
                      {item.label}
                      {item.submenu && <ChevronDown className="h-4 w-4" />}
                    </button>

                    {/* Dropdown Menu */}
                    {item.submenu && (
                      <div className="absolute left-0 mt-0 w-56 bg-slate-800 border border-slate-700 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                        {item.label === "Research Report" && (
                          <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-3 rounded-t-md">
                            <div className="relative">
                              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                              <input
                                type="text"
                                placeholder="Search assets..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                                className="w-full bg-slate-700 text-slate-100 placeholder-slate-400 rounded px-3 py-2 pl-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                          </div>
                        )}
                        <div
                          className={
                            item.label === "Research Report"
                              ? "max-h-64 overflow-y-auto"
                              : ""
                          }
                        >
                          {item.submenu
                            .filter((subitem) =>
                              item.label === "Research Report"
                                ? subitem.label
                                    .toLowerCase()
                                    .includes(searchQuery.toLowerCase())
                                : true,
                            )
                            .map((subitem, subindex) => (
                              <Link
                                key={`submenu-${subindex}`}
                                to={subitem.href}
                                className="block px-4 py-2 text-sm text-slate-200 hover:text-white hover:bg-slate-700 transition-colors"
                              >
                                {subitem.label}
                              </Link>
                            ))}
                          {item.label === "Research Report" &&
                            item.submenu.filter((subitem) =>
                              subitem.label
                                .toLowerCase()
                                .includes(searchQuery.toLowerCase()),
                            ).length === 0 && (
                              <div className="px-4 py-2 text-sm text-slate-400 text-center">
                                No assets found
                              </div>
                            )}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Download Button and Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <a
              href="https://files.appsgeyser.com/psxcapitals_19270652.apk"
              className="hidden sm:block px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
              download
            >
              DOWNLOAD
            </a>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-700 pb-4 bg-slate-900">
            <div className="flex flex-col gap-2 pt-4">
              {navItems.map((item, index) => (
                <div key={`mobile-${index}`}>
                  {item.href && !item.submenu ? (
                    <Link
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-4 py-2 rounded-md text-sm font-medium text-slate-200 hover:text-white hover:bg-slate-800 transition-colors"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <>
                      <button
                        onClick={() =>
                          setOpenDropdown(
                            openDropdown === item.label ? null : item.label,
                          )
                        }
                        className="w-full text-left px-4 py-2 rounded-md text-sm font-medium text-slate-200 hover:text-white hover:bg-slate-800 transition-colors flex items-center justify-between"
                      >
                        {item.label}
                        {item.submenu && (
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                              openDropdown === item.label ? "rotate-180" : ""
                            }`}
                          />
                        )}
                      </button>
                      {item.submenu && openDropdown === item.label && (
                        <div className="bg-slate-800 border-l-2 border-slate-700">
                          {item.label === "Research Report" && (
                            <div className="px-4 py-3 border-b border-slate-700">
                              <div className="relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <input
                                  type="text"
                                  placeholder="Search assets..."
                                  value={searchQuery}
                                  onChange={(e) =>
                                    setSearchQuery(e.target.value)
                                  }
                                  className="w-full bg-slate-700 text-slate-100 placeholder-slate-400 rounded px-3 py-2 pl-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                            </div>
                          )}
                          {item.submenu
                            .filter((subitem) =>
                              item.label === "Research Report"
                                ? subitem.label
                                    .toLowerCase()
                                    .includes(searchQuery.toLowerCase())
                                : true,
                            )
                            .map((subitem, subindex) => (
                              <Link
                                key={`mobile-submenu-${subindex}`}
                                to={subitem.href}
                                onClick={() => {
                                  setIsMenuOpen(false);
                                  setOpenDropdown(null);
                                  setSearchQuery("");
                                }}
                                className="block px-8 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                              >
                                {subitem.label}
                              </Link>
                            ))}
                          {item.label === "Research Report" &&
                            item.submenu.filter((subitem) =>
                              subitem.label
                                .toLowerCase()
                                .includes(searchQuery.toLowerCase()),
                            ).length === 0 && (
                              <div className="px-8 py-2 text-sm text-slate-400 text-center">
                                No assets found
                              </div>
                            )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
              <a
                href="https://files.appsgeyser.com/psxcapitals_19270652.apk"
                className="block px-4 py-2 mx-2 mt-2 bg-primary text-white font-semibold rounded-lg hover:opacity-90 transition-opacity text-center"
                download
              >
                DOWNLOAD
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
