import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    id: "strategy",
    titleLines: ["Strategy"],
    taglines: ["Plan. Innovate.", "Lead."],
    description:
      "Transforming business challenges into scalable digital opportunities through strategic planning and innovation.",
    bgColor: "rgba(37, 99, 235, 0.14)",
    borderColor: "rgba(96, 165, 250, 0.35)",
    iconColor: "#60A5FA",
    glowColor: "rgba(37, 99, 235, 0.45)",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="9" />
        <polygon
          points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"
          fill="currentColor"
          fillOpacity="0.18"
        />
      </svg>
    ),
  },
  {
    id: "technology",
    titleLines: ["Technology"],
    taglines: ["Build. Secure.", "Scale."],
    description:
      "Designing and engineering modern platforms with secure, scalable, and cloud-native architectures.",
    bgColor: "rgba(16, 185, 129, 0.14)",
    borderColor: "rgba(52, 211, 153, 0.35)",
    iconColor: "#34D399",
    glowColor: "rgba(16, 185, 129, 0.45)",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2.5" y="4" width="19" height="16" rx="3" />
        <polyline points="7 9 10.5 12 7 15" />
        <line x1="12.5" y1="15" x2="16.5" y2="15" />
      </svg>
    ),
  },
  {
    id: "ai",
    titleLines: ["Artificial", "Intelligence"],
    taglines: ["Automate. Augment.", "Advance."],
    description:
      "Embedding intelligent automation and AI-powered decision-making into business processes.",
    bgColor: "rgba(168, 85, 247, 0.14)",
    borderColor: "rgba(192, 132, 252, 0.35)",
    iconColor: "#C084FC",
    glowColor: "rgba(168, 85, 247, 0.45)",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
        <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
        <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
        <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
        <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
        <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
        <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
        <path d="M6 18a4 4 0 0 1-1.967-.516" />
        <path d="M19.967 17.484A4 4 0 0 1 18 18" />
      </svg>
    ),
  },
  {
    id: "analytics",
    titleLines: ["Analytics"],
    taglines: ["Analyze. Predict.", "Act."],
    description:
      "Converting complex business data into actionable insights that improve performance and decision-making.",
    bgColor: "rgba(249, 115, 22, 0.14)",
    borderColor: "rgba(251, 146, 60, 0.35)",
    iconColor: "#FB923C",
    glowColor: "rgba(249, 115, 22, 0.45)",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3.5" y="13" width="3.5" height="7.5" rx="1.2" />
        <rect x="10.25" y="8" width="3.5" height="12.5" rx="1.2" />
        <rect x="17" y="4" width="3.5" height="16.5" rx="1.2" />
      </svg>
    ),
  },
  {
    id: "business-transformation",
    titleLines: ["Business", "Transformation"],
    taglines: ["Modernize. Grow.", "Thrive."],
    description:
      "Helping organizations modernize operations, improve efficiency, and achieve sustainable digital growth.",
    bgColor: "rgba(14, 165, 233, 0.14)",
    borderColor: "rgba(56, 189, 248, 0.35)",
    iconColor: "#38BDF8",
    glowColor: "rgba(14, 165, 233, 0.45)",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3.5" y="3" width="10.5" height="18" rx="1.5" />
        <rect x="14" y="8.5" width="6.5" height="12.5" rx="1.5" />
        <line x1="6.5" y1="7" x2="6.51" y2="7" strokeWidth="2" />
        <line x1="10.5" y1="7" x2="10.51" y2="7" strokeWidth="2" />
        <line x1="6.5" y1="11" x2="6.51" y2="11" strokeWidth="2" />
        <line x1="10.5" y1="11" x2="10.51" y2="11" strokeWidth="2" />
        <line x1="6.5" y1="15" x2="6.51" y2="15" strokeWidth="2" />
        <line x1="10.5" y1="15" x2="10.51" y2="15" strokeWidth="2" />
        <line x1="17.25" y1="12" x2="17.26" y2="12" strokeWidth="2" />
        <line x1="17.25" y1="16" x2="17.26" y2="16" strokeWidth="2" />
      </svg>
    ),
  },
];

const AboutSection = () => {
  const sectionRef = useRef(null);
  const trackLineRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Animate Header
      gsap.fromTo(
        ".iconic-header-anim",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Animate Connecting Line
      if (trackLineRef.current) {
        gsap.fromTo(
          trackLineRef.current,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1,
            opacity: 1,
            duration: 1,
            ease: "power3.inOut",
            transformOrigin: "left center",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
            },
          }
        );
      }

      // Animate 5 Capability Nodes
      gsap.fromTo(
        ".iconic-node",
        { opacity: 0, y: 32, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "back.out(1.3)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="iconic-horizontal-section" ref={sectionRef}>
      {/* Ambient background wash */}
      <div className="iconic-horizontal-ambient" />

      <div className="iconic-inner">
        {/* Centered Main Header */}
        <div className="iconic-header">
          <p className="iconic-eyebrow iconic-header-anim">
            WHERE HUMAN INTELLIGENCE MEETS TECHNOLOGY
          </p>
          <h2 className="iconic-title iconic-header-anim">
            Technology alone doesn't create{" "}
            <span className="iconic-highlight">transformation</span>
            <span className="iconic-dash"> &mdash; </span>
            people do.
          </h2>
        </div>

        {/* Horizontal Timeline Track */}
        <div className="iconic-timeline-track">
          {/* Continuous connecting horizontal line */}
          <div className="iconic-connecting-line" ref={trackLineRef} />

          {/* 5 Nodes Row */}
          <div className="iconic-nodes-row">
            {capabilities.map((item) => (
              <div key={item.id} className="iconic-node">
                {/* Circular Badge Disc */}
                <div
                  className="iconic-badge-wrapper"
                  style={{
                    backgroundColor: item.bgColor,
                    borderColor: item.borderColor,
                    "--node-glow": item.glowColor,
                  }}
                >
                  <div
                    className="iconic-badge-icon"
                    style={{ color: item.iconColor }}
                  >
                    {item.icon}
                  </div>
                </div>

                {/* Node Title */}
                <h3 className="iconic-node-title">
                  {item.titleLines.map((line, idx) => (
                    <span key={idx}>{line}</span>
                  ))}
                </h3>

                {/* Node Description */}
                <p className="iconic-node-desc">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
