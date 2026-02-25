import { CheckCircle, Users, RefreshCw, TrendingUp, ArrowDownUp, UserPlus, DollarSign, Zap } from "lucide-react";
import WheelhouseDiagram from "@/components/WheelhouseDiagram";
import SlideLayout, { SlideLabel, SlideHeading, SlideBody } from "./SlideLayout";

const gold = "hsl(41 50% 65%)";
const navy = "hsl(220 30% 12%)";
const cobalt = "hsl(224 85% 58%)";
const emerald = "hsl(160 80% 42%)";
const goldBorder = "hsl(41 50% 65%)";

/* ─── 1. HERO ─── */
export const SlideHero = () => (
  <SlideLayout>
    <div className="text-center">
      <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border mb-8" style={{ borderColor: gold, background: "hsl(41 50% 65% / 0.08)" }}>
        <Zap size={14} style={{ color: gold }} />
        <span className="text-xs tracking-[0.3em] uppercase font-bold" style={{ color: gold }}>Live Presentation</span>
      </div>
      <SlideLabel>Cooperative Crowdfunding</SlideLabel>
      <h1
        className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-[0.95]"
        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
      >
        <span className="text-white">How </span>
        <span className="gold-gradient">Coop5050</span>
        <span className="text-white"> Works</span>
      </h1>
      <SlideBody className="mb-10">
        A 2×2 peer-to-peer crowdfunding platform where{" "}
        <span className="text-white font-semibold">100% of every contribution</span>{" "}
        goes directly to you — the participants. No middlemen. No exceptions.
      </SlideBody>
    </div>
  </SlideLayout>
);

/* ─── 2. 50/50 PROMISE ─── */
export const SlideFiftyFifty = () => (
  <SlideLayout>
    <div className="max-w-5xl w-full text-center">
      <SlideLabel>The 50/50 Promise</SlideLabel>
      <SlideHeading>100% Instant Payout</SlideHeading>
      <SlideBody className="mb-12">
        Every contribution results in an <span className="text-white font-semibold">instant payout</span> — 50% goes directly to{" "}
        <span className="text-white font-semibold">you</span> and 50% goes to a{" "}
        <span className="text-white font-semibold">teammate</span>.
        No middleman. No waiting.
      </SlideBody>
    </div>
  </SlideLayout>
);

/* ─── 3. INCOME LEVELS ─── */
export const SlideIncomeLevels = () => (
  <SlideLayout>
    <div className="max-w-5xl w-full text-center">
      <SlideLabel>Get In Where You Fit In</SlideLabel>
      <SlideHeading>3 Cooperative Levels</SlideHeading>
      <SlideBody className="mb-12">
        <span className="text-white font-semibold">100% instant payout</span> — being on all levels is a{" "}
        <span className="text-white font-semibold">one-time</span> out-of-pocket contribution of{" "}
        <span className="text-white font-semibold">$17,500</span>.
        Earn <span className="text-white font-semibold">300% per cycle</span> on each level.
      </SlideBody>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { name: "Level 1", amount: "$2,500", receive: "$7,500", perPos: "$1,250", color: cobalt, glow: "hsl(224 85% 58% / 0.15)" },
          { name: "Level 2", amount: "$5,000", receive: "$15,000", perPos: "$2,500", color: emerald, glow: "hsl(160 80% 42% / 0.15)" },
          { name: "Level 3", amount: "$10,000", receive: "$30,000", perPos: "$5,000", color: goldBorder, glow: "hsl(41 50% 65% / 0.15)" },
        ].map((tier, i) => (
          <div
            key={i}
            className="rounded-2xl p-8 text-center transition-all duration-300 hover:scale-[1.02]"
            style={{
              border: `2px solid ${tier.color}`,
              background: `linear-gradient(180deg, ${tier.glow} 0%, transparent 100%)`,
            }}
          >
            <p className="text-xs tracking-[0.3em] uppercase font-bold mb-3" style={{ color: tier.color }}>{tier.name}</p>
            <p className="text-4xl font-black text-white mb-1">{tier.amount}</p>
            <p className="text-white/40 text-sm mb-6">One-time contribution</p>
            <div className="border-t pt-6 mb-2" style={{ borderColor: `${tier.color}33` }}>
              <p className="text-white/40 text-xs uppercase tracking-wider mb-2">You Receive Per Cycle</p>
              <p className="text-4xl font-black text-white">{tier.receive}</p>
              <p className="text-white/40 text-sm mt-2">{tier.perPos} × 6 positions</p>
            </div>
            <p className="text-xs italic mt-4" style={{ color: tier.color }}>Over and over again</p>
          </div>
        ))}
      </div>
    </div>
  </SlideLayout>
);

