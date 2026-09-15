import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Cpu,
  Handshake,
  Scale,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";

// Domain-specific icon lookup
const iconMap = {
  marketing: TrendingUp,
  talent: Users,
  technology: Cpu,
  research: BarChart3,
  "legal-finance": Scale,
  solutions: Handshake,
};

// Theme color tokens for each card
const cardThemes = [
  {
    gradient: "from-cyan-500 via-sky-500 to-blue-600",
    borderGlow: "hover:border-cyan-400/60",
    shadowGlow: "hover:shadow-[0_20px_45px_rgba(6,182,212,0.16)]",
    tagBg: "bg-cyan-50 text-cyan-700 border-cyan-200/80",
    iconBg: "bg-gradient-to-br from-cyan-500 to-blue-600 text-white",
    dotColor: "bg-cyan-500",
    glowColor: "rgba(6, 182, 212, 0.15)",
  },
  {
    gradient: "from-blue-600 via-indigo-600 to-cyan-500",
    borderGlow: "hover:border-blue-400/60",
    shadowGlow: "hover:shadow-[0_20px_45px_rgba(37,99,235,0.16)]",
    tagBg: "bg-blue-50 text-blue-700 border-blue-200/80",
    iconBg: "bg-gradient-to-br from-blue-600 to-indigo-600 text-white",
    dotColor: "bg-blue-600",
    glowColor: "rgba(37, 99, 235, 0.15)",
  },
  {
    gradient: "from-indigo-600 via-blue-600 to-cyan-400",
    borderGlow: "hover:border-indigo-400/60",
    shadowGlow: "hover:shadow-[0_20px_45px_rgba(99,102,241,0.16)]",
    tagBg: "bg-indigo-50 text-indigo-700 border-indigo-200/80",
    iconBg: "bg-gradient-to-br from-indigo-600 to-cyan-500 text-white",
    dotColor: "bg-indigo-600",
    glowColor: "rgba(99, 102, 241, 0.15)",
  },
  {
    gradient: "from-purple-600 via-indigo-600 to-blue-600",
    borderGlow: "hover:border-purple-400/60",
    shadowGlow: "hover:shadow-[0_20px_45px_rgba(168,85,247,0.16)]",
    tagBg: "bg-purple-50 text-purple-700 border-purple-200/80",
    iconBg: "bg-gradient-to-br from-purple-600 to-pink-600 text-white",
    dotColor: "bg-purple-600",
    glowColor: "rgba(168, 85, 247, 0.15)",
  },
  {
    gradient: "from-slate-800 via-blue-900 to-indigo-900",
    borderGlow: "hover:border-slate-400/60",
    shadowGlow: "hover:shadow-[0_20px_45px_rgba(30,41,59,0.16)]",
    tagBg: "bg-slate-100 text-slate-800 border-slate-300",
    iconBg: "bg-gradient-to-br from-slate-800 to-blue-900 text-white",
    dotColor: "bg-slate-800",
    glowColor: "rgba(30, 41, 59, 0.15)",
  },
];

