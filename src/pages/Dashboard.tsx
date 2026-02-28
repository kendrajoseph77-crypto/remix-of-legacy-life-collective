import { Star, Gem, Crown } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const theme = {
  name: "Max",
  primary: "hsl(39 55% 52%)",
  primaryLight: "hsl(41 50% 65%)",
  primaryDark: "hsl(35 55% 40%)",
  primaryBg: "hsl(39 55% 52% / 0.12)",
  gradient: "linear-gradient(135deg, hsl(41 50% 65%), hsl(39 55% 52%), hsl(35 55% 40%))",
  gradientLight: "linear-gradient(135deg, hsl(41 50% 65%), hsl(39 55% 52%))",
  textOnGradient: "hsl(35 30% 10%)",
  levels: [
    { label: "Level 2,500", amount: "$0.00 / $2,500.00", icon: Star },
    { label: "Level 5,000", amount: "$0.00 / $5,000.00", icon: Gem },
    { label: "Level 10,000", amount: "$0.00 / $10,000.00", icon: Crown },
  ],
};

const Dashboard = () => <DashboardLayout theme={theme} />;
export default Dashboard;
