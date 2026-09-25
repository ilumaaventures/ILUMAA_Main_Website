import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BarChart3,
  BookOpen,
  Briefcase,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Code2,
  Compass,
  FileCheck,
  Flame,
  Gift,
  GraduationCap,
  Handshake,
  Layers,
  LineChart,
  Megaphone,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Terminal,
  TrendingUp,
  UserCheck,
  Users,
  Zap,
} from "lucide-react";
import GmailApplyModal from "../components/GmailApplyModal";
import ProgrammeDetailModal from "../components/ProgrammeDetailModal";
import heroDisplaysVisual from "../assets/learning-hero-displays.jpg";
import heroVectorVisual from "../assets/learning-hero-vector.jpg";
import progFullstackBanner from "../assets/prog-fullstack-banner.jpg";
import progMarketingBanner from "../assets/prog-marketing-banner.jpg";
import progAcquisitionBanner from "../assets/prog-acquisition-banner.jpg";
import progManagementBanner from "../assets/prog-management-banner.jpg";
import progBizdevBanner from "../assets/prog-bizdev-banner.jpg";
import progRocketBanner from "../assets/prog-rocket-banner.jpg";
import launchCohortDesk from "../assets/launch-cohort-desk.jpg";
import careerSummitHike from "../assets/career-summit-hike.jpg";

