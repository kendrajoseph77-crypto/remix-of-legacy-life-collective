import globePeople from "@/assets/logo-globe-people.png";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark";
}

const Logo = ({ className = "", variant = "dark" }: LogoProps) => {
  const isLight = variant === "light";

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <img
        src={globePeople}
        alt="Coop5050L globe"
        className="h-9 sm:h-11 w-auto"
        style={{
          filter: isLight
            ? "brightness(0) invert(1)"
            : "none",
        }}
      />
      <span
        className="text-2xl sm:text-3xl font-bold tracking-tight"
        style={{
          color: isLight ? "white" : "hsl(220 30% 15%)",
          fontFamily: "'Playfair Display', 'Plus Jakarta Sans', serif",
        }}
      >
        5050L
      </span>
    </div>
  );
};

export default Logo;
