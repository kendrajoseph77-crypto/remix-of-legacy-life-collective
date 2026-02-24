import { useState, useCallback, useEffect } from "react";
import Navbar from "@/components/Navbar";
import WheelhouseDiagram from "@/components/WheelhouseDiagram";
import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

const tiers = [
  { name: "Micro", levels: "$25 · $50 · $100", receive: "$75 · $150 · $300", borderColor: "hsl(224 85% 58%)" },
  { name: "Macro", levels: "$250 · $500 · $1,000", receive: "$750 · $1,500 · $3,000", borderColor: "hsl(160 80% 42%)" },
  { name: "Mogul", levels: "$2,500 · $5,000 · $10,000", receive: "$7,500 · $15,000 · $30,000", borderColor: "hsl(41 50% 65%)" },
];

const steps = [
  { number: "01", title: "Register & Activate", desc: "Register and become an Active Contributor by making a contribution at your chosen level." },
  { number: "02", title: "Invite 2 Members", desc: "You help 2 or more people become Active Contributors and join the wheelhouse." },
  { number: "03", title: "Your Team Grows", desc: "Your 2 each help 2 or more, and the cycle of giving and receiving continues." },
];

const automations = [
  "Automated Positioning",
  "Automated Sending & Receiving",
  "Automated Re-Entry",
  "Automated Suspend & Un-Suspend",
  "Automated Email Notifications",
  "Automatic Transaction History",
];

/* ── Individual Slide Components ── */

const SlideHero = () => (
  <div className="flex flex-col items-center justify-center h-full text-center px-12">
    <p className="text-sm tracking-[0.3em] uppercase font-medium mb-4" style={{ color: "hsl(41 50% 65%)" }}>
      Cooperative Crowdfunding
    </p>
    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
      How Coop5050 Works
    </h1>
    <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto mb-10">
      A 2×2 peer-to-peer crowdfunding platform where 100% of every contribution goes directly to you — the participants. No middlemen. No exceptions.
    </p>
    <Link
      to="/#join"
      className="inline-flex items-center gap-2 px-8 py-4 rounded-sm font-bold tracking-widest uppercase text-sm transition-all duration-300 hover:scale-105 bg-primary text-primary-foreground"
    >
      Join Us Now <ArrowRight size={16} />
    </Link>
  </div>
);

const SlideFiftyFifty = () => (
  <div className="flex flex-col items-center justify-center h-full px-12">
    <div className="max-w-4xl w-full">
      <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase font-medium mb-3 text-center">The 50/50 Promise</p>
      <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">You Always Receive 50%</h2>
      <p className="text-muted-foreground leading-relaxed mb-6 text-center max-w-2xl mx-auto">
        Coop5050™ is transparent, fully automated, and cannot be manipulated.
        There is no middleman. You immediately receive all your money.
      </p>
      <div className="rounded-xl overflow-hidden border border-border max-w-xl mx-auto">
        <div className="flex">
          <div className="flex-1 p-8 text-center bg-muted/20">
            <p className="text-primary text-5xl font-bold">50%</p>
            <p className="text-muted-foreground text-sm mt-3">Goes to <span className="text-foreground font-medium">YOU</span></p>
          </div>
          <div className="w-px bg-border" />
          <div className="flex-1 p-8 text-center bg-muted/20">
            <p className="text-secondary text-5xl font-bold">50%</p>
            <p className="text-muted-foreground text-sm mt-3">Goes to your <span className="text-foreground font-medium">Teammate</span></p>
          </div>
        </div>
        <div className="p-4 bg-muted/30 text-center border-t border-border">
          <p className="text-muted-foreground text-xs tracking-widest uppercase">100% of every contribution — no middlemen</p>
        </div>
      </div>
    </div>
  </div>
);

