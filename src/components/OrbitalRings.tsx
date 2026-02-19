import { useEffect, useRef } from "react";

const OrbitalRings = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Radial gradient base glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, hsl(210 60% 14%) 0%, hsl(210 45% 8%) 60%, hsl(210 45% 6%) 100%)",
        }}
      />

      {/* SVG orbital rings */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Ring 1 gradient */}
          <linearGradient id="ring1grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(181 90% 52%)" stopOpacity="0" />
            <stop offset="30%" stopColor="hsl(181 90% 52%)" stopOpacity="0.5" />
            <stop offset="70%" stopColor="hsl(2 88% 62%)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(2 88% 62%)" stopOpacity="0" />
          </linearGradient>

          {/* Ring 2 gradient */}
          <linearGradient id="ring2grad" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(68 100% 50%)" stopOpacity="0" />
            <stop offset="40%" stopColor="hsl(68 100% 50%)" stopOpacity="0.35" />
            <stop offset="60%" stopColor="hsl(181 90% 52%)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="hsl(181 90% 52%)" stopOpacity="0" />
          </linearGradient>

          {/* Ring 3 gradient */}
          <linearGradient id="ring3grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(2 88% 62%)" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(2 88% 62%)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="hsl(43 74% 55%)" stopOpacity="0" />
          </linearGradient>

          {/* Dot glow filter */}
          <filter id="dotGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Ring glow filter */}
          <filter id="ringGlow" x="-5%" y="-5%" width="110%" height="110%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* === RING 1 — Large outer, tilted === */}
        <g style={{ animation: "spin1 28s linear infinite", transformOrigin: "600px 400px" }}>
          <ellipse
            cx="600" cy="400"
            rx="520" ry="200"
            fill="none"
            stroke="url(#ring1grad)"
            strokeWidth="1"
            strokeDasharray="600 800"
            filter="url(#ringGlow)"
            transform="rotate(-20, 600, 400)"
          />
          {/* Dot on ring 1 */}
          <circle cx="600" cy="202" r="3.5" fill="hsl(181 90% 65%)" filter="url(#dotGlow)" />
          <circle cx="1118" cy="405" r="2.5" fill="hsl(181 90% 65%)" filter="url(#dotGlow)" />
        </g>

        {/* === RING 2 — Mid, counter-rotate === */}
        <g style={{ animation: "spin2 22s linear infinite", transformOrigin: "600px 400px" }}>
          <ellipse
            cx="600" cy="400"
            rx="380" ry="150"
            fill="none"
            stroke="url(#ring2grad)"
            strokeWidth="1.2"
            strokeDasharray="450 660"
            filter="url(#ringGlow)"
            transform="rotate(15, 600, 400)"
          />
          {/* Dots */}
          <circle cx="452" cy="266" r="4" fill="hsl(68 100% 65%)" filter="url(#dotGlow)" />
          <circle cx="975" cy="398" r="2.5" fill="hsl(2 88% 70%)" filter="url(#dotGlow)" />
        </g>

        {/* === RING 3 — Smaller inner === */}
        <g style={{ animation: "spin3 35s linear infinite", transformOrigin: "600px 400px" }}>
          <ellipse
            cx="600" cy="400"
            rx="260" ry="100"
            fill="none"
            stroke="url(#ring3grad)"
            strokeWidth="0.8"
            strokeDasharray="320 480"
            filter="url(#ringGlow)"
            transform="rotate(-35, 600, 400)"
          />
          <circle cx="370" cy="438" r="3" fill="hsl(43 74% 65%)" filter="url(#dotGlow)" />
        </g>

        {/* === RING 4 — Wide flat outer arc === */}
        <g style={{ animation: "spin4 45s linear infinite", transformOrigin: "600px 400px" }}>
          <ellipse
            cx="600" cy="400"
            rx="600" ry="120"
            fill="none"
            stroke="hsl(181 90% 52% / 0.12)"
            strokeWidth="0.7"
            strokeDasharray="800 1200"
            transform="rotate(5, 600, 400)"
          />
          <circle cx="200" cy="394" r="2" fill="hsl(181 90% 70%)" filter="url(#dotGlow)" />
          <circle cx="998" cy="410" r="2" fill="hsl(181 90% 70%)" filter="url(#dotGlow)" />
        </g>

        {/* === RING 5 — Steep arc left === */}
        <g style={{ animation: "spin5 32s linear infinite reverse", transformOrigin: "600px 400px" }}>
          <ellipse
            cx="600" cy="400"
            rx="450" ry="260"
            fill="none"
            stroke="hsl(2 88% 62% / 0.1)"
            strokeWidth="0.8"
            strokeDasharray="500 1000"
            transform="rotate(-60, 600, 400)"
          />
          <circle cx="196" cy="260" r="2.5" fill="hsl(2 88% 70%)" filter="url(#dotGlow)" />
        </g>
      </svg>

      {/* CSS keyframes via style tag */}
      <style>{`
        @keyframes spin1 { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spin2 { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes spin3 { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spin4 { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes spin5 { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>

      {/* Subtle centre bloom */}
      <div
        className="absolute"
        style={{
          top: "20%", left: "50%",
          transform: "translate(-50%, 0)",
          width: "600px", height: "400px",
          background: "radial-gradient(ellipse at center, hsl(181 90% 52% / 0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

export default OrbitalRings;
