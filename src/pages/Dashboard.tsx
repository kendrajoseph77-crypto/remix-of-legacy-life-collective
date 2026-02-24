import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Users,
  Wallet,
  Send,
  Inbox,
  UsersRound,
  Megaphone,
  Coins,
  CreditCard,
  UserCog,
  LayoutGrid,
  ChevronRight,
  Star,
  Gem,
  Crown,
  Lightbulb,
  LogOut,
  HelpCircle,
  FileQuestion,
  Wrench,
  UserCircle,
  Menu,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Logo from "@/components/Logo";

const GOLD = "hsl(40 72% 50%)";
const GOLD_LIGHT = "hsl(42 80% 62%)";
const GOLD_DARK = "hsl(34 85% 40%)";
const GOLD_BG = "hsl(40 72% 50% / 0.12)";
const GOLD_GRADIENT = "linear-gradient(135deg, hsl(42 80% 58%), hsl(38 75% 48%), hsl(34 85% 40%))";
const GOLD_GRADIENT_LIGHT = "linear-gradient(135deg, hsl(42 80% 62%), hsl(40 72% 50%));";

const sidebarLinks = [
  { label: "Dashboard", icon: LayoutGrid, active: true },
  { label: "Contributions", icon: Coins },
  { label: "Income Centers", icon: LayoutGrid },
  { label: "Wallet", icon: Wallet },
  { label: "Tokens", icon: Gem },
  { label: "Team", icon: UsersRound },
  { label: "Profile", icon: UserCircle },
  { label: "Toolz", icon: Wrench },
  { label: "FAQs", icon: FileQuestion },
  { label: "Help", icon: HelpCircle },
];

