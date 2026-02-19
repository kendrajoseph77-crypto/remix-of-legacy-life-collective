import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OrbitalRings from "@/components/OrbitalRings";

import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Zap, Shield, Globe, TrendingUp, RefreshCw, Star, Trophy } from "lucide-react";

const tiers = [
  {
    name: "Gold",
    entry: "$2,500",
    receive: "$7,500",
    desc: "Your gateway into the Coop5050Life™ ecosystem.",
  },
  {
    name: "Platinum",
    entry: "$5,000",
    receive: "$15,000",
    desc: "Elevated access for the serious wealth builder.",
  },
  {
    name: "Diamond",
    entry: "$10,000",
    receive: "$30,000",
    desc: "Elite tier. Maximum returns. Legacy-class wealth.",
    elite: true,
  },
];

const features = [
  { icon: Zap, title: "Fully Automated", desc: "From positioning to payments — the system handles everything." },
  { icon: Shield, title: "Transparent & Secure", desc: "No middlemen. Decentralized wallets. Your money, your way." },
  { icon: Globe, title: "Global Reach", desc: "150+ FIAT and 100+ crypto currencies accepted worldwide." },
  { icon: TrendingUp, title: "50/50 Always", desc: "You always receive exactly 50% — enforced by the system." },
  { icon: RefreshCw, title: "Infinite Cycling", desc: "Every time your Wheelhouse fills, a new one opens automatically." },
  { icon: Star, title: "Team Loyalty", desc: "The Möbius Loop ensures your team always follows you." },
];

