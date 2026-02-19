import logoLife from "@/assets/logo-life.png";

interface LogoProps {
  heightClass?: string;
  className?: string;
}

const Logo = ({ heightClass = "h-10", className = "" }: LogoProps) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img
        src={logoLife}
        alt="Life logo"
        className={`${heightClass} w-auto`}
        style={{ mixBlendMode: "screen" }}
      />
    </div>
  );
};

export default Logo;