const PROGRAMMES_DATA = [
  {
    id: "full-stack",
    code: "01",
    category: "tech",
    tag: "💻 01. FULL STACK DEVELOPER",
    categoryLabel: "Engineering & Tech",
    title: "Full Stack Developer Professional Accelerator",
    shortTitle: "Full Stack Developer",
    badgeHighlight: "Most Popular",
    duration: "6–8 Weeks",
    format: "Project Sprints",
    summary:
      "Move from programming fundamentals to practical application development through hands-on projects and modern development practices.",
    shortSummary:
      "Move from programming fundamentals to practical application development through hands-on projects.",
    banner: progFullstackBanner,
    previewPills: ["Frontend", "Backend", "APIs"],
    remainingCount: 4,
    focusAreas: [
      "Frontend",
      "Backend",
      "APIs",
      "Databases",
      "Git",
      "Testing",
      "Deployment",
    ],
    idealFor:
      "Candidates with basic programming or web development knowledge.",
    icon: Code2,
    gradient: "from-blue-600 via-cyan-500 to-sky-400",
    badgeBg: "bg-blue-50 text-blue-700 border-blue-200",
    glow: "hover:border-blue-400/60 hover:shadow-[0_16px_36px_rgba(77,124,255,0.18)]",
    deliverables: [
      "Full-stack production web application with real database architecture",
      "RESTful / GraphQL APIs with authentication, security & rate-limiting",
      "Modern CI/CD automated pipeline & containerized cloud deployment",
      "Verified GitHub repository ready for engineering recruiter review",
    ],
  },
  {
    id: "digital-marketing",
    code: "02",
    category: "marketing",
    tag: "📱 02. DIGITAL MARKETING",
    categoryLabel: "Growth & Marketing",
    title: "Digital Marketing Professional Accelerator",
    shortTitle: "Digital Marketing",
    badgeHighlight: "High Demand",
    duration: "5–7 Weeks",
    format: "Live Campaigns",
    summary:
      "Transform digital marketing knowledge into practical experience across campaigns, content, performance marketing, analytics and digital strategy.",
    shortSummary:
      "Transform digital marketing knowledge into practical experience across campaigns and content.",
    banner: progMarketingBanner,
    previewPills: ["SEO", "Social Media", "Analytics"],
    remainingCount: 3,
    focusAreas: [
      "SEO",
      "Social Media",
      "Performance Marketing",
      "Content",
      "Analytics",
      "Campaign Management",
    ],
    idealFor:
      "Candidates who have completed basic digital marketing training.",
    icon: Megaphone,
    gradient: "from-cyan-500 via-teal-500 to-blue-600",
    badgeBg: "bg-cyan-50 text-cyan-700 border-cyan-200",
    glow: "hover:border-cyan-400/60 hover:shadow-[0_16px_36px_rgba(6,182,212,0.18)]",
    deliverables: [
      "End-to-end paid advertising campaigns (Meta Ads & Google Ads setup)",
      "Technical & on-page SEO optimization audit with keyword architecture",
      "Google Analytics 4 (GA4) attribution and ROI reporting dashboard",
      "Omnichannel content distribution strategy and creative briefs",
    ],
  },
  {
    id: "talent-acquisition",
    code: "03",
    category: "talent",
    tag: "👥 03. TALENT ACQUISITION",
    categoryLabel: "Talent & People",
    title: "Talent Acquisition Professional Accelerator",
    shortTitle: "Talent Acquisition",
    badgeHighlight: "Industry Standard",
    duration: "5–6 Weeks",
    format: "Sourcing Labs",
    summary:
      "Develop practical recruitment capabilities through exposure to sourcing, screening, candidate engagement and professional hiring processes.",
    shortSummary:
      "Develop practical recruitment capabilities through exposure to sourcing, screening and candidate engagement.",
    banner: progAcquisitionBanner,
    previewPills: ["Sourcing", "Screening", "Hiring"],
    remainingCount: 3,
    focusAreas: [
      "Sourcing",
      "Screening",
      "Candidate Engagement",
      "Interview Management",
      "Recruitment Technology",
      "Hiring Process",
    ],
    idealFor:
      "Candidates with basic recruitment or HR knowledge.",
    icon: UserCheck,
    gradient: "from-indigo-600 via-blue-600 to-violet-500",
    badgeBg: "bg-indigo-50 text-indigo-700 border-indigo-200",
    glow: "hover:border-indigo-400/60 hover:shadow-[0_16px_36px_rgba(99,102,241,0.18)]",
    deliverables: [
      "Full lifecycle talent pipeline map across tech and business verticals",
      "Advanced Boolean search strings & LinkedIn Recruiter sourcing strategies",
      "Structured behavioral interview scorecard & candidate evaluation criteria",
      "Employer branding messaging playbook and automated outreach sequences",
    ],
  },
  {
    id: "talent-management",
    code: "04",
    category: "talent",
    tag: "📈 04. TALENT MANAGEMENT",
    categoryLabel: "Talent & People",
    title: "Talent Management Professional Accelerator",
    shortTitle: "Talent Management",
    badgeHighlight: "Strategic Track",
    duration: "6–8 Weeks",
    format: "Executive Case Studies",
    summary:
      "Build practical, end-to-end understanding of how organisations attract, hire, onboard, develop, engage, manage and retain talent.",
    shortSummary:
      "Build practical, end-to-end understanding of how organisations attract, hire, develop and retain talent.",
    banner: progManagementBanner,
    previewPills: ["HR Operations", "L&D", "Retention"],
    remainingCount: 7,
    focusAreas: [
      "Hiring & Recruitment",
      "Onboarding",
      "Payroll & HR Operations",
      "Performance Management",
      "Learning & Development",
      "Employee Engagement",
      "Talent Analytics",
      "Succession Planning",
      "Career Development",
      "Employee Experience",
      "Retention",
    ],
    idealFor:
      "Candidates with foundational HR or Talent Management knowledge who want to develop a practical understanding of the complete talent management function and build job-ready skills.",
    icon: LineChart,
    gradient: "from-purple-600 via-indigo-600 to-pink-500",
    badgeBg: "bg-purple-50 text-purple-700 border-purple-200",
    glow: "hover:border-purple-400/60 hover:shadow-[0_16px_36px_rgba(168,85,247,0.18)]",
    deliverables: [
      "Comprehensive Employee Lifecycle architecture & onboarding framework",
      "Performance appraisal system design with KPI & OKR alignment matrices",
      "HR operations & payroll compliance overview with standard SOPs",
      "Talent analytics retention dashboard and succession planning roadmaps",
    ],
  },
  {
    id: "business-development",
    code: "05",
    category: "business",
    tag: "🤝 05. BUSINESS DEVELOPMENT",
    categoryLabel: "Sales & Enterprise",
    title: "Business Development Professional Accelerator",
    shortTitle: "Business Development",
    badgeHighlight: "Revenue Driven",
    duration: "5–7 Weeks",
    format: "Deal Simulations",
    summary:
      "Move from basic sales and business development knowledge to practical experience in identifying opportunities, generating leads, engaging prospects and developing business relationships.",
    shortSummary:
      "Move from basic sales knowledge to practical experience in identifying opportunities and generating leads.",
    banner: progBizdevBanner,
    previewPills: ["Lead Generation", "Negotiation", "CRM"],
    remainingCount: 4,
    focusAreas: [
      "Lead Generation",
      "Prospecting",
      "Client Engagement",
      "Business Pitching",
      "Sales Strategy",
      "Proposal Development",
      "Negotiation",
      "CRM & Pipeline Management",
    ],
    idealFor:
      "Candidates with basic knowledge of sales, marketing, business development or client management.",
    icon: Handshake,
    gradient: "from-teal-600 via-emerald-500 to-cyan-500",
    badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
    glow: "hover:border-emerald-400/60 hover:shadow-[0_16px_36px_rgba(160,185,129,0.18)]",
    deliverables: [
      "Outbound enterprise prospecting strategy with verified qualification funnel",
      "Commercial business pitch presentation and executive client proposal deck",
      "CRM pipeline management workflows, deal stages and objection handling scripts",
      "Strategic negotiation framework with pricing models and partnership contract SOPs",
    ],
  },
];

const MARQUEE_PROGRAMMES = [...PROGRAMMES_DATA, ...PROGRAMMES_DATA];

const APPROACH_STEPS = [
  {
    step: "01",
    phase: "Learn",
    subtitle: "Knowledge Audit & Tooling",
    description:
      "Strengthen your existing foundation, eliminate misconceptions, and set up industry-standard workflows, repositories, and software tooling.",
    icon: BookOpen,
    highlights: ["Foundational diagnostic", "Production environment setup", "Workflow best practices"],
  },
  {
    step: "02",
    phase: "Experience",
    subtitle: "Real Sprints & Scenarios",
    description:
      "Work on practical assignments and live business scenarios. Receive direct line-by-line feedback from experienced industry practitioners.",
    icon: Briefcase,
    highlights: ["4+ hands-on sprint deliverables", "1-on-1 mentor reviews", "Collaborative team reviews"],
  },
  {
    step: "03",
    phase: "Accelerate",
    subtitle: "Portfolio & Career Transition",
    description:
      "Package your proof of work into an undeniable professional portfolio. Graduate with verified credentials and employer-ready confidence.",
    icon: Rocket,
    highlights: ["Recruiter-ready portfolio", "ILUMAA verified certificate", "Interview readiness rubrics"],
  },
];

