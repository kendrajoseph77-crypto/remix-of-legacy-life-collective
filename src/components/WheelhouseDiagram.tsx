import { useState, useEffect, useRef, useCallback } from "react";

const avatarUrls = [
  "https://randomuser.me/api/portraits/men/83.jpg",
  "https://randomuser.me/api/portraits/women/92.jpg",
  "https://randomuser.me/api/portraits/men/6.jpg",
  "https://randomuser.me/api/portraits/women/95.jpg",
  "https://randomuser.me/api/portraits/men/11.jpg",
  "https://randomuser.me/api/portraits/women/74.jpg",
  "https://randomuser.me/api/portraits/men/36.jpg",
];

// Math: 6 members × $17,500 contribution × 50% to YOU = $52,500
const CONTRIBUTION_PER_MEMBER = 17500;
const YOU_CUT_PER_MEMBER = CONTRIBUTION_PER_MEMBER / 2; // $8,750
const MEMBER_COUNT = 6;
const FINAL_EARNINGS = MEMBER_COUNT * YOU_CUT_PER_MEMBER; // $52,500

// Ring radii
const CENTER_R = 58;
const RING2_R = 135; // #01, #02
const RING3_R = 200; // #03–#06
const NODE_R = 34;

// Positions
const cx = 250, cy = 260;

// Ring 2: #01 top, #02 bottom
const ring2Nodes = [
  { label: "01", angle: -Math.PI / 2, avatarIdx: 1, activates: [0, 1] }, // activates #03, #04
  { label: "02", angle: Math.PI / 2, avatarIdx: 2, activates: [2, 3] },  // activates #05, #06
];

// Ring 3: #03, #04 upper half, #05, #06 lower half
const ring3Angles = [
  -Math.PI / 3,      // #03 upper right
  -2 * Math.PI / 3,  // #04 upper left
  Math.PI / 3,       // #05 lower right
  2 * Math.PI / 3,   // #06 lower left
];
const ring3Nodes = ring3Angles.map((angle, i) => ({
  label: String(i + 3).padStart(2, "0"),
  angle,
  avatarIdx: i + 3,
}));

// Activation order: #01, #02, then #03, #04 (by #01), then #05, #06 (by #02)
const activationOrder = [
  { ring: 2, idx: 0 }, // #01
  { ring: 2, idx: 1 }, // #02
  { ring: 3, idx: 0, activatedBy: 0 }, // #03 by #01
  { ring: 3, idx: 1, activatedBy: 0 }, // #04 by #01
  { ring: 3, idx: 2, activatedBy: 1 }, // #05 by #02
  { ring: 3, idx: 3, activatedBy: 1 }, // #06 by #02
];

