import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WheelhouseDiagram from "@/components/WheelhouseDiagram";
import { Link } from "react-router-dom";
import { CheckCircle, Zap, RefreshCw, Shield, TrendingUp, Globe } from "lucide-react";

const tiers = [
  {
    entry: "$5,000",
    receive: "$15,000",
    name: "Gold",
    colorClass: "tier-gold",
    textClass: "text-primary",
  },
  {
    entry: "$10,000",
    receive: "$30,000",
    name: "Platinum",
    colorClass: "tier-platinum",
    textClass: "text-secondary",
  },
  {
    entry: "$25,000",
    receive: "$75,000",
    name: "Diamond",
    colorClass: "tier-diamond",
    textClass: "text-accent",
  },
];

const steps = [
  {
    number: "01",
    title: "Register & Activate",
    desc: "Register and become an Active Donor by making a donation at your chosen level.",
  },
  {
    number: "02",
    title: "Invite 2 Members",
    desc: "You help 2 or more people become Active Donors and join the wheelhouse.",
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

const benefits = [
  { icon: TrendingUp, label: "One-Time Out-of-Pocket Entry" },
  { icon: Globe, label: "Global Fundraising Territory" },
  { icon: Zap, label: "Receive Donations Immediately" },
  { icon: RefreshCw, label: "Unlimited Re-Entry Cycles" },
  { icon: Shield, label: "Your Own Decentralized Wallet" },
  { icon: CheckCircle, label: "Real-Time Personal Dashboard" },
];

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 hero-glow relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(181_90%_52%/0.06)_0%,transparent_70%)]" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <p className="text-secondary text-sm tracking-[0.3em] uppercase font-medium mb-4">The System</p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            How <span style={{ color: "#14b8d4" }}>Coop5050</span><span style={{ color: "#14b8d4" }}>Life</span><br />Works
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
            Your success begins with the system. A great system produces great results.
            Coop5050Life™ is a 2×2 peer-to-peer crowdfunding platform where 100% of every
            royalty goes to you — the participants.
          </p>
        </div>
      </section>

      {/* Core Concept */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-primary text-sm tracking-[0.3em] uppercase font-medium mb-3">The 50/50 Promise</p>
            <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              You Always Receive <span className="lime-gradient">50%</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Coop5050Life™ is transparent, fully automated, and cannot be manipulated.
              There is no middleman. You immediately receive all your money to put towards
              any purpose you choose.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              You always receive <span className="text-foreground font-semibold">50%</span> of each donation cycle —
              the other <span className="text-foreground font-semibold">50%</span> goes to a teammate.
              Together, we each do a little so all can receive a lot.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {/* Visual 50/50 Split */}
            <div className="rounded-xl overflow-hidden border border-border card-glow">
              <div className="flex">
                <div className="flex-1 p-8 text-center" style={{ background: "linear-gradient(135deg, hsl(var(--coral) / 0.2), hsl(var(--coral) / 0.05))" }}>
                  <p className="text-primary text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>50%</p>
                  <p className="text-muted-foreground text-sm mt-2">Goes to <span className="text-foreground font-medium">YOU</span></p>
                </div>
                <div className="w-px bg-border" />
                <div className="flex-1 p-8 text-center" style={{ background: "linear-gradient(135deg, hsl(var(--aqua) / 0.15), hsl(var(--aqua) / 0.05))" }}>
                  <p className="text-secondary text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>50%</p>
                  <p className="text-muted-foreground text-sm mt-2">Goes to your <span className="text-foreground font-medium">Teammate</span></p>
                </div>
              </div>
              <div className="p-4 bg-muted/30 text-center">
                <p className="text-muted-foreground text-xs tracking-widest uppercase">100% of every donation — no middlemen</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Income Levels */}
      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-secondary text-sm tracking-[0.3em] uppercase font-medium mb-3">Begin Where You Fit In</p>
            <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              The <span className="lime-gradient">Income Center</span> Levels
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Your ultimate goal is to be on all 3 Income Centers simultaneously.
              Cycling just once puts you on a path to exceptional returns.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {tiers.map((tier, i) => (
              <div key={i} className={`rounded-xl p-8 ${tier.colorClass} text-center relative overflow-hidden transition-all duration-300 hover:scale-[1.02]`}>
                {i === 2 && (
                  <div className="absolute top-3 right-3 px-2 py-1 rounded text-xs font-bold tracking-widest uppercase"
                    style={{ background: "hsl(var(--lime))", color: "hsl(var(--indigo))" }}>
                    Elite
                  </div>
                )}
                <p className="text-muted-foreground text-xs tracking-widest uppercase mb-2">{tier.name} Level</p>
                <p className={`text-5xl font-bold mb-2 ${tier.textClass}`} style={{ fontFamily: "'Playfair Display', serif" }}>
                  {tier.entry}
                </p>
                <p className="text-muted-foreground text-sm mb-6">Entry Donation</p>
                <div className="border-t border-border/50 pt-6 mb-6">
                  <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">You Receive</p>
                  <p className={`text-3xl font-bold ${tier.textClass}`} style={{ fontFamily: "'Playfair Display', serif" }}>
                    {tier.receive}
                  </p>
                  <p className="text-muted-foreground text-xs mt-1">per cycle</p>
                </div>
                <Link
                  to="/join"
                  className="block text-center py-3 rounded-sm text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:opacity-90 border border-current"
                  style={{
                    color: tier.name === "Diamond" ? "hsl(var(--lime))" : tier.name === "Platinum" ? "hsl(var(--aqua))" : "hsl(var(--coral))",
                    borderColor: "currentColor"
                  }}
                >
                  Select {tier.name}
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center p-8 rounded-xl glass">
            <p className="text-muted-foreground text-sm mb-2">On all 3 Income Centers — cycling just once:</p>
            <p className="text-4xl font-bold lime-gradient mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
              $120,000
            </p>
            <p className="text-muted-foreground text-sm">Imagine cycling 2, 3, or more times — it's possible and easily doable!</p>
          </div>
        </div>
      </section>

      {/* 3 Steps */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-primary text-sm tracking-[0.3em] uppercase font-medium mb-3">Simple Process</p>
          <h2 className="text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
            Just <span className="lime-gradient">3 Simple</span> Doable Steps
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-primary/50 to-transparent z-10" />
              )}
              <div className="rounded-xl p-8 bg-card border border-border card-glow relative">
                <div className="text-6xl font-bold mb-4 lime-gradient opacity-50" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Wheelhouse / Möbius Loop Visual */}
      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-secondary text-sm tracking-[0.3em] uppercase font-medium mb-3">The Technology</p>
              <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                The Möbius Loop<br /><span className="lime-gradient">Wheelhouse</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Your inviter is in the center, YOU are in position #2, and the two people
                you invited are in positions #3 and beyond. The 2×2 Wheelhouse holds
                6 Active Donors.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                <span className="text-foreground font-semibold">You Never Lose Your Team!</span> Each time your Wheelhouse fills,
                another automatically re-opens — you receive another 6 donations
                without additional effort or qualifications.
              </p>
              <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 border border-border">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <p className="text-sm text-muted-foreground">
                  <span className="text-foreground font-medium">You Follow Your Inviter.</span>{" "}
                  Your Team Always Follows You.
                </p>
              </div>
            </div>

            {/* Wheelhouse Diagram */}
            <WheelhouseDiagram />
          </div>
        </div>
      </section>

      {/* 6 Ways to Receive */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-primary text-sm tracking-[0.3em] uppercase font-medium mb-3">Income Streams</p>
          <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            <span className="lime-gradient">6 Ways</span> to Receive Donations
          </h2>
          <p className="text-muted-foreground">So many ways to receive — the donations might never stop coming in.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {["Personals", "Help From Above", "Help From Below", "Re-Entries", "One Direct", "Donations to You"].map((way, i) => (
            <div key={i} className="rounded-xl p-6 bg-card border border-border hover:border-primary/40 transition-all duration-300 text-center">
              <div className="text-3xl font-bold lime-gradient mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <p className="text-foreground font-medium text-sm">{way}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Everything Automated */}
      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-secondary text-sm tracking-[0.3em] uppercase font-medium mb-3">Technology</p>
            <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Everything Is <span className="lime-gradient">Automated</span>
            </h2>
            <p className="text-muted-foreground text-lg italic">You Invite. We Ignite.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {automations.map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-lg bg-muted/30 border border-border">
                <CheckCircle size={16} className="text-primary flex-shrink-0" />
                <span className="text-foreground text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-primary text-sm tracking-[0.3em] uppercase font-medium mb-3">What You Get</p>
          <h2 className="text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
            So Many <span className="lime-gradient">Benefits</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {benefits.map((b, i) => (
            <div key={i} className="flex items-center gap-4 p-5 rounded-xl bg-card border border-border card-glow">
              <div className="p-3 rounded-lg" style={{ background: "hsl(var(--coral) / 0.1)" }}>
                <b.icon size={20} className="text-primary" />
              </div>
              <span className="text-foreground text-sm font-medium">{b.label}</span>
            </div>
          ))}
        </div>

        <div className="text-center p-8 rounded-xl"
          style={{ background: "linear-gradient(135deg, hsl(var(--coral) / 0.1), hsl(var(--aqua) / 0.08))", border: "1px solid hsl(var(--coral) / 0.3)" }}>
          <p className="text-muted-foreground text-sm mb-2">Use over 150 FIAT currencies and 100+ cryptocurrencies</p>
          <p className="text-foreground font-semibold text-lg mb-6">Your Fastest Way To Wealth!</p>
          <Link
            to="/join"
            className="inline-block px-10 py-4 rounded-sm font-bold tracking-widest uppercase text-sm transition-all duration-300 hover:opacity-90"
            style={{ background: "linear-gradient(135deg, hsl(var(--coral)), hsl(15 95% 65%))", color: "hsl(var(--indigo))" }}
          >
            Start Receiving Today
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HowItWorks;
