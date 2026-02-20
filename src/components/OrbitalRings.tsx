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
          <linearGradient id="ring1grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(181 90% 52%)" stopOpacity="0" />
            <stop offset="40%" stopColor="hsl(181 90% 52%)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(181 90% 52%)" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="ring2grad" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(2 88% 62%)" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(2 88% 62%)" stopOpacity="0.45" />
            <stop offset="100%" stopColor="hsl(2 88% 62%)" stopOpacity="0" />
          </linearGradient>

          <filter id="dotGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="ringGlow" x="-5%" y="-5%" width="110%" height="110%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ring 1 — large, slow */}
        <g style={{ animation: "spin1 50s linear infinite", transformOrigin: "600px 400px" }}>
          <ellipse
            cx="600" cy="400"
            rx="520" ry="190"
            fill="none"
            stroke="url(#ring1grad)"
            strokeWidth="1"
            strokeDasharray="700 900"
            filter="url(#ringGlow)"
            transform="rotate(-18, 600, 400)"
          />
          <circle cx="600" cy="212" r="3" fill="hsl(181 90% 70%)" filter="url(#dotGlow)" />
        </g>

        {/* Ring 2 — medium, counter */}
        <g style={{ animation: "spin2 38s linear infinite reverse", transformOrigin: "600px 400px" }}>
          <ellipse
            cx="600" cy="400"
            rx="370" ry="140"
            fill="none"
            stroke="url(#ring2grad)"
            strokeWidth="1"
            strokeDasharray="500 700"
            filter="url(#ringGlow)"
            transform="rotate(12, 600, 400)"
          />
          <circle cx="230" cy="397" r="2.5" fill="hsl(2 88% 70%)" filter="url(#dotGlow)" />
        </g>

        {/* Ring 3 — wide flat, very slow */}
        <g style={{ animation: "spin3 65s linear infinite", transformOrigin: "600px 400px" }}>
          <ellipse
            cx="600" cy="400"
            rx="580" ry="100"
            fill="none"
            stroke="hsl(181 90% 52% / 0.18)"
            strokeWidth="0.7"
            strokeDasharray="600 1100"
            transform="rotate(3, 600, 400)"
          />
          <circle cx="1176" cy="403" r="2" fill="hsl(181 90% 70%)" filter="url(#dotGlow)" />
        </g>
      </svg>

      {/* Centre bloom */}
      <div
        className="absolute"
        style={{
          top: "15%", left: "50%",
          transform: "translate(-50%, 0)",
          width: "700px", height: "500px",
          background: "radial-gradient(ellipse at center, hsl(181 90% 52% / 0.10) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <style>{`
        @keyframes spin1 { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spin2 { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes spin3 { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default OrbitalRings;
