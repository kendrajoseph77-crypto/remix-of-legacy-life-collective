import logoLife from "@/assets/logo-life.png";

interface LogoProps {
  height?: number;
  className?: string;
  /** @deprecated use height instead */
  heightClass?: string;
}

const Logo = ({ height = 220, className = "" }: LogoProps) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img
        src={logoLife}
        alt="Life logo"
        style={{ height: `${height}px`, width: "auto", mixBlendMode: "screen" }}
      />
    </div>
  );
};

export default Logo;
