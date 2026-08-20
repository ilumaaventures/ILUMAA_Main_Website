import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Bot, Code2, Smartphone, Cloud, Layers } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const serviceItems = [
  {
    num: "01 / AI",
    icon: <Bot className="h-6 w-6 text-cyan-400" />,
    title: "Artificial Intelligence",
    desc: "Custom models, agentic pipelines, vector search RAG systems, and LLM infrastructure built for enterprise reasoning and automation.",
    tags: [
      "LLM Integration",
      "RAG Systems",
      "Model Fine-Tuning",
      "Agentic Pipelines",
    ],
  },
  {
    num: "02 / WEB",
    icon: <Code2 className="h-6 w-6 text-blue-400" />,
    title: "Web Platforms",
    desc: "High-performance web applications engineered on modern stacks — fast, accessible, resilient, and built to scale from day one.",
    tags: ["React", "Next.js", "Design Systems", "Edge Compute"],
  },
  {
    num: "03 / MOBILE",
    icon: <Smartphone className="h-6 w-6 text-purple-400" />,
    title: "Mobile Products",
    desc: "Native-feel iOS and Android applications with offline-first architecture, sub-second sync, and smooth 60fps gesture interactions.",
    tags: [
      "iOS & Android",
      "React Native",
      "Offline Resilience",
      "Real-Time Sync",
    ],
  },
  {
    num: "04 / CLOUD",
    icon: <Cloud className="h-6 w-6 text-cyan-400" />,
    title: "Cloud Infrastructure",
    desc: "Elastic, observable, cost-optimized cloud solutions on AWS — Docker containerization, Kubernetes orchestration, and sub-10ms uptime monitoring.",
    tags: [
      "AWS Cloud",
      "Kubernetes",
      "CI/CD Automation",
      "Sub-10ms Observability",
    ],
  },
  {
    num: "05 / ERP",
    icon: <Layers className="h-6 w-6 text-purple-400" />,
    title: "Enterprise ERP Systems",
    desc: "Unified operations backbones connecting billing, GST invoicing, payroll, HRMS, inventory, and analytics into one single source of truth.",
    tags: [
      "GST Invoicing",
      "Payroll Engines",
      "HRMS Workflows",
      "Business Intelligence",
    ],
  },
];

function Services() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const cards = containerRef.current.querySelectorAll(".service-card");

      // Scroll entrance animation
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        },
      );

      // Card hover 3D tilt animation
      const isTouch =
        window.matchMedia("(hover:none)").matches || window.innerWidth < 820;
      if (!isTouch) {
        cards.forEach((card) => {
          const handleMouseMove = (e) => {
            const r = card.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width - 0.5;
            const y = (e.clientY - r.top) / r.height - 0.5;
            gsap.to(card, {
              rotateY: x * 10,
              rotateX: -y * 10,
              scale: 1.02,
              duration: 0.4,
              ease: "power2.out",
            });
          };

          const handleMouseLeave = () => {
            gsap.to(card, {
              rotateY: 0,
              rotateX: 0,
              scale: 1,
              duration: 0.7,
              ease: "power3.out",
            });
          };

          card.addEventListener("mousemove", handleMouseMove);
          card.addEventListener("mouseleave", handleMouseLeave);
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" className="section services" ref={containerRef}>
      <div className="section-inner">
        <div className="section-head">
          <span className="eyebrow">What We Build</span>
          <h2>
            Five Core Disciplines,{" "}
            <span className="grad-text">One Ecosystem.</span>
          </h2>
          <p>
            Every project draws on our unified team of AI researchers, software
            architects, and interface designers working as one unit.
          </p>
        </div>

        <div className="services-grid">
          {serviceItems.map((item, idx) => (
            <div key={idx} className="service-card glass" data-cursor="hover">
              <div className="service-card-top">
                {/* <span className="service-num">{item.num}</span> */}
                <div className="service-icon-wrap">{item.icon}</div>
              </div>
              <h3 className="service-title">{item.title}</h3>
              <p className="service-desc">{item.desc}</p>
              <div className="service-tags">
                {item.tags.map((t, tIdx) => (
                  <span key={tIdx}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
