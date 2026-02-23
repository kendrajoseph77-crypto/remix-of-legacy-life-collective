import coopLogo from "@/assets/logo-5050l-transparent.png";

interface LogoProps {
  className?: string;
  darkBg?: boolean;
}

const Logo = ({ className = "", darkBg = true }: LogoProps) => {
  return (
    <img
      src={coopLogo}
      alt="5050L logo"
      className={`h-20 sm:h-24 w-auto ${className}`}
      style={{
        filter: darkBg ? "drop-shadow(0 0 8px rgba(0,0,0,0.3))" : "none",
      }}
    />
  );
};

export default Logo;
