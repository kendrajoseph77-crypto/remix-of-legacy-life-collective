import logoImg from "@/assets/logo-5050-3.png";
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
  { n: "03", title: "Receive & Repeat", desc: "You earn 50% and your team earns 50%. Your team moves with you when a new wheelhouse opens." },
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
        <div className="absolute inset-0 bg-black/10" />

        {/* Logo — top left */}
        <div className="absolute top-6 left-6 z-[5]" style={{ isolation: "auto" }}>
          <img src={logoImg} alt="5050L logo" className="w-auto" style={{ height: "75px" }} />
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-10 tracking-tight leading-tight flex items-center justify-center gap-4">
            <span>Cooperative<br />Crowdfunding™</span>
            <img src={anniversarySeal} alt="25th Anniversary" className="w-16 h-16 md:w-20 md:h-20 rounded-full object-contain" style={{ filter: "drop-shadow(0 0 12px hsl(38 70% 60% / 0.5))" }} />
          </h1>

          <a href="#join" className="px-8 py-3.5 rounded-lg text-sm font-bold tracking-wide btn-coral inline-block">
            Get Started
          </a>
        </div>
      </section>

      {/* ── Section 1: Activate Your Membership ── */}
      <section id="join" className="bg-background py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Anniversary Seal + Heading */}
          <div className="flex flex-col items-center mb-12">
            <img
              src={anniversarySeal}
              alt="25th Anniversary Seal"
              className="w-28 h-28 md:w-36 md:h-36 object-contain mb-5 rounded-full"
              style={{ filter: "drop-shadow(0 0 20px hsl(38 70% 60% / 0.4))" }}
            />
            <p className="text-primary text-xs tracking-[0.4em] uppercase font-semibold mb-3 text-center">Choose Your Level</p>
            <h2 className="text-2xl md:text-4xl font-bold text-center text-foreground">
              Activate Your Membership
            </h2>
          </div>

          {/* Form + Tiers side by side */}
          <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto">
            {/* Left: Join Form */}
            <div className="flex-1 rounded-xl p-8 bg-card border border-border">
              <h3 className="text-xl font-bold mb-1 text-foreground">Register</h3>
              <p className="text-muted-foreground text-sm mb-6">Fill out the form below to activate your membership.</p>
              <form className="grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
                <input type="text" placeholder="Referral Code" className="px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary text-sm transition-colors" />
                <input type="text" placeholder="First Name" className="px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary text-sm transition-colors" />
                <input type="text" placeholder="Last Name" className="px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary text-sm transition-colors" />
                <input type="email" placeholder="Email" className="px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary text-sm transition-colors" />
                <input type="email" placeholder="Confirm Email" className="px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary text-sm transition-colors" />
                <input type="text" placeholder="Username" className="px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary text-sm transition-colors" />
                <input type="password" placeholder="Password" className="px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary text-sm transition-colors" />
                <input type="password" placeholder="Confirm Password" className="sm:col-span-2 px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary text-sm transition-colors" />

                {/* Startup Fee Checkbox */}
                <div className="sm:col-span-2 mt-2">
                  <p className="text-sm font-semibold text-foreground mb-2">Licensing Fee:</p>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-border text-primary focus:ring-primary accent-primary" />
                    <span className="text-sm text-foreground">$29.99 Every 6 Months</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="sm:col-span-2 py-3.5 rounded-lg font-bold tracking-wide text-sm btn-coral mt-2"
                >
                  Join
                </button>
              </form>
              <div className="flex items-center justify-between mt-4 flex-wrap gap-2">
                <p className="text-muted-foreground text-xs">
                  By joining you agree to our{" "}
                  <a href="#" className="text-primary hover:underline">Terms</a> and{" "}
                  <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
                </p>
                <p className="text-muted-foreground text-sm">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary hover:underline font-medium">Log in</Link>
                </p>
              </div>
            </div>

            {/* Right: Tier Levels (vertical) */}
            <div className="md:w-72 flex flex-col gap-4">
              
              {tiers.map((tier, i) => (
                <div
                  key={i}
                  onClick={() => setSelected(i)}
                  className={`rounded-xl p-5 cursor-pointer transition-all duration-300 bg-card border ${
                    selected === i
                      ? "border-primary shadow-lg shadow-primary/10"
                      : "border-border hover:border-muted-foreground/30"
                  }`}
                >
                  <p className="text-muted-foreground text-xs tracking-widest uppercase mb-1">{tier.name}</p>
                  <p className="text-2xl font-bold text-foreground mb-0.5">{tier.entry}</p>
                  <p className="text-muted-foreground/60 text-xs mb-3">one-time contribution</p>
                  <div className="border-t border-border pt-3">
                    <p className="text-muted-foreground text-xs uppercase tracking-wider mb-0.5">You receive</p>
                    <p className="text-xl font-bold" style={{ color: tier.accentColor }}>{tier.receive}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Wheelhouse + Process Combined ── */}
      <section className="py-8 max-w-6xl mx-auto px-6">
        <p className="text-primary text-xs tracking-[0.4em] uppercase font-semibold mb-1 text-center">The Mobius Loop</p>
        <h2 className="text-xl md:text-2xl font-bold text-center mb-4 text-foreground">
          Your Wheelhouse. <span className="text-muted-foreground">Always in Motion.</span>
        </h2>

        <WheelhouseDiagram />

        {/* 3 Steps — horizontal boxes below */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
          {steps.map((step, i) => (
            <div key={i} className="rounded-lg p-3 bg-card border border-border text-center">
              <div className="w-7 h-7 rounded-md bg-secondary/10 flex items-center justify-center mx-auto mb-1.5">
                <span className="text-xs font-bold text-secondary">{step.n}</span>
              </div>
              <p className="text-xs font-semibold text-foreground mb-0.5">{step.title}</p>
              <p className="text-[11px] text-muted-foreground leading-tight">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      
    </div>
  );
};

export default Index;
