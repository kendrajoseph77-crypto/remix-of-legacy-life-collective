import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";
import { TwoRingWheelhouse, MobiusLoopVisual, MultiCycleWheelhouse } from "@/components/WheelhouseAnimations";
import logoC from "@/assets/logo-5050-c.svg";
import heroPerson1 from "@/assets/hero-person-1.jpg";
import heroPerson2 from "@/assets/hero-person-2.jpg";
import heroPerson3 from "@/assets/hero-person-3.jpg";
import classyAsianWoman from "@/assets/classy-asian-woman.jpg";

const GREEN = "hsl(160 80% 42%)";

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

const coreLevel = {
  name: "5050 Core",
  color: GREEN,
  logo: logoC,
  vaults: [
    { contribution: "$250", payout: "$750", per: "6 × $125" },
    { contribution: "$500", payout: "$1,500", per: "6 × $250" },
    { contribution: "$1,000", payout: "$3,000", per: "6 × $500" },
  ],
  total: "$5,250",
};

const HowItWorksCore = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="pt-20 pb-4 relative overflow-hidden">
        <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between pl-2 pr-6 py-1 bg-white">
          <Link to="/">
            <img src={logoC} alt="5050 Core logo" className="w-auto" style={{ height: "54px" }} />
          </Link>
          <nav className="flex items-center gap-4">
            <Link to="/" className="text-sm font-medium underline text-black/70 hover:text-black transition-colors">
              Home
            </Link>
            <Link to="/#join" className="text-sm font-medium underline text-black/70 hover:text-black transition-colors">
              Join Now
            </Link>
            <Link to="/login" className="text-sm font-medium underline text-black/70 hover:text-black transition-colors">
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
            <p className="text-base tracking-[0.3em] uppercase font-medium mb-6" style={{ color: GREEN }}>Cooperative Crowdfunding</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">5050 Core Works...</h1>
            <p className="text-muted-foreground text-base leading-relaxed max-w-2xl mx-auto mb-4">
              for 100% of the people, 100% of the time, who complete the 3 simple, doable steps.
            </p>
            <div className="flex items-center justify-center gap-6 mb-8">
              <p className="text-muted-foreground text-lg md:text-xl italic font-bold">Money for Everything!</p>
              <Link
                to="/#join"
                className="inline-flex items-center px-4 pt-2.5 pb-2 rounded-sm font-bold tracking-widest uppercase text-[11px] transition-all duration-300 hover:scale-105 text-white -translate-y-px"
                style={{ background: `linear-gradient(180deg, ${GREEN}, hsl(160 80% 30%))` }}
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
            <h2 className="text-3xl md:text-4xl font-bold italic mb-6 text-foreground">Our members!</h2>
            <div className="rounded-xl overflow-hidden border border-border">
              <div className="flex">
                <div className="flex-1 p-6 text-center bg-muted/20">
                  <p className="text-4xl font-bold" style={{ color: GREEN }}>50%</p>
                  <p className="text-muted-foreground text-sm mt-2">Instant Payout to <span className="text-foreground font-medium">YOU</span></p>
                </div>
                <div className="w-px bg-border" />
                <div className="flex-1 p-6 text-center bg-muted/20">
                  <p className="text-4xl font-bold" style={{ color: GREEN }}>50%</p>
                  <p className="text-muted-foreground text-sm mt-2">Instant Payout to <span className="text-foreground font-medium">Teammate</span></p>
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
      <section className="py-14 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase font-medium mb-3">Affordable. Understandable. Rewarding.</p>
            <h2 className="text-3xl md:text-4xl font-bold">Just 3 Simple Steps</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-border to-transparent z-10" />
                )}
                <div className="rounded-xl p-6 bg-background border border-border">
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="text-5xl font-bold text-muted-foreground/30">{step.number}</span>
                    <span className="text-5xl font-bold uppercase" style={{ color: GREEN }}>{step.keyword}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-foreground">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobius Loop */}
      <section className="py-24 relative overflow-hidden bg-card border-y border-border">
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 60% 50% at 50% 40%, hsl(160 80% 42% / 0.06) 0%, transparent 70%)` }} />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="text-center mb-10">
            <p className="text-muted-foreground text-xs tracking-[0.35em] uppercase font-medium mb-2">2 x 2</p>
            <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>The Cooperative</h2>
            <div className="w-16 h-[1px] mx-auto mb-12" style={{ background: `linear-gradient(90deg, transparent, ${GREEN}, transparent)` }} />
          </div>
          <TwoRingWheelhouse />
        </div>
      </section>

      {/* Cooperative Visualization */}
      <section className="pt-14 pb-6">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase font-medium mb-3">World Famous Mobius Loop</p>
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
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase font-medium mb-3">Technology</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Everything Is Automated</h2>
          <p className="text-muted-foreground text-base italic">You Invite. We Ignite.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
          {automations.map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border">
              <CheckCircle size={16} style={{ color: GREEN }} className="flex-shrink-0" />
              <span className="text-foreground text-sm">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Income Level + Final CTA */}
      <section className="py-14 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-4">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase font-medium mb-3">100% Instant Payout · 50/50 · 300% Per Cycle</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Where You Fit In</h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm">
              One time out of pocket. Your ultimate goal is to be active on all 3 Income Centers simultaneously.
            </p>
          </div>

          <div className="flex justify-center mt-10">
            <div className="rounded-xl border-2 p-5 md:p-6 bg-background max-w-md w-full" style={{ borderColor: coreLevel.color }}>
              <div className="relative mb-4">
                <img src={coreLevel.logo} alt={`${coreLevel.name} logo`} className="absolute -left-2 -top-2 w-auto opacity-15" style={{ height: "120px" }} />
                <h3 className="text-xl font-bold text-center relative z-10" style={{ color: coreLevel.color }}>{coreLevel.name}</h3>
              </div>
              <div className="grid grid-cols-3 gap-1.5 mb-4">
                {coreLevel.vaults.map((v, i) => (
                  <div key={i} className="p-1.5 rounded-lg border border-border bg-muted/20 flex flex-col items-center justify-center">
                    <p className="text-xs font-semibold truncate w-full text-center" style={{ color: coreLevel.color }}>{v.contribution}</p>
                    <p className="text-[9px] text-muted-foreground mb-0.5">Cooperative</p>
                    <p className="text-sm md:text-base font-bold text-foreground truncate w-full text-center">{v.payout}</p>
                    <p className="text-[9px] text-muted-foreground">Over and Over</p>
                    <p className="text-[9px] text-muted-foreground/50 mt-0.5 truncate w-full text-center">{v.per}</p>
                  </div>
                ))}
              </div>
              <p className="text-center">
                <span className="text-xs text-muted-foreground mr-1">Receive</span>
                <span className="text-xl font-bold" style={{ color: coreLevel.color }}>{coreLevel.total}</span>
                <span className="text-xs font-normal text-muted-foreground ml-1">Each Cycle</span>
              </p>
            </div>
          </div>

          <div className="text-center mt-14">
            <h3 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: GREEN }}>
              Earn From 100's or Even 1,000's of Cooperatives
            </h3>
            <p className="text-lg font-bold text-foreground mb-8">Wouldn't that change your life!</p>
            <Link
              to="/#join"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-sm font-bold tracking-widest uppercase text-sm transition-all duration-300 hover:scale-105 text-white"
              style={{ background: GREEN }}
            >
              Join Us & Get Busy With It! <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksCore;
