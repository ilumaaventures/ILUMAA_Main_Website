import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Layers, Code2, BookOpen } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function PathSelection() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll(".path-card");
    const triggers = [];

    cards.forEach((el, i) => {
      const anim = gsap.fromTo(
        el,
        {
          opacity: 0,
          y: 50,
          scale: 0.96,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        },
      );
      if (anim.scrollTrigger) triggers.push(anim.scrollTrigger);
    });

    const head = containerRef.current.querySelector(".section-heading");
    const headAnim = gsap.fromTo(
      head,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: head,
          start: "top 85%",
        },
      },
    );
    if (headAnim.scrollTrigger) triggers.push(headAnim.scrollTrigger);

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
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
