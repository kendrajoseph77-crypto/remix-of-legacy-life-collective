import { useState, useCallback, useEffect } from "react";
import Navbar from "@/components/Navbar";
import WheelhouseDiagram from "@/components/WheelhouseDiagram";
import { CheckCircle, ChevronLeft, ChevronRight, Users, RefreshCw, TrendingUp, ArrowDownUp, UserPlus, DollarSign } from "lucide-react";

const automations = [
  "Automated Positioning",
  "Automated Sending & Receiving",
  "Automated Re-Entry",
  "Automated Suspend & Un-Suspend",
  "Automated Email Notifications",
  "Automatic Transaction History",
];

const waysToEarn = [
  { icon: UserPlus, title: "Personals", desc: "Earn from people you personally invite into the cooperative." },
  { icon: Users, title: "Team Personals", desc: "Earn from people your team members invite — their activity benefits you." },
  { icon: ArrowDownUp, title: "Help From Above", desc: "Your inviter and upline can place members into your cooperative." },
  { icon: TrendingUp, title: "Help From Below", desc: "Your downline's growth spills over and fills positions in your matrix." },
  { icon: RefreshCw, title: "Follow Reentries", desc: "When a teammate completes a cycle, they re-enter and follow you again." },
  { icon: DollarSign, title: "One-Time Contributions", desc: "Each level requires only a single out-of-pocket contribution to activate." },
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
    <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
      A 2×2 peer-to-peer crowdfunding platform where 100% of every contribution goes directly to you — the participants. No middlemen. No exceptions.
    </p>
  </div>
);

const SlideFiftyFifty = () => (
  <div className="flex flex-col items-center justify-center h-full px-12">
    <div className="max-w-4xl w-full">
      <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase font-medium mb-3 text-center">The 50/50 Promise</p>
      <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">100% Instant Payout — 50/50</h2>
      <p className="text-muted-foreground leading-relaxed mb-8 text-center max-w-2xl mx-auto">
        Every single contribution is split instantly — 50% goes directly to you and 50% goes to a teammate.
        There is no middleman. No fees. No waiting. You receive your share the moment a contribution is made.
      </p>
      <div className="rounded-xl overflow-hidden border border-border max-w-xl mx-auto">
        <div className="flex">
          <div className="flex-1 p-8 text-center bg-muted/20">
            <p className="text-primary text-5xl font-bold">50%</p>
            <p className="text-muted-foreground text-sm mt-3">Instant payout to <span className="text-foreground font-medium">YOU</span></p>
          </div>
          <div className="w-px bg-border" />
          <div className="flex-1 p-8 text-center bg-muted/20">
            <p className="text-secondary text-5xl font-bold">50%</p>
            <p className="text-muted-foreground text-sm mt-3">Instant payout to your <span className="text-foreground font-medium">Teammate</span></p>
          </div>
        </div>
        <div className="p-4 bg-muted/30 text-center border-t border-border">
          <p className="text-muted-foreground text-xs tracking-widest uppercase">100% of every contribution — zero platform fees</p>
        </div>
      </div>
    </div>
  </div>
);

const Slide300Percent = () => (
  <div className="flex flex-col items-center justify-center h-full px-12">
    <div className="max-w-4xl w-full text-center">
      <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase font-medium mb-3">The Math</p>
      <h2 className="text-4xl md:text-5xl font-bold mb-6">Earn 300% Each Completed Cooperative</h2>
      <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
        Your cooperative holds 6 positions. You receive a 50% contribution from each position.
        That's 6 × 50% = <span className="text-foreground font-semibold">300% return</span> every time your cooperative completes — over and over again.
      </p>
      <div className="max-w-md mx-auto rounded-xl border border-border overflow-hidden">
        <div className="p-5 bg-muted/20 border-b border-border">
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">Example: $2,500 Level</p>
          <p className="text-foreground font-bold text-lg">You contribute $2,500 one time</p>
        </div>
        <div className="grid grid-cols-3 divide-x divide-border">
          {[1, 2, 3, 4, 5, 6].map((pos) => (
            <div key={pos} className="p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">Pos {pos}</p>
              <p className="text-foreground font-bold">$1,250</p>
              <p className="text-xs text-muted-foreground">50%</p>
            </div>
          ))}
        </div>
        <div className="p-5 bg-muted/30 border-t border-border text-center">
          <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Total per cycle</p>
          <p className="text-foreground font-bold text-2xl">$7,500</p>
          <p className="text-muted-foreground text-xs mt-1">= 300% of your $2,500 contribution</p>
        </div>
      </div>
    </div>
  </div>
);

