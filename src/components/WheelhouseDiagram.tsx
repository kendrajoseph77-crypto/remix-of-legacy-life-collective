import { useState, useEffect, useRef, useCallback } from "react";
import { RotateCcw, Pause, Play, SkipForward } from "lucide-react";

const avatarUrls = [
  "https://randomuser.me/api/portraits/men/83.jpg",
  "https://randomuser.me/api/portraits/women/92.jpg",
  "https://randomuser.me/api/portraits/men/6.jpg",
  "https://randomuser.me/api/portraits/women/95.jpg",
  "https://randomuser.me/api/portraits/men/11.jpg",
  "https://randomuser.me/api/portraits/women/74.jpg",
  "https://randomuser.me/api/portraits/men/36.jpg",
];

const CONTRIBUTION_PER_MEMBER = 17500;
const YOU_CUT_PER_MEMBER = CONTRIBUTION_PER_MEMBER / 2;
const MEMBER_COUNT = 6;
const VISIBLE_WHEELHOUSES = 6; // show 6 mini thumbnails
const TOTAL_CYCLES = 12; // animate up to 12 then stop
const CYCLE_EARNINGS = YOU_CUT_PER_MEMBER * MEMBER_COUNT; // $52,500

// Layout for the main SVG wheelhouse
const cx = 300, cy = 300;
const CENTER_R = 38;
const RING2_R = 150;
const RING3_R = 240;
const NODE_R = 28;

const navy = "hsl(220 30% 15%)";
const card = "hsl(0 0% 100%)";
const coral = "hsl(38 55% 62%)";
const lime = "hsl(260 60% 50%)";
const royal = "hsl(180 80% 45%)";
const brightYellow = "hsl(38 55% 62%)";

const ring2Nodes = [
  { label: "01", angle: -Math.PI / 2, avatarIdx: 1 },
  { label: "02", angle: Math.PI / 2, avatarIdx: 2 },
];

const ring3Nodes = [
  { label: "03", angle: -Math.PI / 4, avatarIdx: 3, parentIdx: 0 },
  { label: "04", angle: -3 * Math.PI / 4, avatarIdx: 4, parentIdx: 0 },
  { label: "05", angle: Math.PI / 4, avatarIdx: 5, parentIdx: 1 },
  { label: "06", angle: 3 * Math.PI / 4, avatarIdx: 6, parentIdx: 1 },
];

const describeArc = (cxp: number, cyp: number, r: number, startAngle: number, endAngle: number) => {
  const x1 = cxp + r * Math.cos(startAngle);
  const y1 = cyp + r * Math.sin(startAngle);
  const x2 = cxp + r * Math.cos(endAngle);
  const y2 = cyp + r * Math.sin(endAngle);
  const large = endAngle - startAngle > Math.PI ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
};

const formatCurrency = (val: number) =>
  "$" + val.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });

// Mini wheelhouse thumbnail component
const MiniWheelhouse = ({ index, total }: { index: number; total: number }) => {
  const s = 80; // svg size
  const mcx = s / 2, mcy = s / 2;
  const mr1 = 18, mr2 = 30, mnr = 6;

  return (
    <div
      className="flex flex-col items-center animate-scale-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
        {/* Rings */}
        <circle cx={mcx} cy={mcy} r={mr1} fill="none" stroke={lime} strokeWidth="1.5" opacity="0.5" />
        <circle cx={mcx} cy={mcy} r={mr2} fill="none" stroke={royal} strokeWidth="1.5" opacity="0.5" />
        {/* Center */}
        <circle cx={mcx} cy={mcy} r={mnr + 2} fill={coral} opacity="0.9" />
        <text x={mcx} y={mcy + 2.5} textAnchor="middle" fontSize="5" fontWeight="800" fill="white" fontFamily="sans-serif">YOU</text>
        {/* Ring 2 dots */}
        {ring2Nodes.map((n, i) => (
          <circle key={`m2-${i}`} cx={mcx + mr1 * Math.cos(n.angle)} cy={mcy + mr1 * Math.sin(n.angle)} r={mnr} fill={lime} opacity="0.7" />
        ))}
        {/* Ring 3 dots */}
        {ring3Nodes.map((n, i) => (
          <circle key={`m3-${i}`} cx={mcx + mr2 * Math.cos(n.angle)} cy={mcy + mr2 * Math.sin(n.angle)} r={mnr} fill={royal} opacity="0.7" />
        ))}
      </svg>
      <p className="text-xs font-bold text-foreground mt-1">Wheel {index + 1}</p>
      <p className="text-xs font-mono font-bold" style={{ color: coral }}>
        {formatCurrency(CYCLE_EARNINGS * (index + 1))}
      </p>
    </div>
  );
};

