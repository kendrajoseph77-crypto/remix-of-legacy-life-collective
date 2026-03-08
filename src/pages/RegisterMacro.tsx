import RegisterLayout from "@/components/RegisterLayout";
import bgImage from "@/assets/register-bg-macro.jpg";
import logoC from "@/assets/logo-5050-c.svg";

const theme = {
  name: "Core",
  primary: "hsl(160, 80%, 42%)",
  gradient: "linear-gradient(135deg, hsl(160 80% 42%), hsl(160 84% 30%), hsl(160 90% 22%))",
  textOnGradient: "hsl(160 30% 98%)",
  dashboardPath: "/dashboard/core",
  royaltyLevels: [250, 500, 1000],
  licensingFee: "$100",
  bgImage,
  systemLogo: logoC,
};

const RegisterMacro = () => <RegisterLayout theme={theme} />;
export default RegisterMacro;
