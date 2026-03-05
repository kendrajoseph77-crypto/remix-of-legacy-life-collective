import { useState, useEffect, useRef } from "react";
import { Infinity } from "lucide-react";

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
  <div className="flex flex-col items-center gap-5 py-12 text-center px-6">
    <Infinity size={32} strokeWidth={1.5} style={{ color: GOLD }} className="opacity-40" />

    <h3 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight"
      style={{ fontFamily: "'Cormorant Garamond', serif" }}>
      And It Never Stops.
    </h3>

    <div className="w-12 h-[2px] rounded-full" style={{ background: GOLD }} />

    <p className="text-foreground text-base md:text-lg font-semibold max-w-md">
      You Never Lose Your Team!
    </p>

    <p className="text-muted-foreground text-sm md:text-base max-w-lg leading-relaxed">
      Each and every time your Income Center fills with 6 Active Contributors, another automatically re-opens for you to receive another 6 contributions — without additional effort or qualifications!
    </p>

    <p className="text-muted-foreground text-sm md:text-base max-w-lg leading-relaxed">
      The Mobius Loop ensures you always follow your inviter and your team always follows you!
    </p>

    <div className="flex items-center gap-3 px-8 py-3 rounded-full mt-2"
      style={{ border: `1.5px solid ${GOLD}` }}>
      <Infinity size={18} style={{ color: GOLD }} />
      <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: GOLD }}>
        Infinite Earning Potential
      </span>
    </div>
  </div>
);
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
          {/* Clip paths for top/bottom halves */}
          <clipPath id="wh-top-half">
            <rect x="0" y="0" width="700" height={youPos.y} />
          </clipPath>
          <clipPath id="wh-bottom-half">
            <rect x="0" y={youPos.y} width="700" height={520 - youPos.y} />
          </clipPath>
        </defs>

        {/* Title */}
        <text x="350" y="38" textAnchor="middle" fontSize="17" fill="hsl(0 0% 30%)"
          fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="600" letterSpacing="0.06em">
          2 × 2 Wheelhouse
        </text>

        {/* Shaded top half (Blue tint) */}
        <circle cx={youPos.x} cy={youPos.y} r="190" fill={BLUE} opacity="0.04" clipPath="url(#wh-top-half)" />
        {/* Shaded bottom half (Green tint) */}
        <circle cx={youPos.x} cy={youPos.y} r="190" fill={GREEN} opacity="0.04" clipPath="url(#wh-bottom-half)" />

        {/* Horizontal divider line through YOU */}
        <line x1={youPos.x - 195} y1={youPos.y} x2={youPos.x - youR - 5} y2={youPos.y}
          stroke="hsl(0 0% 60%)" strokeWidth="1" strokeDasharray="4 3" opacity="0.4" />
        <line x1={youPos.x + youR + 5} y1={youPos.y} x2={youPos.x + 195} y2={youPos.y}
          stroke="hsl(0 0% 60%)" strokeWidth="1" strokeDasharray="4 3" opacity="0.4" />

        {/* Outer ring (dashed) — top half blue, bottom half green */}
        <path d={`M ${youPos.x - 190},${youPos.y} A 190,190 0 0,1 ${youPos.x + 190},${youPos.y}`}
          fill="none" stroke={BLUE} strokeWidth="1.5" strokeDasharray="6 4" opacity="0.2" />
        <path d={`M ${youPos.x + 190},${youPos.y} A 190,190 0 0,1 ${youPos.x - 190},${youPos.y}`}
          fill="none" stroke={GREEN} strokeWidth="1.5" strokeDasharray="6 4" opacity="0.2" />


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

        {/* ── YOU node (GOLD) ── */}
        <circle cx={youPos.x} cy={youPos.y} r={youR} fill="white" stroke={GOLD} strokeWidth="3.5" />
        <text x={youPos.x} y={youPos.y + 1} textAnchor="middle" dominantBaseline="middle"
          className="font-bold" fontSize="20" fill="hsl(0 0% 8%)">YOU</text>

        {/* ── Inner nodes (01, 02) — BLUE ── */}
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
              {justAppeared && (
                <circle cx={node.x} cy={node.y} r={innerR} fill="none" stroke={BLUE} strokeWidth="2" opacity="0.5">
                  <animate attributeName="r" from={`${innerR}`} to={`${innerR + 18}`} dur="0.8s" fill="freeze" />
                  <animate attributeName="opacity" from="0.5" to="0" dur="0.8s" fill="freeze" />
                </circle>
              )}
            </g>
          );
        })}

        {/* ── Outer nodes (03–06) — GREEN ── */}
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
  );
};
