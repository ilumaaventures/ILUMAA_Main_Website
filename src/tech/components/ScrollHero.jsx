import React, { useEffect, useRef } from "react";

const ScrollHero = ({ onProgressUpdate, onPreloadComplete }) => {
  const videoRef = useRef(null);
  const heroVideoSrc = `${import.meta.env.BASE_URL}tech-hero-energy.mp4`;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.volume = 0;
    }

    // Notify preloader that assets are ready
    const timer = setTimeout(() => {
      if (onProgressUpdate) onProgressUpdate(100);
      if (onPreloadComplete) onPreloadComplete();
    }, 450);

    return () => clearTimeout(timer);
  }, [onProgressUpdate, onPreloadComplete]);

  return (
    <section
      id="scroll-hero"
      aria-label="ILUMAA introduction"
      className="relative h-screen min-h-[680px] w-full overflow-hidden bg-[#070e1b]"
    >
      <div className="pin relative h-full w-full overflow-hidden bg-[#070e1b]">
        {/* Hardware-Accelerated 1080p Energy Logo Reveal Video */}
        <video
          ref={videoRef}
          src={heroVideoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
          onLoadedData={() => {
            if (onProgressUpdate) onProgressUpdate(100);
            if (onPreloadComplete) onPreloadComplete();
          }}
        />

        {/* Ambient Dark Overlay for Typography Readability */}
        <div className="pointer-events-none absolute inset-0 z-[2] bg-black/25 bg-gradient-to-b from-black/40 via-transparent to-black/55" />

        {/* Hero Content Overlay */}
        <div className="hero-overlay relative z-10 flex h-full w-full items-center justify-center text-center pb-16 sm:pb-28">
          <div className="beat beat-1 flex flex-col items-center justify-center gap-4 sm:gap-5 px-6 max-w-5xl -translate-y-8 sm:-translate-y-14">
            <p className="eyebrow inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-black/40 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-sky-300 shadow-sm backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
              Technology &bull; AI &bull; Human Intelligence
            </p>
            <h1 className="font-heading text-2xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold leading-[1.15] tracking-tight !text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)] sm:whitespace-nowrap">
              Building Scalable Digital Platforms
            </h1>
            <p className="hero-subtitle !text-slate-100 text-base sm:text-lg font-medium max-w-2xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.75)]">
              with Human-Centered Innovation
            </p>
          </div>
        </div>

        {/* Hero Docked Tab CTAs starting from the extreme right edge with a completely straight right side */}
        <div className="hero-ctas pointer-events-auto absolute right-0 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3.5 items-end">
          <a
            href="#connect"
            className="btn-primary flex items-center justify-center w-auto min-w-[290px] text-center !rounded-r-none !rounded-l-full border-y border-l border-cyan-300/40 !border-r-0 bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 pl-7 pr-6 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-white shadow-[-10px_10px_25px_rgba(37,99,235,0.45)] transition-all duration-300 hover:-translate-x-2 hover:brightness-110 whitespace-nowrap"
          >
            Start Your Digital Journey
          </a>
          <a
            href="#projects"
            onClick={(e) => {
              const el = document.getElementById("projects");
              if (el) {
                e.preventDefault();
                const navEl = document.querySelector("header");
                const navHeight = navEl ? navEl.offsetHeight : 68;
                const targetY = Math.max(0, el.getBoundingClientRect().top + window.scrollY - (navHeight - 1));
                window.scrollTo({ top: targetY, behavior: "smooth" });
              }
            }}
            className="btn-secondary flex items-center justify-center w-auto min-w-[290px] text-center !rounded-r-none !rounded-l-full border-y border-l border-white/40 !border-r-0 bg-white/15 pl-7 pr-6 py-3.5 text-xs font-bold uppercase tracking-[0.12em] !text-white shadow-[-8px_8px_20px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all duration-300 hover:-translate-x-2 hover:border-white/70 hover:bg-white/25 hover:!text-white whitespace-nowrap"
          >
            Explore Our Solutions
          </a>
        </div>

        {/* Bottom Ambient Dark Gradient to smooth video edge */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Straight Horizontal Line Divider */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-px w-full bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
      </div>
    </section>
  );
};

export default ScrollHero;
