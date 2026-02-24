import logoImg from "@/assets/logo-hero-new.png";
import WheelhouseDiagram from "@/components/WheelhouseDiagram";
import { useState } from "react";
import anniversarySeal from "@/assets/anniversary-seal-hq.png";
import heroVideo from "@/assets/hero-video-new.mp4";
import { Link } from "react-router-dom";

const brands = [
  {
    name: "5050 Builder",
    tagline: "Clean entry. Foundation. Confidence.",
    color: "hsl(224 78% 48%)",
    tiers: [
      { entry: "$25", receive: "$75" },
      { entry: "$50", receive: "$150" },
      { entry: "$100", receive: "$300" },
    ],
  },
  {
    name: "5050 Summit",
    tagline: "Elevated. Progress. Momentum.",
    color: "hsl(160 84% 30%)",
    tiers: [
      { entry: "$250", receive: "$750" },
      { entry: "$500", receive: "$1,500" },
      { entry: "$1,000", receive: "$3,000" },
    ],
  },
  {
    name: "5050 Sovereign",
    tagline: "Top tier. Authority. Legacy.",
    color: "hsl(38 37% 52%)",
    tiers: [
      { entry: "$2,500", receive: "$7,500" },
      { entry: "$5,000", receive: "$15,000" },
      { entry: "$10,000", receive: "$30,000" },
    ],
  },
];

const steps = [
  { n: "01", title: "Activate", desc: "Contribute once at your chosen level." },
  { n: "02", title: "Invite 2", desc: "Two people join — your Wheelhouse fills." },
  { n: "03", title: "Receive & Repeat", desc: "You earn 50% and your team earns 50%. Your team moves with you when a new wheelhouse opens." },
];

const Index = () => {
  const [selectedBrand, setSelectedBrand] = useState<number>(0);
  const [selectedTier, setSelectedTier] = useState<number | null>(null);

  const activeBrand = brands[selectedBrand];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* ── Hero with Video Background ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-8 pb-16 overflow-hidden">
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

        <div className="relative z-10 w-full flex flex-col items-center flex-1 pt-4 pb-2 px-6">
          <div style={{ flex: 2.2 }} />

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

          <div className="flex-1" />

          <div className="absolute top-4 left-6 z-20">
            <img
              src={logoImg}
              alt="5050L logo"
              className="w-auto"
              style={{ height: "72px", filter: "drop-shadow(0 0 16px hsl(38 70% 60% / 0.4))" }}
            />
          </div>

          <div className="absolute top-4 right-6 z-20">
            <Link to="/login" className="text-white/80 hover:text-white text-sm font-medium underline transition-colors">
              Log in
            </Link>
          </div>
        </div>
      </section>

      {/* ── Section 1: Choose Your Level ── */}
      <section id="join" className="bg-background py-32 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <div className="flex flex-col items-center mb-16">
            <p className="text-muted-foreground text-[11px] tracking-[0.5em] uppercase font-medium mb-4 text-center">Choose Your Level</p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-center text-foreground leading-tight">
              Activate Your Membership
            </h2>
          </div>

          {/* Brand Tabs */}
          <div className="flex justify-center gap-2 mb-12">
            {brands.map((brand, i) => (
              <button
                key={i}
                onClick={() => { setSelectedBrand(i); setSelectedTier(null); }}
                className={`px-6 py-3 rounded-md text-xs font-semibold tracking-[0.15em] uppercase transition-all duration-300 border ${
                  selectedBrand === i
                    ? "text-white border-transparent shadow-lg"
                    : "bg-card text-muted-foreground border-border hover:border-muted-foreground/40"
                }`}
                style={selectedBrand === i ? { backgroundColor: brand.color, boxShadow: `0 4px 24px ${brand.color}40` } : {}}
              >
                {brand.name}
              </button>
            ))}
          </div>

          {/* Active brand tagline */}
          <p className="text-center text-muted-foreground text-sm mb-10 italic">{activeBrand.tagline}</p>

          {/* Tier cards for active brand */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-20">
            {activeBrand.tiers.map((tier, i) => (
              <div
                key={i}
                onClick={() => setSelectedTier(i)}
                className={`rounded-lg p-8 cursor-pointer transition-all duration-300 bg-card border text-center ${
                  selectedTier === i
                    ? "shadow-xl scale-[1.02]"
                    : "border-border hover:border-muted-foreground/30"
                }`}
                style={selectedTier === i ? { borderColor: activeBrand.color, boxShadow: `0 8px 32px ${activeBrand.color}20` } : {}}
              >
                <p className="text-muted-foreground text-[10px] tracking-[0.3em] uppercase mb-3">
                  Level {i + 1}
                </p>
                <p className="text-4xl font-semibold text-foreground mb-1">{tier.entry}</p>
                <p className="text-muted-foreground/50 text-xs mb-6">one-time contribution</p>
                <div className="border-t border-border pt-5">
                  <p className="text-muted-foreground text-[10px] uppercase tracking-[0.2em] mb-1">You receive</p>
                  <p className="text-3xl font-semibold" style={{ color: activeBrand.color }}>{tier.receive}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Registration Form */}
          <div className="max-w-2xl mx-auto">
            <div className="rounded-lg p-10 bg-card border border-border">
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

                {/* Selected level indicator */}
                {selectedTier !== null && (
                  <div className="sm:col-span-2 rounded-md p-4 border border-border bg-muted/50">
                    <p className="text-xs text-muted-foreground mb-1">Selected level</p>
                    <p className="text-sm font-semibold text-foreground">
                      {activeBrand.name} — {activeBrand.tiers[selectedTier].entry}
                      <span className="text-muted-foreground font-normal"> → receive {activeBrand.tiers[selectedTier].receive}</span>
                    </p>
                  </div>
                )}

                <div className="sm:col-span-2 mt-3">
                  <p className="text-sm font-medium text-foreground mb-2">Licensing Fee:</p>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-border text-foreground focus:ring-foreground accent-foreground" />
                    <span className="text-sm text-foreground">$29.99 Every 6 Months</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="sm:col-span-2 py-4 rounded-md font-bold tracking-widest text-xs text-white mt-3 transition-all duration-300"
                  style={{ backgroundColor: activeBrand.color }}
                >
                  JOIN {activeBrand.name.toUpperCase()}
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
