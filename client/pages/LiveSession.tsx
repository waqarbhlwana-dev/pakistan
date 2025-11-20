import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Calendar,
  Users,
  Clock,
  CheckCircle,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface Session {
  id: string;
  date: string;
  time: string;
  title: string;
  topic: string;
  capacity: number;
  enrolled: number;
}

export default function LiveSession() {
  const sessions: Session[] = [
    {
      id: "1",
      date: "December 15, 2024",
      time: "3:00 PM - 5:00 PM",
      title: "Stock Market Fundamentals Workshop",
      topic: "Learn the basics of stock trading and investment strategies",
      capacity: 50,
      enrolled: 32,
    },
    {
      id: "2",
      date: "December 22, 2024",
      time: "4:00 PM - 6:00 PM",
      title: "Technical Analysis Masterclass",
      topic: "Master candlestick patterns and chart analysis techniques",
      capacity: 50,
      enrolled: 28,
    },
    {
      id: "3",
      date: "December 29, 2024",
      time: "3:00 PM - 5:00 PM",
      title: "Portfolio Management Session",
      topic: "Build and manage a diversified investment portfolio",
      capacity: 50,
      enrolled: 15,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navigation />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">Live Training Sessions</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Join our interactive live training sessions and learn directly
              from experts. Network with fellow investors and gain practical
              knowledge about the stock market.
            </p>
          </div>

          {/* Location & Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Location Card */}
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Location</h3>
                  <p className="text-muted-foreground text-sm">
                    PSX Capital
                    <br />
                    Trust Plaza
                    <br />
                    Sargodha, Pakistan
                  </p>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Phone</h3>
                  <a
                    href="tel:0345-0119580"
                    className="text-primary hover:text-primary/80 text-sm font-medium"
                  >
                    0345-0119580
                  </a>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Email</h3>
                  <a
                    href="mailto:waqarbhlwana@gmail.com"
                    className="text-primary hover:text-primary/80 text-sm font-medium"
                  >
                    waqarbhlwana@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Sessions */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Upcoming Live Sessions</h2>
            <div className="space-y-4">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
                >
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Date & Time */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        <span className="font-semibold text-sm">Date</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {session.date}
                      </p>
                    </div>

                    {/* Time */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-5 w-5 text-primary" />
                        <span className="font-semibold text-sm">Time</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {session.time}
                      </p>
                    </div>

                    {/* Session Info */}
                    <div>
                      <h3 className="font-semibold text-sm mb-1">
                        {session.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {session.topic}
                      </p>
                    </div>

                    {/* Enrollment */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Users className="h-5 w-5 text-muted-foreground" />
                        <span className="text-sm">
                          {session.enrolled}/{session.capacity}
                        </span>
                      </div>
                      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
                        Register
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Session Benefits */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">
              Why Attend Our Sessions?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  title: "Expert Guidance",
                  description: "Learn from experienced market professionals",
                },
                {
                  title: "Live Interaction",
                  description: "Ask questions and get immediate responses",
                },
                {
                  title: "Networking",
                  description: "Connect with fellow investors and traders",
                },
                {
                  title: "Practical Skills",
                  description: "Gain hands-on knowledge for real trading",
                },
              ].map((benefit, idx) => (
                <div
                  key={idx}
                  className="bg-card border border-border rounded-lg p-4"
                >
                  <div className="flex items-start gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <h3 className="font-semibold text-sm">{benefit.title}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* How to Register */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4">How to Register</h2>
            <div className="space-y-3 text-muted-foreground mb-6">
              <p className="flex items-start gap-2">
                <span className="font-bold text-primary">1.</span>
                <span>
                  Click the "Register" button next to your preferred session
                </span>
              </p>
              <p className="flex items-start gap-2">
                <span className="font-bold text-primary">2.</span>
                <span>Fill in your details and confirm your registration</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="font-bold text-primary">3.</span>
                <span>You'll receive confirmation details via email</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="font-bold text-primary">4.</span>
                <span>Arrive 10 minutes early at the Trust Plaza venue</span>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Contact for More Info</h3>
                <p className="text-sm text-muted-foreground">
                  Have questions about our sessions? Get in touch with us:
                </p>
                <ul className="mt-3 space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <a
                      href="tel:0345-0119580"
                      className="text-primary hover:text-primary/80"
                    >
                      0345-0119580
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <a
                      href="mailto:waqarbhlwana@gmail.com"
                      className="text-primary hover:text-primary/80"
                    >
                      waqarbhlwana@gmail.com
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Venue Details</h3>
                <p className="text-sm text-muted-foreground">
                  All sessions are held at:
                </p>
                <p className="text-sm font-semibold mt-2">
                  PSX Capital
                  <br />
                  Trust Plaza
                  <br />
                  Sargodha, Pakistan
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <Link
              to="/"
              className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
