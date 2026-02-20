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

const nodeOrder = [1, 3, 4, 2, 5, 6];
const nodeColors = ["lime", "aqua", "aqua", "lime", "aqua", "aqua"];
const nodeLabels = ["01", "03", "04", "02", "05", "06"];

const WheelhouseDiagram = () => {
  const aqua  = "hsl(181 90% 52%)";
  const coral = "hsl(2 88% 62%)";
  const lime  = "hsl(68 100% 50%)";
  const navy  = "hsl(210 45% 8%)";
  const card  = "hsl(210 40% 12%)";

  const cx = 250;
  const cy = 235;
  const ringR   = 155;
  const nodeR   = 40;
  const centerR = 58;
  const badgeR  = 12;

  const nodes = nodeOrder.map((avatarIdx, i) => {
    const angleDeg = -90 + i * 60;
    const angleRad = (angleDeg * Math.PI) / 180;
    const x = cx + ringR * Math.cos(angleRad);
    const y = cy + ringR * Math.sin(angleRad);
    const color = nodeColors[i] === "lime" ? lime : aqua;
    const label = nodeLabels[i];
    return { x, y, avatarIdx, color, label, angleDeg, angleRad };
  });

  // Mid-point along each spoke for the 50% pill label
  const midFrac = 0.52; // fraction along the spoke from center

  return (
    <div className="relative w-full max-w-[520px] mx-auto">
      <svg viewBox="0 0 500 470" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <filter id="wh-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="wh-softGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>

          {/* Arrow marker pointing inward (toward center) */}
          {nodes.map((_, i) => {
            const col = nodeColors[i] === "lime" ? lime : aqua;
            return (
              <marker
                key={i}
                id={`arrow-${i}`}
                markerWidth="7" markerHeight="7"
                refX="6" refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 7 3.5, 0 7" fill={col} opacity="0.85" />
              </marker>
            );
          })}

          {/* Clip paths */}
          <clipPath id="wh-clipCenter">
            <circle cx={cx} cy={cy} r={centerR - 4} />
          </clipPath>
          {nodes.map((n, i) => (
            <clipPath key={i} id={`wh-clip${i}`}>
              <circle cx={n.x} cy={n.y} r={nodeR - 4} />
            </clipPath>
          ))}
        </defs>

        {/* ── Ambient glow ring ── */}
        <circle
          cx={cx} cy={cy} r={ringR + nodeR * 0.7}
          fill="none"
          stroke="hsl(181 90% 52% / 0.05)"
          strokeWidth={nodeR * 1.4}
        />

        {/* ── Main orbit circle ── */}
        <circle
          cx={cx} cy={cy} r={ringR}
          fill="none"
          stroke="hsl(181 90% 52% / 0.18)"
          strokeWidth="1.5"
          strokeDasharray="6 5"
          filter="url(#wh-glow)"
        />

        {/* ── Spokes with arrows flowing toward center ── */}
        {nodes.map((n, i) => {
          const col    = nodeColors[i] === "lime" ? lime : aqua;
          const colFaded = nodeColors[i] === "lime"
            ? "hsl(68 100% 50% / 0.35)"
            : "hsl(181 90% 52% / 0.30)";

          const dx   = n.x - cx;
          const dy   = n.y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          // Line starts at the node edge, ends just before center circle
          const fromX = n.x - (dx / dist) * (nodeR + 3);
          const fromY = n.y - (dy / dist) * (nodeR + 3);
          const toX   = cx  + (dx / dist) * (centerR + 10); // arrow tip stops before center
          const toY   = cy  + (dy / dist) * (centerR + 10);

          // Mid-point for pill label
          const midX = cx + (dx / dist) * (centerR + (dist - centerR - nodeR) * midFrac + centerR);
          const midY = cy + (dy / dist) * (centerR + (dist - centerR - nodeR) * midFrac + centerR);

          // Rotation angle for the label (aligned to spoke, readable)
          let labelAngle = n.angleDeg + 180; // rotate so text reads outward
          if (labelAngle > 90 && labelAngle < 270) labelAngle += 180;
          const rotX = cx + (dx / dist) * ((dist - centerR - nodeR) * midFrac + centerR);
          const rotY = cy + (dy / dist) * ((dist - centerR - nodeR) * midFrac + centerR);

          return (
            <g key={i}>
              {/* Solid arrow line */}
              <line
                x1={fromX} y1={fromY}
                x2={toX}   y2={toY}
                stroke={colFaded}
                strokeWidth="1.8"
                markerEnd={`url(#arrow-${i})`}
              />
              {/* 50% pill label on the spoke */}
              <g transform={`translate(${rotX}, ${rotY})`}>
                <rect x="-17" y="-9" width="34" height="18" rx="9"
                  fill={navy}
                  stroke={col}
                  strokeWidth="1.2"
                  opacity="0.95"
                />
                <text
                  x="0" y="4.5"
                  textAnchor="middle"
                  fontSize="8.5"
                  fontWeight="800"
                  fill={col}
                  fontFamily="monospace"
                  letterSpacing="0.5"
                >
                  50%
                </text>
              </g>
            </g>
          );
        })}

        {/* ── Outer nodes ── */}
        {nodes.map((n, i) => {
          const badgeAngle = n.angleRad;
          const badgeX = n.x + (nodeR - 1) * Math.cos(badgeAngle);
          const badgeY = n.y + (nodeR - 1) * Math.sin(badgeAngle);

          return (
            <g key={i}>
              <circle cx={n.x} cy={n.y} r={nodeR} fill={card} stroke={n.color} strokeWidth="2.5" />
              <image
                href={avatarUrls[n.avatarIdx]}
                x={n.x - nodeR + 4} y={n.y - nodeR + 4}
                width={(nodeR - 4) * 2} height={(nodeR - 4) * 2}
                clipPath={`url(#wh-clip${i})`}
                preserveAspectRatio="xMidYMid slice"
              />
              <circle cx={n.x} cy={n.y} r={nodeR} fill="none" stroke={n.color} strokeWidth="2.5" filter="url(#wh-glow)" />
              {/* Number badge */}
              <circle cx={badgeX} cy={badgeY} r={badgeR} fill={navy} stroke={n.color} strokeWidth="1.5" />
              <text
                x={badgeX} y={badgeY + 4}
                textAnchor="middle"
                fontSize="8.5"
                fontWeight="700"
                fill={n.color}
                fontFamily="monospace"
              >
                {n.label}
              </text>
            </g>
          );
        })}

        {/* ── Center YOU circle ── */}
        <circle cx={cx} cy={cy} r={centerR + 16} fill="none" stroke="hsl(2 88% 62% / 0.08)" strokeWidth="12" />
        <circle cx={cx} cy={cy} r={centerR + 5}  fill="none" stroke="hsl(2 88% 62% / 0.22)" strokeWidth="2" />
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
        <rect x={cx - 22} y={cy + centerR - 23} width="44" height="19" rx="4" fill="hsl(2 88% 62% / 0.92)" />
        <text x={cx} y={cy + centerR - 10} textAnchor="middle" fontSize="11" fontWeight="800" fill="white" fontFamily="sans-serif">YOU</text>

        {/* ── Bottom caption ── */}
        <text x={cx} y={cy + centerR + 30} textAnchor="middle" fontSize="10" fill="hsl(210 15% 72%)" fontFamily="sans-serif">
          You receive 50% from each of the 6 participants
        </text>
      </svg>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-1 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full border-2" style={{ background: coral, borderColor: coral }} />
          <span className="text-muted-foreground">You (Center)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ background: lime }} />
          <span className="text-muted-foreground">Inviter #1 · Direct #2</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ background: aqua }} />
          <span className="text-muted-foreground">Team #3–#6</span>
        </div>
      </div>
    </div>
  );
};

export default WheelhouseDiagram;
