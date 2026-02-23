import globeIcon from "@/assets/logo-globe-icon.png";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark";
}

const Logo = ({ className = "", variant = "dark" }: LogoProps) => {
  const textColor = variant === "light" ? "white" : "hsl(220 30% 15%)";

  return (
    <div className={`flex items-center ${className}`}>
      <div
        className="h-8 sm:h-11 -mr-0.5"
        style={{ overflow: "hidden", display: "flex", alignItems: "center" }}
      >
        <img
          src={globeIcon}
          alt="Coop5050L globe icon"
          className="h-12 sm:h-16 w-auto"
          style={{
            mixBlendMode: variant === "light" ? "screen" : "multiply",
            filter: variant === "light"
              ? "brightness(1.5) saturate(0.8)"
              : "saturate(1.2)",
            marginTop: "-2px",
          }}
        />
      </div>
      <span
        className="text-2xl sm:text-3xl font-bold tracking-tight"
        style={{ color: textColor, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        5050<span style={{ color: "hsl(180 80% 45%)" }}>L</span>
      </span>
    </div>
  );
};

export default Logo;