const WheelhouseDiagram = () => {
  const royal = "hsl(229 77% 65%)";
  const lime = "hsl(100 70% 50%)";
  const coral = "hsl(0 80% 60%)";
  const navy = "hsl(254 60% 10%)";
  const card = "hsl(254 55% 14%)";
  const gold = "hsl(45 100% 55%)";
  const brightYellow = "hsl(50 100% 60%)";

  const [activeMembers, setActiveMembers] = useState(0);
  const [currentEarnings, setCurrentEarnings] = useState(0);
  const [showContribution, setShowContribution] = useState<number | null>(null);
  const [cycleComplete, setCycleComplete] = useState(false);
  const [celebrationPhase, setCelebrationPhase] = useState(0);
  const animationRef = useRef<number | null>(null);
  const hasStarted = useRef(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
  }, []);

  const safeTimeout = useCallback((fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timeoutsRef.current.push(id);
    return id;
  }, []);

  const resetState = useCallback(() => {
    clearAllTimeouts();
    setActiveMembers(0);
    setCurrentEarnings(0);
    setShowContribution(null);
    setCycleComplete(false);
    setCelebrationPhase(0);
  }, [clearAllTimeouts]);

  const startAnimation = useCallback(() => {
    resetState();

    let memberIdx = 0;

    const addNextMember = () => {
      if (memberIdx >= MEMBER_COUNT) {
        setCycleComplete(true);
        safeTimeout(() => setCelebrationPhase(1), 100);
        safeTimeout(() => setCelebrationPhase(2), 600);
        safeTimeout(() => setCelebrationPhase(3), 1200);
        // Loop after 5 seconds
        safeTimeout(() => {
          startAnimation();
        }, 5000);
        return;
      }

      const current = memberIdx;
      memberIdx++;
      const targetMembers = memberIdx;

      setActiveMembers(targetMembers);
      setShowContribution(current);

      // Animate earnings climbing
      const startVal = (targetMembers - 1) * YOU_CUT_PER_MEMBER;
      const targetEarnings = targetMembers * YOU_CUT_PER_MEMBER;
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
          safeTimeout(() => {
            setShowContribution(null);
            safeTimeout(addNextMember, 400);
          }, 500);
        }
      };

      animationRef.current = requestAnimationFrame(tick);
    };

    safeTimeout(addNextMember, 800);
  }, [resetState, safeTimeout]);

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
    return () => {
      observer.disconnect();
      clearAllTimeouts();
    };
  }, [startAnimation, clearAllTimeouts]);

  const formatCurrency = (val: number) =>
    "$" + val.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  const getNodePos = (ring: number, angle: number) => ({
    x: cx + (ring === 2 ? RING2_R : RING3_R) * Math.cos(angle),
    y: cy + (ring === 2 ? RING2_R : RING3_R) * Math.sin(angle),
  });

  const isNodeActive = (stepIdx: number) => stepIdx < activeMembers;

  const renderNode = (
    x: number, y: number, label: string, avatarIdx: number,
    color: string, isActive: boolean, stepIdx: number, outAngle: number
  ) => {
    const clipId = `wh-clip-${label}`;
    const badgeAngle = -Math.PI / 4;
    const badgeX = x + (NODE_R - 1) * Math.cos(badgeAngle);
    const badgeY = y + (NODE_R - 1) * Math.sin(badgeAngle);
    const opacity = isActive ? 1 : 0.2;

    const contribX = x + (NODE_R + 22) * Math.cos(outAngle);
    const contribY = y + (NODE_R + 22) * Math.sin(outAngle);

    return (
      <g key={clipId}>
        <g style={{ transition: "opacity 0.6s ease", opacity }}>
          <clipPath id={clipId}>
            <circle cx={x} cy={y} r={NODE_R - 3} />
          </clipPath>
          <circle cx={x} cy={y} r={NODE_R} fill={card} stroke={color} strokeWidth="2.5" />
          <image
            href={avatarUrls[avatarIdx]}
            x={x - NODE_R + 3} y={y - NODE_R + 3}
            width={(NODE_R - 3) * 2} height={(NODE_R - 3) * 2}
            clipPath={`url(#${clipId})`}
            preserveAspectRatio="xMidYMid slice"
          />
          <circle cx={x} cy={y} r={NODE_R} fill="none" stroke={color} strokeWidth="2.5" filter="url(#wh-glow)" />
          <circle cx={badgeX} cy={badgeY} r={12} fill={navy} stroke={color} strokeWidth="1.5" />
          <text x={badgeX} y={badgeY + 4} textAnchor="middle" fontSize="7" fontWeight="800" fill={color} fontFamily="monospace">
            {label}
          </text>
        </g>

        {showContribution === stepIdx && (
          <g className="animate-fade-in">
            <rect x={contribX - 28} y={contribY - 8} width="56" height="16" rx="8"
              fill={navy} stroke={color} strokeWidth="1" opacity="0.95" />
            <text x={contribX} y={contribY + 3} textAnchor="middle" fontSize="8" fontWeight="800"
              fill={color} fontFamily="monospace">
              {formatCurrency(CONTRIBUTION_PER_MEMBER)}
            </text>
          </g>
        )}
      </g>
    );
  };

  const renderConnector = (
    fromX: number, fromY: number, toX: number, toY: number,
    color: string, markerId: string, isActive: boolean, isHighlighted: boolean
  ) => {
    const angle = Math.atan2(toY - fromY, toX - fromX);
    const sx = fromX + (NODE_R + 4) * Math.cos(angle);
    const sy = fromY + (NODE_R + 4) * Math.sin(angle);
    const ex = toX - (NODE_R + 10) * Math.cos(angle);
    const ey = toY - (NODE_R + 10) * Math.sin(angle);

    return (
      <line
        x1={sx} y1={sy} x2={ex} y2={ey}
        stroke={color}
        strokeWidth={isHighlighted ? 3 : 2}
        markerEnd={`url(#${markerId})`}
        style={{ transition: "opacity 0.5s ease, stroke-width 0.3s ease", opacity: isActive ? 1 : 0.12 }}
      />
    );
  };

  const renderFlowLabel = (
    fromX: number, fromY: number, toX: number, toY: number, stepIdx: number
  ) => {
    if (showContribution !== stepIdx) return null;
    const midX = (fromX + toX) / 2;
    const midY = (fromY + toY) / 2;
    const angle = Math.atan2(toY - fromY, toX - fromX);
    // Push label further out perpendicular to the connector so it doesn't overlap the center earnings pill
    const perpDist = 40;
    const perpX = midX + perpDist * Math.cos(angle + Math.PI / 2);
    const perpY = midY + perpDist * Math.sin(angle + Math.PI / 2);

    return (
      <g className="animate-fade-in">
        <rect x={perpX - 34} y={perpY - 12} width="68" height="24" rx="12"
          fill={gold} opacity="0.95" filter="url(#wh-earningsGlow)" />
        <text x={perpX} y={perpY + 5} textAnchor="middle" fontSize="11" fontWeight="900"
          fill={navy} fontFamily="monospace" letterSpacing="0.05em">
          50% → YOU
        </text>
      </g>
    );
  };

  return (
    <div ref={sectionRef} className="relative w-full max-w-[540px] mx-auto">
      <svg viewBox="0 0 500 560" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
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
          <marker id="arrow-coral" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <polygon points="0 0, 8 4, 0 8" fill={coral} opacity="0.9" />
          </marker>
          <clipPath id="wh-clipCenter">
            <circle cx={cx} cy={cy} r={CENTER_R - 3} />
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

        {/* Celebration glow */}
        {cycleComplete && (
          <>
            <circle cx={cx} cy={cy} r={RING3_R + 30} fill="url(#celebGrad)"
              style={{ transition: "opacity 1s ease", opacity: celebrationPhase >= 1 ? 1 : 0 }} />
            <circle cx={cx} cy={cy} r={RING3_R + 8} fill="none" stroke={lime} strokeWidth="2"
              style={{ transition: "opacity 0.8s ease", opacity: celebrationPhase >= 2 ? 0.4 : 0 }} />
            <circle cx={cx} cy={cy} r={RING3_R + 20} fill="none" stroke={lime} strokeWidth="1"
              style={{ transition: "opacity 1s ease 0.3s", opacity: celebrationPhase >= 3 ? 0.2 : 0 }} />
          </>
        )}

        {/* Ring guides */}
        <circle cx={cx} cy={cy} r={RING2_R} fill="none"
          stroke={cycleComplete ? "hsl(100 70% 50% / 0.15)" : "hsl(229 77% 55% / 0.1)"}
          strokeWidth="1.5" strokeDasharray="4 4" style={{ transition: "stroke 1s ease" }} />
        <circle cx={cx} cy={cy} r={RING3_R} fill="none"
          stroke={cycleComplete ? "hsl(100 70% 50% / 0.15)" : "hsl(229 77% 55% / 0.1)"}
          strokeWidth="1.5" strokeDasharray="4 4" style={{ transition: "stroke 1s ease" }} />

        {/* Connectors: Ring2 nodes → YOU (center) */}
        {ring2Nodes.map((n, i) => {
          const pos = getNodePos(2, n.angle);
          const active = isNodeActive(i);
          const angleToCenter = Math.atan2(cy - pos.y, cx - pos.x);
          const sx = pos.x + (NODE_R + 4) * Math.cos(angleToCenter);
          const sy = pos.y + (NODE_R + 4) * Math.sin(angleToCenter);
          const ex = cx - (CENTER_R + 10) * Math.cos(angleToCenter);
          const ey = cy - (CENTER_R + 10) * Math.sin(angleToCenter);

          return (
            <g key={`conn-r2-${i}`}>
              <line x1={sx} y1={sy} x2={ex} y2={ey}
                stroke="hsl(100 70% 50% / 0.5)"
                strokeWidth={showContribution === i ? 3 : 2}
                markerEnd="url(#arrow-coral)"
                style={{ transition: "opacity 0.5s ease, stroke-width 0.3s ease", opacity: active ? 1 : 0.12 }}
              />
            </g>
          );
        })}

        {/* Connectors: Ring3 nodes → their activating Ring2 node */}
        {ring3Nodes.map((n, i) => {
          const step = activationOrder.find(a => a.ring === 3 && a.idx === i)!;
          const stepIdx = activationOrder.indexOf(step);
          const parentNode = ring2Nodes[step.activatedBy!];
          const parentPos = getNodePos(2, parentNode.angle);
          const childPos = getNodePos(3, n.angle);
          const active = isNodeActive(stepIdx);

          return (
            <g key={`conn-r3-${i}`}>
              {renderConnector(childPos.x, childPos.y, parentPos.x, parentPos.y,
                "hsl(229 77% 65% / 0.45)", "arrow-lime", active, showContribution === stepIdx)}
            </g>
          );
        })}

        {/* Ring 3 nodes (#03–#06) */}
        {ring3Nodes.map((n, i) => {
          const step = activationOrder.find(a => a.ring === 3 && a.idx === i)!;
          const stepIdx = activationOrder.indexOf(step);
          const pos = getNodePos(3, n.angle);
          return renderNode(pos.x, pos.y, n.label, n.avatarIdx, royal, isNodeActive(stepIdx), stepIdx, n.angle);
        })}

        {/* Ring 2 nodes (#01, #02) */}
        {ring2Nodes.map((n, i) => {
          const pos = getNodePos(2, n.angle);
          return renderNode(pos.x, pos.y, n.label, n.avatarIdx, lime, isNodeActive(i), i, n.angle);
        })}

        {/* Center YOU — coral ring, yellow glow on complete */}
        <circle cx={cx} cy={cy} r={CENTER_R + 6} fill="none"
          stroke={cycleComplete ? "hsl(50 100% 60% / 0.35)" : "hsl(0 80% 60% / 0.2)"}
          strokeWidth="6" style={{ transition: "stroke 1s ease" }} />
        <circle cx={cx} cy={cy} r={CENTER_R} fill={card} stroke={cycleComplete ? brightYellow : coral}
          strokeWidth="3.5" filter="url(#wh-softGlow)" style={{ transition: "stroke 0.8s ease" }} />
        <image
          href={avatarUrls[0]}
          x={cx - CENTER_R + 3} y={cy - CENTER_R + 3}
          width={(CENTER_R - 3) * 2} height={(CENTER_R - 3) * 2}
          clipPath="url(#wh-clipCenter)"
          preserveAspectRatio="xMidYMid slice"
        />
        <circle cx={cx} cy={cy} r={CENTER_R} fill="none" stroke={cycleComplete ? brightYellow : coral}
          strokeWidth="3.5" filter={cycleComplete ? "url(#wh-celebGlow)" : "url(#wh-glow)"}
          style={{ transition: "stroke 0.8s ease" }} />

        {/* YOU label */}
        <rect x={cx - 22} y={cy + 12} width="44" height="20" rx="5" fill="hsl(0 80% 50% / 0.92)" />
        <text x={cx} y={cy + 26} textAnchor="middle" fontSize="12" fontWeight="800" fill="white" fontFamily="sans-serif">YOU</text>

        {/* Earnings pill */}
        <rect x={cx - 52} y={cy + 38} width="104" height="32" rx="16"
          fill={navy} stroke={cycleComplete ? brightYellow : coral} strokeWidth="2"
          style={{ transition: "stroke 0.8s ease" }} />
        <text x={cx} y={cy + 60} textAnchor="middle" fontSize="22" fontWeight="900"
          fill={cycleComplete ? brightYellow : "hsl(0 0% 100%)"}  fontFamily="monospace"
          filter="url(#wh-earningsGlow)"
          style={{ transition: "fill 0.8s ease" }}>
          {formatCurrency(Math.round(currentEarnings))}
        </text>

        {/* Flow labels — rendered last so they appear on top of everything */}
        {ring2Nodes.map((n, i) => {
          const pos = getNodePos(2, n.angle);
          return <g key={`flow-r2-${i}`}>{renderFlowLabel(pos.x, pos.y, cx, cy, i)}</g>;
        })}
        {ring3Nodes.map((n, i) => {
          const step = activationOrder.find(a => a.ring === 3 && a.idx === i)!;
          const stepIdx = activationOrder.indexOf(step);
          const childPos = getNodePos(3, n.angle);
          return <g key={`flow-r3-${i}`}>{renderFlowLabel(childPos.x, childPos.y, cx, cy, stepIdx)}</g>;
        })}
      </svg>

      {/* Completion text — below the SVG */}
      {cycleComplete && celebrationPhase >= 2 && (
        <div className="text-center animate-fade-in mt-2 mb-4">
          <p className="text-2xl md:text-3xl font-bold tracking-wide" style={{ color: brightYellow }}>
            🎉 Wheelhouse Complete!
          </p>
          <p className="text-lg md:text-xl font-semibold tracking-widest mt-1" style={{ color: brightYellow, opacity: 0.85 }}>
            Möbius Loop Activated.
          </p>
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-1 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ background: coral }} />
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
