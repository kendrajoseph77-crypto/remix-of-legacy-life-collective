import { useState, useEffect, useRef } from "react";

const avatarUrls = [
  "https://randomuser.me/api/portraits/men/83.jpg",
  "https://randomuser.me/api/portraits/women/92.jpg",
  "https://randomuser.me/api/portraits/men/6.jpg",
  "https://randomuser.me/api/portraits/women/95.jpg",
  "https://randomuser.me/api/portraits/men/11.jpg",
  "https://randomuser.me/api/portraits/women/74.jpg",
  "https://randomuser.me/api/portraits/men/36.jpg",
];

// Per-member contribution amounts (across all 3 levels combined)
// L1: $2,500, L2: $5,000, L3: $10,000 → total contribution per member = $17,500
// YOU gets 50% of each = $8,750 per member
const CONTRIBUTION_PER_MEMBER = 17500;
const YOU_CUT_PER_MEMBER = CONTRIBUTION_PER_MEMBER / 2;
const BASE_EARNINGS = 17500;
const FINAL_EARNINGS = 52500;
const MEMBER_COUNT = 6;

// Node positions: #01 top (12 o'clock), #02 bottom (6 o'clock), then #03-#06 around
const nodeAngles = [
  -Math.PI / 2,       // #01 — directly above
  Math.PI / 2,        // #02 — directly below
  -Math.PI / 6,       // #03 — upper right
  Math.PI / 6,        // #04 — lower right (but upper-ish)
  5 * Math.PI / 6,    // #05 — lower left
  -5 * Math.PI / 6,   // #06 — upper left
];

