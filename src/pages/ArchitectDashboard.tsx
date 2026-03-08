import DashboardLayout from "@/components/DashboardLayout";
import logoC from "@/assets/logo-5050-c.svg";

const theme = {
  name: "Core",
  primary: "hsl(160 80% 42%)",
  primaryLight: "hsl(160 75% 50%)",
  primaryDark: "hsl(160 90% 22%)",
  primaryBg: "hsl(160 80% 42% / 0.12)",
  gradient: "linear-gradient(135deg, hsl(160 80% 42%), hsl(160 84% 30%), hsl(160 90% 22%))",
  gradientLight: "linear-gradient(135deg, hsl(160 75% 50%), hsl(160 80% 42%))",
  textOnGradient: "hsl(160 30% 98%)",
  levels: [
    { amount: 250, label: "$250" },
    { amount: 500, label: "$500" },
    { amount: 1000, label: "$1,000" },
  ],
  systemLogo: logoC,
};

const ArchitectDashboard = () => <DashboardLayout theme={theme} />;
export default ArchitectDashboard;
