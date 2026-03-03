import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";
import { ArrowRight, Users, RefreshCw, Shield, Zap, TrendingUp, Infinity, UserPlus, Play, Pause, SkipForward } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";

import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";
import avatar4 from "@/assets/avatar-4.jpg";
import avatar5 from "@/assets/avatar-5.jpg";
import avatar6 from "@/assets/avatar-6.jpg";

const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];

/* ── Brand colors (HSL from design system) ── */
const BLUE = "hsl(224 85% 58%)";
const GREEN = "hsl(160 80% 42%)";
const GOLD = "hsl(39 55% 52%)";

const heading = "'Cormorant Garamond', Georgia, serif";

/* ── Animated Wheelhouse SVG with 50% growth ── */
const AnimatedWheelhouse = ({
  label,
  positions,
  borderColor,
  size = "md",
  animateSequence = false,
  animationDelay = 0,
  showGrowth = false,
}: {
  label: string;
  positions: (string | null)[];
  borderColor: string;
  size?: "sm" | "md";
  animateSequence?: boolean;
  animationDelay?: number;
  showGrowth?: boolean;
}) => {
  const center = positions[0];
  const [visibleCount, setVisibleCount] = useState(animateSequence ? 0 : 7);
  const [centerVisible, setCenterVisible] = useState(!animateSequence);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const slots = [
    { x: 150, y: 68, label: positions[1] },
    { x: 150, y: 232, label: positions[2] },
    { x: 68, y: 105, label: positions[3] },
    { x: 232, y: 105, label: positions[4] },
    { x: 68, y: 195, label: positions[5] },
    { x: 232, y: 195, label: positions[6] },
  ];

  const filledSlots = slots.filter(s => s.label !== null);

  useEffect(() => {
    if (!animateSequence || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          setTimeout(() => setCenterVisible(true), animationDelay);
          filledSlots.forEach((_, i) => {
            setTimeout(() => setVisibleCount(i + 1), animationDelay + 600 + i * 900);
          });
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [animateSequence, animationDelay]);

  const sizeClass = size === "sm" ? "w-36 h-36 md:w-44 md:h-44" : "w-52 h-52 md:w-64 md:h-64";
  let nonNullIndex = 0;
  const totalPercent = visibleCount * 50;

  return (
    <div className="flex flex-col items-center gap-3" ref={ref}>
      <svg viewBox="0 0 300 300" className={sizeClass}>
        <circle cx="150" cy="150" r="140" fill="none" stroke={borderColor} strokeWidth="3" opacity="0.25" />
        <circle cx="150" cy="150" r="120" fill={borderColor} opacity="0.12" />
        <line x1="150" y1="12" x2="150" y2="288" stroke="white" strokeWidth="2" opacity="0.15" />
        <line x1="12" y1="150" x2="288" y2="150" stroke="white" strokeWidth="2" opacity="0.15" />
        <circle cx="150" cy="150" r="58" fill="hsl(0 0% 20%)" opacity="0.5" />
        <circle cx="150" cy="150" r="38" fill="white" stroke={borderColor} strokeWidth="2.5" />

        <text
          x="150" y="154"
          textAnchor="middle" dominantBaseline="middle"
          className="font-bold"
          fontSize={center && center.length > 3 ? "12" : "15"}
          fill="hsl(0 0% 8%)"
          opacity={centerVisible ? 1 : 0}
          style={{ transition: "opacity 0.5s ease" }}
        >
          {center}
        </text>

        {slots.map((slot, i) => {
          if (!slot.label) return null;
          const currentNonNull = nonNullIndex++;
          const isVisible = currentNonNull < visibleCount;
          const justAppeared = currentNonNull === visibleCount - 1;

          return (
            <g key={i} opacity={isVisible ? 1 : 0} style={{ transition: "opacity 0.6s ease" }}>
              <circle cx={slot.x} cy={slot.y} r="22" fill={borderColor} opacity="0.7" />
              <circle cx={slot.x} cy={slot.y} r="22" fill="none" stroke="white" strokeWidth="1.5" opacity="0.3" />
              <text
                x={slot.x} y={slot.y - 2}
                textAnchor="middle" dominantBaseline="middle"
                className="font-bold" fontSize="14" fill="white"
              >
                {slot.label}
              </text>
              {/* 50% label under the number */}
              <text
                x={slot.x} y={slot.y + 13}
                textAnchor="middle" fontSize="8" fill="white" opacity="0.7"
              >
                50%
              </text>
              {/* Flash ring on appear */}
              {justAppeared && (
                <circle
                  cx={slot.x} cy={slot.y} r="26"
                  fill="none" stroke="white" strokeWidth="2" opacity="0.6"
                >
                  <animate attributeName="r" from="22" to="34" dur="0.8s" fill="freeze" />
                  <animate attributeName="opacity" from="0.6" to="0" dur="0.8s" fill="freeze" />
                </circle>
              )}
            </g>
          );
        })}
      </svg>

      {/* Growth indicator */}
      {showGrowth && visibleCount > 0 && (
        <div
          className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.05] transition-all duration-500"
          style={{ opacity: visibleCount > 0 ? 1 : 0 }}
        >
          <span className="text-xs text-white/50">Received:</span>
          <span className="text-sm font-bold" style={{ color: borderColor }}>{totalPercent}%</span>
          {visibleCount >= filledSlots.length && (
            <span className="text-[10px] tracking-wider uppercase text-white/30 ml-1">· Complete!</span>
          )}
        </div>
      )}

      <p className="text-xs font-semibold tracking-widest uppercase text-white/60">{label}</p>
    </div>
  );
};

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
const MobiusLoopVisual = () => {
  const [cycle, setCycle] = useState(0);
  const [filling, setFilling] = useState(0);
  const [completedWheels, setCompletedWheels] = useState<number[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);
  const timerRefs = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isPausedRef = useRef(false);
  const fillingRef = useRef(0);
  const cycleRef = useRef(0);

  const MAX_CYCLES = 6;
  const cumulativePercent = cycle * 300 + filling * 50;

  // Keep refs in sync
  useEffect(() => { isPausedRef.current = isPaused; }, [isPaused]);
  useEffect(() => { fillingRef.current = filling; }, [filling]);
  useEffect(() => { cycleRef.current = cycle; }, [cycle]);

  const runNextCycle = useCallback(() => {
    setFilling(0);
    let pos = 0;
    const step = () => {
      if (isPausedRef.current) {
        // Re-check every 200ms while paused
        timerRefs.current.push(setTimeout(step, 200));
        return;
      }
      pos++;
      setFilling(pos);
      if (pos < 6) {
        timerRefs.current.push(setTimeout(step, 600));
      } else {
        // Wheel complete — spin + shrink, then add to grid
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
    // Clear all timers
    timerRefs.current.forEach(clearTimeout);
    timerRefs.current = [];
    // Complete current wheel instantly
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

      {/* Cycle counter + controls */}
      {!isFinished && (
        <div className="flex items-center gap-4 mb-2">
          <div className="flex items-center gap-3">
            <Infinity size={18} style={{ color: currentColor }} />
            <p className="text-xs tracking-widest uppercase text-white/50">
              Wheel <span className="font-bold text-white/80" style={{ color: currentColor }}>{cycle + 1}</span> of {MAX_CYCLES}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPaused(p => !p)}
              className="flex items-center justify-center w-8 h-8 rounded-full border border-white/20 text-white/50 hover:text-white hover:border-white/40 transition-all"
              title={isPaused ? "Play" : "Pause"}
            >
              {isPaused ? <Play size={12} /> : <Pause size={12} />}
            </button>
            <button
              onClick={skipToNext}
              className="flex items-center justify-center w-8 h-8 rounded-full border border-white/20 text-white/50 hover:text-white hover:border-white/40 transition-all"
              title="Next wheel"
            >
              <SkipForward size={12} />
            </button>
          </div>
        </div>
      )}

      {/* Active Wheelhouse */}
      <div style={{ animation: isSpinning ? "wheel-spin-shrink 0.9s ease-in-out forwards" : undefined }}>
        <svg viewBox="0 0 300 300" className="w-56 h-56 md:w-72 md:h-72">
          <circle cx="150" cy="150" r="140" fill="none" stroke={currentColor} strokeWidth="3" opacity="0.25"
            style={{ transition: "stroke 0.8s ease" }} />
          <circle cx="150" cy="150" r="120" fill={currentColor} opacity="0.12"
            style={{ transition: "fill 0.8s ease" }} />
          <line x1="150" y1="12" x2="150" y2="288" stroke="white" strokeWidth="2" opacity="0.2" />
          <line x1="12" y1="150" x2="288" y2="150" stroke="white" strokeWidth="2" opacity="0.2" />
          <circle cx="150" cy="150" r="58" fill="hsl(0 0% 20%)" opacity="0.5" />
          <circle cx="150" cy="150" r="42" fill="white" stroke={currentColor} strokeWidth="2.5"
            style={{ transition: "stroke 0.8s ease" }} />
          <text x="150" y="143" textAnchor="middle" dominantBaseline="middle"
            className="font-bold" fontSize="12" fill="hsl(0 0% 8%)">YOU</text>
          <text x="150" y="160" textAnchor="middle" dominantBaseline="middle"
            className="font-bold" fontSize="11" fill={currentColor}
            style={{ transition: "fill 0.8s ease" }}>
            {formatPercent(cumulativePercent)}%
          </text>
          {[
            { x: 150, y: 68 }, { x: 150, y: 232 },
            { x: 68, y: 105 }, { x: 232, y: 105 },
            { x: 68, y: 195 }, { x: 232, y: 195 },
          ].map((pos, i) => {
            const isVisible = i < filling;
            const justAppeared = i === filling - 1;
            return (
              <g key={`${cycle}-${i}`} opacity={isVisible ? 1 : 0} style={{ transition: "opacity 0.5s ease" }}>
                <circle cx={pos.x} cy={pos.y} r="22" fill={currentColor} opacity="0.8"
                  style={{ transition: "fill 0.8s ease" }} />
                <circle cx={pos.x} cy={pos.y} r="22" fill="none" stroke="white" strokeWidth="1.5" opacity="0.3" />
                <text x={pos.x} y={pos.y - 2} textAnchor="middle" dominantBaseline="middle"
                  className="font-bold" fontSize="14" fill="white">{posLabels[i]}</text>
                <text x={pos.x} y={pos.y + 13} textAnchor="middle" fontSize="8" fill="white" opacity="0.7">50%</text>
                {justAppeared && (
                  <circle cx={pos.x} cy={pos.y} r="26" fill="none" stroke="white" strokeWidth="2" opacity="0.6">
                    <animate attributeName="r" from="22" to="36" dur="0.7s" fill="freeze" />
                    <animate attributeName="opacity" from="0.6" to="0" dur="0.7s" fill="freeze" />
                  </circle>
                )}
              </g>
            );
          })}
          {filling >= 6 && !isSpinning && (
            <text x="150" y="20" textAnchor="middle" fontSize="11" fill={currentColor}
              className="font-bold" style={{ transition: "fill 0.8s ease" }}>
              ✓ WHEEL {cycle + 1} COMPLETE
            </text>
          )}
        </svg>
      </div>

      {/* Running total */}
      <div className="flex items-center gap-3 transition-all duration-500">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.05]">
          <span className="text-xs text-white/50">Cumulative:</span>
          <span className="text-lg font-bold tabular-nums" style={{ color: currentColor, transition: "color 0.8s ease" }}>
            {formatPercent(cumulativePercent)}%
          </span>
        </div>
        {filling > 0 && filling < 6 && (
          <span className="text-xs font-semibold animate-fade-in" style={{ color: currentColor }}>+50%</span>
        )}
      </div>

      {/* Completed wheels grid — 2 rows of 6 */}
      {completedWheels.length > 0 && (
        <div className="w-full max-w-md mt-4">
          <p className="text-[10px] text-white/40 uppercase tracking-widest text-center mb-3">Completed Wheels</p>
          <div className="grid grid-cols-6 gap-2 justify-items-center">
            {completedWheels.map((wNum) => (
              <MiniWheel key={wNum} wheelNum={wNum} color={colors[(wNum - 1) % 3]} />
            ))}
          </div>
        </div>
      )}

      {/* All 12 complete — finale text */}
      {completedWheels.length >= MAX_CYCLES && (
        <div className="flex flex-col items-center gap-6 mt-6 animate-fade-in text-center px-4">
          <h3 className="text-3xl md:text-4xl font-bold text-white">
            And It Never Stops.
          </h3>
          <p className="text-white/50 text-sm md:text-base max-w-lg">
            Unlimited re-entries. Unlimited follows. <span className="font-bold text-white">Unlimited income.</span>
          </p>
          <p className="text-white/50 text-sm md:text-base max-w-lg">
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

      {/* Infinite loop indicator */}
      {completedWheels.length < MAX_CYCLES && (
        <div className="flex items-center gap-2 text-white/40">
          <Infinity size={18} className="animate-pulse" style={{ color: currentColor }} />
          <p className="text-xs tracking-widest uppercase">Infinite Möbius Loop</p>
        </div>
      )}
    </div>
  );
};

/* ── Two-Ring Wheelhouse with Avatar Photos ── */
const TwoRingWheelhouse = () => {
  const [visibleCount, setVisibleCount] = useState(0);
  const [totalPercent, setTotalPercent] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  // Inner ring: 2 direct invites (positions 1-2)
  // Outer ring: 4 team fills (positions 3-6)
  const innerRadius = 90;
  const outerRadius = 160;
  const cx = 200;
  const cy = 200;

  const innerPositions = [
    { angle: 0, label: "1", avatar: avatars[0] },    // right
    { angle: 180, label: "2", avatar: avatars[1] },   // left
  ];

  const outerPositions = [
    { angle: -40, label: "3", avatar: avatars[2] },   // top-right (invited by #1)
    { angle: 40, label: "4", avatar: avatars[3] },    // bottom-right (invited by #1)
    { angle: -140, label: "5", avatar: avatars[4] },   // top-left (invited by #2)
    { angle: 140, label: "6", avatar: avatars[5] },    // bottom-left (invited by #2)
  ];

  const allPositions = [...innerPositions, ...outerPositions];

  useEffect(() => {
    if (hasAnimated.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          // Animate: inner 2 first, then outer 4
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

  const getPos = (angle: number, radius: number) => ({
    x: cx + radius * Math.cos((angle * Math.PI) / 180),
    y: cy + radius * Math.sin((angle * Math.PI) / 180),
  });

  const clipId = useRef(`clip-${Math.random().toString(36).slice(2)}`).current;

  return (
    <div ref={ref} className="flex flex-col items-center gap-6">
      <svg viewBox="0 0 400 400" className="w-72 h-72 md:w-96 md:h-96">
        <defs>
          {allPositions.map((_, i) => (
            <clipPath key={i} id={`${clipId}-${i}`}>
              <circle cx="0" cy="0" r="28" />
            </clipPath>
          ))}
          <clipPath id={`${clipId}-center`}>
            <circle cx={cx} cy={cy} r="32" />
          </clipPath>
        </defs>

        {/* Outer ring track */}
        <circle cx={cx} cy={cy} r={outerRadius} fill="none" stroke={GOLD} strokeWidth="1.5" opacity="0.15" strokeDasharray="6 4" />
        {/* Inner ring track */}
        <circle cx={cx} cy={cy} r={innerRadius} fill="none" stroke={BLUE} strokeWidth="1.5" opacity="0.2" strokeDasharray="6 4" />

        {/* Connection lines from center to inner */}
        {innerPositions.map((pos, i) => {
          const p = getPos(pos.angle, innerRadius);
          return (
            <line key={`ci-${i}`} x1={cx} y1={cy} x2={p.x} y2={p.y}
              stroke={BLUE} strokeWidth="1.5" opacity={i < visibleCount ? 0.4 : 0.1}
              style={{ transition: "opacity 0.6s ease" }} />
          );
        })}

        {/* Connection lines from inner to outer */}
        {outerPositions.map((pos, i) => {
          const p = getPos(pos.angle, outerRadius);
          const parentIdx = i < 2 ? 0 : 1;
          const parent = getPos(innerPositions[parentIdx].angle, innerRadius);
          return (
            <line key={`co-${i}`} x1={parent.x} y1={parent.y} x2={p.x} y2={p.y}
              stroke={GREEN} strokeWidth="1.5" opacity={i + 2 < visibleCount ? 0.3 : 0.08}
              style={{ transition: "opacity 0.6s ease" }} />
          );
        })}

        {/* Center — YOU */}
        <circle cx={cx} cy={cy} r="36" fill="white" stroke={GOLD} strokeWidth="3" />
        <text x={cx} y={cy + 1} textAnchor="middle" dominantBaseline="middle"
          className="font-bold" fontSize="16" fill="hsl(0 0% 8%)">
          YOU
        </text>


        {/* Inner positions (1-2) */}
        {innerPositions.map((pos, i) => {
          const p = getPos(pos.angle, innerRadius);
          const isVisible = i < visibleCount;
          const justAppeared = i === visibleCount - 1;

          return (
            <g key={`inner-${i}`} opacity={isVisible ? 1 : 0} style={{ transition: "opacity 0.6s ease" }}>
              {/* Avatar */}
              <g transform={`translate(${p.x}, ${p.y})`}>
                <circle r="30" fill={BLUE} opacity="0.3" />
                <clipPath id={`${clipId}-inner-${i}`}>
                  <circle r="28" />
                </clipPath>
                <image
                  href={pos.avatar}
                  x="-28" y="-28" width="56" height="56"
                  clipPath={`url(#${clipId}-inner-${i})`}
                  preserveAspectRatio="xMidYMid slice"
                />
                <circle r="28" fill="none" stroke={BLUE} strokeWidth="3" />
              </g>
              {/* Position number */}
              <circle cx={p.x + 20} cy={p.y - 20} r="10" fill={BLUE} />
              <text x={p.x + 20} y={p.y - 19} textAnchor="middle" dominantBaseline="middle"
                fontSize="10" fill="white" className="font-bold">{pos.label}</text>
              {/* 50% badge */}
              <g transform={`translate(${p.x}, ${p.y + 38})`}>
                <rect x="-18" y="-8" width="36" height="16" rx="8" fill={BLUE} opacity="0.9" />
                <text x="0" y="1" textAnchor="middle" dominantBaseline="middle"
                  fontSize="9" fill="white" className="font-bold">50%</text>
              </g>
              {/* Flash ring */}
              {justAppeared && (
                <circle cx={p.x} cy={p.y} r="30" fill="none" stroke={BLUE} strokeWidth="2" opacity="0.6">
                  <animate attributeName="r" from="28" to="44" dur="0.8s" fill="freeze" />
                  <animate attributeName="opacity" from="0.6" to="0" dur="0.8s" fill="freeze" />
                </circle>
              )}
            </g>
          );
        })}

        {/* Outer positions (3-6) */}
        {outerPositions.map((pos, i) => {
          const p = getPos(pos.angle, outerRadius);
          const globalIdx = i + 2;
          const isVisible = globalIdx < visibleCount;
          const justAppeared = globalIdx === visibleCount - 1;

          return (
            <g key={`outer-${i}`} opacity={isVisible ? 1 : 0} style={{ transition: "opacity 0.6s ease" }}>
              <g transform={`translate(${p.x}, ${p.y})`}>
                <circle r="28" fill={GREEN} opacity="0.3" />
                <clipPath id={`${clipId}-outer-${i}`}>
                  <circle r="26" />
                </clipPath>
                <image
                  href={pos.avatar}
                  x="-26" y="-26" width="52" height="52"
                  clipPath={`url(#${clipId}-outer-${i})`}
                  preserveAspectRatio="xMidYMid slice"
                />
                <circle r="26" fill="none" stroke={GREEN} strokeWidth="2.5" />
              </g>
              <circle cx={p.x + 18} cy={p.y - 18} r="10" fill={GREEN} />
              <text x={p.x + 18} y={p.y - 17} textAnchor="middle" dominantBaseline="middle"
                fontSize="10" fill="white" className="font-bold">{pos.label}</text>
              <g transform={`translate(${p.x}, ${p.y + 35})`}>
                <rect x="-18" y="-8" width="36" height="16" rx="8" fill={GREEN} opacity="0.9" />
                <text x="0" y="1" textAnchor="middle" dominantBaseline="middle"
                  fontSize="9" fill="white" className="font-bold">50%</text>
              </g>
              {justAppeared && (
                <circle cx={p.x} cy={p.y} r="28" fill="none" stroke={GREEN} strokeWidth="2" opacity="0.6">
                  <animate attributeName="r" from="26" to="42" dur="0.8s" fill="freeze" />
                  <animate attributeName="opacity" from="0.6" to="0" dur="0.8s" fill="freeze" />
                </circle>
              )}
            </g>
          );
        })}
      </svg>

      {/* Running total */}
      {visibleCount > 0 && (
        <div className="flex items-center gap-3 transition-all duration-500">
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.05]">
            <span className="text-xs text-white/50">Total received:</span>
            <span className="text-xl font-bold tabular-nums" style={{ color: GOLD }}>
              {totalPercent}%
            </span>
          </div>
        </div>
      )}

    </div>
  );
};

/* ── Steps ── */
const steps = [
  {
    step: "Step 1",
    title: "Register & Contribute",
    desc: "Your contribution is split 50/50 to help 2 teammates. You're now an Active Contributor inside the Wheelhouse.",
    color: BLUE,
  },
  {
    step: "Step 2",
    title: "Invite 2 Friends",
    desc: "Invite 2 friends to make a contribution. They enter the Wheelhouse and each sends you 50% of their contribution.",
    color: GREEN,
  },
  {
    step: "Step 3",
    title: "Your Team Grows",
    desc: "Help your 2 friends each invite 2 friends. Their contributions fill the remaining 4 positions — and you receive 50% from each one.",
    color: GOLD,
  },
];

/* ── Features ── */
const features = [
  {
    icon: Shield,
    title: "No Boards · No Splits",
    desc: "You always remain with your team and your team remains with you. No reshuffling.",
    color: BLUE,
  },
  {
    icon: RefreshCw,
    title: "Automatic Re-Entry",
    desc: "When your Wheelhouse closes, you are automatically re-entered into an open Wheelhouse — without any extra effort.",
    color: GREEN,
  },
  {
    icon: Users,
    title: "Your Team Follows You",
    desc: "Your team follows you into every new Wheelhouse. You never lose your team.",
    color: GOLD,
  },
  {
    icon: Zap,
    title: "100% Goes to Participants",
    desc: "Every contribution goes directly to participants. No middlemen. No exceptions.",
    color: BLUE,
  },
  {
    icon: UserPlus,
    title: "Invite Unlimited Friends",
    desc: "You can invite as many friends as you like — and you will always get half. The more friends invite friends, the more contributions you receive!",
    color: GREEN,
  },
  {
    icon: Infinity,
    title: "Receive Multiple Times a Day",
    desc: "The Mobius Loop means Wheelhouses open and close continuously. You can receive contributions multiple times a day.",
    color: GOLD,
  },
];

/* ── 50% Position Visual ── */
const PositionFillVisual = () => {
  const [visibleCount, setVisibleCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          for (let i = 0; i < 6; i++) {
            setTimeout(() => setVisibleCount(i + 1), i * 400);
          }
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const positionData = [
    { pos: "1", color: BLUE },
    { pos: "2", color: BLUE },
    { pos: "3", color: GREEN },
    { pos: "4", color: GREEN },
    { pos: "5", color: GOLD },
    { pos: "6", color: GOLD },
  ];

  return (
    <div ref={ref} className="grid grid-cols-3 md:grid-cols-6 gap-3 max-w-2xl mx-auto">
      {positionData.map((p, i) => (
        <div
          key={i}
          className="flex flex-col items-center gap-2 p-4 rounded-xl border border-white/10 bg-white/[0.03] transition-all duration-500"
          style={{
            opacity: i < visibleCount ? 1 : 0,
            transform: i < visibleCount ? "translateY(0) scale(1)" : "translateY(20px) scale(0.9)",
          }}
        >
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: `${p.color}25`, color: p.color }}>
            {p.pos}
          </div>
          <p className="text-lg font-bold" style={{ color: p.color }}>50%</p>
          <p className="text-[10px] text-white/40 uppercase tracking-wider">to you</p>
        </div>
      ))}
    </div>
  );
};

const HowItWorksLife = () => {
  return (
    <div className="min-h-screen bg-[hsl(0_0%_6%)] text-white">
      <Navbar />

      {/* ── Hero ── */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,hsl(224_85%_58%/0.08)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_30%_20%,hsl(160_80%_42%/0.06)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_70%_20%,hsl(39_55%_52%/0.06)_0%,transparent_50%)]" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <p className="text-sm tracking-[0.35em] uppercase font-semibold mb-5" style={{ color: GOLD }}>
            Cooperative Crowdfunding
          </p>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-[1.05]" style={{ fontFamily: heading }}>
            How{" "}
            <span style={{ color: BLUE }}>50</span>
            <span style={{ color: GREEN }}>50</span>{" "}
            <span className="gold-gradient">LIFE</span>{" "}
            Works
          </h1>
          <p className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto text-white/60 mb-3">
            A 2×2 peer-to-peer cooperative where 100% of every contribution goes directly to participants.
            No middlemen. No exceptions.
          </p>
          <p className="text-base text-white/40 italic">Money for Everything!</p>
        </div>
      </section>

      {/* ── The 50/50 Split ── */}
      <section className="py-16 border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase font-medium mb-3" style={{ color: GOLD }}>
              The 50/50 Promise
            </p>
            <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: heading }}>
              Your Contribution Is Split 50/50
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              50% goes to one teammate, 50% goes to another. Together, we each do a little so all can receive a lot.
            </p>
          </div>

          <div className="flex items-center justify-center gap-0 max-w-lg mx-auto">
            <div className="flex-1 p-6 text-center rounded-l-xl" style={{ background: `${BLUE}20`, borderLeft: `3px solid ${BLUE}` }}>
              <p className="text-4xl font-bold" style={{ color: BLUE }}>50%</p>
              <p className="text-white/50 text-sm mt-2">Instant Payout to You</p>
            </div>
            <div className="w-px h-20 bg-white/20" />
            <div className="flex-1 p-6 text-center rounded-r-xl" style={{ background: `${GREEN}20`, borderRight: `3px solid ${GREEN}` }}>
              <p className="text-4xl font-bold" style={{ color: GREEN }}>50%</p>
              <p className="text-white/50 text-sm mt-2">Instant Payout to Teammate</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 300% Per Cycle ── */}
      <section className="py-16 border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase font-medium mb-3" style={{ color: GREEN }}>
              Receive 50% from Each Position
            </p>
            <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: heading }}>
              Earn <span style={{ color: GOLD }}>300%</span> Each Cycle
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              6 Active Contributors fill your Wheelhouse. You receive 50% from each position — that's 300% of your original contribution, every single cycle.
            </p>
          </div>

          <PositionFillVisual />

          <div className="text-center mt-8">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-white/[0.03]">
              <TrendingUp size={18} style={{ color: GOLD }} />
              <p className="text-sm">
                <span className="font-bold text-white">6 × 50%</span>
                <span className="text-white/40 mx-2">=</span>
                <span className="font-bold" style={{ color: GOLD }}>300% Return Per Cycle</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3 Steps ── */}
      <section className="py-16 border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase font-medium mb-3" style={{ color: GOLD }}>
              Simple Process
            </p>
            <h2 className="text-3xl md:text-5xl font-bold" style={{ fontFamily: heading }}>
              Just 3 Simple Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <div
                key={i}
                className="rounded-xl p-6 border border-white/10 bg-white/[0.03] relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1" style={{ background: s.color }} />
                <p className="text-xs tracking-[0.3em] uppercase font-bold mb-2" style={{ color: s.color }}>
                  {s.step}
                </p>
                <h3 className="text-xl font-bold mb-3 text-white" style={{ fontFamily: heading }}>
                  {s.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Wheelhouse Visualization — 2-Ring with Avatars ── */}
      <section className="py-20 border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase font-medium mb-3" style={{ color: GOLD }}>
              Watch It In Action
            </p>
            <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: heading }}>
              The Wheelhouse
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              YOU are in the center. Your 2 direct invites form the inner circle.
              Their 2 invites each fill the outer circle — 6 members total.
            </p>
          </div>

          {/* Two-ring wheelhouse */}
          <TwoRingWheelhouse />

          {/* Explanation cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto mt-12">
            <div className="p-5 rounded-xl border border-white/10 bg-white/[0.03]">
              <p className="text-sm font-semibold text-white mb-2">Inner Circle — Your 2 Invites</p>
              <p className="text-white/50 text-sm leading-relaxed">
                You invite 2 friends. They each contribute and you receive 50% from each one instantly.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-white/10 bg-white/[0.03]">
              <p className="text-sm font-semibold text-white mb-2">Outer Circle — Their 2 Invites Each</p>
              <p className="text-white/50 text-sm leading-relaxed">
                Your 2 friends each invite 2 more. That's 4 more contributors — and you receive 50% from each.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-white/10 bg-white/[0.03]">
              <p className="text-sm font-semibold text-white mb-2">Automatic Re-Entry</p>
              <p className="text-white/50 text-sm leading-relaxed">
                Your Wheelhouse closes and you are automatically re-entered into an open Wheelhouse to receive again — without any extra effort!
              </p>
            </div>
            <div className="p-5 rounded-xl border border-white/10 bg-white/[0.03]">
              <p className="text-sm font-semibold text-white mb-2">The Cycle Repeats</p>
              <p className="text-white/50 text-sm leading-relaxed">
                That completes another Wheelhouse — and guess what happens next? Another one opens. The Mobius Loop never stops.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mobius Loop Live ── */}
      <section className="py-20 border-t border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,hsl(224_85%_58%/0.04)_0%,transparent_70%)]" />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase font-medium mb-3" style={{ color: BLUE }}>
              The Mobius Loop
            </p>
            <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: heading }}>
              When One Completes, Another Opens
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Watch the Mobius Loop in action. Each Wheelhouse fills, closes, and a new one opens — automatically. The cycle never ends.
            </p>
          </div>

          <MobiusLoopVisual />

          {/* Highlight callout */}
          <div className="max-w-2xl mx-auto text-center p-8 rounded-2xl border border-white/10 bg-white/[0.03] mt-12">
            <p className="text-sm tracking-[0.3em] uppercase font-medium mb-4" style={{ color: GOLD }}>
              Here's the Best Part
            </p>
            <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: heading }}>
              Invite as Many Friends as You Like
            </h3>
            <p className="text-white/50 leading-relaxed">
              You will always receive half of every contribution. The more friends invite friends, the more contributions flow to you — over and over again.
            </p>
          </div>
        </div>
      </section>

      {/* ── Key Features ── */}
      <section className="py-16 border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase font-medium mb-3" style={{ color: GOLD }}>
              Why It Works
            </p>
            <h2 className="text-3xl md:text-5xl font-bold" style={{ fontFamily: heading }}>
              Built for Everyone
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-xl border border-white/10 bg-white/[0.03]">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${f.color}20` }}>
                  <f.icon size={20} style={{ color: f.color }} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">{f.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3 Systems ── */}
      <section className="py-16 border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase font-medium mb-3" style={{ color: GOLD }}>
              3 Cooperative Systems
            </p>
            <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: heading }}>
              Get In Where You Fit In
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              One time out of pocket. Your ultimate goal is to be active on all 3 Income Centers simultaneously.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { name: "5050 Fast", color: BLUE, desc: "Start quickly with accessible entry levels. Build momentum and learn the system.", link: "/how-it-works" },
              { name: "5050 Core", color: GREEN, desc: "Strengthen your position with mid-range contributions. Grow your team and your returns.", link: "/how-it-works" },
              { name: "5050 Max", color: GOLD, desc: "Maximize your potential with premium-level contributions. Designed for serious participants.", link: "/how-it-works" },
            ].map((sys, i) => (
              <div
                key={i}
                className="rounded-xl p-6 border-2 text-center transition-all duration-300 hover:scale-[1.02] bg-white/[0.03]"
                style={{ borderColor: sys.color }}
              >
                <p className="text-xl font-bold mb-3" style={{ color: sys.color, fontFamily: heading }}>
                  {sys.name}
                </p>
                <p className="text-white/50 text-sm leading-relaxed mb-5">{sys.desc}</p>
                <Link
                  to={sys.link}
                  className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase transition-colors"
                  style={{ color: sys.color }}
                >
                  Learn More <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 border-t border-white/10">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="text-sm tracking-[0.3em] uppercase font-medium mb-4" style={{ color: GOLD }}>
            100% Instant Payout · 50/50 · 300% Per Cycle
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: heading }}>
            Money for Everything!
          </h2>
          <p className="text-white/50 mb-8">
            The system is live and waiting for you. Join thousands who are already receiving — over and over again.
          </p>
          <Link
            to="/#join"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-sm font-bold tracking-widest uppercase text-sm btn-gold"
          >
            Join Us Now <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksLife;
