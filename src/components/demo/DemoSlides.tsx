import { CheckCircle, Zap } from "lucide-react";
import WheelhouseDiagram from "@/components/WheelhouseDiagram";
import SlideLayout, { SlideLabel, SlideHeading, SlideBody } from "./SlideLayout";
import logoF from "@/assets/logo-5050-f.svg";
import logoC from "@/assets/logo-5050-c.svg";
import logoM from "@/assets/logo-5050-m.svg";

const green = "hsl(160 80% 42%)";
const greenLight = "hsl(160 80% 50%)";
const greenDark = "hsl(160 80% 30%)";
const navy = "hsl(220 30% 12%)";
const cobalt = "hsl(224 85% 58%)";
const gold = "hsl(41 50% 65%)";

/* ─── 1. HERO ─── */
export const SlideHero = () => (
  <SlideLayout>
    <div className="text-center">
      <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border mb-8" style={{ borderColor: green, background: "hsl(160 80% 42% / 0.08)" }}>
        <Zap size={14} style={{ color: green }} />
        <span className="text-xs tracking-[0.3em] uppercase font-bold" style={{ color: green }}>Cooperative Crowdfunding</span>
      </div>
      <h1
        className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-[0.95]"
        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
      >
        <span style={{ background: `linear-gradient(135deg, ${greenLight}, ${green}, ${greenDark}, ${greenLight})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>5050</span>
        <span className="text-white"> Works...</span>
      </h1>
      <SlideBody className="mb-6">
        for <span className="text-white font-semibold">100% of the people</span>,{" "}
        <span className="text-white font-semibold">100% of the time</span>, who complete the{" "}
        <span className="text-white font-semibold">3 simple, doable steps</span>.
      </SlideBody>
      <p className="text-2xl md:text-3xl italic" style={{ color: green, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
        Money for Everything!
      </p>
    </div>
  </SlideLayout>
);

/* ─── 2. 50/50 PROMISE ─── */
export const SlideFiftyFifty = () => (
  <SlideLayout>
    <div className="max-w-5xl w-full text-center">
      <SlideLabel>The 50/50 Promise</SlideLabel>
      <SlideHeading>100% Instantly Goes to You…</SlideHeading>
      <p className="text-3xl md:text-4xl italic mb-12 text-white/80" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
        Our members!
      </p>
      <div className="max-w-2xl mx-auto rounded-2xl overflow-hidden" style={{ border: "1px solid hsl(0 0% 100% / 0.1)" }}>
        <div className="flex">
          <div className="flex-1 p-10 text-center" style={{ background: "hsl(0 0% 100% / 0.04)" }}>
            <p className="text-6xl font-black" style={{ color: green }}>50%</p>
            <p className="text-white/50 text-sm mt-3">Instant Payout to <span className="text-white font-semibold">YOU</span></p>
          </div>
          <div className="w-px" style={{ background: "hsl(0 0% 100% / 0.1)" }} />
          <div className="flex-1 p-10 text-center" style={{ background: "hsl(0 0% 100% / 0.04)" }}>
            <p className="text-6xl font-black" style={{ color: green }}>50%</p>
            <p className="text-white/50 text-sm mt-3">Instant Payout to <span className="text-white font-semibold">Teammate</span></p>
          </div>
        </div>
      </div>
    </div>
  </SlideLayout>
);

/* ─── 3. THREE STEPS ─── */
const steps = [
  {
    number: "01",
    keyword: "Become",
    title: "Register & Activate",
    desc: "Make a contribution at your chosen level to become an Active Contributor.",
  },
  {
    number: "02",
    keyword: "Build",
    title: "Invite 2 Members",
    desc: "Help 2 or more people become Active Contributors and join the cooperative.",
  },
  {
    number: "03",
    keyword: "Bond",
    title: "Your Team Grows",
    desc: "Your 2 each help 2 or more, and the cycle of giving and receiving continues.",
  },
];

export const SlideThreeSteps = () => (
  <SlideLayout>
    <div className="max-w-5xl w-full text-center">
      <SlideLabel>Affordable. Understandable. Rewarding.</SlideLabel>
      <SlideHeading>Just 3 Simple Steps</SlideHeading>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {steps.map((step, i) => (
          <div
            key={i}
            className="rounded-2xl p-8 text-left"
            style={{
              background: "hsl(0 0% 100% / 0.04)",
              border: "1px solid hsl(0 0% 100% / 0.08)",
            }}
          >
            <div className="flex items-baseline gap-3 mb-3">
              <span className="text-5xl font-bold text-white/15">{step.number}</span>
              <span className="text-5xl font-bold uppercase" style={{ color: green }}>{step.keyword}</span>
            </div>
            <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
            <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
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
        Earn <span style={{ background: `linear-gradient(135deg, ${greenLight}, ${green}, ${greenDark}, ${greenLight})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>300%</span> Per Cycle
      </SlideHeading>
      <SlideBody className="mb-12">
        Your cooperative holds 6 positions. You receive 50% from each.
        That's 6 × 50% = <span className="text-white font-bold">300% return</span> every time — over and over.
      </SlideBody>
      <div className="max-w-lg mx-auto rounded-2xl overflow-hidden" style={{ border: "1px solid hsl(0 0% 100% / 0.1)" }}>
        <div className="p-6" style={{ background: "hsl(0 0% 100% / 0.04)" }}>
          <p className="text-xs tracking-widest uppercase text-white/40 mb-2">Example: $2,500 Level</p>
          <p className="text-white font-bold text-xl">You contribute <span style={{ color: green }}>$2,500</span> one time</p>
        </div>
        <div className="grid grid-cols-3 gap-px" style={{ background: "hsl(0 0% 100% / 0.06)" }}>
          {[1, 2, 3, 4, 5, 6].map((pos) => (
            <div key={pos} className="p-5 text-center" style={{ background: navy }}>
              <p className="text-xs text-white/30 mb-1">Position {pos}</p>
              <p className="text-white font-bold text-lg">$1,250</p>
              <p className="text-xs" style={{ color: green }}>50%</p>
            </div>
          ))}
        </div>
        <div className="p-6 text-center" style={{ background: `linear-gradient(180deg, hsl(160 80% 42% / 0.1) 0%, transparent 100%)`, borderTop: `1px solid hsl(160 80% 42% / 0.2)` }}>
          <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Total per cycle</p>
          <p className="text-5xl font-black" style={{ color: green }}>$7,500</p>
          <p className="text-white/50 text-sm mt-2">= 300% of your $2,500 contribution</p>
        </div>
      </div>
    </div>
  </SlideLayout>
);

/* ─── 5. MATRIX FILL ─── */
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
        <div className="p-5" style={{ background: "hsl(160 80% 42% / 0.08)", borderBottom: "1px solid hsl(0 0% 100% / 0.08)" }}>
          <p className="text-sm tracking-widest uppercase font-bold" style={{ color: green }}>YOU — $2,500 Level</p>
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
        <div className="p-5" style={{ background: "hsl(160 80% 42% / 0.06)", borderTop: "1px solid hsl(0 0% 100% / 0.08)" }}>
          <p className="text-white font-bold text-lg">Total: <span style={{ color: green }}>$7,500</span> <span className="text-white/40 font-normal text-sm">— 300% return per cycle</span></p>
        </div>
      </div>
    </div>
  </SlideLayout>
);

/* ─── 6. WHEELHOUSE ─── */
export const SlideWheelhouse = ({ onFirstCycleComplete }: { onFirstCycleComplete?: () => void }) => (
  <div className="flex flex-col items-center justify-start h-full px-6 pt-0 overflow-hidden -mt-10">
    <div className="max-w-6xl w-full">
      <div className="text-center mb-0">
        <SlideLabel>2 × 2</SlideLabel>
        <SlideHeading>The Cooperative</SlideHeading>
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

/* ─── 7. MOBIUS LOOP ─── */
export const SlideMobiusLoop = () => (
  <SlideLayout>
    <div className="max-w-4xl w-full text-center">
      <SlideLabel>World Famous Mobius Loop</SlideLabel>
      <SlideHeading>When One Completes, Another One Opens</SlideHeading>
      <SlideBody className="mb-12">
        When a teammate completes their cooperative, they follow you into your next one — automatically.
        You never lose your team. More money, not more work.
      </SlideBody>
      <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-4 max-w-2xl mx-auto">
        {[
          { label: "Cycle 1", desc: "Your first cooperative fills and completes", color: cobalt },
          { label: "Cycle 2", desc: "A new cooperative auto-opens, your team follows", color: green },
          { label: "Cycle ∞", desc: "The process repeats — unlimited income potential", color: green },
        ].map((c, i) => (
          <>
            <div key={i} className="rounded-xl p-6 text-center h-full flex flex-col justify-center" style={{ background: "hsl(0 0% 100% / 0.04)", border: `1px solid ${c.color}40` }}>
              <div className="text-3xl font-black mb-3" style={{ color: c.color }}>{c.label}</div>
              <p className="text-white/50 text-xs leading-relaxed">{c.desc}</p>
            </div>
            {i < 2 && <span className="text-2xl" style={{ color: green }}>→</span>}
          </>
        ))}
      </div>
      <div className="flex items-center gap-3 p-5 rounded-xl mt-10 max-w-md mx-auto" style={{ background: "hsl(160 80% 42% / 0.08)", border: "1px solid hsl(160 80% 42% / 0.15)" }}>
        <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: green }} />
        <p className="text-sm text-white/60">
          <span className="text-white font-semibold">You Follow Your Inviter.</span>{" "}
          Your Team Always Follows You.
        </p>
      </div>
    </div>
  </SlideLayout>
);

