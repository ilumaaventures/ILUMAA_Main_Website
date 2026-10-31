import React, { useEffect, useRef } from "react";

export default function TechMatrixGridArch() {
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

    // Mouse coordinates
    const mouse = { x: -9999, y: -9999, radius: 100 };

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

    // Arch contour equation
    const getCurveY = (x, w, h) => {
      const normX = (x - w / 2) / (w / 2); // -1 at left, 0 at center, 1 at right
      const crestY = h * 0.12;             // Top peak of curve in center
      const edgeY = h * 0.46;              // Lower edge on sides
      return crestY + normX * normX * (edgeY - crestY);
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

    // Radar / Laser Sweep parameters
    let sweepX = -100;
    const sweepSpeed = 2.4; // px per frame
    const sweepWidth = 140; // width of beam gradient

    // Telemetry node coordinates (special pulsing hubs)
    const getTelemetryNodes = (w, h) => [
      { x: w * 0.18, label: "LATENCY < 10ms", tag: "SYS-01" },
      { x: w * 0.38, label: "99.99% UPTIME", tag: "CLUSTER-A" },
      { x: w * 0.62, label: "CLOUD MESH: ACTIVE", tag: "EDGE-V4" },
      { x: w * 0.82, label: "AI INFERENCE: NOMINAL", tag: "NPU-CORE" },
    ];

    let time = 0;
    const dotSpacing = 22; // Micro-dot grid gap

    const render = () => {
      animId = requestAnimationFrame(render);
      if (!isVisible || width === 0 || height === 0) return;

      time += 0.02;
      sweepX += sweepSpeed;
      if (sweepX > width + sweepWidth + 100) {
        sweepX = -sweepWidth - 80;
      }

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

      // 2. Ambient Sweeping Radar Beam (Vertical gradient bar traveling horizontally)
      const sweepGrad = ctx.createLinearGradient(
        sweepX - sweepWidth,
        0,
        sweepX + sweepWidth,
        0
      );
      sweepGrad.addColorStop(0, "rgba(6, 182, 212, 0)");
      sweepGrad.addColorStop(0.5, "rgba(6, 182, 212, 0.09)");
      sweepGrad.addColorStop(0.85, "rgba(37, 99, 235, 0.14)");
      sweepGrad.addColorStop(1, "rgba(6, 182, 212, 0)");

      ctx.fillStyle = sweepGrad;
      ctx.fillRect(sweepX - sweepWidth, 0, sweepWidth * 2, height);

      // Sharp sweeping laser beam line
      ctx.beginPath();
      ctx.moveTo(sweepX, 0);
      ctx.lineTo(sweepX, height);
      ctx.strokeStyle = "rgba(6, 182, 212, 0.28)";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // 3. Render Micro-Dot Matrix Grid
      for (let x = dotSpacing / 2; x < width; x += dotSpacing) {
        const topLimit = getCurveY(x, width, height) + 6;

        for (let y = topLimit; y < height - 6; y += dotSpacing) {
          // Distance from sweeping laser beam
          const distSweep = Math.abs(x - sweepX);
          const sweepFactor =
            distSweep < sweepWidth ? 1 - distSweep / sweepWidth : 0;

          // Distance from user mouse pointer
          const mDist = Math.hypot(x - mouse.x, y - mouse.y);
          const mouseFactor =
            mDist < mouse.radius ? 1 - mDist / mouse.radius : 0;

          const activeFactor = Math.max(sweepFactor, mouseFactor);

          ctx.beginPath();

          if (activeFactor > 0.05) {
            // Illuminated active dot
            const radius = 1.3 + activeFactor * 1.5;
            ctx.arc(x, y, radius, 0, Math.PI * 2);

            // Glowing cyan to electric blue
            const alpha = 0.25 + activeFactor * 0.75;
            ctx.fillStyle = `rgba(6, 182, 212, ${alpha.toFixed(3)})`;
            ctx.fill();

            // Subtle halo for intense dots
            if (activeFactor > 0.6) {
              ctx.beginPath();
              ctx.arc(x, y, radius * 2.5, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(2, 132, 199, ${(activeFactor * 0.2).toFixed(3)})`;
              ctx.fill();
            }
          } else {
            // Idle dormant micro-dot
            ctx.arc(x, y, 1.15, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(148, 163, 184, 0.28)"; // Crisp subtle slate
            ctx.fill();
          }
        }
      }

      // 4. Render Telemetry Hub Nodes & Floating Badges
      const hubs = getTelemetryNodes(width, height);
      hubs.forEach((hub, idx) => {
        const curveY = getCurveY(hub.x, width, height);
        const hubY = curveY + (height - curveY) * 0.42;

        // Pulsing radar ping ring around the node
        const pingTime = (time * 1.8 + idx * 1.2) % 2.5;
        const pingRadius = 4 + pingTime * 10;
        const pingAlpha = Math.max(0, 0.6 - pingTime * 0.24);

        ctx.beginPath();
        ctx.arc(hub.x, hubY, pingRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(6, 182, 212, ${pingAlpha.toFixed(3)})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Solid Hub Dot
        ctx.beginPath();
        ctx.arc(hub.x, hubY, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#0284c7";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(hub.x, hubY, 1.4, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();

        // Connect vertical micro-lead line to badge
        ctx.beginPath();
        ctx.moveTo(hub.x, hubY - 5);
        ctx.lineTo(hub.x, hubY - 14);
        ctx.strokeStyle = "rgba(2, 132, 199, 0.4)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Sleek Telemetry Badge Card
        const badgeW = 105;
        const badgeH = 18;
        const badgeX = hub.x - badgeW / 2;
        const badgeY = hubY - 32;

        // Badge Pill Background
        ctx.beginPath();
        ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 9);
        ctx.fillStyle = "rgba(255, 255, 255, 0.92)";
        ctx.fill();
        ctx.strokeStyle = "rgba(2, 132, 199, 0.28)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Blinking status dot inside badge
        const blinkAlpha = 0.4 + Math.sin(time * 3 + idx) * 0.6;
        ctx.beginPath();
        ctx.arc(badgeX + 9, badgeY + badgeH / 2, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6, 182, 212, ${blinkAlpha.toFixed(2)})`;
        ctx.fill();

        // Badge Text
        ctx.fillStyle = "#0369a1";
        ctx.font =
          "bold 7.5px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
        ctx.fillText(hub.label, badgeX + 16, badgeY + badgeH / 2 + 2.5);
      });

      // 5. Subtle Technical Crosshairs & Coordinates
      [
        [width * 0.08, height * 0.48],
        [width * 0.5, height * 0.22],
        [width * 0.92, height * 0.48],
      ].forEach(([cx, cy]) => {
        ctx.beginPath();
        ctx.moveTo(cx - 5, cy);
        ctx.lineTo(cx + 5, cy);
        ctx.moveTo(cx, cy - 5);
        ctx.lineTo(cx, cy + 5);
        ctx.strokeStyle = "rgba(2, 132, 199, 0.25)";
        ctx.lineWidth = 1;
        ctx.stroke();
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
        className="w-full h-full block cursor-crosshair"
        style={{ touchAction: "none" }}
      />
    </div>
  );
}