const SlideIncomeLevels = () => (
  <div className="flex flex-col items-center justify-center h-full px-12">
    <div className="max-w-5xl w-full">
      <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase font-medium mb-3 text-center">Begin Where You Fit In</p>
      <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">The Income Center Levels</h2>
      <p className="text-muted-foreground max-w-2xl mx-auto text-sm text-center mb-10">
        Your ultimate goal is to be on all 3 Income Centers simultaneously.
        Cycling just once puts you on a path to exceptional returns.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {tiers.map((tier, i) => (
          <div key={i} className="rounded-xl p-6 bg-card text-center transition-all duration-300" style={{ border: `2px solid ${tier.borderColor}` }}>
            <p className="text-muted-foreground text-xs tracking-widest uppercase mb-2">{tier.name}</p>
            <p className="text-lg font-bold mb-1 text-foreground">{tier.levels}</p>
            <p className="text-muted-foreground text-sm mb-4">Entry Levels</p>
            <div className="border-t border-border pt-4 mb-4">
              <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">You Receive</p>
              <p className="text-lg font-bold text-foreground">{tier.receive}</p>
              <p className="text-muted-foreground text-xs mt-1">per cycle</p>
            </div>
            <Link to="/join" className="block text-center py-3 rounded-sm text-xs font-bold tracking-widest uppercase transition-all duration-300 border border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary">
              Enter {tier.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SlideSteps = () => (
  <div className="flex flex-col items-center justify-center h-full px-12">
    <div className="max-w-5xl w-full">
      <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase font-medium mb-3 text-center">Simple Process</p>
      <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center">Just 3 Simple Doable Steps</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step, i) => (
          <div key={i} className="rounded-xl p-8 bg-card border border-border">
            <div className="text-6xl font-bold mb-4 text-muted-foreground/30">{step.number}</div>
            <h3 className="text-xl font-bold mb-3 text-foreground">{step.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SlideWheelhouse = () => (
  <div className="flex flex-col items-center justify-center h-full px-12 overflow-hidden">
    <div className="max-w-5xl w-full">
      <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase font-medium mb-3 text-center">The Technology</p>
      <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">The Mobius Loop Wheelhouse</h2>
      <p className="text-muted-foreground leading-relaxed text-sm text-center max-w-2xl mx-auto mb-6">
        YOU are in the center. Your Inviter is in position #1, your Direct is in position #2,
        and the four people your team invites fill positions #3–#6. The 2×2 Wheelhouse holds 6 Active Contributors.
      </p>
      <div className="flex justify-center">
        <div className="w-full max-w-lg">
          <WheelhouseDiagram />
        </div>
      </div>
    </div>
  </div>
);

const SlideAutomated = () => (
  <div className="flex flex-col items-center justify-center h-full px-12">
    <div className="max-w-3xl w-full">
      <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase font-medium mb-3 text-center">Technology</p>
      <h2 className="text-4xl md:text-5xl font-bold mb-3 text-center">Everything Is Automated</h2>
      <p className="text-muted-foreground text-lg italic mb-10 text-center">You Invite. We Ignite.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {automations.map((item, i) => (
          <div key={i} className="flex items-center gap-3 p-5 rounded-lg bg-card border border-border">
            <CheckCircle size={18} className="text-secondary flex-shrink-0" />
            <span className="text-foreground text-sm">{item}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SlideCTA = () => (
  <div className="flex flex-col items-center justify-center h-full px-12 text-center">
    <p className="text-muted-foreground text-sm mb-3">Use over 150 FIAT currencies and 100+ cryptocurrencies</p>
    <h2 className="text-foreground font-bold text-4xl md:text-5xl mb-4">Money for Everything!</h2>
    <p className="text-muted-foreground text-base mb-10 max-w-xl">
      Join thousands who are already receiving — the system is live and waiting for you.
    </p>
    <Link
      to="/#join"
      className="inline-flex items-center gap-2 px-10 py-4 rounded-sm font-bold tracking-widest uppercase text-sm transition-all duration-300 hover:scale-105 bg-primary text-primary-foreground"
    >
      Join Us & Start Receiving <ArrowRight size={16} />
    </Link>
  </div>
);

/* ── Slides Array ── */

const slides = [
  { id: "hero", label: "Intro", Component: SlideHero },
  { id: "5050", label: "50/50", Component: SlideFiftyFifty },
  { id: "levels", label: "Levels", Component: SlideIncomeLevels },
  { id: "steps", label: "Steps", Component: SlideSteps },
  { id: "wheelhouse", label: "Wheelhouse", Component: SlideWheelhouse },
  { id: "automated", label: "Automated", Component: SlideAutomated },
  { id: "cta", label: "Join", Component: SlideCTA },
];

/* ── Main Presentation Component ── */

const HowItWorksDemo = () => {
  const [current, setCurrent] = useState(0);

  const goNext = useCallback(() => setCurrent((c) => Math.min(c + 1, slides.length - 1)), []);
  const goPrev = useCallback(() => setCurrent((c) => Math.max(c - 1, 0)), []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); goNext(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); goPrev(); }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev]);

  const Slide = slides[current].Component;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Slide viewport */}
      <div className="flex-1 relative flex items-stretch pt-20">
        {/* Previous arrow */}
        <button
          onClick={goPrev}
          disabled={current === 0}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-border bg-background/80 backdrop-blur flex items-center justify-center transition-all hover:bg-muted disabled:opacity-20 disabled:cursor-not-allowed"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Slide content */}
        <div className="flex-1 flex items-center justify-center overflow-hidden">
          <div
            key={current}
            className="w-full h-full animate-in fade-in slide-in-from-right-4 duration-300"
          >
            <Slide />
          </div>
        </div>

        {/* Next arrow */}
        <button
          onClick={goNext}
          disabled={current === slides.length - 1}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-border bg-background/80 backdrop-blur flex items-center justify-center transition-all hover:bg-muted disabled:opacity-20 disabled:cursor-not-allowed"
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Bottom bar: dots + slide label */}
      <div className="py-5 flex flex-col items-center gap-3 border-t border-border bg-background">
        <div className="flex items-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? "w-8 bg-primary" : "w-2 bg-border hover:bg-muted-foreground/40"
              }`}
              aria-label={`Go to slide: ${s.label}`}
            />
          ))}
        </div>
        <p className="text-muted-foreground text-xs tracking-widest uppercase">
          {current + 1} / {slides.length} — {slides[current].label}
        </p>
      </div>
    </div>
  );
};

export default HowItWorksDemo;
