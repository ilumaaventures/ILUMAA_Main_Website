import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  { id: "all", label: "All Skills" },
  { id: "ai", label: "AI & Machine Learning" },
  { id: "web", label: "Web & Frontend" },
  { id: "backend", label: "Backend & Systems" },
  { id: "cloud", label: "Cloud & DevOps" },
];

const techPills = [
  { name: "Artificial Intelligence", category: "ai" },
  { name: "Generative AI", category: "ai" },
  { name: "AI Agents", category: "ai" },
  { name: "LLM Integration", category: "ai" },
  { name: "RAG Systems", category: "ai" },
  { name: "Prompt Engineering", category: "ai" },
  { name: "Vector Databases", category: "ai" },
  { name: "React", category: "web" },
  { name: "Next.js", category: "web" },
  { name: "TypeScript", category: "web" },
  { name: "Node.js", category: "backend" },
  { name: "Python", category: "backend" },
  { name: "FastAPI", category: "backend" },
  { name: "GraphQL", category: "backend" },
  { name: "REST APIs", category: "backend" },
  { name: "Microservices", category: "backend" },
  { name: "Real-Time Systems", category: "backend" },
  { name: "WebSockets", category: "backend" },
  { name: "MongoDB", category: "backend" },
  { name: "PostgreSQL", category: "backend" },
  { name: "Redis", category: "backend" },
  { name: "Docker", category: "cloud" },
  { name: "Kubernetes", category: "cloud" },
  { name: "AWS Cloud", category: "cloud" },
  { name: "CI/CD Pipelines", category: "cloud" },
  { name: "System Design", category: "cloud" },
  { name: "Cloud Architecture", category: "cloud" },
  { name: "DevOps", category: "cloud" },
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
];

function TechStack() {
  const containerRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredPills =
    activeCategory === "all"
      ? techPills
      : techPills.filter((pill) => pill.category === activeCategory);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const head = containerRef.current.querySelector(".section-head");
      const galaxy = containerRef.current.querySelector(".galaxy-wrap");

      if (head) {
        gsap.fromTo(
          head,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: head,
              start: "top 85%",
            },
          }
        );
      }

      if (galaxy) {
        gsap.fromTo(
          galaxy,
          { opacity: 0, scale: 0.85 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: galaxy,
              start: "top 80%",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Animate pills when category or component state changes
  useEffect(() => {
    if (!containerRef.current) return;
    const pills = containerRef.current.querySelectorAll(".tech-pill");
    const grid = containerRef.current.querySelector(".tech-list-grid");

    if (pills && pills.length > 0 && grid) {
      gsap.fromTo(
        pills,
        { opacity: 0, scale: 0.9, y: 15 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.02,
          ease: "power2.out",
          clearProps: "transform",
        }
      );
    }
  }, [activeCategory]);

  return (
    <section
      id="technology"
      className="section technology-section"
      ref={containerRef}
    >
      <div className="section-inner">
        <div
          className="section-head text-center mx-auto"
          style={{ textAlign: "center" }}
        >
          <span className="eyebrow" style={{ justifyContent: "center" }}>
            Our Technology Universe
          </span>
          <h2>
            A Galaxy of <span className="grad-text">Battle-Tested Tools.</span>
          </h2>
          <p style={{ margin: "0 auto" }}>
            We choose technology for durability, performance, and scaling —
            engineered to deliver resilient production products.
          </p>
        </div>

        {/* Orbit Galaxy Visual */}
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

        {/* Category Filter Tabs */}
        <div className="tech-filter-tabs">
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              className={`tech-tab-btn ${
                activeCategory === cat.id ? "active" : ""
              }`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid of Technology Pills */}
        <div className="tech-list-grid">
          {filteredPills.map((pill, idx) => (
            <div key={idx} className="tech-pill" data-cursor="hover">
              <span className="tech-pill-dot" />
              {pill.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TechStack;

