import logoFull from "@/assets/logo-icon.png";

interface LogoProps {
  heightClass?: string;
  className?: string;
}

/**
 * Logo: gold-gradient globe with aqua figures (from image) + "5050" lime / "Life" white text.
 */
const Logo = ({ heightClass = "h-10", className = "" }: LogoProps) => {
  const textSizes: Record<string, string> = {
    "h-8":  "text-2xl",
    "h-10": "text-3xl",
    "h-12": "text-3xl",
    "h-16": "text-5xl",
  };

  const textSize = textSizes[heightClass] ?? "text-3xl";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Globe icon — screen blend removes the black background naturally */}
      <img
        src={logoFull}
        alt="coop5050Life globe"
        className={`${heightClass} w-auto`}
        style={{ mixBlendMode: "screen" }}
      />
      {/* Text: 5050 lime, Life white */}
      <span className={`${textSize} font-extrabold leading-none`} style={{ fontFamily: "'Playfair Display', serif" }}>
        <span style={{ color: "#14b8d4" }}>5050</span>
        <span className="lime-gradient">Life</span>
      </span>
    </div>
  );
};

export default Logo;

