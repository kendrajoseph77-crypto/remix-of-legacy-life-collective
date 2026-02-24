import { Star, Gem, Crown } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const theme = {
  name: "Architect",
  primary: "hsl(160 80% 42%)",
  primaryLight: "hsl(160 75% 50%)",
  primaryDark: "hsl(160 90% 22%)",
  primaryBg: "hsl(160 80% 42% / 0.12)",
  gradient: "linear-gradient(135deg, hsl(160 80% 42%), hsl(160 84% 30%), hsl(160 90% 22%))",
  gradientLight: "linear-gradient(135deg, hsl(160 75% 50%), hsl(160 80% 42%))",
  textOnGradient: "hsl(160 30% 98%)",
  levels: [
    { label: "Level 250", amount: "$0.00 / $250.00", icon: Star },
    { label: "Level 500", amount: "$0.00 / $500.00", icon: Gem },
    { label: "Level 1,000", amount: "$0.00 / $1,000.00", icon: Crown },
  ],
};

const ArchitectDashboard = () => <DashboardLayout theme={theme} />;
export default ArchitectDashboard;
