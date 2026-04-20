import { useEffect, useState } from "react";

/**
 * MobiusHero — abstract animated background for the Welcome Back hero.
 * Visualizes the Cooperative Matrix filling: 1 core → 2 inner → 4 outer (×6),
 * then completes and resets in an endless cycle. No infinity symbols,
 * no random orbits — just the brand structure, breathing.
 */
const GOLD = "hsl(41 50% 65%)";
const GOLD_DEEP = "hsl(39 55% 40%)";
const GOLD_LIGHT = "hsl(41 60% 78%)";

const CX = 600;
const CY = 300;

// Matrix layout — same topology as WheelhouseAnimations (YOU + 2 inner + 4 outer)
const inner = [
  { x: CX, y: CY - 150 }, // top
  { x: CX, y: CY + 150 }, // bottom
];
const outer = [
  { x: CX - 260, y: CY - 220, parent: 0 }, // top-left
  { x: CX + 260, y: CY - 220, parent: 0 }, // top-right
  { x: CX - 260, y: CY + 220, parent: 1 }, // bottom-left
  { x: CX + 260, y: CY + 220, parent: 1 }, // bottom-right
];

// Connection paths (right-angle elbows like the brand wheelhouse)
const buildElbow = (
  x1: number, y1: number, x2: number, y2: number, midX?: number
) => {
  const mx = midX ?? (x1 + x2) / 2;
  return `M ${x1} ${y1} L ${mx} ${y1} L ${mx} ${y2} L ${x2} ${y2}`;
};

const innerPaths = [
  // YOU -> inner top
  `M ${CX} ${CY - 40} L ${CX} ${inner[0].y + 30}`,
  // YOU -> inner bottom
  `M ${CX} ${CY + 40} L ${CX} ${inner[1].y - 30}`,
];

const outerPaths = [
  buildElbow(inner[0].x - 25, inner[0].y, outer[0].x + 25, outer[0].y, CX - 130),
  buildElbow(inner[0].x + 25, inner[0].y, outer[1].x - 25, outer[1].y, CX + 130),
  buildElbow(inner[1].x - 25, inner[1].y, outer[2].x + 25, outer[2].y, CX - 130),
  buildElbow(inner[1].x + 25, inner[1].y, outer[3].x - 25, outer[3].y, CX + 130),
];

// Sequence: 0 = nothing, 1 = YOU, 2-3 = inner, 4-7 = outer, 8 = complete pulse, 9 = reset
const TOTAL_STEPS = 8;
const STEP_MS = 900;
const COMPLETE_HOLD_MS = 1800;
const RESET_FADE_MS = 1200;

