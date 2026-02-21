import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OrbitalRings from "@/components/OrbitalRings";
import WheelhouseDiagram from "@/components/WheelhouseDiagram";
import { useState } from "react";
import anniversarySeal from "@/assets/anniversary-seal.png";

import { Link } from "react-router-dom";

const tiers = [
  {
    name: "Level 1",
    entry: "$2,500",
    receive: "$7,500",
    desc: "Your gateway into the ecosystem.",
    colorClass: "tier-gold",
    receiveColor: "text-gold",
    ringColor: "ring-gold border-gold",
  },
  {
    name: "Level 2",
    entry: "$5,000",
    receive: "$15,000",
    desc: "Elevated access for the serious wealth builder.",
    colorClass: "tier-platinum",
    receiveColor: "text-gold-light",
    ringColor: "ring-gold-light border-gold-light",
  },
  {
    name: "Level 3",
    entry: "$10,000",
    receive: "$30,000",
    desc: "Maximum returns. Legacy-class wealth.",
    colorClass: "tier-diamond",
    receiveColor: "text-champagne",
    ringColor: "ring-champagne border-champagne",
  },
];

const steps = [
  { n: "01", title: "Register & Activate", desc: "Make your one-time contribution at your chosen level and activate your Wheelhouse position." },
  { n: "02", title: "Invite 2 Members", desc: "Help 2 people become Active Donors. Your Wheelhouse begins to fill immediately." },
  { n: "03", title: "Receive & Repeat", desc: "When your Wheelhouse fills, you receive 50% and a new Wheelhouse opens — automatically." },
];

const Index = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* ── Hero + Activate ── */}
      <section id="join" className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-28 pb-12 relative overflow-hidden">
        <OrbitalRings />
        <div className="absolute inset-0 glow-coral-top pointer-events-none" />
        <div className="relative z-10 w-full max-w-6xl mx-auto">
          <img
            src={anniversarySeal}
            alt="David T. Rosen — 25th Anniversary — Creator of the First Online Crowdfunding System — 2001–2026"
            className="w-32 md:w-40 mx-auto mb-6 drop-shadow-[0_0_30px_hsl(38_70%_60%_/_0.3)]"
          />
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-10 tracking-tight">
            25 Years of Cooperative Crowdfunding™
          </h1>

          {/* Tier Cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {tiers.map((tier, i) => (
              <div
                key={i}
                onClick={() => setSelected(i)}
                className={`rounded-xl p-5 cursor-pointer transition-all duration-300 ${tier.colorClass} relative ${
                  selected === i
                    ? `ring-2 ${tier.ringColor} scale-[1.02]`
                    : "hover:scale-[1.01]"
                }`}
              >
                <p className="text-muted-foreground text-xs tracking-widest uppercase mb-1">{tier.name}</p>
                <p className="text-3xl font-bold text-foreground mb-0.5">{tier.entry}</p>
                <p className="text-muted-foreground text-xs mb-4">one-time contribution</p>
                <div className="border-t border-border/50 pt-3">
                  <p className="text-muted-foreground text-xs uppercase tracking-wider mb-0.5">You receive per cycle</p>
                  <p className={`text-xl font-bold ${tier.receiveColor}`}>{tier.receive}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Compact Wide Join Form */}
          <div className="w-full rounded-xl p-6 bg-card border border-border">
            <div className="flex flex-col md:flex-row md:items-end gap-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-3 text-gold text-left">
                  Activate Your Membership
                  {selected !== null && (
                    <span className="text-muted-foreground text-sm font-normal ml-2">
                      {tiers[selected].name} — {tiers[selected].entry}
                    </span>
                  )}
                </h3>
                <form className="grid grid-cols-2 md:grid-cols-5 gap-3" onSubmit={(e) => e.preventDefault()}>
                  <input type="text" placeholder="First Name" className="px-3 py-2.5 rounded-lg bg-muted/20 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary text-sm transition-colors" />
                  <input type="text" placeholder="Last Name" className="px-3 py-2.5 rounded-lg bg-muted/20 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary text-sm transition-colors" />
                  <input type="email" placeholder="Email" className="px-3 py-2.5 rounded-lg bg-muted/20 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary text-sm transition-colors" />
                  <input type="text" placeholder="Username" className="px-3 py-2.5 rounded-lg bg-muted/20 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary text-sm transition-colors" />
                  <input type="text" placeholder="Referral Code" className="px-3 py-2.5 rounded-lg bg-muted/20 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary text-sm transition-colors" />
                   <button
                    type="submit"
                    className="col-span-2 md:col-span-5 py-3 rounded-sm font-bold tracking-widest uppercase text-sm transition-all duration-300 hover:opacity-90"
                    style={{
                      background: "linear-gradient(135deg, hsl(38 70% 55%), hsl(38 65% 65%))",
                      color: "hsl(220 50% 12%)",
                    }}
                  >
                    Confirm & Join
                  </button>
                </form>
                <div className="flex items-center justify-between mt-3">
                  <p className="text-muted-foreground text-xs">
                    By joining you agree to our{" "}
                    <a href="#" className="text-primary hover:underline">Terms</a>{" "}and{" "}
                    <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Existing member?{" "}
                    <Link to="/login" className="text-primary hover:underline font-medium">Login here</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="py-24 max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4">The Process</p>
          <h2 className="text-4xl md:text-5xl font-bold">3 Steps. Infinite Cycles.</h2>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {steps.map((step, i) => (
            <div key={i} className="rounded-xl p-8 bg-card border border-border">
              <div className="text-5xl font-bold mb-5 text-gold/20">{step.n}</div>
              <h3 className="text-lg font-bold mb-2 text-foreground">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Wheelhouse Diagram */}
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <p className="text-gold text-xs tracking-[0.4em] uppercase font-medium mb-4">The Mobius Loop</p>
            <h3 className="text-3xl md:text-4xl font-bold mb-5 leading-tight">
              Your Wheelhouse.<br />
              <span className="text-muted-foreground">Always in Motion.</span>
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              At the center sits <span className="text-foreground font-semibold">you</span>. Your Wheelhouse fills with 6 participants — 2 you invite directly, and 4 who join through your team. The moment it's full, you receive <span className="text-gold font-semibold">50% of the pool</span> and a brand-new Wheelhouse opens automatically.
            </p>
          </div>
          <div className="flex-1">
            <WheelhouseDiagram />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
