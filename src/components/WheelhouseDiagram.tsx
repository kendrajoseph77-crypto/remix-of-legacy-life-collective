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
const YOU_CUT_PER_MEMBER = CONTRIBUTION_PER_MEMBER / 2;
const MEMBER_COUNT = 6;

// Layout
const cx = 250, cy = 260;
const CENTER_R = 54;
const WHEEL_R = 175; // single ring for all 6 members
const NODE_R = 30;
const navy = "hsl(220 50% 12%)";
const card = "hsl(215 45% 16%)";

// All 6 members evenly spaced around the wheel, starting from top
const memberAngles = Array.from({ length: 6 }, (_, i) => -Math.PI / 2 + (i * 2 * Math.PI) / 6);

// Colors per member: #01/#02 teal, #03-#06 sky
const memberColors = [
  "hsl(160 70% 55%)", // #01
  "hsl(160 70% 55%)", // #02
  "hsl(210 80% 70%)", // #03
  "hsl(210 80% 70%)", // #04
  "hsl(210 80% 70%)", // #05
  "hsl(210 80% 70%)", // #06
];

const coral = "hsl(30 90% 65%)";
const brightYellow = "hsl(45 100% 65%)";
const lime = "hsl(160 70% 55%)";

// Activation order: #01, #02, #03, #04, #05, #06
const activationOrder = [0, 1, 2, 3, 4, 5];

