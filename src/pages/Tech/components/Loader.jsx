import React, { useEffect, useState } from "react";
import gsap from "gsap";

function Loader({ onComplete }) {
  const [percent, setPercent] = useState(0);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const progress = { v: 0 };
    gsap.to(progress, {
      v: 100,
      duration: 1.8,
      ease: "power1.inOut",
      onUpdate: () => {
        setPercent(Math.round(progress.v));
      },
      onComplete: () => {
        setIsHidden(true);
        if (onComplete) {
          onComplete();
        }
      },
    });
  }, [onComplete]);

  return (
    <div id="loader" className={isHidden ? "hidden" : ""}>
      <div className="loader-mark">ILUMMTECH</div>
      <div className="loader-bar">
        <i style={{ width: `${percent}%` }} id="loaderFill" />
      </div>
      <div className="loader-pct" id="loaderPct">
        INITIALIZING CORE — {percent}%
      </div>
    </div>
  );
}

export default Loader;
