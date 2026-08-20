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

  useEffect(() => {
    const heroSection = heroRef.current;
    const canvas = canvasRef.current;
    if (!heroSection || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });

    const images = new Array(FRAME_COUNT);
    let loadedCount = 0;
    let currentFrame = 0;
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
      drawFrame(Math.floor(currentFrame));
    };

    const drawFrame = (index) => {
      const idx = Math.max(0, Math.min(FRAME_COUNT - 1, index));
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

    const tick = () => {
      currentFrame = (currentFrame + 0.35) % FRAME_COUNT;
      drawFrame(Math.floor(currentFrame));
      rafId = requestAnimationFrame(tick);
    };

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
        drawFrame(0);
        if (onPreloadComplete) onPreloadComplete();
        rafId = requestAnimationFrame(tick);
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
          <div className="beat beat-1">
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
              <a href="#projects" className="btn-secondary">
                Explore Our Solutions
              </a>
            </div>
          </div>
        </div>

        <div className="scroll-cue" id="scrollCue">
          <span>Scroll</span>
          <i />
        </div>
      </div>
    </section>
  );
};

export default ScrollHero;
