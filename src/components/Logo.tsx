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
    <div className={`flex items-center overflow-hidden ${className}`}>
      <img
        src={logoLife}
        alt="Life logo"
        className="h-16 sm:h-24 w-auto -my-4"
        style={{ mixBlendMode: "screen" }}
      />
    </div>
  );
};

export default Logo;