/* ─── 4. 300% RETURN ─── */
export const Slide300Percent = () => (
  <SlideLayout>
    <div className="max-w-4xl w-full text-center">
      <SlideLabel>The Math</SlideLabel>
      <SlideHeading>
        Earn <span className="gold-gradient">300%</span> Per Cycle
      </SlideHeading>
      <SlideBody className="mb-12">
        Your cooperative holds 6 positions. You receive 50% from each.
        That's 6 × 50% = <span className="text-white font-bold">300% return</span> every time — over and over.
      </SlideBody>
      <div className="max-w-lg mx-auto rounded-2xl overflow-hidden" style={{ border: "1px solid hsl(0 0% 100% / 0.1)" }}>
        <div className="p-6" style={{ background: "hsl(0 0% 100% / 0.04)" }}>
          <p className="text-xs tracking-widest uppercase text-white/40 mb-2">Example: $2,500 Level</p>
          <p className="text-white font-bold text-xl">You contribute <span style={{ color: gold }}>$2,500</span> one time</p>
        </div>
        <div className="grid grid-cols-3 gap-px" style={{ background: "hsl(0 0% 100% / 0.06)" }}>
          {[1, 2, 3, 4, 5, 6].map((pos) => (
            <div key={pos} className="p-5 text-center" style={{ background: navy }}>
              <p className="text-xs text-white/30 mb-1">Position {pos}</p>
              <p className="text-white font-bold text-lg">$1,250</p>
              <p className="text-xs" style={{ color: gold }}>50%</p>
            </div>
          ))}
        </div>
        <div className="p-6 text-center" style={{ background: `linear-gradient(180deg, hsl(41 50% 65% / 0.1) 0%, transparent 100%)`, borderTop: `1px solid hsl(41 50% 65% / 0.2)` }}>
          <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Total per cycle</p>
          <p className="text-5xl font-black" style={{ color: gold }}>$7,500</p>
          <p className="text-white/50 text-sm mt-2">= 300% of your $2,500 contribution</p>
        </div>
      </div>
    </div>
  </SlideLayout>
);

/* ─── 5. 6 WAYS TO EARN ─── */
const waysToEarn = [
  { icon: UserPlus, title: "Personals", desc: "Earn from people you personally invite into the cooperative." },
  { icon: Users, title: "Team Personals", desc: "Earn from people your team members invite — their activity benefits you." },
  { icon: ArrowDownUp, title: "Help From Above", desc: "Your inviter and upline can place members into your cooperative." },
  { icon: TrendingUp, title: "Help From Below", desc: "Your downline's growth spills over and fills positions in your matrix." },
  { icon: RefreshCw, title: "Follow Reentries", desc: "When a teammate completes a cycle, they re-enter and follow you again." },
  { icon: DollarSign, title: "One-Time Contributions", desc: "Each level requires only a single out-of-pocket contribution to activate." },
];