const WHY_ILUMAA_PILLARS = [
  {
    title: "Practical Exposure",
    badge: "100% Hands-On",
    description: "Work on assignments, projects and real-world scenarios.",
    icon: Zap,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Industry-Oriented Learning",
    badge: "Enterprise Ready",
    description: "Understand professional practices, tools and workflows.",
    icon: Layers,
    gradient: "from-cyan-500 to-teal-500",
  },
  {
    title: "Expert Guidance",
    badge: "1:1 Feedback",
    description:
      "Learn from experienced professionals and receive practical feedback.",
    icon: Users,
    gradient: "from-indigo-500 to-blue-600",
  },
  {
    title: "Portfolio & Work Samples",
    badge: "Portfolio Built",
    description: "Build tangible evidence of your capabilities.",
    icon: FileCheck,
    gradient: "from-purple-500 to-indigo-600",
  },
  {
    title: "Professional Certification",
    badge: "Certified",
    description:
      "Receive an ILUMAA Professional Accelerator Certificate upon successful completion.",
    icon: Award,
    gradient: "from-amber-500 to-orange-500",
  },
  {
    title: "Career Development",
    badge: "Job Ready",
    description:
      "Strengthen your practical skills and professional readiness.",
    icon: TrendingUp,
    gradient: "from-emerald-500 to-teal-600",
  },
];

const WHO_CAN_APPLY_ITEMS = [
  "Have completed a basic course or certification",
  "Have foundational knowledge in the relevant field",
  "Want practical and industry-oriented exposure",
  "Want to strengthen their professional portfolio",
  "Are looking to transition from learning to professional practice",
  "Are students, graduates, career starters or working professionals with relevant knowledge",
];

