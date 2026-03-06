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
    <Infinity size={28} strokeWidth={1.2} style={{ color: GOLD }} className="opacity-30" />

    <h3 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight leading-[1.1]"
      style={{ fontFamily: "'Cormorant Garamond', serif" }}>
      And It Never Stops.
    </h3>

    <div className="w-10 h-[2px] rounded-full mt-1" style={{ background: GOLD }} />

    <p className="text-foreground text-lg md:text-xl font-semibold max-w-md mt-2">
      You Never Lose Your Team!
    </p>

    <p className="text-muted-foreground text-sm md:text-base max-w-lg leading-relaxed">
      Each and every time your Income Center fills with 6 Active Contributors, another automatically re-opens for you to receive another 6 contributions — without additional effort or qualifications!
    </p>

    <p className="text-muted-foreground text-sm md:text-base max-w-lg leading-relaxed">
      The Mobius Loop ensures you always follow your inviter and your team always follows you!
    </p>

    <div className="flex items-center gap-3 px-7 py-3 rounded-full mt-4"
      style={{ border: `1px solid hsl(39 55% 52% / 0.5)` }}>
      <Infinity size={16} style={{ color: GOLD }} />
      <span className="text-[11px] font-semibold tracking-[0.25em] uppercase" style={{ color: GOLD }}>
        Infinite Earning Potential
      </span>
    </div>
  </div>
);
/* ── Radial Wheelhouse with Avatar Photos ── */
export const TwoRingWheelhouse = () => {
  const [visibleCount, setVisibleCount] = useState(0);
  const [totalPercent, setTotalPercent] = useState(0);
  const [animationDone, setAnimationDone] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const timers = useRef<number[]>([]);

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

  const earningMessages = [
    { title: "You invited #1", note: "You earn 50%" },
    { title: "You invited #2", note: "You earn 50% — now you're even." },
    { title: "#1 invited #3", note: "They earn 50% & You earn 50%" },
    { title: "#1 invited #4", note: "They earn 50% & You earn 50%" },
    { title: "#2 invited #5", note: "They earn 50% & You earn 50%" },
    { title: "#2 invited #6", note: "They earn 50% & You earn 50%" },
  ];

  const startAnimation = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setVisibleCount(0);
    setTotalPercent(0);
    setAnimationDone(false);
    allPositions.forEach((_, i) => {
      const t = window.setTimeout(() => {
        setVisibleCount(i + 1);
        setTotalPercent((i + 1) * 50);
        if (i === allPositions.length - 1) setAnimationDone(true);
      }, 800 + i * 900);
      timers.current.push(t);
    });
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

  const clipId = useRef(`clip-${Math.random().toString(36).slice(2)}`).current;
  const ACCENT = "hsl(224 85% 68%)";
  const DARK = "hsl(0 0% 20%)";

  const elbowPaths = [
    `M ${innerNodes[0].x - innerR},${innerNodes[0].y} L 210,${innerNodes[0].y} L 210,${outerNodes[0].y} L ${outerNodes[0].x + outerR},${outerNodes[0].y}`,
    `M ${innerNodes[0].x + innerR},${innerNodes[0].y} L 490,${innerNodes[0].y} L 490,${outerNodes[1].y} L ${outerNodes[1].x - outerR},${outerNodes[1].y}`,
    `M ${innerNodes[1].x - innerR},${innerNodes[1].y} L 210,${innerNodes[1].y} L 210,${outerNodes[2].y} L ${outerNodes[2].x + outerR},${outerNodes[2].y}`,
    `M ${innerNodes[1].x + innerR},${innerNodes[1].y} L 490,${innerNodes[1].y} L 490,${outerNodes[3].y} L ${outerNodes[3].x - outerR},${outerNodes[3].y}`,
  ];

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
              <p className="text-2xl font-bold" style={{ color: GOLD }}>{visibleCount * 50}%</p>
              <p className="text-xs text-muted-foreground">of your contribution back</p>
            </div>
          )}
        </div>

        {/* Right side — wheelhouse diagram (smaller) */}
        <div className="w-full md:w-[55%] flex-shrink-0">
          <svg viewBox="0 0 700 520" className="w-full max-w-md mx-auto">
            <defs>
              <marker id="wh-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill={DARK} />
              </marker>
              <clipPath id="wh-top-half">
                <rect x="0" y="0" width="700" height={youPos.y} />
              </clipPath>
              <clipPath id="wh-bottom-half">
                <rect x="0" y={youPos.y} width="700" height={520 - youPos.y} />
              </clipPath>
            </defs>

            <text x="350" y="38" textAnchor="middle" fontSize="17" fill="hsl(0 0% 30%)"
              fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="600" letterSpacing="0.06em">
              2 × 2 Wheelhouse
            </text>

            <circle cx={youPos.x} cy={youPos.y} r="190" fill={BLUE} opacity="0.04" clipPath="url(#wh-top-half)" />
            <circle cx={youPos.x} cy={youPos.y} r="190" fill={GREEN} opacity="0.04" clipPath="url(#wh-bottom-half)" />

            <line x1={youPos.x - 195} y1={youPos.y} x2={youPos.x - youR - 5} y2={youPos.y}
              stroke="hsl(0 0% 60%)" strokeWidth="1" strokeDasharray="4 3" opacity="0.4" />
            <line x1={youPos.x + youR + 5} y1={youPos.y} x2={youPos.x + 195} y2={youPos.y}
              stroke="hsl(0 0% 60%)" strokeWidth="1" strokeDasharray="4 3" opacity="0.4" />

            <path d={`M ${youPos.x - 190},${youPos.y} A 190,190 0 0,1 ${youPos.x + 190},${youPos.y}`}
              fill="none" stroke={BLUE} strokeWidth="1.5" strokeDasharray="6 4" opacity="0.2" />
            <path d={`M ${youPos.x + 190},${youPos.y} A 190,190 0 0,1 ${youPos.x - 190},${youPos.y}`}
              fill="none" stroke={GREEN} strokeWidth="1.5" strokeDasharray="6 4" opacity="0.2" />

            <line x1={youPos.x} y1={youPos.y - youR} x2={innerNodes[0].x} y2={innerNodes[0].y + innerR}
              stroke={DARK} strokeWidth="2" markerEnd="url(#wh-arrow)"
              opacity={0 < visibleCount ? 0.5 : 0.08}
              style={{ transition: "opacity 0.6s" }} />
            <line x1={youPos.x} y1={youPos.y + youR} x2={innerNodes[1].x} y2={innerNodes[1].y - innerR}
              stroke={DARK} strokeWidth="2" markerEnd="url(#wh-arrow)"
              opacity={1 < visibleCount ? 0.5 : 0.08}
              style={{ transition: "opacity 0.6s" }} />

            {elbowPaths.map((d, i) => (
              <path key={`elbow-${i}`} d={d} fill="none" stroke={DARK} strokeWidth="2"
                markerEnd="url(#wh-arrow)"
                opacity={i + 2 < visibleCount ? 0.5 : 0.08}
                style={{ transition: "opacity 0.6s" }} />
            ))}

            {/* YOU node */}
            <circle cx={youPos.x} cy={youPos.y} r={youR} fill="white" stroke={GOLD} strokeWidth="3.5" />
            <text x={youPos.x} y={visibleCount > 0 ? youPos.y - 7 : youPos.y + 1} textAnchor="middle" dominantBaseline="middle"
              className="font-bold" fontSize="20" fill="hsl(0 0% 8%)">YOU</text>
            {visibleCount > 0 && (
              <text x={youPos.x} y={youPos.y + 16} textAnchor="middle" dominantBaseline="middle"
                fontSize="14" fontWeight="700" fill={GOLD}
                key={`you-pct-${visibleCount}`}>
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
                  <circle cx={node.x} cy={node.y} r={innerR} fill="white" stroke={BLUE} strokeWidth="2.5" />
                  <image href={node.avatar} x={node.x - innerR + 2} y={node.y - innerR + 2}
                    width={(innerR - 2) * 2} height={(innerR - 2) * 2}
                    clipPath={`url(#${clipId}-i-${i})`} preserveAspectRatio="xMidYMid slice" />
                  <circle cx={node.x - innerR * 0.75} cy={node.y - innerR * 0.75} r="13" fill={DARK} />
                  <text x={node.x - innerR * 0.75} y={node.y - innerR * 0.75 + 1} textAnchor="middle"
                    dominantBaseline="middle" fontSize="11" fill="white" fontWeight="700">{node.label}</text>
                  <g transform={`translate(${node.x + innerR * 0.65}, ${node.y + innerR * 0.65})`}>
                    <rect x="-17" y="-10" width="34" height="20" rx="10" fill={BLUE} />
                    <text x="0" y="1" textAnchor="middle" dominantBaseline="middle"
                      fontSize="10" fill="white" fontWeight="700">50%</text>
                  </g>
                  {(() => {
                    const childIndices = i === 0 ? [0, 1] : [2, 3];
                    const childCount = childIndices.filter(ci => ci + 2 < visibleCount).length;
                    if (childCount === 0) return null;
                    const pct = childCount * 50;
                    const yOff = i === 0 ? node.y - innerR - 22 : node.y + innerR + 22;
                    return (
                      <g>
                        <rect x={node.x - 22} y={yOff - 10} width="44" height="20" rx="10" fill={GREEN} />
                        <text x={node.x} y={yOff + 1} textAnchor="middle" dominantBaseline="middle"
                          fontSize="10" fill="white" fontWeight="700">+{pct}%</text>
                      </g>
                    );
                  })()}
                  {justAppeared && (
                    <circle cx={node.x} cy={node.y} r={innerR} fill="none" stroke={BLUE} strokeWidth="2" opacity="0.5">
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
                  <circle cx={node.x} cy={node.y} r={outerR} fill="white" stroke={GREEN} strokeWidth="2.5" />
                  <image href={node.avatar} x={node.x - outerR + 2} y={node.y - outerR + 2}
                    width={(outerR - 2) * 2} height={(outerR - 2) * 2}
                    clipPath={`url(#${clipId}-o-${i})`} preserveAspectRatio="xMidYMid slice" />
                  <circle cx={node.x - outerR * 0.75} cy={node.y - outerR * 0.75} r="12" fill={DARK} />
                  <text x={node.x - outerR * 0.75} y={node.y - outerR * 0.75 + 1} textAnchor="middle"
                    dominantBaseline="middle" fontSize="10" fill="white" fontWeight="700">{node.label}</text>
                  <g transform={`translate(${node.x}, ${node.y + outerR + 18})`}>
                    <rect x="-17" y="-10" width="34" height="20" rx="10" fill={GREEN} />
                    <text x="0" y="1" textAnchor="middle" dominantBaseline="middle"
                      fontSize="10" fill="white" fontWeight="700">50%</text>
                  </g>
                  {justAppeared && (
                    <circle cx={node.x} cy={node.y} r={outerR} fill="none" stroke={GREEN} strokeWidth="2" opacity="0.5">
                      <animate attributeName="r" from={`${outerR}`} to={`${outerR + 16}`} dur="0.8s" fill="freeze" />
                      <animate attributeName="opacity" from="0.5" to="0" dur="0.8s" fill="freeze" />
                    </circle>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {animationDone && (
        <button
          onClick={startAnimation}
          className="flex items-center gap-2 mx-auto mt-4 px-5 py-2 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-300 hover:scale-105 border border-border bg-muted/30 text-muted-foreground hover:text-foreground"
        >
          <RotateCcw size={14} />
          Replay
        </button>
      )}
    </div>
  );
};