const SlideIncomeLevels = () => (
  <div className="flex flex-col items-center justify-center h-full px-12">
    <div className="max-w-5xl w-full">
      <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase font-medium mb-3 text-center">Get In Where You Fit In</p>
      <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">3 Cooperative Levels</h2>
      <p className="text-muted-foreground max-w-2xl mx-auto text-sm text-center mb-10">
        Each level requires only a one-time out-of-pocket contribution. Your goal is to be active on all 3 levels simultaneously, receiving contributions on each.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          { name: "Level 1", amount: "$2,500", receive: "$7,500", perPos: "$1,250", border: "hsl(224 85% 58%)" },
          { name: "Level 2", amount: "$5,000", receive: "$15,000", perPos: "$2,500", border: "hsl(160 80% 42%)" },
          { name: "Level 3", amount: "$10,000", receive: "$30,000", perPos: "$5,000", border: "hsl(41 50% 65%)" },
        ].map((tier, i) => (
          <div key={i} className="rounded-xl p-6 bg-card text-center transition-all duration-300" style={{ border: `2px solid ${tier.border}` }}>
            <p className="text-muted-foreground text-xs tracking-widest uppercase mb-2">{tier.name}</p>
            <p className="text-2xl font-bold mb-1 text-foreground">{tier.amount}</p>
            <p className="text-muted-foreground text-sm mb-4">One-time contribution</p>
            <div className="border-t border-border pt-4 mb-2">
              <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">You Receive</p>
              <p className="text-2xl font-bold text-foreground">{tier.receive}</p>
              <p className="text-muted-foreground text-xs mt-1">{tier.perPos} × 6 positions per cycle</p>
            </div>
            <p className="text-muted-foreground text-xs italic mt-3">Over and over</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SlideWaysToEarn = () => (
  <div className="flex flex-col items-center justify-center h-full px-12">
    <div className="max-w-5xl w-full">
      <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase font-medium mb-3 text-center">Multiple Streams</p>
      <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center">6 Ways To Earn Contributions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {waysToEarn.map((way, i) => (
          <div key={i} className="rounded-xl p-5 bg-card border border-border">
            <way.icon size={20} className="text-muted-foreground mb-3" />
            <h3 className="text-foreground font-bold text-sm mb-1">{way.title}</h3>
            <p className="text-muted-foreground text-xs leading-relaxed">{way.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SlideMatrixFill = () => (
  <div className="flex flex-col items-center justify-center h-full px-12">
    <div className="max-w-4xl w-full text-center">
      <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase font-medium mb-3">How Your Matrix Fills</p>
      <h2 className="text-4xl md:text-5xl font-bold mb-6">Your 2×2 Matrix — Step by Step</h2>
      <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
        YOU sit at the center. Your inviter places you, then you invite 2 personal members (positions 1 & 2).
        Your team helps fill positions 3–6. Each position pays you 50% instantly.
      </p>
      <div className="inline-block rounded-xl border border-border overflow-hidden">
        <div className="p-4 bg-muted/20 border-b border-border">
          <p className="text-xs tracking-widest uppercase text-muted-foreground">YOU — $2,500 Level</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 gap-3 mb-3">
            {[
              { pos: "1", label: "Your Personal", amount: "$1,250" },
              { pos: "2", label: "Your Personal", amount: "$1,250" },
            ].map((p) => (
              <div key={p.pos} className="rounded-lg border border-border p-3 bg-card">
                <p className="text-xs text-muted-foreground">Position {p.pos}</p>
                <p className="text-xs text-muted-foreground">{p.label}</p>
                <p className="text-foreground font-bold">{p.amount}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[
              { pos: "3", label: "Team Help" },
              { pos: "4", label: "Team Help" },
              { pos: "5", label: "Team Help" },
              { pos: "6", label: "Team Help" },
            ].map((p) => (
              <div key={p.pos} className="rounded-lg border border-border p-3 bg-card">
                <p className="text-xs text-muted-foreground">Pos {p.pos}</p>
                <p className="text-xs text-muted-foreground">{p.label}</p>
                <p className="text-foreground font-bold text-sm">$1,250</p>
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 bg-muted/30 border-t border-border">
          <p className="text-foreground font-bold">Total: $7,500 — <span className="text-muted-foreground font-normal">300% return per cycle</span></p>
        </div>
      </div>
    </div>
  </div>
);

const SlideWheelhouse = () => (
  <div className="flex flex-col items-center justify-center h-full px-12 overflow-hidden">
    <div className="max-w-5xl w-full">
      <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase font-medium mb-3 text-center">The Technology</p>
      <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">The Mobius Loop Wheelhouse</h2>
      <p className="text-muted-foreground leading-relaxed text-sm text-center max-w-2xl mx-auto mb-6">
        When one cooperative completes, another automatically opens. Your team always follows you into the next wheel.
        Unlimited reentries. Unlimited follows. Unlimited income.
      </p>
      <div className="flex justify-center">
        <div className="w-full max-w-lg">
          <WheelhouseDiagram />
        </div>
      </div>
    </div>
  </div>
);

const SlideMobiusLoop = () => (
  <div className="flex flex-col items-center justify-center h-full px-12">
    <div className="max-w-4xl w-full text-center">
      <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase font-medium mb-3">Infinite Cycles</p>
      <h2 className="text-4xl md:text-5xl font-bold mb-6">Unlimited Reentries & Follows</h2>
      <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
        When a teammate completes their cooperative, they follow you into your next one — automatically filling positions again.
        You never lose your team. Each completed cycle opens a new one. More money, not more work.
      </p>
      <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-3 max-w-2xl mx-auto">
        {[
          { label: "Cycle 1", desc: "Your first cooperative fills and completes" },
          { label: "Cycle 2", desc: "A new cooperative auto-opens, your team follows" },
          { label: "Cycle ∞", desc: "The process repeats — unlimited income potential" },
        ].map((c, i) => (
          <>
            <div key={i} className="rounded-xl p-5 bg-card border border-border text-center h-full flex flex-col justify-center">
              <div className="text-3xl font-bold text-muted-foreground/30 mb-2">{c.label}</div>
              <p className="text-muted-foreground text-xs leading-relaxed">{c.desc}</p>
            </div>
            {i < 2 && <span className="text-muted-foreground/40 text-xl">→</span>}
          </>
        ))}
      </div>
      <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/30 border border-border mt-8 max-w-md mx-auto">
        <div className="w-2 h-2 rounded-full bg-secondary animate-pulse flex-shrink-0" />
        <p className="text-sm text-muted-foreground">
          <span className="text-foreground font-medium">You Follow Your Inviter.</span>{" "}
          Your Team Always Follows You.
        </p>
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

const SlideClosing = () => (
  <div className="flex flex-col items-center justify-center h-full px-12 text-center">
    <p className="text-muted-foreground text-sm mb-3">Use over 150 FIAT currencies and 100+ cryptocurrencies</p>
    <h2 className="text-foreground font-bold text-4xl md:text-5xl mb-4">Would That Change Your Life?</h2>
    <p className="text-muted-foreground text-base max-w-xl mb-8">
      Earn from 100s or even 1,000s of cooperatives. The system is live, fully automated, and waiting for you.
    </p>
    <p className="text-muted-foreground text-sm italic">Money for Everything.</p>
  </div>
);

/* ── Slides Array ── */

const slides = [
  { id: "hero", label: "Intro", Component: SlideHero },
  { id: "5050", label: "50/50 Payout", Component: SlideFiftyFifty },
  { id: "300", label: "300% Return", Component: Slide300Percent },
  { id: "levels", label: "3 Levels", Component: SlideIncomeLevels },
  { id: "ways", label: "6 Ways to Earn", Component: SlideWaysToEarn },
  { id: "matrix", label: "Matrix Fill", Component: SlideMatrixFill },
  { id: "wheelhouse", label: "Wheelhouse", Component: SlideWheelhouse },
  { id: "mobius", label: "Mobius Loop", Component: SlideMobiusLoop },
  { id: "automated", label: "Automated", Component: SlideAutomated },
  { id: "closing", label: "Closing", Component: SlideClosing },
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

      <div className="flex-1 relative flex items-stretch pt-20">
        <button
          onClick={goPrev}
          disabled={current === 0}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-border bg-background/80 backdrop-blur flex items-center justify-center transition-all hover:bg-muted disabled:opacity-20 disabled:cursor-not-allowed"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex-1 flex items-center justify-center overflow-hidden">
          <div key={current} className="w-full h-full animate-in fade-in slide-in-from-right-4 duration-300">
            <Slide />
          </div>
        </div>

        <button
          onClick={goNext}
          disabled={current === slides.length - 1}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-border bg-background/80 backdrop-blur flex items-center justify-center transition-all hover:bg-muted disabled:opacity-20 disabled:cursor-not-allowed"
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>
      </div>

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