const MobiusHero = () => {
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    let mounted = true;
    let timer: number;

    const tick = (current: number) => {
      if (!mounted) return;
      if (current < TOTAL_STEPS) {
        setStep(current);
        timer = window.setTimeout(() => tick(current + 1), STEP_MS);
      } else {
        // Completed all 7 nodes — hold, pulse, then reset
        setStep(TOTAL_STEPS);
        setCompleted(true);
        timer = window.setTimeout(() => {
          if (!mounted) return;
          setCompleted(false);
          setStep(0);
          timer = window.setTimeout(() => tick(1), RESET_FADE_MS);
        }, COMPLETE_HOLD_MS);
      }
    };

    timer = window.setTimeout(() => tick(1), 600);
    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, []);

  // step thresholds: YOU at 1, inner at 2-3, outer at 4-7
  const youOn = step >= 1;
  const innerOn = (i: number) => step >= 2 + i;
  const outerOn = (i: number) => step >= 4 + i;
  const innerLineOn = (i: number) => step >= 2 + i;
  const outerLineOn = (i: number) => step >= 4 + i;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 w-[44rem] h-[44rem] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, hsl(41 50% 65% / 0.18) 0%, transparent 68%)`,
          transform: "translate(-50%, -50%)",
        }}
      />

      <svg
        viewBox="0 0 1200 600"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={GOLD_LIGHT} stopOpacity="0.55" />
            <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
          </radialGradient>

          <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={GOLD_LIGHT} stopOpacity="0.45" />
            <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
          </radialGradient>

          <linearGradient id="line-flow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={GOLD_DEEP} stopOpacity="0.15" />
            <stop offset="50%" stopColor={GOLD_LIGHT} stopOpacity="0.55" />
            <stop offset="100%" stopColor={GOLD_DEEP} stopOpacity="0.15" />
          </linearGradient>
        </defs>

        <g
          transform="translate(0 0) scale(0.72)" transform-origin="600 300" style={{ transformOrigin: "600px 300px" }}
          style={{
            opacity: completed ? 0.7 : 0.85,
            transition: "opacity 1.2s ease",
          }}
        >
          {Array.from({ length: 9 }).map((_, i) => {
            const r = 70 + i * 38;
            const isVault = i % 3 === 2;
            return (
              <circle
                key={`ring-${i}`}
                cx={CX}
                cy={CY}
                r={r}
                fill="none"
                stroke={GOLD}
                strokeWidth={isVault ? 1 : 0.6}
                strokeOpacity={isVault ? 0.14 : 0.06}
                strokeDasharray={isVault ? "none" : "2 10"}
              />
            );
          })}

          {innerPaths.map((d, i) => (
            <path key={`s-i-${i}`} d={d} fill="none" stroke={GOLD} strokeWidth="1" strokeOpacity="0.12" />
          ))}
          {outerPaths.map((d, i) => (
            <path key={`s-o-${i}`} d={d} fill="none" stroke={GOLD} strokeWidth="1" strokeOpacity="0.12" />
          ))}

          {innerPaths.map((d, i) => (
            <path
              key={`a-i-${i}`}
              d={d}
              fill="none"
              stroke="url(#line-flow)"
              strokeWidth="1"
              strokeLinecap="round"
              style={{
                opacity: innerLineOn(i) ? 1 : 0,
                transition: "opacity 1.1s ease",
              }}
            />
          ))}
          {outerPaths.map((d, i) => (
            <path
              key={`a-o-${i}`}
              d={d}
              fill="none"
              stroke="url(#line-flow)"
              strokeWidth="0.9"
              strokeLinecap="round"
              style={{
                opacity: outerLineOn(i) ? 1 : 0,
                transition: "opacity 1.1s ease",
              }}
            />
          ))}

          {outer.map((node, i) => {
            const on = outerOn(i);
            return (
              <g
                key={`o-${i}`}
                style={{
                  opacity: on ? 0.75 : 0,
                  transition: "opacity 0.9s ease",
                }}
              >
                <circle cx={node.x} cy={node.y} r="9" fill="url(#node-glow)" />
                <circle cx={node.x} cy={node.y} r="1.8" fill={GOLD_LIGHT} fillOpacity="0.9" />
              </g>
            );
          })}

          {inner.map((node, i) => {
            const on = innerOn(i);
            return (
              <g
                key={`i-${i}`}
                style={{
                  opacity: on ? 0.82 : 0,
                  transition: "opacity 0.9s ease",
                }}
              >
                <circle cx={node.x} cy={node.y} r="11" fill="url(#node-glow)" />
                <circle cx={node.x} cy={node.y} r="2.2" fill={GOLD_LIGHT} fillOpacity="0.95" />
              </g>
            );
          })}

          <g
            style={{
              opacity: youOn ? 0.9 : 0.2,
              transition: "opacity 1s ease",
            }}
          >
            <circle cx={CX} cy={CY} r="18" fill="url(#core-glow)" />
            <circle cx={CX} cy={CY} r="3" fill={GOLD_LIGHT}>
              <animate attributeName="opacity" values="0.45;0.8;0.45" dur="4s" repeatCount="indefinite" />
            </circle>
          </g>
        </g>
      </svg>

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, hsl(0 0% 0% / 0.35) 100%)",
        }}
      />
    </div>
  );
};

export default MobiusHero;
