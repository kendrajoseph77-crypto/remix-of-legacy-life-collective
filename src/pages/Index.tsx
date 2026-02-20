import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OrbitalRings from "@/components/OrbitalRings";
import WheelhouseDiagram from "@/components/WheelhouseDiagram";
import { useState } from "react";
import { ArrowRight, Play } from "lucide-react";

const tiers = [
  {
    name: "Level 1",
    entry: "$2,500",
    receive: "$7,500",
    desc: "Your gateway into the ecosystem.",
    colorClass: "tier-gold",
    receiveColor: "text-primary",
    ringColor: "ring-primary border-primary",
  },
  {
    name: "Level 2",
    entry: "$5,000",
    receive: "$15,000",
    desc: "Elevated access for the serious wealth builder.",
    colorClass: "tier-platinum",
    receiveColor: "text-secondary",
    ringColor: "ring-secondary border-secondary",
  },
  {
    name: "Level 3",
    entry: "$10,000",
    receive: "$30,000",
    desc: "Maximum returns. Legacy-class wealth.",
    colorClass: "tier-diamond",
    receiveColor: "text-accent",
    ringColor: "ring-accent border-accent",
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

      {/* ── Hero ── */}
      <section className="min-h-[85vh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-12 relative overflow-hidden">
        <OrbitalRings />
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-secondary text-sm tracking-[0.35em] uppercase font-semibold mb-6">
            25 Years of Cooperative Crowdfunding™
          </p>
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.08] mb-6 tracking-tight">
            We Each Do a Little.<br />
            <span className="text-muted-foreground">We All Receive a Lot.</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            The elite cooperative crowdfunding platform built for legacy-class wealth. Global. Automated. Unstoppable.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#join"
              className="flex items-center gap-2 px-8 py-3.5 rounded-sm font-bold tracking-widest uppercase text-sm transition-all duration-300 hover:opacity-90 bg-primary text-primary-foreground"
            >
              Join Us <ArrowRight size={15} />
            </a>
            <a
              href="#video"
              className="flex items-center gap-2 px-8 py-3.5 rounded-sm font-medium tracking-widest uppercase text-sm border border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground/40 transition-all duration-300"
            >
              <Play size={14} /> Watch Overview
            </a>
          </div>
        </div>
      </section>

      {/* ── Video ── */}
      <section id="video" className="py-16 max-w-4xl mx-auto px-6">
        <div className="rounded-2xl overflow-hidden border border-border bg-card aspect-video flex items-center justify-center relative group cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-br from-muted/40 to-background/80" />
          <div className="relative z-10 flex flex-col items-center gap-4 text-center px-6">
            <div className="w-16 h-16 rounded-full border border-border bg-card/80 backdrop-blur flex items-center justify-center group-hover:border-primary/50 transition-colors duration-300">
              <Play size={24} className="text-foreground ml-1" />
            </div>
            <p className="text-muted-foreground text-sm tracking-widest uppercase">Introduction Video</p>
            <p className="text-xs text-muted-foreground/60">Replace this placeholder with your video embed</p>
          </div>
        </div>
      </section>

      {/* ── Income Centers (Begin Where You Fit In) ── */}
      <section id="join" className="py-24 bg-card border-y border-border relative overflow-hidden">
        <div className="absolute inset-0 glow-coral-top pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 relative">
          <div className="text-center mb-14">
            <p className="text-secondary text-xs tracking-[0.4em] uppercase mb-4">How It Works</p>
            <h2 className="text-4xl md:text-5xl font-bold">Begin Where You Fit In</h2>
            <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
              3 levels. Simple. Focused. Fast.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {tiers.map((tier, i) => (
              <div
                key={i}
                onClick={() => setSelected(i)}
                className={`rounded-xl p-7 cursor-pointer transition-all duration-300 ${tier.colorClass} relative ${
                  selected === i
                    ? `ring-2 ${tier.ringColor} scale-[1.02]`
                    : "hover:scale-[1.01]"
                }`}
              >
                <p className="text-muted-foreground text-xs tracking-widest uppercase mb-2">{tier.name}</p>
                <p className="text-4xl font-bold text-foreground mb-1">{tier.entry}</p>
                <p className="text-muted-foreground text-xs mb-6">one-time contribution</p>
                <div className="border-t border-border/50 pt-5">
                  <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">You receive per cycle</p>
                  <p className={`text-2xl font-bold ${tier.receiveColor}`}>{tier.receive}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Combined total callout */}
          <div className="rounded-xl p-6 text-center border border-secondary/20 bg-background/40 mb-14">
            <p className="text-4xl font-bold text-foreground">$52,500</p>
            <p className="text-muted-foreground text-sm mt-2">earned every cycle when you are active on all 3 levels simultaneously</p>
          </div>

          {/* ── Join Form ── */}
          <div className="max-w-lg mx-auto rounded-xl p-8 bg-background border border-border">
            <h3 className="text-2xl font-bold mb-1 text-secondary text-center">Activate Your Membership</h3>
            {selected !== null && (
              <p className="text-muted-foreground text-sm text-center mb-8">
                {tiers[selected].name} — {tiers[selected].entry} entry
              </p>
            )}
            {selected === null && <div className="mb-8" />}

            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-muted-foreground tracking-wide uppercase block mb-1.5">First Name</label>
                  <input type="text" placeholder="John" className="w-full px-4 py-3 rounded-lg bg-muted/20 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary text-sm transition-colors" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground tracking-wide uppercase block mb-1.5">Last Name</label>
                  <input type="text" placeholder="Smith" className="w-full px-4 py-3 rounded-lg bg-muted/20 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary text-sm transition-colors" />
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground tracking-wide uppercase block mb-1.5">Email</label>
                <input type="email" placeholder="you@example.com" className="w-full px-4 py-3 rounded-lg bg-muted/20 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary text-sm transition-colors" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground tracking-wide uppercase block mb-1.5">Username</label>
                <input type="text" placeholder="yourname" className="w-full px-4 py-3 rounded-lg bg-muted/20 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary text-sm transition-colors" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground tracking-wide uppercase block mb-1.5">Referral Code <span className="normal-case">(optional)</span></label>
                <input type="text" placeholder="Inviter's code" className="w-full px-4 py-3 rounded-lg bg-muted/20 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary text-sm transition-colors" />
              </div>
              <button
                type="submit"
                className="mt-2 w-full py-4 rounded-sm font-bold tracking-widest uppercase text-sm transition-all duration-300 hover:opacity-90 bg-primary text-primary-foreground"
              >
                Confirm & Join
              </button>
              <p className="text-muted-foreground text-xs text-center">
                By joining you agree to our{" "}
                <a href="#" className="text-primary hover:underline">Terms</a>{" "}and{" "}
                <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-12 border-b border-border bg-background relative overflow-hidden">
        <div className="absolute inset-0 glow-aqua-top pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "100%", label: "Peer-to-Peer", color: "text-secondary" },
              { value: "50/50", label: "Always", color: "text-primary" },
              { value: "3", label: "Income Levels", color: "text-secondary" },
              { value: "$52.5K+", label: "Max Per Cycle", color: "text-primary" },
            ].map((s, i) => (
              <div key={i}>
                <p className={`text-3xl font-bold mb-1 ${s.color}`}>{s.value}</p>
                <p className="text-muted-foreground text-xs tracking-widest uppercase">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="py-24 max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-secondary text-xs tracking-[0.4em] uppercase mb-4">The Process</p>
          <h2 className="text-4xl md:text-5xl font-bold">3 Steps. Infinite Cycles.</h2>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {steps.map((step, i) => (
            <div key={i} className="rounded-xl p-8 bg-card border border-border">
              <div className="text-5xl font-bold mb-5 text-border">{step.n}</div>
              <h3 className="text-lg font-bold mb-2 text-foreground">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Mobius Loop / Wheelhouse Diagram */}
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 max-w-md mx-auto lg:mx-0">
            <WheelhouseDiagram />
          </div>
          <div className="flex-1 max-w-lg">
            <p className="text-secondary text-xs tracking-[0.4em] uppercase font-medium mb-4">The Mobius Loop</p>
            <h3 className="text-3xl md:text-4xl font-bold mb-5 leading-tight">
              Your Wheelhouse.<br />
              <span className="text-muted-foreground">Always in Motion.</span>
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              At the center sits <span className="text-foreground font-semibold">you</span>. Your Wheelhouse fills with 6 participants — 2 you invite directly, and 4 who join through your team. The moment it's full, you receive <span className="text-primary font-semibold">50% of the pool</span> and a brand-new Wheelhouse opens automatically.
            </p>
            <ul className="flex flex-col gap-3">
              {[
                { color: "bg-primary", label: "You (Center)", desc: "Your position — always paid first." },
                { color: "bg-secondary", label: "Inviter #1 · Direct #2", desc: "The 2 people you bring in directly." },
                { color: "bg-foreground", label: "Team #3–#6", desc: "Filled by your network's network." },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className={`mt-1 w-3 h-3 rounded-full shrink-0 ${item.color}`} />
                  <div>
                    <span className="text-foreground text-sm font-semibold">{item.label}</span>
                    <span className="text-muted-foreground text-sm"> — {item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
