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
      <svg viewBox="0 0 100 100" className="w-10 h-10 md:w-12 md:h-12">
      <circle cx="50" cy="50" r="45" fill="none" stroke={color} strokeWidth="2" opacity="0.4" />
      <circle cx="50" cy="50" r="38" fill={color} opacity="0.15" />
      <circle cx="50" cy="50" r="16" fill="white" stroke={color} strokeWidth="1.5" />
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const r = 30;
        const x = 50 + r * Math.cos((angle - 90) * Math.PI / 180);
        const y = 50 + r * Math.sin((angle - 90) * Math.PI / 180);
        return <circle key={i} cx={x} cy={y} r="6" fill={color} opacity="0.8" />;
      })}
      <text x="50" y="51" textAnchor="middle" dominantBaseline="middle" fontSize="7" fill="hsl(0 0% 20%)" className="font-bold">✓</text>
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
              <p className="text-xs tracking-widest uppercase text-white/60">
              Wheel <span className="font-bold" style={{ color: currentColor }}>{cycle + 1}</span> of {MAX_CYCLES}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPaused(p => !p)}
              className="flex items-center justify-center w-8 h-8 rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-all"
              title={isPaused ? "Play" : "Pause"}
            >
              {isPaused ? <Play size={12} /> : <Pause size={12} />}
            </button>
            <button
              onClick={skipToNext}
              className="flex items-center justify-center w-8 h-8 rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-all"
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
                          <circle cx={pos.x} cy={pos.y} r="22" fill="none" stroke="white" strokeWidth="1.5" opacity="0.4" />
                          <text x={pos.x} y={pos.y - 2} textAnchor="middle" dominantBaseline="middle"
                            className="font-bold" fontSize="14" fill="white">{pos.label}</text>
                          <text x={pos.x} y={pos.y + 13} textAnchor="middle" fontSize="8" fill="white" opacity="0.9">50%</text>
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
              <p className="text-[10px] text-white/50 uppercase tracking-widest text-center mb-3">Completed Wheels</p>
              <div className="grid grid-cols-6 gap-2 justify-items-center">
                {completedWheels.map((wNum) => (
                  <MiniWheel key={wNum} wheelNum={wNum} color={colors[(wNum - 1) % 3]} />
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 text-white/60">
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
            <p className="text-[10px] text-white/50 uppercase tracking-widest text-center mb-3">Completed Wheels</p>
            <div className="grid grid-cols-6 gap-2 justify-items-center">
              {completedWheels.map((wNum) => (
                <MiniWheel key={wNum} wheelNum={wNum} color={colors[(wNum - 1) % 3]} />
              ))}
            </div>
          </div>

          <h3 className="text-3xl md:text-4xl font-bold text-white mt-4">
            And It Never Stops.
          </h3>
           <p className="text-white/60 text-sm md:text-base max-w-lg">
            Unlimited re-entries. Unlimited follows. <span className="font-bold text-white">Unlimited income.</span>
          </p>
          <p className="text-white/60 text-sm md:text-base max-w-lg">
            Every completed wheelhouse automatically opens a new one. There is no cap. No ceiling. No limit.
          </p>
          <p className="text-base md:text-lg font-bold text-white">
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
            className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-all duration-300 mt-2 text-sm"
          >
            <RefreshCw size={14} />
            Replay
          </button>
        </div>
      )}
    </div>
  );
};

