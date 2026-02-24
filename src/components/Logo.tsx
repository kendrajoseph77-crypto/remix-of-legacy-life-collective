import logo from "@/assets/logo-new.png";

interface LogoProps {
  className?: string;
  darkBg?: boolean;
}

const Logo = ({ className = "", darkBg = true }: LogoProps) => {
  return (
    <img
      src={logo}
      alt="5050L logo"
      className={`w-auto ${className}`}
      style={{ height: darkBg ? "72px" : "60px" }}
    />
  );
};

export default Logo;
