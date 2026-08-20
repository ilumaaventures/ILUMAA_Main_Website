import React, { useState } from "react";
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
  {
    id: "talentcio",
    tag: "TALENT INTELLIGENCE ECOSYSTEM",
    title: "TalentCIO",
    desc: "Transforming workforces through Human Intelligence & Technology with an integrated talent intelligence ecosystem.",
    role: "Strategy · Product Design · Full Stack Development",
    stack:
      "React · Node.js · MongoDB · JWT Authentication · Role-Based Access Control",
    stackPills: ["React", "Node.js", "MongoDB", "JWT", "RBAC Security"],
    result:
      "Unified hiring, workforce operations & talent growth in one ecosystem",
    impactMetric: "100% End-to-End Workforce Lifecycle Coverage",
    url: "https://talentcio.in",
    features: [
      "AI-Assisted Candidate Sourcing & Automated Resume Matching",
      "Unified Hiring Pipeline, Interview Scheduling & Offer Workflow",
      "Workforce Management: Onboarding, Attendance & Performance HRMS",
      "Enterprise Security: Role-Based Access Control (RBAC) & Privacy",
    ],
    body: "TalentCIO is a modern Talent Intelligence Ecosystem that empowers organizations to attract, hire, manage, and grow exceptional workforces. Built around the philosophy of 'Human Intelligence + Technology = Talent Intelligence', it unifies Talent Intelligence Solutions, the TalentCIO Platform, and TalentSphere into one connected ecosystem. The platform streamlines the complete workforce lifecycle—from strategic hiring and recruitment to onboarding, attendance, employee operations, performance management, leadership communities, and workforce growth—through intelligent technology, secure role-based access, and human-centered expertise.",
  },
  {
    id: "flance",
    tag: "BUSINESS FINANCE PLATFORM",
    title: "Flance",
    desc: "An all-in-one billing, payroll, and financial operations platform built for growing businesses.",
    role: "Architecture · Full Stack Development · Payments",
    stack: "React · Node.js · MongoDB · Razorpay · Puppeteer",
    stackPills: ["React", "Node.js", "MongoDB", "Razorpay", "Puppeteer PDF"],
    result: "Cut monthly billing & payroll processing time by 70%",
    impactMetric: "70% Faster Billing & Payroll Processing",
    url: "https://flance.in",
    features: [
      "GST-Compliant Order-to-Cash Billing (CGST/SGST/IGST & TDS calculations)",
      "Razorpay Gateway Integration & Automated PDF Receipt Generation",
      "Complete Payroll Engine: Employee Records, Salary Structures & Payslips",
      "Bank Reconciliation, Expense Tracking & Real-Time P&L Reporting",
    ],
    body: "Flance is a comprehensive financial operations suite covering the full order-to-cash and payroll lifecycle. It handles GST-compliant invoicing, quotes, proformas, and purchase orders with automatic tax (CGST/SGST/IGST) and TDS calculations, plus PDF generation and Razorpay-powered payment collection. A full payroll engine manages employee records, salary structures, leave, attendance, and payslip generation, while budgeting, expense/income tracking, recurring transactions, and bank statement reconciliation give finance teams a real-time view of cash flow.",
  },
  {
    id: "socials",
    tag: "SOCIAL PLATFORM",
    title: "ILUMAA Socials",
    desc: "A modern social networking platform designed for communities, creators, and businesses.",
    role: "Frontend · Backend · Realtime Systems",
    stack: "React · Node.js · MongoDB · Socket.IO · Cloudinary",
    stackPills: ["React", "Node.js", "MongoDB", "Socket.IO", "Cloudinary"],
    result: "Supports real-time engagement with thousands of concurrent users",
    impactMetric: "Sub-Second Real-Time Message Latency",
    url: "https://ilumaasocialmarketing.vercel.app/",
    features: [
      "Sub-Second Real-Time Messaging Powered by Socket.IO",
      "Community Creation, Feeds & High-Res Media Uploads (Cloudinary)",
      "Creator Profile Discovery & Live Push Notification Engine",
      "Trending Content Algorithmic Discovery & Analytics",
    ],
    body: "ILUMAA Socials enables users to create communities, share posts, upload media, follow creators, exchange real-time messages, receive live notifications, and discover trending content. The platform emphasizes performance, scalability, and a seamless social experience with modern UI and secure authentication.",
  },
];

function IlumaaTechExperience() {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);
  const activeProject =
    selectedProjectIndex === null ? null : projects[selectedProjectIndex];

  return (
    <div className="iluma-tech-page">
      <WebGLBackground />
      <div className="atmosphere" />
      <div className="vignette" />
      <div className="grain" />
      <Cursor />

      <main className="iluma-tech-content">
        <Hero />
        <PathSelection />
        <Services />
        <TechStack />
        <Work projects={projects} onSelectProject={setSelectedProjectIndex} />
        <About />
        <Process />
        <CTA />
      </main>

      <IlumaaAsk />
      <ProjectModal
        project={activeProject}
        onClose={() => setSelectedProjectIndex(null)}
      />
    </div>
  );
}

export default IlumaaTechExperience;
