import coopLogo from "@/assets/coop5050L-nobg.png";

interface LogoProps {
  className?: string;
  darkBg?: boolean;
}

const Logo = ({ className = "", darkBg = true }: LogoProps) => {
  return (
    <div
      className={`flex items-center ${className}`}
      style={{
        backgroundImage: `url(${coopLogo})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "120px",
        height: "96px",
        mixBlendMode: darkBg ? "screen" : "multiply",
        filter: darkBg ? "brightness(1.1)" : "none",
      }}
      role="img"
      aria-label="5050L logo"
    />
  );
};

export default Logo;
