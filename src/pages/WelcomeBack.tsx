import { ArrowRight, Heart, Infinity as InfinityIcon, Users, TrendingUp, Clock, Shield } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const tiers = [
  {
    name: "5050 Fast",
    color: "hsl(224 78% 48%)",
    receive: "$525",
    sub: "per cycle",
    tagline: "The on-ramp.",
  },
  {
    name: "5050 Core",
    color: "hsl(160 84% 30%)",
    receive: "$5,250",
    sub: "per cycle",
    tagline: "The engine.",
  },
  {
    name: "5050 Max",
    color: "hsl(39 55% 52%)",
    receive: "$52,500",
    sub: "per cycle",
    tagline: "The summit.",
  },
];

const upgrades = [
  {
    icon: InfinityIcon,
    tag: "MÖBIUS RELOAD",
    title: "Infinite cycles.",
    body: "When one fills, the next opens. Your team follows.",
  },
  {
    icon: TrendingUp,
    tag: "9 VAULTS",
    title: "Deeper progression.",
    body: "Three vaults per system. Each one unlocks bigger receive amounts.",
  },
  {
    icon: Users,
    tag: "50 / 50 SPLIT",
    title: "You receive. Your team receives.",
    body: "Every contribution pays both sides. That's why it works.",
  },
  {
    icon: Clock,
    tag: "FASTER RE-ENTRY",
    title: "Your seat never closed.",
    body: "Pick your tier. Click reactivate. Under 90 seconds.",
  },
  {
    icon: Shield,
    tag: "HARDENED PLATFORM",
    title: "Built to pay out.",
    body: "25 years of Cooperative Crowdfunding™, refined.",
  },
  {
    icon: Heart,
    tag: "COME HOME",
    title: "You're already family.",
    body: "The movement is still here — bigger than when you left.",
  },
];

