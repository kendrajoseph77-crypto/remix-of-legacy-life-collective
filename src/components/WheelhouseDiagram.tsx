// Real person photo avatars — diverse Black and Brown representation
const avatarUrls = [
  "https://randomuser.me/api/portraits/men/83.jpg",   // 0: center YOU
  "https://randomuser.me/api/portraits/women/92.jpg", // 1: 01 direct top
  "https://randomuser.me/api/portraits/men/6.jpg",    // 2: 02 direct bottom
  "https://randomuser.me/api/portraits/women/95.jpg", // 3: 03 top-left
  "https://randomuser.me/api/portraits/men/11.jpg",   // 4: 04 top-right
  "https://randomuser.me/api/portraits/women/74.jpg", // 5: 05 bottom-left
  "https://randomuser.me/api/portraits/men/36.jpg",   // 6: 06 bottom-right
];

const WheelhouseDiagram = () => {
  const aqua  = "hsl(181 90% 52%)";
  const coral = "hsl(2 88% 62%)";
  const lime  = "hsl(68 100% 50%)";
  const navy  = "hsl(210 45% 8%)";
  const card  = "hsl(210 40% 12%)";

  // Layout positions
  const cx = 250, cy = 235;        // center YOU
  const innerR = 42;               // inner node (01, 02) radius
  const outerR = 38;               // outer node (03-06) radius
  const centerR = 54;              // YOU circle radius
  const badgeR = 13;

  const node01 = { x: 250, y: 118, r: innerR, label: "01", avatarIdx: 1, color: lime };
  const node02 = { x: 250, y: 352, r: innerR, label: "02", avatarIdx: 2, color: lime };
  const node03 = { x: 80,  y: 80,  r: outerR, label: "03", avatarIdx: 3, color: aqua };
  const node04 = { x: 420, y: 80,  r: outerR, label: "04", avatarIdx: 4, color: aqua };
  const node05 = { x: 80,  y: 390, r: outerR, label: "05", avatarIdx: 5, color: aqua };
  const node06 = { x: 420, y: 390, r: outerR, label: "06", avatarIdx: 6, color: aqua };

  const renderNode = (n: typeof node01, clipId: string, i: number) => {
    // Badge position: top-right for outer nodes, or corner
    const badgeAngle = -Math.PI / 4; // 45° top-right
    const badgeX = n.x + (n.r - 2) * Math.cos(badgeAngle);
    const badgeY = n.y + (n.r - 2) * Math.sin(badgeAngle);

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
        <text x={badgeX} y={badgeY + 4} textAnchor="middle" fontSize="7.5" fontWeight="800" fill={n.color} fontFamily="monospace">
          {n.label}
        </text>
        {/* 50% amount pill below node */}
        <rect x={n.x - 20} y={n.y + n.r + 4} width="40" height="16" rx="8"
          fill={navy} stroke={n.color} strokeWidth="1.2" />
        <text x={n.x} y={n.y + n.r + 15} textAnchor="middle" fontSize="8" fontWeight="800"
          fill={n.color} fontFamily="monospace">
          50%
        </text>
      </g>
    );
  };

  // Arrow marker definitions for each color
  const arrowLime = "hsl(68 100% 50%)";
  const arrowAqua = "hsl(181 90% 52%)";

  return (
    <div className="relative w-full max-w-[540px] mx-auto">
      {/* Title */}
      <p className="text-center text-sm font-bold tracking-widest uppercase mb-2" style={{ color: aqua }}>
        2 × 2 Wheelhouse
      </p>

      <svg viewBox="0 0 500 480" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <filter id="wh-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="wh-softGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          {/* Arrow markers */}
          <marker id="arrow-lime" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <polygon points="0 0, 7 3.5, 0 7" fill={arrowLime} opacity="0.9" />
          </marker>
          <marker id="arrow-aqua" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <polygon points="0 0, 7 3.5, 0 7" fill={arrowAqua} opacity="0.9" />
          </marker>
          {/* Clip paths */}
          <clipPath id="wh-clipCenter">
            <circle cx={cx} cy={cy} r={centerR - 4} />
          </clipPath>
        </defs>

        {/* ── L-shaped connectors: outer nodes → inner direct nodes → center ── */}

        {/* 03 (top-left) → 01 (top center): horizontal then up */}
        {/* Line from 03 right edge to 01 left edge (horizontal at y=node03.y, then vertical to node01) */}
        <polyline
          points={`${node03.x + node03.r + 2},${node03.y} ${node01.x},${node03.y} ${node01.x},${node01.y + node01.r + 2}`}
          fill="none"
          stroke={`hsl(181 90% 52% / 0.35)`}
          strokeWidth="1.8"
          markerEnd="url(#arrow-aqua)"
        />

        {/* 04 (top-right) → 01 (top center) */}
        <polyline
          points={`${node04.x - node04.r - 2},${node04.y} ${node01.x},${node04.y} ${node01.x},${node01.y + node01.r + 2}`}
          fill="none"
          stroke={`hsl(181 90% 52% / 0.35)`}
          strokeWidth="1.8"
          markerEnd="url(#arrow-aqua)"
        />

        {/* 05 (bottom-left) → 02 (bottom center) */}
        <polyline
          points={`${node05.x + node05.r + 2},${node05.y} ${node02.x},${node05.y} ${node02.x},${node02.y - node02.r - 2}`}
          fill="none"
          stroke={`hsl(181 90% 52% / 0.35)`}
          strokeWidth="1.8"
          markerEnd="url(#arrow-aqua)"
        />

        {/* 06 (bottom-right) → 02 (bottom center) */}
        <polyline
          points={`${node06.x - node06.r - 2},${node06.y} ${node02.x},${node06.y} ${node02.x},${node02.y - node02.r - 2}`}
          fill="none"
          stroke={`hsl(181 90% 52% / 0.35)`}
          strokeWidth="1.8"
          markerEnd="url(#arrow-aqua)"
        />

        {/* 01 → center (vertical down) */}
        <line
          x1={node01.x} y1={node01.y + node01.r + 2}
          x2={cx} y2={cy - centerR - 10}
          stroke={`hsl(68 100% 50% / 0.45)`}
          strokeWidth="1.8"
          markerEnd="url(#arrow-lime)"
        />

        {/* 02 → center (vertical up) */}
        <line
          x1={node02.x} y1={node02.y - node02.r - 2}
          x2={cx} y2={cy + centerR + 10}
          stroke={`hsl(68 100% 50% / 0.45)`}
          strokeWidth="1.8"
          markerEnd="url(#arrow-lime)"
        />

        {/* ── Outer nodes (03, 04, 05, 06) ── */}
        {renderNode(node03, "wh-clip03", 3)}
        {renderNode(node04, "wh-clip04", 4)}
        {renderNode(node05, "wh-clip05", 5)}
        {renderNode(node06, "wh-clip06", 6)}

        {/* ── Inner direct nodes (01, 02) ── */}
        {renderNode(node01, "wh-clip01", 1)}
        {renderNode(node02, "wh-clip02", 2)}

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

        {/* Total received pill above YOU label */}
        <rect x={cx - 24} y={cy - 12} width="48" height="20" rx="10" fill={navy} stroke={coral} strokeWidth="1.5" />
        <text x={cx} y={cy + 3} textAnchor="middle" fontSize="9.5" fontWeight="800" fill={coral} fontFamily="monospace">3× 50%</text>
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
