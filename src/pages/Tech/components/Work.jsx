import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ExternalLink, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

function Work({ projects, onSelectProject }) {
  const gridRef = useRef(null);

  useEffect(() => {
    const isTouch =
      window.matchMedia("(hover:none)").matches || window.innerWidth < 820;
    if (isTouch || !gridRef.current) return;

    const cards = gridRef.current.querySelectorAll(".project-card");
    cards.forEach((card) => {
      const handleMouseMove = (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(card, {
          rotateY: x * 10,
          rotateX: -y * 10,
          scale: 1.015,
          duration: 0.4,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          rotateY: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
        });
      };

      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseleave", handleMouseLeave);
    });
  }, []);

  const cardGradients = [
    "linear-gradient(135deg, rgba(16,26,51,0.9), rgba(28,20,64,0.9) 60%, rgba(8,16,28,0.95))",
    "linear-gradient(135deg, rgba(13,34,51,0.9), rgba(10,24,48,0.9) 60%, rgba(5,12,24,0.95))",
    "linear-gradient(135deg, rgba(24,16,51,0.9), rgba(14,18,48,0.9) 60%, rgba(6,10,24,0.95))",
    "linear-gradient(135deg, rgba(12,28,44,0.9), rgba(20,16,50,0.9) 60%, rgba(7,16,28,0.95))",
  ];

  return (
    <section id="projects" className="section projects">
      <div className="section-inner">
        <div className="section-head">
          <span className="eyebrow">Featured Platforms &amp; Products</span>
          <h2>
            Production Systems <span className="grad-text">Engineered by Us</span>
          </h2>
          <p>
            Explore the architecture, key capabilities, and impact metrics of digital
            products designed, built, and shipped for enterprise scale.
          </p>
        </div>

        <div className="projects-grid" id="projectsGrid" ref={gridRef}>
          {projects.map((proj, idx) => (
            <article
              key={proj.id || idx}
              className="project-card detailed-project-card magnetic-card"
              style={{
                background: cardGradients[idx % cardGradients.length],
              }}
            >
              <div className="project-card-header">
                <span className="tag-badge">{proj.tag}</span>
                {proj.url && (
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="live-demo-chip"
                    onClick={(e) => e.stopPropagation()}
                    data-cursor="hover"
                  >
                    <span>Visit Live</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>

              <div className="project-card-body">
                <h3 className="project-card-title">{proj.title}</h3>
                <p className="project-card-desc">{proj.desc}</p>

                {/* Impact Metric Badge */}
                {proj.impactMetric && (
                  <div className="project-impact-badge">
                    <Sparkles className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                    <span>{proj.impactMetric}</span>
                  </div>
                )}

                {/* Key Features List */}
                {proj.features && proj.features.length > 0 && (
                  <div className="project-features-box">
                    <h4 className="features-title">KEY CAPABILITIES &amp; FEATURES:</h4>
                    <ul className="features-list">
                      {proj.features.map((feat, fIdx) => (
                        <li key={fIdx} className="feature-item">
                          <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech Stack Pills */}
                {proj.stackPills && (
                  <div className="project-stack-pills">
                    {proj.stackPills.map((tech, tIdx) => (
                      <span key={tIdx} className="tech-pill">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="project-card-footer">
                <button
                  onClick={() => onSelectProject(idx)}
                  className="btn btn-secondary btn-sm"
                  data-cursor="hover"
                >
                  <span>Detailed Architecture</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
                {proj.url && (
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                    data-cursor="hover"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Work;
