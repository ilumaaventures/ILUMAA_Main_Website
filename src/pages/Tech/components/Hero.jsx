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
  const cueRef = useRef(null);
  const heroRightRef = useRef(null);
  const dashTiltRef = useRef(null);

  // 3D Tilt interaction on mouse movement over the right console
  useEffect(() => {
    const isTouch =
      window.matchMedia("(hover:none)").matches || window.innerWidth < 1000;
    if (isTouch) return;

    const rightCol = heroRightRef.current;
    const tilt = dashTiltRef.current;
    if (!rightCol || !tilt) return;

    const handleMouseMove = (e) => {
      const rect = rightCol.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Base tilt is rotateX(8deg) rotateY(-14deg)
      const rotateX = 8 + (centerY - y) / 25;
      const rotateY = -14 + (x - centerX) / 25;

      gsap.to(tilt, {
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 1600,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(tilt, {
        rotateX: 8,
        rotateY: -14,
        duration: 0.8,
        ease: "power3.out",
      });
    };

    rightCol.addEventListener("mousemove", handleMouseMove);
    rightCol.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      rightCol.removeEventListener("mousemove", handleMouseMove);
      rightCol.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // GSAP ScrollTrigger timeline & Entry animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entry animations
      gsap.from(".hero-left .eyebrow", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.2,
      });
      gsap.from(".hero-title .line span", {
        y: "100%",
        duration: 1,
        delay: 0.35,
        stagger: 0.15,
        ease: "power3.out",
      });
      gsap.from(".hero-sub", { opacity: 0, y: 20, duration: 0.9, delay: 0.6 });
      gsap.from(".hero-ctas", {
        opacity: 0,
        y: 20,
        duration: 0.9,
        delay: 0.75,
      });
      gsap.from(".trust", {
        opacity: 0,
        y: 20,
        duration: 0.9,
        delay: 0.85,
      });
      gsap.from(".dash-scene", {
        opacity: 0,
        scale: 0.9,
        duration: 1.2,
        delay: 0.5,
        ease: "power2.out",
      });
      gsap.from(".scroll-cue", { opacity: 0, duration: 1, delay: 1.1 });

      // Scroll timeline
      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#hero-wrap",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
        },
      });

      scrollTimeline
        .to(hudTLRef.current, { opacity: 1, duration: 0.08 }, 0.02)
        .to(
          ".hero-grid",
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
        .to(hudTLRef.current, { opacity: 0, duration: 0.1 }, 0.62);

      // Floating code snippets animation
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
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div id="hero-wrap">
      <div id="hero-pin">
        <div className="hud tl" ref={hudTLRef}>
          SYS.STATUS <span>ONLINE</span>
          <br />
          CORE.TEMP <span>NOMINAL</span>
        </div>

        <div className="hero-grid">
          <div className="hero-left">
            <div className="eyebrow">ILUMAATECH // INTELLIGENT SYSTEMS</div>
            <h1 className="hero-title">
              <span className="line">
                <span>Build Intelligent Digital</span>
              </span>
              <span className="line">
                <span>
                  Products <span className="grad-text">Powered by ILUMAA.</span>
                </span>
              </span>
            </h1>
            <p className="hero-sub">
              IlummTech engineers AI, cloud, and product systems that think,
              scale, and ship — from a single glowing idea to a living network.
            </p>
            <div className="hero-ctas">
              <a
                href="#cta"
                className="btn btn-primary magnetic"
                data-cursor="hover"
              >
                Start Your Project
              </a>
              <a
                href="#projects"
                className="btn btn-ghost magnetic"
                data-cursor="hover"
              >
                Explore Our Work
              </a>
            </div>
          </div>

          <div className="hero-right" ref={heroRightRef}>
            <div className="dash-scene">
              <div className="dash-tilt" id="dashTilt" ref={dashTiltRef}>
                <div className="dash-main glass">
                  <div className="dash-head">
                    <div className="dash-tabs">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <div className="dash-title">
                      ILUMAATECH · OPERATIONS CONSOLE
                    </div>
                    <div className="dash-live">
                      <i></i>LIVE
                    </div>
                  </div>
                  <div className="dash-kpis">
                    <div className="kpi">
                      <div className="k-label"></div>
                      <div className="k-val">482K</div>
                      <div className="k-delta">▲ 12.4%</div>
                    </div>
                    <div className="kpi">
                      <div className="k-label">ACTIVE USERS</div>
                      <div className="k-val">289</div>
                      <div className="k-delta">▲ 8.1%</div>
                    </div>
                    <div className="kpi">
                      <div className="k-label">CHURN</div>
                      <div className="k-val">1.2%</div>
                      <div className="k-delta down">▼ 0.3%</div>
                    </div>
                  </div>
                  <div className="dash-chart">
                    <svg viewBox="0 0 400 130" preserveAspectRatio="none">
                      <defs>
                        <linearGradient
                          id="chartFill"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0"
                            stopColor="#8b5cf6"
                            stopOpacity="0.55"
                          />
                          <stop
                            offset="1"
                            stopColor="#22d3ee"
                            stopOpacity="0"
                          />
                        </linearGradient>
                        <linearGradient
                          id="chartLine"
                          x1="0"
                          y1="0"
                          x2="1"
                          y2="0"
                        >
                          <stop offset="0" stopColor="#63a4ff" />
                          <stop offset="0.5" stopColor="#b18aff" />
                          <stop offset="1" stopColor="#7cf1ff" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0,95 C20,90 35,60 55,64 C75,68 85,40 110,42 C135,44 150,80 175,74 C200,68 210,30 235,28 C260,26 275,58 300,50 C325,42 340,20 365,22 C385,24 395,15 400,10 L400,130 L0,130 Z"
                        fill="url(#chartFill)"
                      />
                      <path
                        d="M0,95 C20,90 35,60 55,64 C75,68 85,40 110,42 C135,44 150,80 175,74 C200,68 210,30 235,28 C260,26 275,58 300,50 C325,42 340,20 365,22 C385,24 395,15 400,10"
                        fill="none"
                        stroke="url(#chartLine)"
                        strokeWidth="2.2"
                      />
                    </svg>
                  </div>
                  <div className="dash-foot">
                    <div className="crm-row">
                      <span>New leads</span>
                      <b>184</b>
                    </div>
                    <div className="crm-row">
                      <span>Deals closed</span>
                      <b>37</b>
                    </div>
                    <div className="crm-row">
                      <span>Pipeline</span>
                      <b>190.2</b>
                    </div>
                  </div>
                </div>

                <div className="dash-float f-ai glass">
                  <div className="f-title">
                    <i></i>AI ASSISTANT
                  </div>
                  <div className="ai-msg">"Show me Q3 growth by region"</div>
                  <div className="ai-typing">
                    <i></i>
                    <i></i>
                    <i></i>
                  </div>
                </div>

                <div className="dash-float f-notif glass">
                  <div className="f-title">
                    <i></i>NOTIFICATIONS
                  </div>
                  <div className="notif-item">
                    <i
                      style={{
                        background: "#63a4ff",
                        boxShadow: "0 0 6px #63a4ff",
                      }}
                    ></i>
                    Deployment succeeded — API v2.4
                  </div>
                  <div className="notif-item">
                    <i
                      style={{
                        background: "#b18aff",
                        boxShadow: "0 0 6px #b18aff",
                      }}
                    ></i>
                    New enterprise signup — Helix Labs
                  </div>
                  <div className="notif-item">
                    <i
                      style={{
                        background: "#7cf1ff",
                        boxShadow: "0 0 6px #7cf1ff",
                      }}
                    ></i>
                    Anomaly resolved — Cluster 3
                  </div>
                </div>

                <div className="dash-float f-users glass">
                  <div className="f-title">
                    <i></i>USER ANALYTICS
                  </div>
                  <div className="donut-wrap">
                    <svg width="54" height="54" viewBox="0 0 54 54">
                      <circle
                        cx="27"
                        cy="27"
                        r="22"
                        fill="none"
                        stroke="rgba(255,255,255,.08)"
                        strokeWidth="6"
                      />
                      <circle
                        cx="27"
                        cy="27"
                        r="22"
                        fill="none"
                        stroke="#63a4ff"
                        strokeWidth="6"
                        strokeDasharray="138"
                        strokeDashoffset="60"
                        transform="rotate(-90 27 27)"
                      />
                      <circle
                        cx="27"
                        cy="27"
                        r="22"
                        fill="none"
                        stroke="#b18aff"
                        strokeWidth="6"
                        strokeDasharray="40 138"
                        strokeDashoffset="0"
                        transform="rotate(58 27 27)"
                      />
                    </svg>
                    <div>
                      <div className="donut-pct">72%</div>
                      <div className="donut-label">Organic traffic</div>
                    </div>
                  </div>
                </div>

                <div className="dash-float f-timeline glass">
                  <div className="f-title">
                    <i></i>ACTIVITY
                  </div>
                  <div className="tl-item">
                    <span className="tl-dot"></span>Build #482 deployed to prod
                  </div>
                  <div className="tl-item">
                    <span className="tl-dot"></span>Model retrained · 99.1% acc.
                  </div>
                  <div className="tl-item">
                    <span className="tl-dot"></span>3 PRs merged to main
                  </div>
                </div>

                <div className="dash-float f-kpi glass">
                  <div className="f-title">
                    <i></i>UPTIME
                  </div>
                  <div className="donut-pct">99.98%</div>
                  <svg
                    className="spark"
                    viewBox="0 0 120 26"
                    preserveAspectRatio="none"
                  >
                    <polyline
                      points="0,18 15,14 30,20 45,10 60,15 75,6 90,12 105,4 120,9"
                      fill="none"
                      stroke="#7cf1ff"
                      strokeWidth="1.6"
                    />
                  </svg>
                </div>
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
