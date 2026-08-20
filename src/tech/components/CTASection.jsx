import React from "react";

const CTASection = () => {
  return (
    <section id="contact" className="cta">
      <div className="cta-inner">
        <p className="eyebrow-accent" style={{ marginBottom: "16px" }}>
          Let's Build What's Next
        </p>
        <h2>
          Whether you're launching a new product, modernizing enterprise systems,
          or integrating AI &mdash; ILUMAA transforms ideas into scalable digital
          solutions.
        </h2>
        <p className="cta-sub">Ready to build the future together?</p>
        <div className="cta-btns">
          <a href="mailto:connect@ilumaa.com" className="btn-primary btn-large">
            Schedule a Consultation
          </a>
          <a href="mailto:connect@ilumaa.com" className="btn-outline">
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
