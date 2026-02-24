import Navbar from "@/components/Navbar";

import WheelhouseDiagram from "@/components/WheelhouseDiagram";
import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";

const tiers = [
  {
    name: "Builder",
    levels: "$25 · $50 · $100",
    receive: "$75 · $150 · $300",
  },
  {
    name: "Architect",
    levels: "$250 · $500 · $1,000",
    receive: "$750 · $1,500 · $3,000",
  },
  {
    name: "Visionary",
    levels: "$2,500 · $5,000 · $10,000",
    receive: "$7,500 · $15,000 · $30,000",
  },
];

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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,hsl(181_90%_52%/0.13)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_0%,hsl(181_90%_52%/0.08)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_30%_30%_at_50%_10%,hsl(181_90%_52%/0.06)_0%,transparent_50%)]" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <p className="text-aqua text-sm tracking-[0.3em] uppercase font-medium mb-3">Cooperative Crowdfunding</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            How Coop5050Life Works
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed max-w-2xl mx-auto mb-8">
            A 2×2 peer-to-peer crowdfunding platform where 100% of every contribution goes directly to you — the participants. No middlemen. No exceptions.
          </p>
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
              You Always Receive 50%
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Coop5050Life™ is transparent, fully automated, and cannot be manipulated.
              There is no middleman. You immediately receive all your money.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              You always receive <span className="text-foreground font-semibold">50%</span> of each contribution cycle —
              the other <span className="text-foreground font-semibold">50%</span> goes to a teammate.
              Together, we each do a little so all can receive a lot.
            </p>
          </div>
          <div className="rounded-xl overflow-hidden border border-border">
            <div className="flex">
              <div className="flex-1 p-6 text-center bg-muted/20">
                <p className="text-primary text-4xl font-bold">50%</p>
                <p className="text-muted-foreground text-sm mt-2">Goes to <span className="text-foreground font-medium">YOU</span></p>
              </div>
              <div className="w-px bg-border" />
              <div className="flex-1 p-6 text-center bg-muted/20">
                <p className="text-secondary text-4xl font-bold">50%</p>
                <p className="text-muted-foreground text-sm mt-2">Goes to your <span className="text-foreground font-medium">Teammate</span></p>
              </div>
            </div>
            <div className="p-4 bg-muted/30 text-center border-t border-border">
              <p className="text-muted-foreground text-xs tracking-widest uppercase">100% of every contribution — no middlemen</p>
            </div>
          </div>
        </div>
      </section>

      {/* Income Levels */}
      <section className="py-14 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase font-medium mb-3">Begin Where You Fit In</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The Income Center Levels</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
              Your ultimate goal is to be on all 3 Income Centers simultaneously.
              Cycling just once puts you on a path to exceptional returns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {tiers.map((tier, i) => (
              <div key={i} className="rounded-xl p-6 bg-background border border-border text-center relative transition-all duration-300 hover:border-muted-foreground/40">
                <p className="text-muted-foreground text-xs tracking-widest uppercase mb-2">{tier.name}</p>
                <p className="text-lg font-bold mb-1 text-foreground">{tier.levels}</p>
                <p className="text-muted-foreground text-sm mb-4">Entry Levels</p>
                <div className="border-t border-border pt-4 mb-4">
                  <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">You Receive</p>
                  <p className="text-lg font-bold text-foreground">{tier.receive}</p>
                  <p className="text-muted-foreground text-xs mt-1">per cycle</p>
                </div>
                <Link
                  to="/join"
                  className="block text-center py-3 rounded-sm text-xs font-bold tracking-widest uppercase transition-all duration-300 border border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary"
                >
                  Enter {tier.name}
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/join"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-sm font-bold tracking-widest uppercase text-sm transition-all duration-300 hover:scale-105 bg-primary text-primary-foreground"
            >
              Start Receiving Today <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 3 Steps */}
      <section className="py-14 max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase font-medium mb-3">Simple Process</p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Just 3 Simple Doable Steps
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

      {/* Wheelhouse */}
      <section className="py-14 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase font-medium mb-3">The Technology</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-5">
                The Mobius Loop Wheelhouse
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
                YOU are in the center. Your Inviter is in position #1, your Direct is in
                position #2, and the four people your team invites fill positions #3–#6.
                The 2×2 Wheelhouse holds 6 Active Contributors.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-5 text-sm">
                <span className="text-foreground font-semibold">You Never Lose Your Team!</span> Each time your Wheelhouse fills,
                another automatically re-opens — you receive another 6 contributions
                without additional effort or qualifications.
              </p>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/30 border border-border">
                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  <span className="text-foreground font-medium">You Follow Your Inviter.</span>{" "}
                  Your Team Always Follows You.
                </p>
              </div>
            </div>
            <WheelhouseDiagram />
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

      {/* Final CTA */}
      <section className="py-14 bg-card border-t border-border">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="text-muted-foreground text-sm mb-2">Use over 150 FIAT currencies and 100+ cryptocurrencies</p>
          <h2 className="text-foreground font-bold text-2xl md:text-3xl mb-3">Money for Everything!</h2>
          <p className="text-muted-foreground text-sm mb-8">Join thousands who are already receiving — the system is live and waiting for you.</p>
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
