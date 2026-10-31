import React, { useEffect, useRef } from "react";

export default function TechWaveArch() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = null;
    let isVisible = true;
    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;

    // Mouse influence
    const mouse = { x: -9999, y: -9999, influence: 0 };
    let targetInfluence = 0;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      targetInfluence = 1;
    };

    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
      targetInfluence = 0;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = window.devicePixelRatio || 1;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    // Pause when offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    // Arch contour equation: calculates the top curve y for any given x
    const getCurveY = (x) => {
      const normX = (x - width / 2) / (width / 2); // -1 at left, 0 at center, 1 at right
      const crestY = height * 0.14; // Peak in the center
      const edgeY = height * 0.46;  // Ends on sides
      return crestY + normX * normX * (edgeY - crestY);
    };

    // Wave parameters: 3 layered flowing sine waves with unique harmonic frequencies
    const waves = [
      {
        baseOffset: 0.52,   // Y position relative to height
        amplitude: 14,
        frequency: 0.0038,
        speed: 0.022,
        phase: 0,
        fillGradient: ["rgba(6, 182, 212, 0.12)", "rgba(37, 99, 235, 0.01)"],
        strokeColor: "rgba(6, 182, 212, 0.55)",
        strokeWidth: 1.6,
      },
      {
        baseOffset: 0.62,
        amplitude: 18,
        frequency: 0.0028,
        speed: 0.017,
        phase: 2.1,
        fillGradient: ["rgba(37, 99, 235, 0.09)", "rgba(99, 102, 241, 0.01)"],
        strokeColor: "rgba(37, 99, 235, 0.45)",
        strokeWidth: 1.4,
      },
      {
        baseOffset: 0.72,
        amplitude: 12,
        frequency: 0.0045,
        speed: 0.028,
        phase: 4.2,
        fillGradient: ["rgba(99, 102, 241, 0.07)", "rgba(6, 182, 212, 0.01)"],
        strokeColor: "rgba(99, 102, 241, 0.38)",
        strokeWidth: 1.2,
      },
    ];

    // Traveling glowing data pulses along the wave crests
    const pulses = [
      { waveIdx: 0, progress: 0.1, speed: 0.0035, size: 2.8, color: "#06b6d4" },
      { waveIdx: 0, progress: 0.6, speed: 0.0042, size: 2.4, color: "#38bdf8" },
      { waveIdx: 1, progress: 0.3, speed: 0.0038, size: 2.6, color: "#2563eb" },
      { waveIdx: 1, progress: 0.8, speed: 0.0031, size: 2.2, color: "#60a5fa" },
      { waveIdx: 2, progress: 0.45, speed: 0.0048, size: 2.5, color: "#818cf8" },
    ];

    let time = 0;

    const render = () => {
      animId = requestAnimationFrame(render);
      if (!isVisible || width === 0 || height === 0) return;

      time += 0.016;
      mouse.influence += (targetInfluence - mouse.influence) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // 1. Clip strictly to the white arch
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(-10, height * 0.46);
      ctx.quadraticCurveTo(width / 2, height * 0.1, width + 10, height * 0.46);
      ctx.lineTo(width + 10, height + 10);
      ctx.lineTo(-10, height + 10);
      ctx.closePath();
      ctx.clip();

      // 2. Draw subtle cyber telemetry frequency lines (dotted background guidelines)
      ctx.save();
      ctx.setLineDash([3, 9]);
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(2, 132, 199, 0.1)";
      ctx.beginPath();
      ctx.moveTo(0, height * 0.5);
      ctx.quadraticCurveTo(width / 2, height * 0.22, width, height * 0.5);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, height * 0.7);
      ctx.quadraticCurveTo(width / 2, height * 0.42, width, height * 0.7);
      ctx.stroke();
      ctx.restore();

      // Step interval for smooth sine curve rendering
      const step = 6;
      const pointsPerWave = [];

      // 3. Render Each Layered Sine Wave
      waves.forEach((w, wIdx) => {
        const points = [];
        const currentPhase = time * w.speed * 60 + w.phase;

        ctx.beginPath();
        ctx.moveTo(0, height);

        for (let x = 0; x <= width + step; x += step) {
          // Base contour Y following the arch
          const archContour = getCurveY(x);
          const availableSpace = height - archContour;
          const baseY = archContour + availableSpace * w.baseOffset;

          // Multi-harmonic sine calculation for natural fluid ribbon motion
          const s1 = Math.sin(x * w.frequency + currentPhase);
          const s2 = Math.cos(x * w.frequency * 1.6 - currentPhase * 0.8) * 0.4;
          const s3 = Math.sin(x * w.frequency * 0.5 + currentPhase * 0.4) * 0.3;
          let waveDisplacement = (s1 + s2 + s3) * w.amplitude;

          // Local mouse ripple influence
          if (mouse.influence > 0.01) {
            const mDist = Math.abs(x - mouse.x);
            if (mDist < 160) {
              const mFactor = Math.cos((mDist / 160) * (Math.PI / 2)) * mouse.influence;
              waveDisplacement += Math.sin(time * 6 - mDist * 0.05) * 8 * mFactor;
            }
          }

          const y = baseY + waveDisplacement;
          points.push({ x, y });

          if (x === 0) {
            ctx.lineTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.lineTo(width, height);
        ctx.closePath();

        // Gradient Fill under the wave
        const grad = ctx.createLinearGradient(0, height * 0.2, 0, height);
        grad.addColorStop(0, w.fillGradient[0]);
        grad.addColorStop(1, w.fillGradient[1]);
        ctx.fillStyle = grad;
        ctx.fill();

        // Glowing Stroke on the wave line
        ctx.beginPath();
        points.forEach((pt, idx) => {
          if (idx === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        });
        ctx.strokeStyle = w.strokeColor;
        ctx.lineWidth = w.strokeWidth;
        ctx.stroke();

        pointsPerWave.push(points);
      });

      // 4. Render Glowing Data Pulses riding the wave crests
      pulses.forEach((pulse) => {
        pulse.progress += pulse.speed;
        if (pulse.progress >= 1) pulse.progress = 0;

        const wavePoints = pointsPerWave[pulse.waveIdx];
        if (!wavePoints || wavePoints.length < 2) return;

        // Find interpolated point along the wave
        const targetX = pulse.progress * width;
        const ptIdx = Math.min(
          Math.max(Math.floor(targetX / step), 0),
          wavePoints.length - 2
        );
        const p1 = wavePoints[ptIdx];
        const p2 = wavePoints[ptIdx + 1];

        if (!p1 || !p2) return;

        const fraction = (targetX - p1.x) / (p2.x - p1.x || 1);
        const px = p1.x + (p2.x - p1.x) * fraction;
        const py = p1.y + (p2.y - p1.y) * fraction;

        // Outer soft glowing halo
        ctx.beginPath();
        ctx.arc(px, py, pulse.size * 3.2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(6, 182, 212, 0.22)";
        ctx.fill();

        // Mid glow
        ctx.beginPath();
        ctx.arc(px, py, pulse.size * 1.6, 0, Math.PI * 2);
        ctx.fillStyle = pulse.color;
        ctx.fill();

        // Bright white core
        ctx.beginPath();
        ctx.arc(px, py, pulse.size * 0.7, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
      });

      ctx.restore();
    };

    animId = requestAnimationFrame(render);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="relative w-full h-full pointer-events-auto select-none overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-pointer"
        style={{ touchAction: "none" }}
      />
    </div>
  );
}
