import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stages = [
  {
    num: "STAGE 01",
    icon: "◇",
    title: "Idea",
    desc: "We interrogate the problem until the real one surfaces — then scope what's worth building.",
  },
  {
    num: "STAGE 02",
    icon: "▤",
    title: "Wireframe",
    desc: "Structure before style. Flows, states, and edge cases mapped before a pixel is styled.",
  },
  {
    num: "STAGE 03",
    icon: "</>",
    title: "Code",
    desc: "Production-grade engineering from day one — typed, tested, reviewed, and shippable.",
  },
  {
    num: "STAGE 04",
    icon: "✓",
    title: "Testing",
    desc: "Automated suites, load tests, and real humans trying to break it before your users do.",
  },
  {
    num: "STAGE 05",
    icon: "▲",
    title: "Deployment",
    desc: "Zero-downtime pipelines, staged rollouts, and monitoring from the first request.",
  },
  {
    num: "STAGE 06",
    icon: "✺",
    title: "Launch",
    desc: "Live, observed, and handed off with the documentation and dashboards to keep growing it.",
  },
];

function Process() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const fillRef = useRef(null);

  useEffect(() => {
    // Determine if layout should pin based on touch support & device width
    const isTouch = window.matchMedia("(hover:none)").matches || window.innerWidth < 900;
    if (isTouch) return;

    const track = trackRef.current;
    const fill = fillRef.current;
    if (!track || !fill) return;

    // Calculate pinning distance based on overflow scroll width
    const trackWidth = track.scrollWidth;
    const travelDist = trackWidth - window.innerWidth;

    const animation = gsap.to(track, {
      x: -travelDist,
      ease: "none",
      scrollTrigger: {
        trigger: "#process",
        pin: true,
        start: "top top",
        end: () => `+=${travelDist}`,
        scrub: 0.6,
        onUpdate: (self) => {
          fill.style.width = `${self.progress * 100}%`;
        },
      },
    });

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, []);

  return (
    <section id="process" ref={containerRef}>
      <div className="process-pin">
        <div className="process-head">
          <div className="eyebrow">How we work</div>
          <h2>The assembly line.</h2>
        </div>

        <div className="process-track" ref={trackRef} id="processTrack">
          {stages.map((stage, idx) => (
            <div key={idx} className="station">
              <div className="station-num">{stage.num}</div>
              <div className="station-panel">
                <div className="station-icon">{stage.icon}</div>
                <div>
                  <h3>{stage.title}</h3>
                  <p>{stage.desc}</p>
                </div>
              </div>
              <div className="station-line"></div>
            </div>
          ))}
        </div>

        <div className="process-progress">
          <i ref={fillRef} id="processFill"></i>
        </div>
      </div>
    </section>
  );
}

export default Process;
