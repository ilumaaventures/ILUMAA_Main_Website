import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Users,
  Cog,
  Zap,
  Sparkles,
  ListChecks,
  Handshake,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  {
    id: "human-centered",
    title: "Human-Centered Innovation",
    titleLines: ["Human-Centered", "Innovation"],
    desc: "Technology built around people, business goals, and real-world outcomes.",
    icon: Users,
    rotY: 28,
    rotZ: 2.5,
    tz: -32,
    ty: 10,
    hoverRotY: 22,
    hoverRotZ: 2.5,
  },
  {
    id: "enterprise-expertise",
    title: "Enterprise Expertise",
    titleLines: ["Enterprise", "Expertise"],
    desc: "Scalable solutions engineered with modern technologies and industry best practices.",
    icon: Cog,
    rotY: 18,
    tz: -14,
    ty: 4,
  },
  {
    id: "future-ready",
    title: "Future-Ready Platforms",
    titleLines: ["Future-Ready", "Platforms"],
    desc: "Architectures designed to evolve with changing business requirements.",
    icon: Zap,
    rotY: 9,
    tz: 0,
    ty: 0,
  },
  {
    id: "ai-intelligence",
    title: "AI-Driven Intelligence",
    titleLines: ["AI-Driven", "Intelligence"],
    desc: "Practical AI solutions that improve efficiency and unlock new business opportunities.",
    icon: Sparkles,
    rotY: -9,
    tz: 0,
    ty: 0,
  },
  {
    id: "delivery",
    title: "End-to-End Delivery",
    titleLines: ["End-to-End", "Delivery"],
    desc: "From strategy and design to development, deployment, and ongoing optimization.",
    icon: ListChecks,
    rotY: -18,
    tz: -14,
    ty: 4,
  },
  {
    id: "partnership",
    title: "Long-Term Partnership",
    titleLines: ["Long-Term", "Partnership"],
    desc: "We work as an extension of your team, supporting continuous innovation and growth.",
    icon: Handshake,
    rotY: -28,
    tz: -32,
    ty: 10,
    hoverRotY: -22,
  },
];

const WhyChooseSection = () => {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const trackRef = useRef(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const slots = sectionRef.current.querySelectorAll(".why-card-slot");

      // 1. Staggered Scroll Entrance on outer slots (does not touch inner 3D card transform)
      gsap.fromTo(
        slots,
        {
          opacity: 0,
          y: 50,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
          },
        }
      );

      // Header entrance
      gsap.fromTo(
        ".why-header-anim",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
          },
        }
      );


      // 2. Interactive Mouse 3D Parallax Tilt on Desktop
      const stage = stageRef.current;
      const track = trackRef.current;
      if (stage && track && window.innerWidth >= 1024) {
        const handleMouseMove = (e) => {
          const rect = stage.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;

          gsap.to(track, {
            rotateY: x * 16,
            rotateX: -y * 8,
            duration: 0.45,
            ease: "power2.out",
            transformPerspective: 950,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(track, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.8,
            ease: "power3.out",
          });
        };

        stage.addEventListener("mousemove", handleMouseMove);
        stage.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          stage.removeEventListener("mousemove", handleMouseMove);
          stage.removeEventListener("mouseleave", handleMouseLeave);
        };
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="why-choose" className="why-section" ref={sectionRef}>
      {/* Soft Ambient Radiance */}
      <div className="why-ambient-glow" />

      <div className="section-inner relative z-10">
        {/* Header matching Image 1 */}
        <div className="why-header text-center">
          <p className="why-eyebrow why-header-anim">WHY CHOOSE ILUMAA</p>
          <h2 className="why-title why-header-anim">
            Your Technology Partner
            <br />
            for <span className="why-title-accent">Sustainable Growth</span>
          </h2>
          <p className="why-subtitle why-header-anim">
            More than solutions. A long-term partner for what's next.
          </p>
        </div>

        {/* 3D Curved Perspective Stage */}
        <div className="why-perspective-stage" ref={stageRef}>
          <div className="why-arc-track" ref={trackRef}>
            {reasons.map((r, i) => {
              const IconComponent = r.icon;
              const isHovered = hoveredIdx === i;
              const baseZ = r.tz + 40;

              return (
                <div
                  key={r.id}
                  className="why-card-slot"
                  style={{ zIndex: isHovered ? 60 : baseZ }}
                >
                  <div
                    className={`why-arc-card ${isHovered ? "is-hovered" : ""}`}
                    style={{
                      "--base-rot": `${r.rotY}deg`,
                      "--base-rot-z": `${r.rotZ || 0}deg`,
                      "--base-tz": `${r.tz}px`,
                      "--base-ty": `${r.ty}px`,
                      "--hover-rot": `${r.hoverRotY !== undefined ? r.hoverRotY : 0}deg`,
                      "--hover-rot-z": `${r.hoverRotZ !== undefined ? r.hoverRotZ : 0}deg`,
                    }}
                    onMouseEnter={() => setHoveredIdx(i)}
                    onMouseLeave={() => setHoveredIdx(null)}
                  >
                    {/* Subtle Top Card Glow / Shine */}
                    <div className="why-card-top-shine" />

                    {/* Circular Icon Pill */}
                    <div className="why-icon-pill">
                      <IconComponent className="why-card-icon" />
                    </div>

                    {/* Title */}
                    <h3 className="why-card-title">
                      {r.titleLines.map((line, lIdx) => (
                        <span key={lIdx} className="block">
                          {line}
                        </span>
                      ))}
                    </h3>

                    {/* Subtle Description */}
                    <p className="why-card-desc">{r.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseSection;
