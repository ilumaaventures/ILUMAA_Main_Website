import React from "react";

const stats = [
  { num: "120+", label: "Platforms shipped" },
  { num: "40+", label: "Enterprise partners" },
  { num: "6", label: "Continents served" },
];

const ClosingSection = () => {
  return (
    <section id="approach" className="closing">
      <div className="closing-inner">
        <p className="eyebrow">Where Human Intelligence Meets Technology</p>
        <p className="closing-text">
          ILUMAA works with businesses and institutions to turn scattered systems,
          teams, and data into a single, coherent digital ecosystem &mdash;
          engineered to hold its shape under scale.
        </p>
        <div className="closing-stats">
          {stats.map((s, i) => (
            <div key={i} className="stat">
              <span className="stat-num">{s.num}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClosingSection;