const testimonials = [
  { quote: "I never imagined a system this transparent and powerful. Coop5050Life changed everything.", name: "M. Dawson", tier: "Diamond Member" },
  { quote: "The automation is incredible. I just invited two people and watched the cycle begin.", name: "A. Rodriguez", tier: "Gold Member" },
  { quote: "This is legacy wealth — not just income. I'm building something that lasts.", name: "T. Williams", tier: "Platinum Member" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-24 sm:pt-20 relative overflow-hidden">
        <OrbitalRings />

        <div className="relative z-10 w-full max-w-5xl mx-auto">
          {/* Anniversary Banner */}
          <div className="relative w-full max-w-3xl mx-auto mb-8 sm:mb-12">
            <div className="relative rounded-xl overflow-hidden border border-border bg-card">
              <div className="relative flex flex-col sm:flex-row items-center justify-between px-5 sm:px-8 py-4 sm:py-5 gap-3 sm:gap-6">

                {/* Trophy + number */}
                <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                  <Trophy size={24} className="sm:hidden text-muted-foreground" />
                  <Trophy size={32} className="hidden sm:block text-muted-foreground" />
                  <div>
                    <div className="text-3xl sm:text-5xl font-black leading-none tracking-tight text-foreground">
                      25
                    </div>
                    <div className="text-xs font-bold tracking-[0.3em] uppercase mt-0.5 text-muted-foreground">
                      Years
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px sm:w-px sm:h-14 shrink-0 bg-border" />

                {/* Center */}
                <div className="flex-1 text-center">
                  <div className="text-xs sm:text-base font-bold tracking-[0.1em] sm:tracking-[0.15em] uppercase mb-1 text-foreground">
                    Celebrating a Quarter Century
                  </div>
                  <div className="text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase text-muted-foreground">
                    of Cooperative Crowdfunding™
                  </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px sm:w-px sm:h-14 shrink-0 bg-border" />

                {/* Right */}
                <div className="text-center sm:text-right shrink-0">
                  <div className="text-xs tracking-widest uppercase mb-1 text-muted-foreground">Founded by</div>
                  <div className="text-sm font-semibold tracking-wide text-foreground">
                    David T. Rosen
                  </div>
                </div>

              </div>
            </div>
          </div>




          {/* Tagline */}
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-2 px-2">
            Cooperative Crowdfunding™ — <span className="text-foreground">Redefined.</span>
          </p>

          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed px-2">
            The world's most elite peer-to-peer crowdfunding system.
            Transparent. Automated. Unstoppable. 100% of every royalty goes
            directly to you — the participants.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              to="/join"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 sm:px-10 py-4 rounded-sm font-bold tracking-widest uppercase text-sm transition-all duration-300 hover:scale-105 bg-primary text-primary-foreground"
            >
              Join Us <ArrowRight size={16} />
            </Link>
            <Link
              to="/how-it-works"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 sm:px-10 py-4 rounded-sm font-medium tracking-widest uppercase text-sm border border-border hover:border-muted-foreground/40 transition-all duration-300 text-muted-foreground hover:text-foreground"
            >
              How It Works
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-px h-10 sm:h-12 bg-gradient-to-b from-transparent to-border" />
          <div className="w-1 h-1 rounded-full bg-muted-foreground" />
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 border-y border-border bg-card">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "100%", label: "Peer-to-Peer" },
              { value: "50/50", label: "Always" },
              { value: "3", label: "Elite Income Centers" },
              { value: "$52.5K+", label: "Max Cycle Earnings" },
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
                <p className="text-muted-foreground text-xs tracking-widest uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase font-medium mb-4">The System</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              We Each Do a Little<br />to All Receive a Lot
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Coop5050Life™ is a 2×2 peer-to-peer crowdfunding system where 100% of every
              contribution goes to you — the participants. No middlemen. No manipulation.
              No exceptions.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              You always receive <span className="text-foreground font-semibold">50%</span> and the other{" "}
              <span className="text-foreground font-semibold">50%</span> goes to a teammate. Together we build
              legacy-class wealth that keeps cycling — automatically.
            </p>
            <Link
              to="/how-it-works"
              className="inline-flex items-center gap-2 text-foreground hover:gap-3 transition-all duration-200 font-medium border-b border-border pb-0.5"
            >
              Learn How It Works <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {features.map((f, i) => (
              <div key={i} className="p-5 rounded-xl bg-card border border-border hover:border-muted-foreground/30 transition-all duration-300">
                <div className="p-2 rounded-lg w-fit mb-3 bg-muted/50">
                  <f.icon size={18} className="text-foreground" />
                </div>
                <h4 className="text-foreground font-semibold text-sm mb-1">{f.title}</h4>
                <p className="text-muted-foreground text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Income Center Levels */}
      <section className="py-24 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase font-medium mb-4">The Income Centers</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Begin Where You Fit In
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              There are 3 elite Income Center levels. Your ultimate goal is to be on all 3 —
              cycling simultaneously for maximum returns.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {tiers.map((tier, i) => (
              <div key={i} className="rounded-xl p-8 bg-background border border-border text-center relative transition-all duration-300 hover:scale-[1.02] hover:border-muted-foreground/40">
                {tier.elite && (
                  <div className="absolute top-3 right-3 px-2 py-1 rounded text-xs font-bold tracking-widest uppercase bg-muted text-muted-foreground">
                    Elite
                  </div>
                )}

                <p className="text-muted-foreground text-xs tracking-widest uppercase mb-2">{tier.name} Level</p>
                <p className="text-5xl font-bold mb-2 text-foreground">{tier.entry}</p>
                <p className="text-muted-foreground text-sm mb-2">Entry Contribution</p>
                <p className="text-muted-foreground text-xs leading-relaxed mb-6">{tier.desc}</p>

                <div className="border-t border-border pt-6 mb-6">
                  <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">You Receive Per Cycle</p>
                  <p className="text-3xl font-bold text-foreground">{tier.receive}</p>
                </div>

                <Link
                  to="/join"
                  className="block text-center py-3 rounded-sm text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:bg-primary hover:text-primary-foreground border border-border text-foreground"
                >
                  Select {tier.name}
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center rounded-xl p-8 bg-muted/30 border border-border">
            <p className="text-muted-foreground mb-2">On all 3 Income Centers — cycling just once:</p>
            <p className="text-5xl font-bold text-foreground mb-2">$52,500</p>
            <p className="text-muted-foreground text-sm">Imagine doing that 2 or 3 or more times — it's possible and easily doable!</p>
          </div>
        </div>
      </section>

      {/* How It Works Preview */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase font-medium mb-4">Simple Process</p>
          <h2 className="text-4xl md:text-5xl font-bold">
            Just 3 Simple Steps
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { n: "01", title: "Register & Activate", desc: "Register and become an Active Donor by making a contribution at your chosen level." },
            { n: "02", title: "Invite 2 Members", desc: "You help 2 or more people become Active Donors — your Wheelhouse begins to fill." },
            { n: "03", title: "Your Team Grows", desc: "Your 2 each help 2 or more. The cycle of giving and receiving continues — automatically." },
          ].map((step, i) => (
            <div key={i} className="rounded-xl p-8 bg-card border border-border text-center">
              <div className="text-6xl font-bold text-muted-foreground/20 mb-4">{step.n}</div>
              <h3 className="text-xl font-bold mb-3 text-foreground">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/how-it-works"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-sm font-medium tracking-widest uppercase text-sm border border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground/40 transition-all duration-300"
          >
            Full Explanation <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase font-medium mb-4">Community</p>
            <h2 className="text-4xl font-bold">Built on Real Results</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="rounded-xl p-8 bg-background border border-border hover:border-muted-foreground/30 transition-all duration-300">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={14} className="fill-foreground text-foreground opacity-60" />
                  ))}
                </div>
                <p className="text-foreground text-sm leading-relaxed mb-6 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-muted text-muted-foreground">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-foreground text-sm font-semibold">{t.name}</p>
                    <p className="text-muted-foreground text-xs">{t.tier}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 max-w-4xl mx-auto px-6 text-center">
        <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase font-medium mb-4">Ready?</p>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Your Fastest Way To Wealth</h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
          Join thousands who are already receiving. The system is live and waiting for you.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/join"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-10 py-4 rounded-sm font-bold tracking-widest uppercase text-sm transition-all duration-300 hover:scale-105 bg-primary text-primary-foreground"
          >
            Join Us Now <ArrowRight size={16} />
          </Link>
          <Link
            to="/how-it-works"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-10 py-4 rounded-sm font-medium tracking-widest uppercase text-sm border border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground/40 transition-all duration-300"
          >
            Learn More
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
