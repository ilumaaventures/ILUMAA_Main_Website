import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Layers, Code2, BookOpen } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function PathSelection() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Eyebrow animation
      const eyebrow = containerRef.current.querySelector(".eyebrow");
      if (eyebrow) {
        gsap.fromTo(
          eyebrow,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: eyebrow,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      // 2. Heading animation
      const head = containerRef.current.querySelector(".section-heading");
      if (head) {
        gsap.fromTo(
          head,
          { opacity: 0, y: 60, rotateX: 6, transformPerspective: 800 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: head,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      // 3. Staggered 3D Card Entrance Animations
      const cards = containerRef.current.querySelectorAll(".path-card");
      cards.forEach((el, i) => {
        gsap.fromTo(
          el,
          {
            opacity: 0,
            y: 70,
            rotateY: i % 2 === 0 ? -12 : 12,
            scale: 0.92,
            transformPerspective: 1000,
          },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.95,
            delay: i * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="path-selection-section" ref={containerRef}>
      <p className="eyebrow">ONE PARTNER, MANY POSSIBILITIES</p>
      <div className="section-heading">
        <h2>Choose the path that solves the work in front of you.</h2>
        <p>
          Whether you need a ready-to-use platform or a team to build what does
          not exist yet, we meet you where your organisation is today.
        </p>
      </div>
      <div className="path-grid">
        <article className="path-card" data-idx="1">
          <div className="path-header">
            <span className="path-icon">
              <Layers size={18} />
            </span>
          </div>
          <h3>Run your business better</h3>
          <p>
            Bring finance, accounting, people operations and workforce workflows
            into focused products your team can adopt quickly.
          </p>
          <a href="#projects">
            Explore our products <ArrowRight size={14} className="arrow-icon" />
          </a>
        </article>

        <article className="path-card" data-idx="2">
          <div className="path-header">
            <span className="path-icon">
              <Code2 size={18} />
            </span>
          </div>
          <h3>Build the digital advantage</h3>
          <p>
            Partner with our product and engineering teams for websites,
            applications, integrations and scalable platforms.
          </p>
          <a href="#services">
            See our services <ArrowRight size={14} className="arrow-icon" />
          </a>
        </article>

        <article className="path-card" data-idx="3">
          <div className="path-header">
            <span className="path-icon">
              <BookOpen size={18} />
            </span>
          </div>
          <h3>Grow your capability</h3>
          <p>
            Strengthen your team through security, DevOps and cloud learning
            that is designed for real working environments.
          </p>
          <a href="#services">
            Build capability <ArrowRight size={14} className="arrow-icon" />
          </a>
        </article>
      </div>
    </section>
  );
}

export default PathSelection;
