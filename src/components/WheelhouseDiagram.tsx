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

// Math
const CONTRIBUTION_PER_MEMBER = 17500;
const YOU_CUT_PER_MEMBER = CONTRIBUTION_PER_MEMBER / 2;
const MEMBER_COUNT = 6;

// Layout — 3 concentric rings
const cx = 300, cy = 310;
const CENTER_R = 50;
const RING2_R = 140;  // #01, #02
const RING3_R = 220;  // #03–#06
const NODE_R = 30;

const navy = "hsl(220 30% 15%)";
const card = "hsl(0 0% 100%)";
const coral = "hsl(12 80% 58%)";
const lime = "hsl(260 60% 50%)";
const royal = "hsl(180 80% 45%)";
const brightYellow = "hsl(12 80% 58%)";

// Ring 2: #01 top, #02 bottom
const ring2Nodes = [
  { label: "01", angle: -Math.PI / 2, avatarIdx: 1 },
  { label: "02", angle: Math.PI / 2, avatarIdx: 2 },
];

// Ring 3: spread evenly across full circle — 4 nodes at 90° intervals, offset so they don't overlap ring2
const ring3Nodes = [
  { label: "03", angle: -Math.PI / 4, avatarIdx: 3, parentIdx: 0 },      // upper right — child of #01
  { label: "04", angle: -3 * Math.PI / 4, avatarIdx: 4, parentIdx: 0 },  // upper left — child of #01
  { label: "05", angle: Math.PI / 4, avatarIdx: 5, parentIdx: 1 },       // lower right — child of #02
  { label: "06", angle: 3 * Math.PI / 4, avatarIdx: 6, parentIdx: 1 },   // lower left — child of #02
];

// Activation order: #01, #02, then #03, #04 (by #01), then #05, #06 (by #02)
// stepIdx: 0=#01, 1=#02, 2=#03, 3=#04, 4=#05, 5=#06

// Arc helper
const describeArc = (cxp: number, cyp: number, r: number, startAngle: number, endAngle: number) => {
  const x1 = cxp + r * Math.cos(startAngle);
  const y1 = cyp + r * Math.sin(startAngle);
  const x2 = cxp + r * Math.cos(endAngle);
  const y2 = cyp + r * Math.sin(endAngle);
  const large = endAngle - startAngle > Math.PI ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
};

