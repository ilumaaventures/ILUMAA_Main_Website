import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";

export default function SolutionsHorizontalSection({ solutionSections }) {
  const targetRef = useRef(null);
  const trackRef = useRef(null);
  const [scrollRange, setScrollRange] = useState(0);

  // Measure dynamic horizontal scroll range accurately for any screen width
  useEffect(() => {
    const calculateRange = () => {
      if (trackRef.current) {
        const scrollWidth = trackRef.current.scrollWidth;
        const clientWidth = window.innerWidth;
        // Leave a comfortable margin so the final card is fully framed
        const paddingBuffer = clientWidth > 1024 ? 96 : clientWidth > 640 ? 48 : 24;
        const offset = Math.max(0, scrollWidth - clientWidth + paddingBuffer);
        setScrollRange(offset);
      }
    };

    calculateRange();
    const timer = setTimeout(calculateRange, 150);
    window.addEventListener("resize", calculateRange);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculateRange);
    };
  }, [solutionSections]);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Silky smooth, highly responsive scroll physics without lag or rubber-banding
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 32,
    mass: 0.15,
    restDelta: 0.0005,
  });

  const x = useTransform(smoothProgress, [0, 1], [0, -scrollRange]);

  return (
    <section
      id="solutions"
      ref={targetRef}
      className="relative h-[360vh] bg-gradient-to-b from-slate-50/90 via-slate-100/40 to-slate-50/90"
    >
      <div className="sticky top-0 flex h-screen w-full flex-col justify-between overflow-hidden py-4 sm:py-6">
        {/* Top Header */}
        <div className="mx-auto w-full max-w-[1720px] px-4 sm:px-8 lg:px-12 xl:px-16 pt-2">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-50/80 px-3 py-0.5 text-[10.5px] font-bold uppercase tracking-[0.2em] text-sky-600 shadow-2xs">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-500 animate-pulse" />
              <span>Solutions</span>
            </div>
            <h2 className="mt-1 font-heading text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl lg:text-3xl">
              Comprehensive Business & Technology Solutions
            </h2>
          </div>
        </div>

        {/* Horizontal Track of Vertical Cards in a Single Row */}
        <div className="relative my-auto w-full overflow-visible py-2">
          <motion.div
            ref={trackRef}
            style={{ x, willChange: "transform" }}
            className="flex items-stretch gap-5 pl-4 pr-12 sm:gap-7 sm:pl-8 sm:pr-20 lg:pl-16 lg:pr-28 w-max"
          >
            {solutionSections.map((section, index) => {
              const Icon = section.icon;

              return (
                <article
                  key={section.title}
                  className="group relative flex w-[320px] sm:w-[380px] md:w-[420px] lg:w-[450px] shrink-0 flex-col overflow-hidden rounded-[2rem] border border-slate-200/90 bg-white shadow-[0_12px_36px_rgba(15,23,42,0.06)] transition-all duration-300 hover:shadow-[0_20px_45px_rgba(56,189,248,0.16)]"
                >
                  {/* Top Header Panel with Dark Cohesive Background */}
                  <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-[#0a1526] to-[#0f213d] p-5 sm:p-6 text-white border-b border-slate-800">
                    {/* Ambient Glow */}
                    <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan-500/15 blur-2xl transition-all duration-500 group-hover:scale-125 group-hover:bg-cyan-400/25" />

                    {/* Top Row: Icon + Tagline */}
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-cyan-400 backdrop-blur-md shadow-inner">
                          <Icon size={18} />
                        </span>
                        <span className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                          {section.tagline}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="relative z-10 mt-3.5 font-heading text-[1.22rem] sm:text-[1.32rem] font-bold leading-snug text-white">
                      {section.title}
                    </h3>
                  </div>

                  {/* Below Heading: Description & Items List in Vertical Layout */}
                  <div className="flex flex-1 flex-col justify-between bg-slate-50/50 p-4 sm:p-5.5">
                    <div>
                      {/* Description */}
                      <p className="text-[12.8px] leading-relaxed text-slate-600 font-normal">
                        {section.description}
                      </p>

                      {/* Items Grid */}
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {section.items.map((item) => (
                          <div
                            key={item}
                            className="group/item flex items-center gap-2 rounded-lg border border-slate-200/80 bg-white px-2.5 py-2 shadow-2xs transition-all duration-200 hover:border-cyan-400/50 hover:bg-cyan-50/20 hover:shadow-xs"
                          >
                            <CheckCircle2
                              size={14}
                              className="shrink-0 text-cyan-500 transition-transform duration-200 group-hover/item:scale-110"
                            />
                            <span className="text-[11.5px] font-medium leading-tight text-slate-700 transition-colors group-hover/item:text-slate-950">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Card Footer CTA */}
                    <div className="mt-4 flex items-center justify-between border-t border-slate-200/80 pt-3">
                      <span className="text-[10.5px] font-semibold uppercase tracking-wider text-slate-400">
                        Tailored Solution
                      </span>
                      <a
                        href="/#connect"
                        className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white shadow-md transition-all duration-200 hover:bg-cyan-600 hover:shadow-cyan-500/25 hover:shadow-lg hover:gap-2"
                      >
                        <span>Consult on this</span>
                        <ArrowRight size={11} />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </motion.div>
        </div>

        {/* Bottom Mobile Scroll Hint */}
        <div className="mx-auto w-full max-w-[1720px] px-4 pb-1 text-center sm:hidden">
          <div className="inline-flex items-center gap-1 text-[11px] text-slate-400">
            <span>Scroll down to slide through all solutions</span>
            <ChevronRight size={12} className="animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
