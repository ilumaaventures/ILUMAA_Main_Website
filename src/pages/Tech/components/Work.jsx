import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Work({ projects, onSelectProject }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll(".proj-card");
    const head = containerRef.current.querySelector(".section-head");
    const triggers = [];

    // Scroll reveal triggers for project cards
    cards.forEach((el, i) => {
      const anim = gsap.fromTo(
        el,
        { opacity: 0, y: 100, rotateX: 20, scale: 0.92, transformPerspective: 1000 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          delay: i * 0.05,
        }
      );
      if (anim.scrollTrigger) triggers.push(anim.scrollTrigger);
    });

    // Section head reveal trigger
    if (head) {
      const headAnim = gsap.fromTo(
        head,
        { opacity: 0, y: 70, rotateX: 8, transformPerspective: 800 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: head,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
      if (headAnim.scrollTrigger) triggers.push(headAnim.scrollTrigger);
    }

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  // 3D Card tilt mouse hover interactions
  const handleMouseMove = (e) => {
    const cardInner = e.currentTarget;
    const r = cardInner.getBoundingClientRect();
    const w = r.width;
    const h = r.height;

    // Calc relative offsets from card center
    const x = e.clientX - r.left - w / 2;
    const y = e.clientY - r.top - h / 2;

    // Convert offsets to tilt rotation angles (max 10 degrees)
    const rotY = (x / (w / 2)) * 10;
    const rotX = -(y / (h / 2)) * 10;

    gsap.to(cardInner, {
      rotateX: rotX,
      rotateY: rotY,
      transformPerspective: 1000,
      duration: 0.15,
      ease: "power1.out",
      overwrite: "auto",
    });
  };

  const handleMouseLeave = (e) => {
    const cardInner = e.currentTarget;
    gsap.to(cardInner, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  return (
    <section id="projects" ref={containerRef}>
      <div className="section-head">
        <div className="eyebrow">Selected Work</div>
        <h2>
          Holograms of
          <br />
          <span className="grad-text">what we've shipped.</span>
        </h2>
      </div>

      <div className="projects-grid" id="projectsGrid">
        {projects.map((project, idx) => (
          <div key={idx} className="proj-card">
            <div
              className="proj-inner"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={() => onSelectProject(idx)}
            >
              <div className="proj-glow"></div>
              <div className="proj-hint">CLICK TO EXPAND ↗</div>
              <div className="proj-tag">{project.tag}</div>
              <h3>{project.title}</h3>
              <p>{project.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Work;
