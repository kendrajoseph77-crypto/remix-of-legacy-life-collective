import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";
import { TwoRingWheelhouse, MobiusLoopVisual } from "@/components/WheelhouseAnimations";
import logoF from "@/assets/logo-5050-f.svg";
import logoC from "@/assets/logo-5050-c.svg";
import logoM from "@/assets/logo-5050-m.svg";
import logoMain from "@/assets/logo-5050-main.svg";
import heroPerson1 from "@/assets/hero-person-1.jpg";
import heroPerson2 from "@/assets/hero-person-2.jpg";
import heroPerson3 from "@/assets/hero-person-3.jpg";


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
    desc: "Help 2 or more people become Active Contributors and join the wheelhouse.",
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

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar hideLogo />

      {/* Hero with 3 Images */}
      <section className="pt-20 pb-10 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-1 rounded-xl overflow-hidden mb-8 max-h-[280px] md:max-h-[320px]">
            <img src={heroPerson1} alt="Woman relaxing in hammock" className="w-full h-full object-cover" />
            <img src={heroPerson2} alt="Man flying first class" className="w-full h-full object-cover" />
            <img src={heroPerson3} alt="Friends celebrating" className="w-full h-full object-cover" />
          </div>

          {/* Logo + Text */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <img src={logoMain} alt="5050L logo" className="w-auto" style={{ height: "64px" }} />
              <p className="text-base tracking-[0.3em] uppercase font-medium" style={{ color: "hsl(41 50% 65%)" }}>Cooperative Crowdfunding</p>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              5050 Works...
            </h1>
            <p className="text-muted-foreground text-base leading-relaxed max-w-2xl mx-auto mb-4">
              For 100% of the people, 100% of the time, who complete the 3 simple, doable steps.
            </p>
            <div className="flex items-center justify-center gap-6 mb-8">
              <p className="text-muted-foreground text-lg md:text-xl italic font-bold">Money for Everything!</p>
              <Link
                to="/#join"
                className="inline-flex items-center px-4 pt-2.5 pb-2 rounded-sm font-bold tracking-widest uppercase text-[11px] transition-all duration-300 hover:scale-105 text-background -translate-y-px"
                style={{ background: "linear-gradient(180deg, hsl(39 55% 62%), hsl(39 55% 42%))" }}
              >
                Join Us Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 50/50 Promise */}
      <section className="py-14 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-5">
              100% Instantly Goes Back to You…
            </h2>
            <p className="text-lg font-semibold mb-4" style={{ color: "hsl(41 50% 65%)" }}>Our members!</p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Coop5050™ is transparent, fully automated, and cannot be manipulated.
              There is no middleman — you immediately receive all your money.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <span className="text-foreground font-semibold">50%</span> Instant Payout to you.{" "}
              <span className="text-foreground font-semibold">50%</span> Instant Payout to a teammate.
              6 members fill your Wheelhouse — that's <span className="font-semibold" style={{ color: "hsl(41 50% 65%)" }}>300% return</span> every cycle.
            </p>
          </div>
          <div className="rounded-xl overflow-hidden border border-border">
            <div className="flex">
              <div className="flex-1 p-6 text-center bg-muted/20">
                <p className="text-primary text-4xl font-bold">50%</p>
                <p className="text-muted-foreground text-sm mt-2">Instant Payout to <span className="text-foreground font-medium">YOU</span></p>
              </div>
              <div className="w-px bg-border" />
              <div className="flex-1 p-6 text-center bg-muted/20">
                <p className="text-secondary text-4xl font-bold">50%</p>
                <p className="text-muted-foreground text-sm mt-2">Instant Payout to <span className="text-foreground font-medium">Teammate</span></p>
              </div>
            </div>
            <div className="p-4 bg-muted/30 text-center border-t border-border">
              <p className="text-muted-foreground text-xs tracking-widest uppercase">6 × 50% = 300% Per Cycle</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Steps */}
      <section className="py-14 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase font-medium mb-3">Simple Process</p>
            <h2 className="text-3xl md:text-4xl font-bold">
              Just 3 Simple Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-border to-transparent z-10" />
                )}
                <div className="rounded-xl p-6 bg-background border border-border">
                  <div className="text-5xl font-bold mb-1 text-muted-foreground/30">
                    {step.number}
                  </div>
                  <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: "hsl(41 50% 65%)" }}>{step.keyword}</p>
                  <h3 className="text-lg font-bold mb-2 text-foreground">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wheelhouse Visualization */}
      <section className="py-14">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase font-medium mb-3">Watch It In Action</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The Wheelhouse
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
              YOU are in the center. Your 2 direct invites form the inner circle.
              Their 2 invites each fill the outer circle — 6 members total.
            </p>
          </div>
          <TwoRingWheelhouse />
        </div>
      </section>

      {/* Mobius Loop */}
      <section className="py-24 relative overflow-hidden bg-card border-y border-border">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,hsl(39_55%_52%/0.06)_0%,transparent_70%)]" />

        <div className="max-w-3xl mx-auto px-6 relative z-10 text-center">
          <p className="text-muted-foreground text-xs tracking-[0.35em] uppercase font-medium mb-2">The Mobius Loop</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:whitespace-nowrap" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            When One Completes, Another Opens
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed mb-12">
            Each Wheelhouse fills, closes, and a new one opens — automatically. The cycle never ends.
          </p>

          <div className="w-16 h-[1px] mx-auto mb-12" style={{ background: "linear-gradient(90deg, transparent, hsl(39 55% 52%), transparent)" }} />

          <MobiusLoopVisual />

          <div className="max-w-xl mx-auto mt-16 p-8 rounded-2xl border border-border/60 bg-gradient-to-b from-muted/40 to-transparent">
            <h3 className="text-xl md:text-2xl font-bold mb-3" style={{ color: "hsl(41 50% 65%)", fontFamily: "'Cormorant Garamond', serif" }}>
              More Money — Not More Work!
            </h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Invite as many friends as you like. You will always receive half of every contribution. The more friends invite friends, the more contributions flow to you — over and over again.
            </p>
          </div>
        </div>
      </section>

      {/* Everything Automated */}
      <section className="py-14 max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase font-medium mb-3">Technology</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Everything Is Automated
          </h2>
          <p className="text-muted-foreground text-base italic">You Invite. We Ignite.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
          {automations.map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border">
              <CheckCircle size={16} className="text-secondary flex-shrink-0" />
              <span className="text-foreground text-sm">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Income Levels + Final CTA */}
      <section className="py-14 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-4">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase font-medium mb-3">100% Instant Payout · 50/50 · 300% Per Cycle</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Where You Fit In</h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm">
              One time out of pocket. Your ultimate goal is to be active on all 3 Income Centers simultaneously.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {[
              {
                name: "5050 Fast", color: "hsl(224 85% 58%)", logo: logoF,
                vaults: [
                  { contribution: "$25", payout: "$75", per: "6 × $12.50" },
                  { contribution: "$50", payout: "$150", per: "6 × $25" },
                  { contribution: "$100", payout: "$300", per: "6 × $50" },
                ],
                total: "$525",
              },
              {
                name: "5050 Core", color: "hsl(160 80% 42%)", logo: logoC,
                vaults: [
                  { contribution: "$250", payout: "$750", per: "6 × $125" },
                  { contribution: "$500", payout: "$1,500", per: "6 × $250" },
                  { contribution: "$1,000", payout: "$3,000", per: "6 × $500" },
                ],
                total: "$5,250",
              },
              {
                name: "5050 Max", color: "hsl(41 50% 65%)", logo: logoM,
                vaults: [
                  { contribution: "$2,500", payout: "$7,500", per: "6 × $1,250" },
                  { contribution: "$5,000", payout: "$15,000", per: "6 × $2,500" },
                  { contribution: "$10,000", payout: "$30,000", per: "6 × $5,000" },
                ],
                total: "$52,500",
              },
            ].map((level, li) => (
              <div key={li} className="rounded-xl border-2 p-3 md:p-4 bg-background" style={{ borderColor: level.color }}>
                <div className="relative mb-3">
                  <img src={level.logo} alt={`${level.name} logo`} className="absolute left-0 top-1/2 -translate-y-1/2 w-auto" style={{ height: "48px" }} />
                  <h3 className="text-xl font-bold text-center" style={{ color: level.color }}>{level.name}</h3>
                </div>
                <div className="grid grid-cols-3 gap-1.5 mb-4">
                  {level.vaults.map((v, i) => (
                    <div key={i} className="p-1.5 rounded-lg border border-border bg-muted/20 flex flex-col items-center justify-center">
                      <p className="text-xs font-semibold truncate w-full text-center" style={{ color: level.color }}>{v.contribution}</p>
                      <p className="text-[9px] text-muted-foreground mb-0.5">Cooperative</p>
                      <p className="text-sm md:text-base font-bold text-foreground truncate w-full text-center">{v.payout}</p>
                      <p className="text-[9px] text-muted-foreground">Over and Over</p>
                      <p className="text-[9px] text-muted-foreground/50 mt-0.5 truncate w-full text-center">{v.per}</p>
                    </div>
                  ))}
                </div>
                <p className="text-center">
                  <span className="text-xs text-muted-foreground mr-1">Receive</span>
                  <span className="text-xl font-bold" style={{ color: level.color }}>{level.total}</span>
                  <span className="text-xs font-normal text-muted-foreground ml-1">Each Cycle</span>
                </p>
              </div>
            ))}
          </div>

          {/* Merged closer + CTA */}
          <div className="text-center mt-14">
            <h3 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: "hsl(41 50% 65%)" }}>
              Earn From 100's or Even 1,000's of Cooperatives
            </h3>
            <p className="text-lg font-bold text-foreground mb-8">
              Would That Change Your Life?
            </p>
            <Link
              to="/#join"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-sm font-bold tracking-widest uppercase text-sm transition-all duration-300 hover:scale-105 bg-primary text-primary-foreground"
            >
              Join Us & Start Receiving <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HowItWorks;
