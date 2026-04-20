import { ArrowRight, Infinity as InfinityIcon, Users, Armchair } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobiusHero from "@/components/MobiusHero";

const tiers = [
  {
    name: "5050 Fast",
    color: "hsl(224 78% 48%)",
    receive: "$525",
    sub: "per cycle",
    tagline: "Start small. Prove it again.",
  },
  {
    name: "5050 Core",
    color: "hsl(160 84% 30%)",
    receive: "$5,250",
    sub: "per cycle",
    tagline: "The system most members live inside.",
  },
  {
    name: "5050 Max",
    color: "hsl(39 55% 52%)",
    receive: "$52,500",
    sub: "per cycle",
    tagline: "Top-tier scale. Real wealth.",
  },
];

const upgrades = [
  {
    icon: InfinityIcon,
    tag: "REBUILT ENGINE",
    title: "Faster. Smarter. Smoother.",
    body: "Front to back — rebuilt for speed. Cycles fire quicker, the team scales tighter, the platform feels new.",
  },
  {
    icon: Users,
    tag: "TEAM STILL ACTIVE",
    title: "They never left.",
    body: "The same crew is still here — cycling, supporting, building. Walk back in.",
  },
  {
    icon: Armchair,
    tag: "YOUR SEAT PRESERVED",
    title: "Right where you left it.",
    body: "Your spot held. Your history intact. One click and you're back on the wheel.",
  },
];

