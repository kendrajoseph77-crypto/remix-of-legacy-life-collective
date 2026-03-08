import logoImg from "@/assets/logo-5050-main.svg";
import logoF from "@/assets/logo-5050-f.svg";
import anniversarySeal from "@/assets/anniversary-seal-hq.png";
import heroVideo from "@/assets/hero-video-fast.mp4";
import { Link } from "react-router-dom";

const BLUE = "hsl(224 85% 58%)";

const vaults = [
  { contribution: "$25", payout: "$75", per: "6 × $12.50" },
  { contribution: "$50", payout: "$150", per: "6 × $25" },
  { contribution: "$100", payout: "$300", per: "6 × $50" },
];

const LandingFast = () => {
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
            <a
              href="#join"
              className="mt-1 px-8 py-3 rounded-md text-sm font-bold tracking-wide inline-block text-white transition-all duration-300 hover:brightness-110"
              style={{
                background: "linear-gradient(135deg, hsl(224 85% 68%), hsl(224 85% 58%), hsl(224 85% 48%))",
                boxShadow: "0 4px 16px hsl(224 85% 58% / 0.4), inset 0 1px 0 hsl(224 80% 72% / 0.5)",
              }}
            >
              Join Now
            </a>
            <p className="text-white text-xs bg-black/40 backdrop-blur-sm rounded-full px-4 py-1.5">
              Already a member?{" "}
              <Link to="/login" className="text-white underline hover:text-white/80 font-medium">Log in here</Link>
            </p>
          </div>

          <div className="flex-1" />

          <div className="absolute top-4 left-6 z-20">
            <img
              src={logoF}
              alt="5050 Fast logo"
              className="w-auto"
              style={{ height: "72px", filter: "drop-shadow(0 0 16px hsl(38 70% 60% / 0.4))" }}
            />
          </div>

          <div className="absolute top-4 right-6 z-20 flex items-center gap-4 bg-black/40 backdrop-blur-sm rounded-full px-5 py-2">
            <Link to="/how-it-works" className="text-white/80 hover:text-white text-sm font-medium underline transition-colors">
              How It Works
            </Link>
            <a href="#join" className="text-white/80 hover:text-white text-sm font-medium underline transition-colors">
              Join Now
            </a>
            <Link to="/login" className="text-white/80 hover:text-white text-sm font-medium underline transition-colors">
              Log in
            </Link>
          </div>
        </div>
      </section>

      {/* ── How Coop5050 Works ── */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
            Cooperative Crowdfunding is...
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-3">
            a revolutionary way to earn income, pay your monthly expenses, eliminate debt, and fund your best life. Instead of competing, we cooperate—each doing a little so everyone can receive a lot.
          </p>
          <p className="text-muted-foreground text-lg font-bold italic">Money for Everything!</p>
        </div>
      </section>

      {/* ── 5050 Fast Card ── */}
      <section id="join" className="bg-background py-16 px-6">
        <div className="max-w-md mx-auto">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-3xl md:text-5xl font-semibold text-center text-foreground leading-tight">
              5050 Fast
            </h2>
            <p className="text-muted-foreground mt-2 text-center">Start small. Earn big. Repeat.</p>
          </div>

          <div className="flex flex-col gap-3">
            <div
              className="rounded-xl border-2 p-3 md:p-4 bg-card transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              style={{ borderColor: BLUE }}
            >
              <div className="relative mb-3">
                <img src={logoF} alt="5050 Fast logo" className="absolute left-0 top-1/2 -translate-y-1/2 w-auto" style={{ height: "48px" }} />
                <h3 className="text-xl font-bold text-center" style={{ color: BLUE }}>5050 Fast</h3>
              </div>
              <div className="grid grid-cols-3 gap-1.5 mb-4">
                {vaults.map((v, vi) => (
                  <div key={vi} className="p-1.5 rounded-lg border border-border bg-muted/20 flex flex-col items-center justify-center">
                    <p className="text-xs font-semibold truncate w-full text-center" style={{ color: BLUE }}>{v.contribution}</p>
                    <p className="text-[9px] text-muted-foreground mb-0.5">Cooperative</p>
                    <p className="text-sm md:text-base font-bold text-foreground truncate w-full text-center">{v.payout}</p>
                    <p className="text-[9px] text-muted-foreground">Over and Over</p>
                    <p className="text-[9px] text-muted-foreground/50 mt-0.5 truncate w-full text-center">{v.per}</p>
                  </div>
                ))}
              </div>
              <p className="text-center">
                <span className="text-xs text-muted-foreground mr-1">Receive</span>
                <span className="text-xl font-bold" style={{ color: BLUE }}>$525</span>
                <span className="text-xs font-normal text-muted-foreground ml-1">Each Cycle</span>
              </p>
            </div>
            <Link
              to="/register/fast"
              className="block w-full py-4 rounded-md font-bold tracking-widest text-xs text-white text-center transition-all duration-300 hover:brightness-110"
              style={{
                background: "linear-gradient(135deg, hsl(224 85% 58%), hsl(224 78% 48%), hsl(224 90% 38%))",
                boxShadow: "0 4px 16px hsl(224 78% 48% / 0.4), inset 0 1px 0 hsl(224 80% 68% / 0.5)",
              }}
            >
              ACTIVATE FAST
            </Link>
          </div>

          {/* Login + How It Works */}
          <div className="flex flex-col items-center gap-3 mt-12">
            <p className="text-muted-foreground text-sm">
              Already a member?{" "}
              <Link to="/login" className="text-foreground hover:underline font-medium">Log in</Link>
            </p>
            <Link
              to="/how-it-works"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl border border-border bg-card hover:bg-muted/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center gold-chrome-bg shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="hsl(35 30% 10%)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polygon points="10 8 16 12 10 16 10 8" fill="hsl(35 30% 10%)" stroke="none"/>
                </svg>
              </div>
              <div className="text-left">
                <span className="block text-sm font-bold text-foreground group-hover:text-foreground/90">
                  Learn How the System Works
                </span>
                <span className="block text-xs text-muted-foreground">
                  See the 50/50 Cooperative in action
                </span>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground group-hover:translate-x-1 transition-transform ml-2">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingFast;
