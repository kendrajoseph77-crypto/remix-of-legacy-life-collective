import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";
import { ArrowRight, Users, RefreshCw, Shield, Zap, TrendingUp, Infinity, UserPlus } from "lucide-react";

/* ── Brand colors (HSL from design system) ── */
const BLUE = "hsl(224 85% 58%)";
const GREEN = "hsl(160 80% 42%)";
const GOLD = "hsl(39 55% 52%)";

const heading = "'Cormorant Garamond', Georgia, serif";

/* ── Wheelhouse SVG ── */
const WheelhouseSVG = ({
  label,
  positions,
  borderColor,
  size = "md",
}: {
  label: string;
  positions: (string | null)[];
  borderColor: string;
  size?: "sm" | "md";
}) => {
  const center = positions[0];
  const slots = [
    { x: 150, y: 52, label: positions[1] },
    { x: 150, y: 248, label: positions[2] },
    { x: 52, y: 100, label: positions[3] },
    { x: 248, y: 100, label: positions[4] },
    { x: 52, y: 200, label: positions[5] },
    { x: 248, y: 200, label: positions[6] },
  ];

  const sizeClass = size === "sm" ? "w-36 h-36 md:w-40 md:h-40" : "w-48 h-48 md:w-56 md:h-56";

  return (
    <div className="flex flex-col items-center gap-3">
      <svg viewBox="0 0 300 300" className={sizeClass}>
        <circle cx="150" cy="150" r="140" fill="none" stroke={borderColor} strokeWidth="4" opacity="0.3" />
        <circle cx="150" cy="150" r="120" fill={borderColor} opacity="0.15" />
        <line x1="150" y1="10" x2="150" y2="290" stroke="white" strokeWidth="3" opacity="0.5" />
        <line x1="10" y1="150" x2="290" y2="150" stroke="white" strokeWidth="3" opacity="0.5" />
        <circle cx="150" cy="150" r="65" fill="hsl(0 0% 90%)" opacity="0.4" />
        <circle cx="150" cy="150" r="40" fill="white" stroke={borderColor} strokeWidth="3" />
        <text x="150" y="155" textAnchor="middle" dominantBaseline="middle"
          className="font-bold" fontSize={center && center.length > 3 ? "13" : "16"} fill="hsl(0 0% 8%)">
          {center}
        </text>
        {slots.map((slot, i) =>
          slot.label ? (
            <g key={i}>
              <text x={slot.x} y={slot.y} textAnchor="middle" dominantBaseline="middle"
                className="font-bold" fontSize="20" fill="white">
                {slot.label}
              </text>
            </g>
          ) : null
        )}
      </svg>
      <p className="text-xs font-semibold tracking-widest uppercase text-white/60">{label}</p>
    </div>
  );
};

/* ── Steps ── */
const steps = [
  {
    step: "Step 1",
    title: "Register & Contribute",
    desc: "Your contribution is split 50/50 to help 2 teammates. You're now an Active Contributor inside the Wheelhouse.",
    color: BLUE,
  },
  {
    step: "Step 2",
    title: "Invite 2 Friends",
    desc: "Invite 2 friends to make a contribution. They enter the Wheelhouse and each sends you 50% of their contribution.",
    color: GREEN,
  },
  {
    step: "Step 3",
    title: "Your Team Grows",
    desc: "Help your 2 friends each invite 2 friends. Their contributions fill the remaining 4 positions — and you receive 50% from each one.",
    color: GOLD,
  },
];

