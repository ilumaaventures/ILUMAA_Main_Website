import React from "react";

export default function TechMatrixArch() {
  return (
    <div className="relative w-full overflow-hidden leading-none pointer-events-none select-none">
      <style>{`
        @keyframes laserSweepMove {
          0% {
            transform: translateX(-240px);
          }
          100% {
            transform: translateX(1680px);
          }
        }
        @keyframes nodePingRing {
          0% {
            r: 4;
            opacity: 0.95;
            stroke-width: 1.5;
          }
          60% {
            opacity: 0.35;
          }
          100% {
            r: 15;
            opacity: 0;
            stroke-width: 0.5;
          }
        }
        @keyframes statusLedBlink {
          0%, 100% {
            opacity: 1;
            filter: drop-shadow(0 0 4px #06b6d4);
          }
          50% {
            opacity: 0.25;
            filter: none;
          }
        }

        .sweep-group {
          animation: laserSweepMove 8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .ping-ring-1 {
          animation: nodePingRing 2.4s ease-out infinite;
          transform-origin: center;
        }
        .ping-ring-2 {
          animation: nodePingRing 2.4s ease-out infinite;
          animation-delay: 0.8s;
          transform-origin: center;
        }
        .ping-ring-3 {
          animation: nodePingRing 2.4s ease-out infinite;
          animation-delay: 1.6s;
          transform-origin: center;
        }
        .status-led {
          animation: statusLedBlink 1.8s ease-in-out infinite;
        }
      `}</style>

      <svg
        viewBox="0 0 1440 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-48 sm:h-60 md:h-72 lg:h-[340px] xl:h-[380px] block"
        preserveAspectRatio="none"
      >
        <defs>
          {/* 1. Exact Clip Path: Deep, tall upward white arch with 200px center depth */}
          <clipPath id="archContourClip">
            <path d="M 0,240 L 1440,240 L 1440,150 Q 720,-70 0,150 Z" />
          </clipPath>

          {/* 2. Micro-Dot Matrix Pattern (Neutral Subtle Blueprint Slate) */}
          <pattern
            id="matrixDotPattern"
            x="0"
            y="0"
            width="22"
            height="22"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="11" cy="11" r="1.15" fill="#94a3b8" opacity="0.32" />
          </pattern>

          {/* 3. Sweeping Radar Beam Gradient */}
          <linearGradient id="sweepBeamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
            <stop offset="45%" stopColor="#06b6d4" stopOpacity="0.12" />
            <stop offset="70%" stopColor="#0284c7" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>

          {/* 4. Active Cyan Dot Pattern for the Laser Sweep Highlight */}
          <pattern
            id="matrixDotActive"
            x="0"
            y="0"
            width="22"
            height="22"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="11" cy="11" r="1.7" fill="#06b6d4" opacity="0.85" />
          </pattern>

          {/* 5. Mask for Active Dots tied to the sweep */}
          <mask id="sweepDotMask">
            <rect
              className="sweep-group"
              x="0"
              y="0"
              width="200"
              height="240"
              fill="url(#sweepBeamGrad)"
            />
          </mask>

          {/* 6. Soft glow filter */}
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Base Pure White Solid Arch */}
        <path d="M 0,240 L 1440,240 L 1440,150 Q 720,-70 0,150 Z" fill="#ffffff" />

        {/* Group STRICTLY CLIPPED to the exact curve: Cannot bleed or spill outside */}
        <g clipPath="url(#archContourClip)">
          {/* A. Background Micro-Dot Grid across the full expanded height */}
          <rect
            x="0"
            y="0"
            width="1440"
            height="240"
            fill="url(#matrixDotPattern)"
          />

          {/* B. Curved Telemetry Guidance Lines (Dotted contours following the arch) */}
          <path
            d="M 0,165 Q 720,60 1440,165"
            stroke="#0284c7"
            strokeWidth="1"
            strokeOpacity="0.16"
            strokeDasharray="3 6"
          />
          <path
            d="M 0,200 Q 720,105 1440,200"
            stroke="#3b82f6"
            strokeWidth="0.9"
            strokeOpacity="0.12"
            strokeDasharray="4 8"
          />

          {/* C. Sweeping Radar / Laser Beam */}
          <g className="sweep-group">
            {/* Luminous Soft Beam Band */}
            <rect
              x="-100"
              y="0"
              width="200"
              height="240"
              fill="url(#sweepBeamGrad)"
            />
            {/* Laser Focal Line */}
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="240"
              stroke="#06b6d4"
              strokeWidth="1.2"
              strokeOpacity="0.35"
              filter="url(#softGlow)"
            />
          </g>

          {/* D. Illuminated Cyan Dots inside the beam */}
          <rect
            x="0"
            y="0"
            width="1440"
            height="240"
            fill="url(#matrixDotActive)"
            mask="url(#sweepDotMask)"
          />

          {/* E. Ambient Telemetry Nodes & Status Badges */}

          {/* NODE 1 (Left): LATENCY < 10ms */}
          <g transform="translate(280, 180)">
            {/* Concentric Ping Ring */}
            <circle cx="0" cy="0" r="4" fill="none" stroke="#06b6d4" className="ping-ring-1" />
            {/* Solid Center Node */}
            <circle cx="0" cy="0" r="3.2" fill="#0284c7" />
            <circle cx="0" cy="0" r="1.4" fill="#ffffff" />
            {/* Micro Badge Card */}
            <rect
              x="-50"
              y="-26"
              width="100"
              height="18"
              rx="9"
              fill="#ffffff"
              stroke="#0284c7"
              strokeWidth="0.9"
              strokeOpacity="0.3"
              filter="drop-shadow(0 1px 3px rgba(2, 132, 199, 0.12))"
            />
            {/* Status LED */}
            <circle cx="-40" cy="-17" r="1.8" fill="#06b6d4" className="status-led" />
            {/* Text */}
            <text
              x="-33"
              y="-13.5"
              fill="#0369a1"
              fontSize="7.2"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
              fontWeight="700"
              letterSpacing="0.04em"
            >
              LATENCY &lt; 10ms
            </text>
          </g>

          {/* NODE 2 (Center Crest): 99.99% NOMINAL */}
          <g transform="translate(720, 150)">
            {/* Concentric Ping Ring */}
            <circle cx="0" cy="0" r="4" fill="none" stroke="#06b6d4" className="ping-ring-2" />
            {/* Solid Center Node */}
            <circle cx="0" cy="0" r="3.4" fill="#0284c7" />
            <circle cx="0" cy="0" r="1.5" fill="#ffffff" />
            {/* Micro Badge Card */}
            <rect
              x="-56"
              y="-27"
              width="112"
              height="19"
              rx="9.5"
              fill="#ffffff"
              stroke="#0284c7"
              strokeWidth="1"
              strokeOpacity="0.35"
              filter="drop-shadow(0 2px 4px rgba(2, 132, 199, 0.15))"
            />
            {/* Status LED */}
            <circle cx="-45" cy="-17.5" r="2" fill="#06b6d4" className="status-led" />
            {/* Text */}
            <text
              x="-37"
              y="-14"
              fill="#0369a1"
              fontSize="7.5"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
              fontWeight="700"
              letterSpacing="0.05em"
            >
              99.99% NOMINAL
            </text>
          </g>

          {/* NODE 3 (Right): CLOUD MESH: ACTIVE */}
          <g transform="translate(1160, 180)">
            {/* Concentric Ping Ring */}
            <circle cx="0" cy="0" r="4" fill="none" stroke="#06b6d4" className="ping-ring-3" />
            {/* Solid Center Node */}
            <circle cx="0" cy="0" r="3.2" fill="#0284c7" />
            <circle cx="0" cy="0" r="1.4" fill="#ffffff" />
            {/* Micro Badge Card */}
            <rect
              x="-58"
              y="-26"
              width="116"
              height="18"
              rx="9"
              fill="#ffffff"
              stroke="#0284c7"
              strokeWidth="0.9"
              strokeOpacity="0.3"
              filter="drop-shadow(0 1px 3px rgba(2, 132, 199, 0.12))"
            />
            {/* Status LED */}
            <circle cx="-47" cy="-17" r="1.8" fill="#06b6d4" className="status-led" />
            {/* Text */}
            <text
              x="-39"
              y="-13.5"
              fill="#0369a1"
              fontSize="7.2"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
              fontWeight="700"
              letterSpacing="0.04em"
            >
              CLOUD MESH: ACTIVE
            </text>
          </g>

          {/* F. Geometric Crosshairs */}
          {[
            [160, 192],
            [520, 150],
            [920, 150],
            [1280, 192],
          ].map(([cx, cy], idx) => (
            <g key={idx} transform={`translate(${cx}, ${cy})`} opacity="0.28">
              <line x1="-3.5" y1="0" x2="3.5" y2="0" stroke="#0284c7" strokeWidth="0.9" />
              <line x1="0" y1="-3.5" x2="0" y2="3.5" stroke="#0284c7" strokeWidth="0.9" />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