/* ── Pyramid Wheelhouse with Avatar Photos ── */
export const TwoRingWheelhouse = () => {
  const [visibleCount, setVisibleCount] = useState(0);
  const [totalPercent, setTotalPercent] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const youPos = { x: 250, y: 55 };

  const middleRow = [
    { x: 155, y: 175, label: "1", avatar: avatars[0] },
    { x: 345, y: 175, label: "2", avatar: avatars[1] },
  ];

  const bottomRow = [
    { x: 70,  y: 305, label: "3", avatar: avatars[2] },
    { x: 190, y: 305, label: "4", avatar: avatars[3] },
    { x: 310, y: 305, label: "5", avatar: avatars[4] },
    { x: 430, y: 305, label: "6", avatar: avatars[5] },
  ];

  const allPositions = [...middleRow, ...bottomRow];

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

  const renderNode = (pos: { x: number; y: number; label: string; avatar: string }, idx: number, color: string, r: number) => {
    const isVisible = idx < visibleCount;
    const justAppeared = idx === visibleCount - 1;
    return (
      <g key={`node-${idx}`} opacity={isVisible ? 1 : 0} style={{ transition: "opacity 0.6s ease" }}>
        <g transform={`translate(${pos.x}, ${pos.y})`}>
          <circle r={r + 2} fill={color} opacity="0.3" />
          <clipPath id={`${clipId}-n-${idx}`}>
            <circle r={r} />
          </clipPath>
          <image
            href={pos.avatar}
            x={-r} y={-r} width={r * 2} height={r * 2}
            clipPath={`url(#${clipId}-n-${idx})`}
            preserveAspectRatio="xMidYMid slice"
          />
          <circle r={r} fill="none" stroke={color} strokeWidth="2.5" />
        </g>
        <circle cx={pos.x + r * 0.7} cy={pos.y - r * 0.7} r="10" fill={color} />
        <text x={pos.x + r * 0.7} y={pos.y - r * 0.7 + 1} textAnchor="middle" dominantBaseline="middle"
          fontSize="10" fill="white" className="font-bold">{pos.label}</text>
        <g transform={`translate(${pos.x}, ${pos.y + r + 14})`}>
          <rect x="-18" y="-8" width="36" height="16" rx="8" fill={color} opacity="0.9" />
          <text x="0" y="1" textAnchor="middle" dominantBaseline="middle"
            fontSize="9" fill="white" className="font-bold">50%</text>
        </g>
        {justAppeared && (
          <circle cx={pos.x} cy={pos.y} r={r} fill="none" stroke={color} strokeWidth="2" opacity="0.6">
            <animate attributeName="r" from={`${r}`} to={`${r + 16}`} dur="0.8s" fill="freeze" />
            <animate attributeName="opacity" from="0.6" to="0" dur="0.8s" fill="freeze" />
          </circle>
        )}
      </g>
    );
  };

  return (
    <div ref={ref} className="flex flex-col items-center gap-6">
      <svg viewBox="0 0 500 380" className="w-full max-w-lg md:max-w-xl">
        {/* Lines from YOU to middle row */}
        {middleRow.map((pos, i) => (
          <line key={`lm-${i}`} x1={youPos.x} y1={youPos.y} x2={pos.x} y2={pos.y}
            stroke={BLUE} strokeWidth="2" opacity={i < visibleCount ? 0.35 : 0.08}
            style={{ transition: "opacity 0.6s ease" }} />
        ))}

        {/* Lines from middle to bottom */}
        {bottomRow.map((pos, i) => {
          const parent = middleRow[i < 2 ? 0 : 1];
          return (
            <line key={`lb-${i}`} x1={parent.x} y1={parent.y} x2={pos.x} y2={pos.y}
              stroke={GREEN} strokeWidth="2" opacity={i + 2 < visibleCount ? 0.3 : 0.08}
              style={{ transition: "opacity 0.6s ease" }} />
          );
        })}

        {/* YOU at apex */}
        <circle cx={youPos.x} cy={youPos.y} r="32" fill="white" stroke={GOLD} strokeWidth="3" />
        <text x={youPos.x} y={youPos.y + 1} textAnchor="middle" dominantBaseline="middle"
          className="font-bold" fontSize="15" fill="hsl(0 0% 8%)">YOU</text>

        {/* Middle row – blue */}
        {middleRow.map((pos, i) => renderNode(pos, i, BLUE, 28))}

        {/* Bottom row – green */}
        {bottomRow.map((pos, i) => renderNode(pos, i + 2, GREEN, 24))}
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
