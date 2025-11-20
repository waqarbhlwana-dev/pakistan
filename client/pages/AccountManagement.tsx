import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function AccountManagement() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <main className="max-w-4xl mx-auto p-4">
        <div className="bg-card border border-border rounded-xl p-6">
          <h1 className="text-2xl font-bold mb-4">Account Management</h1>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">
              Investment Requirements
            </h2>
            <ul className="list-disc list-inside text-muted-foreground">
              <li>
                Minimum investment required:{" "}
                <span className="font-medium text-white">₨500,000</span>
              </li>
              <li>
                Expected markup:{" "}
                <span className="font-medium text-white">30%</span>
              </li>
              <li>
                Target allocation:{" "}
                <span className="font-medium text-white">
                  Companies listed in KSE-100
                </span>
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">How it works</h2>
            <p className="text-muted-foreground">
              Our managed investment service allocates funds across selected
              companies within the KSE-100 index, aiming for growth while
              managing risk. Investments are handled by experienced portfolio
              managers and are subject to market conditions.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Disclaimer</h2>
            <p className="text-sm text-red-400">
              Investing carries risks. Past performance is not indicative of
              future results. You may lose some or all of your invested capital.
              Returns are not guaranteed.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">
              Contact & Account Opening
            </h2>
            <p className="text-muted-foreground mb-2">
              To open an account or request more information, contact us:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-800 p-4 rounded-md">
                <div className="text-xs text-slate-400">Email</div>
                <div className="font-medium text-white">
                  waqarbhlwana@gmail.com
                </div>
              </div>

              <div className="bg-slate-800 p-4 rounded-md">
                <div className="text-xs text-slate-400">Phone</div>
                <div className="font-medium text-white">0345-0119580</div>
              </div>
            </div>

            <div className="mt-4">
              <Link
                to="/account-managment"
                className="inline-flex items-center bg-primary text-primary-foreground px-4 py-2 rounded-md font-semibold"
              >
                Start Account Opening
              </Link>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">More Information</h2>
            <p className="text-muted-foreground">
              For full terms, fees, and performance targets please get in touch.
              All investments are subject to comprehensive suitability checks.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
