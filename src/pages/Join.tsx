import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { CheckCircle } from "lucide-react";

const tiers = [
  {
    name: "Gold",
    entry: "$2,500",
    receive: "$7,500",
    colorClass: "tier-gold",
    textClass: "text-primary",
    borderActive: "ring-primary",
    features: [
      "Gold Income Center Access",
      "2×2 Wheelhouse Position",
      "Automated Positioning",
      "Personal Dashboard",
      "Decentralized Wallet",
      "Global Territory",
    ],
  },
  {
    name: "Platinum",
    entry: "$5,000",
    receive: "$15,000",
    colorClass: "tier-platinum",
    textClass: "text-secondary",
    borderActive: "ring-secondary",
    features: [
      "Platinum Income Center Access",
      "2×2 Wheelhouse Position",
      "Automated Positioning",
      "Personal Dashboard",
      "Decentralized Wallet",
      "Global Territory",
      "Priority Support",
    ],
  },
  {
    name: "Diamond",
    entry: "$10,000",
    receive: "$30,000",
    colorClass: "tier-diamond",
    textClass: "text-accent",
    borderActive: "ring-accent",
    elite: true,
    features: [
      "Diamond Income Center Access",
      "2×2 Wheelhouse Position",
      "Automated Positioning",
      "Personal Dashboard",
      "Decentralized Wallet",
      "Global Territory",
      "Priority Support",
      "Concierge Onboarding",
    ],
  },
];

const Join = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 glow-aqua-top pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <p className="text-aqua text-sm tracking-[0.3em] uppercase font-medium mb-4">Choose Your Level</p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Begin Your Legacy Today
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
            Select the Income Center that fits where you are — then grow into all three.
            Your financial legacy starts with a single decision.
          </p>
        </div>
      </section>

      {/* Tiers */}
      <section className="py-16 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {tiers.map((tier, i) => {
            const receiveColors = ["text-primary", "text-aqua", "text-lime"];
            const checkColors = ["text-primary", "text-aqua", "text-lime"];
            const eliteBadge = ["bg-primary/10 text-primary border-primary/30", "bg-aqua/10 text-aqua border-aqua/30", "bg-lime/10 text-lime border-lime/30"];
            const selectedRing = ["ring-primary border-primary", "ring-secondary border-secondary", "ring-accent border-accent"];
            return (
              <div
                key={i}
                onClick={() => setSelected(i)}
                className={`rounded-xl p-8 cursor-pointer transition-all duration-300 ${tier.colorClass} relative ${
                  selected === i
                    ? `ring-2 ${selectedRing[i]} scale-[1.02]`
                    : "hover:border-muted-foreground/40 hover:scale-[1.01]"
                }`}
              >
                {tier.elite && (
                  <div className={`absolute top-4 right-4 px-2 py-1 rounded text-xs font-bold tracking-widest uppercase border ${eliteBadge[i]}`}>
                    Elite
                  </div>
                )}

                <div className="mb-6">
                  <p className="text-muted-foreground text-xs tracking-widest uppercase mb-2">{tier.name} Level</p>
                  <p className="text-4xl font-bold mb-1 text-foreground">{tier.entry}</p>
                  <p className="text-muted-foreground text-sm">one-time entry contribution</p>
                </div>

                <div className="border-t border-border/50 pt-6 mb-6">
                  <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">You Receive Per Cycle</p>
                  <p className={`text-3xl font-bold ${receiveColors[i]}`}>{tier.receive}</p>
                </div>

                <div className="flex flex-col gap-3">
                  {tier.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <CheckCircle size={14} className={checkColors[i]} />
                      <span className="text-muted-foreground text-xs">{f}</span>
                    </div>
                  ))}
                </div>

                {selected === i && (
                  <div className={`mt-6 p-3 rounded-lg text-center text-xs font-bold tracking-widest uppercase bg-primary/10 ${receiveColors[i]}`}>
                    ✓ Selected
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Sign Up Form */}
        <div className="max-w-lg mx-auto rounded-xl p-8 bg-card border border-border card-glow">
          <h3 className="text-2xl font-bold mb-2 text-foreground text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
            Create Your Account
          </h3>
          <p className="text-muted-foreground text-sm text-center mb-8">
            {selected !== null
              ? `Selected: ${tiers[selected].name} Level — ${tiers[selected].entry} entry`
              : "Select a level above to get started"}
          </p>

          <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-muted-foreground tracking-wide uppercase block mb-2">First Name</label>
                <input
                  type="text"
                  placeholder="John"
                  className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary text-sm transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground tracking-wide uppercase block mb-2">Last Name</label>
                <input
                  type="text"
                  placeholder="Smith"
                  className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary text-sm transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-muted-foreground tracking-wide uppercase block mb-2">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary text-sm transition-colors"
              />
            </div>

            <div>
              <label className="text-xs text-muted-foreground tracking-wide uppercase block mb-2">Username</label>
              <input
                type="text"
                placeholder="yourname"
                className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary text-sm transition-colors"
              />
            </div>

            <div>
              <label className="text-xs text-muted-foreground tracking-wide uppercase block mb-2">Referral Code (optional)</label>
              <input
                type="text"
                placeholder="Inviter's code"
                className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary text-sm transition-colors"
              />
            </div>

            <div>
              <label className="text-xs text-muted-foreground tracking-wide uppercase block mb-2">Income Center Level</label>
              <select
                value={selected !== null ? tiers[selected].name : ""}
                onChange={(e) => setSelected(tiers.findIndex((t) => t.name === e.target.value))}
                className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border text-foreground focus:outline-none focus:border-primary text-sm transition-colors"
              >
                <option value="">Select a level...</option>
                {tiers.map((t) => (
                  <option key={t.name} value={t.name}>
                    {t.name} — {t.entry} entry
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="mt-4 w-full py-4 rounded-sm font-bold tracking-widest uppercase text-sm transition-all duration-300 hover:opacity-90 bg-primary text-primary-foreground"
            >
              Confirm & Join
            </button>

            <p className="text-muted-foreground text-xs text-center">
              By joining, you agree to our{" "}
              <a href="#" className="text-primary hover:underline">Terms & Conditions</a>
              {" "}and{" "}
              <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
            </p>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Join;
