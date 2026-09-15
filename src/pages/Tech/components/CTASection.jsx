import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const headingText =
  "Whether you're launching a new product, modernizing enterprise systems, or integrating AI — ILUMAA transforms ideas into scalable digital solutions.";

const words = headingText.split(" ");

const CTASection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current || !headingRef.current) return;

    const ctx = gsap.context(() => {
      const chars = headingRef.current.querySelectorAll(".cta-char");

      // 1. Eyebrow animation
      gsap.fromTo(
        ".cta-eyebrow-anim",
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            toggleActions: "restart none restart reset",
          },
        }
      );

      // 2. One by one letter reveal on the screen
      gsap.fromTo(
        chars,
        {
          opacity: 0,
          y: 20,
          scale: 0.85,
          filter: "blur(5px)",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.4,
          stagger: 0.015,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "restart none restart reset",
          },
        }
      );

      // 3. Subtitle & Buttons entrance
      gsap.fromTo(
        [".cta-sub-anim", ".cta-btns-anim"],
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power2.out",
          delay: 0.35,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
            toggleActions: "restart none restart reset",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="connect" className="cta" ref={sectionRef}>
      {/* Radiant ambient glow on bright backdrop */}
      <div className="cta-ambient-glow" />

      <div className="cta-inner">
        <p className="cta-eyebrow-anim">
          Let's Build What's Next
        </p>
        <h2 className="cta-heading" ref={headingRef}>
          {words.map((word, wIdx) => (
            <span key={wIdx} className="cta-word">
              {word.split("").map((char, cIdx) => (
                <span key={cIdx} className="cta-char">
                  {char}
                </span>
              ))}
              {wIdx < words.length - 1 && <span>&nbsp;</span>}
            </span>
          ))}
        </h2>
        <p className="cta-sub cta-sub-anim">
          Ready to build the future together?
        </p>
        <div className="cta-btns cta-btns-anim">
          <a href="mailto:connect@ilumaa.com" className="btn-primary">
            Schedule a Consultation
          </a>
          <a href="mailto:connect@ilumaa.com" className="btn-outline">
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
