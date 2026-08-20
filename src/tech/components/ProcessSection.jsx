import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    title: "Discover",
    desc: "Understanding your business, users, objectives, and opportunities.",
  },
  {
    num: "02",
    title: "Strategy",
    desc: "Defining the roadmap, technology stack, and implementation plan.",
  },
  {
    num: "03",
    title: "Design",
    desc: "Creating intuitive user experiences and premium digital interfaces.",
  },
  {
    num: "04",
    title: "Build",
    desc: "Developing secure, scalable, and high-performance digital platforms.",
  },
  {
    num: "05",
    title: "Deploy",
    desc: "Launching optimized solutions with cloud-native infrastructure.",
  },
  {
    num: "06",
    title: "Scale",
    desc: "Continuous optimization, innovation, and long-term technology support.",
  },
];

const ProcessSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll(".process-step");
    if (cards && cards.length > 0) {
      gsap.fromTo(
        cards,
        { opacity: 0, x: -30, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.75,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  return (
    <section className="process-section" ref={sectionRef}>
      <div className="section-inner">
        <div className="section-header-center">
          <p className="eyebrow-accent">Our Process</p>
          <h2 className="section-title">
            A Structured Approach
            <br />
            to Digital Innovation
          </h2>
        </div>
        <div className="process-steps">
          {steps.map((s) => (
            <div key={s.num} className="process-step">
              <div className="step-num">{s.num}</div>
              <div className="step-line"></div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
