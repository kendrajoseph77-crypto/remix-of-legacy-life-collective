import { useEffect, useState } from "react";

/**
 * MobiusHero — abstract animated background for the Welcome Back hero.
 * Three concentric levels of the matrix fill in sequence with a soft
 * cobalt glow filling each ring (not lines). Holds when complete, then resets.
 */
const ACCENT = "hsl(224 78% 58%)";
const ACCENT_LIGHT = "hsl(220 90% 75%)";

const CX = 600;
const CY = 300;

// Single core level
const LEVELS = [
  { rOuter: 90, rInner: 0 }, // Level 1 — YOU (core disc)
];

const STEP_MS = 1100;
const COMPLETE_HOLD_MS = 2400;
const RESET_FADE_MS = 1400;

const MobiusHero = () => {
  const step = LEVELS.length;
  const completed = false;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Soft atmospheric base wash */}
      <div
        className="absolute top-1/2 left-1/2 w-[44rem] h-[44rem] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, ${ACCENT} 0%, transparent 68%)`,
          opacity: 0.14,
          transform: "translate(-50%, -50%)",
        }}
      />

      <svg
        viewBox="0 0 1200 600"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Each level gets a radial glow gradient — bright at the ring, soft toward edges */}
          {LEVELS.map((lvl, i) => {
            const id = `level-${i}-glow`;
            // Center the glow inside the band thickness
            return (
              <radialGradient
                key={id}
                id={id}
                cx="50%"
                cy="50%"
                r="50%"
              >
                {i === 0 ? (
                  // Core disc: brightest at center
                  <>
                    <stop offset="0%" stopColor={ACCENT_LIGHT} stopOpacity="0.55" />
                    <stop offset="55%" stopColor={ACCENT} stopOpacity="0.28" />
                    <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
                  </>
                ) : (
                  // Annular bands: soft glow filling the band
                  <>
                    <stop offset="0%" stopColor={ACCENT} stopOpacity="0" />
                    <stop offset={`${(lvl.rInner / lvl.rOuter) * 100 - 6}%`} stopColor={ACCENT} stopOpacity="0" />
                    <stop offset={`${((lvl.rInner + (lvl.rOuter - lvl.rInner) / 2) / lvl.rOuter) * 100}%`} stopColor={ACCENT_LIGHT} stopOpacity="0.32" />
                    <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
                  </>
                )}
              </radialGradient>
            );
          })}
        </defs>

        {/* Faint base ring outlines — barely there, just structural hint */}
        {LEVELS.map((lvl, i) => (
          <circle
            key={`base-${i}`}
            cx={CX}
            cy={CY}
            r={lvl.rOuter}
            fill="none"
            stroke={ACCENT}
            strokeWidth="0.6"
            strokeOpacity="0.07"
            strokeDasharray="2 10"
          />
        ))}

        {/* Lit levels — each fills its ring with a soft glow */}
        {LEVELS.map((lvl, i) => {
          const isLit = i < step;
          return (
            <g
              key={`lit-${i}`}
              style={{
                opacity: isLit ? (completed ? 0.85 : 1) : 0,
                transition: "opacity 1.4s ease",
              }}
            >
              <circle
                cx={CX}
                cy={CY}
                r={lvl.rOuter}
                fill={`url(#level-${i}-glow)`}
              />
            </g>
          );
        })}
      </svg>

      {/* Subtle vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 42%, hsl(0 0% 0% / 0.38) 100%)",
        }}
      />
    </div>
  );
};

export default MobiusHero;