const WheelhouseDiagram = () => {
  const [activeMembers, setActiveMembers] = useState(0);
  const [currentEarnings, setCurrentEarnings] = useState(0);
  const [showContribution, setShowContribution] = useState<number | null>(null);
  const [cycleComplete, setCycleComplete] = useState(false);
  const [celebrationPhase, setCelebrationPhase] = useState(0);
  const [completedWheelhouses, setCompletedWheelhouses] = useState(0);
  const [shrinking, setShrinking] = useState(false);
  const animationRef = useRef<number | null>(null);
  const hasStarted = useRef(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [animationDone, setAnimationDone] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const isPausedRef = useRef(false);
  const currentCycleRef = useRef(0);

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

  const resetCycle = useCallback(() => {
    setActiveMembers(0);
    setCurrentEarnings(0);
    setShowContribution(null);
    setCycleComplete(false);
    setCelebrationPhase(0);
    setShrinking(false);
  }, []);

  const togglePause = useCallback(() => {
    setIsPaused(prev => {
      const next = !prev;
      isPausedRef.current = next;
      if (!next) {
        // Resume: restart from current cycle
        clearAllTimeouts();
        startCycleRef.current(currentCycleRef.current);
      } else {
        // Pause: stop all timers
        clearAllTimeouts();
      }
      return next;
    });
  }, [clearAllTimeouts]);

  const skipToNextWheel = useCallback(() => {
    clearAllTimeouts();
    isPausedRef.current = false;
    setIsPaused(false);
    const nextCycle = currentCycleRef.current + 1;
    if (nextCycle < TOTAL_CYCLES) {
      setCompletedWheelhouses(nextCycle);
      resetCycle();
      currentCycleRef.current = nextCycle;
      setTimeout(() => startCycleRef.current(nextCycle), 200);
    } else {
      setCompletedWheelhouses(TOTAL_CYCLES);
      setShrinking(true);
      setCelebrationPhase(3);
      setTimeout(() => setAnimationDone(true), 800);
    }
  }, [clearAllTimeouts, resetCycle]);

  const startCycleRef = useRef<(n: number) => void>(() => {});

  // Speed multiplier for auto-play
  const getSpeedMultiplier = (cycleNum: number) => {
    if (cycleNum === 0) return 3.0;
    if (cycleNum === 1) return 2.5;
    if (cycleNum === 2) return 2.0;
    if (cycleNum === 3) return 1.6;
    if (cycleNum === 4) return 1.3;
    if (cycleNum === 5) return 1.1;
    if (cycleNum <= 8) return 0.9;
    return 0.7;
  };

  // ── Auto-play logic ──
  const startCycle = useCallback((cycleNum: number) => {
    currentCycleRef.current = cycleNum;
    resetCycle();
    let memberIdx = 0;
    const speed = getSpeedMultiplier(cycleNum);

    const addNextMember = () => {
      if (memberIdx >= MEMBER_COUNT) {
        setCycleComplete(true);
        safeTimeout(() => setCelebrationPhase(1), 50 * speed);
        safeTimeout(() => setCelebrationPhase(2), 300 * speed);
        if (cycleNum < TOTAL_CYCLES - 1) {
          const pauseTime = cycleNum === 0 ? 2500 : Math.max(800 * speed, 200);
          safeTimeout(() => setShrinking(true), pauseTime);
          safeTimeout(() => {
            setCompletedWheelhouses(cycleNum + 1);
            resetCycle();
            safeTimeout(() => startCycle(cycleNum + 1), 300 * speed);
          }, pauseTime + 700 * speed);
        } else {
          safeTimeout(() => {
            setCompletedWheelhouses(cycleNum + 1);
            setShrinking(true);
            setCelebrationPhase(3);
            safeTimeout(() => setAnimationDone(true), 800);
          }, 2500);
        }
        return;
      }

      const current = memberIdx;
      memberIdx++;
      const targetMembers = memberIdx;
      setActiveMembers(targetMembers);
      setShowContribution(current);

      const startVal = (targetMembers - 1) * YOU_CUT_PER_MEMBER;
      const targetEarnings = targetMembers * YOU_CUT_PER_MEMBER;
      const duration = 600 * speed;
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
            safeTimeout(addNextMember, 300 * speed);
          }, 400 * speed);
        }
      };
      animationRef.current = requestAnimationFrame(tick);
    };

    safeTimeout(addNextMember, 500 * speed);
  }, [resetCycle, safeTimeout]);

  // Keep ref in sync
  useEffect(() => { startCycleRef.current = startCycle; }, [startCycle]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          startCycle(0);
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      observer.disconnect();
      clearAllTimeouts();
    };
  }, [startCycle, clearAllTimeouts]);

  const getPos = (r: number, angle: number) => ({
    x: cx + r * Math.cos(angle),
    y: cy + r * Math.sin(angle),
  });

  const renderRing2Arcs = () => {
    const gap = 0.08;
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

  const renderRing3Arcs = () => {
    const gap = 0.06;
    const quarterSpan = Math.PI / 2;
    return ring3Nodes.map((n, i) => {
      const stepIdx = i + 2;
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

  const renderRing2Spokes = () =>
    ring2Nodes.map((n, i) => {
      const pos = getPos(RING2_R, n.angle);
      const active = i < activeMembers;
      const angle = Math.atan2(cy - pos.y, cx - pos.x);
      const comesFromBelow = pos.y > cy;
      const centerGap = comesFromBelow ? CENTER_R + 48 : CENTER_R + 8;
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

  const renderRing3Spokes = () =>
    ring3Nodes.map((n, i) => {
      const stepIdx = i + 2;
      const active = stepIdx < activeMembers;
      const childPos = getPos(RING3_R, n.angle);
      const parentPos = getPos(RING2_R, ring2Nodes[n.parentIdx].angle);

      const angle1 = Math.atan2(parentPos.y - childPos.y, parentPos.x - childPos.x);
      const sx1 = childPos.x + (NODE_R + 4) * Math.cos(angle1);
      const sy1 = childPos.y + (NODE_R + 4) * Math.sin(angle1);
      const ex1 = parentPos.x - (NODE_R + 8) * Math.cos(angle1);
      const ey1 = parentPos.y - (NODE_R + 8) * Math.sin(angle1);

      const angle2 = Math.atan2(cy - childPos.y, cx - childPos.x);
      const comesFromBelow = childPos.y > cy;
      const centerGap = comesFromBelow ? CENTER_R + 28 : CENTER_R + 8;
      const sx2 = childPos.x + (NODE_R + 4) * Math.cos(angle2);
      const sy2 = childPos.y + (NODE_R + 4) * Math.sin(angle2);
      const ex2 = cx - centerGap * Math.cos(angle2);
      const ey2 = cy - centerGap * Math.sin(angle2);

      const isContributing = showContribution === stepIdx;

      const midX1 = (sx1 + ex1) / 2;
      const midY1 = (sy1 + ey1) / 2;

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
          {/* 50% label on spoke to inviter (ring2 parent) */}
          {active && (
            <text x={midX1} y={midY1 + 4} textAnchor="middle" fontSize="10" fontWeight="700"
              fill={lime} fontFamily="sans-serif" letterSpacing="0.03em"
              filter="url(#wh-earningsGlow)" className="animate-fade-in">
              50%
            </text>
          )}
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
          <text x={badgeX} y={badgeY + 3.5} textAnchor="middle" fontSize="7" fontWeight="800" fill="white" fontFamily="monospace">
            {label}
          </text>
        </g>

        {showContribution === stepIdx && (
          <g className="animate-fade-in">
            <rect x={contribX - 48} y={contribY - 12} width="96" height="24" rx="12"
              fill={navy} stroke={color} strokeWidth="1.5" opacity="0.95" />
            <text x={contribX} y={contribY + 5} textAnchor="middle" fontSize="10" fontWeight="800"
              fill="white" fontFamily="monospace">
              {formatCurrency(CONTRIBUTION_PER_MEMBER)}
            </text>
          </g>
        )}

        {/* Persistent 50% label on spoke to center — visible once member is active */}
        {isActive && (
          <g className="animate-fade-in">
            {(() => {
              const midX = (x + cx) / 2;
              const midY = (y + cy) / 2 + 6;
              return (
                <text x={midX} y={midY + 4} textAnchor="middle" fontSize="10" fontWeight="700"
                  fill={brightYellow} fontFamily="sans-serif" letterSpacing="0.03em"
                  filter="url(#wh-earningsGlow)">
                  50%
                </text>
              );
            })()}
          </g>
        )}

      </g>
    );
  };

  const renderEarningsPills = () =>
    ring2Nodes.map((n, parentIdx) => {
      const childrenActive = ring3Nodes.filter(
        (r3, i) => r3.parentIdx === parentIdx && (i + 2) < activeMembers
      ).length;
      if (childrenActive === 0) return null;
      const parentPos = getPos(RING2_R, n.angle);
      const totalEarned = childrenActive * YOU_CUT_PER_MEMBER;
      const pillX = parentPos.x;
      const pillY = parentIdx === 0
        ? parentPos.y - NODE_R - 32
        : parentPos.y + NODE_R + 22;

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
    });

  return (
    <div ref={sectionRef} className="relative w-full">
      <div className="flex flex-col md:flex-row gap-6 items-start justify-center max-w-5xl mx-auto">
        {/* Left: Main wheelhouse animation */}
        <div className="flex-1 max-w-[500px]">
      {/* Main active wheelhouse — hidden entirely once animation is done */}
      {!animationDone && (
      <div
        className="transition-all duration-700 ease-in-out origin-top-left"
        style={{
          transform: shrinking ? "scale(0)" : "scale(1)",
          opacity: shrinking ? 0 : 1,
          height: animationDone ? 0 : undefined,
          overflow: animationDone ? 'hidden' : undefined,
        }}
      >
        <svg viewBox="0 0 600 620" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
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

          {renderRing2Arcs()}
          {renderRing3Arcs()}
          {renderRing2Spokes()}
          {renderRing3Spokes()}

          {ring3Nodes.map((n, i) => {
            const stepIdx = i + 2;
            const pos = getPos(RING3_R, n.angle);
            return renderMemberNode(pos.x, pos.y, n.label, n.avatarIdx, royal, stepIdx < activeMembers, stepIdx, n.angle);
          })}

          {ring2Nodes.map((n, i) => {
            const pos = getPos(RING2_R, n.angle);
            return renderMemberNode(pos.x, pos.y, n.label, n.avatarIdx, lime, i < activeMembers, i, n.angle);
          })}

          {renderEarningsPills()}

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

          <rect x={cx - 24} y={cy + 10} width="48" height="22" rx="6" fill="hsl(30 90% 55% / 0.92)" />
          <text x={cx} y={cy + 26} textAnchor="middle" fontSize="13" fontWeight="800" fill="white" fontFamily="sans-serif">YOU</text>

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

        {/* Completion text — right below the SVG */}
        {cycleComplete && celebrationPhase >= 2 && (
          <div className="text-center animate-fade-in -mt-2 mb-2">
            <p className="text-lg md:text-xl font-extrabold tracking-tight" style={{ color: brightYellow, textShadow: `0 0 20px hsl(38 55% 62% / 0.4)` }}>
              Wheelhouse Complete
            </p>
            <p className="text-xs tracking-[0.35em] uppercase font-semibold mt-1" style={{ color: brightYellow, opacity: 0.7 }}>
              Mobius Loop Activated — Your Team Follows You
            </p>
          </div>
        )}
      </div>
      )}

      {/* Playback controls */}
      {!animationDone && (
        <div className="flex items-center justify-center gap-3 mt-2 mb-1">
          <button
            onClick={togglePause}
            className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
            aria-label={isPaused ? "Play" : "Pause"}
          >
            {isPaused ? <Play size={14} /> : <Pause size={14} />}
          </button>
          <button
            onClick={skipToNextWheel}
            className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
            aria-label="Skip to next wheel"
          >
            <SkipForward size={14} />
          </button>
        </div>
      )}

      {animationDone && (
        <div className="text-center animate-fade-in py-8">
          <p className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-3">
            And It Never Stops.
          </p>
          <p className="text-base text-muted-foreground max-w-lg mx-auto leading-relaxed mb-4">
            Unlimited re-entries. Unlimited follows. <span className="font-bold text-foreground">Unlimited income.</span><br />
            Every completed wheelhouse automatically opens a new one. There is no cap. No ceiling. No limit.
          </p>
          <p className="text-lg font-bold text-foreground mb-5">
            Wealth beyond your wildest dreams — and it's all automated.
          </p>
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border-2" style={{ borderColor: coral }}>
            <span className="text-3xl" style={{ color: coral }}>∞</span>
            <span className="text-sm tracking-[0.3em] uppercase font-bold" style={{ color: coral }}>Infinite Earning Potential</span>
          </div>
          <br />
          <button
            onClick={() => {
              clearAllTimeouts();
              resetCycle();
              setCompletedWheelhouses(0);
              setAnimationDone(false);
              setCelebrationPhase(0);
              hasStarted.current = false;
              setTimeout(() => {
                hasStarted.current = true;
                startCycle(0);
              }, 300);
            }}
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-muted-foreground border border-border hover:border-primary hover:text-primary transition-colors"
          >
            <RotateCcw size={16} />
            Replay
          </button>
        </div>
      )}

      </div>

        {/* Right: Completed mini wheelhouses — 3 per row, aligned with tier cards */}
        {completedWheelhouses > 0 && (
          <div className="md:w-72 shrink-0">
            <p className="text-center text-xs tracking-[0.3em] uppercase font-semibold text-muted-foreground mb-3">
              Completed Wheelhouses
            </p>
            <div className="grid grid-cols-3 gap-2 justify-items-center">
              {Array.from({ length: Math.min(completedWheelhouses, VISIBLE_WHEELHOUSES) }).map((_, i) => (
                <MiniWheelhouse key={i} index={i} total={completedWheelhouses} />
              ))}
              {completedWheelhouses > VISIBLE_WHEELHOUSES && (
                <div className="flex flex-col items-center justify-center animate-fade-in">
                  <div className="w-16 h-16 rounded-full border-2 border-dashed flex items-center justify-center" style={{ borderColor: coral }}>
                    <span className="text-xl font-bold" style={{ color: coral }}>+{completedWheelhouses - VISIBLE_WHEELHOUSES}</span>
                  </div>
                  <p className="text-[10px] font-bold text-muted-foreground mt-1">& counting...</p>
                </div>
              )}
            </div>
            <div className="text-center mt-3">
              <p className="text-sm font-bold text-foreground">
                Monthly Income: <span style={{ color: coral }} className="text-lg font-mono">{formatCurrency(CYCLE_EARNINGS * completedWheelhouses)}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WheelhouseDiagram;
