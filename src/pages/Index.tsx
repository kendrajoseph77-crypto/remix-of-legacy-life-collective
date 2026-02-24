import logoImg from "@/assets/logo-hero-new.png";
import WheelhouseDiagram from "@/components/WheelhouseDiagram";
import { useState } from "react";
import anniversarySeal from "@/assets/anniversary-seal-hq.png";
import heroVideo from "@/assets/hero-video-new.mp4";
import { Link } from "react-router-dom";

const tiers = [
  {
    name: "Level 1",
    entry: "$2,500",
    receive: "$7,500",
    desc: "Your gateway into the ecosystem.",
    colorClass: "tier-gold",
    accentColor: "hsl(38 55% 55%)",
  },
  {
    name: "Level 2",
    entry: "$5,000",
    receive: "$15,000",
    desc: "Elevated access for the serious wealth builder.",
    colorClass: "tier-platinum",
    accentColor: "hsl(0 0% 25%)",
  },
  {
    name: "Level 3",
    entry: "$10,000",
    receive: "$30,000",
    desc: "Maximum returns. Legacy-class wealth.",
    colorClass: "tier-diamond",
    accentColor: "hsl(0 0% 8%)",
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
        {/* Video Background — hidden video element, rendered via object-fit */}
        <video
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          className="absolute inset-0 w-full h-full object-cover"
          style={{ pointerEvents: "none", WebkitAppearance: "none" }}
          ref={(el) => { if (el) { el.removeAttribute("controls"); el.play().catch(() => {}); } }}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        {/* No dark overlay */}

        {/* Content container — fills viewport, spaced between top/bottom */}
        <div className="relative z-10 w-full flex flex-col items-center flex-1 pt-4 pb-2 px-6">
          {/* Spacer - push content lower */}
          <div style={{ flex: 2.2 }} />

          {/* Center: Title + Seal side by side + Join */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex items-center gap-0.5">
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight text-center">
                Cooperative Crowdfunding™
              </h1>
              <img
                src={anniversarySeal}
                alt="25th Anniversary"
                className="shrink-0 object-contain"
                style={{ height: "108px", filter: "drop-shadow(0 0 12px hsl(38 70% 60% / 0.5))" }}
              />
            </div>
            <a href="#join" className="mt-1 px-8 py-3 rounded-md text-sm font-bold tracking-wide btn-gold inline-block">
              Join Now
            </a>
            <p className="text-white/70 text-xs">
              Already a member?{" "}
              <Link to="/login" className="text-white underline hover:text-white/90 font-medium">Log in here</Link>
            </p>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Top left: logo */}
          <div className="absolute top-4 left-6 z-20">
            <img
              src={logoImg}
              alt="5050L logo"
              className="w-auto"
              style={{ height: "72px", filter: "drop-shadow(0 0 16px hsl(38 70% 60% / 0.4))" }}
            />
          </div>

          {/* Top right: login */}
          <div className="absolute top-4 right-6 z-20">
            <Link to="/login" className="text-white/80 hover:text-white text-sm font-medium underline transition-colors">
              Log in
            </Link>
          </div>
        </div>
      </section>

      {/* ── Section 1: Activate Your Membership ── */}
      <section id="join" className="bg-background py-32 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Heading */}
          <div className="flex flex-col items-center mb-20">
            <p className="text-muted-foreground text-[11px] tracking-[0.5em] uppercase font-medium mb-4 text-center">Choose Your Level</p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-center text-foreground leading-tight">
              Activate Your Membership
            </h2>
          </div>

          {/* Form + Tiers side by side */}
          <div className="flex flex-col md:flex-row gap-12 max-w-5xl mx-auto">
            {/* Left: Join Form */}
            <div className="flex-1 rounded-lg p-10 bg-card border border-border">
              <h3 className="text-2xl font-semibold mb-2 text-foreground">Register</h3>
              <p className="text-muted-foreground text-sm mb-8">Fill out the form below to activate your membership.</p>
              <form className="grid grid-cols-1 sm:grid-cols-2 gap-5" onSubmit={(e) => e.preventDefault()}>
                <input type="text" placeholder="Referral Code" className="px-4 py-3.5 rounded-md bg-muted border border-border text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground text-sm transition-colors" />
                <input type="text" placeholder="First Name" className="px-4 py-3.5 rounded-md bg-muted border border-border text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground text-sm transition-colors" />
                <input type="text" placeholder="Last Name" className="px-4 py-3.5 rounded-md bg-muted border border-border text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground text-sm transition-colors" />
                <input type="email" placeholder="Email" className="px-4 py-3.5 rounded-md bg-muted border border-border text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground text-sm transition-colors" />
                <input type="email" placeholder="Confirm Email" className="px-4 py-3.5 rounded-md bg-muted border border-border text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground text-sm transition-colors" />
                <input type="text" placeholder="Username" className="px-4 py-3.5 rounded-md bg-muted border border-border text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground text-sm transition-colors" />
                <input type="password" placeholder="Password" className="px-4 py-3.5 rounded-md bg-muted border border-border text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground text-sm transition-colors" />
                <input type="password" placeholder="Confirm Password" className="sm:col-span-2 px-4 py-3.5 rounded-md bg-muted border border-border text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground text-sm transition-colors" />

                {/* Startup Fee Checkbox */}
                <div className="sm:col-span-2 mt-3">
                  <p className="text-sm font-medium text-foreground mb-2">Licensing Fee:</p>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-border text-foreground focus:ring-foreground accent-foreground" />
                    <span className="text-sm text-foreground">$29.99 Every 6 Months</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="sm:col-span-2 py-4 rounded-md font-bold tracking-widest text-xs btn-coral mt-3"
                >
                  Join
                </button>
              </form>
              <div className="flex items-center justify-between mt-6 flex-wrap gap-3">
                <p className="text-muted-foreground text-xs">
                  By joining you agree to our{" "}
                  <a href="#" className="text-foreground hover:underline">Terms</a> and{" "}
                  <a href="#" className="text-foreground hover:underline">Privacy Policy</a>.
                </p>
                <p className="text-muted-foreground text-sm">
                  Already have an account?{" "}
                  <Link to="/login" className="text-foreground hover:underline font-medium">Log in</Link>
                </p>
              </div>
            </div>

            {/* Right: Tier Levels (vertical) */}
            <div className="md:w-72 flex flex-col gap-5">
              
              {tiers.map((tier, i) => (
                <div
                  key={i}
                  onClick={() => setSelected(i)}
                  className={`rounded-lg p-6 cursor-pointer transition-all duration-300 bg-card border ${
                    selected === i
                      ? "border-foreground shadow-lg shadow-foreground/5"
                      : "border-border hover:border-muted-foreground/30"
                  }`}
                >
                  <p className="text-muted-foreground text-[10px] tracking-[0.3em] uppercase mb-2">{tier.name}</p>
                  <p className="text-3xl font-semibold text-foreground mb-1">{tier.entry}</p>
                  <p className="text-muted-foreground/50 text-xs mb-4">one-time contribution</p>
                  <div className="border-t border-border pt-4">
                    <p className="text-muted-foreground text-[10px] uppercase tracking-[0.2em] mb-1">You receive</p>
                    <p className="text-2xl font-semibold" style={{ color: tier.accentColor }}>{tier.receive}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Wheelhouse + Process Combined ── */}
      <section className="py-32 max-w-5xl mx-auto px-6">
        <p className="text-muted-foreground text-[11px] tracking-[0.5em] uppercase font-medium mb-4 text-center">The Mobius Loop</p>
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-center mb-12 text-foreground leading-tight">
          Your Wheelhouse. <span className="text-muted-foreground">Always in Motion.</span>
        </h2>

        <WheelhouseDiagram />

        {/* 3 Steps — horizontal boxes below */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {steps.map((step, i) => (
            <div key={i} className="rounded-lg p-6 bg-card border border-border text-center">
              <div className="w-8 h-8 rounded-full bg-foreground/5 flex items-center justify-center mx-auto mb-3">
                <span className="text-xs font-semibold text-foreground">{step.n}</span>
              </div>
              <p className="text-sm font-semibold text-foreground mb-1">{step.title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      
    </div>
  );
};

export default Index;
