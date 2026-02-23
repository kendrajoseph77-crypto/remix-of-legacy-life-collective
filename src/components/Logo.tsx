import logoGold from "@/assets/logo-gold-5050l.png";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark";
}

const Logo = ({ className = "" }: LogoProps) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img
        src={logoGold}
        alt="5050L logo"
        className="h-20 sm:h-24 w-auto"
        style={{ mixBlendMode: "screen" }}
      />
    </div>
  );
};

export default Logo;
