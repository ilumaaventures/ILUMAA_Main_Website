import React, { useEffect, useRef } from "react";

export default function TechConstellationArch() {
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

    // Mouse tracker
    const mouse = { x: -9999, y: -9999, radius: 140 };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    // Color palette for high-tech digital intelligence on white
    const colors = [
      { r: 2, g: 132, b: 199 },   // Sky / Cobalt #0284c7
      { r: 6, g: 182, b: 212 },   // Electric Cyan #06b6d4
      { r: 37, g: 99, b: 235 },   // Royal Blue #2563eb
      { r: 99, g: 102, b: 241 },  // Indigo #6366f1
    ];

    // Calculate curve height at any given x
    const getCurveY = (x, w, h) => {
      const normX = (x - w / 2) / (w / 2); // -1 to 1
      const crestY = h * 0.12;
      const edgeY = h * 0.46;
      return crestY + normX * normX * (edgeY - crestY);
    };

    let particles = [];
    let packets = [];

    const initParticles = () => {
      const count = Math.min(Math.max(Math.floor(width / 26), 36), 68);
      particles = [];

      for (let i = 0; i < count; i++) {
        const x = Math.random() * width;
        const minY = getCurveY(x, width, height) + 6;
        const maxY = height - 4;
        const y = minY + Math.random() * Math.max(maxY - minY, 10);
        const col = colors[Math.floor(Math.random() * colors.length)];

        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 0.55,
          vy: (Math.random() - 0.5) * 0.35,
          radius: Math.random() * 1.6 + 1.8,
          baseRadius: Math.random() * 1.6 + 1.8,
          pulseSpeed: Math.random() * 0.03 + 0.015,
          pulsePhase: Math.random() * Math.PI * 2,
          color: col,
          glow: Math.random() > 0.6,
        });
      }

      // Initialize Data Packets
      packets = [];
      for (let p = 0; p < 7; p++) {
        packets.push({
          sourceIdx: Math.floor(Math.random() * particles.length),
          targetIdx: Math.floor(Math.random() * particles.length),
          progress: Math.random(),
          speed: Math.random() * 0.012 + 0.008,
        });
      }
    };

    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = window.devicePixelRatio || 1;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      initParticles();
    };

    resize();
    window.addEventListener("resize", resize);

    // Pause when offscreen for 0% CPU consumption
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    // Main 60 FPS Render Loop
    let time = 0;
    const maxDist = 115;

    const render = () => {
      animId = requestAnimationFrame(render);
      if (!isVisible || width === 0 || height === 0) return;

      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // 1. Clip everything strictly to the upward white arch
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(-10, height * 0.46);
      ctx.quadraticCurveTo(width / 2, height * 0.1, width + 10, height * 0.46);
      ctx.lineTo(width + 10, height + 10);
      ctx.lineTo(-10, height + 10);
      ctx.closePath();
      ctx.clip();

      // 2. Draw gentle ambient grid lines following the arch
      ctx.strokeStyle = "rgba(2, 132, 199, 0.07)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 8]);
      ctx.beginPath();
      ctx.moveTo(0, height * 0.46 + 18);
      ctx.quadraticCurveTo(width / 2, height * 0.1 + 18, width, height * 0.46 + 18);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, height * 0.46 + 42);
      ctx.quadraticCurveTo(width / 2, height * 0.1 + 42, width, height * 0.46 + 42);
      ctx.stroke();
      ctx.setLineDash([]); // Reset line dash

      // 3. Update particle positions & boundaries
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Natural organic floating motion
        p.x += p.vx;
        p.y += p.vy;

        // Mouse reactive magnetic influence
        const mdx = mouse.x - p.x;
        const mdy = mouse.y - p.y;
        const mDist = Math.hypot(mdx, mdy);
        if (mDist < mouse.radius && mDist > 0) {
          const force = (1 - mDist / mouse.radius) * 0.45;
          p.x -= (mdx / mDist) * force;
          p.y -= (mdy / mDist) * force;
        }

        // Horizontal bounce/wrap
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Vertical boundary constrained by the arch curve & bottom bar
        const curveLimitY = getCurveY(p.x, width, height) + 6;
        if (p.y < curveLimitY) {
          p.y = curveLimitY;
          p.vy = Math.abs(p.vy) * 0.85;
        } else if (p.y > height - 4) {
          p.y = height - 4;
          p.vy = -Math.abs(p.vy) * 0.85;
        }

        // Radius pulsation
        p.radius = p.baseRadius + Math.sin(time * 2 + p.pulsePhase) * 0.4;
      }

      // 4. Draw Interconnecting Synapse Lines
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.28;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${p1.color.r}, ${p1.color.g}, ${p1.color.b}, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Connect to mouse pointer if nearby
        const mdx = mouse.x - p1.x;
        const mdy = mouse.y - p1.y;
        const mDist = Math.hypot(mdx, mdy);
        if (mDist < mouse.radius) {
          const mAlpha = (1 - mDist / mouse.radius) * 0.35;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(6, 182, 212, ${mAlpha.toFixed(3)})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }

      // 5. Update & Draw Traveling Data Packets (Pings)
      for (let k = 0; k < packets.length; k++) {
        const pkt = packets[k];
        const pSource = particles[pkt.sourceIdx];
        const pTarget = particles[pkt.targetIdx];

        if (!pSource || !pTarget) continue;

        const dist = Math.hypot(pSource.x - pTarget.x, pSource.y - pTarget.y);
        if (dist > maxDist * 1.3) {
          // Find a closer target pair
          pkt.sourceIdx = Math.floor(Math.random() * particles.length);
          pkt.targetIdx = (pkt.sourceIdx + 1 + Math.floor(Math.random() * (particles.length - 1))) % particles.length;
          pkt.progress = 0;
          continue;
        }

        pkt.progress += pkt.speed;
        if (pkt.progress >= 1) {
          // Packet reached destination, find next link
          pkt.sourceIdx = pkt.targetIdx;
          pkt.targetIdx = Math.floor(Math.random() * particles.length);
          pkt.progress = 0;
          continue;
        }

        // Interpolated packet position
        const px = pSource.x + (pTarget.x - pSource.x) * pkt.progress;
        const py = pSource.y + (pTarget.y - pSource.y) * pkt.progress;

        // Packet outer glowing halo
        ctx.beginPath();
        ctx.arc(px, py, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(6, 182, 212, 0.35)";
        ctx.fill();

        // Packet bright core
        ctx.beginPath();
        ctx.arc(px, py, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
      }

      // 6. Draw Nodes (Particles)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Soft outer ambient halo for glowing nodes
        if (p.glow) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 2.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0.12)`;
          ctx.fill();
        }

        // Inner solid node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${p.color.r}, ${p.color.g}, ${p.color.b})`;
        ctx.fill();

        // Micro highlight core
        ctx.beginPath();
        ctx.arc(p.x - p.radius * 0.3, p.y - p.radius * 0.3, p.radius * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
        ctx.fill();
      }

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
        className="w-full h-full block cursor-crosshair"
        style={{ touchAction: "none" }}
      />
    </div>
  );
}
