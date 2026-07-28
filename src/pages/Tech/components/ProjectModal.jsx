import React, { useEffect } from "react";
import { Link } from "react-router-dom";
function ProjectModal({ project, onClose }) {
  // Bind Escape key to close the modal
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
    // Only close if we click on the backdrop mask itself
    if (e.target.id === "proj-modal") {
      onClose();
    }
  };

  return (
    <div id="proj-modal" className="open" onClick={handleBackdropClick}>
      <div className="modal-card">
        <div
          className="modal-close"
          id="modalClose"
          data-cursor="hover"
          onClick={onClose}
        >
          ✕
        </div>
        <div className="proj-tag" id="mTag">
          Explore {project.tag}
          {/* <Link to={project.url} target="_blank" rel="noopener noreferrer"> */}
          Visit Project
          {/* </Link> */}
        </div>
        <h3 id="mTitle">{project.title}</h3>
        <p id="mDesc">{project.desc}</p>

        <div className="modal-meta">
          <div>
            ROLE
            <b id="mRole">{project.role}</b>
          </div>
          <div>
            STACK
            <b id="mStack">{project.stack}</b>
          </div>
          <div>
            RESULT
            <b id="mResult">{project.result}</b>
          </div>
        </div>

        <p id="mBody" style={{ whiteSpace: "pre-line" }}>
          {project.body}
        </p>
      </div>
    </div>
  );
}

export default ProjectModal;
