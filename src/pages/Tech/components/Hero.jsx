import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const codeSnippets = [
  { text: "const core = new Intelligence();", left: "15%", top: "20%" },
  { text: "model.route(intent) → action", left: "75%", top: "28%" },
  { text: "⟶ deploying...", left: "12%", top: "70%" },
  { text: "system.online = true", left: "78%", top: "68%" },
  { text: "∑ nodes: 14208", left: "30%", top: "80%" },
  { text: "GET /v1/infer 200 OK", left: "62%", top: "15%" },
];

function Hero({ isLoaded }) {
  const snippetsRef = useRef([]);
  const hudTLRef = useRef(null);
  const hudTRRef = useRef(null);
  const innerRef = useRef(null);
  const cueRef = useRef(null);

  useEffect(() => {
    // Initial scroll animation setup (fades elements as you scroll down the long hero container)
    const scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero-wrap",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
      },
    });

    scrollTimeline
      .to(
        [hudTLRef.current, hudTRRef.current],
        { opacity: 1, duration: 0.08 },
        0.02,
      )
      .to(
        innerRef.current,
        {
          opacity: 0,
          y: -60,
          filter: "blur(6px)",
          duration: 0.16,
          ease: "power1.in",
        },
        0.08,
      )
      .to(cueRef.current, { opacity: 0, duration: 0.08 }, 0)
      .to(
        [hudTLRef.current, hudTRRef.current],
        { opacity: 0, duration: 0.1 },
        0.62,
      );

    // Dynamic scroll timeline setup for each floating code snippet
    const snippetTimelines = [];
    snippetsRef.current.forEach((el, i) => {
      if (!el) return;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#hero-wrap",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
        },
      });

      tl.to(el, { opacity: 0.85, duration: 0.06 }, 0.22 + i * 0.02).to(
        el,
        { opacity: 0, y: -20, duration: 0.1 },
        0.4 + i * 0.02,
      );

      snippetTimelines.push(tl);
    });

    return () => {
      scrollTimeline.scrollTrigger?.kill();
      scrollTimeline.kill();
      snippetTimelines.forEach((tl) => {
        tl.scrollTrigger?.kill();
        tl.kill();
      });
    };
  }, []);

  // Entry play-in animations trigger once loader confirms completion
  useEffect(() => {
    if (isLoaded) {
      gsap.from(".hero-inner .eyebrow", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.2,
      });
      gsap.from(".hero-title", {
        opacity: 0,
        y: 40,
        filter: "blur(10px)",
        duration: 1.1,
        delay: 0.35,
        ease: "power3.out",
      });
      gsap.from(".hero-sub", { opacity: 0, y: 20, duration: 0.9, delay: 0.6 });
      gsap.from(".hero-ctas", {
        opacity: 0,
        y: 20,
        duration: 0.9,
        delay: 0.75,
      });
      gsap.from(".hero-dashboard-wrapper", {
        opacity: 0,
        x: 40,
        scale: 0.96,
        filter: "blur(10px)",
        duration: 1.2,
        delay: 0.5,
        ease: "power2.out",
      });
      gsap.from(".scroll-cue", { opacity: 0, duration: 1, delay: 1.1 });
    }
  }, [isLoaded]);

  return (
    <div id="hero-wrap">
      <div id="hero-pin">
        <div className="hud tl" ref={hudTLRef}>
          SYS.STATUS <span>ONLINE</span>
          <br />
          CORE.TEMP <span>NOMINAL</span>
        </div>
        <div className="hud br" ref={hudTRRef}>
          NODES <span>14,208</span>
          <br />
          LATENCY <span>&lt;9ms</span>
        </div>
        <div className="hero-inner" ref={innerRef}>
          {/* Left */}
          <div className="hero-text-col">
            <div className="eyebrow">ILUMMTECH // INTELLIGENT SYSTEMS</div>
            <h1 className="hero-title">
              We build the intelligence
              <br />
              behind what's <span className="grad-text">next.</span>
            </h1>
            <p className="hero-sub">
              IlummTech engineers AI, cloud, and product systems that think,
              scale, and ship — from a single glowing idea to a living network.
            </p>
            <div className="hero-ctas">
              <a
                href="#services"
                className="btn btn-primary magnetic"
                data-cursor="hover"
              >
                Explore the core
              </a>
              <a
                href="#projects"
                className="btn btn-ghost magnetic"
                data-cursor="hover"
              >
                See our work
              </a>
            </div>
          </div>
          {/* Right */}
          <div className="hero-image-col">
            <div className="hero-dashboard-wrapper">
              <div className="hero-dashboard-card">
                {/* Header Dots */}
                <div className="dashboard-header">
                  <span className="dot dot-red"></span>
                  <span className="dot dot-yellow"></span>
                  <span className="dot dot-green"></span>
                </div>

                {/* Dashboard Grid */}
                <div className="dashboard-grid">
                  {/* Left Metric Card */}
                  <div className="dashboard-card card-metric">
                    <div className="metric-number">98.4%</div>
                    <div className="metric-title">Operational clarity</div>
                  </div>

                  {/* Right Chart Card */}
                  <div className="dashboard-card card-chart">
                    {/* Speech Bubble */}
                    <div className="speech-bubble">
                      <span className="speech-text">
                        People ops, made simpler.
                      </span>
                      <span className="speech-arrow"></span>
                    </div>

                    {/* Chart Bars */}
                    <div className="bar-chart">
                      <span className="chart-bar bar-1"></span>
                      <span className="chart-bar bar-2"></span>
                      <span className="chart-bar bar-3"></span>
                      <span className="chart-bar bar-4"></span>
                      <span className="chart-bar bar-5"></span>
                    </div>

                    {/* Waving Hand character peeking */}
                    <div className="waving-hand-container">
                      {/* <span className="waving-emoji">👋</span> */}
                    </div>
                  </div>
                </div>

                {/* Bottom Row Pills */}
                <div className="dashboard-pills">
                  <span className="dashboard-pill">People</span>
                  <span className="dashboard-pill">Finance</span>
                  <span className="dashboard-pill">Cloud</span>
                </div>
              </div>

              {/* Floating Badge (bottom left, overlapping) */}
              <div className="dashboard-badge">
                <span className="badge-glow"></span>
                <span className="badge-icon">⚡</span>
                <span className="badge-text">+41% faster operations</span>
              </div>
            </div>
          </div>
        </div>
        <div className="scroll-cue" ref={cueRef}>
          <span>SCROLL</span>
          <span className="stick"></span>
        </div>
        {codeSnippets.map((snippet, idx) => (
          <div
            key={idx}
            className="code-float"
            style={{ left: snippet.left, top: snippet.top }}
            ref={(el) => (snippetsRef.current[idx] = el)}
          >
            {snippet.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hero;
