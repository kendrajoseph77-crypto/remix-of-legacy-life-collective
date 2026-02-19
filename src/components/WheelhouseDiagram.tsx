// Real person photo avatars — diverse Black and Brown representation
const avatarUrls = [
  "https://randomuser.me/api/portraits/men/83.jpg",   // center YOU  — Black man
  "https://randomuser.me/api/portraits/women/92.jpg", // 01 inviter  — Black woman
  "https://randomuser.me/api/portraits/men/6.jpg",    // 02 direct   — Brown man
  "https://randomuser.me/api/portraits/women/95.jpg", // 03          — Black woman
  "https://randomuser.me/api/portraits/men/11.jpg",   // 04          — Brown man
  "https://randomuser.me/api/portraits/women/74.jpg", // 05          — Brown woman
  "https://randomuser.me/api/portraits/men/36.jpg",   // 06          — Black man
];

const WheelhouseDiagram = () => {
  const aqua = "hsl(181 90% 52%)";
  const coral = "hsl(2 88% 62%)";
  const lime = "hsl(68 100% 50%)";
  const navy = "hsl(210 45% 8%)";
  const card = "hsl(210 40% 12%)";

  const cx = 250; const cy = 220;

  const outerR = 52;
  const innerR = 34;
  const centerR = 68;

  const lineColor = "hsl(181 90% 52% / 0.35)";
  const lineDash = "6 4";

  return (
    <div className="relative w-full max-w-[520px] mx-auto">
      <svg viewBox="0 0 500 440" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="hsl(0 0% 0% / 0.5)" />
          </filter>

          {/* Clip paths for circular photo crops */}
          <clipPath id="clip03"><circle cx={70} cy={70} r={outerR - 4} /></clipPath>
          <clipPath id="clip04"><circle cx={430} cy={70} r={outerR - 4} /></clipPath>
          <clipPath id="clip05"><circle cx={70} cy={370} r={outerR - 4} /></clipPath>
          <clipPath id="clip06"><circle cx={430} cy={370} r={outerR - 4} /></clipPath>
          <clipPath id="clip01"><circle cx={cx} cy={cy - 90} r={innerR - 3} /></clipPath>
          <clipPath id="clip02"><circle cx={cx} cy={cy + 90} r={innerR - 3} /></clipPath>
          <clipPath id="clipCenter"><circle cx={cx} cy={cy} r={centerR - 4} /></clipPath>
        </defs>

        {/* === CONNECTING LINES === */}
        <path d={`M ${cx} ${cy - centerR} L ${cx} ${70} L ${70 + outerR} ${70}`}
          fill="none" stroke={lineColor} strokeWidth="1.5" strokeDasharray={lineDash} />
        <path d={`M ${cx} ${cy - centerR} L ${cx} ${70} L ${430 - outerR} ${70}`}
          fill="none" stroke={lineColor} strokeWidth="1.5" strokeDasharray={lineDash} />
        <path d={`M ${cx} ${cy + centerR} L ${cx} ${370} L ${70 + outerR} ${370}`}
          fill="none" stroke={lineColor} strokeWidth="1.5" strokeDasharray={lineDash} />
        <path d={`M ${cx} ${cy + centerR} L ${cx} ${370} L ${430 - outerR} ${370}`}
          fill="none" stroke={lineColor} strokeWidth="1.5" strokeDasharray={lineDash} />

        <line x1={cx} y1={cy - centerR} x2={cx} y2={cy - 90 + innerR}
          stroke="hsl(68 100% 50% / 0.4)" strokeWidth="1.5" strokeDasharray={lineDash} />
        <line x1={cx} y1={cy + centerR} x2={cx} y2={cy + 90 - innerR}
          stroke="hsl(68 100% 50% / 0.4)" strokeWidth="1.5" strokeDasharray={lineDash} />

        {/* Corner bend dots */}
        <circle cx={cx} cy={70} r="4" fill={aqua} filter="url(#glow)" />
        <circle cx={cx} cy={370} r="4" fill={aqua} filter="url(#glow)" />

        {/* === OUTER NODE 03 — top left === */}
        <circle cx={70} cy={70} r={outerR} fill={card} stroke={aqua} strokeWidth="2.5" />
        <image href={avatarUrls[3]} x={70 - outerR + 4} y={70 - outerR + 4}
          width={(outerR - 4) * 2} height={(outerR - 4) * 2} clipPath="url(#clip03)" preserveAspectRatio="xMidYMid slice" />
        <circle cx={70} cy={70} r={outerR} fill="none" stroke={aqua} strokeWidth="2.5" />
        <circle cx={28} cy={28} r="13" fill={navy} stroke={aqua} strokeWidth="1.5" />
        <text x={28} y={33} textAnchor="middle" fontSize="9" fontWeight="700" fill={aqua} fontFamily="monospace">03</text>

        {/* === OUTER NODE 04 — top right === */}
        <circle cx={430} cy={70} r={outerR} fill={card} stroke={aqua} strokeWidth="2.5" />
        <image href={avatarUrls[4]} x={430 - outerR + 4} y={70 - outerR + 4}
          width={(outerR - 4) * 2} height={(outerR - 4) * 2} clipPath="url(#clip04)" preserveAspectRatio="xMidYMid slice" />
        <circle cx={430} cy={70} r={outerR} fill="none" stroke={aqua} strokeWidth="2.5" />
        <circle cx={388} cy={28} r="13" fill={navy} stroke={aqua} strokeWidth="1.5" />
        <text x={388} y={33} textAnchor="middle" fontSize="9" fontWeight="700" fill={aqua} fontFamily="monospace">04</text>

        {/* === OUTER NODE 05 — bottom left === */}
        <circle cx={70} cy={370} r={outerR} fill={card} stroke={aqua} strokeWidth="2.5" />
        <image href={avatarUrls[5]} x={70 - outerR + 4} y={370 - outerR + 4}
          width={(outerR - 4) * 2} height={(outerR - 4) * 2} clipPath="url(#clip05)" preserveAspectRatio="xMidYMid slice" />
        <circle cx={70} cy={370} r={outerR} fill="none" stroke={aqua} strokeWidth="2.5" />
        <circle cx={28} cy={328} r="13" fill={navy} stroke={aqua} strokeWidth="1.5" />
        <text x={28} y={333} textAnchor="middle" fontSize="9" fontWeight="700" fill={aqua} fontFamily="monospace">05</text>

        {/* === OUTER NODE 06 — bottom right === */}
        <circle cx={430} cy={370} r={outerR} fill={card} stroke={aqua} strokeWidth="2.5" />
        <image href={avatarUrls[6]} x={430 - outerR + 4} y={370 - outerR + 4}
          width={(outerR - 4) * 2} height={(outerR - 4) * 2} clipPath="url(#clip06)" preserveAspectRatio="xMidYMid slice" />
        <circle cx={430} cy={370} r={outerR} fill="none" stroke={aqua} strokeWidth="2.5" />
        <circle cx={388} cy={328} r="13" fill={navy} stroke={aqua} strokeWidth="1.5" />
        <text x={388} y={333} textAnchor="middle" fontSize="9" fontWeight="700" fill={aqua} fontFamily="monospace">06</text>

        {/* === INNER NODE 01 — above center (Inviter) === */}
        <circle cx={cx} cy={cy - 90} r={innerR} fill={card} stroke={lime} strokeWidth="2.5" />
        <image href={avatarUrls[1]} x={cx - innerR + 3} y={cy - 90 - innerR + 3}
          width={(innerR - 3) * 2} height={(innerR - 3) * 2} clipPath="url(#clip01)" preserveAspectRatio="xMidYMid slice" />
        <circle cx={cx} cy={cy - 90} r={innerR} fill="none" stroke={lime} strokeWidth="2.5" filter="url(#glow)" />
        <circle cx={cx - innerR + 4} cy={cy - 90 - innerR + 4} r="11" fill={navy} stroke={lime} strokeWidth="1.5" />
        <text x={cx - innerR + 4} y={cy - 90 - innerR + 9} textAnchor="middle" fontSize="8" fontWeight="700" fill={lime} fontFamily="monospace">01</text>

        {/* === INNER NODE 02 — below center (Your Direct) === */}
        <circle cx={cx} cy={cy + 90} r={innerR} fill={card} stroke={lime} strokeWidth="2.5" />
        <image href={avatarUrls[2]} x={cx - innerR + 3} y={cy + 90 - innerR + 3}
          width={(innerR - 3) * 2} height={(innerR - 3) * 2} clipPath="url(#clip02)" preserveAspectRatio="xMidYMid slice" />
        <circle cx={cx} cy={cy + 90} r={innerR} fill="none" stroke={lime} strokeWidth="2.5" filter="url(#glow)" />
        {/* Badge moved to bottom-left to avoid center glow overlap */}
        <circle cx={cx - innerR + 4} cy={cy + 90 + innerR - 4} r="11" fill={navy} stroke={lime} strokeWidth="1.5" />
        <text x={cx - innerR + 4} y={cy + 90 + innerR + 1} textAnchor="middle" fontSize="8" fontWeight="700" fill={lime} fontFamily="monospace">02</text>

        {/* === CENTER "YOU" CIRCLE === */}
        {/* Glow rings */}
        <circle cx={cx} cy={cy} r={centerR + 10} fill="none" stroke="hsl(2 88% 62% / 0.15)" strokeWidth="8" />
        <circle cx={cx} cy={cy} r={centerR + 4} fill="none" stroke="hsl(2 88% 62% / 0.3)" strokeWidth="2" />

        {/* Center photo */}
        <circle cx={cx} cy={cy} r={centerR} fill={card} stroke={coral} strokeWidth="3" filter="url(#softGlow)" />
        <image href={avatarUrls[0]} x={cx - centerR + 4} y={cy - centerR + 4}
          width={(centerR - 4) * 2} height={(centerR - 4) * 2} clipPath="url(#clipCenter)" preserveAspectRatio="xMidYMid slice" />
        <circle cx={cx} cy={cy} r={centerR} fill="none" stroke={coral} strokeWidth="3" filter="url(#glow)" />

        {/* YOU label */}
        <rect x={cx - 22} y={cy + centerR - 26} width="44" height="20" rx="4" fill="hsl(2 88% 62% / 0.92)" />
        <text x={cx} y={cy + centerR - 12} textAnchor="middle" fontSize="11" fontWeight="800" fill="white" fontFamily="sans-serif">YOU</text>
      </svg>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-2 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ background: lime }} />
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
