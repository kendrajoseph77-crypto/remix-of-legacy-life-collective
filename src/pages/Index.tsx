import logoImg from "@/assets/logo-hero-new.png";
import WheelhouseDiagram from "@/components/WheelhouseDiagram";

import anniversarySeal from "@/assets/anniversary-seal-hq.png";
import heroVideo from "@/assets/hero-video-new.mp4";
import { Link } from "react-router-dom";

const businesses = [
  {
    name: "5050 Builder",
    tagline: "Clean entry. Foundation. Confidence.",
    color: "hsl(224 78% 48%)",
    levels: "$25 · $50 · $100",
  },
  {
    name: "5050 Summit",
    tagline: "Elevated. Progress. Momentum.",
    color: "hsl(160 84% 30%)",
    levels: "$250 · $500 · $1,000",
  },
  {
    name: "5050 Elite",
    tagline: "Top tier. Authority. Legacy.",
    color: "hsl(38 37% 52%)",
    levels: "$2,500 · $5,000 · $10,000",
  },
];

const steps = [
  { n: "01", title: "Activate", desc: "Contribute once at your chosen level." },
  { n: "02", title: "Invite 2", desc: "Two people join — your Wheelhouse fills." },
  { n: "03", title: "Receive & Repeat", desc: "You earn 50% and your team earns 50%. Your team moves with you when a new wheelhouse opens." },
];

const Index = () => {
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

      {/* ── Choose Your Business ── */}
      <section id="join" className="bg-background py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center mb-16">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-center text-foreground leading-tight">
              Three Systems. One Movement.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {businesses.map((biz, i) => (
              <div
                key={i}
                className="rounded-lg bg-card border border-border p-10 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
              >
                {/* Color accent bar */}
                <div
                  className="w-12 h-1 rounded-full mb-8"
                  style={{ backgroundColor: biz.color }}
                />
                <h3 className="text-2xl font-semibold text-foreground mb-2">{biz.name}</h3>
                
                <p className="text-muted-foreground/60 text-xs tracking-wide mb-8">{biz.levels}</p>
                <div className="mt-auto w-full">
                  <Link
                    to={biz.name.includes("Elite") ? "/dashboard" : `/join?business=${biz.name.split(" ")[1].toLowerCase()}`}
                    className="block w-full py-4 rounded-md font-bold tracking-widest text-xs text-white text-center transition-all duration-300 hover:opacity-90"
                    style={{ backgroundColor: biz.color }}
                  >
                    ENTER {biz.name.split(" ")[1].toUpperCase()}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-muted-foreground text-sm mt-10">
            Already have an account?{" "}
            <Link to="/login" className="text-foreground hover:underline font-medium">Log in</Link>
          </p>
        </div>
      </section>

      {/* ── Section 2: Wheelhouse + Process Combined ── */}
      <section className="py-32 max-w-5xl mx-auto px-6">
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
              
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
