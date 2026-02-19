interface LogoProps {
  heightClass?: string;
  className?: string;
}

const Logo = ({ heightClass = "h-10", className = "" }: LogoProps) => {
  const sizeMap: Record<string, number> = {
    "h-8": 32,
    "h-10": 40,
    "h-12": 48,
    "h-16": 64,
  };
  const h = sizeMap[heightClass] ?? 40;
  const textSizeMap: Record<string, string> = {
    "h-8": "text-xl",
    "h-10": "text-2xl",
    "h-12": "text-3xl",
    "h-16": "text-4xl",
  };
  const textSize = textSizeMap[heightClass] ?? "text-2xl";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* SVG Globe with people — lime globe, aqua people */}
      <svg
        width={h}
        height={h}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Globe crescent — lime */}
        <g stroke="#8fce00" strokeWidth="4" fill="none">
          {/* Outer arc */}
          <path d="M 20,10 A 45,45 0 1,1 20,90" />
          {/* Bottom arc */}
          <path d="M 20,10 Q 65,50 20,90" />
          {/* Grid lines horizontal */}
          <path d="M 18,30 Q 60,33 65,50 Q 60,67 18,70" />
          {/* Grid line vertical middle */}
          <line x1="42" y1="10" x2="42" y2="90" />
        </g>

        {/* Person 1 (left) — aqua */}
        <g fill="#14b8d4">
          <circle cx="22" cy="34" r="5" />
          <path d="M17,42 Q22,55 27,42 Z" />
          <line x1="22" y1="47" x2="22" y2="62" stroke="#14b8d4" strokeWidth="4" strokeLinecap="round"/>
          <line x1="22" y1="62" x2="17" y2="74" stroke="#14b8d4" strokeWidth="3.5" strokeLinecap="round"/>
          <line x1="22" y1="62" x2="27" y2="74" stroke="#14b8d4" strokeWidth="3.5" strokeLinecap="round"/>
          <line x1="17" y1="52" x2="10" y2="58" stroke="#14b8d4" strokeWidth="3" strokeLinecap="round"/>
        </g>

        {/* Person 2 (center) — aqua */}
        <g fill="#14b8d4">
          <circle cx="42" cy="32" r="5.5" />
          <path d="M36,40 Q42,54 48,40 Z" />
          <line x1="42" y1="45" x2="42" y2="62" stroke="#14b8d4" strokeWidth="4.5" strokeLinecap="round"/>
          <line x1="42" y1="62" x2="36" y2="75" stroke="#14b8d4" strokeWidth="4" strokeLinecap="round"/>
          <line x1="42" y1="62" x2="48" y2="75" stroke="#14b8d4" strokeWidth="4" strokeLinecap="round"/>
          <line x1="36" y1="50" x2="27" y2="56" stroke="#14b8d4" strokeWidth="3" strokeLinecap="round"/>
          <line x1="48" y1="50" x2="57" y2="56" stroke="#14b8d4" strokeWidth="3" strokeLinecap="round"/>
        </g>

        {/* Person 3 (right) — aqua */}
        <g fill="#14b8d4">
          <circle cx="62" cy="34" r="5" />
          <path d="M57,42 Q62,55 67,42 Z" />
          <line x1="62" y1="47" x2="62" y2="62" stroke="#14b8d4" strokeWidth="4" strokeLinecap="round"/>
          <line x1="62" y1="62" x2="57" y2="74" stroke="#14b8d4" strokeWidth="3.5" strokeLinecap="round"/>
          <line x1="62" y1="62" x2="67" y2="74" stroke="#14b8d4" strokeWidth="3.5" strokeLinecap="round"/>
          <line x1="67" y1="52" x2="74" y2="58" stroke="#14b8d4" strokeWidth="3" strokeLinecap="round"/>
        </g>
      </svg>

      {/* Text: 5050 aqua, Life lime */}
      <span className={`${textSize} font-extrabold leading-none tracking-tight`} style={{ fontFamily: "'Playfair Display', serif" }}>
        <span style={{ color: "#14b8d4" }}>5050</span>
        <span className="lime-gradient">Life</span>
      </span>
    </div>
  );
};

export default Logo;
