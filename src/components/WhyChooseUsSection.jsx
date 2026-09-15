import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import centerCardBg from "../assets/human-ai-intelligence-bg.jpg";

export default function WhyChooseUsSection({ items }) {
  const sectionRef = useRef(null);

  // Track scroll progress through the section (from entering viewport to exiting viewport)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 90%", "end 10%"],
  });

  // Staggered scroll-driven animations for Left Cards (direct hardware-accelerated transforms)
  const leftX0 = useTransform(scrollYProgress, [0, 0.28, 0.72, 1.0], ["70%", "0%", "0%", "70%"]);
  const leftX1 = useTransform(scrollYProgress, [0.04, 0.32, 0.68, 0.96], ["80%", "0%", "0%", "80%"]);
  const leftX2 = useTransform(scrollYProgress, [0.08, 0.36, 0.64, 0.92], ["90%", "0%", "0%", "90%"]);

  const leftOpacity0 = useTransform(scrollYProgress, [0, 0.22, 0.78, 1.0], [0, 1, 1, 0]);
  const leftOpacity1 = useTransform(scrollYProgress, [0.04, 0.26, 0.74, 0.96], [0, 1, 1, 0]);
  const leftOpacity2 = useTransform(scrollYProgress, [0.08, 0.30, 0.70, 0.92], [0, 1, 1, 0]);

  const leftScale0 = useTransform(scrollYProgress, [0, 0.28, 0.72, 1.0], [0.92, 1, 1, 0.92]);
  const leftScale1 = useTransform(scrollYProgress, [0.04, 0.32, 0.68, 0.96], [0.92, 1, 1, 0.92]);
  const leftScale2 = useTransform(scrollYProgress, [0.08, 0.36, 0.64, 0.92], [0.92, 1, 1, 0.92]);

  // Staggered scroll-driven animations for Right Cards (direct hardware-accelerated transforms)
  const rightX0 = useTransform(scrollYProgress, [0, 0.28, 0.72, 1.0], ["-70%", "0%", "0%", "-70%"]);
  const rightX1 = useTransform(scrollYProgress, [0.04, 0.32, 0.68, 0.96], ["-80%", "0%", "0%", "-80%"]);
  const rightX2 = useTransform(scrollYProgress, [0.08, 0.36, 0.64, 0.92], ["-90%", "0%", "0%", "-90%"]);

  const rightOpacity0 = useTransform(scrollYProgress, [0, 0.22, 0.78, 1.0], [0, 1, 1, 0]);
  const rightOpacity1 = useTransform(scrollYProgress, [0.04, 0.26, 0.74, 0.96], [0, 1, 1, 0]);
  const rightOpacity2 = useTransform(scrollYProgress, [0.08, 0.30, 0.70, 0.92], [0, 1, 1, 0]);

  const rightScale0 = useTransform(scrollYProgress, [0, 0.28, 0.72, 1.0], [0.92, 1, 1, 0.92]);
  const rightScale1 = useTransform(scrollYProgress, [0.04, 0.32, 0.68, 0.96], [0.92, 1, 1, 0.92]);
  const rightScale2 = useTransform(scrollYProgress, [0.08, 0.36, 0.64, 0.92], [0.92, 1, 1, 0.92]);

  // Center Pillar scroll elevation & scale
  const centerScale = useTransform(scrollYProgress, [0, 0.25, 0.75, 1.0], [0.95, 1, 1, 0.95]);
  const centerOpacity = useTransform(scrollYProgress, [0, 0.18, 0.82, 1.0], [0.5, 1, 1, 0.5]);

  const leftCardsAnim = [
    { x: leftX0, opacity: leftOpacity0, scale: leftScale0 },
    { x: leftX1, opacity: leftOpacity1, scale: leftScale1 },
    { x: leftX2, opacity: leftOpacity2, scale: leftScale2 },
  ];

  const rightCardsAnim = [
    { x: rightX0, opacity: rightOpacity0, scale: rightScale0 },
    { x: rightX1, opacity: rightOpacity1, scale: rightScale1 },
    { x: rightX2, opacity: rightOpacity2, scale: rightScale2 },
  ];

  const leftItems = items.slice(0, 3);
  const rightItems = items.slice(3, 6);

  return (
    <section
      ref={sectionRef}
      id="why-choose-us"
      className="relative z-10 mx-auto max-w-[1720px] px-4 pt-6 sm:pt-10 sm:px-8 lg:px-12 xl:px-16 overflow-hidden"
    >
      {/* 3-COLUMN PILLAR LAYOUT WITH BIDIRECTIONAL SCROLL EMERGE/MERGE */}
      <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr_1.05fr] lg:items-stretch items-center relative">
        {/* LEFT 3 CARDS (Slides out on scroll down, merges under center on scroll up) */}
        <div className="flex flex-col gap-5 justify-between relative z-10">
          {leftItems.map((item, index) => {
            const Icon = item.icon;
            const anim = leftCardsAnim[index];

            return (
              <motion.div
                key={item.title}
                style={{
                  x: anim.x,
                  opacity: anim.opacity,
                  scale: anim.scale,
                }}
                className="flex-1 transform-gpu will-change-transform"
              >
                <motion.article
                  whileHover={{
                    x: -6,
                    y: -2,
                    scale: 1.015,
                    transition: { duration: 0.2, ease: "easeOut" },
                  }}
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] border border-slate-200/90 bg-white p-6 sm:p-7 shadow-[0_8px_24px_rgba(15,23,42,0.03)] transition-[border-color,box-shadow] duration-300 ease-out hover:border-blue-400/50 hover:shadow-[0_22px_50px_rgba(56,189,248,0.18)]"
                >
                  {/* Ambient radial glow on hover */}
                  <div
                    className={`pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-gradient-to-br ${item.gradient} opacity-0 blur-2xl transition-all duration-500 ease-out group-hover:scale-125 group-hover:opacity-100`}
                  />

                  {/* Horizontal visual connector pointing to center pillar on desktop */}
                  <div className="pointer-events-none hidden lg:block absolute right-0 top-1/2 h-[2px] w-6 translate-x-full -translate-y-1/2 bg-gradient-to-r from-blue-400/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div>
                    {/* Top Header: Icon */}
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-600 shadow-sm transition-all duration-300 ease-out group-hover:scale-110 group-hover:rotate-3 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-500 group-hover:text-white group-hover:shadow-[0_8px_20px_rgba(56,189,248,0.35)]">
                        <Icon
                          size={22}
                          className="transition-transform duration-300 ease-out group-hover:scale-105"
                        />
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h3 className="mt-4 font-heading text-[1.14rem] font-bold text-slate-950 transition-colors duration-200 group-hover:text-blue-600">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-[13.5px] leading-relaxed text-slate-600 transition-colors duration-200 group-hover:text-slate-700">
                      {item.description}
                    </p>
                  </div>
                </motion.article>
              </motion.div>
            );
          })}
        </div>

        {/* CENTER LONG PILLAR BOX (High z-index anchor so cards emerge from and merge behind it) */}
        <motion.div
          style={{
            scale: centerScale,
            opacity: centerOpacity,
          }}
          whileHover={{
            scale: 1.01,
            y: -3,
            transition: { duration: 0.25, ease: "easeOut" },
          }}
          className="group relative z-20 flex flex-col justify-between overflow-hidden rounded-[2.5rem] bg-[#070e1b] p-8 sm:p-10 text-white shadow-[0_24px_70px_rgba(7,14,27,0.35)] border border-slate-700/50 transform-gpu will-change-transform transition-[border-color,box-shadow] duration-300 ease-out hover:border-cyan-500/40 hover:shadow-[0_30px_80px_rgba(6,182,212,0.25)]"
        >
          {/* Futuristic AI & Human Intelligence Background Image with Smooth Gradient Overlay */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <img
              src={centerCardBg}
              alt="Human Intelligence Meets Intelligent Technology"
              className="h-full w-full object-cover object-center opacity-65 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-75"
            />
            {/* Soft Lighter Gradient Overlays for Vibrant Background & Sharp Readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#070e1b]/60 via-[#0b172a]/40 to-[#070e1b]/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070e1b]/75 via-transparent to-[#070e1b]/40" />
          </div>

          {/* Background Ambient Glows & Grid */}
          <div className="pointer-events-none absolute inset-0 bg-grid-fade opacity-10" />
          <div className="pointer-events-none absolute -top-20 -left-20 h-64 w-64 rounded-full bg-cyan-500/25 blur-3xl transition-all duration-500 ease-out group-hover:scale-125 group-hover:bg-cyan-500/35" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-blue-600/25 blur-3xl transition-all duration-500 ease-out group-hover:scale-125 group-hover:bg-blue-600/35" />

          {/* Top Indicator */}
          <div className="relative z-10 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-950/75 px-3.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.2em] text-cyan-300 backdrop-blur-md shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>Why Choose Us</span>
            </span>
          </div>

          {/* Centered Main Pillar Headline */}
          <div className="relative z-10 my-auto py-8 text-center">
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-[2.2rem] font-extrabold leading-[1.18] text-white tracking-tight text-center drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
              Human Intelligence
              <span className="my-2 block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 drop-shadow-[0_2px_10px_rgba(6,182,212,0.3)]">
                Meets
              </span>
              Intelligent Technology
            </h2>
          </div>

          {/* Bottom Capability Highlights */}
          <div className="relative z-10 border-t border-white/10 pt-6">
            <div className="flex flex-wrap justify-center gap-2">
              {[
                "Human Empathy",
                "AI Precision",
                "Scalable Growth",
                "End-to-End Delivery",
              ].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold text-slate-300 transition-colors duration-200 group-hover:border-cyan-400/40 group-hover:text-cyan-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* RIGHT 3 CARDS (Slides out on scroll down, merges under center on scroll up) */}
        <div className="flex flex-col gap-5 justify-between relative z-10">
          {rightItems.map((item, index) => {
            const Icon = item.icon;
            const anim = rightCardsAnim[index];

            return (
              <motion.div
                key={item.title}
                style={{
                  x: anim.x,
                  opacity: anim.opacity,
                  scale: anim.scale,
                }}
                className="flex-1 transform-gpu will-change-transform"
              >
                <motion.article
                  whileHover={{
                    x: 6,
                    y: -2,
                    scale: 1.015,
                    transition: { duration: 0.2, ease: "easeOut" },
                  }}
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] border border-slate-200/90 bg-white p-6 sm:p-7 shadow-[0_8px_24px_rgba(15,23,42,0.03)] transition-[border-color,box-shadow] duration-300 ease-out hover:border-cyan-400/50 hover:shadow-[0_22px_50px_rgba(6,182,212,0.18)]"
                >
                  {/* Ambient radial glow on hover */}
                  <div
                    className={`pointer-events-none absolute -left-10 -top-10 h-36 w-36 rounded-full bg-gradient-to-br ${item.gradient} opacity-0 blur-2xl transition-all duration-500 ease-out group-hover:scale-125 group-hover:opacity-100`}
                  />

                  {/* Horizontal visual connector pointing to center pillar on desktop */}
                  <div className="pointer-events-none hidden lg:block absolute left-0 top-1/2 h-[2px] w-6 -translate-x-full -translate-y-1/2 bg-gradient-to-l from-cyan-400/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div>
                    {/* Top Header: Icon */}
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-50 to-teal-50 text-cyan-600 shadow-sm transition-all duration-300 ease-out group-hover:scale-110 group-hover:rotate-3 group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-teal-500 group-hover:text-white group-hover:shadow-[0_8px_20px_rgba(6,182,212,0.35)]">
                        <Icon
                          size={22}
                          className="transition-transform duration-300 ease-out group-hover:scale-105"
                        />
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h3 className="mt-4 font-heading text-[1.14rem] font-bold text-slate-950 transition-colors duration-200 group-hover:text-cyan-600">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-[13.5px] leading-relaxed text-slate-600 transition-colors duration-200 group-hover:text-slate-700">
                      {item.description}
                    </p>
                  </div>
                </motion.article>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
