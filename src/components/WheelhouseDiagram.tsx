const PersonIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 40 50" fill={color} xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-80">
    <circle cx="20" cy="13" r="9" />
    <path d="M4 46c0-8.837 7.163-16 16-16s16 7.163 16 16" />
  </svg>
);

interface NodeProps {
  cx: number;
  cy: number;
  r: number;
  label: string;
  num?: string;
  color: string;
  isCenter?: boolean;
}

const WheelhouseDiagram = () => {
  const aqua = "hsl(181 90% 52%)";
  const coral = "hsl(2 88% 62%)";
  const lime = "hsl(68 100% 50%)";
  const navy = "hsl(210 45% 8%)";
  const card = "hsl(210 40% 12%)";

  // Layout positions (SVG viewBox 500x440)
  const cx = 250; const cy = 220; // center

  const outerNodes = [
    { id: "03", x: 70,  y: 70,  color: aqua },
    { id: "04", x: 430, y: 70,  color: aqua },
    { id: "05", x: 70,  y: 370, color: aqua },
    { id: "06", x: 430, y: 370, color: aqua },
  ];

  const innerNodes = [
    { id: "01", x: cx, y: cy - 90, color: coral },
    { id: "02", x: cx, y: cy + 90, color: lime },
  ];

  const outerR = 52;
  const innerR = 34;
  const centerR = 68;

  // Lines from center to outer corners — L-shaped
  const lineColor = "hsl(181 90% 52% / 0.35)";
  const lineDash = "6 4";

  return (
    <div className="relative w-full max-w-[520px] mx-auto">
      <svg viewBox="0 0 500 440" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <radialGradient id="centerGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(2 88% 62% / 0.3)" />
            <stop offset="100%" stopColor="hsl(210 45% 8% / 0.0)" />
          </radialGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <clipPath id="clip03"><circle cx={70} cy={70} r={outerR - 3} /></clipPath>
          <clipPath id="clip04"><circle cx={430} cy={70} r={outerR - 3} /></clipPath>
          <clipPath id="clip05"><circle cx={70} cy={370} r={outerR - 3} /></clipPath>
          <clipPath id="clip06"><circle cx={430} cy={370} r={outerR - 3} /></clipPath>
          <clipPath id="clipCenter"><circle cx={cx} cy={cy} r={centerR - 4} /></clipPath>
        </defs>

        {/* === CONNECTING LINES (behind nodes) === */}

        {/* Center to 03 (top-left) — L-shape */}
        <path d={`M ${cx} ${cy - centerR} L ${cx} ${70} L ${70 + outerR} ${70}`}
          fill="none" stroke={lineColor} strokeWidth="1.5" strokeDasharray={lineDash} />
        {/* Center to 04 (top-right) */}
        <path d={`M ${cx} ${cy - centerR} L ${cx} ${70} L ${430 - outerR} ${70}`}
          fill="none" stroke={lineColor} strokeWidth="1.5" strokeDasharray={lineDash} />
        {/* Center to 05 (bottom-left) */}
        <path d={`M ${cx} ${cy + centerR} L ${cx} ${370} L ${70 + outerR} ${370}`}
          fill="none" stroke={lineColor} strokeWidth="1.5" strokeDasharray={lineDash} />
        {/* Center to 06 (bottom-right) */}
        <path d={`M ${cx} ${cy + centerR} L ${cx} ${370} L ${430 - outerR} ${370}`}
          fill="none" stroke={lineColor} strokeWidth="1.5" strokeDasharray={lineDash} />

        {/* Center to 01 (top inner) */}
        <line x1={cx} y1={cy - centerR} x2={cx} y2={innerNodes[0].y + innerR}
          stroke="hsl(2 88% 62% / 0.4)" strokeWidth="1.5" strokeDasharray={lineDash} />
        {/* Center to 02 (bottom inner) */}
        <line x1={cx} y1={cy + centerR} x2={cx} y2={innerNodes[1].y - innerR}
          stroke="hsl(68 100% 50% / 0.4)" strokeWidth="1.5" strokeDasharray={lineDash} />

        {/* Corner dots at line bends */}
        <circle cx={cx} cy={70} r="4" fill={aqua} filter="url(#glow)" />
        <circle cx={cx} cy={370} r="4" fill={aqua} filter="url(#glow)" />

        {/* === OUTER NODE 03 — top left === */}
        <circle cx={70} cy={70} r={outerR} fill={card} stroke={aqua} strokeWidth="2.5" />
        {/* Person fill */}
        <rect x={18} y={20} width={104} height={104} fill="hsl(181 90% 52% / 0.12)" clipPath="url(#clip03)" />
        <g clipPath="url(#clip03)" transform="translate(30, 22) scale(1.15)">
          <PersonIcon color={aqua} />
        </g>
        {/* Number badge */}
        <circle cx={28} cy={28} r="13" fill={navy} stroke={aqua} strokeWidth="1.5" />
        <text x={28} y={33} textAnchor="middle" fontSize="9" fontWeight="700" fill={aqua} fontFamily="monospace">03</text>

        {/* === OUTER NODE 04 — top right === */}
        <circle cx={430} cy={70} r={outerR} fill={card} stroke={aqua} strokeWidth="2.5" />
        <g clipPath="url(#clip04)" transform="translate(390, 22) scale(1.15)">
          <PersonIcon color={aqua} />
        </g>
        <circle cx={388} cy={28} r="13" fill={navy} stroke={aqua} strokeWidth="1.5" />
        <text x={388} y={33} textAnchor="middle" fontSize="9" fontWeight="700" fill={aqua} fontFamily="monospace">04</text>

        {/* === OUTER NODE 05 — bottom left === */}
        <circle cx={70} cy={370} r={outerR} fill={card} stroke={aqua} strokeWidth="2.5" />
        <g clipPath="url(#clip05)" transform="translate(30, 322) scale(1.15)">
          <PersonIcon color={aqua} />
        </g>
        <circle cx={28} cy={328} r="13" fill={navy} stroke={aqua} strokeWidth="1.5" />
        <text x={28} y={333} textAnchor="middle" fontSize="9" fontWeight="700" fill={aqua} fontFamily="monospace">05</text>

        {/* === OUTER NODE 06 — bottom right === */}
        <circle cx={430} cy={370} r={outerR} fill={card} stroke={aqua} strokeWidth="2.5" />
        <g clipPath="url(#clip06)" transform="translate(390, 322) scale(1.15)">
          <PersonIcon color={aqua} />
        </g>
        <circle cx={388} cy={328} r="13" fill={navy} stroke={aqua} strokeWidth="1.5" />
        <text x={388} y={333} textAnchor="middle" fontSize="9" fontWeight="700" fill={aqua} fontFamily="monospace">06</text>

        {/* === INNER NODE 01 — above center === */}
        <circle cx={cx} cy={innerNodes[0].y} r={innerR} fill={card} stroke={coral} strokeWidth="2" />
        <g transform={`translate(${cx - 14}, ${innerNodes[0].y - 22}) scale(0.7)`}>
          <PersonIcon color={coral} />
        </g>
        <circle cx={cx - innerR + 4} cy={innerNodes[0].y - innerR + 4} r="11" fill={navy} stroke={coral} strokeWidth="1.5" />
        <text x={cx - innerR + 4} y={innerNodes[0].y - innerR + 9} textAnchor="middle" fontSize="8" fontWeight="700" fill={coral} fontFamily="monospace">01</text>

        {/* === INNER NODE 02 — below center === */}
        <circle cx={cx} cy={innerNodes[1].y} r={innerR} fill={card} stroke={lime} strokeWidth="2" />
        <g transform={`translate(${cx - 14}, ${innerNodes[1].y - 22}) scale(0.7)`}>
          <PersonIcon color={lime} />
        </g>
        <circle cx={cx - innerR + 4} cy={innerNodes[1].y - innerR + 4} r="11" fill={navy} stroke={lime} strokeWidth="1.5" />
        <text x={cx - innerR + 4} y={innerNodes[1].y - innerR + 9} textAnchor="middle" fontSize="8" fontWeight="700" fill={lime} fontFamily="monospace">02</text>

        {/* === CENTER "YOU" CIRCLE === */}
        {/* Outer glow ring */}
        <circle cx={cx} cy={cy} r={centerR + 10} fill="none" stroke="hsl(2 88% 62% / 0.15)" strokeWidth="8" />
        <circle cx={cx} cy={cy} r={centerR + 4} fill="none" stroke="hsl(2 88% 62% / 0.25)" strokeWidth="2" />

        {/* Center bg */}
        <circle cx={cx} cy={cy} r={centerR} fill={card} stroke={coral} strokeWidth="2.5" filter="url(#softGlow)" />

        {/* Pie dividers inside center */}
        <line x1={cx} y1={cy - centerR} x2={cx} y2={cy + centerR} stroke="hsl(210 40% 20%)" strokeWidth="1" />
        <line x1={cx - centerR} y1={cy} x2={cx + centerR} y2={cy} stroke="hsl(210 40% 20%)" strokeWidth="1" />

        {/* Center person icon */}
        <clipPath id="clipCenterPerson"><circle cx={cx} cy={cy} r={centerR - 4} /></clipPath>
        <g clipPath="url(#clipCenterPerson)" transform={`translate(${cx - 28}, ${cy - 36}) scale(1.4)`}>
          <PersonIcon color="hsl(2 88% 70%)" />
        </g>

        {/* YOU label */}
        <rect x={cx - 22} y={cy + 32} width="44" height="20" rx="4" fill="hsl(2 88% 62% / 0.85)" />
        <text x={cx} y={cy + 46} textAnchor="middle" fontSize="11" fontWeight="800" fill="white" fontFamily="sans-serif">YOU</text>
      </svg>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-2 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ background: coral }} />
          <span className="text-muted-foreground">Your Inviter (01)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ background: aqua }} />
          <span className="text-muted-foreground">Team Members</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ background: lime }} />
          <span className="text-muted-foreground">Your Direct (02)</span>
        </div>
      </div>
    </div>
  );
};

export default WheelhouseDiagram;
