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

// Each member contributes and YOU earns incrementally
// Level 1: $2,500 entry → 6 members × $2,500 = $15,000 pool → YOU gets 50% = $7,500
// Level 2: $5,000 entry → 6 members × $5,000 = $30,000 pool → YOU gets 50% = $15,000
// Level 3: $10,000 entry → 6 members × $10,000 = $60,000 pool → YOU gets 50% = $30,000
// Total across all 3 levels = $52,500
// Starting base = $17,500 (already earned before this cycle visualization)
// Each of the 6 members joining adds ($52,500 - $17,500) / 6 ≈ $5,833.33
const BASE_EARNINGS = 17500;
const FINAL_EARNINGS = 52500;
const MEMBER_COUNT = 6;
const PER_MEMBER = (FINAL_EARNINGS - BASE_EARNINGS) / MEMBER_COUNT;

// Member join order: #01, #02, #03, #04, #05, #06
const joinOrder = [0, 1, 2, 3, 4, 5]; // indices into allNodes

const WheelhouseDiagram = () => {
  const royal = "hsl(229 77% 65%)";
  const lime = "hsl(100 70% 50%)";
  const navy = "hsl(254 60% 10%)";
  const card = "hsl(254 55% 14%)";

  const cx = 250, cy = 250;
  const wheelR = 140;
  const centerR = 48;
  const nodeR = 36;

  // Place all 6 nodes evenly around the circle
  const allNodes = Array.from({ length: 6 }, (_, i) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / 6;
    // Inner ring (direct invites #01, #02) use lime, outer (#03-#06) use royal
    const isInner = i < 2;
    return {
      label: String(i + 1).padStart(2, "0"),
      avatarIdx: i + 1,
      color: isInner ? lime : royal,
      x: cx + wheelR * Math.cos(angle),
      y: cy + wheelR * Math.sin(angle),
      r: nodeR,
    };
  });

  const [activeMembers, setActiveMembers] = useState(0);
  const [currentEarnings, setCurrentEarnings] = useState(BASE_EARNINGS);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<number | null>(null);
  const hasStarted = useRef(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Observe when diagram enters viewport to start animation
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
    setIsAnimating(true);
    let memberIdx = 0;

    const addNextMember = () => {
      if (memberIdx >= MEMBER_COUNT) {
        setIsAnimating(false);
        return;
      }
      memberIdx++;
      const targetMembers = memberIdx;
      const targetEarnings = BASE_EARNINGS + targetMembers * PER_MEMBER;

      setActiveMembers(targetMembers);

      // Animate the earnings number climbing
      const startVal = BASE_EARNINGS + (targetMembers - 1) * PER_MEMBER;
      const duration = 600;
      const startTime = performance.now();

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        const value = startVal + (targetEarnings - startVal) * eased;
        setCurrentEarnings(value);

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(tick);
        } else {
          // Wait before next member joins
          setTimeout(addNextMember, 800);
        }
      };

      animationRef.current = requestAnimationFrame(tick);
    };

    // Start after a short delay
    setTimeout(addNextMember, 600);
  };

  const formatCurrency = (val: number) => {
    return "$" + val.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  };

  const renderNode = (
    n: { x: number; y: number; r: number; label: string; avatarIdx: number; color: string },
    clipId: string,
    isActive: boolean
  ) => {
    const badgeAngle = -Math.PI / 4;
    const badgeX = n.x + (n.r - 1) * Math.cos(badgeAngle);
    const badgeY = n.y + (n.r - 1) * Math.sin(badgeAngle);
    const opacity = isActive ? 1 : 0.25;

    return (
      <g key={clipId} style={{ transition: "opacity 0.5s ease", opacity }}>
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
    );
  };

  return (
    <div ref={sectionRef} className="relative w-full max-w-[540px] mx-auto">
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
          <filter id="wh-earningsGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
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
        </defs>

        {/* Title */}
        <text x={cx} y={30} textAnchor="middle" fontSize="13" fontWeight="700"
          letterSpacing="0.15em" fill={royal} fontFamily="monospace">
          2 × 2 Wheelhouse
        </text>

        {/* Main wheel circle */}
        <circle cx={cx} cy={cy} r={wheelR} fill="none" stroke="hsl(229 77% 55% / 0.15)" strokeWidth="2" />
        <circle cx={cx} cy={cy} r={wheelR} fill="none" stroke="hsl(229 77% 55% / 0.06)" strokeWidth="10" />
        <circle cx={cx} cy={cy} r={wheelR + 8} fill="none" stroke="hsl(229 77% 55% / 0.04)" strokeWidth="4" />

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
          const strokeColor = isInner ? "hsl(100 70% 50% / 0.45)" : "hsl(229 77% 65% / 0.45)";

          return (
            <line key={`conn-${i}`}
              x1={sx} y1={sy} x2={ex} y2={ey}
              stroke={strokeColor}
              strokeWidth="2"
              markerEnd={markerEnd}
              style={{ transition: "opacity 0.5s ease", opacity: isActive ? 1 : 0.15 }}
            />
          );
        })}

        {/* All 6 nodes around the circle */}
        {allNodes.map((n, i) => renderNode(n, `wh-clip-${i}`, i < activeMembers))}

        {/* Center YOU */}
        <circle cx={cx} cy={cy} r={centerR + 6} fill="none" stroke="hsl(229 77% 55% / 0.12)" strokeWidth="6" />
        <circle cx={cx} cy={cy} r={centerR} fill={card} stroke={royal} strokeWidth="3" filter="url(#wh-softGlow)" />
        <image
          href={avatarUrls[0]}
          x={cx - centerR + 3} y={cy - centerR + 3}
          width={(centerR - 3) * 2} height={(centerR - 3) * 2}
          clipPath="url(#wh-clipCenter)"
          preserveAspectRatio="xMidYMid slice"
        />
        <circle cx={cx} cy={cy} r={centerR} fill="none" stroke={royal} strokeWidth="3" filter="url(#wh-glow)" />

        {/* YOU label */}
        <rect x={cx - 18} y={cy + 8} width="36" height="16" rx="4" fill="hsl(229 77% 55% / 0.92)" />
        <text x={cx} y={cy + 19.5} textAnchor="middle" fontSize="9" fontWeight="800" fill="white" fontFamily="sans-serif">YOU</text>

        {/* Earnings pill - large and visible */}
        <rect x={cx - 38} y={cy + 30} width="76" height="22" rx="11"
          fill={navy} stroke={activeMembers >= MEMBER_COUNT ? lime : royal} strokeWidth="1.5" />
        <text x={cx} y={cy + 44.5} textAnchor="middle" fontSize="12" fontWeight="900"
          fill={activeMembers >= MEMBER_COUNT ? lime : royal} fontFamily="monospace"
          filter="url(#wh-earningsGlow)">
          {formatCurrency(Math.round(currentEarnings))}
        </text>
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

      {/* Members joined counter */}
      <p className="text-center text-muted-foreground text-xs mt-3 tracking-wide">
        {activeMembers} of {MEMBER_COUNT} members joined
        {activeMembers >= MEMBER_COUNT && (
          <span className="ml-2 font-bold" style={{ color: lime }}>· Cycle Complete!</span>
        )}
      </p>
    </div>
  );
};

export default WheelhouseDiagram;
