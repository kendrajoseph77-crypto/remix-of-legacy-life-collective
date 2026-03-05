import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";
import { TwoRingWheelhouse, MobiusLoopVisual } from "@/components/WheelhouseAnimations";
import logoF from "@/assets/logo-5050-f.svg";
import logoC from "@/assets/logo-5050-c.svg";
import logoM from "@/assets/logo-5050-m.svg";

const steps = [
  {
    number: "01",
    title: "Register & Activate",
    desc: "Register and become an Active Contributor by making a contribution at your chosen level.",
  },
  {
    number: "02",
    title: "Invite 2 Members",
    desc: "You help 2 or more people become Active Contributors and join the wheelhouse.",
  },
  {
    number: "03",
    title: "Your Team Grows",
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
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-12 relative overflow-hidden">
        {/* Layered ambient glows */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,hsl(39_55%_52%/0.13)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_0%,hsl(39_55%_52%/0.08)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_30%_30%_at_50%_10%,hsl(39_55%_52%/0.06)_0%,transparent_50%)]" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <p className="text-sm tracking-[0.3em] uppercase font-medium mb-3" style={{ color: "hsl(41 50% 65%)" }}>Cooperative Crowdfunding</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            How Coop5050 Works
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed max-w-2xl mx-auto mb-4">
            Coop5050 is our high-impact Cooperative Crowdfunding System built for speed. Rapid participation cycles create instant income opportunities capable of generating significant short and mid-term income to meet your immediate financial needs.
          </p>
          <p className="text-muted-foreground text-sm italic mb-8">Money for Everything!</p>
          <Link
            to="/#join"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-sm font-bold tracking-widest uppercase text-sm transition-all duration-300 hover:scale-105 bg-primary text-primary-foreground"
          >
            Join Us Now <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Core Concept */}
      <section className="py-14 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase font-medium mb-3">The 50/50 Promise</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-5">
              Your Contribution Is Split 50/50
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Coop5050™ is transparent, fully automated, and cannot be manipulated.
              There is no middleman. You immediately receive all your money.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <span className="text-foreground font-semibold">50%</span> Instant Payout to you.{" "}
              <span className="text-foreground font-semibold">50%</span> Instant Payout to a teammate.
              Together, we each do a little so all can receive a lot.
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
              <p className="text-muted-foreground text-xs tracking-widest uppercase">100% Instant Payout · 300% Each Completed Cooperative</p>
            </div>
          </div>
        </div>
      </section>

      {/* Receive 50% from Each Position — 300% Per Cycle */}
      <section className="py-14 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase font-medium mb-3">Receive 50% from Each Position</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Earn <span style={{ color: "hsl(41 50% 65%)" }}>300%</span> Each Cycle
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
              6 Active Contributors fill your Wheelhouse. You receive 50% from each position — that's 300% of your original contribution, every single cycle.
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-border bg-muted/30">
              <p className="text-sm">
                <span className="font-bold text-foreground">6 × 50%</span>
                <span className="text-muted-foreground mx-2">=</span>
                <span className="font-bold" style={{ color: "hsl(41 50% 65%)" }}>300% Return Per Cycle</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Steps */}
      <section className="py-14 max-w-6xl mx-auto px-6">
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
              <div className="rounded-xl p-6 bg-card border border-border">
                <div className="text-5xl font-bold mb-3 text-muted-foreground/30">
                  {step.number}
                </div>
                <h3 className="text-lg font-bold mb-2 text-foreground">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Wheelhouse Visualization */}
      <section className="py-14 bg-card border-y border-border">
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
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,hsl(39_55%_52%/0.06)_0%,transparent_70%)]" />

        <div className="max-w-3xl mx-auto px-6 relative z-10 text-center">
          <p className="text-muted-foreground text-xs tracking-[0.35em] uppercase font-medium mb-2">The Mobius Loop</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 whitespace-nowrap" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
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

      {/* Income Levels — Full Dollar Breakdowns */}
      <section className="py-14 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-4">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase font-medium mb-3">100% Instant Payout 50/50 — 300% Per Cycle</p>
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
                  { contribution: "$150", payout: "$450", per: "6 × $75" },
                ],
                total: "$675",
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
              <div key={li} className="rounded-xl border-2 p-4 md:p-5 text-center bg-background" style={{ borderColor: level.color }}>
                <img src={level.logo} alt={`${level.name} logo`} className="w-auto mx-auto mb-3" style={{ height: "60px" }} />
                <h3 className="text-2xl font-bold mb-4" style={{ color: level.color }}>{level.name}</h3>
                <div className="grid grid-cols-3 gap-2 mb-6">
                  {level.vaults.map((v, i) => (
                    <div key={i} className="p-2 rounded-lg border border-border bg-muted/20 flex flex-col items-center justify-center">
                      <p className="text-xs font-semibold truncate w-full" style={{ color: "hsl(41 50% 65%)" }}>{v.contribution}</p>
                      <p className="text-[9px] text-muted-foreground mb-1">Cooperative</p>
                      <p className="text-base md:text-lg font-bold text-foreground truncate w-full">{v.payout}</p>
                      <p className="text-[9px] text-muted-foreground">Over and Over</p>
                      <p className="text-[9px] text-muted-foreground/50 mt-0.5 truncate w-full">{v.per}</p>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">Receive</p>
                <p className="text-2xl font-bold" style={{ color: "hsl(41 50% 65%)" }}>{level.total} <span className="text-sm font-normal text-muted-foreground">Each Cycle</span></p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/#join"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-sm font-bold tracking-widest uppercase text-sm transition-all duration-300 hover:scale-105 bg-primary text-primary-foreground"
            >
              Start Receiving Today <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Earn from 100s or 1000s */}
      <section className="py-14 max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "hsl(41 50% 65%)" }}>
          Earn From 100's or Even 1,000's of Cooperatives
        </h2>
        <p className="text-2xl font-bold text-foreground">
          Would That Change Your Life?
        </p>
      </section>

      {/* Final CTA */}
      <section className="py-14 bg-card border-t border-border">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="text-muted-foreground text-sm mb-2">100% Instant Payout · 50/50 · 300% Per Cycle</p>
          <h2 className="text-foreground font-bold text-2xl md:text-3xl mb-3">Money for Everything!</h2>
          <p className="text-muted-foreground text-sm mb-8">The system is live and waiting for you. Join thousands who are already receiving — over and over again.</p>
          <Link
            to="/#join"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-sm font-bold tracking-widest uppercase text-sm transition-all duration-300 hover:scale-105 bg-primary text-primary-foreground"
          >
            Join Us & Start Receiving <ArrowRight size={16} />
          </Link>
        </div>
      </section>

    </div>
  );
};

export default HowItWorks;
