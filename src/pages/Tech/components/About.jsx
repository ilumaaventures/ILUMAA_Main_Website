import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function About() {
  const containerRef = useRef(null);
  const [cityData, setCityData] = useState({ buildings: [], roads: [], beacons: [] });

  // Generate deterministic city elements on mount
  useEffect(() => {
    const totalWidth = 1200;
    const groundY = 460;
    let currentX = 10;
    const tempBuildings = [];
    const tempBeacons = [];
    const tempRoads = [];

    // Construct random skyscrapers
    while (currentX < totalWidth - 65) {
      const bWidth = Math.floor(Math.random() * 35) + 50; // 50px to 85px wide
      const bHeight = Math.floor(Math.random() * 260) + 120; // 120px to 380px tall
      const bX = currentX;
      const bY = groundY - bHeight;

      // Window grid layout
      const cols = Math.floor(bWidth / 12);
      const rows = Math.floor(bHeight / 16);
      const windows = [];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          // 40% probability window is active
          if (Math.random() < 0.45) {
            windows.push({
              cx: bX + 6 + c * 10,
              cy: bY + 8 + r * 13,
              r: 1.5,
              opacity: Math.random() * 0.75 + 0.25,
              blinkDelay: `${(Math.random() * 4).toFixed(2)}s`,
              blinkDuration: `${(Math.random() * 3 + 2).toFixed(2)}s`,
            });
          }
        }
      }

      // Add caution beacon light at center roof
      if (bHeight > 240) {
        tempBeacons.push({
          cx: bX + bWidth / 2,
          cy: bY - 2,
          r: 2.2,
          color: Math.random() > 0.4 ? "var(--cyan-glow)" : "var(--purple-glow)",
        });
      }

      tempBuildings.push({
        x: bX,
        y: bY,
        width: bWidth,
        height: bHeight,
        windows,
      });

      currentX += bWidth + (Math.floor(Math.random() * 12) + 4); // dynamic gaps
    }

    // Setup network highways (roads)
    tempRoads.push(`M 0 ${groundY} L 1200 ${groundY}`);
    tempRoads.push(`M 0 ${groundY + 20} L 1200 ${groundY + 20}`);
    tempRoads.push(`M 0 ${groundY + 40} L 1200 ${groundY + 40}`);

    // Converging perspective data links
    for (let i = 0; i < 9; i++) {
      const startX = 80 + i * 130;
      const endX = startX - 70;
      tempRoads.push(`M ${startX} ${groundY} L ${endX} 520`);
    }

    setCityData({ buildings: tempBuildings, roads: tempRoads, beacons: tempBeacons });
  }, []);

  // GSAP scroll triggers for page entrances
  useEffect(() => {
    if (!containerRef.current) return;

    const head = containerRef.current.querySelector(".section-head");
    const city = containerRef.current.querySelector(".city");
    const legend = containerRef.current.querySelector(".about-legend");
    const triggers = [];

    [head, city, legend].forEach((el) => {
      if (!el) return;
      const anim = gsap.fromTo(
        el,
        { opacity: 0, y: 70, rotateX: 8, transformPerspective: 800 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
      if (anim.scrollTrigger) triggers.push(anim.scrollTrigger);
    });

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section id="about" ref={containerRef}>
      <style>{`
        @keyframes blinkWin {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.95; }
        }
        .blink-win {
          animation: blinkWin var(--bdur, 3s) infinite ease-in-out;
          animation-delay: var(--bdel, 0s);
        }
        @keyframes pulseBeacon {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        .pulse-beacon {
          animation: pulseBeacon 1.8s infinite ease-in-out;
        }
      `}</style>

      <div className="section-head">
        <div className="eyebrow">About IlumaaTech</div>
        <h2>
          We think in
          <br />
          <span className="grad-text">city-scale systems.</span>
        </h2>
      </div>

      <div className="city" id="city">
        <div className="city-caption">
          <p>
            Every product we ship is a building. Every API is a road that connects them. Every user is a light left on
            at night.
          </p>
        </div>

        <svg viewBox="0 0 1200 520" preserveAspectRatio="none" id="citySvg">
          <defs>
            <linearGradient id="bgrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#1a1440" />
              <stop offset="1" stopColor="#0a0a18" />
            </linearGradient>
            <linearGradient id="road" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#22d3ee" stopOpacity="0" />
              <stop offset="0.5" stopColor="#22d3ee" stopOpacity="0.9" />
              <stop offset="1" stopColor="#22d3ee" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Render Buildings */}
          <g id="buildings">
            {cityData.buildings.map((b, bIdx) => (
              <g key={bIdx}>
                <rect
                  x={b.x}
                  y={b.y}
                  width={b.width}
                  height={b.height}
                  fill="url(#bgrad)"
                  stroke="var(--line)"
                  strokeWidth="1"
                />
                {/* Lit Windows */}
                {b.windows.map((w, wIdx) => (
                  <circle
                    key={wIdx}
                    cx={w.cx}
                    cy={w.cy}
                    r={w.r}
                    fill="var(--cyan-glow)"
                    className="blink-win"
                    style={{
                      "--bdel": w.blinkDelay,
                      "--bdur": w.blinkDuration,
                    }}
                  />
                ))}
              </g>
            ))}
          </g>

          {/* Render Roads */}
          <g id="roads">
            {cityData.roads.map((path, idx) => (
              <path key={idx} d={path} stroke="url(#road)" strokeWidth="1.5" fill="none" />
            ))}
          </g>

          {/* Render warning Beacons */}
          <g id="lights">
            {cityData.beacons.map((beacon, idx) => (
              <circle
                key={idx}
                cx={beacon.cx}
                cy={beacon.cy}
                r={beacon.r}
                fill={beacon.color}
                className="pulse-beacon"
              />
            ))}
          </g>
        </svg>
      </div>

      <div className="about-legend">
        <div className="legend-item" data-cursor="hover">
          <b>Buildings — Products</b>
          <p>Fifty-plus platforms shipped since 2016, each engineered to stand on its own.</p>
        </div>
        <div className="legend-item" data-cursor="hover">
          <b>Roads — APIs</b>
          <p>Every system we build talks to every other one, over infrastructure we own end-to-end.</p>
        </div>
        <div className="legend-item" data-cursor="hover">
          <b>Lights — Users</b>
          <p>Millions of active sessions a month, across products most people never see the seams of.</p>
        </div>
      </div>
    </section>
  );
}

export default About;
