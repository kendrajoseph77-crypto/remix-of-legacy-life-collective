import logoLife from "@/assets/logo-life.png";

interface LogoProps {
  className?: string;
  /** @deprecated */
  heightClass?: string;
  /** @deprecated */
  height?: number;
}

// The original PNG is 1067×1067. The logo artwork sits in approximately the
// centre of the image, from ~30% to ~70% horizontally and ~35% to ~65% vertically.
// We render it as a background image to precisely crop to just the artwork.
const Logo = ({ className = "" }: LogoProps) => {
  return (
    <div
      className={`shrink-0 ${className}`}
      role="img"
      aria-label="Life logo"
      style={{
        backgroundImage: `url(${logoLife})`,
        // Show only the artwork slice: x 30%-72%, y 34%-65% of the original image
        backgroundPosition: "29% 50%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "210%",
        mixBlendMode: "screen",
        width: "clamp(160px, 20vw, 240px)",
        height: "clamp(58px, 8vw, 84px)",
      }}
    />
  );
};

export default Logo;
