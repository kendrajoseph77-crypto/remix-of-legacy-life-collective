import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";
import { TwoRingWheelhouse, MobiusLoopVisual, MultiCycleWheelhouse } from "@/components/WheelhouseAnimations";
import logoM from "@/assets/logo-5050-m.svg";
import heroPerson1 from "@/assets/hero-person-1.jpg";
import heroPerson2 from "@/assets/hero-person-2.jpg";
import heroPerson3 from "@/assets/hero-person-3.jpg";
import classyAsianWoman from "@/assets/classy-asian-woman.jpg";

const GOLD = "hsl(39 55% 52%)";
const heading = "'Cormorant Garamond', Georgia, serif";

const steps = [
  {
    number: "01",
    title: "Register & Activate",
    keyword: "Become",
    desc: "Make a contribution at your chosen level to become an Active Contributor.",
  },
  {
    number: "02",
    title: "Invite 2 Members",
    keyword: "Build",
    desc: "Help 2 or more people become Active Contributors and join the cooperative.",
  },
  {
    number: "03",
    title: "Your Team Grows",
    keyword: "Bond",
    desc: "Your 2 each help 2 or more, and the cycle of giving and receiving continues.",
  },
];

const automations = [
  "Automated Positioning",
  "Automated Sending & Receiving",
  "Automated Re-Entry",
  "Automated Suspend & Un-Suspend",
  "Automated Email Notifications",
  "Automatic Transaction History",
];

const maxLevel = {
  name: "5050 Max",
  color: GOLD,
  logo: logoM,
  vaults: [
    { contribution: "$2,500", payout: "$7,500", per: "6 × $1,250" },
    { contribution: "$5,000", payout: "$15,000", per: "6 × $2,500" },
    { contribution: "$10,000", payout: "$30,000", per: "6 × $5,000" },
  ],
  total: "$52,500",
};

