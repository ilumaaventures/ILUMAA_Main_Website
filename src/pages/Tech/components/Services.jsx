import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Services() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Apply scroll entrance animation to service cards
    const cards = containerRef.current.querySelectorAll(".service-card");
    const triggers = [];

    cards.forEach((el, i) => {
      const fromLeft = i % 2 === 0;
      
      const anim = gsap.fromTo(
        el,
        {
          opacity: 0,
          x: fromLeft ? -90 : 90,
          rotateY: fromLeft ? -25 : 25,
          scale: 0.9,
        },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );

      if (anim.scrollTrigger) triggers.push(anim.scrollTrigger);
    });

    // Apply head trigger
    const head = containerRef.current.querySelector(".section-head");
    const headAnim = gsap.fromTo(
      head,
      { opacity: 0, y: 70, rotateX: 8, transformPerspective: 800 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: head,
          start: "top 85%",
        },
      }
    );
    if (headAnim.scrollTrigger) triggers.push(headAnim.scrollTrigger);

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section id="services" ref={containerRef}>
      <div className="section-head">
        <div className="eyebrow">What we build</div>
        <h2>
          Five disciplines.
          <br />
          <span className="grad-text">One system of intelligence.</span>
        </h2>
      </div>
      <div className="services-grid">
        {/* Card 1: AI */}
        <div className="service-card" data-idx="1">
          <div className="service-num">01 / AI</div>
          <div className="service-stage">
            <div className="obj-ai">
              <div className="core"></div>
              <div className="ring"></div>
              <div className="ring r2"></div>
            </div>
          </div>
          <h3>Artificial Intelligence</h3>
          <p>
            Custom models, agentic pipelines, and LLM infrastructure engineered to reason, retrieve, and act.
          </p>
        </div>

        {/* Card 2: Web */}
        <div className="service-card" data-idx="2">
          <div className="service-num">02 / WEB</div>
          <div className="service-stage">
            <div className="obj-web">
              <div className="bar">
                <i></i>
                <i></i>
                <i></i>
              </div>
              <div className="lines">
                <div style={{ width: "70%" }}></div>
                <div style={{ width: "50%" }}></div>
                <div style={{ width: "85%" }}></div>
              </div>
            </div>
          </div>
          <h3>Web Platforms</h3>
          <p>
            High-performance web applications with cinematic interfaces and rock-solid architecture.
          </p>
        </div>

        {/* Card 3: Mobile */}
        <div className="service-card" data-idx="3">
          <div className="service-num">03 / MOBILE</div>
          <div className="service-stage">
            <div className="obj-mobile">
              <div className="grid">
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
              </div>
            </div>
          </div>
          <h3>Mobile Products</h3>
          <p>
            Native-grade iOS and Android experiences, built for speed, offline resilience, and delight.
          </p>
        </div>

        {/* Card 4: Cloud */}
        <div className="service-card" data-idx="4">
          <div className="service-num">04 / CLOUD</div>
          <div className="service-stage">
            <div className="obj-cloud">
              <svg viewBox="0 0 200 120" fill="none">
                <path
                  d="M55 90c-19 0-34-14-34-32 0-16 12-29 28-32 6-16 22-27 40-27 21 0 39 15 43 35 15 3 26 15 26 30 0 17-15 31-33 31H55z"
                  stroke="url(#servicesG1)"
                  strokeWidth="2"
                  strokeDasharray="4 5"
                />
                <defs>
                  <linearGradient id="servicesG1" x1="0" y1="0" x2="200" y2="120">
                    <stop stopColor="#63a4ff" />
                    <stop offset="1" stopColor="#7cf1ff" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          <h3>Cloud Infrastructure</h3>
          <p>
            Elastic, observable, cost-efficient infrastructure across AWS — built to scale without surprises.
          </p>
        </div>

        {/* Card 5: ERP */}
        <div className="service-card" data-idx="5">
          <div className="service-num">05 / ERP</div>
          <div className="service-stage">
            <div className="obj-erp">
              <div className="face f1"></div>
              <div className="face f2"></div>
              <div className="face f3"></div>
              <div className="face f4"></div>
              <div className="face f5"></div>
              <div className="face f6"></div>
            </div>
          </div>
          <h3>Enterprise Systems</h3>
          <p>
            Unified ERP platforms that connect finance, ops, and people into one glowing source of truth.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Services;
