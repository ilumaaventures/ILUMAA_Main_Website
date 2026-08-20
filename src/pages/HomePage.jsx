import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Brain,
  BrainCircuit,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ChevronRight,
  Compass,
  Cpu,
  Globe2,
  Handshake,
  Layers,
  Lightbulb,
  LineChart,
  Network,
  Quote,
  Rocket,
  Scale,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

const whyChooseUs = [
  {
    step: "01",
    title: "Human-Centered Strategic Thinking",
    description: "Aligning deep business empathy, leadership acumen, and human ingenuity for sustainable impact.",
    icon: Brain,
    gradient: "from-blue-500/20 to-cyan-500/20",
    glow: "group-hover:border-blue-400/40",
  },
  {
    step: "02",
    title: "Integrated Consulting & Technology Expertise",
    description: "Seamless bridge connecting executive strategy directly with scalable full-stack engineering.",
    icon: Zap,
    gradient: "from-cyan-500/20 to-teal-500/20",
    glow: "group-hover:border-cyan-400/40",
  },
  {
    step: "03",
    title: "Data & AI-Driven Decision Making",
    description: "Empowering leadership teams with real-time predictive analytics and high-precision intelligence.",
    icon: TrendingUp,
    gradient: "from-indigo-500/20 to-blue-500/20",
    glow: "group-hover:border-indigo-400/40",
  },
  {
    step: "04",
    title: "Scalable & Future-Ready Solutions",
    description: "Architected for exponential scalability, high performance, and rapid technological shifts.",
    icon: Rocket,
    gradient: "from-sky-500/20 to-indigo-500/20",
    glow: "group-hover:border-sky-400/40",
  },
  {
    step: "05",
    title: "Industry-Focused Consulting",
    description: "Tailored methodologies and domain expertise crafted for real-world enterprise execution.",
    icon: Target,
    gradient: "from-blue-600/20 to-cyan-400/20",
    glow: "group-hover:border-blue-400/40",
  },
  {
    step: "06",
    title: "Long-Term Strategic Partnerships",
    description: "Continuous advisory and agile execution dedicated to multi-year enterprise value creation.",
    icon: Handshake,
    gradient: "from-teal-500/20 to-blue-500/20",
    glow: "group-hover:border-teal-400/40",
  },
];

const approachSteps = [
  {
    title: "Understand",
    description: "Understanding business challenges, people and opportunities.",
    icon: Compass,
    accent: "text-blue-600 bg-blue-50 border-blue-200",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "Strategize",
    description: "Creating intelligent, business-focused transformation roadmaps.",
    icon: Lightbulb,
    accent: "text-cyan-600 bg-cyan-50 border-cyan-200",
    gradient: "from-cyan-500/20 to-teal-500/20",
  },
  {
    title: "Build & Implement",
    description: "Executing scalable consulting and technology solutions.",
    icon: Cpu,
    accent: "text-indigo-600 bg-indigo-50 border-indigo-200",
    gradient: "from-indigo-500/20 to-blue-500/20",
  },
  {
    title: "Optimize & Scale",
    description: "Improving systems, performance and business growth continuously.",
    icon: TrendingUp,
    accent: "text-teal-600 bg-teal-50 border-teal-200",
    gradient: "from-teal-500/20 to-emerald-500/20",
  },
];

const serviceItems = [
  { title: "Business Strategy & Advisory", icon: BriefcaseBusiness, category: "Advisory" },
  { title: "Business Registration & Structuring", icon: Scale, category: "Governance" },
  { title: "Workforce Strategy and Planning", icon: Users, category: "Human Capital" },
  { title: "Growth & Expansion Strategy", icon: Rocket, category: "Scale" },
  { title: "Operational Excellence", icon: CheckCircle2, category: "Operations" },
  { title: "Business Transformation", icon: BrainCircuit, category: "Transformation" },
  { title: "Organizational Development", icon: Building2, category: "Organization" },
  { title: "Process Optimization", icon: BarChart3, category: "Efficiency" },
  { title: "Change Management", icon: Layers, category: "Agility" },
  { title: "Startup & Scale-up Consulting", icon: Sparkles, category: "Ventures" },
];