const HowItWorksMax = () => {
  return (
    <div className="min-h-screen bg-[hsl(0_0%_6%)] text-white">

      {/* Hero with 3 Images */}
      <section className="pt-20 pb-4 relative overflow-hidden">
        <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 bg-[hsl(0_0%_6%)] border-b border-white/10">
          <Link to="/">
            <img src={logoM} alt="5050 Max logo" className="w-auto" style={{ height: "54px" }} />
          </Link>
          <nav className="flex items-center gap-4">
            <Link to="/" className="text-sm font-medium underline text-white/70 hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/register/max" className="text-sm font-medium underline text-white/70 hover:text-white transition-colors">
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

          <div className="text-center">
            <p className="text-base tracking-[0.3em] uppercase font-medium mb-6" style={{ color: GOLD }}>Cooperative Crowdfunding</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">5050 Max Works...</h1>
            <p className="text-white/60 text-base leading-relaxed max-w-2xl mx-auto mb-4">
              for 100% of the people, 100% of the time, who complete the 3 simple, doable steps.
            </p>
            <div className="flex items-center justify-center gap-6 mb-8">
              <p className="text-white/50 text-lg md:text-xl italic font-bold">Money for Everything!</p>
              <Link
                to="/register/max"
                className="inline-flex items-center px-4 pt-2.5 pb-2 rounded-sm font-bold tracking-widest uppercase text-[11px] transition-all duration-300 hover:scale-105 text-background -translate-y-px"
                style={{ background: `linear-gradient(180deg, ${GOLD}, hsl(39 55% 42%))` }}
              >
                Join Us Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 50/50 Promise */}
      <section className="pt-14 md:pt-20 pb-6 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">100% Instantly Goes to You…</h2>
            <h2 className="text-3xl md:text-4xl font-bold italic mb-6" style={{ color: GOLD }}>Our members!</h2>
            <div className="rounded-xl overflow-hidden border border-white/10">
              <div className="flex">
                <div className="flex-1 p-6 text-center bg-white/[0.03]">
                  <p className="text-4xl font-bold" style={{ color: GOLD }}>50%</p>
                  <p className="text-white/50 text-sm mt-2">Instant Payout to <span className="text-white font-medium">YOU</span></p>
                </div>
                <div className="w-px bg-white/10" />
                <div className="flex-1 p-6 text-center bg-white/[0.03]">
                  <p className="text-4xl font-bold" style={{ color: GOLD }}>50%</p>
                  <p className="text-white/50 text-sm mt-2">Instant Payout to <span className="text-white font-medium">Teammate</span></p>
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
            <p className="text-white/50 text-sm tracking-[0.3em] uppercase font-medium mb-3">Affordable. Understandable. Rewarding.</p>
            <h2 className="text-3xl md:text-4xl font-bold">Just 3 Simple Steps</h2>
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
            <p className="text-white/50 text-xs tracking-[0.35em] uppercase font-medium mb-2">2 x 2</p>
            <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: heading }}>The Cooperative</h2>
            <div className="w-16 h-[1px] mx-auto mb-12" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />
          </div>
          <TwoRingWheelhouse />
        </div>
      </section>

      {/* Mobius Loop */}
      <section className="pt-14 pb-6">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-white/50 text-sm tracking-[0.3em] uppercase font-medium mb-3">World Famous Mobius Loop</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">When One Completes, Another One Opens</h2>
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
          <p className="text-white/50 text-sm tracking-[0.3em] uppercase font-medium mb-3">Technology</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Everything Is Automated</h2>
          <p className="text-white/40 text-base italic">You Invite. We Ignite.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
          {automations.map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-4 rounded-lg bg-white/[0.03] border border-white/10">
              <CheckCircle size={16} style={{ color: GOLD }} className="flex-shrink-0" />
              <span className="text-white text-sm">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Income Level + Final CTA */}
      <section className="py-14 border-y border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-4">
            <p className="text-white/50 text-sm tracking-[0.3em] uppercase font-medium mb-3">100% Instant Payout · 50/50 · 300% Per Cycle</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Where You Fit In</h2>
            <p className="text-white/50 max-w-xl mx-auto text-sm">
              One time out of pocket. Your ultimate goal is to be active on all 3 Income Centers simultaneously.
            </p>
          </div>

          <div className="flex justify-center mt-10">
            <div className="rounded-xl border-2 p-3 md:p-4 bg-white/[0.03] max-w-sm w-full" style={{ borderColor: maxLevel.color }}>
              <div className="relative mb-3">
                <img src={maxLevel.logo} alt={`${maxLevel.name} logo`} className="absolute left-0 top-1/2 -translate-y-1/2 w-auto" style={{ height: "48px" }} />
                <h3 className="text-xl font-bold text-center" style={{ color: maxLevel.color }}>{maxLevel.name}</h3>
              </div>
              <div className="grid grid-cols-3 gap-1.5 mb-4">
                {maxLevel.vaults.map((v, i) => (
                  <div key={i} className="p-1.5 rounded-lg border border-white/10 bg-white/[0.03] flex flex-col items-center justify-center">
                    <p className="text-xs font-semibold truncate w-full text-center" style={{ color: maxLevel.color }}>{v.contribution}</p>
                    <p className="text-[9px] text-white/40 mb-0.5">Cooperative</p>
                    <p className="text-sm md:text-base font-bold text-white truncate w-full text-center">{v.payout}</p>
                    <p className="text-[9px] text-white/40">Over and Over</p>
                    <p className="text-[9px] text-white/30 mt-0.5 truncate w-full text-center">{v.per}</p>
                  </div>
                ))}
              </div>
              <p className="text-center">
                <span className="text-xs text-white/50 mr-1">Receive</span>
                <span className="text-xl font-bold" style={{ color: maxLevel.color }}>{maxLevel.total}</span>
                <span className="text-xs font-normal text-white/50 ml-1">Each Cycle</span>
              </p>
            </div>
          </div>

          <div className="text-center mt-14">
            <h3 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: GOLD }}>
              Earn From 100's or Even 1,000's of Cooperatives
            </h3>
            <p className="text-lg font-bold text-white mb-8">Wouldn't that change your life!</p>
            <Link
              to="/register/max"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-sm font-bold tracking-widest uppercase text-sm transition-all duration-300 hover:scale-105"
              style={{ background: `linear-gradient(180deg, ${GOLD}, hsl(39 55% 42%))`, color: "hsl(0 0% 6%)" }}
            >
              Join Us & Get Busy With It! <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksMax;