/* ── Features ── */
const features = [
  {
    icon: Shield,
    title: "No Boards · No Splits",
    desc: "You always remain with your team and your team remains with you. No reshuffling.",
    color: BLUE,
  },
  {
    icon: RefreshCw,
    title: "Automatic Re-Entry",
    desc: "When your Wheelhouse closes, you are automatically re-entered into an open Wheelhouse — without any extra effort.",
    color: GREEN,
  },
  {
    icon: Users,
    title: "Your Team Follows You",
    desc: "Your team follows you into every new Wheelhouse. You never lose your team.",
    color: GOLD,
  },
  {
    icon: Zap,
    title: "100% Goes to Participants",
    desc: "Every contribution goes directly to participants. No middlemen. No exceptions.",
    color: BLUE,
  },
  {
    icon: UserPlus,
    title: "Invite Unlimited Friends",
    desc: "You can invite as many friends as you like — and you will always get half. The more friends invite friends, the more contributions you receive!",
    color: GREEN,
  },
  {
    icon: Infinity,
    title: "Receive Multiple Times a Day",
    desc: "The Mobius Loop means Wheelhouses open and close continuously. You can receive contributions multiple times a day.",
    color: GOLD,
  },
];

/* ── 50% Position Visual ── */
const PositionFillVisual = () => {
  const positionData = [
    { pos: "1", label: "50%", color: BLUE },
    { pos: "2", label: "50%", color: BLUE },
    { pos: "3", label: "50%", color: GREEN },
    { pos: "4", label: "50%", color: GREEN },
    { pos: "5", label: "50%", color: GOLD },
    { pos: "6", label: "50%", color: GOLD },
  ];

  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-3 max-w-2xl mx-auto">
      {positionData.map((p, i) => (
        <div key={i} className="flex flex-col items-center gap-2 p-4 rounded-xl border border-white/10 bg-white/[0.03]">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: `${p.color}25`, color: p.color }}>
            {p.pos}
          </div>
          <p className="text-lg font-bold" style={{ color: p.color }}>{p.label}</p>
          <p className="text-[10px] text-white/40 uppercase tracking-wider">to you</p>
        </div>
      ))}
    </div>
  );
};

