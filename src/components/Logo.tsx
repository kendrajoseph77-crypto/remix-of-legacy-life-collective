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
        style={{ mixBlendMode: "screen" }}
        className="h-[160px] sm:h-[280px] w-auto"
      />
    </div>
  );
};

export default Logo;
