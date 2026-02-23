import logoGold from "@/assets/logo-gold-5050l.png";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark";
}

const Logo = ({ className = "", variant = "dark" }: LogoProps) => {
  const isLight = variant === "light";

  return (
    <div className={`flex items-center ${className}`}>
      <img
        src={logoGold}
        alt="5050L logo"
        className="h-10 sm:h-12 w-auto"
        style={{
          mixBlendMode: isLight ? "screen" : "multiply",
          filter: isLight ? "brightness(1.3)" : "none",
        }}
      />
    </div>
  );
};

export default Logo;
