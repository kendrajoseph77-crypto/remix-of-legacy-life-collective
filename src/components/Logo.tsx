import logoRecolored from "@/assets/logo-recolored.png";

interface LogoProps {
  heightClass?: string;
  className?: string;
}

const Logo = ({ heightClass = "h-10", className = "" }: LogoProps) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img
        src={logoRecolored}
        alt="Coop5050Life"
        className={`${heightClass} w-auto`}
      />
    </div>
  );
};

export default Logo;