export const SlideWaysToEarn = () => (
  <SlideLayout>
    <div className="max-w-5xl w-full text-center">
      <SlideLabel>Multiple Streams</SlideLabel>
      <SlideHeading>6 Ways To Earn</SlideHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
        {waysToEarn.map((way, i) => (
          <div
            key={i}
            className="rounded-xl p-6 text-left transition-all duration-300 hover:scale-[1.02] group"
            style={{
              background: "hsl(0 0% 100% / 0.04)",
              border: "1px solid hsl(0 0% 100% / 0.08)",
            }}
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: "hsl(41 50% 65% / 0.12)" }}>
              <way.icon size={20} style={{ color: gold }} />
            </div>
            <h3 className="text-white font-bold text-base mb-2">{way.title}</h3>
            <p className="text-white/50 text-sm leading-relaxed">{way.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </SlideLayout>
);

/* ─── 6. MATRIX FILL ─── */
export const SlideMatrixFill = () => (
  <SlideLayout>
    <div className="max-w-4xl w-full text-center">
      <SlideLabel>How Your Matrix Fills</SlideLabel>
      <SlideHeading>Your 2×2 Matrix</SlideHeading>
      <SlideBody className="mb-10">
        <span className="text-white font-semibold">100% is paid out</span> — YOU sit at the center. Invite 2 personal members (positions 1 & 2).
        Your team helps fill positions 3–6. Each position pays you <span className="text-white font-bold">50% instantly</span>.
        When you complete each cooperative, you receive <span className="text-white font-bold">300%</span>.
      </SlideBody>
      <div className="inline-block rounded-2xl overflow-hidden" style={{ border: "1px solid hsl(0 0% 100% / 0.1)" }}>
        <div className="p-5" style={{ background: "hsl(41 50% 65% / 0.08)", borderBottom: "1px solid hsl(0 0% 100% / 0.08)" }}>
          <p className="text-sm tracking-widest uppercase font-bold" style={{ color: gold }}>YOU — $2,500 Level</p>
        </div>
        <div className="p-6" style={{ background: "hsl(0 0% 100% / 0.03)" }}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {[
              { pos: "1", label: "Your Personal", amount: "$1,250" },
              { pos: "2", label: "Your Personal", amount: "$1,250" },
            ].map((p) => (
              <div key={p.pos} className="rounded-xl p-4" style={{ background: "hsl(224 85% 58% / 0.1)", border: `1px solid ${cobalt}40` }}>
                <p className="text-xs text-white/40">Position {p.pos}</p>
                <p className="text-xs" style={{ color: cobalt }}>{p.label}</p>
                <p className="text-white font-bold text-lg mt-1">{p.amount}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[3, 4, 5, 6].map((pos) => (
              <div key={pos} className="rounded-xl p-3" style={{ background: "hsl(0 0% 100% / 0.04)", border: "1px solid hsl(0 0% 100% / 0.08)" }}>
                <p className="text-xs text-white/30">Pos {pos}</p>
                <p className="text-xs text-white/40">Team Help</p>
                <p className="text-white font-bold text-sm mt-1">$1,250</p>
              </div>
            ))}
          </div>
        </div>
        <div className="p-5" style={{ background: "hsl(41 50% 65% / 0.06)", borderTop: "1px solid hsl(0 0% 100% / 0.08)" }}>
          <p className="text-white font-bold text-lg">Total: <span style={{ color: gold }}>$7,500</span> <span className="text-white/40 font-normal text-sm">— 300% return per cycle</span></p>
        </div>
      </div>
    </div>
  </SlideLayout>
);

/* ─── 7. WHEELHOUSE ─── */
export const SlideWheelhouse = ({ onFirstCycleComplete }: { onFirstCycleComplete?: () => void }) => (
  <div className="flex flex-col items-center justify-start h-full px-6 pt-0 overflow-hidden -mt-10">
    <div className="max-w-6xl w-full">
      <div className="text-center mb-0">
        <SlideLabel>The Technology</SlideLabel>
        <SlideHeading>The Mobius Loop Wheelhouse</SlideHeading>
        <p className="text-white/50 text-sm max-w-2xl mx-auto">
          When one cooperative completes, another automatically opens. Your team always follows you.
        </p>
      </div>
      <div className="flex justify-center -mt-4">
        <div className="w-full max-w-3xl">
          <WheelhouseDiagram onFirstCycleComplete={onFirstCycleComplete} />
        </div>
      </div>
    </div>
  </div>
);

/* ─── 8. MOBIUS LOOP ─── */
export const SlideMobiusLoop = () => (
  <SlideLayout>
    <div className="max-w-4xl w-full text-center">
      <SlideLabel>Infinite Cycles</SlideLabel>
      <SlideHeading>Unlimited Reentries & Follows</SlideHeading>
      <SlideBody className="mb-12">
        When a teammate completes their cooperative, they follow you into your next one — automatically.
        You never lose your team. More money, not more work.
      </SlideBody>
      <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-4 max-w-2xl mx-auto">
        {[
          { label: "Cycle 1", desc: "Your first cooperative fills and completes", color: cobalt },
          { label: "Cycle 2", desc: "A new cooperative auto-opens, your team follows", color: emerald },
          { label: "Cycle ∞", desc: "The process repeats — unlimited income potential", color: gold },
        ].map((c, i) => (
          <>
            <div key={i} className="rounded-xl p-6 text-center h-full flex flex-col justify-center" style={{ background: "hsl(0 0% 100% / 0.04)", border: `1px solid ${c.color}40` }}>
              <div className="text-3xl font-black mb-3" style={{ color: c.color }}>{c.label}</div>
              <p className="text-white/50 text-xs leading-relaxed">{c.desc}</p>
            </div>
            {i < 2 && <span className="text-2xl" style={{ color: gold }}>→</span>}
          </>
        ))}
      </div>
      <div className="flex items-center gap-3 p-5 rounded-xl mt-10 max-w-md mx-auto" style={{ background: "hsl(41 50% 65% / 0.08)", border: "1px solid hsl(41 50% 65% / 0.15)" }}>
        <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: gold }} />
        <p className="text-sm text-white/60">
          <span className="text-white font-semibold">You Follow Your Inviter.</span>{" "}
          Your Team Always Follows You.
        </p>
      </div>
    </div>
  </SlideLayout>
);

/* ─── 9. AUTOMATED ─── */
const automations = [
  "Automated Positioning",
  "Automated Sending & Receiving",
  "Automated Re-Entry",
  "Automated Suspend & Un-Suspend",
  "Automated Email Notifications",
  "Automatic Transaction History",
];

export const SlideAutomated = () => (
  <SlideLayout>
    <div className="max-w-3xl w-full text-center">
      <SlideLabel>Technology</SlideLabel>
      <SlideHeading>Everything Is Automated</SlideHeading>
      <p className="text-2xl md:text-3xl italic mb-12" style={{ color: gold, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
        You Invite. We Ignite.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {automations.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-5 rounded-xl transition-all"
            style={{
              background: "hsl(0 0% 100% / 0.04)",
              border: "1px solid hsl(0 0% 100% / 0.08)",
            }}
          >
            <CheckCircle size={20} style={{ color: emerald }} className="flex-shrink-0" />
            <span className="text-white text-sm font-medium">{item}</span>
          </div>
        ))}
      </div>
    </div>
  </SlideLayout>
);

/* ─── 10. CLOSING ─── */
export const SlideClosing = () => (
  <SlideLayout>
    <div className="text-center">
      <p className="text-white/40 text-sm mb-6 tracking-wider">Use over 150 FIAT currencies and 100+ cryptocurrencies</p>
      <SlideHeading className="mb-8">
        Would That <span className="gold-gradient">Change Your Life?</span>
      </SlideHeading>
      <SlideBody className="mb-10">
        Earn from 100s or even 1,000s of cooperatives. The system is live, fully automated, and waiting for you.
      </SlideBody>
      <div className="inline-flex items-center gap-3 px-10 py-5 rounded-full mb-8" style={{ background: "hsl(41 50% 65% / 0.1)", border: `2px solid ${gold}` }}>
        <span className="text-4xl" style={{ color: gold }}>∞</span>
        <span className="text-lg tracking-[0.2em] uppercase font-bold" style={{ color: gold }}>Money for Everything.</span>
      </div>
    </div>
  </SlideLayout>
);
