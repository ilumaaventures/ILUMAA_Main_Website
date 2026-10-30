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
      className="relative h-screen min-h-[700px] w-full overflow-hidden bg-[#070e1b]"
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
        <div className="hero-overlay relative z-10 flex h-full w-full items-center justify-center text-center pb-8 sm:pb-12">
          <div className="beat beat-1 flex flex-col items-center justify-center gap-4 sm:gap-5 px-6 max-w-4xl">
            <p className="eyebrow inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-black/40 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-sky-300 shadow-sm backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
              Technology &bull; AI &bull; Human Intelligence
            </p>
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight !text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
              Building Scalable
              <br />
              Digital Platforms
            </h1>
            <p className="hero-subtitle !text-slate-100 text-base sm:text-lg font-medium max-w-2xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.75)]">
              with Human-Centered Innovation
            </p>
            <div className="hero-ctas mt-3 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#connect"
                className="btn-primary rounded-full bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-white shadow-[0_12px_30px_rgba(37,99,235,0.45)] transition duration-300 hover:scale-[1.03] hover:brightness-110"
              >
                Start Your Digital Journey
              </a>
              <a
                href="#projects"
                className="btn-secondary rounded-full border border-white/40 bg-white/15 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.16em] !text-white shadow-md backdrop-blur-md transition duration-300 hover:scale-[1.03] hover:border-white/70 hover:bg-white/25 hover:!text-white"
              >
                Explore Our Solutions
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Ambient Dark Gradient to smooth video edge */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Bottom Upward Curve Divider - Pure White */}
        <div
          className="pointer-events-none absolute -bottom-20 sm:-bottom-24 md:-bottom-28 left-1/2 z-20 h-36 sm:h-44 md:h-52 w-[130%] sm:w-[122%] -translate-x-1/2 rounded-[100%] bg-white shadow-[0_-6px_24px_rgba(0,0,0,0.08)]"
          style={{ backgroundColor: "#ffffff" }}
        />
      </div>
    </section>
  );
};

export default ScrollHero;
