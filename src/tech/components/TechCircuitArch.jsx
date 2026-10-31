import React from "react";

export default function TechCircuitArch() {
  return (
    <div className="relative w-full h-full pointer-events-none select-none overflow-hidden">
      {/* Inline styles for high-performance 60fps hardware-accelerated animations */}
      <style>{`
        @keyframes circuitPulseFlowA {
          0% { stroke-dashoffset: 400; opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { stroke-dashoffset: -400; opacity: 0; }
        }
        @keyframes circuitPulseFlowB {
          0% { stroke-dashoffset: -400; opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { stroke-dashoffset: 400; opacity: 0; }
        }
        @keyframes circuitPulseFlowC {
          0% { stroke-dashoffset: 500; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { stroke-dashoffset: -500; opacity: 0; }
        }
        @keyframes circuitPulseDrop {
          0% { stroke-dashoffset: 160; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { stroke-dashoffset: -160; opacity: 0; }
        }
        @keyframes circuitPingRing {
          0% { r: 3; opacity: 0.9; stroke-width: 1.5; }
          60% { opacity: 0.4; }
          100% { r: 11; opacity: 0; stroke-width: 0.5; }
        }
        @keyframes circuitStatusBlink {
          0%, 100% { opacity: 1; filter: drop-shadow(0 0 4px #06b6d4); }
          50% { opacity: 0.25; filter: none; }
        }

        .pulse-track-a {
          animation: circuitPulseFlowA 3.4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .pulse-track-b {
          animation: circuitPulseFlowB 4.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          animation-delay: 1.1s;
        }
        .pulse-track-c {
          animation: circuitPulseFlowC 3.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          animation-delay: 0.5s;
        }
        .pulse-track-d {
          animation: circuitPulseFlowA 4.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          animation-delay: 1.8s;
        }
        .pulse-drop-1 {
          animation: circuitPulseDrop 2.6s ease-in-out infinite;
          animation-delay: 0.2s;
        }
        .pulse-drop-2 {
          animation: circuitPulseDrop 3.0s ease-in-out infinite;
          animation-delay: 1.2s;
        }
        .pulse-drop-3 {
          animation: circuitPulseDrop 2.8s ease-in-out infinite;
          animation-delay: 0.7s;
        }
        .ping-ring {
          animation: circuitPingRing 2.4s ease-out infinite;
          transform-origin: center;
        }
        .ping-ring-delayed {
          animation: circuitPingRing 2.4s ease-out infinite;
          animation-delay: 1.2s;
          transform-origin: center;
        }
        .status-dot {
          animation: circuitStatusBlink 1.8s ease-in-out infinite;
        }
      `}</style>

      <svg
        viewBox="0 0 1440 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Neon Electric Gradients for Laser Pulses */}
          <linearGradient id="laserCyan" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
            <stop offset="50%" stopColor="#0284c7" stopOpacity="0.85" />
            <stop offset="85%" stopColor="#38bdf8" stopOpacity="1" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
          </linearGradient>

          <linearGradient id="laserBlue" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0" />
            <stop offset="60%" stopColor="#0ea5e9" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
          </linearGradient>

          <linearGradient id="laserVertical" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
            <stop offset="50%" stopColor="#0284c7" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="1" />
          </linearGradient>

          {/* Microchip fill gradient */}
          <linearGradient id="chipFill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#e0f2fe" />
          </linearGradient>

          {/* Ambient Soft Glow Filter */}
          <filter id="circuitGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Clip path matching the curve arch to ensure 100% containment in the white space */}
          <clipPath id="techArchClip">
            <path d="M -20 80 Q 720 10 1460 80 L 1460 170 L -20 170 Z" />
          </clipPath>
        </defs>

        {/* Group clipped to the exact arch so nothing ever bleeds into the hero video */}
        <g clipPath="url(#techArchClip)">
          {/* Subtle Ambient Radial Glow behind the central processing unit */}
          <circle
            cx="720"
            cy="56"
            r="120"
            fill="url(#laserCyan)"
            opacity="0.08"
            filter="url(#circuitGlow)"
          />

          {/* ==================================================== */}
          {/* 1. BASE STATIC CIRCUIT TRACES (Slate / Cyan low-opacity) */}
          {/* ==================================================== */}

          {/* Main Upper Contour Arch Track */}
          <path
            id="trackArch"
            d="M 20 82 Q 720 20 1420 82"
            stroke="#0284c7"
            strokeWidth="1.4"
            strokeOpacity="0.22"
            strokeLinecap="round"
          />

          {/* Upper Secondary Offset Trace */}
          <path
            d="M 60 92 Q 720 34 1380 92"
            stroke="#3b82f6"
            strokeWidth="1.0"
            strokeOpacity="0.16"
            strokeDasharray="4 6"
          />

          {/* Left Branching Logic Bus */}
          <path
            id="trackLeftBus"
            d="M 40 120 L 180 120 L 220 100 L 370 100 L 410 72 L 560 72 L 590 56 L 675 56"
            stroke="#0284c7"
            strokeWidth="1.5"
            strokeOpacity="0.28"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* Right Branching Logic Bus */}
          <path
            id="trackRightBus"
            d="M 1400 120 L 1260 120 L 1220 100 L 1070 100 L 1030 72 L 880 72 L 850 56 L 765 56"
            stroke="#0284c7"
            strokeWidth="1.5"
            strokeOpacity="0.28"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* Lower Mid-Range Data Bus */}
          <path
            id="trackLowerBus"
            d="M 100 138 L 290 138 L 330 118 L 520 118 L 560 92 L 670 92 L 720 92 L 770 92 L 880 92 L 920 118 L 1110 118 L 1150 138 L 1340 138"
            stroke="#06b6d4"
            strokeWidth="1.4"
            strokeOpacity="0.24"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* Additional Intermediate Cross-Traces */}
          <path
            d="M 220 100 L 260 138"
            stroke="#3b82f6"
            strokeWidth="1.2"
            strokeOpacity="0.18"
            strokeLinecap="round"
          />
          <path
            d="M 410 72 L 440 118"
            stroke="#3b82f6"
            strokeWidth="1.2"
            strokeOpacity="0.18"
            strokeLinecap="round"
          />
          <path
            d="M 1030 72 L 1000 118"
            stroke="#3b82f6"
            strokeWidth="1.2"
            strokeOpacity="0.18"
            strokeLinecap="round"
          />
          <path
            d="M 1220 100 L 1180 138"
            stroke="#3b82f6"
            strokeWidth="1.2"
            strokeOpacity="0.18"
            strokeLinecap="round"
          />

          {/* Vertical Drop Feeders into the Dark Enterprise Bar */}
          <path
            id="dropFeed1"
            d="M 240 120 L 240 160"
            stroke="#0284c7"
            strokeWidth="1.4"
            strokeOpacity="0.32"
            strokeDasharray="2 4"
          />
          <path
            id="dropFeed2"
            d="M 520 118 L 520 160"
            stroke="#0284c7"
            strokeWidth="1.4"
            strokeOpacity="0.32"
            strokeDasharray="2 4"
          />
          <path
            id="dropFeedCenter"
            d="M 720 92 L 720 160"
            stroke="#06b6d4"
            strokeWidth="1.6"
            strokeOpacity="0.38"
          />
          <path
            id="dropFeed3"
            d="M 920 118 L 920 160"
            stroke="#0284c7"
            strokeWidth="1.4"
            strokeOpacity="0.32"
            strokeDasharray="2 4"
          />
          <path
            id="dropFeed4"
            d="M 1200 120 L 1200 160"
            stroke="#0284c7"
            strokeWidth="1.4"
            strokeOpacity="0.32"
            strokeDasharray="2 4"
          />

          {/* ==================================================== */}
          {/* 2. DYNAMIC ELECTRIC DATA PULSES (Traveling Laser Beams) */}
          {/* ==================================================== */}

          {/* Pulse along Main Arch */}
          <path
            d="M 20 82 Q 720 20 1420 82"
            stroke="url(#laserCyan)"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeDasharray="36 380"
            filter="url(#circuitGlow)"
            className="pulse-track-a"
          />

          {/* Pulse along Left Logic Bus */}
          <path
            d="M 40 120 L 180 120 L 220 100 L 370 100 L 410 72 L 560 72 L 590 56 L 675 56"
            stroke="url(#laserCyan)"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="32 320"
            filter="url(#circuitGlow)"
            className="pulse-track-b"
          />

          {/* Pulse along Right Logic Bus */}
          <path
            d="M 765 56 L 850 56 L 880 72 L 1030 72 L 1070 100 L 1220 100 L 1260 120 L 1400 120"
            stroke="url(#laserBlue)"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="32 320"
            filter="url(#circuitGlow)"
            className="pulse-track-c"
          />

          {/* Pulse along Lower Data Bus */}
          <path
            d="M 100 138 L 290 138 L 330 118 L 520 118 L 560 92 L 670 92 L 720 92 L 770 92 L 880 92 L 920 118 L 1110 118 L 1150 138 L 1340 138"
            stroke="url(#laserCyan)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="28 420"
            filter="url(#circuitGlow)"
            className="pulse-track-d"
          />

          {/* Vertical Drop Pulses (Powering down into the Dark Bar) */}
          <path
            d="M 240 120 L 240 160"
            stroke="url(#laserVertical)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeDasharray="18 100"
            className="pulse-drop-1"
          />
          <path
            d="M 720 92 L 720 160"
            stroke="url(#laserVertical)"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeDasharray="22 90"
            filter="url(#circuitGlow)"
            className="pulse-drop-2"
          />
          <path
            d="M 1200 120 L 1200 160"
            stroke="url(#laserVertical)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeDasharray="18 100"
            className="pulse-drop-3"
          />

          {/* ==================================================== */}
          {/* 3. VIAS & CONNECTION PADS WITH PING RINGS */}
          {/* ==================================================== */}

          {/* Left Ping Via */}
          <g transform="translate(220, 100)">
            <circle cx="0" cy="0" r="3" fill="#ffffff" stroke="#0284c7" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="1.5" fill="#0284c7" />
            <circle cx="0" cy="0" r="3" fill="none" stroke="#06b6d4" className="ping-ring" />
          </g>

          {/* Mid-Left Ping Via */}
          <g transform="translate(410, 72)">
            <circle cx="0" cy="0" r="3.2" fill="#ffffff" stroke="#0284c7" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="1.5" fill="#06b6d4" />
            <circle cx="0" cy="0" r="3" fill="none" stroke="#0284c7" className="ping-ring-delayed" />
          </g>

          {/* Mid-Right Ping Via */}
          <g transform="translate(1030, 72)">
            <circle cx="0" cy="0" r="3.2" fill="#ffffff" stroke="#0284c7" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="1.5" fill="#06b6d4" />
            <circle cx="0" cy="0" r="3" fill="none" stroke="#0284c7" className="ping-ring" />
          </g>

          {/* Right Ping Via */}
          <g transform="translate(1220, 100)">
            <circle cx="0" cy="0" r="3" fill="#ffffff" stroke="#0284c7" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="1.5" fill="#0284c7" />
            <circle cx="0" cy="0" r="3" fill="none" stroke="#06b6d4" className="ping-ring-delayed" />
          </g>

          {/* Static Micro Vias along traces */}
          {[
            [180, 120], [370, 100], [560, 72], [590, 56],
            [850, 56], [880, 72], [1070, 100], [1260, 120],
            [290, 138], [330, 118], [520, 118], [560, 92],
            [880, 92], [920, 118], [1110, 118], [1150, 138]
          ].map(([x, y], idx) => (
            <circle
              key={idx}
              cx={x}
              cy={y}
              r="2.2"
              fill="#ffffff"
              stroke="#0284c7"
              strokeWidth="1.2"
            />
          ))}

          {/* ==================================================== */}
          {/* 4. MICROCHIP IC PACKAGES (Integrated Circuits) */}
          {/* ==================================================== */}

          {/* CENTER CHIP: ILUMAA-NPU v4 */}
          <g transform="translate(675, 44)">
            {/* Chip body shadow & base */}
            <rect
              x="0"
              y="0"
              width="90"
              height="24"
              rx="4"
              fill="url(#chipFill)"
              stroke="#0284c7"
              strokeWidth="1.4"
              filter="drop-shadow(0 2px 6px rgba(2, 132, 199, 0.16))"
            />
            {/* Chip Pin Leads (Top & Bottom) */}
            {[-8, -4, 0, 4, 8].map((offset, i) => (
              <g key={i}>
                <line x1={45 + offset * 3.5} y1="-3" x2={45 + offset * 3.5} y2="0" stroke="#0284c7" strokeWidth="1" />
                <line x1={45 + offset * 3.5} y1="24" x2={45 + offset * 3.5} y2="27" stroke="#0284c7" strokeWidth="1" />
              </g>
            ))}
            {/* Live Status LED */}
            <circle cx="10" cy="12" r="2.2" fill="#06b6d4" className="status-dot" />
            {/* Label */}
            <text
              x="20"
              y="15"
              fill="#0369a1"
              fontSize="8.5"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
              fontWeight="700"
              letterSpacing="0.08em"
            >
              ILUMAA·NPU
            </text>
          </g>

          {/* LEFT CHIP: AI-BUS */}
          <g transform="translate(285, 91)">
            <rect
              x="0"
              y="0"
              width="68"
              height="18"
              rx="3"
              fill="url(#chipFill)"
              stroke="#0284c7"
              strokeWidth="1.2"
              filter="drop-shadow(0 1px 3px rgba(2, 132, 199, 0.1))"
            />
            <circle cx="8" cy="9" r="1.8" fill="#0284c7" />
            <text
              x="16"
              y="12"
              fill="#0284c7"
              fontSize="7.5"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
              fontWeight="700"
              letterSpacing="0.06em"
            >
              AI·BUS 4.0
            </text>
          </g>

          {/* RIGHT CHIP: QUANTUM-IO */}
          <g transform="translate(1085, 91)">
            <rect
              x="0"
              y="0"
              width="78"
              height="18"
              rx="3"
              fill="url(#chipFill)"
              stroke="#0284c7"
              strokeWidth="1.2"
              filter="drop-shadow(0 1px 3px rgba(2, 132, 199, 0.1))"
            />
            <circle cx="8" cy="9" r="1.8" fill="#0284c7" />
            <text
              x="16"
              y="12"
              fill="#0284c7"
              fontSize="7.5"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
              fontWeight="700"
              letterSpacing="0.06em"
            >
              QUANTUM·IO
            </text>
          </g>

          {/* ==================================================== */}
          {/* 5. TELEMETRY CROSSHAIRS & DATA POINTS */}
          {/* ==================================================== */}
          {[
            [160, 68], [480, 48], [960, 48], [1280, 68]
          ].map(([x, y], i) => (
            <g key={i} transform={`translate(${x}, ${y})`} opacity="0.35">
              <line x1="-4" y1="0" x2="4" y2="0" stroke="#0284c7" strokeWidth="1" />
              <line x1="0" y1="-4" x2="0" y2="4" stroke="#0284c7" strokeWidth="1" />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
