// Real person photo avatars — diverse Black and Brown representation
const avatarUrls = [
  "https://randomuser.me/api/portraits/men/83.jpg",   // 0: center YOU
  "https://randomuser.me/api/portraits/women/92.jpg", // 1: 01
  "https://randomuser.me/api/portraits/men/6.jpg",    // 2: 02
  "https://randomuser.me/api/portraits/women/95.jpg", // 3: 03
  "https://randomuser.me/api/portraits/men/11.jpg",   // 4: 04
  "https://randomuser.me/api/portraits/women/74.jpg", // 5: 05
  "https://randomuser.me/api/portraits/men/36.jpg",   // 6: 06
];

const WheelhouseDiagram = () => {
  const aqua  = "hsl(181 90% 52%)";
  const coral = "hsl(2 88% 62%)";
  const lime  = "hsl(68 100% 50%)";
  const navy  = "hsl(210 45% 8%)";
  const card  = "hsl(210 40% 12%)";

  const cx = 250, cy = 250;
  const centerR = 54;
  const orbitR = 140;       // radius of the circular arrangement
  const nodeR = 38;         // all outer nodes same size
  const badgeR = 13;

  // Place 6 nodes evenly around a circle (starting from top, going clockwise)
  const nodes = [
    { label: "01", avatarIdx: 1, color: lime,  isDirect: true },
    { label: "02", avatarIdx: 2, color: lime,  isDirect: true },
    { label: "03", avatarIdx: 3, color: aqua,  isDirect: false },
    { label: "04", avatarIdx: 4, color: aqua,  isDirect: false },
    { label: "05", avatarIdx: 5, color: aqua,  isDirect: false },
    { label: "06", avatarIdx: 6, color: aqua,  isDirect: false },
  ].map((n, i) => {
    const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2; // start from top
    return {
      ...n,
      x: cx + orbitR * Math.cos(angle),
      y: cy + orbitR * Math.sin(angle),
    };
  });

  return (
    <div className="relative w-full max-w-[540px] mx-auto">
      <p className="text-center text-sm font-bold tracking-widest uppercase mb-2" style={{ color: aqua }}>
        2 × 2 Wheelhouse
      </p>

      <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <filter id="wh-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="wh-softGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <marker id="arrow-lime" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <polygon points="0 0, 7 3.5, 0 7" fill={lime} opacity="0.9" />
          </marker>
          <marker id="arrow-aqua" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <polygon points="0 0, 7 3.5, 0 7" fill={aqua} opacity="0.9" />
          </marker>
          <clipPath id="wh-clipCenter">
            <circle cx={cx} cy={cy} r={centerR - 4} />
          </clipPath>
          {nodes.map((n, i) => (
            <clipPath key={`clip-${i}`} id={`wh-clip-${i}`}>
              <circle cx={n.x} cy={n.y} r={nodeR - 3} />
            </clipPath>
          ))}
        </defs>

        {/* ── Orbit ring (the "wheel" circle) ── */}
        <circle cx={cx} cy={cy} r={orbitR} fill="none" stroke="hsl(181 90% 52% / 0.12)" strokeWidth="1.5" />
        <circle cx={cx} cy={cy} r={orbitR} fill="none" stroke="hsl(181 90% 52% / 0.06)" strokeWidth="8" />

        {/* ── Connector lines from each node to center ── */}
        {nodes.map((n, i) => {
          const angle = Math.atan2(n.y - cy, n.x - cx);
          const startX = n.x - (nodeR + 4) * Math.cos(angle);
          const startY = n.y - (nodeR + 4) * Math.sin(angle);
          const endX = cx + (centerR + 10) * Math.cos(angle);
          const endY = cy + (centerR + 10) * Math.sin(angle);
          const markerId = n.isDirect ? "url(#arrow-lime)" : "url(#arrow-aqua)";
          const strokeColor = n.isDirect ? "hsl(68 100% 50% / 0.45)" : "hsl(181 90% 52% / 0.35)";

          return (
            <line
              key={`line-${i}`}
              x1={startX} y1={startY}
              x2={endX} y2={endY}
              stroke={strokeColor}
              strokeWidth="1.8"
              markerEnd={markerId}
            />
          );
        })}

        {/* ── Outer nodes ── */}
        {nodes.map((n, i) => {
          const badgeAngle = -Math.PI / 4;
          const badgeX = n.x + (nodeR - 2) * Math.cos(badgeAngle);
          const badgeY = n.y + (nodeR - 2) * Math.sin(badgeAngle);

          return (
            <g key={`node-${i}`}>
              <circle cx={n.x} cy={n.y} r={nodeR} fill={card} stroke={n.color} strokeWidth="2.5" />
              <image
                href={avatarUrls[n.avatarIdx]}
                x={n.x - nodeR + 3} y={n.y - nodeR + 3}
                width={(nodeR - 3) * 2} height={(nodeR - 3) * 2}
                clipPath={`url(#wh-clip-${i})`}
                preserveAspectRatio="xMidYMid slice"
              />
              <circle cx={n.x} cy={n.y} r={nodeR} fill="none" stroke={n.color} strokeWidth="2.5" filter="url(#wh-glow)" />
              {/* Badge */}
              <circle cx={badgeX} cy={badgeY} r={badgeR} fill={navy} stroke={n.color} strokeWidth="1.5" />
              <text x={badgeX} y={badgeY + 4} textAnchor="middle" fontSize="7.5" fontWeight="800" fill={n.color} fontFamily="monospace">
                {n.label}
              </text>
              {/* 50% pill */}
              <rect x={n.x - 20} y={n.y + nodeR + 4} width="40" height="16" rx="8"
                fill={navy} stroke={n.color} strokeWidth="1.2" />
              <text x={n.x} y={n.y + nodeR + 15} textAnchor="middle" fontSize="8" fontWeight="800"
                fill={n.color} fontFamily="monospace">
                50%
              </text>
            </g>
          );
        })}

        {/* ── Center YOU circle ── */}
        <circle cx={cx} cy={cy} r={centerR + 14} fill="none" stroke="hsl(2 88% 62% / 0.08)" strokeWidth="12" />
        <circle cx={cx} cy={cy} r={centerR + 4}  fill="none" stroke="hsl(2 88% 62% / 0.22)" strokeWidth="2" />
        <circle cx={cx} cy={cy} r={centerR} fill={card} stroke={coral} strokeWidth="3" filter="url(#wh-softGlow)" />
        <image
          href={avatarUrls[0]}
          x={cx - centerR + 4} y={cy - centerR + 4}
          width={(centerR - 4) * 2} height={(centerR - 4) * 2}
          clipPath="url(#wh-clipCenter)"
          preserveAspectRatio="xMidYMid slice"
        />
        <circle cx={cx} cy={cy} r={centerR} fill="none" stroke={coral} strokeWidth="3" filter="url(#wh-glow)" />

        {/* YOU label */}
        <rect x={cx - 22} y={cy + centerR - 24} width="44" height="19" rx="4" fill="hsl(2 88% 62% / 0.92)" />
        <text x={cx} y={cy + centerR - 11} textAnchor="middle" fontSize="11" fontWeight="800" fill="white" fontFamily="sans-serif">YOU</text>
      </svg>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-1 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full border-2" style={{ background: coral, borderColor: coral }} />
          <span className="text-muted-foreground">You (Center)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ background: lime }} />
          <span className="text-muted-foreground">Direct #01 · #02</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ background: aqua }} />
          <span className="text-muted-foreground">Team #03–#06</span>
        </div>
      </div>
    </div>
  );
};

export default WheelhouseDiagram;
