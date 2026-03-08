import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";
import { TwoRingWheelhouse, MobiusLoopVisual, MultiCycleWheelhouse } from "@/components/WheelhouseAnimations";
import logoMain from "@/assets/logo-5050-main.svg";
import heroPerson1 from "@/assets/hero-person-1.jpg";
import heroPerson2 from "@/assets/hero-person-2.jpg";
import heroPerson3 from "@/assets/hero-person-3.jpg";
import classyAsianWoman from "@/assets/classy-asian-woman.jpg";

const GOLD = "hsl(39 55% 52%)";
const heading = "'Cormorant Garamond', Georgia, serif";

const steps = [
  {
    number: "01",
    title: "Activate Your Seat",
    keyword: "Begin",
    desc: "Make a one-time contribution at the level that fits your budget. You're instantly placed inside a live Cooperative.",
  },
  {
    number: "02",
    title: "Bring 2 Partners",
    keyword: "Grow",
    desc: "Introduce just 2 people who activate at the same level. Their contributions flow directly to you and a teammate — 50/50.",
  },
  {
    number: "03",
    title: "Watch It Multiply",
    keyword: "Earn",
    desc: "Your 2 partners each bring 2 more. Six positions fill, your Cooperative closes, and a brand-new one opens automatically.",
  },
];

const automations = [
  "Automated Cooperative Placement",
  "Automated 50/50 Distribution",
  "Automated Re-Entry into New Cooperatives",
  "Automated Suspend & Reactivation",
  "Automated Real-Time Notifications",
  "Automated Full Transaction Ledger",
];