/* ─── 8. AUTOMATED ─── */
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
      <p className="text-2xl md:text-3xl italic mb-12" style={{ color: green, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
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
            <CheckCircle size={20} style={{ color: green }} className="flex-shrink-0" />
            <span className="text-white text-sm font-medium">{item}</span>
          </div>
        ))}
      </div>
    </div>
  </SlideLayout>
);

/* ─── 9. INCOME LEVELS ─── */
export const SlideIncomeLevels = () => (
  <SlideLayout>
    <div className="max-w-6xl w-full text-center">
      <SlideLabel>100% Instant Payout · 50/50 · 300% Per Cycle</SlideLabel>
      <SlideHeading>Get In Where You Fit In</SlideHeading>
      <SlideBody className="mb-10">
        One time out of pocket. Your ultimate goal is to be active on all 3 Income Centers simultaneously.
      </SlideBody>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            name: "5050 Fast", color: cobalt, logo: logoF,
            glow: "hsl(224 85% 58% / 0.15)",
            vaults: [
              { contribution: "$25", payout: "$75", per: "6 × $12.50" },
              { contribution: "$50", payout: "$150", per: "6 × $25" },
              { contribution: "$100", payout: "$300", per: "6 × $50" },
            ],
            total: "$525",
          },
          {
            name: "5050 Core", color: green, logo: logoC,
            glow: "hsl(160 80% 42% / 0.15)",
            vaults: [
              { contribution: "$250", payout: "$750", per: "6 × $125" },
              { contribution: "$500", payout: "$1,500", per: "6 × $250" },
              { contribution: "$1,000", payout: "$3,000", per: "6 × $500" },
            ],
            total: "$5,250",
          },
          {
            name: "5050 Max", color: gold, logo: logoM,
            glow: "hsl(41 50% 65% / 0.15)",
            vaults: [
              { contribution: "$2,500", payout: "$7,500", per: "6 × $1,250" },
              { contribution: "$5,000", payout: "$15,000", per: "6 × $2,500" },
              { contribution: "$10,000", payout: "$30,000", per: "6 × $5,000" },
            ],
            total: "$52,500",
          },
        ].map((level, li) => (
          <div
            key={li}
            className="rounded-2xl p-5 text-center transition-all duration-300 hover:scale-[1.02]"
            style={{
              border: `2px solid ${level.color}`,
              background: `linear-gradient(180deg, ${level.glow} 0%, transparent 100%)`,
            }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <img src={level.logo} alt={level.name} className="h-8" />
              <p className="text-lg font-bold" style={{ color: level.color }}>{level.name}</p>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {level.vaults.map((v, i) => (
                <div key={i} className="rounded-lg p-2" style={{ background: "hsl(0 0% 100% / 0.04)", border: "1px solid hsl(0 0% 100% / 0.08)" }}>
                  <p className="text-xs font-semibold" style={{ color: level.color }}>{v.contribution}</p>
                  <p className="text-[10px] text-white/30">Cooperative</p>
                  <p className="text-white font-bold text-base">{v.payout}</p>
                  <p className="text-[10px] text-white/30">Over and Over</p>
                  <p className="text-[9px] text-white/20">{v.per}</p>
                </div>
              ))}
            </div>
            <div className="pt-3" style={{ borderTop: `1px solid ${level.color}33` }}>
              <p className="text-white/40 text-xs mb-1">Receive Each Cycle</p>
              <p className="text-3xl font-black" style={{ color: level.color }}>{level.total}</p>
            </div>
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
      <SlideHeading className="mb-4">
        Earn From 100's or Even 1,000's of{" "}
        <span style={{ background: `linear-gradient(135deg, ${greenLight}, ${green}, ${greenDark}, ${greenLight})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Cooperatives</span>
      </SlideHeading>
      <p className="text-3xl md:text-4xl font-bold text-white mb-10" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
        Wouldn't that change your life!
      </p>
      <div className="inline-flex items-center gap-3 px-10 py-5 rounded-full mb-8" style={{ background: "hsl(160 80% 42% / 0.1)", border: `2px solid ${green}` }}>
        <span className="text-4xl" style={{ color: green }}>∞</span>
        <span className="text-lg tracking-[0.2em] uppercase font-bold" style={{ color: green }}>Money for Everything.</span>
      </div>
    </div>
  </SlideLayout>
);
