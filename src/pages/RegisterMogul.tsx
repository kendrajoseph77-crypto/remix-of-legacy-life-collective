import RegisterLayout from "@/components/RegisterLayout";
import bgImage from "@/assets/register-bg-mogul.jpg";

const theme = {
  name: "Mogul",
  primary: "hsl(36, 65%, 42%)",
  gradient: "linear-gradient(135deg, hsl(40 55% 55%), hsl(36 65% 42%), hsl(30 75% 30%))",
  textOnGradient: "hsl(35 30% 95%)",
  dashboardPath: "/dashboard",
  royaltyLevels: [2500, 5000, 10000],
  licensingFee: "$250",
  bgImage,
};

const RegisterMogul = () => <RegisterLayout theme={theme} />;
export default RegisterMogul;
