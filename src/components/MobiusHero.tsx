import { useEffect, useState } from "react";

/**
 * MobiusHero — abstract animated background for the Welcome Back hero.
 * Pure ring sequence: 9 concentric vault rings light up one at a time
 * with a soft cobalt glow, then hold and reset. No arms, no nodes.
 */
const ACCENT = "hsl(224 78% 58%)";
const ACCENT_DEEP = "hsl(224 78% 38%)";
const ACCENT_LIGHT = "hsl(220 90% 75%)";

const CX = 600;
const CY = 300;

const RING_COUNT = 9;
const STEP_MS = 700;
const COMPLETE_HOLD_MS = 2200;
const RESET_FADE_MS = 1400;

const MobiusHero = () => {
  const [step, setStep] = useState(0); // 0..RING_COUNT (rings lit so far)
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    let mounted = true;
    let timer: number;

    const tick = (current: number) => {
      if (!mounted) return;
      if (current <= RING_COUNT) {
        setStep(current);
        timer = window.setTimeout(() => tick(current + 1), STEP_MS);
      } else {
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

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Soft atmospheric wash — minimal */}
      <div
        className="absolute top-1/2 left-1/2 w-[44rem] h-[44rem] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, ${ACCENT} 0%, transparent 68%)`,
          opacity: 0.18,
          transform: "translate(-50%, -50%)",
        }}
      />

      <svg
        viewBox="0 0 1200 600"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Per-ring soft outer glow */}
          <filter id="ring-soft-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Faint base rings — always present, structural skeleton */}
        {Array.from({ length: RING_COUNT }).map((_, i) => {
          const r = 60 + i * 30;
          return (
            <circle
              key={`base-${i}`}
              cx={CX}
              cy={CY}
              r={r}
              fill="none"
              stroke={ACCENT}
              strokeWidth="0.6"
              strokeOpacity="0.08"
              strokeDasharray="2 8"
            />
          );
        })}

        {/* Lit rings — fill in sequence */}
        {Array.from({ length: RING_COUNT }).map((_, i) => {
          const r = 60 + i * 30;
          const isLit = i < step;
          return (
            <g
              key={`lit-${i}`}
              style={{
                opacity: isLit ? (completed ? 0.9 : 1) : 0,
                transition: "opacity 0.9s ease",
              }}
            >
              {/* outer wide soft halo */}
              <circle
                cx={CX}
                cy={CY}
                r={r}
                fill="none"
                stroke={ACCENT_LIGHT}
                strokeWidth="3"
                strokeOpacity="0.18"
                filter="url(#ring-soft-glow)"
              />
              {/* mid glow */}
              <circle
                cx={CX}
                cy={CY}
                r={r}
                fill="none"
                stroke={ACCENT_LIGHT}
                strokeWidth="1.2"
                strokeOpacity="0.55"
              />
              {/* crisp core line */}
              <circle
                cx={CX}
                cy={CY}
                r={r}
                fill="none"
                stroke={ACCENT_LIGHT}
                strokeWidth="0.6"
                strokeOpacity="0.95"
              />
            </g>
          );
        })}

        {/* Completion breath — when all 9 are lit, the whole stack pulses softly outward */}
        {completed && (
          <g>
            <circle
              cx={CX}
              cy={CY}
              r={60 + (RING_COUNT - 1) * 30}
              fill="none"
              stroke={ACCENT_LIGHT}
              strokeWidth="1.5"
              opacity="0.5"
            >
              <animate
                attributeName="r"
                from={60 + (RING_COUNT - 1) * 30}
                to={60 + (RING_COUNT - 1) * 30 + 80}
                dur="1.8s"
                fill="freeze"
              />
              <animate attributeName="opacity" from="0.55" to="0" dur="1.8s" fill="freeze" />
            </circle>
          </g>
        )}
      </svg>

      {/* Subtle vignette for hero text legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 38%, hsl(0 0% 0% / 0.4) 100%)",
        }}
      />
    </div>
  );
};

export default MobiusHero;
