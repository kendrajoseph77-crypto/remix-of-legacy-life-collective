import logo from "@/assets/logo-5050.svg";

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
      style={{ height: darkBg ? "360px" : "120px" }}
    />
  );
};

export default Logo;
