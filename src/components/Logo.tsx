import logoFull from "@/assets/logo-full.png";

interface LogoProps {
  heightClass?: string;
  className?: string;
}

/**
 * Logo: gold-gradient globe with aqua figures (from image) + "5050" lime / "Life" white text.
 */
const Logo = ({ heightClass = "h-10", className = "" }: LogoProps) => {
  // Approximate globe portion width: the globe takes ~28% of the full image width
  const globeWidths: Record<string, string> = {
    "h-8":  "2.2rem",
    "h-10": "2.8rem",
    "h-12": "3.3rem",
    "h-16": "4.4rem",
  };
  const textSizes: Record<string, string> = {
    "h-8":  "text-2xl",
    "h-10": "text-3xl",
    "h-12": "text-3xl",
    "h-16": "text-5xl",
  };

  const maxW = globeWidths[heightClass] ?? "2.8rem";
  const textSize = textSizes[heightClass] ?? "text-3xl";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Globe icon — clipped to show only the left portion of the full image */}
      <div style={{ position: "relative", overflow: "hidden", flexShrink: 0, display: "flex", alignItems: "center" }}>
        <img
          src={logoFull}
          alt="coop5050Life globe"
          className={`${heightClass} w-auto`}
          style={{ maxWidth: maxW, objectFit: "cover", objectPosition: "left center", filter: "hue-rotate(25deg) saturate(180%) brightness(1.1)" }}
        />
      </div>
      {/* Text: 5050 lime, Life white */}
      <span className={`${textSize} font-extrabold leading-none`} style={{ fontFamily: "'Playfair Display', serif" }}>
        <span style={{ color: "#14b8d4" }}>5050</span>
        <span style={{ background: "linear-gradient(135deg, hsl(68 100% 50%), hsl(80 100% 55%))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Life</span>
      </span>
    </div>
  );
};

export default Logo;

