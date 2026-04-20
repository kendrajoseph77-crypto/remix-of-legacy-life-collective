import { Link } from "react-router-dom";
import { Sparkles, TrendingUp, Zap, Gift, ArrowRight, Crown, Users, Lock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const upgrades = [
  {
    icon: Crown,
    tag: "NEW TIERS",
    title: "Fast, Core & Max",
    body: "Three reimagined membership levels — each with sharper benefits, clearer paths, and bigger upside than before.",
  },
  {
    icon: TrendingUp,
    tag: "BETTER ECONOMICS",
    title: "Improved Payout Structure",
    body: "Redesigned distribution tiers mean your contributions go further. More leverage, more returns, more aligned incentives.",
  },
  {
    icon: Zap,
    tag: "FASTER ONBOARDING",
    title: "One-Click Re-Entry",
    body: "Your history is already on file. Rejoin in under 90 seconds and pick up exactly where you left off.",
  },
  {
    icon: Users,
    tag: "COMMUNITY",
    title: "Private Member Circles",
    body: "New cooperative pods connect you with members at your level. Real conversations, real deals, real momentum.",
  },
  {
    icon: Lock,
    tag: "SECURITY",
    title: "Hardened Platform",
    body: "End-to-end encryption, enhanced verification, and a fully audited infrastructure keep your position protected.",
  },
  {
    icon: Gift,
    tag: "RETURNING BONUS",
    title: "Legacy Member Credit",
    body: "Come back this quarter and receive a founder credit applied to your first cycle. Our way of saying welcome home.",
  },
];

const WelcomeBack = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-40 pb-24 overflow-hidden section-dark">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div
            className="absolute top-1/4 -left-20 w-96 h-96 rounded-full blur-3xl"
            style={{ background: "hsl(39 55% 52%)" }}
          />
          <div
            className="absolute bottom-0 right-0 w-[30rem] h-[30rem] rounded-full blur-3xl"
            style={{ background: "hsl(160 84% 30%)" }}
          />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <div
            className="inline-flex items-center gap-2 px-5 py-2 mb-8 rounded-full text-xs tracking-[0.3em] uppercase"
            style={{
              background: "hsl(0 0% 100% / 0.08)",
              border: "1px solid hsl(0 0% 100% / 0.15)",
              color: "hsl(41 50% 65%)",
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Exclusive · Returning Members</span>
          </div>

          <h1
            className="text-6xl md:text-8xl leading-[0.95] mb-8 text-white"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 500 }}
          >
            Welcome back.
            <br />
            <span className="gold-gradient italic">Everything changed.</span>
          </h1>

          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-12 text-white/70 leading-relaxed">
            We rebuilt the platform from the ground up. New tiers, stronger economics,
            a tighter community — and a returning member credit waiting for you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/join"
              className="btn-gold px-10 py-4 rounded-full font-semibold tracking-wider uppercase text-sm inline-flex items-center gap-2"
            >
              Rejoin Now
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/how-it-works"
              className="btn-outline-white px-10 py-4 rounded-full font-semibold tracking-wider uppercase text-sm"
            >
              See What's New
            </Link>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-y border-border bg-muted/30">
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "3", label: "New Tiers" },
            { value: "2×", label: "Better Returns" },
            { value: "90s", label: "Re-Entry Time" },
            { value: "100%", label: "Legacy Honored" },
          ].map((stat) => (
            <div key={stat.label}>
              <div
                className="text-4xl md:text-5xl mb-1"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}
              >
                {stat.value}
              </div>
              <div className="text-xs tracking-[0.25em] uppercase text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Upgrades grid */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p
              className="text-xs tracking-[0.35em] uppercase mb-5 font-semibold"
              style={{ color: "hsl(160 84% 30%)" }}
            >
              What's New
            </p>
            <h2
              className="text-5xl md:text-6xl leading-[1.05] mb-6"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}
            >
              Six reasons to come home.
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We didn't just update the platform. We rebuilt it around what our members actually asked for.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upgrades.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group p-8 rounded-2xl bg-card border border-border hover:border-foreground/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_hsl(0_0%_0%/0.25)]"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                    style={{
                      background: "linear-gradient(135deg, hsl(41 50% 65%), hsl(35 55% 40%))",
                    }}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <p
                    className="text-[10px] tracking-[0.3em] uppercase mb-3 font-semibold"
                    style={{ color: "hsl(39 55% 45%)" }}
                  >
                    {item.tag}
                  </p>
                  <h3
                    className="text-2xl mb-3 leading-tight"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{item.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-dark py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[50rem] h-[50rem] rounded-full blur-3xl"
            style={{ background: "hsl(39 55% 52%)" }}
          />
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <p
            className="text-xs tracking-[0.35em] uppercase mb-5 font-semibold"
            style={{ color: "hsl(41 50% 65%)" }}
          >
            Your Seat Is Reserved
          </p>
          <h2
            className="text-5xl md:text-7xl leading-[1.02] mb-8 text-white"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 500 }}
          >
            The platform evolved.
            <br />
            <span className="gold-gradient italic">So should you.</span>
          </h2>
          <p className="text-lg text-white/60 mb-10 max-w-xl mx-auto">
            Returning members get priority access, a founder credit, and immediate placement.
            No waitlist. No catch.
          </p>
          <Link
            to="/join"
            className="btn-gold px-12 py-5 rounded-full font-semibold tracking-wider uppercase text-sm inline-flex items-center gap-2"
          >
            Claim Your Return
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WelcomeBack;
