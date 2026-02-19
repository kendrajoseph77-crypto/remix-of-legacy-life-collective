import logoIconNobg from "@/assets/logo-icon-nobg.png";

interface LogoProps {
  heightClass?: string;
  className?: string;
}

const Logo = ({ heightClass = "h-10", className = "" }: LogoProps) => {
  // Map height classes to approximate px for font sizing
  const sizeMap: Record<string, string> = {
    "h-8": "text-lg",
    "h-10": "text-xl",
    "h-12": "text-2xl",
    "h-16": "text-3xl",
  };
  const textSize = sizeMap[heightClass] || "text-xl";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img
        src={logoIconNobg}
        alt="Coop5050Life icon"
        className={`${heightClass} w-auto`}
      />
      <span
        className={`font-bold tracking-tight ${textSize}`}
        style={{ color: "#14b8d4", fontFamily: "'Playfair Display', serif" }}
      >
        Coop5050Life
      </span>
    </div>
  );
};

export default Logo;
