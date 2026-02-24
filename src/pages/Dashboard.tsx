import { Star, Gem, Crown } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const theme = {
  name: "Visionary",
  primary: "hsl(40 72% 50%)",
  primaryLight: "hsl(42 80% 62%)",
  primaryDark: "hsl(34 85% 40%)",
  primaryBg: "hsl(40 72% 50% / 0.12)",
  gradient: "linear-gradient(135deg, hsl(42 80% 58%), hsl(38 75% 48%), hsl(34 85% 40%))",
  gradientLight: "linear-gradient(135deg, hsl(42 80% 62%), hsl(40 72% 50%))",
  textOnGradient: "hsl(38 30% 10%)",
  levels: [
    { label: "Level 2,500", amount: "$0.00 / $2,500.00", icon: Star },
    { label: "Level 5,000", amount: "$0.00 / $5,000.00", icon: Gem },
    { label: "Level 10,000", amount: "$0.00 / $10,000.00", icon: Crown },
  ],
};

const Dashboard = () => <DashboardLayout theme={theme} />;
export default Dashboard;
