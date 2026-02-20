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

// Node layout: positions 01–02 are lime (Inviter/Direct), 03–06 are aqua (Team)
// Arranged clockwise: 01 top, 03 top-right, 04 bottom-right, 02 bottom, 05 bottom-left, 06 top-left
const nodeOrder = [1, 3, 4, 2, 5, 6]; // avatar index
const nodeColors = ["lime", "aqua", "aqua", "lime", "aqua", "aqua"];
const nodeLabels = ["01", "03", "04", "02", "05", "06"];

const WheelhouseDiagram = () => {
  const aqua = "hsl(181 90% 52%)";
  const coral = "hsl(2 88% 62%)";
  const lime = "hsl(68 100% 50%)";
  const navy = "hsl(210 45% 8%)";
  const card = "hsl(210 40% 12%)";

  const cx = 250;
  const cy = 230;
  const ringR = 155;      // orbit circle radius
  const nodeR = 42;       // outer node circle radius
  const centerR = 60;     // center YOU radius
  const badgeR = 12;

  // 6 nodes evenly spaced, starting from top (−90°)
  const nodes = nodeOrder.map((avatarIdx, i) => {
    const angleDeg = -90 + i * 60;
    const angleRad = (angleDeg * Math.PI) / 180;
    const x = cx + ringR * Math.cos(angleRad);
    const y = cy + ringR * Math.sin(angleRad);
    const color = nodeColors[i] === "lime" ? lime : aqua;
    const label = nodeLabels[i];
    return { x, y, avatarIdx, color, label, angleDeg };
  });

  return (
    <div className="relative w-full max-w-[520px] mx-auto">
      <svg viewBox="0 0 500 460" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <filter id="wh-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="wh-softGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="wh-shadow">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="hsl(0 0% 0% / 0.5)" />
          </filter>

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

        {/* ── Outer glow ring (decorative) ── */}
        <circle
          cx={cx} cy={cy} r={ringR + nodeR * 0.7}
          fill="none"
          stroke="hsl(181 90% 52% / 0.06)"
          strokeWidth={nodeR * 1.4}
        />

        {/* ── Main orbit circle ── */}
        <circle
          cx={cx} cy={cy} r={ringR}
          fill="none"
          stroke="hsl(181 90% 52% / 0.22)"
          strokeWidth="1.5"
          strokeDasharray="6 5"
          filter="url(#wh-glow)"
        />

        {/* ── Spoke lines from center to each node ── */}
        {nodes.map((n, i) => {
          const color = nodeColors[i] === "lime"
            ? "hsl(68 100% 50% / 0.3)"
            : "hsl(181 90% 52% / 0.25)";
          // shorten line so it doesn't overlap the circles
          const dx = n.x - cx;
          const dy = n.y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const fromX = cx + (dx / dist) * (centerR + 2);
          const fromY = cy + (dy / dist) * (centerR + 2);
          const toX = n.x - (dx / dist) * (nodeR + 2);
          const toY = n.y - (dy / dist) * (nodeR + 2);
          return (
            <line
              key={i}
              x1={fromX} y1={fromY}
              x2={toX} y2={toY}
              stroke={color}
              strokeWidth="1.2"
              strokeDasharray="5 4"
            />
          );
        })}

        {/* ── Outer nodes ── */}
        {nodes.map((n, i) => {
          // Badge position: push it outward from center
          const angleDeg = n.angleDeg;
          const badgeAngle = (angleDeg * Math.PI) / 180;
          const badgeX = n.x + (nodeR - 2) * Math.cos(badgeAngle);
          const badgeY = n.y + (nodeR - 2) * Math.sin(badgeAngle);

          return (
            <g key={i}>
              {/* Background circle */}
              <circle cx={n.x} cy={n.y} r={nodeR} fill={card} stroke={n.color} strokeWidth="2.5" />
              {/* Photo */}
              <image
                href={avatarUrls[n.avatarIdx]}
                x={n.x - nodeR + 4} y={n.y - nodeR + 4}
                width={(nodeR - 4) * 2} height={(nodeR - 4) * 2}
                clipPath={`url(#wh-clip${i})`}
                preserveAspectRatio="xMidYMid slice"
              />
              {/* Stroke ring on top */}
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
        {/* Pulse rings */}
        <circle cx={cx} cy={cy} r={centerR + 14} fill="none" stroke="hsl(2 88% 62% / 0.10)" strokeWidth="10" />
        <circle cx={cx} cy={cy} r={centerR + 5} fill="none" stroke="hsl(2 88% 62% / 0.25)" strokeWidth="2" />

        {/* Photo */}
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
