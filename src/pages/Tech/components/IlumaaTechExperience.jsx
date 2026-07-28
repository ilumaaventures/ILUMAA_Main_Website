import React, { useState } from "react";
import Loader from "./Loader";
import Cursor from "./Cursor";
import WebGLBackground from "./WebGLBackground";
import Hero from "./Hero";
import PathSelection from "./PathSelection";
import Services from "./Services";
import TechStack from "./TechStack";
import Work from "./Work";
import About from "./About";
import Process from "./Process";
import CTA from "./CTA";
import ProjectModal from "./ProjectModal";
import IlumaaAsk from "./IlumaaAsk";
import "./ilumaatech.css";

const projects = [
  // ... (rest of the file unchanged until return)
  {
    tag: "TALENT INTELLIGENCE ECOSYSTEM",
    title: "TalentCIO",
    desc: "Transforming workforces through Human Intelligence & Technology with an integrated talent intelligence ecosystem.",
    role: "Strategy · Product Design · Full Stack Development",
    stack:
      "React · Node.js · MongoDB · JWT Authentication · Role-Based Access Control",
    result:
      "Unified hiring, workforce operations & talent growth in one ecosystem",
    url: "https://talentcio.in",
    body: "TalentCIO is a modern Talent Intelligence Ecosystem that empowers organizations to attract, hire, manage, and grow exceptional workforces. Built around the philosophy of 'Human Intelligence + Technology = Talent Intelligence', it unifies Talent Intelligence Solutions, the TalentCIO Platform, and TalentSphere into one connected ecosystem. The platform streamlines the complete workforce lifecycle—from strategic hiring and recruitment to onboarding, attendance, employee operations, performance management, leadership communities, and workforce growth—through intelligent technology, secure role-based access, and human-centered expertise.",
  },
  {
    tag: "BUSINESS FINANCE PLATFORM",
    title: "Flance",
    desc: "An all-in-one billing, payroll, and financial operations platform built for growing businesses.",
    role: "Architecture · Full Stack Development · Payments",
    stack: "React · Node.js · MongoDB · Razorpay · Puppeteer",
    // time: "18 weeks",
    result: "Cut monthly billing & payroll processing time by 70%",
    url: "https://flance.in",
    body: "Flance is a comprehensive financial operations suite covering the full order-to-cash and payroll lifecycle. It handles GST-compliant invoicing, quotes, proformas, and purchase orders with automatic tax (CGST/SGST/IGST) and TDS calculations, plus PDF generation and Razorpay-powered payment collection. A full payroll engine manages employee records, salary structures, leave, attendance, and payslip generation, while budgeting, expense/income tracking, recurring transactions, and bank statement reconciliation give finance teams a real-time view of cash flow. Role-based dashboards, GST/TDS reports, P&L and balance sheet statements, and a client/vendor management layer round out the platform into a single source of truth for a business's finances.",
  },
  {
    tag: "SOCIAL PLATFORM",
    title: "ILUMAA Socials",
    desc: "A modern social networking platform designed for communities, creators, and businesses.",
    role: "Frontend · Backend · Realtime Systems",
    stack: "React · Node.js · MongoDB · Socket.IO · Cloudinary",
    result: "Supports real-time engagement with thousands of concurrent users",
    url: "https://ilumaasocialmarketing.vercel.app/",
    body: "ILUMAA Socials enables users to create communities, share posts, upload media, follow creators, exchange real-time messages, receive live notifications, and discover trending content. The platform emphasizes performance, scalability, and a seamless social experience with modern UI and secure authentication.",
  },
  {
    tag: "TALENT ACQUISITION",
    title: "Talent Acquisition",
    desc: "An intelligent recruitment platform that simplifies hiring, candidate management, and workforce planning.",
    role: "Product Design · Full Stack Development · Workflow Automation",
    stack:
      "React · Node.js · MongoDB · JWT Authentication · Role-Based Access Control",
    result: "Accelerated hiring with streamlined recruitment workflows",
    url: "https://talentcio.in",
    body: "Talent Acquisition is TalentCIO's intelligent hiring solution designed to help organizations attract, evaluate, and hire exceptional talent. The platform centralizes job requisitions, candidate sourcing, AI-assisted resume screening, interview scheduling, hiring pipelines, offer management, onboarding readiness, and recruitment analytics into a unified workflow. Built with secure authentication and role-based access control, it enables HR teams, recruiters, and hiring managers to collaborate seamlessly while reducing manual effort and delivering a faster, more efficient hiring experience.",
  },
];

/** The original ILumaaTech experience, deliberately limited to this page subtree. */
function IlumaaTechExperience() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);
  const activeProject =
    selectedProjectIndex === null ? null : projects[selectedProjectIndex];

  return (
    <div className="iluma-tech-page">
      <WebGLBackground />
      <div className="aurora">
        <span className="a1" />
        <span className="a2" />
        <span className="a3" />
      </div>
      <div className="vignette" />
      <div className="grain" />
      <Cursor />
      {/* <Loader onComplete={() => setIsLoaded(true)} /> */}
      <div className="iluma-tech-content">
        <Hero isLoaded={isLoaded} />
        <PathSelection />
        <Services />
        <TechStack />
        <Work projects={projects} onSelectProject={setSelectedProjectIndex} />
        <About />
        <Process />
        <CTA />
      </div>
      <IlumaaAsk />
      <ProjectModal
        project={activeProject}
        onClose={() => setSelectedProjectIndex(null)}
      />
    </div>
  );
}

export default IlumaaTechExperience;
