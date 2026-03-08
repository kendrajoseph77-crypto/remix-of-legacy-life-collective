import DashboardLayout from "@/components/DashboardLayout";
import logoM from "@/assets/logo-5050-m.svg";

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
    { amount: 2500, label: "$2,500" },
    { amount: 5000, label: "$5,000" },
    { amount: 10000, label: "$10,000" },
  ],
  systemLogo: logoM,
};

const Dashboard = () => <DashboardLayout theme={theme} />;
export default Dashboard;
