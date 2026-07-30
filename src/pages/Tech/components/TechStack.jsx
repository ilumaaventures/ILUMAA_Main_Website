import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const techPills = [
  "Artificial Intelligence",
  "Generative AI",
  "AI Agents",
  "LLM Integration",
  "RAG Systems",
  "Prompt Engineering",
  "LangChain",
  "LangGraph",
  "Vector Databases",
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "FastAPI",
  "GraphQL",
  "REST APIs",
  "Microservices",
  "Real-Time Systems",
  "WebSockets",
  "MongoDB",
  "PostgreSQL",
  "Redis",
  "Docker",
  "Kubernetes",
  "AWS Cloud",
  "Terraform",
  "CI/CD",
  "GitHub Actions",
  "System Design",
  "Cloud Architecture",
  "DevOps",
];
const orbits = [
  {
    dur: "26s",
    size: "36px",
    color: "#63a4ff",
    label: "Innovation",
    width: "180px",
    height: "180px",
  },
  {
    dur: "34s",
    size: "32px",
    color: "#7cf1ff",
    label: "Trust",
    width: "280px",
    height: "280px",
  },
  {
    dur: "20s",
    size: "40px",
    color: "#b18aff",
    label: "Creativity",
    width: "380px",
    height: "380px",
  },
  {
    dur: "44s",
    size: "34px",
    color: "#63a4ff",
    label: "Quality",
    width: "470px",
    height: "470px",
  },
  {
    dur: "16s",
    size: "30px",
    color: "#7cf1ff",
    label: "Security",
    width: "560px",
    height: "560px",
  },
  {
    dur: "52s",
    size: "38px",
    color: "#b18aff",
    label: "Scalability",
    width: "610px",
    height: "610px",
  },
  {
    dur: "38s",
    size: "28px",
    color: "#f97066",
    label: "Performance",
    width: "250px",
    height: "250px",
  },
];

function TechStack() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const head = containerRef.current.querySelector(".section-head");
    const galaxy = containerRef.current.querySelector(".galaxy-wrap");
    const triggers = [];

    // Scroll Entrance animations
    [head, galaxy].forEach((el) => {
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
        },
      );
      if (anim.scrollTrigger) triggers.push(anim.scrollTrigger);
    });

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section id="tech" ref={containerRef}>
      <div
        className="section-head"
        style={{ margin: "0 auto 20px", textAlign: "center" }}
      >
        <div className="eyebrow" style={{ justifyContent: "center" }}>
          Our Stack
        </div>
        <h2>
          Welcome to
          <br />
          <span className="grad-text">the ILumaa technology universe.</span>
        </h2>
      </div>

      <div className="galaxy-wrap" id="galaxy">
        <div className="galaxy-core"></div>
        {orbits.map((orbit, idx) => (
          <div
            key={idx}
            className="orbit"
            style={{
              "--dur": orbit.dur,
              width: orbit.width,
              height: orbit.height,
            }}
          >
            <div className="spin">
              <div
                className="planet"
                style={{
                  "--size": orbit.size,
                  "--pc": orbit.color,
                }}
                data-cursor="hover"
              >
                <div className="dot"></div>
                <div className="wave"></div>
                <div className="label">{orbit.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Grid of extra technical skills to enrich design layout */}
      <div className="tech-list">
        {techPills.map((pill, idx) => (
          <div key={idx} className="tech-pill">
            {pill}
          </div>
        ))}
      </div>
    </section>
  );
}

export default TechStack;
