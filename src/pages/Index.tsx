import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WheelhouseDiagram from "@/components/WheelhouseDiagram";
import { useState } from "react";
import anniversarySeal from "@/assets/anniversary-seal.jpeg";
import heroVideo from "@/assets/hero-video.mp4";
import { Link } from "react-router-dom";

const tiers = [
  {
    name: "Level 1",
    entry: "$2,500",
    receive: "$7,500",
    desc: "Your gateway into the ecosystem.",
    colorClass: "tier-gold",
    accentColor: "hsl(12 80% 58%)",
  },
  {
    name: "Level 2",
    entry: "$5,000",
    receive: "$15,000",
    desc: "Elevated access for the serious wealth builder.",
    colorClass: "tier-platinum",
    accentColor: "hsl(260 60% 50%)",
  },
  {
    name: "Level 3",
    entry: "$10,000",
    receive: "$30,000",
    desc: "Maximum returns. Legacy-class wealth.",
    colorClass: "tier-diamond",
    accentColor: "hsl(180 80% 45%)",
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

      {/* ── Hero with Video Background ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-28 pb-16 overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 w-full max-w-4xl mx-auto">
          <div
            className="w-28 md:w-36 mx-auto mb-8 aspect-square rounded-full overflow-hidden shadow-2xl"
            style={{ border: "3px solid hsl(0 0% 100% / 0.25)" }}
          >
            <img
              src={anniversarySeal}
              alt="David T. Rosen — 25th Anniversary — Creator of the First Online Crowdfunding System — 2001–2026"
              className="w-full h-full object-cover scale-[1.12]"
            />
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-10 tracking-tight leading-tight">
            25 Years of Cooperative<br />Crowdfunding™
          </h1>

          <a href="#join" className="px-8 py-3.5 rounded-lg text-sm font-bold tracking-wide btn-coral inline-block">
            Get Started
          </a>
        </div>
      </section>

      {/* ── Section 1: Activate Your Membership ── */}
      <section id="join" className="section-dark py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-primary text-xs tracking-[0.4em] uppercase font-semibold mb-3 text-center">Choose Your Level</p>
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-12 text-white">
            Activate Your Membership
          </h2>

          {/* Tier Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {tiers.map((tier, i) => (
              <div
                key={i}
                onClick={() => setSelected(i)}
                className={`rounded-xl p-6 cursor-pointer transition-all duration-300 bg-white/5 border ${
                  selected === i
                    ? "border-primary scale-[1.02] shadow-lg"
                    : "border-white/10 hover:border-white/20 hover:scale-[1.01]"
                }`}
              >
                <p className="text-white/50 text-xs tracking-widest uppercase mb-1">{tier.name}</p>
                <p className="text-3xl font-bold text-white mb-0.5">{tier.entry}</p>
                <p className="text-white/40 text-xs mb-5">one-time contribution</p>
                <div className="border-t border-white/10 pt-4">
                  <p className="text-white/50 text-xs uppercase tracking-wider mb-0.5">You receive per cycle</p>
                  <p className="text-2xl font-bold" style={{ color: tier.accentColor }}>{tier.receive}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Join Form */}
          <div className="w-full max-w-3xl mx-auto rounded-xl p-8 bg-white/5 border border-white/10">
            <h3 className="text-xl font-bold mb-1 text-white">
              Ready to Join?
              {selected !== null && (
                <span className="text-white/50 text-sm font-normal ml-2">
                  {tiers[selected].name} — {tiers[selected].entry}
                </span>
              )}
            </h3>
            <p className="text-white/40 text-sm mb-6">Fill out the form below to activate your membership.</p>
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="First Name" className="px-4 py-3 rounded-lg bg-white/5 border border-white/15 text-white placeholder:text-white/30 focus:outline-none focus:border-primary text-sm transition-colors" />
              <input type="text" placeholder="Last Name" className="px-4 py-3 rounded-lg bg-white/5 border border-white/15 text-white placeholder:text-white/30 focus:outline-none focus:border-primary text-sm transition-colors" />
              <input type="email" placeholder="Email" className="px-4 py-3 rounded-lg bg-white/5 border border-white/15 text-white placeholder:text-white/30 focus:outline-none focus:border-primary text-sm transition-colors" />
              <input type="text" placeholder="Username" className="px-4 py-3 rounded-lg bg-white/5 border border-white/15 text-white placeholder:text-white/30 focus:outline-none focus:border-primary text-sm transition-colors" />
              <input type="text" placeholder="Referral Code" className="sm:col-span-2 px-4 py-3 rounded-lg bg-white/5 border border-white/15 text-white placeholder:text-white/30 focus:outline-none focus:border-primary text-sm transition-colors" />
              <button
                type="submit"
                className="sm:col-span-2 py-3.5 rounded-lg font-bold tracking-wide text-sm btn-coral"
              >
                Confirm & Join
              </button>
            </form>
            <div className="flex items-center justify-between mt-4 flex-wrap gap-2">
              <p className="text-white/30 text-xs">
                By joining you agree to our{" "}
                <a href="#" className="text-primary hover:underline">Terms</a> and{" "}
                <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
              </p>
              <p className="text-white/40 text-sm">
                Existing member?{" "}
                <Link to="/login" className="text-primary hover:underline font-medium">Login here</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Wheelhouse Diagram ── */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-[45%]">
            <p className="text-primary text-xs tracking-[0.4em] uppercase font-semibold mb-3">The Mobius Loop</p>
            <h3 className="text-2xl md:text-4xl font-bold mb-4 leading-tight text-foreground">
              Your Wheelhouse.<br />
              <span className="text-muted-foreground">Always in Motion.</span>
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              At the center sits <span className="text-foreground font-semibold">you</span>. Your Wheelhouse fills with 6 participants — 2 you invite directly, and 4 who join through your team. The moment it's full, you receive <span className="text-primary font-semibold">50% of the pool</span> and a brand-new Wheelhouse opens automatically.
            </p>
          </div>
          <div className="md:w-[55%]">
            <WheelhouseDiagram />
          </div>
        </div>
      </section>

      {/* ── Section 3: The Process ── */}
      <section className="section-light py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-primary text-xs tracking-[0.4em] uppercase font-semibold mb-3 text-center">The Process</p>
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-4 text-foreground">3 Steps. Infinite Cycles.</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-lg mx-auto">
            A simple, proven system designed for cooperative wealth building.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="rounded-xl p-6 bg-card border border-border hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                  <span className="text-lg font-bold text-secondary">{step.n}</span>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                <div className="w-12 h-0.5 bg-primary/30 mt-5" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