export default function RoadmapSolutionsSection({ solutionSections }) {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const isHoveredRef = useRef(false);
  const isInteractingRef = useRef(false);
  const animationFrameRef = useRef(null);
  const resumeTimeoutRef = useRef(null);

  // Mouse drag coordinate tracking
  const dragRef = useRef({
    startX: 0,
    scrollLeft: 0,
    isDown: false,
  });

  // Continuous auto-scroll speed (pixels per frame)
  const speed = 0.9;

  // Triplicate items for seamless infinite auto and manual scroll
  const displayItems = [
    ...solutionSections,
    ...solutionSections,
    ...solutionSections,
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Set initial scroll position to the middle third for seamless bidirectional motion
    const oneThird = container.scrollWidth / 3;
    if (container.scrollLeft === 0 && oneThird > 0) {
      container.scrollLeft = oneThird;
    }

    let isVisible = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const scrollLoop = () => {
      // Move continuously only when section is in viewport and not user-interacted
      if (
        isVisible &&
        !isInteractingRef.current &&
        !isHoveredRef.current &&
        !dragRef.current.isDown &&
        container
      ) {
        container.scrollLeft += speed;

        // Infinite loop wrap-around
        const oneThirdWidth = container.scrollWidth / 3;
        if (container.scrollLeft >= oneThirdWidth * 2) {
          container.scrollLeft -= oneThirdWidth;
        } else if (container.scrollLeft <= 0) {
          container.scrollLeft += oneThirdWidth;
        }
      }
      animationFrameRef.current = requestAnimationFrame(scrollLoop);
    };

    animationFrameRef.current = requestAnimationFrame(scrollLoop);

    return () => {
      observer.disconnect();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, [solutionSections.length]);

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
    isInteractingRef.current = true;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    dragRef.current.isDown = false;
    setIsDragging(false);
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    isInteractingRef.current = false;
  };

  const handleWheel = () => {
    isInteractingRef.current = true;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      if (!isHoveredRef.current && !dragRef.current.isDown) {
        isInteractingRef.current = false;
      }
    }, 600);
  };

  // Mouse drag handlers
  const onMouseDown = (e) => {
    const container = containerRef.current;
    if (!container) return;
    dragRef.current.isDown = true;
    setIsDragging(true);
    isInteractingRef.current = true;
    dragRef.current.startX = e.pageX - container.offsetLeft;
    dragRef.current.scrollLeft = container.scrollLeft;
  };

  const onMouseMove = (e) => {
    if (!dragRef.current.isDown) return;
    e.preventDefault();
    const container = containerRef.current;
    if (!container) return;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - dragRef.current.startX) * 1.5;
    container.scrollLeft = dragRef.current.scrollLeft - walk;

    const oneThirdWidth = container.scrollWidth / 3;
    if (container.scrollLeft >= oneThirdWidth * 2) {
      container.scrollLeft -= oneThirdWidth;
      dragRef.current.scrollLeft -= oneThirdWidth;
    } else if (container.scrollLeft <= 0) {
      container.scrollLeft += oneThirdWidth;
      dragRef.current.scrollLeft += oneThirdWidth;
    }
  };

  const onMouseUp = () => {
    if (dragRef.current.isDown) {
      dragRef.current.isDown = false;
      setIsDragging(false);
      if (!isHoveredRef.current) {
        isInteractingRef.current = false;
      }
    }
  };

  const handleTouchStart = () => {
    isInteractingRef.current = true;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
  };

  const handleTouchEnd = () => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      isInteractingRef.current = false;
    }, 800);
  };

  const scrollByAmount = (direction) => {
    const container = containerRef.current;
    if (!container) return;
    isInteractingRef.current = true;
    const cardWidth = 420;
    container.scrollBy({
      left: direction === "next" ? cardWidth : -cardWidth,
      behavior: "smooth",
    });

    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      if (!isHoveredRef.current) {
        isInteractingRef.current = false;
      }
    }, 1200);
  };

  return (
    <section
      id="solutions"
      className="relative z-10 mx-auto max-w-[1720px] px-4 py-20 sm:px-8 lg:px-12 xl:px-16"
    >
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute left-1/4 top-1/3 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-cyan-500/5 blur-[120px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-1/3 h-[450px] w-[450px] translate-x-1/2 rounded-full bg-blue-600/5 blur-[120px]" />

      {/* Section Header with Navigation Controls */}
      <div className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
        <div>
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 12 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-50/80 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-sky-600 shadow-sm"
          >
            <Sparkles size={12} className="text-sky-500 animate-pulse" />
            <span>Integrated Solutions</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="section-title mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl"
          >
            Comprehensive Solutions Across Every Dimension
          </motion.h2>
        </div>

        {/* Manual Left / Right Navigation Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollByAmount("prev")}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-all duration-200 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600 hover:scale-105 active:scale-95"
            aria-label="Previous solution card"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => scrollByAmount("next")}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-all duration-200 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600 hover:scale-105 active:scale-95"
            aria-label="Next solution card"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* SINGLE HORIZONTAL ROW MOVING CARDS */}
      <div className="relative mt-12 -mx-4 sm:-mx-8 lg:-mx-12 xl:-mx-16 py-4 select-none">
        {/* Left & Right Gradient Edge Masks for Seamless Blending */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 sm:w-24 bg-gradient-to-r from-bg-primary via-bg-primary/80 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 sm:w-24 bg-gradient-to-l from-bg-primary via-bg-primary/80 to-transparent" />

        {/* Horizontally Scrollable / Draggable Cards Row */}
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className={`flex gap-6 overflow-x-auto no-scrollbar px-6 sm:px-12 py-3 ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {displayItems.map((solution, index) => {
            const theme = cardThemes[index % cardThemes.length];
            const Icon = iconMap[solution.id] || solution.icon || TrendingUp;

            return (
              <article
                key={`${solution.id || solution.title}-${index}`}
                className={`group relative flex w-[320px] sm:w-[380px] md:w-[420px] shrink-0 flex-col justify-between overflow-hidden rounded-[2rem] border border-slate-200/90 bg-white p-7 shadow-[0_10px_30px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1.5 sm:p-8 ${theme.borderGlow} ${theme.shadowGlow}`}
              >
                {/* Top Accent Gradient Bar */}
                <div
                  className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${theme.gradient}`}
                />

                {/* Ambient Hover Glow */}
                <div
                  className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: theme.glowColor }}
                />

                {/* Main Card Content */}
                <div>
                  {/* Header Row: Tagline Pill & Icon */}
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] shadow-sm ${theme.tagBg}`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${theme.dotColor}`}
                      />
                      <span>{solution.tagline}</span>
                    </span>

                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${theme.iconBg} shadow-md transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}
                    >
                      <Icon size={20} />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="mt-5 font-heading text-xl font-bold tracking-tight text-slate-950 transition-colors duration-200 group-hover:text-blue-600 sm:text-[1.3rem]">
                    {solution.title}
                  </h3>

                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-slate-600">
                    {solution.description}
                  </p>

                  {/* Key Capabilities / Offerings */}
                  <div className="mt-6 border-t border-slate-100 pt-5">
                    <h4 className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                      Capabilities &amp; Deliverables
                    </h4>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {solution.items.map((item, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200/80 bg-slate-50/80 px-2.5 py-1 text-[12px] font-medium text-slate-700 transition-all duration-150 hover:border-slate-300 hover:bg-white hover:text-slate-900"
                        >
                          <CheckCircle2
                            size={12}
                            className="shrink-0 text-sky-500 transition-transform duration-200 group-hover:scale-110"
                          />
                          <span>{item}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
