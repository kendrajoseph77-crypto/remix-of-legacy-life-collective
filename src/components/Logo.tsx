import logoFull from "@/assets/logo-full.png";

interface LogoProps {
  heightClass?: string; // e.g. "h-10"
  className?: string;
}

/**
 * Renders the original coop5050Life logo recolored via CSS:
 *  - Globe + figures + text all shifted to aqua (close to brand aqua #14f1f4)
 * Then overlays "5050" lime / "Life" white as a CSS text layer on top.
 *
 * We achieve the split color by rendering the image filtered to aqua for
 * the globe/figures, and using a separate text lockup for "5050Life".
 */
const Logo = ({ heightClass = "h-10", className = "" }: LogoProps) => {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      {/* Globe only: clip to left portion of the full image */}
      <div
        style={{
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          src={logoFull}
          alt="coop5050Life"
          className={`${heightClass} w-auto object-cover object-left`}
          style={{
            // Show roughly the left 27% — the globe portion of the wide logo
            maxWidth: "calc(var(--logo-h, 2.5rem) * 1.05)",
            filter: "hue-rotate(-5deg) saturate(1.3) brightness(1.1)",
          }}
        />
      </div>
      {/* Text lockup: 5050 in lime, Life in white */}
      <span
        className={`font-extrabold leading-none ${heightClass === "h-8" ? "text-2xl" : heightClass === "h-16" ? "text-5xl" : "text-3xl"}`}
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        <span style={{ color: "hsl(var(--lime))" }}>5050</span>
        <span style={{ color: "#ffffff" }}>Life</span>
      </span>
    </div>
  );
};

export default Logo;