const HowItWorksLife = () => {
  return (
    <div className="min-h-screen bg-[hsl(0_0%_6%)] text-white">

      {/* Hero with 3 Images */}
      <section className="pt-20 pb-4 relative overflow-hidden">
        <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 bg-[hsl(0_0%_6%)] border-b border-white/10">
          <Link to="/">
            <img src={logoMain} alt="5050L logo" className="w-auto" style={{ height: "54px" }} />
          </Link>
          <nav className="flex items-center gap-4">
            <Link to="/" className="text-sm font-medium underline text-white/70 hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/#join" className="text-sm font-medium underline text-white/70 hover:text-white transition-colors">
              Join Now
            </Link>
            <Link to="/login" className="text-sm font-medium underline text-white/70 hover:text-white transition-colors">
              Log In
            </Link>
          </nav>
        </div>
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-1 rounded-xl overflow-hidden mb-8 max-h-[280px] md:max-h-[320px]">
            <img src={heroPerson1} alt="Woman relaxing in hammock" className="w-full h-full object-cover" />
            <img src={heroPerson2} alt="Man flying first class" className="w-full h-full object-cover" />
            <img src={heroPerson3} alt="Friends celebrating" className="w-full h-full object-cover" />
          </div>

          {/* Text */}
          <div className="text-center">
            <p className="text-base tracking-[0.3em] uppercase font-medium mb-6" style={{ color: GOLD }}>Cooperative Crowdfunding</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              The Simplest Path to Real Income
            </h1>
            <p className="text-white/60 text-base leading-relaxed max-w-2xl mx-auto mb-4">
              No selling. No recruiting quotas. No complicated funnels. Just a transparent, member-driven system where everyone who completes 3 doable steps earns.
            </p>
            <div className="flex items-center justify-center gap-6 mb-8">
              <p className="text-white/50 text-lg md:text-xl italic font-bold">Financial Freedom Starts Here</p>
              <Link
                to="/#join"
                className="inline-flex items-center px-4 pt-2.5 pb-2 rounded-sm font-bold tracking-widest uppercase text-[11px] transition-all duration-300 hover:scale-105 text-background -translate-y-px"
                style={{ background: `linear-gradient(180deg, ${GOLD}, hsl(39 55% 42%))` }}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 50/50 Promise */}
      <section className="pt-14 md:pt-20 pb-6 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Every Dollar Goes to Members…
            </h2>
            <h2 className="text-3xl md:text-4xl font-bold italic mb-6" style={{ color: GOLD }}>Zero middlemen. Zero fees.</h2>
            <div className="rounded-xl overflow-hidden border border-white/10">
              <div className="flex">
                <div className="flex-1 p-6 text-center bg-white/[0.03]">
                  <p className="text-4xl font-bold" style={{ color: GOLD }}>50%</p>
                  <p className="text-white/50 text-sm mt-2">Instantly to <span className="text-white font-medium">YOU</span></p>
                </div>
                <div className="w-px bg-white/10" />
                <div className="flex-1 p-6 text-center bg-white/[0.03]">
                  <p className="text-4xl font-bold" style={{ color: "hsl(160 80% 42%)" }}>50%</p>
                  <p className="text-white/50 text-sm mt-2">Instantly to <span className="text-white font-medium">Your Teammate</span></p>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden max-w-sm mx-auto">
            <img src={classyAsianWoman} alt="Woman celebrating earnings on phone" className="w-full h-auto object-cover rounded-xl" />
          </div>
        </div>
      </section>

      {/* 3 Steps */}
      <section className="py-14 border-y border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-white/50 text-sm tracking-[0.3em] uppercase font-medium mb-3">Simple. Affordable. Life-Changing.</p>
            <h2 className="text-3xl md:text-4xl font-bold">
              Three Steps. That's It.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-white/10 to-transparent z-10" />
                )}
                <div className="rounded-xl p-6 bg-white/[0.03] border border-white/10">
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="text-5xl font-bold text-white/10">{step.number}</span>
                    <span className="text-5xl font-bold uppercase" style={{ color: GOLD }}>{step.keyword}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-white">{step.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cooperative Wheelhouse */}
      <section className="py-24 relative overflow-hidden border-y border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,hsl(39_55%_52%/0.06)_0%,transparent_70%)]" />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="text-center mb-10">
            <p className="text-white/50 text-xs tracking-[0.35em] uppercase font-medium mb-2">2 × 2</p>
            <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: heading }}>
              Inside the Cooperative
            </h2>
            <div className="w-16 h-[1px] mx-auto mb-12" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />
          </div>
          <TwoRingWheelhouse />
        </div>
      </section>

      {/* Mobius Loop */}
      <section className="pt-14 pb-6">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-white/50 text-sm tracking-[0.3em] uppercase font-medium mb-3">The Infinite Engine</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              One Closes. Another Opens Instantly.
            </h2>
          </div>
          <div className="mb-14">
            <MultiCycleWheelhouse />
          </div>
          <MobiusLoopVisual />
        </div>
      </section>

      {/* Everything Automated */}
      <section className="py-14 max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <p className="text-white/50 text-sm tracking-[0.3em] uppercase font-medium mb-3">Powered by Technology</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Completely Hands-Free
          </h2>
          <p className="text-white/40 text-base italic">You Invite. The System Does the Rest.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
          {automations.map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-4 rounded-lg bg-white/[0.03] border border-white/10">
              <CheckCircle size={16} style={{ color: "hsl(160 80% 42%)" }} className="flex-shrink-0" />
              <span className="text-white text-sm">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Income Levels + Final CTA */}
      <section className="py-14 border-y border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-4">
            <p className="text-white/50 text-sm tracking-[0.3em] uppercase font-medium mb-3">100% Instant Payout · 50/50 · 300% Per Cycle</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Level</h2>
            <p className="text-white/50 max-w-xl mx-auto text-sm">
              Start where you're comfortable. Your ultimate goal: be active on all 3 Income Centers at the same time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {[
              {
                name: "5050 Fast", color: "hsl(224 85% 58%)",
                vaults: [
                  { contribution: "$25", payout: "$75", per: "6 × $12.50" },
                  { contribution: "$50", payout: "$150", per: "6 × $25" },
                  { contribution: "$100", payout: "$300", per: "6 × $50" },
                ],
                total: "$525",
              },
              {
                name: "5050 Core", color: "hsl(160 80% 42%)",
                vaults: [
                  { contribution: "$250", payout: "$750", per: "6 × $125" },
                  { contribution: "$500", payout: "$1,500", per: "6 × $250" },
                  { contribution: "$1,000", payout: "$3,000", per: "6 × $500" },
                ],
                total: "$5,250",
              },
              {
                name: "5050 Max", color: GOLD,
                vaults: [
                  { contribution: "$2,500", payout: "$7,500", per: "6 × $1,250" },
                  { contribution: "$5,000", payout: "$15,000", per: "6 × $2,500" },
                  { contribution: "$10,000", payout: "$30,000", per: "6 × $5,000" },
                ],
                total: "$52,500",
              },
            ].map((level, li) => (
              <div key={li} className="rounded-xl border-2 p-3 md:p-4 bg-white/[0.03]" style={{ borderColor: level.color }}>
                <div className="relative mb-3">
                  <h3 className="text-xl font-bold text-center" style={{ color: level.color }}>{level.name}</h3>
                </div>
                <div className="grid grid-cols-3 gap-1.5 mb-4">
                  {level.vaults.map((v, i) => (
                    <div key={i} className="p-1.5 rounded-lg border border-white/10 bg-white/[0.03] flex flex-col items-center justify-center">
                      <p className="text-xs font-semibold truncate w-full text-center" style={{ color: level.color }}>{v.contribution}</p>
                      <p className="text-[9px] text-white/40 mb-0.5">Cooperative</p>
                      <p className="text-sm md:text-base font-bold text-white truncate w-full text-center">{v.payout}</p>
                      <p className="text-[9px] text-white/40">Over and Over</p>
                      <p className="text-[9px] text-white/30 mt-0.5 truncate w-full text-center">{v.per}</p>
                    </div>
                  ))}
                </div>
                <p className="text-center">
                  <span className="text-xs text-white/50 mr-1">Receive</span>
                  <span className="text-xl font-bold" style={{ color: level.color }}>{level.total}</span>
                  <span className="text-xs font-normal text-white/50 ml-1">Each Cycle</span>
                </p>
              </div>
            ))}
          </div>

          {/* Final CTA */}
          <div className="text-center mt-14">
            <h3 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: GOLD }}>
              Receive From Hundreds — Even Thousands — of Cooperatives
            </h3>
            <p className="text-lg font-bold text-white mb-8">
              That's not a dream. That's the system.
            </p>
            <Link
              to="/#join"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-sm font-bold tracking-widest uppercase text-sm transition-all duration-300 hover:scale-105"
              style={{ background: `linear-gradient(180deg, ${GOLD}, hsl(39 55% 42%))`, color: "hsl(0 0% 6%)" }}
            >
              Join the Cooperative <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HowItWorksLife;
