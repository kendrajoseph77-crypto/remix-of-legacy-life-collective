import { Star, Gem, Crown } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const theme = {
  name: "Builder",
  primary: "hsl(224 85% 58%)",
  primaryLight: "hsl(224 80% 68%)",
  primaryDark: "hsl(224 90% 38%)",
  primaryBg: "hsl(224 85% 58% / 0.12)",
  gradient: "linear-gradient(135deg, hsl(224 85% 58%), hsl(224 78% 48%), hsl(224 90% 38%))",
  gradientLight: "linear-gradient(135deg, hsl(224 80% 68%), hsl(224 85% 58%))",
  textOnGradient: "hsl(224 30% 98%)",
  levels: [
    { label: "Level 25", amount: "$0.00 / $25.00", icon: Star },
    { label: "Level 50", amount: "$0.00 / $50.00", icon: Gem },
    { label: "Level 100", amount: "$0.00 / $100.00", icon: Crown },
  ],
};

const BuilderDashboard = () => <DashboardLayout theme={theme} />;
export default BuilderDashboard;
