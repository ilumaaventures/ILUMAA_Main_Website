import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function CTA() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const h2 = containerRef.current.querySelector("h2");
      if (h2) {
        gsap.fromTo(
          h2,
          { opacity: 0, y: 50, rotateX: 6, transformPerspective: 800 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: h2,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="cta" className="section cta-section" ref={containerRef}>
      <div className="cta-glow"></div>
      <span className="eyebrow">Let's build something intelligent</span>
      <h2>
        Ready to build what's <span className="grad-text">next?</span>
      </h2>
      <p style={{ color: "var(--text-dim)", maxWidth: "50ch" }}>
        Tell us what you're building. We'll tell you honestly whether AI belongs in
        it &mdash; and how to ship it well if it does.
      </p>
      <div className="magnetic" style={{ marginTop: "10px" }}>
        <a
          href="mailto:ilumaaventures@gmail.com"
          className="btn btn-primary large"
          data-cursor="hover"
        >
          Start Your Project →
        </a>
      </div>
    </section>
  );
}

export default CTA;
