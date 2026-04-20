import { motion } from "framer-motion";

/**
 * MobiusHero — abstract animated background for the Welcome Back hero.
 * Brand-specific: an infinity / Möbius ribbon with flowing gold particles,
 * concentric vault rings, and 50/50 split arcs. No generic radial bursts.
 */
const GOLD = "hsl(41 50% 65%)";
const GOLD_DEEP = "hsl(39 55% 40%)";
const GOLD_LIGHT = "hsl(41 60% 78%)";

// Parametric infinity (lemniscate of Gerono) -> SVG path
const buildInfinityPath = (cx: number, cy: number, scale: number, steps = 240) => {
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const x = cx + scale * Math.sin(t);
    const y = cy + (scale / 2) * Math.sin(2 * t);
    d += i === 0 ? `M ${x.toFixed(2)} ${y.toFixed(2)}` : ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
  }
  return d + " Z";
};

const MobiusHero = () => {
  const cx = 600;
  const cy = 300;
  const ribbonOuter = buildInfinityPath(cx, cy, 380);
  const ribbonInner = buildInfinityPath(cx, cy, 320);
  const ribbonCenter = buildInfinityPath(cx, cy, 350);

  // 6 particles staggered along the ribbon
  const particles = Array.from({ length: 6 }).map((_, i) => ({
    delay: i * 1.7,
    size: 4 + (i % 3),
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Soft gold atmospheric wash — minimal, not the focal point */}
      <div
        className="absolute top-1/2 left-1/2 w-[60rem] h-[60rem] rounded-full blur-3xl opacity-25"
        style={{
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, ${GOLD} 0%, transparent 65%)`,
        }}
      />

      <svg
        viewBox="0 0 1200 600"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="mobius-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={GOLD_DEEP} stopOpacity="0" />
            <stop offset="20%" stopColor={GOLD_DEEP} stopOpacity="0.5" />
            <stop offset="50%" stopColor={GOLD_LIGHT} stopOpacity="0.9" />
            <stop offset="80%" stopColor={GOLD_DEEP} stopOpacity="0.5" />
            <stop offset="100%" stopColor={GOLD_DEEP} stopOpacity="0" />
          </linearGradient>

          <radialGradient id="vault-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={GOLD} stopOpacity="0.18" />
            <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
          </radialGradient>

          <filter id="mobius-blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="0.6" />
          </filter>

          {/* Particle glow */}
          <filter id="particle-glow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 9 concentric vault rings — represents the 9 vaults */}
        <g style={{ transformOrigin: `${cx}px ${cy}px` }}>
          {Array.from({ length: 9 }).map((_, i) => {
            const r = 80 + i * 32;
            const opacity = 0.04 + (i % 3 === 2 ? 0.05 : 0.015);
            return (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke={GOLD}
                strokeWidth={i % 3 === 2 ? 1 : 0.5}
                strokeOpacity={opacity}
                strokeDasharray={i % 3 === 2 ? "none" : "2 6"}
              />
            );
          })}
        </g>

        {/* Möbius ribbon — three offset paths drawing in sequence for ribbon depth */}
        <motion.path
          d={ribbonOuter}
          fill="none"
          stroke="url(#mobius-grad)"
          strokeWidth="1.2"
          strokeOpacity="0.6"
          filter="url(#mobius-blur)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
        />
        <motion.path
          d={ribbonCenter}
          fill="none"
          stroke={GOLD_LIGHT}
          strokeWidth="1.5"
          strokeOpacity="0.85"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", repeatType: "reverse", delay: 0.3 }}
        />
        <motion.path
          d={ribbonInner}
          fill="none"
          stroke="url(#mobius-grad)"
          strokeWidth="1.2"
          strokeOpacity="0.6"
          filter="url(#mobius-blur)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", repeatType: "reverse", delay: 0.6 }}
        />

        {/* Persistent faint ribbon to keep the form readable */}
        <path
          d={ribbonCenter}
          fill="none"
          stroke={GOLD}
          strokeWidth="0.6"
          strokeOpacity="0.18"
        />

        {/* 50 / 50 split — the lemniscate crosses at center; mark it */}
        <circle cx={cx} cy={cy} r="80" fill="url(#vault-glow)" />
        <motion.circle
          cx={cx}
          cy={cy}
          r="6"
          fill={GOLD_LIGHT}
          filter="url(#particle-glow)"
          animate={{ opacity: [0.4, 1, 0.4], r: [5, 8, 5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Flowing particles along the Möbius path — the "cycle in motion" */}
        {particles.map((p, i) => (
          <circle
            key={i}
            r={p.size}
            fill={GOLD_LIGHT}
            filter="url(#particle-glow)"
          >
            <animateMotion
              dur="11s"
              repeatCount="indefinite"
              begin={`${p.delay}s`}
              path={ribbonCenter}
              rotate="auto"
            />
            <animate
              attributeName="opacity"
              values="0;1;1;1;0"
              keyTimes="0;0.1;0.5;0.9;1"
              dur="11s"
              repeatCount="indefinite"
              begin={`${p.delay}s`}
            />
          </circle>
        ))}

        {/* Counter-flowing finer particles */}
        {Array.from({ length: 4 }).map((_, i) => (
          <circle
            key={`c-${i}`}
            r="2"
            fill={GOLD}
            opacity="0.7"
          >
            <animateMotion
              dur="16s"
              repeatCount="indefinite"
              begin={`${i * 4}s`}
              path={ribbonOuter}
              rotate="auto"
              keyPoints="1;0"
              keyTimes="0;1"
            />
          </circle>
        ))}
      </svg>

      {/* Subtle vignette for text legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, hsl(0 0% 0% / 0.45) 100%)",
        }}
      />
    </div>
  );
};

export default MobiusHero;
