import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Users,
  Wallet,
  Send,
  Heart,
  UserPlus,
  Briefcase,
  Coins,
  UserCircle,
  LayoutGrid,
  Zap,
  RefreshCw,
  LogOut,
  HelpCircle,
  EyeOff,
  Menu,
  ChevronDown,
  CreditCard,
  SendHorizonal,
  Archive,
  CheckCircle2,
  ChevronsDown,
  DoorOpen,
  DoorClosed,
  PlusCircle,
  ArrowUp,
  ArrowLeftRight,
  FileText,
  Clock,
  ShoppingCart,
  List,
  CornerUpRight,
  UserPlus2,
  Key,
  Wifi,
  Settings,
  type LucideIcon,
} from "lucide-react";
import Logo from "@/components/Logo";

interface LevelConfig {
  amount: number;
  label: string;
}

interface ThemeConfig {
  name: string;
  primary: string;
  primaryLight: string;
  primaryDark: string;
  primaryBg: string;
  gradient: string;
  gradientLight: string;
  textOnGradient: string;
  levels: LevelConfig[];
  systemLogo?: string;
}

interface SidebarItem {
  label: string;
  icon: LucideIcon;
  active?: boolean;
  children?: { label: string; icon: LucideIcon }[];
}

const sidebarLinks: SidebarItem[] = [
  { label: "Dashboard", icon: LayoutGrid, active: true },
  {
    label: "Contributions",
    icon: Heart,
    children: [
      { label: "Methods", icon: CreditCard },
      { label: "To Send", icon: SendHorizonal },
      { label: "To Receive", icon: Archive },
      { label: "Sent", icon: CheckCircle2 },
      { label: "Received", icon: ChevronsDown },
    ],
  },
  {
    label: "Income Centers",
    icon: LayoutGrid,
    children: [
      { label: "Open", icon: DoorOpen },
      { label: "Closed", icon: DoorClosed },
    ],
  },
  {
    label: "Wallet",
    icon: Briefcase,
    children: [
      { label: "Deposit", icon: PlusCircle },
      { label: "Withdraw", icon: ArrowUp },
      { label: "Transfer", icon: ArrowLeftRight },
      { label: "Invoices", icon: FileText },
      { label: "Transactions", icon: Clock },
    ],
  },
  {
    label: "Tokens",
    icon: Coins,
    children: [
      { label: "Purchase", icon: ShoppingCart },
      { label: "My Tokens", icon: List },
      { label: "Assign", icon: CornerUpRight },
      { label: "Activate Account", icon: Zap },
    ],
  },
  {
    label: "Team",
    icon: Users,
    children: [
      { label: "My Team", icon: Users },
      { label: "Register New", icon: UserPlus },
    ],
  },
  {
    label: "Profile",
    icon: UserCircle,
    children: [
      { label: "Profile", icon: UserCircle },
      { label: "Change Password", icon: Key },
      { label: "One-Time Login Keys", icon: Wifi },
      { label: "Settings", icon: Settings },
    ],
  },
  { label: "Help", icon: HelpCircle },
];

