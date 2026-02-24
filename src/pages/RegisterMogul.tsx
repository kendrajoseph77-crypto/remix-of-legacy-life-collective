import RegisterLayout from "@/components/RegisterLayout";

const theme = {
  name: "Mogul",
  primary: "hsl(40, 72%, 50%)",
  gradient: "linear-gradient(135deg, hsl(42 80% 58%), hsl(38 75% 48%), hsl(34 85% 40%))",
  textOnGradient: "hsl(38 30% 10%)",
  dashboardPath: "/dashboard",
  royaltyLevels: [2500, 5000, 10000],
};

const RegisterMogul = () => <RegisterLayout theme={theme} />;
export default RegisterMogul;