const quickActions = [
  { label: "Send Contributions", desc: "Send pending contributions", icon: Send },
  { label: "Receive Contributions", desc: "Mark contributions received", icon: Inbox },
  { label: "My Team", desc: "View team members", icon: UsersRound },
  { label: "Income Centers", desc: "0 open centers", icon: LayoutGrid },
  { label: "Marketing Tools", desc: "Share & grow your team", icon: Megaphone },
  { label: "Buy Tokens", desc: "Purchase coop tokens", icon: Coins },
  { label: "My Wallet", desc: "Deposit & manage funds", icon: CreditCard },
  { label: "My Profile", desc: "Update your info", icon: UserCog },
];

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const userName = "Kendra";

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good Morning";
    if (h < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="flex min-h-screen bg-muted/40 font-sans">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-56" : "w-0 overflow-hidden"
        } transition-all duration-300 bg-foreground text-primary-foreground flex flex-col`}
      >
        <div className="p-4 flex items-center justify-center border-b border-white/10">
          <Logo darkBg className="!h-12" />
        </div>
        <nav className="flex-1 py-4 space-y-0.5 px-2">
          {sidebarLinks.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${
                item.active
                  ? "text-foreground font-medium"
                  : "text-primary-foreground/60 hover:text-primary-foreground/90"
              }`}
              style={item.active ? { background: GOLD_GRADIENT, color: "hsl(38 30% 10%)", boxShadow: `inset 0 1px 0 ${GOLD_LIGHT}40` } : {}}
            >
              <item.icon size={16} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="px-2 pb-4 space-y-0.5">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-primary-foreground/60 hover:text-primary-foreground/90">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="flex items-center justify-between px-6 py-3 bg-background border-b border-border">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu size={20} className="text-muted-foreground" />
          </button>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>Your QR Code</span>
            <span className="font-semibold text-foreground">{userName} Joseph</span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Welcome banner */}
          <div className="rounded-xl p-6 flex items-center justify-between" style={{ background: "hsl(0 0% 8%)" }}>
            <div>
              <span
                className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded mb-2"
                style={{ background: GOLD_GRADIENT, color: "hsl(38 30% 10%)" }}
              >
                Free Member
              </span>
              <h2 className="text-xl font-semibold text-white mt-1">
                {getGreeting()}, {userName}!
              </h2>
              <p className="text-white/50 text-sm mt-1">
                Here's your activity overview. Keep growing your team and earning contributions.
              </p>
              <p className="text-white/30 text-xs mt-2">🔑 Key: 6399365</p>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <button
                className="px-4 py-2 rounded-lg text-sm font-medium"
                style={{ background: GOLD_GRADIENT, color: "hsl(38 30% 10%)", boxShadow: `inset 0 1px 0 ${GOLD_LIGHT}40` }}
              >
                Send Contributions
              </button>
              <button className="px-4 py-2 rounded-lg text-sm font-medium border border-white/20 text-white hover:bg-white/5">
                + Add Team Member
              </button>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "RECEIVED", value: "$0.00", icon: ArrowDownLeft, color: GOLD },
              { label: "TOTAL SENT", value: "$0.00", icon: ArrowUpRight, color: GOLD },
              { label: "TEAM MEMBERS", value: "6", icon: Users, color: GOLD, sub: "● 0 Active  ○ 6 Direct" },
              { label: "WALLET BALANCE", value: "$0.00", icon: Wallet, color: GOLD, link: "+ Add Funds" },
            ].map((stat) => (
              <div key={stat.label} className="bg-background rounded-xl p-4 border border-border">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                  style={{ background: GOLD_BG }}
                >
                  <stat.icon size={18} style={{ color: GOLD }} />
                </div>
                <p className="text-[11px] text-muted-foreground tracking-wide">{stat.label}</p>
                <p className="text-xl font-semibold mt-0.5" style={{ color: GOLD }}>
                  {stat.value}
                </p>
                {stat.sub && <p className="text-[10px] text-muted-foreground mt-1">{stat.sub}</p>}
                {stat.link && (
                  <button className="text-[11px] mt-1 font-medium" style={{ color: GOLD }}>
                    {stat.link}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Top colored bar accents */}
          <style>{`
            .stats-grid > div:nth-child(1) { border-top: 3px solid ${GOLD}; }
            .stats-grid > div:nth-child(2) { border-top: 3px solid ${GOLD}; }
            .stats-grid > div:nth-child(3) { border-top: 3px solid ${GOLD}; }
            .stats-grid > div:nth-child(4) { border-top: 3px solid ${GOLD}; }
          `}</style>

          {/* Quick Actions */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-1.5">
              <Star size={14} style={{ color: GOLD }} /> Quick Actions
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {quickActions.map((a) => (
                <button
                  key={a.label}
                  className="bg-background rounded-xl p-4 border border-border flex items-center gap-3 hover:border-gold/40 transition-colors text-left group"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: GOLD_BG }}
                  >
                    <a.icon size={15} style={{ color: GOLD }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{a.label}</p>
                    <p className="text-[11px] text-muted-foreground">{a.desc}</p>
                  </div>
                  <ChevronRight size={14} className="text-muted-foreground/40 group-hover:text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>

          {/* Bottom row */}
          <div className="grid lg:grid-cols-2 gap-4">
            {/* Team Overview */}
            <div className="bg-background rounded-xl p-5 border border-border">
              <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-1.5">
                <UsersRound size={14} style={{ color: GOLD }} /> Team Overview
              </h3>
              <div className="grid grid-cols-4 gap-4 text-center">
                {[
                  { label: "ACTIVE RATE", value: "0%" },
                  { label: "DIRECT REFERRALS", value: "6" },
                  { label: "TOTAL TEAM", value: "6" },
                  { label: "OPEN ICS", value: "0" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="text-lg font-semibold" style={{ color: GOLD }}>
                      {s.value}
                    </p>
                    <p className="text-[10px] text-muted-foreground tracking-wide mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-5">
                <button
                  className="px-4 py-2 rounded-lg text-xs font-medium"
                  style={{ background: GOLD_GRADIENT, color: "hsl(38 30% 10%)", boxShadow: `inset 0 1px 0 ${GOLD_LIGHT}40` }}
                >
                  View Full Team →
                </button>
                <button className="text-xs font-medium" style={{ color: GOLD }}>
                  View Income Centers
                </button>
              </div>
            </div>

            {/* Goals & Progress */}
            <div className="bg-background rounded-xl p-5 border border-border">
              <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-1.5">
                <Star size={14} style={{ color: GOLD }} /> Goals & Progress
              </h3>
              <div className="space-y-4">
                {[
                  { label: "Level 2,500", amount: "$0.00 / $2,500.00", pct: 0, icon: Star },
                  { label: "Level 5,000", amount: "$0.00 / $5,000.00", pct: 0, icon: Gem },
                  { label: "Level 10,000", amount: "$0.00 / $10,000.00", pct: 0, icon: Crown },
                ].map((g) => (
                  <div key={g.label}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <g.icon size={14} style={{ color: GOLD }} />
                        <span className="text-sm font-medium">{g.label}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{g.pct}%</span>
                    </div>
                    <Progress value={g.pct} className="h-1.5 bg-muted" />
                    <p className="text-[10px] text-muted-foreground mt-0.5">{g.amount}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs mt-4 flex items-center gap-1" style={{ color: GOLD }}>
                <Lightbulb size={12} /> Invite 2 members to accelerate your progress to the next level!
              </p>
            </div>
          </div>

          {/* Footer */}
          <footer className="text-center text-[11px] text-muted-foreground pt-6 pb-2 space-x-4">
            <span>Terms</span>
            <span>Privacy</span>
            <span>Guarantee</span>
            <p className="mt-1">© 2001–2026 5050Life™. All rights reserved.</p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
