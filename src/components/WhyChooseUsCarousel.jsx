import { useRef, useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

export default function WhyChooseUsCarousel({ items }) {
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

  // Smooth auto-scroll speed (pixels per frame)
  const speed = 1.0;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scrollLoop = () => {
      // Move continuously whenever user is not hovering and not dragging
      if (!isInteractingRef.current && !isHoveredRef.current && !dragRef.current.isDown && container) {
        container.scrollLeft += speed;

        // Infinite loop wrap-around at 1/3 and 2/3 of total scroll width
        const oneThird = container.scrollWidth / 3;
        if (container.scrollLeft >= oneThird * 2) {
          container.scrollLeft -= oneThird;
        } else if (container.scrollLeft <= 0) {
          container.scrollLeft += oneThird;
        }
      }
      animationFrameRef.current = requestAnimationFrame(scrollLoop);
    };

    animationFrameRef.current = requestAnimationFrame(scrollLoop);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

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
    // Immediately resume movement as soon as cursor leaves the cards
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

  // Mouse drag & swipe handlers
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

    // Smooth wrap during drag
    const oneThird = container.scrollWidth / 3;
    if (container.scrollLeft >= oneThird * 2) {
      container.scrollLeft -= oneThird;
      dragRef.current.scrollLeft -= oneThird;
    } else if (container.scrollLeft <= 0) {
      container.scrollLeft += oneThird;
      dragRef.current.scrollLeft += oneThird;
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

  // Triplicate items for seamless infinite auto and manual scroll
  const displayItems = [...items, ...items, ...items];

  return (
    <div className="relative mt-12 -mx-4 sm:-mx-8 lg:-mx-12 xl:-mx-16 py-4 select-none">
      {/* Gradient Edge Masks for Smooth Visual Blend */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-28 bg-gradient-to-r from-bg-primary via-bg-primary/80 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-28 bg-gradient-to-l from-bg-primary via-bg-primary/80 to-transparent" />

      {/* Scrollable / Draggable Cards Row */}
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
        className={`flex gap-6 overflow-x-auto no-scrollbar px-6 sm:px-12 py-2 ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {displayItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <article
              key={`${item.title}-${index}`}
              className="group relative flex w-[300px] sm:w-[350px] md:w-[380px] shrink-0 flex-col justify-between overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white p-6 sm:p-7 shadow-[0_10px_30px_rgba(15,23,42,0.04)] transition-all duration-300 hover:border-blue-400/50 hover:shadow-[0_20px_45px_rgba(56,189,248,0.16)] hover:-translate-y-1"
            >
              <div
                className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${item.gradient} opacity-0 blur-2xl transition duration-500 group-hover:scale-125 group-hover:opacity-100`}
              />

              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-600 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-500 group-hover:text-white group-hover:shadow-[0_8px_20px_rgba(56,189,248,0.35)]">
                    <Icon size={22} className="transition-transform duration-300 group-hover:scale-105" />
                  </div>
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-50 text-slate-300 opacity-0 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:opacity-100">
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                  </div>
                </div>

                <h3 className="mt-5 font-heading text-[1.18rem] font-bold leading-snug text-slate-950 transition-colors duration-200 group-hover:text-blue-600">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-[13px] leading-6 text-slate-600 transition-colors duration-200 group-hover:text-slate-700">
                  {item.description}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
