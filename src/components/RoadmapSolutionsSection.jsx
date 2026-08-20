import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function RoadmapSolutionsSection({ solutionSections }) {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const roadAreaRef = useRef(null);
  const [activeId, setActiveId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [carPos, setCarPos] = useState({ x: -40, y: 600, angle: 0 });
  const scrollTimeoutRef = useRef(null);

  // Dynamic milestone coordinates sampled from SVG path (fallback defaults)
  const [milestoneCoords, setMilestoneCoords] = useState([
    { x: 210,  y: 640 },
    { x: 620,  y: 480 },
    { x: 1020, y: 580 },
    { x: 1420, y: 260 },
    { x: 1820, y: 440 },
    { x: 2200, y: 130 },
  ]);

  const currentId = hoveredId || activeId;
  const activeSolution = currentId
    ? solutionSections.find((s) => s.id === currentId)
    : null;

  // Milestone configurations
  // compactBottom: px above road centerline for top-direction labels
  // compactTop:    px below road centerline for bottom-direction labels
  const milestoneConfig = [
    {
      id: "marketing",
      step: 1,
      progress: 0.08,
      pinColor: "from-cyan-500 to-blue-600",
      brightColor: "#67e8f9",
      mainColor: "#0284c7",
      darkColor: "#0369a1",
      deepColor: "#082f49",
      glowColor: "rgba(6, 182, 212, 0.45)",
      cardDir: "top",
      labelOffsetX: 0,
      compactBottom: 78,
    },
    {
      id: "talent",
      step: 2,
      progress: 0.25,
      pinColor: "from-blue-600 to-indigo-600",
      brightColor: "#93c5fd",
      mainColor: "#2563eb",
      darkColor: "#1d4ed8",
      deepColor: "#172554",
      glowColor: "rgba(59, 130, 246, 0.45)",
      cardDir: "bottom",
      labelOffsetX: -22,    // aligns directly under the needle shaft of pin #2
      compactTop: 48,       // brings label close under the road beneath pin #2
    },
    {
      id: "technology",
      step: 3,
      progress: 0.42,
      pinColor: "from-indigo-600 to-cyan-600",
      brightColor: "#a5b4fc",
      mainColor: "#6366f1",
      darkColor: "#4338ca",
      deepColor: "#1e1b4b",
      glowColor: "rgba(99, 102, 241, 0.45)",
      cardDir: "top",
      labelOffsetX: 0,
      compactBottom: 90,
    },
    {
      id: "research",
      step: 4,
      progress: 0.58,
      pinColor: "from-purple-600 to-pink-600",
      brightColor: "#f472b6",
      mainColor: "#c026d3",
      darkColor: "#86198f",
      deepColor: "#4a044e",
      glowColor: "rgba(168, 85, 247, 0.45)",
      cardDir: "bottom",
      labelOffsetX: 0,
      compactTop: 54,
    },
    {
      id: "legal-finance",
      step: 5,
      progress: 0.75,
      pinColor: "from-rose-500 to-red-600",
      brightColor: "#fca5a5",
      mainColor: "#dc2626",
      darkColor: "#991b1b",
      deepColor: "#450a0a",
      glowColor: "rgba(239, 68, 68, 0.45)",
      cardDir: "top",
      labelOffsetX: 0,
      compactBottom: 90,
    },
    {
      id: "solutions",
      step: 6,
      progress: 0.92,
      pinColor: "from-emerald-500 to-teal-600",
      brightColor: "#6ee7b7",
      mainColor: "#059669",
      darkColor: "#047857",
      deepColor: "#064e3b",
      glowColor: "rgba(16, 185, 129, 0.45)",
      cardDir: "bottom",
      labelOffsetX: -10,    // aligned directly under pin #6
      compactTop: 68,
    },
  ];

  // SVG road: long sweeping serpentine across 2400×800 viewBox
  // 6 pronounced S-curves so each milestone sits visibly on its own peak/valley
  const roadPathD =
    "M -60,760"
    + " C 60,770  140,720  220,660"
    + " C 310,590  360,510  430,470"
    + " C 510,420  580,390  640,480"
    + " C 700,560  730,620  810,600"
    + " C 900,570  960,510  1020,580"
    + " C 1090,660 1120,720 1200,700"
    + " C 1280,680 1330,610 1400,530"
    + " C 1470,440 1520,340 1580,280"
    + " C 1660,200 1730,230 1820,300"
    + " C 1920,380 1950,440 2020,430"
    + " C 2100,410 2150,340 2220,250"
    + " C 2290,150 2340,120 2400,90";

  // Calculate precise milestone coordinates directly from the SVG path
  const updateMilestoneCoords = useCallback(() => {
    if (pathRef.current) {
      try {
        const totalLength = pathRef.current.getTotalLength();
        const coords = milestoneConfig.map((m) => {
          const pt = pathRef.current.getPointAtLength(m.progress * totalLength);
          return { x: pt.x, y: pt.y };
        });
        setMilestoneCoords(coords);
      } catch (e) {
        // Fallback to defaults
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    updateMilestoneCoords();
    window.addEventListener("resize", updateMilestoneCoords);
    return () => window.removeEventListener("resize", updateMilestoneCoords);
  }, [updateMilestoneCoords]);

  // Click outside road area closes all descriptions
  const handleOutsideClick = useCallback((e) => {
    if (roadAreaRef.current && !roadAreaRef.current.contains(e.target)) {
      setActiveId(null);
      setHoveredId(null);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [handleOutsideClick]);

  // Scroll tracking across the sticky height
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    mass: 0.12,
    restDelta: 0.0001,
  });

  // Car position & scroll-driven milestone activation
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (pathRef.current) {
      try {
        const totalLength = pathRef.current.getTotalLength();
        const clamped = Math.max(0, Math.min(1, latest));
        const currentDist = clamped * totalLength;
        const point = pathRef.current.getPointAtLength(currentDist);

        const delta = 4;
        const nextPoint = pathRef.current.getPointAtLength(
          Math.min(totalLength, currentDist + delta)
        );
        const prevPoint = pathRef.current.getPointAtLength(
          Math.max(0, currentDist - delta)
        );
        const angle =
          Math.atan2(nextPoint.y - prevPoint.y, nextPoint.x - prevPoint.x) *
          (180 / Math.PI);

        setCarPos({ x: point.x, y: point.y, angle });

        // Auto-activate milestone while scrolling
        if (!hoveredId) {
          if (clamped < 0.17)      setActiveId("marketing");
          else if (clamped < 0.33) setActiveId("talent");
          else if (clamped < 0.50) setActiveId("technology");
          else if (clamped < 0.66) setActiveId("research");
          else if (clamped < 0.83) setActiveId("legal-finance");
          else                     setActiveId("solutions");
        }

        // Close cards 1.5s after scrolling stops (unless user is hovering)
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => {
          if (!hoveredId) setActiveId(null);
        }, 1500);
      } catch (e) {
        // Fallback
      }
    }
  });

  // Initial car position
  useEffect(() => {
    if (pathRef.current) {
      const p = pathRef.current.getPointAtLength(0);
      const pN = pathRef.current.getPointAtLength(4);
      setCarPos({
        x: p.x,
        y: p.y,
        angle: Math.atan2(pN.y - p.y, pN.x - p.x) * (180 / Math.PI),
      });
    }
    return () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  return (
    <section
      id="solutions"
      ref={containerRef}
      className="relative h-[340vh] bg-gradient-to-b from-slate-50/90 via-white to-slate-50/95"
    >
      {/* Sticky Fullscreen Viewport */}
      <div className="sticky top-0 flex h-screen w-full flex-col justify-center items-center overflow-x-clip py-2">
        {/* Subtle grid background */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-60" />
        <div className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative mx-auto w-full px-6 lg:px-14 flex flex-col items-center">
          {/* Section Header */}
          <div className="text-center mb-2 sm:mb-4 shrink-0 px-4 z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-50/90 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-sky-600 shadow-2xs">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-500 animate-pulse" />
              <span>Interactive Roadmap Journey • Scroll To Drive</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 mt-1.5">
              Comprehensive Business & Technology Solutions
            </h2>
          </div>

          {/* ═══════════════ DESKTOP FULL-WIDTH ROAD (≥ 1024px) ═══════════════ */}
          <div
            ref={roadAreaRef}
            className="hidden lg:block relative w-full aspect-[3/1] max-h-[65vh]"
          >
            <svg
              viewBox="0 0 2400 800"
              className="absolute inset-0 h-full w-full overflow-visible drop-shadow-[0_20px_40px_rgba(15,23,42,0.15)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="roadAsphalt" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0f172a" />
                  <stop offset="50%" stopColor="#1e293b" />
                  <stop offset="100%" stopColor="#0a1120" />
                </linearGradient>

                <linearGradient id="roadGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#6366f1" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.8" />
                </linearGradient>

                <linearGradient id="headlightBeam" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.85" />
                  <stop offset="40%" stopColor="#06b6d4" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
                </linearGradient>

                <filter id="roadShadow" x="-5%" y="-10%" width="115%" height="130%">
                  <feDropShadow dx="0" dy="12" stdDeviation="14" floodColor="#0f172a" floodOpacity="0.25" />
                </filter>
              </defs>

              {/* Road Underlayer Shadow */}
              <path
                d={roadPathD}
                stroke="#cbd5e1"
                strokeWidth="86"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#roadShadow)"
              />

              {/* Dark Asphalt Highway */}
              <path
                d={roadPathD}
                stroke="url(#roadAsphalt)"
                strokeWidth="70"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Glowing Road Edge */}
              <path
                d={roadPathD}
                stroke="url(#roadGlow)"
                strokeWidth="72"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="4 8"
                opacity="0.25"
              />

              {/* White Dashed Center Line */}
              <path
                ref={pathRef}
                d={roadPathD}
                stroke="#ffffff"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="14 16"
                opacity="0.85"
              />

              {/* Scroll-Driven Car */}
              <g
                transform={`translate(${carPos.x}, ${carPos.y}) rotate(${carPos.angle})`}
                className="pointer-events-none"
                style={{ transformOrigin: "0 0" }}
              >
                <polygon
                  points="20,-8 120,-40 120,40 20,8"
                  fill="url(#headlightBeam)"
                  opacity="0.5"
                />
                <ellipse cx="0" cy="0" rx="28" ry="14" fill="#06b6d4" opacity="0.4" filter="blur(5px)" />
                <rect x="-16" y="-13" width="8" height="3" rx="1.5" fill="#334155" />
                <rect x="8" y="-13" width="8" height="3" rx="1.5" fill="#334155" />
                <rect x="-16" y="10" width="8" height="3" rx="1.5" fill="#334155" />
                <rect x="8" y="10" width="8" height="3" rx="1.5" fill="#334155" />
                <rect
                  x="-21"
                  y="-10.5"
                  width="42"
                  height="21"
                  rx="6"
                  fill="#0f172a"
                  stroke="#38bdf8"
                  strokeWidth="1.8"
                  filter="drop-shadow(0 3px 7px rgba(0,0,0,0.5))"
                />
                <path d="M 5 -6 L 18 -3.5 L 18 3.5 L 5 6 Z" fill="#1e293b" />
                <line x1="7" y1="0" x2="17" y2="0" stroke="#06b6d4" strokeWidth="1.8" strokeLinecap="round" />
                <rect x="-8" y="-7" width="15" height="14" rx="3.5" fill="#0284c7" opacity="0.85" />
                <rect x="-3.5" y="-5" width="9" height="10" rx="2" fill="#38bdf8" opacity="0.6" />
                <ellipse cx="20" cy="-7" rx="2.2" ry="2.8" fill="#ffffff" filter="drop-shadow(0 0 4px #38bdf8)" />
                <ellipse cx="20" cy="7" rx="2.2" ry="2.8" fill="#ffffff" filter="drop-shadow(0 0 4px #38bdf8)" />
                <ellipse cx="-20.5" cy="-7" rx="1.8" ry="2.5" fill="#ef4444" filter="drop-shadow(0 0 4px #ef4444)" />
                <ellipse cx="-20.5" cy="7" rx="1.8" ry="2.5" fill="#ef4444" filter="drop-shadow(0 0 4px #ef4444)" />
              </g>
            </svg>

            {/* ═══════════ MILESTONES (Pins on Road, Content in White Space) ═══════════ */}
            {solutionSections.map((section, index) => {
              const config = milestoneConfig[index] || milestoneConfig[0];
              const coords = milestoneCoords[index] || { x: 800, y: 350 };
              const Icon = section.icon;
              const isSelected = activeSolution?.id === section.id;
              const isTop = config.labelDir === "top";

              // Exact pin position (% of SVG coordinate box)
              const pinLeft = (coords.x / 2400) * 100;
              const pinTop = (coords.y / 800) * 100;

              return (
                <div
                  key={section.id}
                  style={{
                    position: "absolute",
                    left: `${pinLeft}%`,
                    top: `${pinTop}%`,
                    width: 0,
                    height: 0,
                  }}
                  onMouseEnter={() => setHoveredId(section.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="z-20 group/milestone select-none"
                >
                  {/* ── 3D PUSHPIN MARKER: Needle tip planted at (0, 0) on road centerline ── */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveId(activeId === section.id ? null : section.id);
                    }}
                    style={{
                      position: "absolute",
                      left: "-23px",
                      top: "-63px",
                      width: "46px",
                      height: "66px",
                    }}
                    className="flex flex-col items-center cursor-pointer z-30 pointer-events-auto"
                  >
                    {isSelected && (
                      <span
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-3 rounded-full animate-ping opacity-60 pointer-events-none"
                        style={{ backgroundColor: config.glowColor }}
                      />
                    )}
                    <motion.div
                      whileHover={{ scale: 1.2, y: -6 }}
                      animate={
                        isSelected
                          ? { scale: [1, 1.15, 1.08], y: [0, -4, 0] }
                          : { scale: 1, y: 0 }
                      }
                      transition={{ duration: 0.28 }}
                      className="relative flex flex-col items-center"
                    >
                      <svg
                        width="46"
                        height="66"
                        viewBox="0 0 48 68"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="overflow-visible select-none"
                      >
                        <defs>
                          {/* Metallic Chrome Gradient for Needle Shaft */}
                          <linearGradient
                            id="needleChrome"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                          >
                            <stop offset="0%" stopColor="#475569" />
                            <stop offset="22%" stopColor="#e2e8f0" />
                            <stop offset="45%" stopColor="#ffffff" />
                            <stop offset="70%" stopColor="#cbd5e1" />
                            <stop offset="88%" stopColor="#64748b" />
                            <stop offset="100%" stopColor="#334155" />
                          </linearGradient>

                          {/* 3D Radial Sphere Gradient */}
                          <radialGradient
                            id={`sphere3d-${config.step}`}
                            cx="32%"
                            cy="28%"
                            r="68%"
                            fx="26%"
                            fy="22%"
                          >
                            <stop offset="0%" stopColor={config.brightColor} />
                            <stop offset="28%" stopColor={config.mainColor} />
                            <stop offset="75%" stopColor={config.darkColor} />
                            <stop offset="100%" stopColor={config.deepColor} />
                          </radialGradient>

                          {/* Drop shadow for 3D sphere */}
                          <filter
                            id="sphereShadow"
                            x="-20%"
                            y="-20%"
                            width="140%"
                            height="140%"
                          >
                            <feDropShadow
                              dx="0"
                              dy="4"
                              stdDeviation="4"
                              floodColor="#0f172a"
                              floodOpacity="0.35"
                            />
                          </filter>
                        </defs>

                        {/* 1. Cast Shadow on road surface (projected to the right) */}
                        <polygon
                          points="24,63 42,50 45,53 25,64"
                          fill="#0f172a"
                          fillOpacity="0.22"
                        />
                        <ellipse
                          cx="42"
                          cy="49"
                          rx="6"
                          ry="3"
                          fill="#0f172a"
                          fillOpacity="0.18"
                        />
                        <ellipse
                          cx="24"
                          cy="63.5"
                          rx="3"
                          ry="1"
                          fill="#0f172a"
                          fillOpacity="0.6"
                        />

                        {/* 2. Metallic Silver Needle Shaft */}
                        <path
                          d="M 22,30 L 23,63 A 1,0.5 0 0,0 25,63 L 26,30 Z"
                          fill="url(#needleChrome)"
                          stroke="#64748b"
                          strokeWidth="0.4"
                        />
                        {/* Metallic collar under sphere */}
                        <ellipse
                          cx="24"
                          cy="30"
                          rx="3.5"
                          ry="1.2"
                          fill="#64748b"
                          stroke="#334155"
                          strokeWidth="0.3"
                        />
                        <ellipse
                          cx="24"
                          cy="29.5"
                          rx="2.8"
                          ry="0.8"
                          fill="#cbd5e1"
                        />

                        {/* 3. 3D Glossy Sphere Head */}
                        <circle
                          cx="24"
                          cy="18"
                          r="16"
                          fill={`url(#sphere3d-${config.step})`}
                          filter="url(#sphereShadow)"
                        />

                        {/* Sphere Ambient Bottom Bounce Light */}
                        <path
                          d="M 12,27 C 16,32 32,32 36,27 C 32,30.5 16,30.5 12,27 Z"
                          fill="#ffffff"
                          fillOpacity="0.35"
                        />

                        {/* Specular Glossy Spot Highlight (Top-Left) */}
                        <ellipse
                          cx="18.5"
                          cy="12.5"
                          rx="6.5"
                          ry="4"
                          transform="rotate(-30 18.5 12.5)"
                          fill="#ffffff"
                          fillOpacity="0.88"
                        />
                        <ellipse
                          cx="17"
                          cy="11"
                          rx="3"
                          ry="1.8"
                          transform="rotate(-30 17 11)"
                          fill="#ffffff"
                          fillOpacity="1"
                        />

                        {/* 4. Number inside Sphere */}
                        <text
                          x="24"
                          y="19"
                          textAnchor="middle"
                          dominantBaseline="central"
                          fill="#ffffff"
                          fontWeight="900"
                          fontSize="13.5"
                          fontFamily="system-ui, -apple-system, sans-serif"
                          style={{
                            textShadow: "0 1px 3px rgba(0,0,0,0.7)",
                          }}
                        >
                          {config.step}
                        </text>
                      </svg>
                    </motion.div>
                  </div>

                  {/* ── COMPACT LABEL: above pin (top) or below pin (bottom) ── */}
                  <AnimatePresence>
                    {!isSelected && (
                      <motion.div
                        key="compact"
                        initial={{ opacity: 0, y: config.cardDir === "top" ? 6 : -6, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: config.cardDir === "top" ? 6 : -6, scale: 0.96 }}
                        transition={{ duration: 0.18 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveId(section.id);
                        }}
                        style={{
                          position: "absolute",
                          ...(config.cardDir === "top"
                            ? { bottom: `${config.compactBottom ?? 90}px` }
                            : { top: `${config.compactTop ?? 82}px` }),
                          left: `${-95 + (config.labelOffsetX || 0)}px`,
                        }}
                        className="flex flex-col items-center text-center z-40 w-[190px] cursor-pointer group/card pointer-events-auto"
                      >
                        {/* Connector line: only for bottom-direction (at top of label, pointing up toward pin) */}
                        {config.cardDir === "bottom" && (
                          <div
                            className="w-px bg-gradient-to-t from-slate-400 via-slate-300 to-transparent mb-1.5 self-center"
                            style={{ height: "12px" }}
                          />
                        )}

                        {/* Eyebrow tag */}
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border bg-white border-slate-200 text-slate-600 shadow-[0_2px_8px_rgba(15,23,42,0.10)] transition-all duration-200 group-hover/card:border-cyan-400 group-hover/card:shadow-md max-w-full">
                          <Icon size={11} className="text-cyan-600 shrink-0" />
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 whitespace-nowrap truncate">
                            {section.tagline}
                          </span>
                        </div>

                        {/* Heading */}
                        <h3 className="mt-1.5 font-heading text-[0.97rem] font-bold leading-tight text-slate-900 transition-colors duration-200 group-hover/card:text-blue-600 max-w-[188px]">
                          {section.title}
                        </h3>

                        {/* Connector line: only for top-direction (at bottom of label, pointing down toward pin) */}
                        {config.cardDir === "top" && (
                          <div
                            className="w-px bg-gradient-to-b from-slate-400 via-slate-300 to-transparent mt-1.5 self-center"
                            style={{ height: "12px" }}
                          />
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* ── EXPANDED CARD: Opens UPWARD for 1-4 (lower pins) and DOWNWARD for 5-6 (upper crest pins) ── */}
                  <AnimatePresence>
                    {isSelected && (() => {
                      const expandedDir = config.expandedDir || (config.step >= 5 ? "bottom" : "top");
                      return (
                        <motion.div
                          key="expanded"
                          initial={{
                            opacity: 0,
                            scale: 0.93,
                            y: expandedDir === "top" ? 10 : -10,
                          }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{
                            opacity: 0,
                            scale: 0.93,
                            y: expandedDir === "top" ? 10 : -10,
                          }}
                          transition={{ duration: 0.22, ease: "easeOut" }}
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            position: "absolute",
                            ...(expandedDir === "top"
                              ? { bottom: "75px" }
                              : { top: "25px" }),
                            left: `${-160 + (config.labelOffsetX || 0)}px`,
                          }}
                          className="w-[320px] rounded-2xl border border-slate-200/90 bg-white/98 backdrop-blur-xl p-4 shadow-[0_22px_50px_rgba(15,23,42,0.2)] text-left z-50 pointer-events-auto"
                        >
                        {/* Card Header */}
                        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-2.5">
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-cyan-400 shadow-xs">
                            <Icon size={15} />
                          </span>
                          <div>
                            <span className="rounded-full bg-cyan-50 px-2 py-0.5 text-[8.5px] font-bold uppercase tracking-wider text-cyan-700 border border-cyan-100">
                              {section.tagline}
                            </span>
                            <h4 className="font-heading text-[0.88rem] font-bold text-slate-900 leading-tight mt-0.5">
                              {section.title}
                            </h4>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="mt-2.5 text-[11.5px] leading-relaxed text-slate-600">
                          {section.description}
                        </p>

                        {/* Capabilities */}
                        <div className="mt-2.5 grid grid-cols-2 gap-1.5 max-h-[240px] overflow-y-auto pr-1 no-scrollbar">
                          {section.items.map((item) => (
                            <div
                              key={item}
                              className="flex items-start gap-1.5 rounded-md border border-slate-100 bg-slate-50/90 px-2 py-1.5 min-h-[32px]"
                            >
                              <CheckCircle2 size={11} className="shrink-0 text-cyan-500 mt-0.5" />
                              <span className="text-[9.5px] font-medium leading-snug text-slate-700 break-words">
                                {item}
                              </span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })()}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* ═══════════════ MOBILE / TABLET VIEW (< 1024px) ═══════════════ */}
          <div className="lg:hidden relative w-full mt-4 space-y-4 max-h-[70vh] overflow-y-auto pr-1 px-4">
            {solutionSections.map((section, index) => {
              const config = milestoneConfig[index] || milestoneConfig[0];
              const Icon = section.icon;
              const isOpen = activeSolution?.id === section.id;

              return (
                <div
                  key={section.id}
                  onClick={() =>
                    setActiveId(activeId === section.id ? null : section.id)
                  }
                  className="relative pl-12"
                >
                  <div className="absolute left-5 top-5 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-10">
                    <svg
                      width="30"
                      height="44"
                      viewBox="0 0 48 68"
                      fill="none"
                      className="drop-shadow-md select-none"
                    >
                      <path
                        d="M 22,30 L 23,63 A 1,0.5 0 0,0 25,63 L 26,30 Z"
                        fill="url(#needleChrome)"
                        stroke="#64748b"
                        strokeWidth="0.4"
                      />
                      <circle
                        cx="24"
                        cy="18"
                        r="16"
                        fill={`url(#sphere3d-${config.step})`}
                      />
                      <ellipse
                        cx="18.5"
                        cy="12.5"
                        rx="6.5"
                        ry="4"
                        transform="rotate(-30 18.5 12.5)"
                        fill="#ffffff"
                        fillOpacity="0.88"
                      />
                      <text
                        x="24"
                        y="19"
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill="#ffffff"
                        fontWeight="900"
                        fontSize="14"
                        style={{
                          textShadow: "0 1px 3px rgba(0,0,0,0.7)",
                        }}
                      >
                        {config.step}
                      </text>
                    </svg>
                  </div>
                  <div
                    className={`rounded-[1.4rem] border p-4 transition-all duration-300 ${
                      isOpen
                        ? "border-cyan-400/60 bg-white shadow-lg"
                        : "border-slate-200/80 bg-white/90 shadow-sm"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-900 text-cyan-400">
                        <Icon size={14} />
                      </span>
                      <div>
                        <span className="rounded-full bg-cyan-50 px-1.5 py-0.5 text-[9px] font-bold uppercase text-cyan-700">
                          {section.tagline}
                        </span>
                        <h3 className="font-heading text-sm font-bold text-slate-900">
                          {section.title}
                        </h3>
                      </div>
                    </div>
                    <p className="mt-2 text-[12px] leading-relaxed text-slate-600">
                      {section.description}
                    </p>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-3 pt-3 border-t border-slate-100"
                      >
                        <div className="grid grid-cols-1 gap-1.5 mb-3">
                          {section.items.slice(0, 4).map((item) => (
                            <div
                              key={item}
                              className="flex items-center gap-1.5 rounded-md border border-slate-100 bg-slate-50/90 px-2 py-1"
                            >
                              <CheckCircle2
                                size={12}
                                className="shrink-0 text-cyan-500"
                              />
                              <span className="text-[11px] font-medium text-slate-800">
                                {item}
                              </span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
