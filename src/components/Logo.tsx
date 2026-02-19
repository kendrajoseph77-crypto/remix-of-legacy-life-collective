import logoLife from "@/assets/logo-life.png";

interface LogoProps {
  className?: string;
  /** @deprecated */
  heightClass?: string;
  /** @deprecated */
  height?: number;
}

const Logo = ({ className = "" }: LogoProps) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img
        src={logoLife}
        alt="Life logo"
        className="h-8 sm:h-11 w-auto"
        style={{ mixBlendMode: "screen" }}
      />
    </div>
  );
};

export default Logo;
