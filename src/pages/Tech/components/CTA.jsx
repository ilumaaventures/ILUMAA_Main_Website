import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function CTA() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const h2 = containerRef.current.querySelector("h2");
    if (!h2) return;

    const anim = gsap.fromTo(
      h2,
      { opacity: 0, y: 70, rotateX: 8, transformPerspective: 800 },
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
      }
    );

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, []);

  return (
    <section id="cta" ref={containerRef}>
      <div className="eyebrow" style={{ justifyContent: "center" }}>
        Let's build
      </div>
      <h2>
        Ready to give your product
        <br />
        a <span className="grad-text">mind of its own?</span>
      </h2>
      <div className="magnetic" style={{ marginTop: "20px" }}>
        <a
          href="mailto:hello@ilummtech.com"
          className="btn btn-primary"
          data-cursor="hover"
          style={{ fontSize: "15px", padding: "18px 38px" }}
        >
          Start a conversation →
        </a>
      </div>
    </section>
  );
}

export default CTA;
