import { Star, Gem, Crown } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const theme = {
  name: "Mogul",
  primary: "hsl(36 65% 42%)",
  primaryLight: "hsl(40 55% 55%)",
  primaryDark: "hsl(30 75% 30%)",
  primaryBg: "hsl(36 65% 42% / 0.12)",
  gradient: "linear-gradient(135deg, hsl(40 55% 55%), hsl(36 65% 42%), hsl(30 75% 30%))",
  gradientLight: "linear-gradient(135deg, hsl(40 55% 55%), hsl(36 65% 42%))",
  textOnGradient: "hsl(35 30% 95%)",
  levels: [
    { label: "Level 2,500", amount: "$0.00 / $2,500.00", icon: Star },
    { label: "Level 5,000", amount: "$0.00 / $5,000.00", icon: Gem },
    { label: "Level 10,000", amount: "$0.00 / $10,000.00", icon: Crown },
  ],
};

const Dashboard = () => <DashboardLayout theme={theme} />;
export default Dashboard;