const solutionSections = [
  {
    id: "talent",
    title: "Talent & Workforce Solutions",
    tagline: "Human Capital Ecosystems",
    description:
      "Building high-performing teams and modern workforce ecosystems.",
    items: [
      "Staffing & Executive Hiring",
      "HR Consulting",
      "Payroll & HRMS Solutions",
      "Workforce Planning",
      "Performance Management",
      "HR Operations & Compliance",
      "Employer Branding",
      "Talent Strategy",
    ],
    icon: Users,
    gradient: "from-blue-600 via-indigo-600 to-cyan-500",
    badgeBg: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    id: "technology",
    title: "Technology & Digital Solutions",
    tagline: "Enterprise Platforms & AI",
    description:
      "Designing and developing scalable technology ecosystems for modern businesses.",
    items: [
      "Product & Platform Development",
      "Property & Real Estate Platforms",
      "SaaS & Marketplace Solutions",
      "Web & Mobile Application Development",
      "CRM / ERP / HRMS Platforms",
      "Cloud & Infrastructure Solutions",
      "System Integrations",
      "Automation & AI Integrations",
      "UI/UX & Product Architecture",
    ],
    icon: Cpu,
    gradient: "from-cyan-600 via-blue-600 to-indigo-600",
    badgeBg: "bg-cyan-50 text-cyan-700 border-cyan-200",
  },
  {
    id: "research",
    title: "Market Research & Strategic Intelligence",
    tagline: "Actionable Data & Analytics",
    description:
      "Helping organizations make informed decisions through research, insights and analytics.",
    items: [
      "Market Research & Surveys",
      "Industry & Competitor Analysis",
      "Consumer Insights",
      "Feasibility Studies",
      "Business Intelligence & Reporting",
      "Strategic Data Consulting",
      "Market Opportunity Assessment",
    ],
    icon: BarChart3,
    gradient: "from-indigo-600 via-purple-600 to-blue-600",
    badgeBg: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
  {
    id: "legal-finance",
    title: "Legal & Financial Consulting",
    tagline: "Governance, Risk & Capital",
    description:
      "Strengthening businesses through compliance, governance and financial clarity.",
    items: [
      "Business Registration & Structuring",
      "Contract & Documentation Support",
      "Legal Compliance Advisory",
      "Accounting & Bookkeeping",
      "Taxation & Regulatory Support",
      "MIS & Financial Reporting",
      "Payroll Compliance",
      "Financial Planning & Controls",
    ],
    icon: Scale,
    gradient: "from-slate-800 via-blue-900 to-indigo-900",
    badgeBg: "bg-slate-100 text-slate-800 border-slate-300",
  },
  {
    id: "marketing",
    title: "Digital Marketing & Brand Growth",
    tagline: "Omnichannel Acquisition & ROI",
    description:
      "Driving digital visibility, engagement and measurable business growth.",
    items: [
      "Brand Strategy & Positioning",
      "Performance Marketing",
      "SEO & Organic Growth",
      "Social Media Marketing",
      "Lead Generation Campaigns",
      "Content & Creative Solutions",
      "Website & Digital Presence Management",
      "Marketing Automation",
    ],
    icon: ArrowRight,
    gradient: "from-teal-600 via-cyan-600 to-blue-600",
    badgeBg: "bg-teal-50 text-teal-700 border-teal-200",
  },
];

const testimonials = [
  {
    quote:
      "Their strategic and technology expertise helped us modernize operations and improve decision-making.",
    author: "Enterprise Partner",
    role: "Digital Transformation Officer",
    rating: 5,
  },
  {
    quote:
      "A reliable consulting partner with strong capabilities across analytics, automation and business transformation.",
    author: "Growth Co-founder",
    role: "Scale-up Executive",
    rating: 5,
  },
];

const domainBadges = [
  "Human Intelligence",
  "Strategy",
  "Technology",
  "AI",
  "Analytics",
  "Business Transformation",
];

function HomePage() {
  const heroVideoSrc = `${import.meta.env.BASE_URL}hero-video.mp4`;

  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="relative flex min-h-[610px] flex-col justify-center overflow-hidden bg-[#070e1b] px-4 pb-26 pt-26 text-center sm:min-h-[690px] sm:px-8 sm:pb-32 sm:pt-34 lg:min-h-[780px] lg:px-12 lg:pb-40 lg:pt-38">
        {/* Full Background Video */}
        <video
          src={heroVideoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
        />

        {/* Ambient Lightened Overlay for Video Visibility */}
        <div className="absolute inset-0 bg-[#070e1b]/35 bg-gradient-to-b from-[#070e1b]/50 via-transparent to-[#070e1b]/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070e1b]/40 via-transparent to-[#070e1b]/40" />
        <div className="absolute left-1/2 top-0 h-px w-[82%] -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

        {/* Centered Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 mx-auto max-w-4xl"
        >
          {/* Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-950/40 px-4 py-1.5 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300">
              Human Intelligence × Technology
            </span>
          </motion.div>

          <h1 className="mx-auto mt-6 max-w-4xl font-heading text-[2.35rem] font-semibold leading-[1.08] text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] sm:text-[2.85rem] lg:text-[3.65rem]">
            Strategic Consulting. Intelligent Solutions. Scalable Growth.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-[0.92rem] leading-7 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] sm:text-[0.98rem]">
            We help businesses scale through human intelligence, leverage
            intelligent technologies and operational excellence.
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-[0.84rem] leading-7 text-slate-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Integrated solutions across Strategy, Technology, Talent,
            Finance, AI, Legal and Digital Marketing.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <a
              href="/#connect"
              className="btn-primary shadow-[0_12px_30px_rgba(56,189,248,0.35)] transition duration-300 hover:scale-[1.03]"
            >
              Book a Consultation
            </a>
            <a
              href="/#services"
              className="inline-flex items-center justify-center rounded-full border border-white/30 bg-black/40 px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-white shadow-lg backdrop-blur-md transition duration-300 hover:scale-[1.03] hover:border-white/50 hover:bg-white/20"
            >
              Explore Services
            </a>
          </motion.div>
        </motion.div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-[#070e1b] to-transparent" />
        <div className="absolute -bottom-24 left-1/2 z-10 h-44 w-[122%] -translate-x-1/2 rounded-[100%] bg-bg-primary" />
      </section>

      {/* 2. WHY CHOOSE US */}
      <section
        id="why-choose-us"
        className="relative z-10 mx-auto max-w-[1720px] px-4 pt-10 sm:px-8 lg:px-12 xl:px-16"
      >
        <div className="section-intro text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 12 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-50/80 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-sky-600 shadow-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
            <span>Why Choose Us</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="section-title text-center"
          >
            Human Intelligence Meets Intelligent Technology
          </motion.h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.09,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -8,
                  scale: 1.025,
                  transition: { duration: 0.25, ease: "easeOut" },
                }}
                className="group relative overflow-hidden rounded-[1.8rem] border border-slate-200/80 bg-white p-7 shadow-[0_10px_30px_rgba(15,23,42,0.04)] transition-all duration-300 hover:border-blue-400/50 hover:shadow-[0_24px_50px_rgba(56,189,248,0.16)]"
              >
                <div
                  className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${item.gradient} opacity-0 blur-2xl transition duration-500 group-hover:scale-125 group-hover:opacity-100`}
                />

                <div className="flex items-center justify-between">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: false, amount: 0.15 }}
                    transition={{ duration: 0.4, delay: index * 0.09 + 0.15 }}
                    className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-600 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-500 group-hover:text-white group-hover:shadow-[0_8px_20px_rgba(56,189,248,0.35)]"
                  >
                    <Icon size={22} className="transition-transform duration-300 group-hover:scale-105" />
                  </motion.div>
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-50 text-slate-300 opacity-0 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:opacity-100">
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                  </div>
                </div>

                <h3 className="mt-5 font-heading text-[1.16rem] font-semibold leading-snug text-slate-950 transition-colors duration-200 group-hover:text-blue-600">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-[13px] leading-6 text-slate-600 transition-colors duration-200 group-hover:text-slate-700">
                  {item.description}
                </p>
              </motion.article>
            );
          })}
        </div>

        {/* 3. OUR APPROACH */}
        <div id="approach" className="mt-20">
          <div className="section-intro text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 12 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-50/80 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-sky-600 shadow-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
              <span>Our Approach</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="section-title text-center"
            >
              How We Deliver Value
            </motion.h2>
          </div>

          <div className="relative mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {approachSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.article
                  key={step.title}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{
                    y: -8,
                    scale: 1.025,
                    transition: { duration: 0.25, ease: "easeOut" },
                  }}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-[1.8rem] border border-slate-200/80 bg-white p-7 shadow-[0_8px_24px_rgba(15,23,42,0.03)] transition-all duration-300 hover:border-blue-400/50 hover:shadow-[0_24px_50px_rgba(56,189,248,0.16)]"
                >
                  <div
                    className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${step.gradient} opacity-0 blur-2xl transition duration-500 group-hover:scale-125 group-hover:opacity-100`}
                  />

                  <div>
                    <div className="flex items-center justify-between">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: false, amount: 0.15 }}
                        transition={{ duration: 0.4, delay: index * 0.12 + 0.15 }}
                        className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-600 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-500 group-hover:text-white group-hover:shadow-[0_8px_20px_rgba(56,189,248,0.35)]"
                      >
                        <Icon size={22} className="transition-transform duration-300 group-hover:scale-105" />
                      </motion.div>
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-50 text-slate-300 opacity-0 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:opacity-100">
                        <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                      </div>
                    </div>

                    <h3 className="mt-5 font-heading text-[1.18rem] font-semibold text-slate-950 transition-colors duration-200 group-hover:text-blue-600">
                      {step.title}
                    </h3>
                    <p className="mt-2.5 text-[13px] leading-6 text-slate-600 transition-colors duration-200 group-hover:text-slate-700">
                      {step.description}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. SERVICES */}
      <section id="services" className="section-shell">
        <div className="mx-auto max-w-[1720px] px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="section-intro text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 12 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-50/80 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-sky-600 shadow-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
              <span>Services</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="section-title text-center"
            >
              Services we provide
            </motion.h2>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {serviceItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 35, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="group relative flex flex-col justify-between rounded-[1.55rem] border border-slate-200/90 bg-white p-6 shadow-[0_6px_20px_rgba(15,23,42,0.03)] transition-all duration-300 hover:border-blue-400/40 hover:shadow-[0_16px_36px_rgba(56,189,248,0.12)]"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
                        <Icon size={19} />
                      </div>
                      <span className="text-[9.5px] font-bold uppercase tracking-wider text-slate-400">
                        {item.category}
                      </span>
                    </div>

                    <h3 className="mt-4 font-heading text-[1.05rem] font-semibold leading-snug text-slate-950 transition-colors group-hover:text-blue-600">
                      {item.title}
                    </h3>
                  </div>

                  <div className="mt-3.5 flex items-center justify-end text-slate-300 transition-colors group-hover:text-blue-500">
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. SOLUTIONS - VERTICAL CARDS */}
      <section id="solutions" className="section-shell bg-slate-50/60">
        <div className="mx-auto max-w-[1720px] px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="section-intro text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 12 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-50/80 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-sky-600 shadow-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
              <span>Solutions</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="section-title text-center"
            >
              Comprehensive Business & Technology Solutions
            </motion.h2>
          </div>

          <div className="mt-14 space-y-8">
            {solutionSections.map((section, index) => {
              const Icon = section.icon;

              return (
                <motion.article
                  key={section.title}
                  initial={{ opacity: 0, y: 35, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.12 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="overflow-hidden rounded-[2.2rem] border border-slate-200/90 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.05)] transition-all duration-300 hover:shadow-[0_24px_50px_rgba(56,189,248,0.12)]"
                >
                  <div className="grid gap-0 lg:grid-cols-[0.32fr_0.68fr]">
                    {/* Left Header Panel */}
                    <div className="relative flex flex-col justify-between overflow-hidden border-b border-slate-200/80 bg-gradient-to-br from-slate-900 via-[#0a1526] to-[#0f213d] p-8 text-white lg:border-b-0 lg:border-r">
                      <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-cyan-500/10 blur-2xl" />

                      <div className="relative z-10">
                        <div className="flex items-center justify-between">
                          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-cyan-400 backdrop-blur-md">
                            <Icon size={20} />
                          </span>
                          <span className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                            {section.tagline}
                          </span>
                        </div>

                        <h3 className="mt-5 font-heading text-[1.34rem] font-semibold leading-tight text-white">
                          {section.title}
                        </h3>
                        <p className="mt-3 text-[13px] leading-6 text-slate-300">
                          {section.description}
                        </p>
                      </div>

                      <div className="relative z-10 mt-7 flex items-center justify-between border-t border-white/10 pt-4">
                        <a
                          href="/#connect"
                          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[11.5px] font-semibold uppercase tracking-wider text-white backdrop-blur-md transition duration-200 hover:bg-white hover:text-slate-950"
                        >
                          <span>Consult on this</span>
                          <ArrowRight size={12} />
                        </a>
                      </div>
                    </div>

                    {/* Right Items Grid */}
                    <div className="grid content-center gap-3.5 bg-slate-50/40 p-7 sm:grid-cols-2 xl:grid-cols-3">
                      {section.items.map((item) => (
                        <div
                          key={item}
                          className="group flex items-start gap-2.5 rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-sm transition-all duration-200 hover:border-blue-400/50 hover:shadow-md"
                        >
                          <CheckCircle2
                            size={16}
                            className="mt-0.5 shrink-0 text-cyan-500 transition-transform duration-200 group-hover:scale-110"
                          />
                          <span className="text-[12.8px] font-medium leading-snug text-slate-800 transition-colors group-hover:text-blue-600">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section id="testimonials" className="section-shell">
        <div className="mx-auto max-w-[1720px] px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="section-intro text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 12 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-50/80 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-sky-600 shadow-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
              <span>Testimonials</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="section-title text-center"
            >
              Trusted by Growing Businesses
            </motion.h2>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {testimonials.map((item, index) => (
              <motion.article
                key={item.quote}
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -6 }}
                className="relative overflow-hidden rounded-[2.2rem] border border-slate-200/90 bg-gradient-to-br from-white via-slate-50 to-blue-50/20 p-8 shadow-[0_12px_32px_rgba(15,23,42,0.04)] transition-all duration-300 hover:border-blue-400/40 hover:shadow-[0_20px_45px_rgba(77,124,255,0.1)]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} size={15} fill="currentColor" />
                    ))}
                  </div>
                  <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                    <Quote size={16} />
                  </span>
                </div>

                <p className="mt-5 font-heading text-[1.05rem] font-medium leading-7 text-slate-800">
                  "{item.quote}"
                </p>

                <div className="mt-5 flex items-center gap-3 border-t border-slate-200/70 pt-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-accent-blue to-accent-cyan text-xs font-bold text-white shadow-sm">
                    {item.author[0]}
                  </div>
                  <div>
                    <h4 className="font-heading text-[13px] font-bold text-slate-950">
                      {item.author}
                    </h4>
                    <p className="text-[11px] text-slate-500">{item.role}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CONNECT / CTA */}
      <section id="connect" className="section-shell">
        <div className="mx-auto max-w-[1720px] px-4 sm:px-8 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[2.8rem] bg-gradient-to-br from-slate-950 via-[#070e1b] to-[#0d1d36] px-8 py-14 text-white shadow-[0_30px_90px_rgba(7,14,27,0.4)] sm:px-12 sm:py-18 lg:px-16"
          >
            {/* Ambient Background Glows */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-cyan-500/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-blue-600/15 blur-3xl" />

            <div className="relative z-10 grid gap-10 lg:grid-cols-[0.65fr_0.35fr] lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-950/50 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300">
                  <Sparkles size={12} />
                  Connect
                </span>
                <h2 className="mt-4 max-w-3xl font-heading text-[1.95rem] font-semibold leading-[1.12] text-white sm:text-[2.45rem]">
                  Ready to Build a Smarter & Future-Ready Business?
                </h2>
                <p className="mt-3.5 max-w-2xl text-[0.92rem] leading-7 text-slate-300">
                  Partner with us to combine human intelligence, strategy and
                  technology for sustainable business growth.
                </p>

                {/* Domain Badges */}
                <div className="mt-7 flex flex-wrap gap-2">
                  {domainBadges.map((badge) => (
                    <span
                      key={badge}
                      className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-300 backdrop-blur-sm"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <a
                  href="mailto:info@ilumaa.com"
                  className="btn-primary flex items-center justify-center gap-2 shadow-[0_12px_32px_rgba(56,189,248,0.35)] transition duration-300 hover:scale-[1.03]"
                >
                  <span>Schedule a Strategy Call</span>
                  <ArrowRight size={16} />
                </a>
                <a
                  href="/#connect"
                  className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md transition duration-300 hover:bg-white hover:text-slate-950"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default HomePage;

