import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Process() {
  useEffect(() => {
    const isTouch =
      window.matchMedia("(hover:none)").matches || window.innerWidth < 900;
    if (isTouch) return;

    const track = document.getElementById("processTrack");
    const pin = document.getElementById("processPin");
    const bar = document.getElementById("processBar");

    if (track && pin) {
      const anim = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth + 120),
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () => `+=${track.scrollWidth}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (bar) {
              bar.style.width = `${Math.round(self.progress * 100)}%`;
            }
          },
        },
      });

      return () => {
        if (anim.scrollTrigger) anim.scrollTrigger.kill();
        anim.kill();
      };
    }
  }, []);

  return (
    <section id="process" className="section process">
      <div className="section-inner">
        <div className="section-head">
          <span className="eyebrow">How we work</span>
          <h2>
            An assembly line for{" "}
            <span className="grad-text">shipping software.</span>
          </h2>
          <p>
            Seven stations, one continuous line &mdash; from a rough idea to a
            system running in production.
          </p>
        </div>
      </div>

      <div className="process-pin" id="processPin">
        <div className="process-track" id="processTrack">
          <div className="process-line"></div>

          <div className="station">
            <span className="station-num">STAGE 01</span>
            <div className="station-rig">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6">
                <path d="M9 18h6M10 21h4M12 3a6 6 0 00-3.6 10.8c.5.4.6 1 .6 1.6v.6h6v-.6c0-.6.1-1.2.6-1.6A6 6 0 0012 3z" />
              </svg>
            </div>
            <h4>Idea</h4>
            <p>We interrogate the problem before touching a single tool.</p>
          </div>

          <div className="station">
            <span className="station-num">STAGE 02</span>
            <div className="station-rig">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6">
                <path d="M3 5h18M3 12h18M3 19h12" />
              </svg>
            </div>
            <h4>Wireframe</h4>
            <p>Structure and flow, stripped of decoration, validated fast.</p>
          </div>

          <div className="station">
            <span className="station-num">STAGE 03</span>
            <div className="station-rig">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1" />
              </svg>
            </div>
            <h4>Design</h4>
            <p>A visual system built for this product, never a generic template.</p>
          </div>

          <div className="station">
            <span className="station-num">STAGE 04</span>
            <div className="station-rig">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6">
                <path d="M8 6L2 12l6 6M16 6l6 6-6 6" />
              </svg>
            </div>
            <h4>Code</h4>
            <p>Clean, typed, tested code &mdash; built to be read by the next engineer.</p>
          </div>

          <div className="station">
            <span className="station-num">STAGE 05</span>
            <div className="station-rig">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6">
                <path d="M9 12l2 2 4-4M12 3l8 4v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V7l8-4z" />
              </svg>
            </div>
            <h4>Testing</h4>
            <p>Automated and adversarial &mdash; we try to break it before your users do.</p>
          </div>

          <div className="station">
            <span className="station-num">STAGE 06</span>
            <div className="station-rig">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6">
                <path d="M12 2v14M6 10l6 6 6-6M4 20h16" />
              </svg>
            </div>
            <h4>Deployment</h4>
            <p>Zero-downtime releases, feature-flagged and fully observable.</p>
          </div>

          <div className="station">
            <span className="station-num">STAGE 07</span>
            <div className="station-rig">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6">
                <path d="M4.5 16.5L3 21l4.5-1.5M13 7l4 4L7 21l-4-.5L3 16 13 7zM17 3l4 4-2 2-4-4 2-2z" />
              </svg>
            </div>
            <h4>Launch</h4>
            <p>Then we watch the metrics with you, and keep iterating.</p>
          </div>
        </div>

        <div className="process-progress">
          <div className="process-progress-bar" id="processBar"></div>
        </div>
      </div>
    </section>
  );
}

export default Process;
