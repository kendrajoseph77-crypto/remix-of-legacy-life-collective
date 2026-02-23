import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import WheelhouseDiagram from "@/components/WheelhouseDiagram";
import { useState } from "react";
import anniversarySeal from "@/assets/anniversary-seal.jpeg";
import heroVideo from "@/assets/hero-video-new.mp4";
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
  { n: "01", title: "Activate", desc: "Contribute once at your chosen level." },
  { n: "02", title: "Invite 2", desc: "Two people join — your Wheelhouse fills." },
  { n: "03", title: "Receive & Repeat", desc: "Collect 50%. A new cycle begins automatically." },
];

const Index = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* No navbar — logo is on the video */}

      {/* ── Hero with Video Background ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-8 pb-16 overflow-hidden">
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

        {/* Logo — outside z-10 so blend mode works against video */}
        <div className="relative z-[5] flex justify-center mb-6" style={{ isolation: "auto" }}>
          <Logo darkBg className="h-auto" />
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto">
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

      {/* ── Section 2: Wheelhouse + Process Combined ── */}
      <section className="py-16 max-w-6xl mx-auto px-6">
        <p className="text-primary text-xs tracking-[0.4em] uppercase font-semibold mb-2 text-center">The Mobius Loop</p>
        <h2 className="text-xl md:text-3xl font-bold text-center mb-8 text-foreground">
          Your Wheelhouse. <span className="text-muted-foreground">Always in Motion.</span>
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-[55%]">
            <WheelhouseDiagram />
          </div>
          <div className="md:w-[45%] flex flex-col gap-4">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-3 items-center">
                <div className="w-8 h-8 rounded-md bg-secondary/10 flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-secondary">{step.n}</span>
                </div>
                <p className="text-sm text-foreground">
                  <span className="font-semibold">{step.title}</span>
                  <span className="text-muted-foreground"> — {step.desc}</span>
                </p>
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
