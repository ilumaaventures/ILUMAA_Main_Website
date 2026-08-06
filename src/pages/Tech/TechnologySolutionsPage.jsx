import React, { useState, useCallback } from "react";
import "./TechPage.css";
import Preloader from "./components/Preloader";
import ScrollHero from "./components/ScrollHero";
import TrustedBar from "./components/TrustedBar";
import AboutSection from "./components/AboutSection";
import ProductsSolutions from "./components/ProductsSolutions";
import Work from "./components/Work";
import ServicesSection from "./components/ServicesSection";
import WhyChooseSection from "./components/WhyChooseSection";
import ProcessSection from "./components/ProcessSection";
import ClosingSection from "./components/ClosingSection";
import CTASection from "./components/CTASection";
import ProjectModal from "./components/ProjectModal";
import IlumaaAsk from "./components/IlumaaAsk";

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
  {
    id: "acquisition",
    tag: "TALENT ACQUISITION",
    title: "Talent Acquisition",
    desc: "An intelligent recruitment platform that simplifies hiring, candidate management, and workforce planning.",
    role: "Product Design · Full Stack Development · Workflow Automation",
    stack:
      "React · Node.js · MongoDB · JWT Authentication · Role-Based Access Control",
    stackPills: ["React", "Node.js", "MongoDB", "Workflow Automation", "RBAC"],
    result: "Accelerated hiring with streamlined recruitment workflows",
    impactMetric: "50% Reduction in Time-to-Hire",
    url: "https://talentcio.in",
    features: [
      "Job Requisitions & Intelligent AI Candidate Matching",
      "Automated Candidate Evaluation & Offer Letter Workflows",
      "HR Manager & Interviewer Collaborative Assessment Portals",
      "Recruitment Funnel Analytics & Hiring Speed Insights",
    ],
    body: "Talent Acquisition is TalentCIO's intelligent hiring solution designed to help organizations attract, evaluate, and hire exceptional talent. The platform centralizes job requisitions, candidate sourcing, AI-assisted resume screening, interview scheduling, hiring pipelines, offer management, onboarding readiness, and recruitment analytics into a unified workflow.",
  },
];

function TechnologySolutionsPage() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);

  const handleProgressUpdate = useCallback((pct) => {
    setProgress(pct);
  }, []);

  const handlePreloadComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  const activeProject =
    selectedProjectIndex === null ? null : projects[selectedProjectIndex];

  return (
    <div className="tech-page-wrapper">
      {/* <Preloader progress={progress} isLoading={isLoading} /> */}
      <ScrollHero
        onProgressUpdate={handleProgressUpdate}
        onPreloadComplete={handlePreloadComplete}
      />
      <TrustedBar />
      <AboutSection />
      {/* <ProductsSolutions /> */}
      <Work projects={projects} onSelectProject={setSelectedProjectIndex} />
      <ServicesSection />
      <WhyChooseSection />
      <ProcessSection />
      {/* <ClosingSection /> */}
      <IlumaaAsk />
      <CTASection />

      <ProjectModal
        project={activeProject}
        onClose={() => setSelectedProjectIndex(null)}
      />
    </div>
  );
}

export default TechnologySolutionsPage;
