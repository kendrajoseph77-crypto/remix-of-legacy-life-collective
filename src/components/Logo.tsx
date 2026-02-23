import coopLogo from "@/assets/logo-gold-new.png";

interface LogoProps {
  className?: string;
  darkBg?: boolean;
}

const Logo = ({ className = "", darkBg = true }: LogoProps) => {
  return (
    <img
      src={coopLogo}
      alt="5050L logo"
      className={`w-auto ${className}`}
      style={{
        height: "360px",
        mixBlendMode: darkBg ? "screen" : "multiply",
        filter: darkBg ? "brightness(1.2)" : "none",
      }}
    />
  );
};

export default Logo;
