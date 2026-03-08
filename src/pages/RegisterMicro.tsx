import RegisterLayout from "@/components/RegisterLayout";
import bgImage from "@/assets/register-bg-micro.jpg";
import logoF from "@/assets/logo-5050-f.svg";

const theme = {
  name: "Fast",
  primary: "hsl(224, 85%, 58%)",
  gradient: "linear-gradient(135deg, hsl(224 85% 58%), hsl(224 78% 48%), hsl(224 90% 38%))",
  textOnGradient: "hsl(224 30% 98%)",
  dashboardPath: "/dashboard/fast",
  royaltyLevels: [25, 50, 100],
  licensingFee: "$50",
  bgImage,
  systemLogo: logoF,
};

const RegisterMicro = () => <RegisterLayout theme={theme} />;
export default RegisterMicro;
