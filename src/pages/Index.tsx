import logoImg from "@/assets/logo-5050-gold.png";


import anniversarySeal from "@/assets/anniversary-seal-hq.png";
import heroVideo from "@/assets/hero-video-new.mp4";
import { Link } from "react-router-dom";

const businesses = [
  {
    name: "5050 Micro",
    tagline: "Clean entry. Foundation. Confidence.",
    gradient: "linear-gradient(135deg, hsl(224 85% 58%), hsl(224 78% 48%), hsl(224 90% 38%))",
    shadow: "hsl(224 78% 48% / 0.4)",
    highlight: "hsl(224 80% 68% / 0.5)",
    levels: "$25 · $50 · $100",
  },
  {
    name: "5050 Macro",
    tagline: "Design. Structure. Momentum.",
    gradient: "linear-gradient(135deg, hsl(160 80% 42%), hsl(160 84% 30%), hsl(160 90% 22%))",
    shadow: "hsl(160 84% 30% / 0.4)",
    highlight: "hsl(160 75% 50% / 0.5)",
    levels: "$250 · $500 · $1,000",
  },
  {
    name: "5050 Mogul",
    tagline: "Foresight. Authority. Legacy.",
    gradient: "linear-gradient(135deg, hsl(41 50% 65%), hsl(39 55% 52%), hsl(35 55% 40%))",
    shadow: "hsl(39 55% 52% / 0.4)",
    highlight: "hsl(42 45% 75% / 0.5)",
    levels: "$2,500 · $5,000 · $10,000",
  },
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
                {/* Chrome accent bar */}
                <div
                  className="w-12 h-1 rounded-full mb-8"
                  style={{ background: biz.gradient, boxShadow: `0 0 8px ${biz.shadow}` }}
                />
                <h3 className="text-2xl font-semibold text-foreground mb-2">{biz.name}</h3>
                
                <p className="text-muted-foreground/60 text-xs tracking-wide mb-8">{biz.levels}</p>
                <div className="mt-auto w-full">
                  <Link
                    to={`/register/${biz.name.split(" ")[1].toLowerCase()}`}
                    className="block w-full py-4 rounded-md font-bold tracking-widest text-xs text-white text-center transition-all duration-300 hover:brightness-110"
                    style={{
                      background: biz.gradient,
                      boxShadow: `0 4px 16px ${biz.shadow}, inset 0 1px 0 ${biz.highlight}`,
                    }}
                  >
                    ACTIVATE {biz.name.split(" ")[1].toUpperCase()}
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

      {/* ── Learn More ── */}
      <section className="py-16 text-center px-6">
        <Link
          to="/how-it-works"
          className="text-muted-foreground hover:text-foreground text-sm font-medium underline transition-colors"
        >
          Learn how the 5050 system works →
        </Link>
      </section>
    </div>
  );
};

export default Index;