const WelcomeBack = () => {
  const reactivateUrl = "https://www.coop5050.com/#join";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-32 pb-20 overflow-hidden section-dark">
        {/* Abstract Möbius / cycle hero animation */}
        <MobiusHero />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full text-[10px] tracking-[0.3em] uppercase"
            style={{
              background: "hsl(0 0% 100% / 0.08)",
              border: "1px solid hsl(41 50% 65% / 0.3)",
              color: "hsl(41 50% 65%)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "hsl(41 50% 65%)" }} />
            <span>Welcome back</span>
          </div>

          <h1
            className="text-7xl md:text-[9rem] leading-[0.85] mb-6 tracking-tight"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              letterSpacing: "-0.04em",
            }}
          >
            <span className="gold-gradient">COOP5050</span>
          </h1>

          <p
            className="text-2xl md:text-4xl italic mb-8 text-white/90 max-w-2xl mx-auto leading-[1.1]"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400 }}
          >
            We saved <span className="gold-gradient">your spot.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={reactivateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold px-10 py-4 rounded-full font-bold tracking-wider uppercase text-sm inline-flex items-center gap-3"
            >
              Reactivate Now
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* COBALT BAND — bridge from dark hero into light page */}
      <section
        className="py-6 px-6 relative overflow-hidden"
        style={{ background: "linear-gradient(90deg, hsl(224 78% 38%) 0%, hsl(224 78% 48%) 50%, hsl(224 78% 38%) 100%)" }}
      >
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-center">
          <span className="text-[11px] tracking-[0.4em] uppercase font-bold text-white/95">
            ✦ 25 Years Active
          </span>
          <span className="text-white/40">·</span>
          <span className="text-[11px] tracking-[0.4em] uppercase font-bold text-white/95">
            Cycles Firing Daily
          </span>
          <span className="text-white/40">·</span>
          <span className="text-[11px] tracking-[0.4em] uppercase font-bold text-white/95">
            Your Seat Held
          </span>
        </div>
      </section>

      {/* RECEIVE BAR — light, vibrant, color-coded tier cards */}
      <section className="py-24 px-6 relative" style={{ background: "hsl(40 30% 97%)" }}>
        <div className="max-w-6xl mx-auto">
          <p
            className="text-[11px] tracking-[0.4em] uppercase mb-4 font-bold text-center"
            style={{ color: "hsl(39 55% 38%)" }}
          >
            Pick Your Lane · Receive Per Cycle
          </p>
          <h2
            className="text-5xl md:text-6xl text-center mb-3"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 500,
              color: "hsl(20 15% 12%)",
            }}
          >
            Three doors. <span className="italic" style={{ color: "hsl(39 55% 38%)" }}>One engine.</span>
          </h2>
          <p className="text-center text-base mb-14 max-w-xl mx-auto" style={{ color: "hsl(20 10% 40%)" }}>
            From a single test cycle to full-tier income flow.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className="relative overflow-hidden rounded-2xl bg-white transition-all duration-300 hover:-translate-y-2"
                style={{
                  boxShadow: "0 4px 24px -8px hsl(20 15% 20% / 0.12), 0 0 0 1px hsl(20 15% 90%)",
                }}
              >
                {/* Top accent bar */}
                <div className="h-2 w-full" style={{ background: tier.color }} />
                <div className="p-8">
                  <div
                    className="text-[10px] tracking-[0.3em] uppercase mb-5 font-bold"
                    style={{ color: tier.color }}
                  >
                    {tier.name}
                  </div>
                  <div
                    className="text-6xl md:text-7xl mb-2"
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 800,
                      letterSpacing: "-0.03em",
                      color: "hsl(20 15% 12%)",
                    }}
                  >
                    {tier.receive}
                  </div>
                  <div
                    className="text-xs tracking-[0.25em] uppercase mb-5"
                    style={{ color: "hsl(20 10% 50%)" }}
                  >
                    {tier.sub}
                  </div>
                  <p className="leading-relaxed text-sm" style={{ color: "hsl(20 10% 35%)" }}>
                    {tier.tagline}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EMERALD BAND — declares CUI */}
      <section
        className="py-6 px-6 relative overflow-hidden"
        style={{ background: "linear-gradient(90deg, hsl(160 84% 22%) 0%, hsl(160 84% 30%) 50%, hsl(160 84% 22%) 100%)" }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <span className="text-[11px] tracking-[0.45em] uppercase font-bold text-white/95">
            ✦ Powered By CUI · The New Economy ✦
          </span>
        </div>
      </section>

      {/* CUI — Cooperative Universal Income (light, bold) */}
      <section className="py-24 px-6 relative overflow-hidden" style={{ background: "hsl(0 0% 100%)" }}>
        <div className="relative max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p
              className="text-[11px] tracking-[0.4em] uppercase mb-5 font-bold"
              style={{ color: "hsl(160 84% 30%)" }}
            >
              Cooperative Universal Income
            </p>
            <h2
              className="text-5xl md:text-7xl leading-[1.02] mb-6"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 500,
                color: "hsl(20 15% 12%)",
              }}
            >
              A new way to <span className="italic" style={{ color: "hsl(160 84% 30%)" }}>earn together.</span>
            </h2>
            <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto" style={{ color: "hsl(20 10% 38%)" }}>
              People fund and support each other directly — instead of waiting on big business or government programs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                color: "hsl(224 78% 48%)",
                tag: "Peer · To · Peer",
                title: "Direct, not centralized.",
                body: "Members fund members. No middleman. No gatekeeper.",
              },
              {
                color: "hsl(160 84% 30%)",
                tag: "Shared Engine",
                title: "Everyone plugs in.",
                body: "Individuals, communities, charities, businesses — same structure.",
              },
              {
                color: "hsl(39 55% 45%)",
                tag: "Recurring Income",
                title: "Cooperation pays.",
                body: "Modest contributions in. Ongoing flow out. Build alongside the day job.",
              },
            ].map((card) => (
              <div
                key={card.tag}
                className="relative overflow-hidden rounded-2xl bg-white p-8 transition-all duration-300 hover:-translate-y-1"
                style={{
                  boxShadow: "0 4px 20px -8px hsl(20 15% 20% / 0.1), 0 0 0 1px hsl(20 15% 92%)",
                }}
              >
                <div
                  className="absolute top-0 left-0 h-full w-1"
                  style={{ background: card.color }}
                />
                <p
                  className="text-[10px] tracking-[0.3em] uppercase mb-4 font-bold"
                  style={{ color: card.color }}
                >
                  {card.tag}
                </p>
                <h3
                  className="text-2xl mb-3 leading-tight"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontWeight: 600,
                    color: "hsl(20 15% 12%)",
                  }}
                >
                  {card.title}
                </h3>
                <p className="leading-relaxed text-sm" style={{ color: "hsl(20 10% 38%)" }}>
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GOLD BAND — declares the upgrade */}
      <section
        className="py-6 px-6 relative overflow-hidden"
        style={{ background: "linear-gradient(90deg, hsl(35 55% 38%) 0%, hsl(41 60% 52%) 50%, hsl(35 55% 38%) 100%)" }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <span className="text-[11px] tracking-[0.45em] uppercase font-bold" style={{ color: "hsl(20 25% 10%)" }}>
            ✦ Rebuilt · Reloaded · Ready ✦
          </span>
        </div>
      </section>

      {/* REASSURANCE GRID — numbered editorial cards on cream */}
      <section className="py-24 px-6" style={{ background: "hsl(40 30% 97%)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-5xl md:text-6xl leading-[1.05] mb-4"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 500,
                color: "hsl(20 15% 12%)",
              }}
            >
              New engine. <span className="italic" style={{ color: "hsl(39 55% 38%)" }}>Same seat.</span>
            </h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: "hsl(20 10% 40%)" }}>
              The platform is sharper than you remember. Your spot, exactly as you left it.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {upgrades.map((item, idx) => {
              const Icon = item.icon;
              const accentColor = ["hsl(224 78% 48%)", "hsl(160 84% 30%)", "hsl(39 55% 45%)"][idx];
              return (
                <div
                  key={item.title}
                  className="group relative overflow-hidden rounded-2xl bg-white p-8 transition-all duration-300 hover:-translate-y-2"
                  style={{
                    boxShadow: "0 4px 24px -8px hsl(20 15% 20% / 0.12), 0 0 0 1px hsl(20 15% 90%)",
                  }}
                >
                  {/* Big numeral watermark */}
                  <div
                    className="absolute -top-2 -right-2 text-[8rem] leading-none font-black opacity-[0.06] pointer-events-none"
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      color: accentColor,
                    }}
                  >
                    0{idx + 1}
                  </div>

                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                    style={{
                      background: accentColor,
                      boxShadow: `0 8px 20px -8px ${accentColor}`,
                    }}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <p
                    className="text-[10px] tracking-[0.3em] uppercase mb-3 font-bold"
                    style={{ color: accentColor }}
                  >
                    {item.tag}
                  </p>
                  <h3
                    className="text-2xl mb-3 leading-tight"
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontWeight: 600,
                      color: "hsl(20 15% 12%)",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p className="leading-relaxed" style={{ color: "hsl(20 10% 38%)" }}>
                    {item.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* FINAL CTA */}
      <section className="section-dark py-28 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55rem] h-[55rem] rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, hsl(41 50% 65%) 0%, hsl(39 55% 40%) 40%, transparent 70%)",
            }}
          />
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <p
            className="text-xs tracking-[0.35em] uppercase mb-5 font-semibold"
            style={{ color: "hsl(41 50% 65%)" }}
          >
            Your Seat Is Still Yours
          </p>
          <h2
            className="text-5xl md:text-7xl leading-[1.02] mb-8 text-white"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 500 }}
          >
            One click.
            <br />
            <span className="gold-gradient italic">Back in the cycle.</span>
          </h2>
          <p className="text-lg text-white/70 mb-10 max-w-xl mx-auto leading-relaxed">
            The wheel is turning. The team is here. Step on while it's hot.
          </p>
          <a
            href={reactivateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold px-12 py-5 rounded-full font-bold tracking-wider uppercase text-sm inline-flex items-center gap-3"
          >
            Reactivate at coop5050.com
            <ArrowRight className="w-4 h-4" />
          </a>
          <p className="text-xs tracking-[0.2em] uppercase mt-6 text-white/40">
            Fast · Core · Max — pick your lane
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WelcomeBack;
