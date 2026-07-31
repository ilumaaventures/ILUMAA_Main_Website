import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const aiMessagesList = [
  "Analyzing Q3 growth signals...",
  "Routing intent to Model Fleet v4...",
  "System health: 99.98% nominal.",
  "Deploying zero-downtime release...",
];

function Hero() {
  const heroRightRef = useRef(null);
  const dashboardRef = useRef(null);
  const [aiMsgText, setAiMsgText] = useState("");

  // AI Message typing effect loop
  useEffect(() => {
    let msgIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let timer;

    const typeLoop = () => {
      const currentFullMsg = aiMessagesList[msgIdx];

      if (!isDeleting) {
        setAiMsgText(currentFullMsg.substring(0, charIdx + 1));
        charIdx++;

        if (charIdx === currentFullMsg.length) {
          isDeleting = true;
          timer = setTimeout(typeLoop, 2200);
          return;
        }
      } else {
        setAiMsgText(currentFullMsg.substring(0, charIdx - 1));
        charIdx--;

        if (charIdx === 0) {
          isDeleting = false;
          msgIdx = (msgIdx + 1) % aiMessagesList.length;
        }
      }

      const speed = isDeleting ? 30 : 60;
      timer = setTimeout(typeLoop, speed);
    };

    timer = setTimeout(typeLoop, 600);

    return () => clearTimeout(timer);
  }, []);

  // GSAP Entrance & Mouse 3D Tilt Interaction
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title Word Reveal
      gsap.from(".hero-title .word span", {
        y: "100%",
        duration: 1.1,
        stagger: 0.08,
        ease: "power4.out",
        delay: 0.2,
      });

      // Sub, CTAs & Trust row reveal
      gsap.from(".hero .reveal-up", {
        opacity: 0,
        y: 36,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.5,
      });

      // Chart Line Draw Animation
      const chartLine = document.getElementById("chartLine");
      if (chartLine) {
        gsap.to(chartLine, {
          strokeDashoffset: 0,
          duration: 2.2,
          ease: "power2.out",
          delay: 0.8,
        });
      }

      // Initial Dashboard Floating Entrance
      gsap.from(dashboardRef.current, {
        opacity: 0,
        scale: 0.88,
        rotateY: -20,
        rotateX: 15,
        duration: 1.4,
        ease: "power3.out",
        delay: 0.4,
      });
    });

    // 3D Perspective Tilt on Mouse Movement
    const rightCol = heroRightRef.current;
    const dash = dashboardRef.current;

    if (rightCol && dash) {
      const isTouch =
        window.matchMedia("(hover:none)").matches || window.innerWidth < 980;

      if (!isTouch) {
        const handleMouseMove = (e) => {
          const r = rightCol.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;

          gsap.to(dash, {
            rotateY: x * 26,
            rotateX: -y * 22,
            duration: 0.5,
            ease: "power2.out",
          });
        };

        const handleMouseLeave = () => {
          gsap.to(dash, {
            rotateY: -8,
            rotateX: 6,
            duration: 1,
            ease: "power3.out",
          });
        };

        rightCol.addEventListener("mousemove", handleMouseMove);
        rightCol.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          rightCol.removeEventListener("mousemove", handleMouseMove);
          rightCol.removeEventListener("mouseleave", handleMouseLeave);
          ctx.revert();
        };
      }
    }

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" className="section hero">
      <div className="hero-grid">
        <div className="hero-left">
          <div className="eyebrow">AI · Web · Mobile · ERP · Cloud</div>
          <h3 className="hero-title" id="heroTitle">
            <span className="word">
              <span>Build</span>
            </span>{" "}
            <span className="word">
              <span>Intelligent</span>
            </span>{" "}
            <span className="word">
              <span>Digital</span>
            </span>{" "}
            <span className="word">
              <span>Products</span>
            </span>
            <br />
            <span className="word">
              <span className="grad-text">Powered</span>
            </span>{" "}
            <span className="word">
              <span className="grad-text">by</span>
            </span>{" "}
            <span className="word">
              <span className="grad-text">AI</span>
            </span>
          </h3>
          <p className="hero-sub reveal-up" id="heroSub">
            We help startups and enterprises build AI-powered software, scalable
            web platforms, mobile applications, ERP systems and cloud solutions.
          </p>
          <div className="hero-cta-row reveal-up" id="heroCtas">
            <a
              href="#cta"
              className="btn btn-primary magnetic"
              data-cursor="hover"
            >
              Start Your Project
            </a>
            <a
              href="#projects"
              className="btn btn-secondary magnetic"
              data-cursor="hover"
            >
              Explore Our Work
            </a>
          </div>
        </div>

        <div className="hero-right" id="heroRight" ref={heroRightRef}>
          <div className="dashboard-wrap">
            <div className="dashboard" id="dashboard" ref={dashboardRef}>
              <div className="orbit-panel glass op-1">
                <div className="label">Active Users</div>
                <div className="value">24,981</div>
              </div>
              <div className="orbit-panel glass op-2">
                <div className="label">Deploys Today</div>
                <div className="value">312</div>
              </div>
              <div className="orbit-panel glass op-3">
                <div className="label">Model Latency</div>
                <div className="value">86ms</div>
              </div>
              <div className="orbit-panel glass op-4">
                <div className="label">Uptime</div>
                <div className="value">99.98%</div>
              </div>

              <div className="dash-main">
                <div className="dash-topbar">
                  <div className="dash-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div className="dash-title">IlummTech · Command Center</div>
                  <div className="dash-badge">
                    <i></i>Live
                  </div>
                </div>

                <div className="dash-grid">
                  <div className="kpi">
                    <div className="label">Revenue</div>
                    <div className="value">482</div>
                    <div className="delta up">▲ 18.4%</div>
                  </div>
                  <div className="kpi">
                    <div className="label">Pipeline</div>
                    <div className="value">1,204</div>
                    <div className="delta up">▲ 6.1%</div>
                  </div>
                  <div className="kpi">
                    <div className="label">Churn</div>
                    <div className="value">1.2%</div>
                    <div className="delta down">▼ 0.4%</div>
                  </div>
                </div>

                <div className="dash-chart">
                  <div className="chart-head">
                    <span>Revenue Analytics</span>
                    <span>Last 30 days</span>
                  </div>
                  <svg viewBox="0 0 320 90" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#33e6ff" />
                        <stop offset="50%" stopColor="#4f7dff" />
                        <stop offset="100%" stopColor="#9b5cff" />
                      </linearGradient>
                    </defs>
                    <path
                      className="chart-fill"
                      d="M0,70 C40,60 60,40 90,45 C120,50 140,20 170,25 C200,30 220,10 250,15 C280,20 300,5 320,10 L320,90 L0,90 Z"
                      fill="url(#lineGrad)"
                    ></path>
                    <path
                      className="chart-line"
                      id="chartLine"
                      d="M0,70 C40,60 60,40 90,45 C120,50 140,20 170,25 C200,30 220,10 250,15 C280,20 300,5 320,10"
                    ></path>
                  </svg>
                </div>

                <div className="dash-bottom">
                  <div className="dash-ai">
                    <div className="label">AI Assistant</div>
                    <div className="msg" id="aiTypeMsg">
                      {aiMsgText}
                      <span className="animate-pulse">|</span>
                    </div>
                  </div>
                  <div className="dash-list">
                    <div className="row">
                      <span
                        className="dot"
                        style={{ background: "#5ee6a8" }}
                      ></span>{" "}
                      New deployment succeeded
                    </div>
                    <div className="row">
                      <span
                        className="dot"
                        style={{ background: "var(--cyan)" }}
                      ></span>{" "}
                      Model retrained · 2m ago
                    </div>
                    <div className="row">
                      <span
                        className="dot"
                        style={{ background: "var(--purple-soft)" }}
                      ></span>{" "}
                      3 new enterprise leads
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-cue">
        <span></span>Scroll
      </div>
    </section>
  );
}

export default Hero;
