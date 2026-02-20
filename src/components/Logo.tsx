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
        className="h-36 sm:h-52 w-auto -my-6"
        style={{ mixBlendMode: "screen" }}
      />
    </div>
  );
};

export default Logo;
