import logoCorrect from "@/assets/logo-correct.png";

interface LogoProps {
  heightClass?: string;
  className?: string;
}

const Logo = ({ heightClass = "h-10", className = "" }: LogoProps) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img
        src={logoCorrect}
        alt="Coop5050Life"
        className={`${heightClass} w-auto`}
      />
    </div>
  );
};

export default Logo;
