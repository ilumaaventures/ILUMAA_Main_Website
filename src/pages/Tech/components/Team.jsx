import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TEAM_MEMBERS = [
  {
    name: "Aman Tomar",
    role: "Lead Architect",
    bio: "Shapes overall technical vision, leads core protocol design, and orchestrates large-scale distributed cloud systems.",
    avatarId: "avatar-aditya",
    skills: [0.95, 0.8, 0.7, 0.85, 0.9],
    telemetry: {
      host: "node-01.ilumaa.net",
      status: "LEAD OPERATOR",
      load: "84%",
      latency: "14ms",
      signature: "0x7F4A6E8C2B1D",
      uptime: "99.98%",
    },
    logs: [
      "Connecting to node-01.ilumaa.net...",
      "Handshake established via secure crypto tunnel.",
      "Syncing telemetry parameters... OK",
      "System: STABLE. Temperature nominal.",
      "Active modules: [SYSTEM_ARCH, DIST_DATABASES, CORE_NET]",
      "Last action: Deployed multi-region failover cluster.",
      "Signature verification: PASS [0x7F4A...]",
    ],
  },
  {
    name: "Sarthak Singh",
    role: "Senior Developer",
    bio: "Focuses on model optimization, custom NLP processing, and agentic workflows for automated decision-making.",
    avatarId: "avatar-karan",
    skills: [0.8, 0.95, 0.6, 0.7, 0.85],
    telemetry: {
      host: "node-02.ilumaa.net",
      status: "ACTIVE NODE",
      load: "62%",
      latency: "28ms",
      signature: "0x3B9D1F4E7A2C",
      uptime: "99.95%",
    },
    logs: [
      "Connecting to node-02.ilumaa.net...",
      "Initializing semantic intelligence handshake...",
      "Checking vector pipeline health... OK",
      "System: SECURED. Load average: 1.24.",
      "Active modules: [MODEL_OPTIM, NLP_CORE, FLOW_AGENT]",
      "Last action: Tuned LLM orchestration prompt routers.",
      "Signature verification: PASS [0x3B9D...]",
    ],
  },
  // {
  //   name: "Rhea Sen",
  //   role: "Frontend & WebGL Craftsman",
  //   bio: "Shapes interactive layers, user experiences, and fluid animations utilizing hardware acceleration.",
  //   avatarId: "avatar-rhea",
  //   skills: [0.7, 0.65, 0.95, 0.6, 0.75],
  //   telemetry: {
  //     host: "node-03.ilumaa.net",
  //     status: "ACTIVE NODE",
  //     load: "41%",
  //     latency: "18ms",
  //     signature: "0xE4C190D2B8A5",
  //     uptime: "99.91%",
  //   },
  //   logs: [
  //     "Connecting to node-03.ilumaa.net...",
  //     "Syncing GLSL renderer parameters... OK",
  //     "Calibrating viewport canvas... OK",
  //     "System: REFRESHED. Target FPS: 120.",
  //     "Active modules: [WEBGL_GLSL, THREE_CORE, UX_MOTION]",
  //     "Last action: Optimized GPU-bound page transition shaders.",
  //     "Signature verification: PASS [0xE4C1...]",
  //   ],
  // },
  // {
  //   name: "Dev Patel",
  //   role: "Cloud & Infrastructure Specialist",
  //   bio: "Hardens network infrastructure, optimizes zero-downtime CI/CD pipelines, and manages auto-scaling Kubernetes clusters.",
  //   avatarId: "avatar-dev",
  //   skills: [0.85, 0.7, 0.55, 0.95, 0.8],
  //   telemetry: {
  //     host: "node-04.ilumaa.net",
  //     status: "ACTIVE NODE",
  //     load: "29%",
  //     latency: "9ms",
  //     signature: "0x9D2E55C1A3F7",
  //     uptime: "99.99%",
  //   },
  //   logs: [
  //     "Connecting to node-04.ilumaa.net...",
  //     "Auditing cloud compliance protocols...",
  //     "Pinging Kubernetes controller node... OK",
  //     "System: SECURED. Latency: 9ms.",
  //     "Active modules: [DEVSEC_OPS, K8S_CORE, INFRA_TERRA]",
  //     "Last action: Hardened Blue/Green production rollouts.",
  //     "Signature verification: PASS [0x9D2E...]",
  //   ],
  // },
];

const center = 120;
const R = 75;
const angles = [
  -Math.PI / 2,
  -Math.PI / 2 + (2 * Math.PI) / 5,
  -Math.PI / 2 + (4 * Math.PI) / 5,
  -Math.PI / 2 + (6 * Math.PI) / 5,
  -Math.PI / 2 + (8 * Math.PI) / 5,
];

