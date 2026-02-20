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
        className="h-32 sm:h-48 w-auto -my-10 sm:-my-16"
        style={{ mixBlendMode: "screen" }}
      />
    </div>
  );
};

export default Logo;
