const avatarUrls = [
  "https://randomuser.me/api/portraits/men/83.jpg",
  "https://randomuser.me/api/portraits/women/92.jpg",
  "https://randomuser.me/api/portraits/men/6.jpg",
  "https://randomuser.me/api/portraits/women/95.jpg",
  "https://randomuser.me/api/portraits/men/11.jpg",
  "https://randomuser.me/api/portraits/women/74.jpg",
  "https://randomuser.me/api/portraits/men/36.jpg",
];

const WheelhouseDiagram = () => {
  const aqua = "hsl(181 90% 52%)";
  const coral = "hsl(2 88% 62%)";
  const lime = "hsl(68 100% 50%)";
  const navy = "hsl(210 45% 8%)";
  const card = "hsl(210 40% 12%)";

  const cx = 250, cy = 250;
  const wheelR = 120; // main wheel radius
  const centerR = 48;
  const innerNodeR = 38;
  const outerNodeR = 34;
  const badgeR = 12;

  // #01 top, #02 bottom inside the wheel
  const innerNodes = [
    { label: "01", avatarIdx: 1, color: aqua, x: cx, y: cy - 78, r: innerNodeR },
    { label: "02", avatarIdx: 2, color: aqua, x: cx, y: cy + 78, r: innerNodeR },
  ];

  // #03 top-left, #04 top-right, #05 bottom-left, #06 bottom-right
  const outerNodes = [
    { label: "03", avatarIdx: 3, color: aqua, x: 68,  y: 62,  r: outerNodeR },
    { label: "04", avatarIdx: 4, color: aqua, x: 432, y: 62,  r: outerNodeR },
    { label: "05", avatarIdx: 5, color: aqua, x: 68,  y: 438, r: outerNodeR },
    { label: "06", avatarIdx: 6, color: aqua, x: 432, y: 438, r: outerNodeR },
  ];

  // L-shaped paths: outer → inner
  // #03 (top-left) → #01 (top)
  // #04 (top-right) → #01 (top)
  // #05 (bottom-left) → #02 (bottom)
  // #06 (bottom-right) → #02 (bottom)
  const elbowPaths = [
    { from: outerNodes[0], to: innerNodes[0], midX: outerNodes[0].x, midY: innerNodes[0].y },
    { from: outerNodes[1], to: innerNodes[0], midX: outerNodes[1].x, midY: innerNodes[0].y },
    { from: outerNodes[2], to: innerNodes[1], midX: outerNodes[2].x, midY: innerNodes[1].y },
    { from: outerNodes[3], to: innerNodes[1], midX: outerNodes[3].x, midY: innerNodes[1].y },
  ];

  const renderNode = (
    n: { x: number; y: number; r: number; label: string; avatarIdx: number; color: string },
    clipId: string,
    showAmount = true
  ) => {
    const badgeAngle = -Math.PI / 4;
    const badgeX = n.x + (n.r - 1) * Math.cos(badgeAngle);
    const badgeY = n.y + (n.r - 1) * Math.sin(badgeAngle);

    return (
      <g key={clipId}>
        <clipPath id={clipId}>
          <circle cx={n.x} cy={n.y} r={n.r - 3} />
        </clipPath>
        <circle cx={n.x} cy={n.y} r={n.r} fill={card} stroke={n.color} strokeWidth="2.5" />
        <image
          href={avatarUrls[n.avatarIdx]}
          x={n.x - n.r + 3} y={n.y - n.r + 3}
          width={(n.r - 3) * 2} height={(n.r - 3) * 2}
          clipPath={`url(#${clipId})`}
          preserveAspectRatio="xMidYMid slice"
        />
        <circle cx={n.x} cy={n.y} r={n.r} fill="none" stroke={n.color} strokeWidth="2.5" filter="url(#wh-glow)" />
        {/* Badge */}
        <circle cx={badgeX} cy={badgeY} r={badgeR} fill={navy} stroke={n.color} strokeWidth="1.5" />
        <text x={badgeX} y={badgeY + 4} textAnchor="middle" fontSize="7" fontWeight="800" fill={n.color} fontFamily="monospace">
          {n.label}
        </text>
        {/* Amount pill */}
        {showAmount && (
          <>
            <rect x={n.x - 24} y={n.y + n.r + 5} width="48" height="17" rx="8.5"
              fill={navy} stroke={n.color} strokeWidth="1.2" />
            <text x={n.x} y={n.y + n.r + 16.5} textAnchor="middle" fontSize="8" fontWeight="800"
              fill={n.color} fontFamily="monospace">
              $62.50
            </text>
          </>
        )}
      </g>
    );
  };

  return (
    <div className="relative w-full max-w-[540px] mx-auto">
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
          <marker id="arrow-aqua" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <polygon points="0 0, 8 4, 0 8" fill={aqua} opacity="0.9" />
          </marker>
          <clipPath id="wh-clipCenter">
            <circle cx={cx} cy={cy} r={centerR - 3} />
          </clipPath>
        </defs>

        {/* ── Title ── */}
        <text x={cx} y={30} textAnchor="middle" fontSize="13" fontWeight="700"
          letterSpacing="0.15em" fill={aqua} fontFamily="monospace">
          2 × 2 Wheelhouse
        </text>

        {/* ── L-shaped connectors: outer → inner ── */}
        {elbowPaths.map((ep, i) => {
          const fromNode = ep.from;
          const toNode = ep.to;

          // Start from edge of outer node toward the elbow
          const startAngle = Math.atan2(ep.midY - fromNode.y, ep.midX - fromNode.x);
          const sx = fromNode.x + (fromNode.r + 4) * Math.cos(startAngle);
          const sy = fromNode.y + (fromNode.r + 4) * Math.sin(startAngle);

          // End at edge of inner node
          const endAngle = Math.atan2(ep.midY - toNode.y, ep.midX - toNode.x);
          const ex = toNode.x + (toNode.r + 12) * Math.cos(endAngle);
          const ey = toNode.y + (toNode.r + 12) * Math.sin(endAngle);

          return (
            <path key={`elbow-${i}`}
              d={`M ${sx} ${sy} L ${ep.midX} ${ep.midY} L ${ex} ${ey}`}
              fill="none"
              stroke="hsl(181 90% 52% / 0.4)"
              strokeWidth="2"
              strokeLinejoin="round"
              markerEnd="url(#arrow-aqua)"
            />
          );
        })}

        {/* ── Main wheel circle ── */}
        <circle cx={cx} cy={cy} r={wheelR} fill="none" stroke="hsl(181 90% 52% / 0.15)" strokeWidth="2" />
        <circle cx={cx} cy={cy} r={wheelR} fill="none" stroke="hsl(181 90% 52% / 0.06)" strokeWidth="10" />
        <circle cx={cx} cy={cy} r={wheelR + 8} fill="none" stroke="hsl(181 90% 52% / 0.04)" strokeWidth="4" />

        {/* ── Inner connectors: #01 → YOU, #02 → YOU ── */}
        {innerNodes.map((n, i) => {
          const angle = Math.atan2(cy - n.y, cx - n.x);
          const sx = n.x + (n.r + 4) * Math.cos(angle);
          const sy = n.y + (n.r + 4) * Math.sin(angle);
          const ex = cx - (centerR + 10) * Math.cos(angle);
          const ey = cy - (centerR + 10) * Math.sin(angle);

          return (
            <line key={`inner-line-${i}`}
              x1={sx} y1={sy} x2={ex} y2={ey}
              stroke="hsl(181 90% 52% / 0.45)" strokeWidth="2"
              markerEnd="url(#arrow-aqua)"
            />
          );
        })}

        {/* ── Outer nodes (#03–#06) ── */}
        {outerNodes.map((n, i) => renderNode(n, `wh-clip-outer-${i}`))}

        {/* ── Inner nodes (#01, #02) ── */}
        {innerNodes.map((n, i) => renderNode(n, `wh-clip-inner-${i}`))}

        {/* ── Center YOU ── */}
        <circle cx={cx} cy={cy} r={centerR + 6} fill="none" stroke="hsl(2 88% 62% / 0.12)" strokeWidth="6" />
        <circle cx={cx} cy={cy} r={centerR} fill={card} stroke={coral} strokeWidth="3" filter="url(#wh-softGlow)" />
        <image
          href={avatarUrls[0]}
          x={cx - centerR + 3} y={cy - centerR + 3}
          width={(centerR - 3) * 2} height={(centerR - 3) * 2}
          clipPath="url(#wh-clipCenter)"
          preserveAspectRatio="xMidYMid slice"
        />
        <circle cx={cx} cy={cy} r={centerR} fill="none" stroke={coral} strokeWidth="3" filter="url(#wh-glow)" />

        {/* YOU label */}
        <rect x={cx - 18} y={cy + 8} width="36" height="16" rx="4" fill="hsl(2 88% 62% / 0.92)" />
        <text x={cx} y={cy + 19.5} textAnchor="middle" fontSize="9" fontWeight="800" fill="white" fontFamily="sans-serif">YOU</text>

        {/* $125 pill */}
        <rect x={cx - 20} y={cy + 27} width="40" height="15" rx="7.5" fill={navy} stroke={coral} strokeWidth="1.2" />
        <text x={cx} y={cy + 37.5} textAnchor="middle" fontSize="8" fontWeight="800" fill={coral} fontFamily="monospace">$125</text>
      </svg>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-1 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full border-2" style={{ background: coral, borderColor: coral }} />
          <span className="text-muted-foreground">You (Center)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ background: aqua }} />
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
