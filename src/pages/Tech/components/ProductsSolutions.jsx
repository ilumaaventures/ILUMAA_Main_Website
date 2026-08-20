import React from "react";

const solutions = [
  {
    number: "01",
    title: "Web & Mobile Application Development",
    desc: "Custom web and mobile applications designed for performance, usability, and long-term scalability.",
  },
  {
    number: "02",
    title: "Property & Real Estate Platforms",
    desc: "Digital ecosystems that simplify property management, sales, leasing, and customer engagement.",
  },
  {
    number: "03",
    title: "Business Management Platforms",
    desc: "Centralized systems that streamline operations, workflows, and organizational efficiency.",
  },
  {
    number: "04",
    title: "Marketplace Solutions",
    desc: "Secure multi-vendor marketplaces connecting buyers, sellers, and service providers through seamless digital experiences.",
  },
  {
    number: "05",
    title: "Enterprise Portals",
    desc: "Internal and external enterprise portals that improve collaboration, communication, and productivity.",
  },
  {
    number: "06",
    title: "SaaS Products",
    desc: "Cloud-native software products designed for subscription-based business models and rapid scalability.",
  },
  {
    number: "07",
    title: "AI-Powered Applications",
    desc: "Applications enhanced with machine learning, natural language processing, and intelligent automation.",
  },
  {
    number: "08",
    title: "Workflow & Automation Platforms",
    desc: "Business workflow systems that eliminate repetitive tasks and improve operational efficiency.",
  },
  {
    number: "09",
    title: "Custom Digital Ecosystems",
    desc: "Tailor-made digital platforms built specifically around your business goals and processes.",
  },
];

const ProductsSolutions = () => {
  return (
    <section id="solutions" className="products-section">
      <div className="section-inner">
        <div className="section-header-center">
          <p className="eyebrow-accent">Products &amp; Platform Development</p>
          <h2 className="section-title">Building Scalable Digital Platforms</h2>
          <p className="section-desc">
            From concept to deployment, we create digital products engineered for
            scalability, performance, and exceptional user experiences.
          </p>
        </div>
        <div className="solutions-grid">
          {solutions.map((item) => (
            <div key={item.number} className="solution-card">
              <div className="sol-number">{item.number}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSolutions;
