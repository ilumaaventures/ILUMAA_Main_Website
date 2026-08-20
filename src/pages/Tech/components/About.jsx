import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function About() {
  const cityRef = useRef(null);
  const backLayerRef = useRef(null);
  const midLayerRef = useRef(null);
  const frontLayerRef = useRef(null);

  const [stats, setStats] = useState({
    projects: 0,
    uptime: 0,
    countries: 0,
    engineers: 0,
  });

  useEffect(() => {
    // Generate Procedural City Buildings
    const generateLayer = (layerEl, count, minH, maxH, winsMin, winsMax) => {
      if (!layerEl) return;
      layerEl.innerHTML = "";
      for (let i = 0; i < count; i++) {
        const b = document.createElement("div");
        b.className = "building";
        const h = minH + Math.floor(Math.random() * (maxH - minH));
        b.style.height = `${h}px`;
        b.style.width = `${18 + Math.floor(Math.random() * 16)}px`;

        const wins = winsMin + Math.floor(Math.random() * (winsMax - winsMin));
        for (let w = 0; w < wins; w++) {
          const win = document.createElement("div");
          win.className = "win";
          win.style.left = `${4 + Math.floor(Math.random() * 10)}px`;
          win.style.top = `${8 + Math.floor(Math.random() * (h - 16))}px`;
          win.style.animationDelay = `${(Math.random() * 4).toFixed(2)}s`;
          b.appendChild(win);
        }
        layerEl.appendChild(b);
      }
    };

    generateLayer(backLayerRef.current, 18, 120, 240, 3, 6);
    generateLayer(midLayerRef.current, 14, 160, 340, 5, 10);
    generateLayer(frontLayerRef.current, 10, 200, 420, 8, 16);

    // Data Stream Particle Spawner Interval
    const streamInterval = setInterval(() => {
      if (!cityRef.current) return;
      const s = document.createElement("div");
      s.className = "data-stream";
      s.style.left = `${10 + Math.random() * 80}%`;
      s.style.animationDuration = `${(2.4 + Math.random() * 1.8).toFixed(2)}s`;
      cityRef.current.appendChild(s);
      setTimeout(() => s.remove(), 4000);
    }, 800);

    // Parallax mouse movement over AI City
    const cityEl = cityRef.current;
    if (cityEl) {
      const handleMouseMove = (e) => {
        const rect = cityEl.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        if (backLayerRef.current)
          backLayerRef.current.style.transform = `translateX(${x * -12}px)`;
        if (midLayerRef.current)
          midLayerRef.current.style.transform = `translateX(${x * -24}px)`;
        if (frontLayerRef.current)
          frontLayerRef.current.style.transform = `translateX(${x * -42}px)`;
      };
      cityEl.addEventListener("mousemove", handleMouseMove);
    }

    // ScrollTrigger Animated Stat Counters
    const ctx = gsap.context(() => {
      const targetStats = {
        projects: 50,
        uptime: 99.98,
        countries: 24,
        engineers: 14,
      };

      const current = { projects: 0, uptime: 0, countries: 0, engineers: 0 };

      gsap.to(current, {
        projects: targetStats.projects,
        uptime: targetStats.uptime,
        countries: targetStats.countries,
        engineers: targetStats.engineers,
        duration: 2.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#about",
          start: "top 80%",
        },
        onUpdate: () => {
          setStats({
            projects: Math.floor(current.projects),
            uptime: current.uptime.toFixed(2),
            countries: Math.floor(current.countries),
            engineers: Math.floor(current.engineers),
          });
        },
      });

      // Stat cards scroll entrance animation
      const statCards = document.querySelectorAll(".about-stats .stat");
      if (statCards && statCards.length > 0) {
        gsap.fromTo(
          statCards,
          { opacity: 0, y: 40, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".about-stats",
              start: "top 85%",
            },
          },
        );

        // Hover animation for stat cards
        statCards.forEach((card) => {
          const handleMouseMove = (e) => {
            const r = card.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width - 0.5;
            const y = (e.clientY - r.top) / r.height - 0.5;
            gsap.to(card, {
              rotateY: x * 10,
              rotateX: -y * 10,
              scale: 1.05,
              duration: 0.3,
              ease: "power2.out",
            });
          };

          const handleMouseLeave = () => {
            gsap.to(card, {
              rotateY: 0,
              rotateX: 0,
              scale: 1,
              duration: 0.6,
              ease: "power3.out",
            });
          };

          card.addEventListener("mousemove", handleMouseMove);
          card.addEventListener("mouseleave", handleMouseLeave);
        });
      }
    });

    return () => {
      clearInterval(streamInterval);
      ctx.revert();
    };
  }, []);

  return (
    <section id="about" className="section about">
      <div className="about-copy">
        <span className="eyebrow">About IlumaaTech</span>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(2rem,3.6vw,3rem)",
            lineHeight: 1.1,
            margin: "18px 0 22px",
          }}
        >
          We build the <span className="grad-text">infrastructure</span> behind
          intelligent products.
        </h2>
        <p>
          Founded by engineers who shipped platforms at scale before AI made it
          fashionable, IlumaaTech partners with teams who need software that
          actually works under real load, real data and real users.
        </p>
        <p>
          Every building in our city below is a live product. Every road, an API
          connecting it to the rest of the system. Every light, a person using
          it right now.
        </p>
        <div className="about-stats">
          <div className="stat">
            <b>{stats.projects}+</b>
            <span>Products Shipped</span>
          </div>
          <div className="stat">
            <b>{stats.uptime}%</b>
            <span>Average Uptime</span>
          </div>
          <div className="stat">
            <b>{stats.countries}+</b>
            <span>Countries Served</span>
          </div>
          <div className="stat">
            <b>{stats.engineers}+</b>
            <span>Engineers &amp; Researchers</span>
          </div>
        </div>
      </div>

      <div className="city" id="cityScene" ref={cityRef}>
        <div className="city-road"></div>
        <div className="city-layer back" id="cityBack" ref={backLayerRef}></div>
        <div className="city-layer mid" id="cityMid" ref={midLayerRef}></div>
        <div
          className="city-layer front"
          id="cityFront"
          ref={frontLayerRef}
        ></div>
      </div>
    </section>
  );
}

export default About;