const WheelhouseDiagram = () => {
  const royal = "hsl(229 77% 65%)";
  const lime = "hsl(100 70% 50%)";
  const navy = "hsl(254 60% 10%)";
  const card = "hsl(254 55% 14%)";
  const gold = "hsl(45 100% 60%)";

  const cx = 250, cy = 260;
  const wheelR = 145;
  const centerR = 48;
  const nodeR = 36;

  const allNodes = nodeAngles.map((angle, i) => {
    const isInner = i < 2;
    return {
      label: String(i + 1).padStart(2, "0"),
      avatarIdx: i + 1,
      color: isInner ? lime : royal,
      x: cx + wheelR * Math.cos(angle),
      y: cy + wheelR * Math.sin(angle),
      r: nodeR,
      angle,
    };
  });

  const [activeMembers, setActiveMembers] = useState(0);
  const [currentEarnings, setCurrentEarnings] = useState(BASE_EARNINGS);
  const [showContribution, setShowContribution] = useState<number | null>(null);
  const [cycleComplete, setCycleComplete] = useState(false);
  const [celebrationPhase, setCelebrationPhase] = useState(0);
  const animationRef = useRef<number | null>(null);
  const hasStarted = useRef(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          startAnimation();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const startAnimation = () => {
    let memberIdx = 0;

    const addNextMember = () => {
      if (memberIdx >= MEMBER_COUNT) {
        setCycleComplete(true);
        // Celebration phases
        setTimeout(() => setCelebrationPhase(1), 100);
        setTimeout(() => setCelebrationPhase(2), 600);
        setTimeout(() => setCelebrationPhase(3), 1200);
        return;
      }

      const current = memberIdx;
      memberIdx++;
      const targetMembers = memberIdx;

      setActiveMembers(targetMembers);
      setShowContribution(current);

      // Animate earnings climbing
      const startVal = BASE_EARNINGS + (targetMembers - 1) * YOU_CUT_PER_MEMBER;
      const targetEarnings = Math.min(BASE_EARNINGS + targetMembers * YOU_CUT_PER_MEMBER, FINAL_EARNINGS);
      const duration = 700;
      const startTime = performance.now();

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCurrentEarnings(startVal + (targetEarnings - startVal) * eased);

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(tick);
        } else {
          setTimeout(() => {
            setShowContribution(null);
            setTimeout(addNextMember, 400);
          }, 500);
        }
      };

      animationRef.current = requestAnimationFrame(tick);
    };

    setTimeout(addNextMember, 800);
  };

  const formatCurrency = (val: number) =>
    "$" + val.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  const renderNode = (
    n: typeof allNodes[0],
    idx: number,
    isActive: boolean
  ) => {
    const clipId = `wh-clip-${idx}`;
    const badgeAngle = -Math.PI / 4;
    const badgeX = n.x + (n.r - 1) * Math.cos(badgeAngle);
    const badgeY = n.y + (n.r - 1) * Math.sin(badgeAngle);
    const opacity = isActive ? 1 : 0.2;

    // Contribution label position — offset outward from center
    const outAngle = n.angle;
    const contribX = n.x + (n.r + 22) * Math.cos(outAngle);
    const contribY = n.y + (n.r + 22) * Math.sin(outAngle);

    return (
      <g key={clipId}>
        <g style={{ transition: "opacity 0.6s ease", opacity }}>
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
          <circle cx={badgeX} cy={badgeY} r={12} fill={navy} stroke={n.color} strokeWidth="1.5" />
          <text x={badgeX} y={badgeY + 4} textAnchor="middle" fontSize="7" fontWeight="800" fill={n.color} fontFamily="monospace">
            {n.label}
          </text>
        </g>

        {/* Contribution label — shows when this member joins */}
        {showContribution === idx && (
          <g className="animate-fade-in">
            <rect x={contribX - 28} y={contribY - 8} width="56" height="16" rx="8"
              fill={navy} stroke={n.color} strokeWidth="1" opacity="0.95" />
            <text x={contribX} y={contribY + 3} textAnchor="middle" fontSize="8" fontWeight="800"
              fill={n.color} fontFamily="monospace">
              {formatCurrency(CONTRIBUTION_PER_MEMBER)}
            </text>
          </g>
        )}
      </g>
    );
  };

  // "50% → YOU" floating labels along connectors when contribution is shown
  const renderFlowLabel = (n: typeof allNodes[0], idx: number) => {
    if (showContribution !== idx) return null;
    const midX = (n.x + cx) / 2;
    const midY = (n.y + cy) / 2;
    // Offset perpendicular to the line
    const angle = Math.atan2(cy - n.y, cx - n.x);
    const perpX = midX + 14 * Math.cos(angle + Math.PI / 2);
    const perpY = midY + 14 * Math.sin(angle + Math.PI / 2);

    return (
      <g key={`flow-${idx}`} className="animate-fade-in">
        <rect x={perpX - 22} y={perpY - 7} width="44" height="14" rx="7"
          fill={gold} opacity="0.9" />
        <text x={perpX} y={perpY + 3.5} textAnchor="middle" fontSize="7" fontWeight="900"
          fill={navy} fontFamily="monospace">
          50% → YOU
        </text>
      </g>
    );
  };

  return (
    <div ref={sectionRef} className="relative w-full max-w-[540px] mx-auto">
      <svg viewBox="0 0 500 540" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <filter id="wh-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="wh-softGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="wh-earningsGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="wh-celebGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <marker id="arrow-royal" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <polygon points="0 0, 8 4, 0 8" fill={royal} opacity="0.9" />
          </marker>
          <marker id="arrow-lime" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <polygon points="0 0, 8 4, 0 8" fill={lime} opacity="0.9" />
          </marker>
          <clipPath id="wh-clipCenter">
            <circle cx={cx} cy={cy} r={centerR - 3} />
          </clipPath>
          <radialGradient id="celebGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={lime} stopOpacity="0.15" />
            <stop offset="70%" stopColor={lime} stopOpacity="0.05" />
            <stop offset="100%" stopColor={lime} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Title */}
        <text x={cx} y={30} textAnchor="middle" fontSize="13" fontWeight="700"
          letterSpacing="0.15em" fill={royal} fontFamily="monospace">
          2 × 2 Wheelhouse
        </text>

        {/* Celebration glow when cycle completes */}
        {cycleComplete && (
          <>
            <circle cx={cx} cy={cy} r={wheelR + 30} fill="url(#celebGrad)"
              style={{ transition: "opacity 1s ease", opacity: celebrationPhase >= 1 ? 1 : 0 }} />
            <circle cx={cx} cy={cy} r={wheelR + 8} fill="none" stroke={lime} strokeWidth="2"
              style={{ transition: "opacity 0.8s ease", opacity: celebrationPhase >= 2 ? 0.4 : 0 }} />
            <circle cx={cx} cy={cy} r={wheelR + 20} fill="none" stroke={lime} strokeWidth="1"
              style={{ transition: "opacity 1s ease 0.3s", opacity: celebrationPhase >= 3 ? 0.2 : 0 }} />
          </>
        )}

        {/* Main wheel circle */}
        <circle cx={cx} cy={cy} r={wheelR} fill="none"
          stroke={cycleComplete ? "hsl(100 70% 50% / 0.25)" : "hsl(229 77% 55% / 0.15)"}
          strokeWidth="2" style={{ transition: "stroke 1s ease" }} />
        <circle cx={cx} cy={cy} r={wheelR} fill="none" stroke="hsl(229 77% 55% / 0.06)" strokeWidth="10" />

        {/* Connectors from each node to center */}
        {allNodes.map((n, i) => {
          const isActive = i < activeMembers;
          const angle = Math.atan2(cy - n.y, cx - n.x);
          const sx = n.x + (n.r + 4) * Math.cos(angle);
          const sy = n.y + (n.r + 4) * Math.sin(angle);
          const ex = cx - (centerR + 10) * Math.cos(angle);
          const ey = cy - (centerR + 10) * Math.sin(angle);
          const isInner = i < 2;
          const markerEnd = isInner ? "url(#arrow-lime)" : "url(#arrow-royal)";
          const strokeColor = isInner ? "hsl(100 70% 50% / 0.5)" : "hsl(229 77% 65% / 0.45)";

          return (
            <line key={`conn-${i}`}
              x1={sx} y1={sy} x2={ex} y2={ey}
              stroke={strokeColor}
              strokeWidth={showContribution === i ? 3 : 2}
              markerEnd={markerEnd}
              style={{ transition: "opacity 0.5s ease, stroke-width 0.3s ease", opacity: isActive ? 1 : 0.12 }}
            />
          );
        })}

        {/* Flow labels (50% → YOU) */}
        {allNodes.map((n, i) => renderFlowLabel(n, i))}

        {/* All 6 nodes */}
        {allNodes.map((n, i) => renderNode(n, i, i < activeMembers))}

        {/* Center YOU */}
        <circle cx={cx} cy={cy} r={centerR + 6} fill="none"
          stroke={cycleComplete ? "hsl(100 70% 50% / 0.2)" : "hsl(229 77% 55% / 0.12)"}
          strokeWidth="6" style={{ transition: "stroke 1s ease" }} />
        <circle cx={cx} cy={cy} r={centerR} fill={card} stroke={cycleComplete ? lime : royal}
          strokeWidth="3" filter="url(#wh-softGlow)" style={{ transition: "stroke 0.8s ease" }} />
        <image
          href={avatarUrls[0]}
          x={cx - centerR + 3} y={cy - centerR + 3}
          width={(centerR - 3) * 2} height={(centerR - 3) * 2}
          clipPath="url(#wh-clipCenter)"
          preserveAspectRatio="xMidYMid slice"
        />
        <circle cx={cx} cy={cy} r={centerR} fill="none" stroke={cycleComplete ? lime : royal}
          strokeWidth="3" filter={cycleComplete ? "url(#wh-celebGlow)" : "url(#wh-glow)"}
          style={{ transition: "stroke 0.8s ease" }} />

        {/* YOU label */}
        <rect x={cx - 18} y={cy + 8} width="36" height="16" rx="4" fill="hsl(229 77% 55% / 0.92)" />
        <text x={cx} y={cy + 19.5} textAnchor="middle" fontSize="9" fontWeight="800" fill="white" fontFamily="sans-serif">YOU</text>

        {/* Earnings pill */}
        <rect x={cx - 42} y={cy + 30} width="84" height="24" rx="12"
          fill={navy} stroke={cycleComplete ? lime : royal} strokeWidth="1.5"
          style={{ transition: "stroke 0.8s ease" }} />
        <text x={cx} y={cy + 46} textAnchor="middle" fontSize="14" fontWeight="900"
          fill={cycleComplete ? lime : royal} fontFamily="monospace"
          filter="url(#wh-earningsGlow)"
          style={{ transition: "fill 0.8s ease" }}>
          {formatCurrency(Math.round(currentEarnings))}
        </text>

        {/* Cycle complete text */}
        {cycleComplete && celebrationPhase >= 2 && (
          <text x={cx} y={cy + 72} textAnchor="middle" fontSize="10" fontWeight="700"
            fill={lime} fontFamily="sans-serif" className="animate-fade-in"
            filter="url(#wh-earningsGlow)">
            🎉 Cycle Complete!
          </text>
        )}
      </svg>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-1 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ background: royal }} />
          <span className="text-muted-foreground">You (Center)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ background: lime }} />
          <span className="text-muted-foreground">Direct #01 · #02</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ background: royal }} />
          <span className="text-muted-foreground">Team #03–#06</span>
        </div>
      </div>

      <p className="text-center text-muted-foreground text-xs mt-3 tracking-wide">
        {activeMembers} of {MEMBER_COUNT} members joined
      </p>
    </div>
  );
};

export default WheelhouseDiagram;
