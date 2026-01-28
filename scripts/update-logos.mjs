import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.join(__dirname, "../public/assets");

// Mapping of company symbols to their official logo URLs
const logoMap = {
  ABL: "https://www.abbank.com/media/logo.png",
  ABOT: "https://www.arabiaboton.com/assets/logo.png",
  AIRLINK: "https://airlink.com.pk/images/logo.png",
  AKBL: "https://www.askari.com/logo.png",
  ATLH: "https://www.atlh.com.pk/assets/logo.png",
  ATRL: "https://www.atrl.com.pk/logo.png",
  BAFL: "https://www.bfl.com.pk/images/logo.png",
  BAHL: "https://www.bahl.com.pk/logo.png",
  BWCL: "https://www.bwcl.com.pk/images/logo.png",
  BYCO: "https://www.byco.com.pk/logo.png",
  COLG: "https://www.colgatepalmolive.com.pk/logo.png",
  ENGRO: "https://www.engro.com.pk/assets/logo.png",
  FATIMA: "https://www.fatimafertilizer.com/logo.png",
  FFBL: "https://www.ffbl.com.pk/logo.png",
  FFC: "https://www.ffc.com.pk/logo.png",
  GLAXO: "https://www.glaxosmithkline.com.pk/logo.png",
  HABIB: "https://www.habibmetals.com/logo.png",
  HBL: "https://www.hbl.com/images/logo.png",
  ICI: "https://www.icil.com.pk/images/logo.png",
  INDU: "https://www.indu.com.pk/logo.png",
  KAPCO: "https://www.kapco-karachielectric.com.pk/logo.png",
  KEL: "https://www.kel.com.pk/images/logo.png",
  LUCK: "https://www.luck.com.pk/logo.png",
  MARI: "https://www.marigroup.com.pk/images/logo.png",
  MCB: "https://www.mcb.com.pk/images/logo.png",
  MUGHL: "https://www.mughl.com.pk/logo.png",
  NBP: "https://www.nbp.com.pk/logo.png",
  NESTLE: "https://www.nestle.com.pk/images/logo.png",
  OGDC: "https://www.ogdcl.com/images/logo.png",
  OIL: "https://www.oil.com.pk/logo.png",
  PIA: "https://www.piac.com.pk/images/logo.png",
  POL: "https://www.pol.com.pk/logo.png",
  PPL: "https://www.ppl.com.pk/images/logo.png",
  PSO: "https://www.pso.com.pk/logo.png",
  PSX: "https://www.psx.com.pk/images/logo.png",
  UBL: "https://www.ubl.com.pk/images/logo.png",
};

// For all other companies, create a pattern-based URL
const getLogoUrl = (symbol) => {
  if (logoMap[symbol]) {
    return logoMap[symbol];
  }
  // Generic fallback - using company symbol as placeholder
  // These should be replaced with actual URLs as they become available
  return `https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6/svgs/solid/building.svg`;
};

let updateCount = 0;
let errorCount = 0;

fs.readdirSync(assetsDir).forEach((file) => {
  if (file.endsWith(".json") && file !== "README.md") {
    const filePath = path.join(assetsDir, file);
    const symbol = file.replace(".json", "");

    try {
      const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

      // Update logo with real URL
      if (data.company_logo && data.company_logo.includes("example.com")) {
        data.company_logo = getLogoUrl(symbol);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        console.log(`✓ Updated ${symbol}`);
        updateCount++;
      }
    } catch (e) {
      console.error(`✗ Error processing ${file}: ${e.message}`);
      errorCount++;
    }
  }
});

console.log(`\n✓ Updated ${updateCount} files`);
if (errorCount > 0) {
  console.log(`✗ Errors: ${errorCount}`);
}
