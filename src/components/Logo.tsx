import logoGlobeIcon from "@/assets/logo-globe-icon.png";

interface LogoProps {
  heightClass?: string;
  className?: string;
}

const Logo = ({ heightClass = "h-10", className = "" }: LogoProps) => {
  // Derive a text size from the heightClass so they scale together
  const textSizeMap: Record<string, string> = {
    "h-8": "text-xl",
    "h-10": "text-2xl",
    "h-12": "text-3xl",
    "h-14": "text-4xl",
    "h-16": "text-4xl",
    "h-12 sm:h-16": "text-3xl sm:text-4xl",
  };
  const textSize = textSizeMap[heightClass] ?? "text-2xl";

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <img
        src={logoGlobeIcon}
        alt="Coop Life globe icon"
        className={`${heightClass} w-auto`}
      />
      <span
        className={`font-black tracking-tight leading-none ${textSize}`}
        style={{
          fontFamily: "'Playfair Display', serif",
          color: "hsl(var(--secondary))",
        }}
      >
        Life
      </span>
    </div>
  );
};

export default Logo;