const WelcomeBack = () => {
  const reactivateUrl = "https://www.coop5050.com/#join";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-40 pb-28 overflow-hidden section-dark">
        {/* Animated gold burst + rays */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Pulsing radial core */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-[70rem] h-[70rem] rounded-full blur-3xl"
            style={{
              translateX: "-50%",
              translateY: "-50%",
              background:
                "radial-gradient(circle, hsl(41 50% 65%) 0%, hsl(39 55% 40%) 40%, transparent 70%)",
            }}
            initial={{ opacity: 0.2, scale: 0.9 }}
            animate={{ opacity: [0.2, 0.38, 0.2], scale: [0.9, 1.05, 0.9] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Rotating rays */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-[90rem] h-[90rem]"
            style={{ translateX: "-50%", translateY: "-50%" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.span
                key={i}
                className="absolute top-1/2 left-1/2 origin-left h-[2px] w-[45rem]"
                style={{
                  rotate: `${i * 30}deg`,
                  background:
                    "linear-gradient(to right, transparent 0%, hsl(41 50% 65% / 0.35) 40%, hsl(41 50% 75% / 0.55) 60%, transparent 100%)",
                }}
                animate={{ opacity: [0.15, 0.6, 0.15] }}
                transition={{
                  duration: 4 + (i % 3),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.25,
                }}
              />
            ))}
          </motion.div>

          {/* Counter-rotating fine rays */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-[70rem] h-[70rem]"
            style={{ translateX: "-50%", translateY: "-50%" }}
            animate={{ rotate: -360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          >
            {Array.from({ length: 18 }).map((_, i) => (
              <span
                key={i}
                className="absolute top-1/2 left-1/2 origin-left h-px w-[35rem]"
                style={{
                  rotate: `${i * 20 + 10}deg`,
                  background:
                    "linear-gradient(to right, transparent 0%, hsl(41 60% 80% / 0.25) 50%, transparent 100%)",
                }}
              />
            ))}
          </motion.div>
        </div>

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <div
            className="inline-flex items-center gap-2 px-5 py-2 mb-10 rounded-full text-xs tracking-[0.3em] uppercase"
            style={{
              background: "hsl(0 0% 100% / 0.08)",
              border: "1px solid hsl(41 50% 65% / 0.3)",
              color: "hsl(41 50% 65%)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "hsl(41 50% 65%)" }} />
            <span>25 Years · Cooperative Crowdfunding™</span>
          </div>

          <p
            className="text-2xl md:text-3xl italic mb-4 text-white/90"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400 }}
          >
            Welcome back,
          </p>

          <h1
            className="text-7xl md:text-[10rem] leading-[0.85] mb-10 tracking-tight"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              letterSpacing: "-0.04em",
            }}
          >
            <span className="gold-gradient">COOP5050</span>
          </h1>

          <p
            className="text-2xl md:text-4xl italic mb-10 text-white max-w-3xl mx-auto leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400 }}
          >
            Each doing a little,<br />so everyone can receive a lot.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={reactivateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold px-12 py-5 rounded-full font-bold tracking-wider uppercase text-sm inline-flex items-center gap-3"
            >
              Reactivate Now
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <p className="text-xs tracking-[0.2em] uppercase mt-6 text-white/40">
            Opens coop5050.com in a new window
          </p>
        </div>
      </section>

      {/* RECEIVE BAR — the real numbers */}
      <section className="section-dark border-y border-white/10 py-16 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <p
            className="text-xs tracking-[0.35em] uppercase mb-4 font-semibold text-center"
            style={{ color: "hsl(41 50% 65%)" }}
          >
            What You Receive · Each Cycle
          </p>
          <h2
            className="text-4xl md:text-5xl text-white text-center mb-14"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 500 }}
          >
            Three systems. <span className="gold-gradient italic">One movement.</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className="p-8 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-all hover:-translate-y-1 backdrop-blur-sm"
              >
                <div
                  className="text-[10px] tracking-[0.3em] uppercase mb-4 font-bold"
                  style={{ color: tier.color }}
                >
                  {tier.name}
                </div>
                <div
                  className="text-6xl md:text-7xl mb-2 gold-gradient"
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {tier.receive}
                </div>
                <div className="text-xs tracking-[0.25em] uppercase text-white/50 mb-5">
                  {tier.sub}
                </div>
                <p className="text-white/70 leading-relaxed text-sm">{tier.tagline}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-white/40 text-sm italic mt-10 max-w-2xl mx-auto">
            9 vaults. Infinite cycles. One team that travels with you.
          </p>
        </div>
      </section>

      {/* WHY NOW */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p
            className="text-xs tracking-[0.35em] uppercase mb-5 font-semibold"
            style={{ color: "hsl(160 84% 30%)" }}
          >
            Why Now
          </p>
          <h2
            className="text-5xl md:text-7xl leading-[1.02] mb-8"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 500 }}
          >
            Money for everything.
            <br />
            <span className="gold-gradient italic">Life the way you deserve it.</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Pay your monthly bills. Eliminate debt. Fund your best life. The cooperative
            doesn't ask you to compete — it asks you to participate. And participation,
            compounded across a team, changes everything.
          </p>
        </div>
      </section>

      {/* UPGRADES GRID */}
      <section className="py-20 px-6 bg-muted/30 border-y border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p
              className="text-xs tracking-[0.35em] uppercase mb-5 font-semibold"
              style={{ color: "hsl(39 55% 45%)" }}
            >
              What's Changed
            </p>
            <h2
              className="text-5xl md:text-6xl leading-[1.05] mb-6"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}
            >
              Six reasons to step <span className="italic">back in.</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We didn't change what made it work. We made what works — work harder.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upgrades.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group p-8 rounded-2xl bg-card border border-border hover:border-foreground/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_hsl(39_55%_30%/0.35)]"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                    style={{
                      background: "linear-gradient(135deg, hsl(41 50% 65%), hsl(35 55% 40%))",
                    }}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <p
                    className="text-[10px] tracking-[0.3em] uppercase mb-3 font-semibold"
                    style={{ color: "hsl(39 55% 45%)" }}
                  >
                    {item.tag}
                  </p>
                  <h3
                    className="text-2xl mb-3 leading-tight"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{item.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* EMOTIONAL QUOTE BAND */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-3xl md:text-5xl leading-tight italic text-foreground/90"
             style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400 }}>
            "Instead of competing,<br />
            <span className="gold-gradient">we cooperate.</span>"
          </p>
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mt-8">
            — The Founding Principle · Since 2000
          </p>
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
            You're Already Family
          </p>
          <h2
            className="text-5xl md:text-7xl leading-[1.02] mb-8 text-white"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 500 }}
          >
            Step back into
            <br />
            <span className="gold-gradient italic">the cycle.</span>
          </h2>
          <p className="text-lg text-white/70 mb-10 max-w-xl mx-auto leading-relaxed">
            The team is still here. The system is stronger. The math still works —
            and now it works faster. All that's missing is you.
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
