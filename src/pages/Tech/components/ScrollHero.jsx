import React, { useEffect, useRef } from "react";

const ScrollHero = ({ onProgressUpdate, onPreloadComplete }) => {
  const videoRef = useRef(null);
  const heroVideoSrc = `${import.meta.env.BASE_URL}tech-hero-pingpong.mp4`;

  useEffect(() => {
    // Notify preloader that assets are ready
    const timer = setTimeout(() => {
      if (onProgressUpdate) onProgressUpdate(100);
      if (onPreloadComplete) onPreloadComplete();
    }, 450);

    return () => clearTimeout(timer);
  }, [onProgressUpdate, onPreloadComplete]);

  return (
    <section id="scroll-hero" aria-label="ILUMAA introduction" className="relative h-screen min-h-[600px] w-full overflow-hidden bg-transparent">
      <div className="pin relative h-full w-full overflow-hidden bg-transparent">
        {/* Seamless Hardware-Accelerated Ping-Pong (Forward + Backward) Video */}
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

        {/* Hero Content Overlay */}
        <div className="hero-overlay relative z-10 flex h-full w-full items-center justify-center text-center">
          <div className="beat beat-1 flex flex-col items-center justify-center gap-5 px-6">
            <p className="eyebrow inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-white/80 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-sky-600 shadow-sm backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-500 animate-pulse" />
              Technology &bull; AI &bull; Human Intelligence
            </p>
            <h1 className="text-slate-900 font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight drop-shadow-[0_2px_16px_rgba(255,255,255,0.85)]">
              Building Scalable
              <br />
              Digital Platforms
            </h1>
            <p className="hero-subtitle text-slate-700 text-lg sm:text-xl font-medium max-w-2xl drop-shadow-[0_1px_8px_rgba(255,255,255,0.7)]">
              with Human-Centered Innovation
            </p>
            <div className="hero-ctas mt-4 flex flex-wrap items-center justify-center gap-4">
              <a href="#contact" className="btn-primary shadow-[0_12px_30px_rgba(37,99,235,0.35)] transition duration-300 hover:scale-[1.03]">
                Start Your Digital Journey
              </a>
              <a href="#projects" className="btn-secondary rounded-full border border-slate-200/90 bg-white/80 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-slate-800 shadow-md backdrop-blur-md transition duration-300 hover:scale-[1.03] hover:border-slate-300 hover:bg-white">
                Explore Our Solutions
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Cue */}
        <div className="scroll-cue" id="scrollCue">
          <span>Scroll</span>
          <i />
        </div>
      </div>
    </section>
  );
};

export default ScrollHero;
