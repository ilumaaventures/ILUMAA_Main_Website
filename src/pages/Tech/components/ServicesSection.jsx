import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Technology Services",
    subtitle: "End-to-end digital infrastructure and platforms",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 003 3h4.5a3 3 0 003-3m-16.5 0V6a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 6v8.25m-3 0V6.75" />
      </svg>
    ),
    tags: [
      "CRM Platforms",
      "ERP Solutions",
      "HRMS Systems",
      "Cloud Infrastructure",
      "Digital Transformation",
      "Brand Strategy",
      "Performance Marketing",
      "SEO & Organic Growth",
      "Social Media Marketing",
      "Lead Generation",
      "Creative Content",
      "Website Management",
      "Marketing Automation",
    ],
  },
  {
    title: "Business Intelligence & Data Analytics",
    subtitle: "Transforming Data into Strategic Business Intelligence",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    tags: [
      "Data Visualization Dashboards",
      "Power BI Solutions",
      "Tableau Development",
      "Looker Dashboards",
      "Predictive Analytics",
      "Prescriptive Analytics",
      "Customer Intelligence",
      "Market Analytics",
      "Operational Analytics",
      "KPI Reporting",
      "Data Governance",
      "Business Performance Analytics",
    ],
  },
  {
    title: "AI & Machine Learning Consulting",
    subtitle: "Enabling Intelligent Business Transformation",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
      </svg>
    ),
    tags: [
      "AI Strategy & Consulting",
      "Machine Learning Development",
      "AI Model Deployment",
      "AI Optimization",
      "Natural Language Processing",
      "Computer Vision",
      "Recommendation Systems",
      "AI Decision Intelligence",
      "Process Optimization",
    ],
  },
  {
    title: "Big Data & Cloud Consulting",
    subtitle: "Modern Data Platforms Built for Scale",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
      </svg>
    ),
    tags: [
      "Big Data Architecture",
      "Data Warehousing",
      "Lakehouse Solutions",
      "ETL & ELT Pipelines",
      "AWS Solutions",
      "Microsoft Azure",
      "Google Cloud Platform",
      "Data Engineering",
      "Enterprise Data Platforms",
      "Data Migration",
      "Cloud Modernization",
    ],
  },
  {
    title: "AI-Powered Automation",
    subtitle: "Intelligent Automation for Smarter Operations",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
    tags: [
      "Workflow Automation",
      "AI Chatbots",
      "Virtual Assistants",
      "Intelligent Document Processing",
      "Process Automation",
      "Smart Business Operations",
      "Customer Support Automation",
      "Robotic Process Automation (RPA)",
    ],
  },
];

const ServicesSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const blocks = sectionRef.current.querySelectorAll(".service-block");
    if (blocks && blocks.length > 0) {
      gsap.fromTo(
        blocks,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  return (
    <section id="services" className="services-section" ref={sectionRef}>
      <div className="section-inner">
        <div className="section-header-left">
          <p className="eyebrow-accent">Technology &amp; Digital Solutions</p>
          <h2 className="section-title">
            Building the Digital Foundation
            <br />
            for Modern Businesses
          </h2>
          <p className="section-desc">
            We deliver enterprise-grade technology solutions that enable organizations
            to innovate faster, operate smarter, and scale with confidence.
          </p>
        </div>
        <div className="service-blocks">
          {services.map((item, idx) => (
            <div key={idx} className="service-block">
              <div className="service-block-header">
                <div className="service-icon">{item.icon}</div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.subtitle}</p>
                </div>
              </div>
              <div className="service-tags">
                {item.tags.map((tag, tIdx) => (
                  <span key={tIdx}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