const DashboardLayout = ({ theme }: { theme: ThemeConfig }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const userName = "Elizabeth";
  const userLastName = "Grace";
  const userKey = "1008";
  const siteUrl = `https://5050life.com/${userKey}`;

  return (
    <div className="flex min-h-screen bg-muted/40 font-sans">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-56" : "w-0 overflow-hidden"
        } transition-all duration-300 bg-foreground text-primary-foreground flex flex-col`}
      >
        <Link to="/" className="p-4 flex items-center justify-center border-b border-white/10">
          {theme.systemLogo ? (
            <img src={theme.systemLogo} alt={`5050 ${theme.name} logo`} className="h-12 w-auto" />
          ) : (
            <Logo darkBg className="!h-12" />
          )}
        </Link>
        <nav className="flex-1 py-4 space-y-0.5 px-2">
          {sidebarLinks.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${
                item.active
                  ? "text-foreground font-medium"
                  : "text-primary-foreground/60 hover:text-primary-foreground/90"
              }`}
              style={item.active ? { background: theme.gradient, color: theme.textOnGradient, boxShadow: `inset 0 1px 0 ${theme.primaryLight}40` } : {}}
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
            <LayoutGrid size={16} style={{ color: theme.primary }} />
            <div className="text-right">
              <span className="font-semibold text-foreground">{userName} {userLastName}</span>
              <p className="text-[10px] text-muted-foreground">{siteUrl}</p>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Welcome banner */}
          <div className="rounded-xl p-6 flex items-center justify-between" style={{ background: "hsl(0 0% 8%)" }}>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded"
                  style={{ background: theme.gradient, color: theme.textOnGradient }}
                >
                  Active Member
                </span>
                <span className="text-white/40 text-xs flex items-center gap-1">
                  🔗 {siteUrl}
                </span>
              </div>
              <h2 className="text-2xl font-semibold text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Hello, {userName}!
              </h2>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <button
                className="px-5 py-2.5 rounded-lg text-sm font-medium active:translate-y-[2px] transition-transform flex items-center gap-2"
                style={{ background: theme.gradient, color: theme.textOnGradient, boxShadow: `inset 0 1px 0 ${theme.primaryLight}40, 0 4px 0 ${theme.primaryDark}` }}
              >
                <Send size={14} /> Send
              </button>
              <button
                className="px-5 py-2.5 rounded-lg text-sm font-medium active:translate-y-[2px] transition-transform flex items-center gap-2 border-2"
                style={{ borderColor: theme.primary, color: theme.primary, boxShadow: `0 4px 0 ${theme.primaryDark}40` }}
              >
                <ArrowDownLeft size={14} /> Receive
              </button>
            </div>
          </div>

          {/* Quick Actions Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "Deposit Money", icon: Briefcase },
              { label: "Pay It Forward", icon: Heart },
              { label: "Add Teammate", icon: UserPlus },
            ].map((action) => (
              <button
                key={action.label}
                className="bg-background rounded-xl p-4 border border-border flex items-center justify-center gap-2 text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
              >
                <action.icon size={16} style={{ color: theme.primary }} />
                {action.label}
              </button>
            ))}
          </div>

          {/* My Levels */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-1.5">
              🏆 My Levels
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {theme.levels.map((level, i) => {
                const isActive = false;
                const showUpgrade = i < theme.levels.length;
                return (
                  <div
                    key={level.label}
                    className="rounded-xl border border-border bg-background p-5 flex flex-col"
                    style={{ borderTop: `3px solid ${isActive ? theme.primary : "hsl(0 0% 80%)"}` }}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <p className="text-2xl font-bold text-foreground">${level.amount.toLocaleString()}</p>
                      <div className="flex flex-col gap-1.5 items-end">
                        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                          <RefreshCw size={10} /> Reentry
                          <div
                            className="w-9 h-[20px] rounded-full relative cursor-pointer bg-muted"
                          >
                            <div className="absolute left-0.5 top-[3px] w-3.5 h-3.5 rounded-full bg-white shadow" />
                          </div>
                        </div>
                        {showUpgrade && (
                          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                            <Zap size={10} /> Upgrade
                            <div
                              className="w-9 h-[20px] rounded-full relative cursor-pointer bg-muted"
                            >
                              <div className="absolute left-0.5 top-[3px] w-3.5 h-3.5 rounded-full bg-white shadow" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <span
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full w-fit mb-4"
                      style={
                        isActive
                          ? { background: "hsl(152 60% 42% / 0.12)", color: "hsl(152 55% 38%)" }
                          : { background: "hsl(0 45% 50% / 0.10)", color: "hsl(0 50% 48%)" }
                      }
                    >
                      {isActive ? "✓ Active" : "⊘ Inactive"}
                    </span>

                    <button
                      className="w-full py-3 rounded-lg text-sm font-bold tracking-wide flex items-center justify-center gap-1.5 mt-auto active:translate-y-[1px] transition-transform"
                      style={{ background: theme.gradient, color: theme.textOnGradient, boxShadow: `inset 0 1px 0 ${theme.primaryLight}40` }}
                    >
                      <Zap size={14} /> Activate ${level.amount.toLocaleString()}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "Earnings", icon: ArrowDownLeft, value: "•••", hasHide: true },
              { label: "Team", icon: Users, value: "•••", hasHide: true },
              { label: "Balance", icon: Briefcase, value: "•••", hasHide: true, link: "+ Deposit" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-background rounded-xl p-4 border border-border"
                style={{ borderTop: `3px solid ${theme.primary}` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: theme.primaryBg }}
                    >
                      <stat.icon size={16} style={{ color: theme.primary }} />
                    </div>
                    <span className="text-sm font-medium text-foreground">{stat.label}</span>
                  </div>
                  {stat.hasHide && <EyeOff size={14} className="text-muted-foreground/40 cursor-pointer" />}
                </div>
                <p className="text-lg font-semibold text-foreground">{stat.value}</p>
                {stat.link && (
                  <button className="text-xs mt-1 font-medium" style={{ color: theme.primary }}>
                    {stat.link}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Footer */}
          <footer className="text-center text-[11px] text-muted-foreground pt-6 pb-2 space-x-4">
            <span>Terms</span>
            <span>Privacy</span>
            <span>Guarantee</span>
            <p className="mt-1">© 2001–2026 5050{theme.name}™. All rights reserved.</p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
