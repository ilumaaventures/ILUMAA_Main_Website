import React, { useEffect, useRef } from "react";
import gsap from "gsap";

function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const isTouch = window.matchMedia("(hover:none)").matches || window.innerWidth < 900;
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

    // Smooth lerp rendering loop
    let animationFrameId;
    const updateRing = () => {
      const mx = mouse.current.x;
      const my = mouse.current.y;
      let rx = ringPos.current.x;
      let ry = ringPos.current.y;

      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;

      ringPos.current.x = rx;
      ringPos.current.y = ry;

      if (ringRef.current) {
        ringRef.current.style.left = `${rx}px`;
        ringRef.current.style.top = `${ry}px`;
      }

      animationFrameId = requestAnimationFrame(updateRing);
    };
    animationFrameId = requestAnimationFrame(updateRing);

    // Event delegation to capture hover triggers globally
    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-cursor="hover"], .btn, .nav-links a, .nav-cta, .planet, .proj-inner, .legend-item, .modal-close');
      if (target && ringRef.current) {
        ringRef.current.classList.add("hover");
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest('[data-cursor="hover"], .btn, .nav-links a, .nav-cta, .planet, .proj-inner, .legend-item, .modal-close');
      if (target && ringRef.current) {
        // Only remove if we're leaving the hoverable element boundaries
        const related = e.relatedTarget;
        if (!related || !related.closest('[data-cursor="hover"], .btn, .nav-links a, .nav-cta, .planet, .proj-inner, .legend-item, .modal-close')) {
          ringRef.current.classList.remove("hover");
        }
      }
    };

    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    // Handle magnetic transformations dynamically
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
      // Find magnetic targets we left
      if (e.target.classList.contains("magnetic") || e.target.closest(".magnetic")) {
        const target = e.target.classList.contains("magnetic") ? e.target : e.target.closest(".magnetic");
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
      <div className="cursor-ring" ref={ringRef} id="cursorRing" />
    </>
  );
}

export default Cursor;