const WheelhouseDiagram = () => {
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
        safeTimeout(() => startAnimation(), 7000);
        return;
      }

      const current = memberIdx;
      memberIdx++;
      const targetMembers = memberIdx;

      setActiveMembers(targetMembers);
      setShowContribution(current);

      const startVal = (targetMembers - 1) * YOU_CUT_PER_MEMBER;
      const targetEarnings = targetMembers * YOU_CUT_PER_MEMBER;
      const duration = 1200;
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
            safeTimeout(addNextMember, 700);
          }, 800);
        }
      };

      animationRef.current = requestAnimationFrame(tick);
    };

    safeTimeout(addNextMember, 1200);
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

  const getPos = (r: number, angle: number) => ({
    x: cx + r * Math.cos(angle),
    y: cy + r * Math.sin(angle),
  });

  // Ring 2 arc segments: each member owns a half of the ring
  const renderRing2Arcs = () => {
    const gap = 0.08;
    // #01 owns top half, #02 owns bottom half
    const arcs = [
      { startAngle: -Math.PI + gap, endAngle: 0 - gap, stepIdx: 0, color: lime },
      { startAngle: 0 + gap, endAngle: Math.PI - gap, stepIdx: 1, color: lime },
    ];
    return arcs.map(({ startAngle, endAngle, stepIdx, color }) => {
      const active = stepIdx < activeMembers;
      return (
        <path
          key={`r2arc-${stepIdx}`}
          d={describeArc(cx, cy, RING2_R, startAngle, endAngle)}
          fill="none"
          stroke={active ? color : "hsl(210 30% 22%)"}
          strokeWidth={active ? 5 : 2.5}
          strokeLinecap="round"
          style={{
            transition: "stroke 0.6s ease, stroke-width 0.4s ease",
            filter: active ? `drop-shadow(0 0 6px ${color})` : "none",
          }}
        />
      );
    });
  };

  // Ring 3 arc segments: each member owns a quarter
  const renderRing3Arcs = () => {
    const gap = 0.06;
    // Map each ring3 node to its arc segment (quarter circle centered on its angle)
    const quarterSpan = Math.PI / 2;
    return ring3Nodes.map((n, i) => {
      const stepIdx = i + 2; // steps 2,3,4,5
      const active = stepIdx < activeMembers;
      const startAngle = n.angle - quarterSpan / 2 + gap;
      const endAngle = n.angle + quarterSpan / 2 - gap;
      return (
        <path
          key={`r3arc-${i}`}
          d={describeArc(cx, cy, RING3_R, startAngle, endAngle)}
          fill="none"
          stroke={active ? royal : "hsl(210 30% 20%)"}
          strokeWidth={active ? 5 : 2.5}
          strokeLinecap="round"
          style={{
            transition: "stroke 0.6s ease, stroke-width 0.4s ease",
            filter: active ? `drop-shadow(0 0 6px ${royal})` : "none",
          }}
        />
      );
    });
  };

  // Spokes: ring2 → center
  const renderRing2Spokes = () =>
    ring2Nodes.map((n, i) => {
      const pos = getPos(RING2_R, n.angle);
      const active = i < activeMembers;
      const angle = Math.atan2(cy - pos.y, cx - pos.x);
      const comesFromBelow = pos.y > cy;
      const centerGap = comesFromBelow ? CENTER_R + 38 : CENTER_R + 8;
      const sx = pos.x + (NODE_R + 4) * Math.cos(angle);
      const sy = pos.y + (NODE_R + 4) * Math.sin(angle);
      const ex = cx - centerGap * Math.cos(angle);
      const ey = cy - centerGap * Math.sin(angle);
      return (
        <line key={`spoke2-${i}`}
          x1={sx} y1={sy} x2={ex} y2={ey}
          stroke={active ? "hsl(160 70% 55% / 0.5)" : "hsl(210 30% 30% / 0.12)"}
          strokeWidth={showContribution === i ? 3 : 1.5}
          strokeDasharray={active ? "none" : "4 4"}
          markerEnd={active ? "url(#arrow-coral)" : undefined}
          style={{ transition: "stroke 0.5s ease, stroke-width 0.3s ease" }}
        />
      );
    });

  // Spokes: ring3 → parent ring2 node AND ring3 → center YOU
  const renderRing3Spokes = () =>
    ring3Nodes.map((n, i) => {
      const stepIdx = i + 2;
      const active = stepIdx < activeMembers;
      const childPos = getPos(RING3_R, n.angle);
      const parentPos = getPos(RING2_R, ring2Nodes[n.parentIdx].angle);

      // Spoke to parent
      const angle1 = Math.atan2(parentPos.y - childPos.y, parentPos.x - childPos.x);
      const sx1 = childPos.x + (NODE_R + 4) * Math.cos(angle1);
      const sy1 = childPos.y + (NODE_R + 4) * Math.sin(angle1);
      const ex1 = parentPos.x - (NODE_R + 8) * Math.cos(angle1);
      const ey1 = parentPos.y - (NODE_R + 8) * Math.sin(angle1);

      // Spoke to center YOU
      const angle2 = Math.atan2(cy - childPos.y, cx - childPos.x);
      const comesFromBelow = childPos.y > cy;
      const centerGap = comesFromBelow ? CENTER_R + 38 : CENTER_R + 8;
      const sx2 = childPos.x + (NODE_R + 4) * Math.cos(angle2);
      const sy2 = childPos.y + (NODE_R + 4) * Math.sin(angle2);
      const ex2 = cx - centerGap * Math.cos(angle2);
      const ey2 = cy - centerGap * Math.sin(angle2);

      const isContributing = showContribution === stepIdx;

      return (
        <g key={`spoke3-${i}`}>
          <line
            x1={sx1} y1={sy1} x2={ex1} y2={ey1}
            stroke={active ? "hsl(210 80% 70% / 0.45)" : "hsl(210 30% 30% / 0.1)"}
            strokeWidth={isContributing ? 3 : 1.5}
            strokeDasharray={active ? "none" : "4 4"}
            markerEnd={active ? "url(#arrow-lime)" : undefined}
            style={{ transition: "stroke 0.5s ease, stroke-width 0.3s ease" }}
          />
          <line
            x1={sx2} y1={sy2} x2={ex2} y2={ey2}
            stroke={active ? "hsl(30 90% 65% / 0.5)" : "hsl(210 30% 30% / 0.1)"}
            strokeWidth={isContributing ? 3 : 1.5}
            strokeDasharray={active ? "none" : "4 4"}
            markerEnd={active ? "url(#arrow-coral)" : undefined}
            style={{ transition: "stroke 0.5s ease, stroke-width 0.3s ease" }}
          />
        </g>
      );
    });

  const renderMemberNode = (
    x: number, y: number, label: string, avatarIdx: number,
    color: string, isActive: boolean, stepIdx: number, outAngle: number
  ) => {
    const clipId = `wh-clip-${label}`;
    const opacity = isActive ? 1 : 0;
    const badgeAngle = -Math.PI / 4;
    const badgeX = x + (NODE_R - 1) * Math.cos(badgeAngle);
    const badgeY = y + (NODE_R - 1) * Math.sin(badgeAngle);

    const contribX = x + (NODE_R + 22) * Math.cos(outAngle);
    const contribY = y + (NODE_R + 22) * Math.sin(outAngle);

    const labelDist = NODE_R + 48;
    const labelX = x + labelDist * Math.cos(outAngle);
    const labelY = y + labelDist * Math.sin(outAngle);

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
          <circle cx={badgeX} cy={badgeY} r={11} fill={navy} stroke={color} strokeWidth="1.5" />
          <text x={badgeX} y={badgeY + 3.5} textAnchor="middle" fontSize="7" fontWeight="800" fill={color} fontFamily="monospace">
            {label}
          </text>
        </g>

        {showContribution === stepIdx && (
          <g className="animate-fade-in">
            <rect x={contribX - 36} y={contribY - 10} width="72" height="20" rx="10"
              fill={navy} stroke={color} strokeWidth="1.5" opacity="0.95" />
            <text x={contribX} y={contribY + 5} textAnchor="middle" fontSize="11" fontWeight="800"
              fill={color} fontFamily="monospace">
              {formatCurrency(CONTRIBUTION_PER_MEMBER)}
            </text>
          </g>
        )}

        {showContribution === stepIdx && (
          <g className="animate-fade-in">
            <text x={labelX} y={labelY + 5} textAnchor="middle" fontSize="15" fontWeight="900"
              fill={brightYellow} fontFamily="monospace" letterSpacing="0.05em"
              filter="url(#wh-earningsGlow)">
              50%
            </text>
          </g>
        )}
      </g>
    );
  };

  return (
    <div ref={sectionRef} className="relative w-full max-w-[660px] mx-auto">
      <p className="text-center text-sm font-semibold tracking-widest uppercase text-primary mb-1">2 × 2 Wheelhouse</p>
      <h3 className="text-center text-xl md:text-2xl font-bold text-foreground mb-2 tracking-wide">
        {activeMembers} of {MEMBER_COUNT} Members Joined
      </h3>
      <svg viewBox="0 0 600 640" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
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
          <marker id="arrow-coral" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <polygon points="0 0, 8 4, 0 8" fill={coral} opacity="0.9" />
          </marker>
          <marker id="arrow-lime" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <polygon points="0 0, 8 4, 0 8" fill={lime} opacity="0.9" />
          </marker>
          <clipPath id="wh-clipCenter">
            <circle cx={cx} cy={cy} r={CENTER_R - 3} />
          </clipPath>
          <radialGradient id="celebGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={lime} stopOpacity="0.12" />
            <stop offset="70%" stopColor={lime} stopOpacity="0.04" />
            <stop offset="100%" stopColor={lime} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Celebration glow */}
        {cycleComplete && (
          <>
            <circle cx={cx} cy={cy} r={RING3_R + 30} fill="url(#celebGrad)"
              style={{ transition: "opacity 1s ease", opacity: celebrationPhase >= 1 ? 1 : 0 }} />
            <circle cx={cx} cy={cy} r={RING3_R + 8} fill="none" stroke={lime} strokeWidth="2"
              style={{ transition: "opacity 0.8s ease", opacity: celebrationPhase >= 2 ? 0.4 : 0 }} />
          </>
        )}

        {/* Ring arcs */}
        {renderRing2Arcs()}
        {renderRing3Arcs()}

        {/* Spokes */}
        {renderRing2Spokes()}
        {renderRing3Spokes()}

        {/* Ring 3 nodes (#03–#06) */}
        {ring3Nodes.map((n, i) => {
          const stepIdx = i + 2;
          const pos = getPos(RING3_R, n.angle);
          return renderMemberNode(pos.x, pos.y, n.label, n.avatarIdx, royal, stepIdx < activeMembers, stepIdx, n.angle);
        })}

        {/* Ring 2 nodes (#01, #02) */}
        {ring2Nodes.map((n, i) => {
          const pos = getPos(RING2_R, n.angle);
          return renderMemberNode(pos.x, pos.y, n.label, n.avatarIdx, lime, i < activeMembers, i, n.angle);
        })}

        {/* Persistent earnings for #01 (above) and #02 (below) */}
        {ring2Nodes.map((n, parentIdx) => {
          const childrenActive = ring3Nodes.filter(
            (r3, i) => r3.parentIdx === parentIdx && (i + 2) < activeMembers
          ).length;
          if (childrenActive === 0) return null;

          const parentPos = getPos(RING2_R, n.angle);
          const totalEarned = childrenActive * YOU_CUT_PER_MEMBER;

          // #01 is at top (parentIdx 0) → show above; #02 is at bottom (parentIdx 1) → show below
          const pillX = parentPos.x;
          const pillY = parentIdx === 0
            ? parentPos.y - NODE_R - 32  // above #01
            : parentPos.y + NODE_R + 22; // below #02


          return (
            <g key={`r2-earn-${parentIdx}`} className="animate-fade-in">
              <rect x={pillX - 44} y={pillY - 12} width="88" height="24" rx="12"
                fill={navy} stroke={brightYellow} strokeWidth="1.5" opacity="0.95" />
              <text x={pillX} y={pillY + 5} textAnchor="middle" fontSize="12" fontWeight="800"
                fill={brightYellow} fontFamily="monospace">
                +{formatCurrency(totalEarned)}
              </text>
            </g>
          );
        })}

        {/* Center YOU */}
        <circle cx={cx} cy={cy} r={CENTER_R + 5} fill="none"
          stroke={cycleComplete ? "hsl(45 100% 65% / 0.35)" : "hsl(30 90% 65% / 0.2)"}
          strokeWidth="5" style={{ transition: "stroke 1s ease" }} />
        <circle cx={cx} cy={cy} r={CENTER_R} fill={card} stroke={cycleComplete ? brightYellow : coral}
          strokeWidth="3" filter="url(#wh-softGlow)" style={{ transition: "stroke 0.8s ease" }} />
        <image
          href={avatarUrls[0]}
          x={cx - CENTER_R + 3} y={cy - CENTER_R + 3}
          width={(CENTER_R - 3) * 2} height={(CENTER_R - 3) * 2}
          clipPath="url(#wh-clipCenter)"
          preserveAspectRatio="xMidYMid slice"
        />
        <circle cx={cx} cy={cy} r={CENTER_R} fill="none" stroke={cycleComplete ? brightYellow : coral}
          strokeWidth="3" filter={cycleComplete ? "url(#wh-celebGlow)" : "url(#wh-glow)"}
          style={{ transition: "stroke 0.8s ease" }} />

        {/* YOU label */}
        <rect x={cx - 24} y={cy + 10} width="48" height="22" rx="6" fill="hsl(30 90% 55% / 0.92)" />
        <text x={cx} y={cy + 26} textAnchor="middle" fontSize="13" fontWeight="800" fill="white" fontFamily="sans-serif">YOU</text>

        {/* Earnings pill */}
        <rect x={cx - 58} y={cy + 38} width="116" height="34" rx="17"
          fill={navy} stroke={cycleComplete ? brightYellow : coral} strokeWidth="2.5"
          style={{ transition: "stroke 0.8s ease" }} />
        <text x={cx} y={cy + 61} textAnchor="middle" fontSize="22" fontWeight="900"
          fill={cycleComplete ? brightYellow : "hsl(0 0% 100%)"} fontFamily="monospace"
          filter="url(#wh-earningsGlow)"
          style={{ transition: "fill 0.8s ease" }}>
          {formatCurrency(Math.round(currentEarnings))}
        </text>

      </svg>

      {/* Completion text */}
      {cycleComplete && celebrationPhase >= 2 && (
        <div className="text-center animate-fade-in mt-3 mb-4">
          <p className="text-xl md:text-2xl font-extrabold tracking-tight" style={{ color: brightYellow, textShadow: `0 0 20px hsl(12 80% 58% / 0.4)` }}>
            Wheelhouse Complete
          </p>
          <p className="text-xs tracking-[0.35em] uppercase font-semibold mt-1.5" style={{ color: brightYellow, opacity: 0.7 }}>
            Mobius Loop Activated
          </p>
        </div>
      )}
    </div>
  );
};

export default WheelhouseDiagram;
