import logoLife from "@/assets/logo-life.png";

interface LogoProps {
  heightClass?: string;
  className?: string;
}

const Logo = ({ heightClass, className = "" }: LogoProps) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img
        src={logoLife}
        alt="Life logo"
        className={`w-auto ${heightClass ?? ""}`}
        style={{ mixBlendMode: "screen", height: heightClass ? undefined : "220px" }}
      />
    </div>
  );
};

export default Logo;
