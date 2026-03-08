import DashboardLayout from "@/components/DashboardLayout";
import logoF from "@/assets/logo-5050-f.svg";

const theme = {
  name: "Fast",
  primary: "hsl(224 85% 58%)",
  primaryLight: "hsl(224 80% 68%)",
  primaryDark: "hsl(224 90% 38%)",
  primaryBg: "hsl(224 85% 58% / 0.12)",
  gradient: "linear-gradient(135deg, hsl(224 85% 58%), hsl(224 78% 48%), hsl(224 90% 38%))",
  gradientLight: "linear-gradient(135deg, hsl(224 80% 68%), hsl(224 85% 58%))",
  textOnGradient: "hsl(224 30% 98%)",
  levels: [
    { amount: 25, label: "$25" },
    { amount: 50, label: "$50" },
    { amount: 100, label: "$100" },
  ],
  systemLogo: logoF,
};

const BuilderDashboard = () => <DashboardLayout theme={theme} />;
export default BuilderDashboard;
