import globeIcon from "@/assets/logo-globe-icon.png";

interface LogoProps {
  className?: string;
}

const Logo = ({ className = "" }: LogoProps) => {
  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      <img
        src={globeIcon}
        alt="5050 globe icon"
        className="h-9 sm:h-11 w-auto"
        style={{
          mixBlendMode: "screen",
          filter: "sepia(1) saturate(3) hue-rotate(-10deg) brightness(0.85)",
        }}
      />
      <span
        className="text-xl sm:text-2xl font-bold tracking-tight"
        style={{
          background: "linear-gradient(135deg, hsl(38 70% 60%), hsl(38 65% 75%), hsl(38 70% 60%))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          fontFamily: "'Playfair Display', serif",
        }}
      >
        5050L
      </span>
    </div>
  );
};

export default Logo;
