import RegisterLayout from "@/components/RegisterLayout";
import bgImage from "@/assets/register-bg-mogul.jpg";

const theme = {
  name: "Mogul",
  primary: "hsl(39, 55%, 52%)",
  gradient: "linear-gradient(135deg, hsl(41 50% 65%), hsl(39 55% 52%), hsl(35 55% 40%))",
  textOnGradient: "hsl(35 30% 10%)",
  dashboardPath: "/dashboard",
  royaltyLevels: [2500, 5000, 10000],
  licensingFee: "$250",
  bgImage,
};

const RegisterMogul = () => <RegisterLayout theme={theme} />;
export default RegisterMogul;