const HowItWorksLife = () => {
  return (
    <div className="min-h-screen bg-[hsl(0_0%_6%)] text-white">
      <Navbar />

      {/* ── Hero ── */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,hsl(224_85%_58%/0.08)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_30%_20%,hsl(160_80%_42%/0.06)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_70%_20%,hsl(39_55%_52%/0.06)_0%,transparent_50%)]" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <p className="text-sm tracking-[0.35em] uppercase font-semibold mb-5" style={{ color: GOLD }}>
            Cooperative Crowdfunding
          </p>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-[1.05]" style={{ fontFamily: heading }}>
            How{" "}
            <span style={{ color: BLUE }}>50</span>
            <span style={{ color: GREEN }}>50</span>{" "}
            <span className="gold-gradient">LIFE</span>{" "}
            Works
          </h1>
          <p className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto text-white/60 mb-3">
            A 2×2 peer-to-peer cooperative where 100% of every contribution goes directly to participants.
            No middlemen. No exceptions.
          </p>
          <p className="text-base text-white/40 italic">Money for Everything!</p>
        </div>
      </section>

      {/* ── The 50/50 Split ── */}
      <section className="py-16 border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase font-medium mb-3" style={{ color: GOLD }}>
              The 50/50 Promise
            </p>
            <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: heading }}>
              Your Contribution Is Split 50/50
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              50% goes to one teammate, 50% goes to another. Together, we each do a little so all can receive a lot.
            </p>
          </div>

          <div className="flex items-center justify-center gap-0 max-w-lg mx-auto">
            <div className="flex-1 p-6 text-center rounded-l-xl" style={{ background: `${BLUE}20`, borderLeft: `3px solid ${BLUE}` }}>
              <p className="text-4xl font-bold" style={{ color: BLUE }}>50%</p>
              <p className="text-white/50 text-sm mt-2">Instant Payout to You</p>
            </div>
            <div className="w-px h-20 bg-white/20" />
            <div className="flex-1 p-6 text-center rounded-r-xl" style={{ background: `${GREEN}20`, borderRight: `3px solid ${GREEN}` }}>
              <p className="text-4xl font-bold" style={{ color: GREEN }}>50%</p>
              <p className="text-white/50 text-sm mt-2">Instant Payout to Teammate</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 300% Per Cycle ── */}
      <section className="py-16 border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase font-medium mb-3" style={{ color: GREEN }}>
              Receive 50% from Each Position
            </p>
            <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: heading }}>
              Earn <span style={{ color: GOLD }}>300%</span> Each Cycle
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              6 Active Contributors fill your Wheelhouse. You receive 50% from each position — that's 300% of your original contribution, every single cycle.
            </p>
          </div>

          <PositionFillVisual />

          <div className="text-center mt-8">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-white/[0.03]">
              <TrendingUp size={18} style={{ color: GOLD }} />
              <p className="text-sm">
                <span className="font-bold text-white">6 × 50%</span>
                <span className="text-white/40 mx-2">=</span>
                <span className="font-bold" style={{ color: GOLD }}>300% Return Per Cycle</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3 Steps ── */}
      <section className="py-16 border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase font-medium mb-3" style={{ color: GOLD }}>
              Simple Process
            </p>
            <h2 className="text-3xl md:text-5xl font-bold" style={{ fontFamily: heading }}>
              Just 3 Simple Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <div
                key={i}
                className="rounded-xl p-6 border border-white/10 bg-white/[0.03] relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1" style={{ background: s.color }} />
                <p className="text-xs tracking-[0.3em] uppercase font-bold mb-2" style={{ color: s.color }}>
                  {s.step}
                </p>
                <h3 className="text-xl font-bold mb-3 text-white" style={{ fontFamily: heading }}>
                  {s.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Wheelhouse Visualization ── */}
      <section className="py-20 border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase font-medium mb-3" style={{ color: GOLD }}>
              The Mobius Loop
            </p>
            <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: heading }}>
              The Wheelhouse
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              YOU are in the center. 6 Active Contributors fill your Wheelhouse.
              When it closes, another automatically opens — you receive again without any extra effort.
            </p>
          </div>

          {/* Wheelhouse pair */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 mb-12">
            <WheelhouseSVG
              label="Closed Wheelhouse"
              positions={["$", "1", "2", "3", "4", "5", "6"]}
              borderColor={BLUE}
            />
            <div className="flex flex-col items-center gap-2">
              <RefreshCw size={28} className="animate-spin" style={{ animationDuration: "4s", color: GOLD }} />
              <p className="text-xs tracking-widest uppercase text-white/40">Auto Re-Entry</p>
            </div>
            <WheelhouseSVG
              label="Open Wheelhouse"
              positions={["YOU", "1", "2", null, null, null, null]}
              borderColor={GREEN}
            />
          </div>

          {/* Explanation cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            <div className="p-5 rounded-xl border border-white/10 bg-white/[0.03]">
              <p className="text-sm font-semibold text-white mb-2">Wheelhouse Fills</p>
              <p className="text-white/50 text-sm leading-relaxed">
                Your 2 friends each invite 2 friends. That completes your Wheelhouse — you've received 6 contributions totalling 300% of your initial contribution.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-white/10 bg-white/[0.03]">
              <p className="text-sm font-semibold text-white mb-2">Automatic Re-Entry</p>
              <p className="text-white/50 text-sm leading-relaxed">
                Your Wheelhouse closes and you are automatically re-entered into an open Wheelhouse to receive again — without any extra effort!
              </p>
            </div>
            <div className="p-5 rounded-xl border border-white/10 bg-white/[0.03]">
              <p className="text-sm font-semibold text-white mb-2">Your Team Follows You</p>
              <p className="text-white/50 text-sm leading-relaxed">
                They follow you, giving you more contributions. When their friends complete their Wheelhouses, they follow them — and you receive even more.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-white/10 bg-white/[0.03]">
              <p className="text-sm font-semibold text-white mb-2">The Cycle Repeats</p>
              <p className="text-white/50 text-sm leading-relaxed">
                That completes another Wheelhouse — and guess what happens next? Another one opens. The Mobius Loop never stops.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mobius Loop Stacking ── */}
      <section className="py-20 border-t border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,hsl(224_85%_58%/0.04)_0%,transparent_70%)]" />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase font-medium mb-3" style={{ color: BLUE }}>
              World Famous
            </p>
            <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: heading }}>
              When One Completes, Another Opens
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              The Mobius Loop means your Wheelhouses stack. As your team grows, new Wheelhouses open automatically. You can receive contributions multiple times a day.
            </p>
          </div>

          {/* Stacking Wheelhouses visual */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
            <WheelhouseSVG
              label="Cycle 1"
              positions={["YOU", "1", "2", "3", "4", "5", "6"]}
              borderColor={BLUE}
              size="sm"
            />
            <ArrowRight size={24} className="text-white/30 hidden md:block" />
            <WheelhouseSVG
              label="Cycle 2"
              positions={["YOU", "7", "8", "9", "10", null, null]}
              borderColor={GREEN}
              size="sm"
            />
            <ArrowRight size={24} className="text-white/30 hidden md:block" />
            <WheelhouseSVG
              label="Cycle 3"
              positions={["YOU", null, null, null, null, null, null]}
              borderColor={GOLD}
              size="sm"
            />
            <ArrowRight size={24} className="text-white/30 hidden md:block" />
            <div className="flex flex-col items-center gap-2">
              <Infinity size={40} style={{ color: GOLD }} />
              <p className="text-xs tracking-widest uppercase text-white/40">∞ Cycles</p>
            </div>
          </div>

          {/* Highlight callout */}
          <div className="max-w-2xl mx-auto text-center p-8 rounded-2xl border border-white/10 bg-white/[0.03]">
            <p className="text-sm tracking-[0.3em] uppercase font-medium mb-4" style={{ color: GOLD }}>
              Here's the Best Part
            </p>
            <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: heading }}>
              Invite as Many Friends as You Like
            </h3>
            <p className="text-white/50 leading-relaxed">
              You will always receive half of every contribution. The more friends invite friends, the more contributions flow to you — over and over again.
            </p>
          </div>
        </div>
      </section>

      {/* ── Key Features ── */}
      <section className="py-16 border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase font-medium mb-3" style={{ color: GOLD }}>
              Why It Works
            </p>
            <h2 className="text-3xl md:text-5xl font-bold" style={{ fontFamily: heading }}>
              Built for Everyone
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-xl border border-white/10 bg-white/[0.03]">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${f.color}20` }}>
                  <f.icon size={20} style={{ color: f.color }} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">{f.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3 Systems ── */}
      <section className="py-16 border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase font-medium mb-3" style={{ color: GOLD }}>
              3 Cooperative Systems
            </p>
            <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: heading }}>
              Get In Where You Fit In
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              One time out of pocket. Your ultimate goal is to be active on all 3 Income Centers simultaneously.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { name: "5050 Fast", color: BLUE, desc: "Start quickly with accessible entry levels. Build momentum and learn the system.", link: "/how-it-works" },
              { name: "5050 Core", color: GREEN, desc: "Strengthen your position with mid-range contributions. Grow your team and your returns.", link: "/how-it-works" },
              { name: "5050 Max", color: GOLD, desc: "Maximize your potential with premium-level contributions. Designed for serious participants.", link: "/how-it-works" },
            ].map((sys, i) => (
              <div
                key={i}
                className="rounded-xl p-6 border-2 text-center transition-all duration-300 hover:scale-[1.02] bg-white/[0.03]"
                style={{ borderColor: sys.color }}
              >
                <p className="text-xl font-bold mb-3" style={{ color: sys.color, fontFamily: heading }}>
                  {sys.name}
                </p>
                <p className="text-white/50 text-sm leading-relaxed mb-5">{sys.desc}</p>
                <Link
                  to={sys.link}
                  className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase transition-colors"
                  style={{ color: sys.color }}
                >
                  Learn More <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 border-t border-white/10">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="text-sm tracking-[0.3em] uppercase font-medium mb-4" style={{ color: GOLD }}>
            100% Instant Payout · 50/50 · 300% Per Cycle
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: heading }}>
            Money for Everything!
          </h2>
          <p className="text-white/50 mb-8">
            The system is live and waiting for you. Join thousands who are already receiving — over and over again.
          </p>
          <Link
            to="/#join"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-sm font-bold tracking-widest uppercase text-sm btn-gold"
          >
            Join Us Now <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksLife;