const getPoints = (skills) => {
  return angles
    .map((angle, idx) => {
      const val = skills[idx];
      const x = center + R * val * Math.cos(angle);
      const y = center + R * val * Math.sin(angle);
      return `${x},${y}`;
    })
    .join(" ");
};

const BiometricAvatar = ({ isActive }) => {
  return (
    <div className={`bio-avatar-wrapper ${isActive ? "active" : ""}`}>
      <svg className="bio-avatar-svg" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="46" className="scanner-outer-ring" />
        <circle cx="50" cy="50" r="41" className="scanner-dash-ring" />
        <line x1="50" y1="50" x2="50" y2="9" className="scanner-sweep-line" />

        <g className="scanner-face-geometry">
          <path
            d="M 50 25 C 37 25 35 39 35 50 C 35 61 39 71 50 77 C 61 71 65 61 65 50 C 65 39 63 25 50 25 Z"
            className="face-outline"
          />
          <line x1="30" y1="50" x2="70" y2="50" className="crosshair-h" />
          <line x1="50" y1="21" x2="50" y2="79" className="crosshair-v" />
          <circle cx="43" cy="46" r="2.5" className="eye-node left" />
          <circle cx="57" cy="46" r="2.5" className="eye-node right" />
          <path d="M 43 46 L 50 53 L 57 46" className="link-path" />
          <circle cx="50" cy="53" r="2" className="core-node" />
          <path d="M 46 64 Q 50 67 54 64" className="mouth-path" />
        </g>

        <path d="M 12 12 L 8 12 L 8 8 L 12 8" className="corner-marker" />
        <path d="M 88 12 L 92 12 L 92 8 L 88 8" className="corner-marker" />
        <path d="M 12 88 L 8 88 L 8 92 L 12 92" className="corner-marker" />
        <path d="M 88 88 L 92 88 L 92 92 L 88 92" className="corner-marker" />
      </svg>
    </div>
  );
};

