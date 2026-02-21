const OrbitalRings = () => {
  // Motion path helper: ellipse centered at 600,400 with given rx,ry
  const ellipsePath = (rx: number, ry: number) =>
    `M ${600 + rx} 400 A ${rx} ${ry} 0 1 0 ${600 - rx} 400 A ${rx} ${ry} 0 1 0 ${600 + rx} 400`;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, hsl(200 45% 18%) 0%, hsl(220 50% 12%) 50%, hsl(240 45% 10%) 100%)",
        }}
      />

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Planet glow — strong bloom */}
          <filter id="planetGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="7" result="blur1" />
            <feGaussianBlur stdDeviation="3" result="blur2" in="SourceGraphic" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="blur2" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Ring glow */}
          <filter id="ringGlow" x="-5%" y="-5%" width="110%" height="110%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Centre star glow */}
          <filter id="starGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── Centre star ── */}
        <circle cx="600" cy="340" r="5" fill="hsl(229 90% 85%)" filter="url(#starGlow)" opacity="0.6" />

        {/* ══ ORBIT 1 — large, tilted -18° ══ */}
        <ellipse
          cx="600" cy="400" rx="500" ry="180"
          fill="none"
          stroke="hsl(229 77% 55% / 0.18)"
          strokeWidth="1"
          filter="url(#ringGlow)"
          transform="rotate(-18, 600, 400)"
        />
        <g transform="rotate(-18, 600, 400)">
          <circle r="6" fill="hsl(229 77% 72%)" filter="url(#planetGlow)">
            <animateMotion dur="52s" repeatCount="indefinite" rotate="0"
              path={ellipsePath(500, 180)} />
          </circle>
        </g>
        <g transform="rotate(-18, 600, 400)">
          <circle r="3.5" fill="hsl(229 70% 60%)" filter="url(#planetGlow)" opacity="0.7">
            <animateMotion dur="52s" begin="-26s" repeatCount="indefinite" rotate="0"
              path={ellipsePath(500, 180)} />
          </circle>
        </g>

        {/* ══ ORBIT 2 — medium, tilted +14° ══ */}
        <ellipse
          cx="600" cy="400" rx="340" ry="125"
          fill="none"
          stroke="hsl(229 77% 55% / 0.14)"
          strokeWidth="1"
          filter="url(#ringGlow)"
          transform="rotate(14, 600, 400)"
        />
        <g transform="rotate(14, 600, 400)">
          <circle r="5" fill="hsl(229 90% 75%)" filter="url(#planetGlow)">
            <animateMotion dur="34s" repeatCount="indefinite" rotate="0"
              path={ellipsePath(340, 125)} />
          </circle>
        </g>

        {/* ══ ORBIT 3 — wide & flat, barely tilted ══ */}
        <ellipse
          cx="600" cy="400" rx="570" ry="90"
          fill="none"
          stroke="hsl(254 40% 50% / 0.12)"
          strokeWidth="0.8"
          transform="rotate(4, 600, 400)"
        />
        <g transform="rotate(4, 600, 400)">
          <circle r="4" fill="hsl(254 50% 65%)" filter="url(#planetGlow)" opacity="0.65">
            <animateMotion dur="80s" repeatCount="indefinite" rotate="0"
              path={ellipsePath(570, 90)} />
          </circle>
        </g>
      </svg>

      {/* Centre aqua bloom */}
      <div
        className="absolute"
        style={{
          top: "10%", left: "50%",
          transform: "translate(-50%, 0)",
          width: "600px", height: "420px",
          background: "radial-gradient(ellipse at center, hsl(229 77% 55% / 0.09) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

export default OrbitalRings;
