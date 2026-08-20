import React, { useEffect, useRef } from "react";
import gsap from "gsap";

function Cursor() {
  const dotRef = useRef(null);
  const glowRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const glowPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const isTouch =
      window.matchMedia("(hover:none)").matches || window.innerWidth < 900;
    if (isTouch) return;

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animationFrameId;
    const updateGlow = () => {
      const mx = mouse.current.x;
      const my = mouse.current.y;
      let rx = glowPos.current.x;
      let ry = glowPos.current.y;

      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;

      glowPos.current.x = rx;
      glowPos.current.y = ry;

      if (glowRef.current) {
        glowRef.current.style.left = `${rx}px`;
        glowRef.current.style.top = `${ry}px`;
      }

      animationFrameId = requestAnimationFrame(updateGlow);
    };
    animationFrameId = requestAnimationFrame(updateGlow);

    const handleMouseOver = (e) => {
      const target = e.target.closest(
        '[data-cursor="hover"], .btn, .nav-links a, .logo, .project-card, .station-rig, .modal-close',
      );
      if (target && glowRef.current) {
        glowRef.current.classList.add("is-active");
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest(
        '[data-cursor="hover"], .btn, .nav-links a, .logo, .project-card, .station-rig, .modal-close',
      );
      if (target && glowRef.current) {
        const related = e.relatedTarget;
        if (
          !related ||
          !related.closest(
            '[data-cursor="hover"], .btn, .nav-links a, .logo, .project-card, .station-rig, .modal-close',
          )
        ) {
          glowRef.current.classList.remove("is-active");
        }
      }
    };

    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    const handleMagneticMove = (e) => {
      const magneticTarget = e.target.closest(".magnetic");
      if (magneticTarget) {
        const r = magneticTarget.getBoundingClientRect();
        const relX = e.clientX - (r.left + r.width / 2);
        const relY = e.clientY - (r.top + r.height / 2);
        gsap.to(magneticTarget, {
          x: relX * 0.35,
          y: relY * 0.35,
          duration: 0.4,
          ease: "power2.out",
        });
      }
    };

    const handleMagneticLeave = (e) => {
      if (
        e.target.classList.contains("magnetic") ||
        e.target.closest(".magnetic")
      ) {
        const target = e.target.classList.contains("magnetic")
          ? e.target
          : e.target.closest(".magnetic");
        gsap.to(target, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.4)",
        });
      }
    };

    window.addEventListener("mousemove", handleMagneticMove);
    window.addEventListener("mouseout", handleMagneticLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("mousemove", handleMagneticMove);
      window.removeEventListener("mouseout", handleMagneticLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef} id="cursorDot" />
      <div className="cursor-glow" ref={glowRef} id="cursorGlow" />
    </>
  );
}

export default Cursor;