function Team() {
  const containerRef = useRef(null);
  const consoleEndRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [typedLogs, setTypedLogs] = useState([]);

  // GSAP scroll trigger for team entrance
  useEffect(() => {
    if (!containerRef.current) return;

    const head = containerRef.current.querySelector(".section-head");
    const grid = containerRef.current.querySelector(".team-grid-layout");

    const animations = [];

    if (head) {
      const animHead = gsap.fromTo(
        head,
        { opacity: 0, y: 50, rotateX: 6, transformPerspective: 800 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: head,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
      if (animHead.scrollTrigger) animations.push(animHead.scrollTrigger);
    }

    if (grid) {
      const animGrid = gsap.fromTo(
        grid,
        { opacity: 0, y: 70 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: grid,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );
      if (animGrid.scrollTrigger) animations.push(animGrid.scrollTrigger);
    }

    return () => {
      animations.forEach((trigger) => trigger.kill());
    };
  }, []);

  // Emulated Terminal Typing Logs Effect
  useEffect(() => {
    setTypedLogs([]);
    const lines = TEAM_MEMBERS[activeIndex].logs;
    let currentLine = 0;

    const interval = setInterval(() => {
      if (currentLine < lines.length) {
        setTypedLogs((prev) => [...prev, lines[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
      }
    }, 120);

    return () => clearInterval(interval);
  }, [activeIndex]);

  // Autoscroll terminal
  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [typedLogs]);

  const activeMember = TEAM_MEMBERS[activeIndex];

  // Helper label text anchors and positions for SVG radar
  const radarLabels = [
    { text: "ARCH", x: center, y: center - R - 12, anchor: "middle" },
    {
      text: "INTEL",
      x: center + R * Math.cos(angles[1]) + 12,
      y: center + R * Math.sin(angles[1]) + 4,
      anchor: "start",
    },
    {
      text: "UI/UX",
      x: center + R * Math.cos(angles[2]) + 12,
      y: center + R * Math.sin(angles[2]) + 8,
      anchor: "start",
    },
    {
      text: "OPS",
      x: center + R * Math.cos(angles[3]) - 12,
      y: center + R * Math.sin(angles[3]) + 8,
      anchor: "end",
    },
    {
      text: "SYS",
      x: center + R * Math.cos(angles[4]) - 12,
      y: center + R * Math.sin(angles[4]) + 4,
      anchor: "end",
    },
  ];

  return (
    <section id="team" ref={containerRef}>
      <div className="section-head">
        <div className="eyebrow">The Operators</div>
        <h2>
          Minds behind
          <br />
          <span className="grad-text">the digital grid.</span>
        </h2>
      </div>

      <div className="team-grid-layout">
        {/* Left: Interactive Operator Grid */}
        <div className="operators-list">
          {TEAM_MEMBERS.map((member, idx) => {
            const isSelected = activeIndex === idx;
            return (
              <div
                key={idx}
                className={`operator-card ${isSelected ? "selected" : ""}`}
                onClick={() => setActiveIndex(idx)}
                data-cursor="hover"
              >
                <div className="card-top">
                  <BiometricAvatar isActive={isSelected} />
                  <div className="operator-meta">
                    <span className="node-host">{member.telemetry.host}</span>
                    <h3>{member.name}</h3>
                    <span className="operator-role">{member.role}</span>
                  </div>
                </div>

                <div className="card-telemetry">
                  <div className="tel-row">
                    <span className="tel-label">Load</span>
                    <div className="tel-bar-wrap">
                      <div
                        className="tel-bar"
                        style={{ width: member.telemetry.load }}
                      ></div>
                    </div>
                    <span className="tel-val">{member.telemetry.load}</span>
                  </div>
                  <div className="tel-row">
                    <span className="tel-label">Latency</span>
                    <span className="tel-val">{member.telemetry.latency}</span>
                  </div>
                  <div className="tel-row">
                    <span className="tel-label">Uptime</span>
                    <span className="tel-val">{member.telemetry.uptime}</span>
                  </div>
                </div>

                {/* Status Dot */}
                <div className={`status-pill ${isSelected ? "active" : ""}`}>
                  <i className="status-dot"></i>
                  <span>{member.telemetry.status}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Telemetry Terminal Panel */}
        <div className="terminal-console">
          <div className="terminal-header">
            <div className="window-dots">
              <span className="w-dot red"></span>
              <span className="w-dot yellow"></span>
              <span className="w-dot green"></span>
            </div>
            <div className="terminal-title">
              TELEMETRY CONSOLE // {activeMember.name.toUpperCase()}
            </div>
          </div>

          <div className="terminal-body">
            {/* Visual Telemetry Chart Section */}
            <div className="telemetry-visual-pane">
              <div className="radar-wrapper">
                <svg viewBox="0 0 240 240" className="radar-svg">
                  {/* Outer & Inner grid polygons */}
                  {[0.25, 0.5, 0.75, 1.0].map((scale, gridIdx) => (
                    <polygon
                      key={gridIdx}
                      points={getPoints([scale, scale, scale, scale, scale])}
                      fill="none"
                      stroke="var(--line)"
                      strokeWidth="0.6"
                      strokeDasharray={scale === 1.0 ? "none" : "3,3"}
                    />
                  ))}

                  {/* Axis lines */}
                  {angles.map((angle, idx) => {
                    const x = center + R * Math.cos(angle);
                    const y = center + R * Math.sin(angle);
                    return (
                      <line
                        key={idx}
                        x1={center}
                        y1={center}
                        x2={x}
                        y2={y}
                        stroke="var(--line)"
                        strokeWidth="0.6"
                      />
                    );
                  })}

                  {/* Skills dynamic polygon filled and stroked */}
                  <polygon
                    points={getPoints(activeMember.skills)}
                    fill="rgba(34, 211, 238, 0.15)"
                    stroke="var(--cyan-glow)"
                    strokeWidth="1.5"
                    className="radar-filled-polygon"
                  />

                  {/* Skills endpoints */}
                  {angles.map((angle, idx) => {
                    const val = activeMember.skills[idx];
                    const x = center + R * val * Math.cos(angle);
                    const y = center + R * val * Math.sin(angle);
                    return (
                      <circle
                        key={idx}
                        cx={x}
                        cy={y}
                        r="3.5"
                        fill="var(--black)"
                        stroke="var(--cyan-glow)"
                        strokeWidth="1.5"
                        className="radar-vertex"
                      />
                    );
                  })}

                  {/* Radar Labels */}
                  {radarLabels.map((lbl, idx) => (
                    <text
                      key={idx}
                      x={lbl.x}
                      y={lbl.y}
                      fill="var(--muted)"
                      fontSize="9"
                      fontFamily="var(--mono)"
                      textAnchor={lbl.anchor}
                      className="radar-label"
                    >
                      {lbl.text}
                    </text>
                  ))}
                </svg>
              </div>

              {/* Bio summary pane */}
              <div className="operator-bio-pane">
                <h4>BIOMETRIC SYNOPSIS</h4>
                <p>{activeMember.bio}</p>
                <div className="signature-box">
                  <span className="sig-lbl">SIG //</span>
                  <span className="sig-code">
                    {activeMember.telemetry.signature}
                  </span>
                </div>
              </div>
            </div>

            {/* Simulated Live Console Log */}
            <div className="console-log-pane">
              <div className="console-scroll">
                {typedLogs.map((log, lIdx) => (
                  <div key={lIdx} className="console-line">
                    <span className="line-prefix">&gt;</span> {log}
                  </div>
                ))}
                {typedLogs.length < activeMember.logs.length && (
                  <div className="console-line cursor-line">
                    <span className="line-prefix">&gt;</span>
                    <span className="pulse-caret">_</span>
                  </div>
                )}
                <div ref={consoleEndRef} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Team;
