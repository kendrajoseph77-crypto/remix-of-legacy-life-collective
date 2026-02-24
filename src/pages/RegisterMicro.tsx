import RegisterLayout from "@/components/RegisterLayout";

const theme = {
  name: "Micro",
  primary: "hsl(224, 85%, 58%)",
  gradient: "linear-gradient(135deg, hsl(224 85% 58%), hsl(224 78% 48%), hsl(224 90% 38%))",
  textOnGradient: "hsl(224 30% 98%)",
  dashboardPath: "/dashboard/micro",
  royaltyLevels: [25, 50, 100],
  licensingFee: "$29.99 Every 6 Months",
};

const RegisterMicro = () => <RegisterLayout theme={theme} />;
export default RegisterMicro;
