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
        className="h-16 sm:h-24 w-auto -my-5 sm:-my-8"
        style={{ mixBlendMode: "screen", filter: "hue-rotate(150deg) saturate(2) brightness(1.4)" }}
      />
    </div>
  );
};

export default Logo;