// Helper: SVG arc path for a segment between two angles on a circle
const arcPath = (cxp: number, cyp: number, r: number, startAngle: number, endAngle: number) => {
  const x1 = cxp + r * Math.cos(startAngle);
  const y1 = cyp + r * Math.sin(startAngle);
  const x2 = cxp + r * Math.cos(endAngle);
  const y2 = cyp + r * Math.sin(endAngle);
  const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`;
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
        safeTimeout(() => startAnimation(), 5000);
        return;
      }

      const current = memberIdx;
      memberIdx++;
      const targetMembers = memberIdx;

      setActiveMembers(targetMembers);
      setShowContribution(current);

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

  const getNodePos = (angle: number) => ({
    x: cx + WHEEL_R * Math.cos(angle),
    y: cy + WHEEL_R * Math.sin(angle),
  });

  // Render wheel arc segments — each segment is the arc between two adjacent members
  const segmentAngleSpan = (2 * Math.PI) / MEMBER_COUNT;
  const segmentGap = 0.06; // small gap between segments

  const renderSegments = () => {
    return activationOrder.map((memberIdx) => {
      const startAngle = memberAngles[memberIdx] - segmentAngleSpan / 2 + segmentGap / 2;
      const endAngle = memberAngles[memberIdx] + segmentAngleSpan / 2 - segmentGap / 2;
      const isActive = memberIdx < activeMembers;
      const color = memberColors[memberIdx];

      return (
        <path
          key={`seg-${memberIdx}`}
          d={arcPath(cx, cy, WHEEL_R, startAngle, endAngle)}
          fill="none"
          stroke={isActive ? color : "hsl(210 30% 25%)"}
          strokeWidth={isActive ? 6 : 3}
          strokeLinecap="round"
          style={{
            transition: "stroke 0.6s ease, stroke-width 0.4s ease",
            filter: isActive ? "drop-shadow(0 0 6px " + color + ")" : "none",
          }}
        />
      );
    });
  };

  // Render spokes from each member to center
  const renderSpokes = () => {
    return activationOrder.map((memberIdx) => {
      const pos = getNodePos(memberAngles[memberIdx]);
      const isActive = memberIdx < activeMembers;
      const angle = Math.atan2(cy - pos.y, cx - pos.x);
      const sx = pos.x + (NODE_R + 4) * Math.cos(angle);
      const sy = pos.y + (NODE_R + 4) * Math.sin(angle);
      const ex = cx - (CENTER_R + 8) * Math.cos(angle);
      const ey = cy - (CENTER_R + 8) * Math.sin(angle);

      return (
        <line
          key={`spoke-${memberIdx}`}
          x1={sx} y1={sy} x2={ex} y2={ey}
          stroke={isActive ? "hsl(160 70% 55% / 0.5)" : "hsl(210 30% 30% / 0.15)"}
          strokeWidth={showContribution === memberIdx ? 3 : 1.5}
          strokeDasharray={isActive ? "none" : "4 4"}
          markerEnd={isActive ? "url(#arrow-coral)" : undefined}
          style={{ transition: "stroke 0.5s ease, stroke-width 0.3s ease" }}
        />
      );
    });
  };

  const renderNode = (memberIdx: number) => {
    const angle = memberAngles[memberIdx];
    const { x, y } = getNodePos(angle);
    const label = String(memberIdx + 1).padStart(2, "0");
    const clipId = `wh-clip-${label}`;
    const color = memberColors[memberIdx];
    const isActive = memberIdx < activeMembers;
    const opacity = isActive ? 1 : 0.25;

    const badgeAngle = -Math.PI / 4;
    const badgeX = x + (NODE_R - 1) * Math.cos(badgeAngle);
    const badgeY = y + (NODE_R - 1) * Math.sin(badgeAngle);

    // Contribution pill — pushed outward from center
    const outAngle = angle;
    const contribX = x + (NODE_R + 24) * Math.cos(outAngle);
    const contribY = y + (NODE_R + 24) * Math.sin(outAngle);

    // 50% label position
    const labelOutward = NODE_R + 50;
    const labelX = x + labelOutward * Math.cos(outAngle);
    const labelY = y + labelOutward * Math.sin(outAngle);

    return (
      <g key={clipId}>
        <g style={{ transition: "opacity 0.6s ease", opacity }}>
          <clipPath id={clipId}>
            <circle cx={x} cy={y} r={NODE_R - 3} />
          </clipPath>
          <circle cx={x} cy={y} r={NODE_R} fill={card} stroke={color} strokeWidth="2.5" />
          <image
            href={avatarUrls[memberIdx + 1]}
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

        {showContribution === memberIdx && (
          <g className="animate-fade-in">
            <rect x={contribX - 36} y={contribY - 10} width="72" height="20" rx="10"
              fill={navy} stroke={color} strokeWidth="1.5" opacity="0.95" />
            <text x={contribX} y={contribY + 5} textAnchor="middle" fontSize="11" fontWeight="800"
              fill={color} fontFamily="monospace">
              {formatCurrency(CONTRIBUTION_PER_MEMBER)}
            </text>
          </g>
        )}

        {showContribution === memberIdx && (
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
    <div ref={sectionRef} className="relative w-full max-w-[540px] mx-auto">
      <p className="text-center text-sm font-semibold tracking-widest uppercase text-primary mb-1">2 × 2 Wheelhouse</p>
      <h3 className="text-center text-xl md:text-2xl font-bold text-foreground mb-2 tracking-wide">
        {activeMembers} of {MEMBER_COUNT} Members Joined
      </h3>
      <svg viewBox="0 0 500 520" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
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
            <circle cx={cx} cy={cy} r={WHEEL_R + 30} fill="url(#celebGrad)"
              style={{ transition: "opacity 1s ease", opacity: celebrationPhase >= 1 ? 1 : 0 }} />
            <circle cx={cx} cy={cy} r={WHEEL_R + 8} fill="none" stroke={lime} strokeWidth="2"
              style={{ transition: "opacity 0.8s ease", opacity: celebrationPhase >= 2 ? 0.4 : 0 }} />
          </>
        )}

        {/* Wheel arc segments */}
        {renderSegments()}

        {/* Spokes */}
        {renderSpokes()}

        {/* Member nodes */}
        {activationOrder.map((idx) => renderNode(idx))}

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
        <div className="text-center animate-fade-in mt-2 mb-4">
          <p className="text-2xl md:text-3xl font-bold tracking-wide" style={{ color: brightYellow }}>
            🎉 Wheelhouse Complete!
          </p>
          <p className="text-lg md:text-xl font-semibold tracking-widest mt-1" style={{ color: brightYellow, opacity: 0.85 }}>
            Mobius Loop Activated.
          </p>
        </div>
      )}
    </div>
  );
};

export default WheelhouseDiagram;
