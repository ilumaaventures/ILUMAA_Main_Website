import React, { useEffect, useRef } from "react";

const FRAME_COUNT = 238;
const BG_COLOR = "#CBCED3";
const EASE_AMOUNT = 0.09;
const SNAP_THRESHOLD = 0.02;

// Eagerly glob all 238 frame images from assets
const frameModules = import.meta.glob("../../../assets/frames/*.jpg", {
  eager: true,
  import: "default",
});

const sortedFrameUrls = Object.keys(frameModules)
  .sort()
  .map((key) => frameModules[key]);

const fadeRange = (p, inStart, inEnd, outStart, outEnd) => {
  let o = 0;
  if (p <= inStart || p >= outEnd) o = 0;
  else if (p < inEnd) o = (p - inStart) / (inEnd - inStart);
  else if (p < outStart) o = 1;
  else o = 1 - (p - outStart) / (outEnd - outStart);
  return Math.max(0, Math.min(1, o));
};

const ScrollHero = ({ onProgressUpdate, onPreloadComplete }) => {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const beat1Ref = useRef(null);
  const beat2Ref = useRef(null);
  const beat3Ref = useRef(null);
  const scrollCueRef = useRef(null);

  useEffect(() => {
    const heroSection = heroRef.current;
    const canvas = canvasRef.current;
    if (!heroSection || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const images = new Array(FRAME_COUNT);
    let loadedCount = 0;

    let targetFrame = 0;
    let currentFrame = 0;
    let progress = 0;
    let rafId = null;

    let cw = window.innerWidth;
    let ch = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resizeCanvas = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cw = window.innerWidth;
      ch = window.innerHeight;
      canvas.width = Math.round(cw * dpr);
      canvas.height = Math.round(ch * dpr);
      canvas.style.width = `${cw}px`;
      canvas.style.height = `${ch}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawFrame(Math.round(currentFrame));
    };

    const drawFrame = (index) => {
      const idx = Math.max(1, Math.min(FRAME_COUNT - 1, index));
      const img = images[idx];
      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, cw, ch);
      if (!img || !img.naturalWidth) return;

      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;
      ctx.drawImage(img, dx, dy, dw, dh);
    };

    const computeProgress = () => {
      const rect = heroSection.getBoundingClientRect();
      const scrollDistance = heroSection.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      progress = Math.max(
        0,
        Math.min(1, scrollDistance > 0 ? scrolled / scrollDistance : 0),
      );
      targetFrame = progress * (FRAME_COUNT - 1);
    };

    const updateBeats = () => {
      if (progress <= 0.01) {
        beat1Ref.current.style.opacity = "1";
        beat1Ref.current.style.transform = "translateY(0)";
        beat1Ref.current.style.pointerEvents = "auto";

        beat2Ref.current.style.opacity = "0";
        beat3Ref.current.style.opacity = "0";
        return;
      }
      const beats = [
        { el: beat1Ref.current, range: [0, 0.05, 0.16, 0.24] },
        { el: beat2Ref.current, range: [0.3, 0.37, 0.52, 0.6] },
        { el: beat3Ref.current, range: [0.66, 0.74, 1.0, 1.0] },
      ];

      beats.forEach(({ el, range }) => {
        if (!el) return;
        const o = fadeRange(progress, ...range);
        el.style.opacity = o.toFixed(3);
        el.style.transform = `translateY(${(1 - o) * 28}px)`;
        el.style.pointerEvents = o > 0.5 ? "auto" : "none";
      });

      if (scrollCueRef.current) {
        scrollCueRef.current.style.opacity = progress > 0.03 ? "0" : "1";
      }
    };

    const tick = () => {
      computeProgress();

      const diff = targetFrame - currentFrame;
      if (Math.abs(diff) < SNAP_THRESHOLD || prefersReducedMotion) {
        currentFrame = targetFrame;
      } else {
        currentFrame += diff * EASE_AMOUNT;
      }

      drawFrame(Math.round(currentFrame));
      updateBeats();

      rafId = requestAnimationFrame(tick);
    };

    // Preload image elements
    const updateProgress = () => {
      const pct = Math.round((loadedCount / sortedFrameUrls.length) * 100);
      if (onProgressUpdate) onProgressUpdate(pct);
    };

    let isSubscribed = true;

    const preloadAll = async () => {
      const loadPromises = sortedFrameUrls.map((url, i) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.decoding = "async";
          img.onload = () => {
            if (!isSubscribed) return resolve();
            loadedCount++;
            updateProgress();
            resolve(img);
          };
          img.onerror = () => {
            if (!isSubscribed) return resolve();
            loadedCount++;
            updateProgress();
            resolve(img);
          };
          img.src = url;
          images[i] = img;
        });
      });

      await Promise.all(loadPromises);

      if (isSubscribed) {
        resizeCanvas();
        computeProgress();
        currentFrame = targetFrame;
        drawFrame(Math.round(currentFrame));
        updateBeats();
        if (onPreloadComplete) onPreloadComplete();
      }
    };

    resizeCanvas();
    preloadAll();

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resizeCanvas, 120);
    };

    window.addEventListener("resize", handleResize);
    rafId = requestAnimationFrame(tick);

    return () => {
      isSubscribed = false;
      window.removeEventListener("resize", handleResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [onProgressUpdate, onPreloadComplete]);

  return (
    <section id="scroll-hero" ref={heroRef} aria-label="ILUMAA introduction">
      <div className="pin">
        <canvas id="scene" ref={canvasRef} aria-hidden="true" />

        <div className="hero-overlay">
          <div className="beat beat-1" ref={beat1Ref}>
            <p className="eyebrow">
              Technology &bull; AI &bull; Human Intelligence
            </p>
            <h1>
              Building Scalable
              <br />
              Digital Platforms
            </h1>
            <p className="hero-subtitle">with Human-Centered Innovation</p>
            <div className="hero-ctas">
              <a href="#contact" className="btn-primary">
                Start Your Digital Journey
              </a>
              <a href="#solutions" className="btn-secondary">
                Explore Our Solutions
              </a>
            </div>
          </div>

          <div
            className="beat beat-2 flex flex-col items-center justify-center text-center w-full max-w-6xl mx-auto px-5 sm:px-6 md:px-10 lg:px-16 py-8"
            ref={beat2Ref}
          >
            <p className="mb-3 text-[11px] sm:text-xs md:text-sm font-semibold uppercase tracking-[0.25em] text-slate-600 text-blue-700">
              Our Approach
            </p>

            <h2 className="max-w-5xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.15] text-slate-900">
              Every platform,
              <br />
              engineered with purpose.
            </h2>

            <p className="mt-5 max-w-2xl text-sm sm:text-base md:text-lg lg:text-xl leading-7 text-slate-100">
              We blend AI, cloud, and automation to build secure, scalable
              digital solutions that help businesses grow faster.
            </p>

            <div className="mt-8 grid w-full max-w-3xl grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl border border-slate-300 bg-white/80 p-4 shadow-md backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <h3 className="text-base md:text-lg font-semibold text-slate-900">
                  AI Powered
                </h3>
              </div>

              <div className="rounded-xl border border-slate-300 bg-white/80 p-4 shadow-md backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <h3 className="text-base md:text-lg font-semibold text-slate-900">
                  Cloud Ready
                </h3>
              </div>

              <div className="rounded-xl border border-slate-300 bg-white/80 p-4 shadow-md backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <h3 className="text-base md:text-lg font-semibold text-slate-900">
                  Future Ready
                </h3>
              </div>
            </div>
          </div>
          <div
            className="beat beat-3 flex flex-col items-center justify-center text-center w-full max-w-6xl mx-auto px-5 sm:px-6 md:px-10 lg:px-16 py-8"
            ref={beat3Ref}
          >
            <p className="mb-3 text-[11px] sm:text-xs md:text-sm font-semibold uppercase tracking-[0.25em] text-blue-600  ">
              The Result
            </p>

            <h2 className="max-w-5xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.15] text-slate-900">
              One Core.
              <br />
              Infinite Scale.
            </h2>

            <p className="mt-5 max-w-2xl px-2 text-sm sm:text-base md:text-lg lg:text-xl leading-7 text-slate-100">
              One intelligent platform that connects your business, automates
              workflows, and helps you scale with confidence.
            </p>

            {/* Highlights */}
            <div className="mt-8 grid w-full max-w-3xl grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="rounded-xl border border-slate-300 bg-white/80 p-4 shadow-md backdrop-blur-md">
                <span className="text-sm md:text-base font-semibold text-slate-900">
                  AI
                </span>
              </div>

              <div className="rounded-xl border border-slate-300 bg-white/80 p-4 shadow-md backdrop-blur-md">
                <span className="text-sm md:text-base font-semibold text-slate-900">
                  Cloud
                </span>
              </div>

              <div className="rounded-xl border border-slate-300 bg-white/80 p-4 shadow-md backdrop-blur-md col-span-2 sm:col-span-1">
                <span className="text-sm md:text-base font-semibold text-slate-900">
                  Automation
                </span>
              </div>
            </div>

            {/* CTA */}
            <div className="hero-ctas mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
              <a
                href="#contact"
                className="btn-primary w-full sm:w-auto text-center"
              >
                Get Started
              </a>

              <a
                href="#solutions"
                className="btn-secondary w-full sm:w-auto text-center"
              >
                Our Solutions
              </a>
            </div>
          </div>
        </div>

        <div className="scroll-cue" id="scrollCue" ref={scrollCueRef}>
          <span>Scroll</span>
          <i />
        </div>
      </div>
    </section>
  );
};

export default ScrollHero;
