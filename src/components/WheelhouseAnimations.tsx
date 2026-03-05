import { useState, useEffect, useRef, useCallback } from "react";
import { Infinity, RefreshCw, Play, Pause, SkipForward } from "lucide-react";

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

/* ── Mini completed wheel thumbnail ── */
const MiniWheel = ({ wheelNum, color }: { wheelNum: number; color: string }) => (
  <div className="flex flex-col items-center gap-1 animate-scale-in">
    <svg viewBox="0 0 120 90" className="w-10 h-10 md:w-12 md:h-12">
      {/* Apex node - GOLD */}
      <circle cx="60" cy="10" r="7" fill={GOLD} opacity="0.9" />
      <circle cx="60" cy="10" r="7" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      {/* Middle row - BLUE */}
      <circle cx="35" cy="42" r="6" fill={BLUE} opacity="0.8" />
      <circle cx="85" cy="42" r="6" fill={BLUE} opacity="0.8" />
      {/* Bottom row - GREEN */}
      <circle cx="8" cy="75" r="5" fill={GREEN} opacity="0.8" />
      <circle cx="38" cy="75" r="5" fill={GREEN} opacity="0.8" />
      <circle cx="82" cy="75" r="5" fill={GREEN} opacity="0.8" />
      <circle cx="112" cy="75" r="5" fill={GREEN} opacity="0.8" />
      {/* Connection lines */}
      <line x1="60" y1="17" x2="35" y2="36" stroke={BLUE} strokeWidth="1" opacity="0.4" />
      <line x1="60" y1="17" x2="85" y2="36" stroke={BLUE} strokeWidth="1" opacity="0.4" />
      <line x1="35" y1="48" x2="8" y2="70" stroke={GREEN} strokeWidth="1" opacity="0.4" />
      <line x1="35" y1="48" x2="38" y2="70" stroke={GREEN} strokeWidth="1" opacity="0.4" />
      <line x1="85" y1="48" x2="82" y2="70" stroke={GREEN} strokeWidth="1" opacity="0.4" />
      <line x1="85" y1="48" x2="112" y2="70" stroke={GREEN} strokeWidth="1" opacity="0.4" />
      {/* Checkmark */}
      <text x="60" y="12" textAnchor="middle" dominantBaseline="middle" fontSize="7" fill="hsl(0 0% 8%)" className="font-bold">✓</text>
    </svg>
    <span className="text-[9px] font-bold" style={{ color }}>#{wheelNum}</span>
  </div>
);

