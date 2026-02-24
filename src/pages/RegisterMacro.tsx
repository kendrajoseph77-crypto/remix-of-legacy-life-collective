import RegisterLayout from "@/components/RegisterLayout";

const theme = {
  name: "Macro",
  primary: "hsl(160, 80%, 42%)",
  gradient: "linear-gradient(135deg, hsl(160 80% 42%), hsl(160 84% 30%), hsl(160 90% 22%))",
  textOnGradient: "hsl(160 30% 98%)",
  dashboardPath: "/dashboard/macro",
  royaltyLevels: [250, 500, 1000],
  licensingFee: "$49.99 Every 6 Months",
};

const RegisterMacro = () => <RegisterLayout theme={theme} />;
export default RegisterMacro;