export default function LearningPage() {
  // Modal states
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [selectedProgramme, setSelectedProgramme] = useState("");
  const [selectedDetailProgramme, setSelectedDetailProgramme] = useState(null);

  const [activeApproachStep, setActiveApproachStep] = useState(null);
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.title = "Professional Accelerator Programmes | ILUMAA Learning";

    const handleScroll = () => {
      if (window.scrollY > 420) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openApplyModal = (programmeTitle = "") => {
    setSelectedProgramme(programmeTitle);
    setIsApplyOpen(true);
  };

  const openDetailModal = (prog) => {
    setSelectedDetailProgramme(prog);
  };

  const scrollToProgrammes = (e) => {
    e.preventDefault();
    const el = document.getElementById("programmes");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="relative w-full max-w-full overflow-hidden pb-8 text-slate-900">
      {/* AMBIENT BACKGROUND GLOW ORBS */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-60">
        <div className="floating-orb -top-24 left-1/4 h-80 w-80 bg-blue-400/20 blur-[90px]" />
        <div className="floating-orb top-1/3 -right-20 h-96 w-96 bg-cyan-400/15 blur-[100px]" />
        <div className="floating-orb bottom-20 left-10 h-72 w-72 bg-indigo-400/15 blur-[90px]" />
      </div>

      {/* =========================================================================
          1. HERO SECTION (Split 2-Column Redesign Matching Reference Image)
         ========================================================================= */}
      <section className="relative z-10 w-full min-h-[80vh] lg:min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#1e1f3a] px-4 sm:px-8 lg:px-12 pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16">
        {/* Subtle Ambient Glows */}
        <div className="pointer-events-none absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px] -z-10" />
        <div className="pointer-events-none absolute bottom-10 right-1/4 h-96 w-96 rounded-full bg-indigo-500/10 blur-[120px] -z-10" />

        <div className="relative z-10 w-full max-w-[1360px] mx-auto grid lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">
          {/* Left Column: Headline, Copy & CTAs */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col items-start text-left">
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.24em] text-slate-300 mb-3 sm:mb-4"
            >
              PROFESSIONAL ACCELERATOR PROGRAMMES.
            </motion.p>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-heading text-4xl sm:text-5xl md:text-[54px] lg:text-[60px] xl:text-[68px] font-extrabold tracking-tight text-white leading-[1.08]"
            >
              Experience. Accelerate.{" "}
              <span className="block sm:inline bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-300 bg-clip-text text-transparent">
                Success.
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="mt-4 sm:mt-5 font-heading text-base sm:text-lg md:text-xl font-bold text-slate-100 leading-snug"
            >
              Practical Learning. Industry Exposure. Professional Growth.
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="mt-3 text-sm sm:text-base text-slate-300/85 max-w-xl leading-relaxed font-normal"
            >
              Build practical capabilities through hands-on projects, real-world assignments and expert guidance.
            </motion.p>

            {/* CTA Buttons (Matching Reference: Colored Primary + White Secondary) */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-7 sm:mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4"
            >
              {/* Primary Button */}
              <a
                href="#programmes"
                onClick={scrollToProgrammes}
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#ff5364] hover:bg-[#e84152] px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-rose-500/25 transition-all duration-300 active:scale-95 cursor-pointer"
              >
                <span>EXPLORE PROGRAMMES</span>
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>

              {/* Secondary Button */}
              <button
                type="button"
                onClick={() => openApplyModal()}
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-slate-100 px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 shadow-md hover:shadow-lg transition-all duration-300 active:scale-95 cursor-pointer"
              >
                <span>APPLY NOW</span>
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </button>
            </motion.div>

            {/* Supporting Value Strip */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.38 }}
              className="mt-6 sm:mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs sm:text-[13px] font-medium text-slate-300/80 tracking-wide"
            >
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                <span>Hands-on Projects</span>
              </span>
              <span className="text-slate-600 font-bold hidden sm:inline">·</span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                <span>Real-world Assignments</span>
              </span>
              <span className="text-slate-600 font-bold hidden sm:inline">·</span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                <span>Expert Guidance</span>
              </span>
            </motion.div>
          </div>

          {/* Right Column: High-Impact Visual Graphic */}
          <div className="lg:col-span-5 xl:col-span-5 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full max-w-[540px] mx-auto lg:max-w-none"
            >
              {/* Subtle Glow Backdrop */}
              <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-tr from-cyan-500/15 via-blue-500/10 to-indigo-500/15 blur-2xl -z-10" />

              {/* Main Illustration Box */}
              <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-[#16182e] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]">
                <img
                  src={heroVectorVisual}
                  alt="ILUMAA Professional Accelerator Programmes"
                  className="w-full h-auto object-cover transform hover:scale-[1.02] transition-transform duration-500"
                />
              </div>

              {/* Floating Micro-Badge 1: Live Sprints */}
              <div className="absolute -top-3 sm:-top-4 -left-2 sm:-left-4 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-slate-900/90 px-3.5 py-2 shadow-xl backdrop-blur-md">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
                <span className="text-[11px] sm:text-xs font-bold text-white tracking-wide">
                  Hands-on Sprints
                </span>
              </div>

              {/* Floating Micro-Badge 2: 1-on-1 Mentorship */}
              <div className="absolute -bottom-3 sm:-bottom-4 -right-2 sm:-right-4 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-slate-900/90 px-3.5 py-2 shadow-xl backdrop-blur-md">
                <span className="flex h-5 w-5 items-center justify-center rounded-lg bg-blue-600 text-white text-[10px] font-bold">
                  ✓
                </span>
                <span className="text-[11px] sm:text-xs font-bold text-white tracking-wide">
                  Expert Guidance
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. DYNAMIC PROGRAMMES MARQUEE (Ultra-tight, high energy)
         ========================================================================= */}
      <section className="relative z-10 py-2.5 border-y border-slate-200/70 bg-white/70 backdrop-blur-md overflow-hidden my-2">
        <div className="marquee-pause-hover relative flex items-center overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] select-none">
          {/* Continuous Track 1 */}
          <div className="animate-marquee-continuous">
            {MARQUEE_PROGRAMMES.map((prog, index) => (
              <div key={`m1-${prog.id}-${index}`} className="inline-flex items-center shrink-0">
                <button
                  type="button"
                  onClick={() => openDetailModal(prog)}
                  className="text-[11px] sm:text-xs font-bold text-slate-800 uppercase tracking-wider transition-colors duration-200 hover:text-blue-600 cursor-pointer whitespace-nowrap"
                >
                  {prog.title}
                </button>
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0 mx-3.5 sm:mx-4" />
              </div>
            ))}
          </div>

          {/* Continuous Track 2 (Identical clone for seamless continuous infinite scroll) */}
          <div className="animate-marquee-continuous" aria-hidden="true">
            {MARQUEE_PROGRAMMES.map((prog, index) => (
              <div key={`m2-${prog.id}-${index}`} className="inline-flex items-center shrink-0">
                <button
                  type="button"
                  onClick={() => openDetailModal(prog)}
                  tabIndex={-1}
                  className="text-[11px] sm:text-xs font-bold text-slate-800 uppercase tracking-wider transition-colors duration-200 hover:text-blue-600 cursor-pointer whitespace-nowrap"
                >
                  {prog.title}
                </button>
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0 mx-3.5 sm:mx-4" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. EXPLORE OUR PROFESSIONAL ACCELERATOR PROGRAMMES (Interactive Explorer)
         ========================================================================= */}
      <section
        id="programmes"
        className="relative z-10 px-4 sm:px-6 lg:px-8 py-6 sm:py-10 max-w-[1420px] mx-auto scroll-mt-16"
      >
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-slate-900 tracking-tight leading-tight">
            Explore Our{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
              Professional Accelerator Programmes
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2.5 max-w-2xl mx-auto leading-relaxed">
            Turn your foundational knowledge into real-world experience with hands-on projects, expert guidance and industry-oriented learning.
          </p>
        </div>

        {/* PROGRAMMES GRID */}
        <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 max-w-[1200px] mx-auto">
          {PROGRAMMES_DATA.map((prog, idx) => {
            const Icon = prog.icon;
            return (
              <motion.article
                key={prog.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                onClick={() => openDetailModal(prog)}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white/95 shadow-[0_4px_18px_rgba(15,23,42,0.04)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(37,99,235,0.1)] hover:border-blue-400/80 cursor-pointer"
              >
                {/* Top 3D Visual Banner */}
                <div className="relative h-36 sm:h-38 md:h-40 w-full overflow-hidden bg-slate-100">
                  <img
                    src={prog.banner}
                    alt={prog.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white/30 to-transparent pointer-events-none" />

                  {/* Floating Circular Track Icon Badge */}
                  <div className="absolute top-2.5 left-2.5 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-md shadow-md border border-white/80 text-slate-800 transition-all duration-300 group-hover:scale-110 group-hover:text-blue-600">
                    <Icon size={14} />
                  </div>
                </div>

                {/* Card Content Area */}
                <div className="flex flex-col flex-1 justify-between p-3.5 sm:p-4">
                  <div>
                    {/* Title */}
                    <h3 className="font-heading text-[13.5px] sm:text-[14.5px] font-bold text-slate-900 leading-snug transition-colors duration-200 group-hover:text-blue-600">
                      {prog.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-1.5 text-[11px] sm:text-xs text-slate-600 leading-relaxed">
                      {prog.shortSummary || prog.summary}
                    </p>
                  </div>

                  {/* Bottom Row: Pills & Circular Arrow Button */}
                  <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    {/* Focus Area Pills */}
                    <div className="flex flex-wrap items-center gap-1.5 flex-1 min-w-0">
                      {(prog.previewPills || prog.focusAreas.slice(0, 3)).map((pill, pIdx) => (
                        <span
                          key={pIdx}
                          className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-[10.5px] font-semibold bg-slate-100 text-slate-700 border border-slate-200/70 whitespace-nowrap transition-colors group-hover:bg-slate-200/70"
                        >
                          {pill}
                        </span>
                      ))}
                      {prog.remainingCount > 0 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-[10.5px] font-bold bg-blue-50 text-blue-600 border border-blue-200/80 whitespace-nowrap">
                          +{prog.remainingCount} more
                        </span>
                      )}
                    </div>

                    {/* Circular Action Button */}
                    <button
                      type="button"
                      aria-label={`View ${prog.title}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        openDetailModal(prog);
                      }}
                      className="flex h-8 w-8 sm:h-8.5 sm:w-8.5 items-center justify-center rounded-full bg-slate-900 text-white shadow-sm transition-all duration-200 hover:bg-blue-600 group-hover:scale-105 active:scale-95 shrink-0 cursor-pointer"
                    >
                      <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}

          {/* MORE PROGRAMMES COMING SOON CARD */}
          <motion.article
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.25 }}
            onClick={() => openApplyModal("Register Interest for Upcoming Programmes")}
            className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white/95 shadow-[0_4px_18px_rgba(15,23,42,0.04)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(37,99,235,0.1)] hover:border-blue-400/80 cursor-pointer"
          >
            {/* Top 3D Visual Banner */}
            <div className="relative h-36 sm:h-38 md:h-40 w-full overflow-hidden bg-slate-100">
              <img
                src={progRocketBanner}
                alt="More Programmes Coming Soon"
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white/30 to-transparent pointer-events-none" />

              {/* Floating Circular Track Icon Badge */}
              <div className="absolute top-2.5 left-2.5 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-md shadow-md border border-white/80 text-blue-600 transition-all duration-300 group-hover:scale-110">
                <Rocket size={14} />
              </div>
            </div>

            {/* Card Content Area */}
            <div className="flex flex-col flex-1 justify-between p-3.5 sm:p-4">
              <div>
                <h3 className="font-heading text-[13.5px] sm:text-[14.5px] font-bold text-slate-900 leading-snug transition-colors duration-200 group-hover:text-blue-600">
                  More Programmes Coming Soon
                </h3>
                <p className="mt-1.5 text-[11px] sm:text-xs text-slate-600 leading-relaxed">
                  The ILUMAA Professional Accelerator portfolio will continue to expand across Technology, Digital, Talent, Business and other domains.
                </p>
              </div>

              {/* Bottom Row: Pills & Circular Arrow Button */}
              <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2.5">
                <div className="flex flex-wrap items-center gap-1.5 flex-1 min-w-0">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-[10.5px] font-semibold bg-slate-100 text-slate-700 border border-slate-200/70 whitespace-nowrap transition-colors group-hover:bg-slate-200/70">
                    Tech & AI
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-[10.5px] font-semibold bg-slate-100 text-slate-700 border border-slate-200/70 whitespace-nowrap transition-colors group-hover:bg-slate-200/70">
                    Product
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-[10.5px] font-bold bg-blue-50 text-blue-600 border border-blue-200/80 whitespace-nowrap">
                    +more
                  </span>
                </div>

                <button
                  type="button"
                  aria-label="Register interest for upcoming programmes"
                  onClick={(e) => {
                    e.stopPropagation();
                    openApplyModal("Register Interest for Upcoming Programmes");
                  }}
                  className="flex h-8 w-8 sm:h-8.5 sm:w-8.5 items-center justify-center rounded-full bg-slate-900 text-white shadow-sm transition-all duration-200 hover:bg-blue-600 group-hover:scale-105 active:scale-95 shrink-0 cursor-pointer"
                >
                  <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          </motion.article>
        </div>
      </section>

      {/* =========================================================================
          4. THE ILUMAA ACCELERATOR APPROACH (Interactive 3-Step Flow)
         ========================================================================= */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-5 sm:py-6 max-w-[1420px] mx-auto">
        <div className="rounded-3xl bg-gradient-to-br from-slate-950 via-[#071124] to-[#0c1e3f] p-5 sm:p-7 text-white shadow-2xl relative overflow-hidden border border-slate-800">
          {/* Subtle Ambient Glows */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-cyan-500/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl" />

          {/* Heading */}
          <div className="relative z-10 text-center max-w-3xl mx-auto mb-4 sm:mb-5">
            <span className="inline-flex items-center gap-1 rounded-full border border-cyan-400/30 bg-cyan-950/70 px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-300">
              METHODOLOGY & EXECUTION
            </span>
            <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold text-white mt-1.5">
              ILUMAA ACCELERATOR APPROACH
            </h2>
            <p className="mt-1 text-xs sm:text-[13px] text-cyan-200/90 font-medium">
              A 3-Stage Framework: Learn → Experience → Accelerate
            </p>
          </div>

          {/* Stepper Cards */}
          <div className="relative z-10 grid gap-3 sm:gap-3.5 md:grid-cols-3">
            {APPROACH_STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isSelected = activeApproachStep === idx;
              return (
                <motion.div
                  key={idx}
                  onClick={() => setActiveApproachStep(activeApproachStep === idx ? null : idx)}
                  className={`group relative rounded-2xl border p-4 backdrop-blur-md transition-all duration-300 cursor-pointer flex flex-col justify-between ${isSelected
                    ? "border-cyan-400 bg-white/10 shadow-[0_0_25px_rgba(6,182,212,0.25)]"
                    : "border-white/10 bg-white/5 hover:border-cyan-400/40 hover:bg-white/[0.07]"
                    }`}
                >
                  <div>
                    {/* Top Row: Step Number & Phase Badge */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-[11px] font-bold text-white shadow-sm">
                        {step.step}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                        {step.subtitle}
                      </span>
                    </div>

                    <h3 className="font-heading text-base font-bold text-white mb-1">
                      {step.phase}
                    </h3>
                    <p className="text-[11.5px] sm:text-xs text-slate-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Highlights Bullets */}
                  <div className="mt-3 pt-2.5 border-t border-white/10 space-y-1">
                    {step.highlights.map((h, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-1.5 text-[10.5px] text-cyan-100">
                        <Check size={11} className="text-cyan-400 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. WHY ILUMAA? (Bento Grid with Rich Aesthetics)
         ========================================================================= */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-5 sm:py-6 max-w-[1420px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-4">
          <span className="inline-flex items-center gap-1 rounded-full border border-blue-300 bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-700">
            The Competitive Edge
          </span>
          <h2 className="section-title text-xl sm:text-2xl lg:text-3xl mt-1">
            WHY ILUMAA?
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-blue-600 mt-1">
            More Than Learning. Built Around Application.
          </p>
        </div>

        <div className="grid gap-3 sm:gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_ILUMAA_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                className="group rounded-2xl border border-slate-200/90 bg-white/90 p-3.5 sm:p-4 shadow-sm backdrop-blur-sm transition duration-200 hover:border-blue-300 hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100 transition duration-200 group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white">
                    <Icon size={16} />
                  </div>
                  <span className="rounded-full bg-slate-100 border border-slate-200 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-600">
                    {pillar.badge}
                  </span>
                </div>
                <h3 className="font-heading text-sm sm:text-base font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition">
                  {pillar.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          6. WHO CAN APPLY?
         ========================================================================= */}
      <section className="relative z-10 px-3.5 sm:px-6 lg:px-8 py-5 sm:py-6 max-w-[1420px] mx-auto">
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1.12fr_0.88fr] lg:items-stretch">
          {/* Left: Eligibility Criteria Card */}
          <div className="rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white/95 p-4.5 sm:p-6 lg:p-8 shadow-sm flex flex-col justify-between">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50/80 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-700">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                Eligibility & Selection
              </span>
              <h2 className="font-heading mt-2 text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-950 tracking-tight">
                WHO CAN APPLY?
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-600 font-medium">
                These programmes are designed for individuals who:
              </p>

              <div className="mt-3.5 sm:mt-4 space-y-2.5">
                {WHO_CAN_APPLY_ITEMS.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/80 mt-0.5">
                      <Check size={12} strokeWidth={2.5} />
                    </div>
                    <span className="text-xs sm:text-[13px] text-slate-700 font-medium leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Impact Banner / CTA Card */}
          <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-slate-950 via-[#07132a] to-slate-900 p-5 sm:p-6 lg:p-8 text-white shadow-xl flex flex-col justify-between border border-slate-800 overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-blue-500/15 blur-2xl" />
            <div className="pointer-events-none absolute -left-10 -bottom-10 h-36 w-36 rounded-full bg-cyan-500/15 blur-2xl" />

            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-400/30 bg-blue-950/70 px-2.5 py-0.5 text-[9.5px] font-bold uppercase tracking-wider text-blue-300">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Ready To Transition?
              </span>
              <h3 className="font-heading text-lg sm:text-xl lg:text-2xl font-extrabold text-white mt-2.5 leading-snug">
                You already know the basics.
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-sky-300 bg-clip-text text-transparent">
                  Now build the experience.
                </span>
              </h3>
              <p className="mt-2 text-xs sm:text-[13px] text-slate-300 leading-relaxed">
                Join a community of ambitious peers and senior industry mentors to elevate your capability into demonstrable professional outputs.
              </p>
            </div>

            <div className="relative z-10 mt-5 pt-4 border-t border-slate-800/80">
              <button
                type="button"
                onClick={() => openApplyModal()}
                className="shimmer-btn-effect w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-blue-500/25 transition active:scale-95 cursor-pointer"
              >
                <span>Apply For Launch Cohort</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. LAUNCH COHORT
         ========================================================================= */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-5 sm:py-6 max-w-[1420px] mx-auto">
        <div className="relative w-full rounded-3xl border border-slate-200/90 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.06)] overflow-hidden">
          {/* Background Workspace Image (Right half on md+, full bleed behind) */}
          <div className="absolute right-0 top-0 bottom-0 w-full md:w-[54%] lg:w-[50%] pointer-events-none overflow-hidden">
            <img
              src={launchCohortDesk}
              alt="Launch Cohort Workspace"
              className="w-full h-full object-cover object-center"
            />
            {/* Smooth gradient fade to pure white on the left */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent md:via-white/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent md:hidden" />
          </div>

          {/* Content Layout */}
          <div className="relative z-10 grid md:grid-cols-[1.15fr_0.85fr] lg:grid-cols-[1.25fr_0.75fr] items-center p-6 sm:p-8 lg:p-10 min-h-[380px]">
            {/* Left: Text, Badges & Action */}
            <div className="max-w-xl">
              <span className="inline-flex items-center rounded-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 px-3.5 py-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-white shadow-sm shadow-indigo-500/20">
                Special Launch Opportunity
              </span>

              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-950 mt-3 leading-tight">
                LAUNCH <span className="text-blue-600">COHORT</span>
              </h2>

              <p className="text-sm sm:text-[15px] font-bold text-slate-800 mt-1.5 leading-snug">
                Be Part of the First ILUMAA Professional Accelerator Cohorts
              </p>

              <p className="mt-2 text-xs sm:text-[13px] text-slate-600 leading-relaxed max-w-lg">
                We are launching our initial programmes with a limited number of participants to create a focused, practical and mentor-led learning environment.
              </p>

              {/* Segmented Feature Capsule with 3 items */}
              <div className="mt-4 sm:mt-5 inline-flex flex-wrap sm:flex-nowrap items-center rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 px-3.5 py-2 shadow-sm gap-3 sm:gap-4">
                <div className="inline-flex items-center gap-2">
                  <Users size={16} className="text-blue-600 shrink-0" />
                  <span className="text-xs font-bold text-slate-800 whitespace-nowrap">
                    Limited Seats
                  </span>
                </div>
                <div className="hidden sm:block h-4 w-px bg-slate-200" />
                <div className="inline-flex items-center gap-2">
                  <Rocket size={16} className="text-blue-600 shrink-0" />
                  <span className="text-xs font-bold text-slate-800 whitespace-nowrap">
                    Launch Cohort
                  </span>
                </div>
                <div className="hidden sm:block h-4 w-px bg-slate-200" />
                <div className="inline-flex items-center gap-2">
                  <Gift size={16} className="text-blue-600 shrink-0" />
                  <span className="text-xs font-bold text-slate-800 whitespace-nowrap">
                    Introductory Programme Offering
                  </span>
                </div>
              </div>

              {/* Apply Button */}
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  onClick={() => openApplyModal()}
                  className="shimmer-btn-effect inline-flex items-center gap-2 rounded-full bg-blue-600 hover:bg-blue-700 px-7 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-blue-500/30 transition-all duration-200 active:scale-95 cursor-pointer"
                >
                  <span>APPLY NOW</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>

              <p className="mt-4 text-[11px] text-slate-500 italic">
                Programme fees, schedule, eligibility and selection criteria may vary by programme.
              </p>
            </div>

            {/* Right: Floating UI Overlays */}
            <div className="hidden md:flex relative h-full min-h-[300px] flex-col justify-between items-end pointer-events-none">
              {/* Floating Blue Circle Badge */}
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/35 mr-6 mt-3">
                <Users size={20} />
              </div>

              {/* Floating Frosted Glass Card */}
              <div className="rounded-2xl border border-white/80 bg-white/85 p-3.5 sm:p-4 shadow-xl backdrop-blur-md max-w-[210px] mb-4 mr-2">
                <p className="text-xs font-semibold text-slate-800 leading-snug">
                  A focused, practical and mentor-led learning environment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. READY TO ACCELERATE YOUR CAREER?
         ========================================================================= */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-5 sm:py-6 max-w-[1420px] mx-auto">
        <div className="relative w-full rounded-3xl border border-slate-200/90 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.06)] overflow-hidden">
          {/* Background Mountain Summit Image (Right half on md+, full bleed behind) */}
          <div className="absolute right-0 top-0 bottom-0 w-full md:w-[54%] lg:w-[50%] pointer-events-none overflow-hidden">
            <img
              src={careerSummitHike}
              alt="Ready to Accelerate Your Career"
              className="w-full h-full object-cover object-center"
            />
            {/* Smooth gradient fade to pure white on the left */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent md:via-white/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent md:hidden" />
          </div>

          {/* Content Layout */}
          <div className="relative z-10 grid md:grid-cols-[1.15fr_0.85fr] lg:grid-cols-[1.25fr_0.75fr] items-center p-6 sm:p-8 lg:p-10 min-h-[380px]">
            {/* Left: Text & Dual Action Buttons */}
            <div className="max-w-xl">
              <span className="inline-flex items-center rounded-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 px-3.5 py-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-white shadow-sm shadow-indigo-500/20">
                Take The Next Step
              </span>

              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-950 mt-3 leading-tight">
                READY TO ACCELERATE<br />
                <span className="text-blue-600">YOUR CAREER?</span>
              </h2>

              <p className="text-sm sm:text-[15px] font-bold text-slate-800 mt-1.5 leading-snug">
                Turn Your Existing Knowledge Into Practical Experience.
              </p>

              <p className="mt-2 text-xs sm:text-[13px] text-slate-600 leading-relaxed max-w-lg">
                Choose your programme, apply and take the next step in your professional journey with ILUMAA Professional Accelerator Programmes.
              </p>

              {/* Dual Action Buttons */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="#programmes"
                  onClick={scrollToProgrammes}
                  className="shimmer-btn-effect inline-flex items-center gap-2 rounded-full bg-blue-600 hover:bg-blue-700 px-6 py-2.5 sm:py-3 text-xs sm:text-[13px] font-bold uppercase tracking-wider text-white shadow-lg shadow-blue-500/30 transition-all duration-200 active:scale-95 cursor-pointer"
                >
                  <span>EXPLORE PROGRAMMES</span>
                  <ArrowRight size={14} />
                </a>

                <button
                  type="button"
                  onClick={() => openApplyModal()}
                  className="inline-flex items-center gap-2 rounded-full bg-white hover:bg-slate-50 border border-slate-300 px-6 py-2.5 sm:py-3 text-xs sm:text-[13px] font-bold uppercase tracking-wider text-slate-900 shadow-sm transition-all duration-200 active:scale-95 cursor-pointer"
                >
                  <span>APPLY NOW</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Right: 3 Stacked Floating Frosted Glass Cards (over mountain scenery) */}
            <div className="hidden md:flex flex-col gap-3 items-end justify-center pointer-events-none pr-4">
              {/* Feature Card 1 */}
              <div className="flex items-center gap-3 rounded-2xl bg-white/90 backdrop-blur-md px-4 py-2.5 border border-white/80 shadow-[0_8px_20px_rgba(15,23,42,0.08)] min-w-[190px]">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <BookOpen size={18} />
                </div>
                <span className="text-xs sm:text-[13px] font-bold text-slate-900">
                  Practical Learning
                </span>
              </div>

              {/* Feature Card 2 */}
              <div className="flex items-center gap-3 rounded-2xl bg-white/90 backdrop-blur-md px-4 py-2.5 border border-white/80 shadow-[0_8px_20px_rgba(15,23,42,0.08)] min-w-[190px]">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <BarChart3 size={18} />
                </div>
                <span className="text-xs sm:text-[13px] font-bold text-slate-900">
                  Industry Exposure
                </span>
              </div>

              {/* Feature Card 3 */}
              <div className="flex items-center gap-3 rounded-2xl bg-white/90 backdrop-blur-md px-4 py-2.5 border border-white/80 shadow-[0_8px_20px_rgba(15,23,42,0.08)] min-w-[190px]">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <UserCheck size={18} />
                </div>
                <span className="text-xs sm:text-[13px] font-bold text-slate-900">
                  Professional Growth
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. FLOATING BOTTOM QUICK ACTION BAR (Visible on scroll)
         ========================================================================= */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[900] w-[92%] max-w-md pointer-events-auto"
          >
            <div className="rounded-full bg-slate-900/90 border border-slate-700/80 px-4 py-2 text-white shadow-2xl backdrop-blur-lg flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 truncate">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="text-[11px] font-semibold text-slate-200 truncate">
                  Launch Cohort 2026: 5 Tracks Open
                </span>
              </div>

              <button
                type="button"
                onClick={() => openApplyModal()}
                className="shimmer-btn-effect shrink-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-3.5 py-1 text-[10.5px] font-bold uppercase tracking-wider text-white shadow-sm hover:brightness-110 active:scale-95 transition"
              >
                Apply Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* GMAIL-STYLE APPLICATION COMPOSE MODAL */}
      <GmailApplyModal
        isOpen={isApplyOpen}
        onClose={() => setIsApplyOpen(false)}
        initialProgramme={selectedProgramme}
      />

      {/* PROGRAMME DETAIL MODAL */}
      <ProgrammeDetailModal
        programme={selectedDetailProgramme}
        isOpen={Boolean(selectedDetailProgramme)}
        onClose={() => setSelectedDetailProgramme(null)}
        onApply={(progTitle) => openApplyModal(progTitle)}
      />
    </div>
  );
}
