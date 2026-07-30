import React, { useEffect } from "react";
import { ExternalLink, Sparkles, CheckCircle2, X } from "lucide-react";

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const handleBackdropClick = (e) => {
    if (e.target.id === "proj-modal") {
      onClose();
    }
  };

  return (
    <div id="proj-modal" className="open" onClick={handleBackdropClick}>
      <div className="modal-card detailed-modal-card">
        <button
          className="modal-close"
          id="modalClose"
          data-cursor="hover"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </button>

        <div className="modal-header-row">
          <span className="tag-badge">{project.tag}</span>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
              data-cursor="hover"
            >
              <span>Visit Live Platform</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>

        <h3 id="mTitle">{project.title}</h3>
        <p id="mDesc">{project.desc}</p>

        {project.impactMetric && (
          <div className="modal-impact-badge">
            <Sparkles className="h-4 w-4 text-cyan-400 shrink-0" />
            <span>{project.impactMetric}</span>
          </div>
        )}

        <div className="modal-meta">
          <div>
            <span>ROLE &amp; DISCIPLINE</span>
            <b id="mRole">{project.role}</b>
          </div>
          <div>
            <span>TECHNOLOGY STACK</span>
            <b id="mStack">{project.stack}</b>
          </div>
          <div>
            <span>IMPACT &amp; DELIVERABLE</span>
            <b id="mResult">{project.result}</b>
          </div>
        </div>

        {project.features && project.features.length > 0 && (
          <div className="modal-features-section">
            <h4 className="modal-section-title">CORE PLATFORM CAPABILITIES:</h4>
            <div className="modal-features-grid">
              {project.features.map((feat, fIdx) => (
                <div key={fIdx} className="modal-feature-item">
                  <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="modal-body-section">
          <h4 className="modal-section-title">PLATFORM ARCHITECTURE &amp; OVERVIEW:</h4>
          <p id="mBody">{project.body}</p>
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;
