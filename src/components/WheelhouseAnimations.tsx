import { useState, useEffect, useRef } from "react";
import { Infinity, RotateCcw } from "lucide-react";

import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";
import avatar4 from "@/assets/avatar-4.jpg";
import avatar5 from "@/assets/avatar-5.jpg";
import avatar6 from "@/assets/avatar-6.jpg";

const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];

const BLUE = "hsl(224 85% 58%)";
const GREEN = "hsl(160 80% 42%)";
const GOLD = "hsl(39 55% 52%)";

/* ── Mobius Loop — statement section ── */
export const MobiusLoopVisual = () => (
  <div className="flex flex-col items-center gap-6 text-center">
    <div className="flex items-center gap-3 px-7 py-3 rounded-full"
      style={{ border: `1px solid hsl(39 55% 52% / 0.5)` }}>
      <Infinity size={24} strokeWidth={1.5} style={{ color: GOLD }} />
      <span className="text-[11px] font-semibold tracking-[0.25em] uppercase" style={{ color: GOLD }}>
        Infinite Earning Potential
      </span>
    </div>
  </div>
);
/* ── Single Wheelhouse SVG (extracted for reuse) ── */
const WheelhouseSVG = ({ visibleCount, scale = 1, opacity = 1 }: { visibleCount: number; scale?: number; opacity?: number }) => {
  const clipId = useRef(`clip-${Math.random().toString(36).slice(2)}`).current;
  const ACCENT = "hsl(39 55% 52%)";
  const GOLD_LIGHT = "hsl(39 60% 65%)";
  const GOLD_DARK = "hsl(39 50% 38%)";
  const BLACK = "hsl(0 0% 8%)";

  const youPos = { x: 350, y: 260 };
  const youR = 50;
  const innerR = 38;
  const outerR = 34;

  const innerNodes = [
    { x: 350, y: 115, label: "01", avatar: avatars[0] },
    { x: 350, y: 405, label: "02", avatar: avatars[1] },
  ];
  const outerNodes = [
    { x: 100, y: 70, label: "03", avatar: avatars[2], parentIdx: 0 },
    { x: 600, y: 70, label: "04", avatar: avatars[3], parentIdx: 0 },
    { x: 100, y: 450, label: "05", avatar: avatars[4], parentIdx: 1 },
    { x: 600, y: 450, label: "06", avatar: avatars[5], parentIdx: 1 },
  ];

  const elbowPaths = [
    `M ${innerNodes[0].x - innerR},${innerNodes[0].y} L 210,${innerNodes[0].y} L 210,${outerNodes[0].y} L ${outerNodes[0].x + outerR},${outerNodes[0].y}`,
    `M ${innerNodes[0].x + innerR},${innerNodes[0].y} L 490,${innerNodes[0].y} L 490,${outerNodes[1].y} L ${outerNodes[1].x - outerR},${outerNodes[1].y}`,
    `M ${innerNodes[1].x - innerR},${innerNodes[1].y} L 210,${innerNodes[1].y} L 210,${outerNodes[2].y} L ${outerNodes[2].x + outerR},${outerNodes[2].y}`,
    `M ${innerNodes[1].x + innerR},${innerNodes[1].y} L 490,${innerNodes[1].y} L 490,${outerNodes[3].y} L ${outerNodes[3].x - outerR},${outerNodes[3].y}`,
  ];

  return (
    <div style={{ transform: `scale(${scale})`, opacity, transition: "transform 0.8s ease, opacity 0.8s ease", transformOrigin: "top center" }}>
      <svg viewBox="-20 -100 740 720" className="w-full max-w-md mx-auto">
        <defs>
          <marker id={`${clipId}-arrow`} markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill={ACCENT} />
          </marker>
          <clipPath id={`${clipId}-top-half`}>
            <rect x="0" y="0" width="700" height={youPos.y} />
          </clipPath>
          <clipPath id={`${clipId}-bottom-half`}>
            <rect x="0" y={youPos.y} width="700" height={520 - youPos.y} />
          </clipPath>
          <radialGradient id={`${clipId}-bg-glow`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={ACCENT} stopOpacity="0.08" />
            <stop offset="100%" stopColor={BLACK} stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${clipId}-gold-grad`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={GOLD_LIGHT} />
            <stop offset="100%" stopColor={GOLD_DARK} />
          </linearGradient>
        </defs>

        <circle cx={youPos.x} cy={youPos.y} r="360" fill={`url(#${clipId}-bg-glow)`} />
        <circle cx={youPos.x} cy={youPos.y} r="190" fill={BLACK} opacity="0.06" clipPath={`url(#${clipId}-top-half)`} />
        <circle cx={youPos.x} cy={youPos.y} r="190" fill={BLACK} opacity="0.06" clipPath={`url(#${clipId}-bottom-half)`} />

        <circle cx={youPos.x} cy={youPos.y} r="340" fill="none" stroke={`url(#${clipId}-gold-grad)`} strokeWidth="3" opacity="0.6" />
        <path d={`M ${youPos.x},${youPos.y} L ${youPos.x},${youPos.y - 340} A 340,340 0 0,1 ${youPos.x + 340},${youPos.y} Z`} fill={BLACK} opacity="0.06" />
        <path d={`M ${youPos.x},${youPos.y} L ${youPos.x + 340},${youPos.y} A 340,340 0 0,1 ${youPos.x},${youPos.y + 340} Z`} fill={ACCENT} opacity="0.06" />
        <path d={`M ${youPos.x},${youPos.y} L ${youPos.x},${youPos.y + 340} A 340,340 0 0,1 ${youPos.x - 340},${youPos.y} Z`} fill={BLACK} opacity="0.06" />
        <path d={`M ${youPos.x},${youPos.y} L ${youPos.x - 340},${youPos.y} A 340,340 0 0,1 ${youPos.x},${youPos.y - 340} Z`} fill={ACCENT} opacity="0.06" />
        <line x1={youPos.x} y1={youPos.y - 340} x2={youPos.x} y2={youPos.y + 340} stroke={ACCENT} strokeWidth="1" opacity="0.15" />
        <line x1={youPos.x - 340} y1={youPos.y} x2={youPos.x + 340} y2={youPos.y} stroke={ACCENT} strokeWidth="1" opacity="0.15" />

        <line x1={youPos.x - 195} y1={youPos.y} x2={youPos.x - youR - 5} y2={youPos.y} stroke={ACCENT} strokeWidth="1" strokeDasharray="4 3" opacity="0.3" />
        <line x1={youPos.x + youR + 5} y1={youPos.y} x2={youPos.x + 195} y2={youPos.y} stroke={ACCENT} strokeWidth="1" strokeDasharray="4 3" opacity="0.3" />

        <path d={`M ${youPos.x - 190},${youPos.y} A 190,190 0 0,1 ${youPos.x + 190},${youPos.y}`} fill="none" stroke={ACCENT} strokeWidth="2" strokeDasharray="6 4" opacity="0.3" />
        <path d={`M ${youPos.x + 190},${youPos.y} A 190,190 0 0,1 ${youPos.x - 190},${youPos.y}`} fill="none" stroke={ACCENT} strokeWidth="2" strokeDasharray="6 4" opacity="0.3" />

        <line x1={youPos.x} y1={youPos.y - youR} x2={innerNodes[0].x} y2={innerNodes[0].y + innerR}
          stroke={ACCENT} strokeWidth="2" markerEnd={`url(#${clipId}-arrow)`}
          opacity={0 < visibleCount ? 0.7 : 0.1} style={{ transition: "opacity 0.6s" }} />
        <line x1={youPos.x} y1={youPos.y + youR} x2={innerNodes[1].x} y2={innerNodes[1].y - innerR}
          stroke={ACCENT} strokeWidth="2" markerEnd={`url(#${clipId}-arrow)`}
          opacity={1 < visibleCount ? 0.7 : 0.1} style={{ transition: "opacity 0.6s" }} />

        {elbowPaths.map((d, i) => (
          <path key={`elbow-${i}`} d={d} fill="none" stroke={ACCENT} strokeWidth="2"
            markerEnd={`url(#${clipId}-arrow)`}
            opacity={i + 2 < visibleCount ? 0.5 : 0.08}
            style={{ transition: "opacity 0.6s" }} />
        ))}

        {/* YOU node */}
        <circle cx={youPos.x} cy={youPos.y} r={youR} fill={BLACK} stroke={ACCENT} strokeWidth="3.5" />
        <text x={youPos.x} y={visibleCount > 0 ? youPos.y - 7 : youPos.y + 1} textAnchor="middle" dominantBaseline="middle"
          className="font-bold" fontSize="20" fill={ACCENT}>YOU</text>
        {visibleCount > 0 && (
          <text x={youPos.x} y={youPos.y + 18} textAnchor="middle" dominantBaseline="middle"
            fontSize="22" fontWeight="900" fill={GOLD_LIGHT}>
            {visibleCount * 50}%
          </text>
        )}

        {/* Inner nodes */}
        {innerNodes.map((node, i) => {
          const isVisible = i < visibleCount;
          const justAppeared = i === visibleCount - 1;
          return (
            <g key={`inner-${i}`} opacity={isVisible ? 1 : 0} style={{ transition: "opacity 0.6s ease" }}>
              <clipPath id={`${clipId}-i-${i}`}><circle cx={node.x} cy={node.y} r={innerR - 2} /></clipPath>
              <circle cx={node.x} cy={node.y} r={innerR} fill={BLACK} stroke={ACCENT} strokeWidth="2.5" />
              <image href={node.avatar} x={node.x - innerR + 2} y={node.y - innerR + 2}
                width={(innerR - 2) * 2} height={(innerR - 2) * 2}
                clipPath={`url(#${clipId}-i-${i})`} preserveAspectRatio="xMidYMid slice" />
              <circle cx={node.x - innerR * 0.75} cy={node.y - innerR * 0.75} r="13" fill={BLACK} stroke={ACCENT} strokeWidth="1" />
              <text x={node.x - innerR * 0.75} y={node.y - innerR * 0.75 + 1} textAnchor="middle"
                dominantBaseline="middle" fontSize="11" fill={ACCENT} fontWeight="700">{node.label}</text>
              {(() => {
                const childIndices = i === 0 ? [0, 1] : [2, 3];
                const childCount = childIndices.filter(ci => ci + 2 < visibleCount).length;
                if (childCount === 0) return null;
                const pct = childCount * 50;
                const yOff = i === 0 ? node.y - innerR - 24 : node.y + innerR + 24;
                return (
                  <g>
                    <rect x={node.x - 34} y={yOff - 17} width="68" height="34" rx="17" fill={BLACK} stroke={ACCENT} strokeWidth="1.5" />
                    <text x={node.x} y={yOff + 1} textAnchor="middle" dominantBaseline="middle"
                      fontSize="18" fill={ACCENT} fontWeight="800">{pct}%</text>
                  </g>
                );
              })()}
              {justAppeared && (
                <circle cx={node.x} cy={node.y} r={innerR} fill="none" stroke={ACCENT} strokeWidth="2" opacity="0.5">
                  <animate attributeName="r" from={`${innerR}`} to={`${innerR + 18}`} dur="0.8s" fill="freeze" />
                  <animate attributeName="opacity" from="0.5" to="0" dur="0.8s" fill="freeze" />
                </circle>
              )}
            </g>
          );
        })}

        {/* Outer nodes */}
        {outerNodes.map((node, i) => {
          const idx = i + 2;
          const isVisible = idx < visibleCount;
          const justAppeared = idx === visibleCount - 1;
          return (
            <g key={`outer-${i}`} opacity={isVisible ? 1 : 0} style={{ transition: "opacity 0.6s ease" }}>
              <clipPath id={`${clipId}-o-${i}`}><circle cx={node.x} cy={node.y} r={outerR - 2} /></clipPath>
              <circle cx={node.x} cy={node.y} r={outerR} fill={BLACK} stroke={ACCENT} strokeWidth="2.5" />
              <image href={node.avatar} x={node.x - outerR + 2} y={node.y - outerR + 2}
                width={(outerR - 2) * 2} height={(outerR - 2) * 2}
                clipPath={`url(#${clipId}-o-${i})`} preserveAspectRatio="xMidYMid slice" />
              <circle cx={node.x - outerR * 0.75} cy={node.y - outerR * 0.75} r="12" fill={BLACK} stroke={ACCENT} strokeWidth="1" />
              <text x={node.x - outerR * 0.75} y={node.y - outerR * 0.75 + 1} textAnchor="middle"
                dominantBaseline="middle" fontSize="10" fill={ACCENT} fontWeight="700">{node.label}</text>
              {justAppeared && (
                <circle cx={node.x} cy={node.y} r={outerR} fill="none" stroke={ACCENT} strokeWidth="2" opacity="0.5">
                  <animate attributeName="r" from={`${outerR}`} to={`${outerR + 16}`} dur="0.8s" fill="freeze" />
                  <animate attributeName="opacity" from="0.5" to="0" dur="0.8s" fill="freeze" />
                </circle>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export const TwoRingWheelhouse = () => {
  const TOTAL_NODES = 6;
  const GOLD = "hsl(39 55% 52%)";

  const [visibleCount, setVisibleCount] = useState(0);
  const [animationDone, setAnimationDone] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const timers = useRef<number[]>([]);

  const earningMessages = [
    { title: "You Invited #1", note: "You Earned 50%" },
    { title: "You Invited #2", note: "You Earned 50% — now you're even." },
    { title: "#1 Invited #3", note: "They Earned 50% & You Earned 50%" },
    { title: "#1 Invited #4", note: "They Earned 50% & You Earned 50%" },
    { title: "#2 Invited #5", note: "They Earned 50% & You Earned 50%" },
    { title: "#2 Invited #6", note: "They Earned 50% & You Earned 50%" },
  ];

  const startAnimation = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setVisibleCount(0);
    setAnimationDone(false);

    for (let i = 0; i < TOTAL_NODES; i++) {
      const t = window.setTimeout(() => {
        setVisibleCount(i + 1);
        if (i === TOTAL_NODES - 1) setAnimationDone(true);
      }, 800 + i * 900);
      timers.current.push(t);
    }
  };

  useEffect(() => {
    if (hasAnimated.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          startAnimation();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      timers.current.forEach(clearTimeout);
    };
  }, []);

  return (
    <div ref={ref} className="flex flex-col items-center gap-6">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 w-full">
        {/* Left side — earnings feed */}
        <div className="flex-1 flex flex-col justify-center min-h-[300px] md:min-h-[400px]">
          <p className="text-xs tracking-[0.2em] uppercase font-medium text-muted-foreground mb-4">How You Earn</p>
          <div className="space-y-3">
            {earningMessages.map((msg, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 transition-all duration-500 ${
                  i < visibleCount ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                }`}
              >
                <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: GOLD }} />
                <div>
                  <p className="text-sm font-semibold text-foreground">{msg.title}</p>
                  <p className="text-xs text-muted-foreground">{msg.note}</p>
                </div>
              </div>
            ))}
          </div>
          {visibleCount > 0 && (
            <div className="mt-6 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Total Earned</p>
              <div className="flex items-center gap-3">
                <p className="text-2xl font-bold" style={{ color: GOLD }}>{visibleCount * 50}%</p>
                {animationDone && (
                  <button
                    onClick={() => {
                      hasAnimated.current = false;
                      startAnimation();
                    }}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-300 hover:scale-105 border border-border bg-muted/30 text-muted-foreground hover:text-foreground"
                  >
                    <RotateCcw size={14} />
                    Replay
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right side — wheelhouse diagram */}
        <div className="w-full md:w-[55%] flex-shrink-0">
          <WheelhouseSVG visibleCount={visibleCount} />
        </div>
      </div>
    </div>
  );
};

/* ── Multi-cycle Wheelhouse: fills 3 times, first 2 minimize ── */
export const MultiCycleWheelhouse = () => {
  const TOTAL_NODES = 6;
  const TOTAL_CYCLES = 5;
  const GOLD = "hsl(39 55% 52%)";

  const [cycle, setCycle] = useState(0);
  const [visibleCount, setVisibleCount] = useState(0);
  const [completedCycles, setCompletedCycles] = useState<number[]>([]);
  const [animationDone, setAnimationDone] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const timers = useRef<number[]>([]);

  const startCycle = (cycleNum: number) => {
    setVisibleCount(0);

    for (let i = 0; i < TOTAL_NODES; i++) {
      const t = window.setTimeout(() => {
        setVisibleCount(i + 1);

        if (i === TOTAL_NODES - 1) {
          if (cycleNum < TOTAL_CYCLES - 1) {
            const nextT = window.setTimeout(() => {
              setCompletedCycles(prev => [...prev, cycleNum]);
              setCycle(cycleNum + 1);
              startCycle(cycleNum + 1);
            }, 1200);
            timers.current.push(nextT);
          } else {
            setAnimationDone(true);
          }
        }
      }, 800 + i * 900);
      timers.current.push(t);
    }
  };

  const startAnimation = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setCycle(0);
    setVisibleCount(0);
    setCompletedCycles([]);
    setAnimationDone(false);
    startCycle(0);
  };

  useEffect(() => {
    if (hasAnimated.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          startAnimation();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      timers.current.forEach(clearTimeout);
    };
  }, []);

  const totalEarned = completedCycles.length * TOTAL_NODES * 50 + visibleCount * 50;

  return (
    <div ref={ref} className="flex flex-col items-center gap-4">
      <div className="flex flex-col md:flex-row items-start gap-6 w-full">
        {/* Left side — active wheelhouse + total earned */}
        <div className="flex flex-col items-center md:w-[50%] flex-shrink-0">
          <p className="text-xs tracking-[0.2em] uppercase font-medium text-muted-foreground mb-2">
            Cooperative {cycle + 1} of {TOTAL_CYCLES}
          </p>
          <WheelhouseSVG visibleCount={visibleCount} />
          {totalEarned > 0 && (
            <div className="mt-4 pt-3 border-t border-border w-full text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Total Earned</p>
              <div className="flex items-center justify-center gap-3">
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold" style={{ color: GOLD }}>{totalEarned}%</p>
                  <Infinity size={22} strokeWidth={1.5} style={{ color: GOLD }} />
                </div>
                {animationDone && (
                  <button
                    onClick={() => {
                      hasAnimated.current = false;
                      startAnimation();
                    }}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-300 hover:scale-105 border border-border bg-muted/30 text-muted-foreground hover:text-foreground"
                  >
                    <RotateCcw size={14} />
                    Replay
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right side — completed thumbnails in a grid */}
        {completedCycles.length > 0 && (
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="grid grid-cols-3 gap-4 items-center">
              {completedCycles.map((c) => (
                <div key={c} className="relative w-24 h-24 md:w-28 md:h-28 transition-all duration-700 animate-scale-in">
                  <div className="opacity-50">
                    <WheelhouseSVG visibleCount={TOTAL_NODES} />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[9px] font-bold tracking-wider uppercase px-2 py-1 rounded-full border"
                      style={{ color: GOLD, borderColor: GOLD, background: "hsl(0 0% 6% / 0.8)" }}>
                      #{c + 1} ✓
                    </span>
                  </div>
                </div>
              ))}
              {animationDone && (
                <div className="flex flex-col items-center justify-center col-span-1 gap-2">
                  <p className="text-base md:text-lg font-semibold italic text-muted-foreground whitespace-nowrap">
                    And so on and so on....
                  </p>
                  <p className="text-sm md:text-base font-bold" style={{ color: GOLD }}>
                    More money not more work!
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};