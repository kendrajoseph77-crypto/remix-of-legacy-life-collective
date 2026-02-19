import logoOriginal from "@/assets/logo-original.png";

interface LogoProps {
  heightClass?: string;
  className?: string;
}

const Logo = ({ heightClass = "h-10", className = "" }: LogoProps) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img
        src={logoOriginal}
        alt="Coop5050Life"
        className={`${heightClass} w-auto`}
        style={{ mixBlendMode: "multiply" }}
      />
    </div>
  );
};

export default Logo;