/* ── Mobius Loop Animation ── */
export const MobiusLoopVisual = () => {
  const [cycle, setCycle] = useState(0);
  const [filling, setFilling] = useState(0);
  const [completedWheels, setCompletedWheels] = useState<number[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);
  const timerRefs = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isPausedRef = useRef(false);

  const TEXT = "hsl(0 0% 8%)";
  const TEXT_MUTED = "hsl(0 0% 40%)";

  const MAX_CYCLES = 6;
  const cumulativePercent = cycle * 300 + filling * 50;

  useEffect(() => { isPausedRef.current = isPaused; }, [isPaused]);

  const runNextCycle = useCallback(() => {
    setFilling(0);
    let pos = 0;
    const step = () => {
      if (isPausedRef.current) {
        timerRefs.current.push(setTimeout(step, 200));
        return;
      }
      pos++;
      setFilling(pos);
      if (pos < 6) {
        timerRefs.current.push(setTimeout(step, 600));
      } else {
        timerRefs.current.push(setTimeout(() => {
          setIsSpinning(true);
          timerRefs.current.push(setTimeout(() => {
            setIsSpinning(false);
            setCycle(prev => {
              const completedNum = prev + 1;
              setCompletedWheels(cw => [...cw, completedNum]);
              setFilling(0);
              if (completedNum >= MAX_CYCLES) {
                return prev;
              }
              timerRefs.current.push(setTimeout(() => runNextCycle(), 400));
              return prev + 1;
            });
          }, 900));
        }, 800));
      }
    };
    timerRefs.current.push(setTimeout(step, 600));
  }, []);

  const skipToNext = useCallback(() => {
    timerRefs.current.forEach(clearTimeout);
    timerRefs.current = [];
    setFilling(6);
    setIsSpinning(true);
    timerRefs.current.push(setTimeout(() => {
      setIsSpinning(false);
      setCycle(prev => {
        const completedNum = prev + 1;
        setCompletedWheels(cw => [...cw, completedNum]);
        setFilling(0);
        if (completedNum >= MAX_CYCLES) {
          return prev;
        }
        timerRefs.current.push(setTimeout(() => runNextCycle(), 400));
        return prev + 1;
      });
    }, 900));
  }, [runNextCycle]);

  useEffect(() => {
    if (hasStarted.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          timerRefs.current.push(setTimeout(() => runNextCycle(), 500));
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      timerRefs.current.forEach(clearTimeout);
    };
  }, [runNextCycle]);

  const colors = [BLUE, GREEN, GOLD];
  const currentColor = colors[cycle % 3];
  const posLabels = ["1", "2", "3", "4", "5", "6"];
  const formatPercent = (p: number) => p >= 1000 ? `${(p / 1000).toFixed(1)}k` : `${p}`;
  const isFinished = completedWheels.length >= MAX_CYCLES;

  return (
    <div ref={ref} className="flex flex-col items-center gap-6">
      <style>{`
        @keyframes wheel-spin-shrink {
          0% { transform: rotate(0deg) scale(1); opacity: 1; }
          60% { transform: rotate(270deg) scale(0.5); opacity: 0.8; }
          100% { transform: rotate(360deg) scale(0.15); opacity: 0; }
        }
      `}</style>

      {!isFinished && (
        <div className="flex items-center gap-4 mb-2">
          <div className="flex items-center gap-3">
            <Infinity size={18} style={{ color: currentColor }} />
              <p className="text-xs tracking-widest uppercase text-muted-foreground">
              Wheel <span className="font-bold" style={{ color: currentColor }}>{cycle + 1}</span> of {MAX_CYCLES}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPaused(p => !p)}
              className="flex items-center justify-center w-8 h-8 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-all"
              title={isPaused ? "Play" : "Pause"}
            >
              {isPaused ? <Play size={12} /> : <Pause size={12} />}
            </button>
            <button
              onClick={skipToNext}
              className="flex items-center justify-center w-8 h-8 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-all"
              title="Next wheel"
            >
              <SkipForward size={12} />
            </button>
          </div>
        </div>
      )}

      {!isFinished && (
        <>
          <div style={{ animation: isSpinning ? "wheel-spin-shrink 0.9s ease-in-out forwards" : undefined }}>
            <svg viewBox="0 0 500 380" className="w-full max-w-sm md:max-w-md">
              {/* Pyramid positions */}
              {(() => {
                const youP = { x: 250, y: 50 };
                const midRow = [
                  { x: 160, y: 160, label: "1" },
                  { x: 340, y: 160, label: "2" },
                ];
                const botRow = [
                  { x: 80,  y: 280, label: "3" },
                  { x: 190, y: 280, label: "4" },
                  { x: 310, y: 280, label: "5" },
                  { x: 420, y: 280, label: "6" },
                ];
                const allNodes = [...midRow, ...botRow];

                return (
                  <>
                    {/* Lines from YOU to middle */}
                    {midRow.map((pos, i) => (
                      <line key={`lm-${i}`} x1={youP.x} y1={youP.y} x2={pos.x} y2={pos.y}
                        stroke={currentColor} strokeWidth="2" opacity={i < filling ? 0.35 : 0.08}
                        style={{ transition: "opacity 0.5s ease" }} />
                    ))}
                    {/* Lines from middle to bottom */}
                    {botRow.map((pos, i) => {
                      const parent = midRow[i < 2 ? 0 : 1];
                      return (
                        <line key={`lb-${i}`} x1={parent.x} y1={parent.y} x2={pos.x} y2={pos.y}
                          stroke={currentColor} strokeWidth="2" opacity={i + 2 < filling ? 0.3 : 0.08}
                          style={{ transition: "opacity 0.5s ease" }} />
                      );
                    })}

                    {/* YOU apex */}
                    <circle cx={youP.x} cy={youP.y} r="30" fill="white" stroke={currentColor} strokeWidth="2.5"
                      style={{ transition: "stroke 0.8s ease" }} />
                    <text x={youP.x} y={youP.y - 6} textAnchor="middle" dominantBaseline="middle"
                      className="font-bold" fontSize="12" fill={TEXT}>YOU</text>
                    <text x={youP.x} y={youP.y + 10} textAnchor="middle" dominantBaseline="middle"
                      className="font-bold" fontSize="10" fill={currentColor}
                      style={{ transition: "fill 0.8s ease" }}>
                      {formatPercent(cumulativePercent)}%
                    </text>

                    {/* Member nodes */}
                    {allNodes.map((pos, i) => {
                      const isVisible = i < filling;
                      const justAppeared = i === filling - 1;
                      const nodeColor = i < 2 ? BLUE : GREEN;
                      return (
                        <g key={`${cycle}-${i}`} opacity={isVisible ? 1 : 0} style={{ transition: "opacity 0.5s ease" }}>
                          <circle cx={pos.x} cy={pos.y} r="22" fill={nodeColor} opacity="0.8" />
                          <circle cx={pos.x} cy={pos.y} r="22" fill="none" stroke="hsl(0 0% 8%)" strokeWidth="1.5" opacity="0.2" />
                          <text x={pos.x} y={pos.y - 2} textAnchor="middle" dominantBaseline="middle"
                            className="font-bold" fontSize="14" fill="hsl(0 0% 100%)">{pos.label}</text>
                          <text x={pos.x} y={pos.y + 13} textAnchor="middle" fontSize="8" fill="hsl(0 0% 100%)" opacity="0.9">50%</text>
                          {justAppeared && (
                            <circle cx={pos.x} cy={pos.y} r="26" fill="none" stroke={nodeColor} strokeWidth="2" opacity="0.6">
                              <animate attributeName="r" from="22" to="36" dur="0.7s" fill="freeze" />
                              <animate attributeName="opacity" from="0.6" to="0" dur="0.7s" fill="freeze" />
                            </circle>
                          )}
                        </g>
                      );
                    })}

                    {filling >= 6 && !isSpinning && (
                      <text x="250" y="340" textAnchor="middle" fontSize="11" fill={currentColor}
                        className="font-bold" style={{ transition: "fill 0.8s ease" }}>
                        ✓ WHEEL {cycle + 1} COMPLETE
                      </text>
                    )}
                  </>
                );
              })()}
            </svg>
          </div>

      <div className="flex items-center gap-3 transition-all duration-500">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border-2" style={{ borderColor: currentColor }}>
              <span className="text-xs font-medium" style={{ color: currentColor }}>Cumulative:</span>
              <span className="text-lg font-bold tabular-nums" style={{ color: currentColor, transition: "color 0.8s ease" }}>
                {formatPercent(cumulativePercent)}%
              </span>
            </div>
            {filling > 0 && filling < 6 && (
              <span className="text-xs font-semibold animate-fade-in" style={{ color: currentColor }}>+50%</span>
            )}
          </div>

          {completedWheels.length > 0 && (
            <div className="w-full max-w-md mt-4">
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest text-center mb-3">Completed Wheels</p>
              <div className="grid grid-cols-6 gap-2 justify-items-center">
                {completedWheels.map((wNum) => (
                  <MiniWheel key={wNum} wheelNum={wNum} color={colors[(wNum - 1) % 3]} />
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 text-muted-foreground">
            <Infinity size={18} className="animate-pulse" style={{ color: currentColor }} />
            <p className="text-xs tracking-widest uppercase">Infinite Möbius Loop</p>
          </div>
        </>
      )}

      {isFinished && (
        <div className="flex flex-col items-center gap-6 py-8 animate-fade-in text-center px-4">
           <div className="flex items-center gap-2 px-4 py-2 rounded-full border-2" style={{ borderColor: GOLD }}>
             <span className="text-xs font-medium" style={{ color: GOLD }}>Cumulative:</span>
             <span className="text-lg font-bold tabular-nums" style={{ color: GOLD }}>
               {formatPercent(MAX_CYCLES * 300)}%
             </span>
           </div>

          <div className="w-full max-w-md">
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest text-center mb-3">Completed Wheels</p>
            <div className="grid grid-cols-6 gap-2 justify-items-center">
              {completedWheels.map((wNum) => (
                <MiniWheel key={wNum} wheelNum={wNum} color={colors[(wNum - 1) % 3]} />
              ))}
            </div>
          </div>

          <h3 className="text-3xl md:text-4xl font-bold text-foreground mt-4">
            And It Never Stops.
          </h3>
           <p className="text-muted-foreground text-sm md:text-base max-w-lg">
            Unlimited re-entries. Unlimited follows. <span className="font-bold text-foreground">Unlimited income.</span>
          </p>
          <p className="text-muted-foreground text-sm md:text-base max-w-lg">
            Every completed wheelhouse automatically opens a new one. There is no cap. No ceiling. No limit.
          </p>
          <p className="text-base md:text-lg font-bold text-foreground">
            Money for Everything! — and it's all automated.
          </p>
          <div className="flex items-center gap-3 px-8 py-4 rounded-full border border-[hsl(40,60%,50%)] mt-2">
            <Infinity size={20} style={{ color: GOLD }} />
            <span className="text-sm tracking-[0.25em] uppercase" style={{ color: GOLD }}>
              Infinite Earning Potential
            </span>
          </div>
          <button
            onClick={() => {
              setCycle(0);
              setFilling(0);
              setCompletedWheels([]);
              setIsSpinning(false);
              timerRefs.current.forEach(clearTimeout);
              timerRefs.current = [];
              setTimeout(() => runNextCycle(), 500);
            }}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-all duration-300 mt-2 text-sm"
          >
            <RefreshCw size={14} />
            Replay
          </button>
        </div>
      )}
    </div>
  );
};

/* ── Radial Wheelhouse with Avatar Photos ── */
export const TwoRingWheelhouse = () => {
  const [visibleCount, setVisibleCount] = useState(0);
  const [totalPercent, setTotalPercent] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

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

  const allPositions = [...innerNodes, ...outerNodes];

  useEffect(() => {
    if (hasAnimated.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          allPositions.forEach((_, i) => {
            setTimeout(() => {
              setVisibleCount(i + 1);
              setTotalPercent((i + 1) * 50);
            }, 800 + i * 900);
          });
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const clipId = useRef(`clip-${Math.random().toString(36).slice(2)}`).current;
  const ACCENT = "hsl(224 85% 68%)";
  const DARK = "hsl(0 0% 20%)";

  /* Elbow connector paths from inner to outer nodes */
  const elbowPaths = [
    `M ${innerNodes[0].x - innerR},${innerNodes[0].y} L 210,${innerNodes[0].y} L 210,${outerNodes[0].y} L ${outerNodes[0].x + outerR},${outerNodes[0].y}`,
    `M ${innerNodes[0].x + innerR},${innerNodes[0].y} L 490,${innerNodes[0].y} L 490,${outerNodes[1].y} L ${outerNodes[1].x - outerR},${outerNodes[1].y}`,
    `M ${innerNodes[1].x - innerR},${innerNodes[1].y} L 210,${innerNodes[1].y} L 210,${outerNodes[2].y} L ${outerNodes[2].x + outerR},${outerNodes[2].y}`,
    `M ${innerNodes[1].x + innerR},${innerNodes[1].y} L 490,${innerNodes[1].y} L 490,${outerNodes[3].y} L ${outerNodes[3].x - outerR},${outerNodes[3].y}`,
  ];
  const elbowParentIdx = [0, 0, 1, 1];

  return (
    <div ref={ref} className="flex flex-col items-center gap-6">
      <svg viewBox="0 0 700 520" className="w-full max-w-lg md:max-w-2xl">
        <defs>
          <marker id="wh-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill={DARK} />
          </marker>
        </defs>

        {/* Title */}
        <text x="350" y="38" textAnchor="middle" fontSize="17" fill="hsl(0 0% 30%)"
          fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="600" letterSpacing="0.06em">
          2 × 2 Wheelhouse
        </text>

        {/* Inner ring (dashed circle) */}
        <circle cx={youPos.x} cy={youPos.y} r="150" fill="none" stroke={ACCENT}
          strokeWidth="1.5" strokeDasharray="6 4" opacity="0.2" />

        {/* YOU → inner lines */}
        <line x1={youPos.x} y1={youPos.y - youR} x2={innerNodes[0].x} y2={innerNodes[0].y + innerR}
          stroke={DARK} strokeWidth="2" opacity={0 < visibleCount ? 0.5 : 0.08}
          style={{ transition: "opacity 0.6s" }} />
        <line x1={youPos.x} y1={youPos.y + youR} x2={innerNodes[1].x} y2={innerNodes[1].y - innerR}
          stroke={DARK} strokeWidth="2" opacity={1 < visibleCount ? 0.5 : 0.08}
          style={{ transition: "opacity 0.6s" }} />

        {/* Elbow connectors to outer nodes */}
        {elbowPaths.map((d, i) => (
          <path key={`elbow-${i}`} d={d} fill="none" stroke={DARK} strokeWidth="2"
            markerEnd="url(#wh-arrow)"
            opacity={i + 2 < visibleCount ? 0.5 : 0.08}
            style={{ transition: "opacity 0.6s" }} />
        ))}

        {/* ── YOU node ── */}
        <circle cx={youPos.x} cy={youPos.y} r={youR} fill="white" stroke={ACCENT} strokeWidth="3.5" />
        <text x={youPos.x} y={youPos.y + 1} textAnchor="middle" dominantBaseline="middle"
          className="font-bold" fontSize="20" fill="hsl(0 0% 8%)">YOU</text>

        {/* ── Inner nodes (01, 02) ── */}
        {innerNodes.map((node, i) => {
          const isVisible = i < visibleCount;
          const justAppeared = i === visibleCount - 1;
          return (
            <g key={`inner-${i}`} opacity={isVisible ? 1 : 0} style={{ transition: "opacity 0.6s ease" }}>
              <clipPath id={`${clipId}-i-${i}`}><circle cx={node.x} cy={node.y} r={innerR - 2} /></clipPath>
              <circle cx={node.x} cy={node.y} r={innerR} fill="white" stroke={ACCENT} strokeWidth="2.5" />
              <image href={node.avatar} x={node.x - innerR + 2} y={node.y - innerR + 2}
                width={(innerR - 2) * 2} height={(innerR - 2) * 2}
                clipPath={`url(#${clipId}-i-${i})`} preserveAspectRatio="xMidYMid slice" />
              {/* Number badge */}
              <circle cx={node.x - innerR * 0.75} cy={node.y - innerR * 0.75} r="13" fill={DARK} />
              <text x={node.x - innerR * 0.75} y={node.y - innerR * 0.75 + 1} textAnchor="middle"
                dominantBaseline="middle" fontSize="11" fill="white" fontWeight="700">{node.label}</text>
              {/* 50% pill */}
              <g transform={`translate(${node.x + innerR * 0.65}, ${node.y + innerR * 0.65})`}>
                <rect x="-17" y="-10" width="34" height="20" rx="10" fill={BLUE} />
                <text x="0" y="1" textAnchor="middle" dominantBaseline="middle"
                  fontSize="10" fill="white" fontWeight="700">50%</text>
              </g>
              {justAppeared && (
                <circle cx={node.x} cy={node.y} r={innerR} fill="none" stroke={ACCENT} strokeWidth="2" opacity="0.5">
                  <animate attributeName="r" from={`${innerR}`} to={`${innerR + 18}`} dur="0.8s" fill="freeze" />
                  <animate attributeName="opacity" from="0.5" to="0" dur="0.8s" fill="freeze" />
                </circle>
              )}
            </g>
          );
        })}

        {/* ── Outer nodes (03–06) ── */}
        {outerNodes.map((node, i) => {
          const idx = i + 2;
          const isVisible = idx < visibleCount;
          const justAppeared = idx === visibleCount - 1;
          return (
            <g key={`outer-${i}`} opacity={isVisible ? 1 : 0} style={{ transition: "opacity 0.6s ease" }}>
              <clipPath id={`${clipId}-o-${i}`}><circle cx={node.x} cy={node.y} r={outerR - 2} /></clipPath>
              <circle cx={node.x} cy={node.y} r={outerR} fill="white" stroke={ACCENT} strokeWidth="2.5" />
              <image href={node.avatar} x={node.x - outerR + 2} y={node.y - outerR + 2}
                width={(outerR - 2) * 2} height={(outerR - 2) * 2}
                clipPath={`url(#${clipId}-o-${i})`} preserveAspectRatio="xMidYMid slice" />
              {/* Number badge */}
              <circle cx={node.x - outerR * 0.75} cy={node.y - outerR * 0.75} r="12" fill={DARK} />
              <text x={node.x - outerR * 0.75} y={node.y - outerR * 0.75 + 1} textAnchor="middle"
                dominantBaseline="middle" fontSize="10" fill="white" fontWeight="700">{node.label}</text>
              {/* 50% pill */}
              <g transform={`translate(${node.x}, ${node.y + outerR + 18})`}>
                <rect x="-17" y="-10" width="34" height="20" rx="10" fill={BLUE} />
                <text x="0" y="1" textAnchor="middle" dominantBaseline="middle"
                  fontSize="10" fill="white" fontWeight="700">50%</text>
              </g>
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

      {visibleCount > 0 && (
        <div className="flex items-center gap-3 transition-all duration-500">
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full border-2" style={{ borderColor: GOLD }}>
            <span className="text-xs font-medium" style={{ color: GOLD }}>Total received:</span>
            <span className="text-xl font-bold tabular-nums" style={{ color: GOLD }}>
              {totalPercent}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
