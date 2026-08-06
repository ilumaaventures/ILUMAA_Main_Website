import React from "react";

const Preloader = ({ progress, isLoading }) => {
  return (
    <div
      id="preloader"
      className={isLoading ? "" : "hidden"}
      aria-hidden={!isLoading}
    >
      <div className="preloader-mark">ILUMAA</div>
      <div className="preloader-track">
        <div
          className="preloader-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="preloader-count">{progress}%</div>
    </div>
  );
};

export default Preloader;
