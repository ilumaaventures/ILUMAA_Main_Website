import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Cloud,
  Cpu,
  Handshake,
  Heart,
  LineChart,
  Quote,
  Rocket,
  Scale,
  Target,
  TrendingUp,
  Users,
  Zap,
  Brain
} from "lucide-react";

const serviceItems = [
  { title: "Business Strategy & Advisory", icon: BriefcaseBusiness },
  { title: "Business Registration & Structuring", icon: Scale },
  { title: "Workforce Strategy and Planning", icon: Users },
  { title: "Growth & Expansion Strategy", icon: ArrowRight },
  { title: "Operational Excellence", icon: CheckCircle2 },
  { title: "Business Transformation", icon: BrainCircuit },
  { title: "Organizational Development", icon: Building2 },
  { title: "Process Optimization", icon: BarChart3 },
  { title: "Change Management", icon: Cpu },
  { title: "Startup & Scale-up Consulting", icon: BriefcaseBusiness },
];

const whyChooseUs = [
  { title: "Human-Centered Strategic Thinking", icon: Brain },
  { title: "Integrated Consulting & Technology Expertise", icon: Zap },
  { title: "Data & AI-Driven Decision Making", icon: TrendingUp },
  { title: "Scalable & Future-Ready Solutions", icon: Rocket },
  { title: "Industry-Focused Consulting", icon: Target },
  { title: "Long-Term Strategic Partnerships", icon: Handshake },
];

const solutionSections = [
  {
    title: "Talent & Workforce Solutions",
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
  },
  {
    title: "Technology & Digital Solutions",
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
  },
  {
    title: "Market Research & Strategic Intelligence",
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
  },
  {
    title: "Legal & Financial Consulting",
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
  },
  {
    title: "Digital Marketing & Brand Growth",
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
  },
];

const approachSteps = [
  {
    title: "Understand",
    description: "Understanding business challenges, people and opportunities.",
  },
  {
    title: "Strategize",
    description:
      "Creating intelligent, business-focused transformation roadmaps.",
  },
  {
    title: "Build & Implement",
    description: "Executing scalable consulting and technology solutions.",
  },
  {
    title: "Optimize & Scale",
    description:
      "Improving systems, performance and business growth continuously.",
  },
];

const testimonials = [
  "Their strategic and technology expertise helped us modernize operations and improve decision-making.",
  "A reliable consulting partner with strong capabilities across analytics, automation and business transformation.",
];

function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden px-0 pb-28 pt-16 lg:pb-36 lg:pt-20">
        <div className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_20%_18%,rgba(77,124,255,0.08),transparent_22%),radial-gradient(circle_at_82%_20%,rgba(56,189,248,0.08),transparent_20%)]" />
        <div className="w-full px-0">
          <div className="relative overflow-hidden bg-[#06080d] px-6 py-20 text-center sm:px-8 sm:py-24 lg:px-12 lg:py-28">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_26%)]" />
            <div className="absolute left-1/2 top-0 h-px w-[82%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="relative mx-auto max-w-4xl"
            >
              <h1 className="mx-auto max-w-4xl font-heading text-[2.55rem] font-semibold leading-[1.08] text-white sm:text-[3.15rem] lg:text-[4rem]">
                Strategic Consulting. Intelligent Solutions. Scalable Growth.
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-[0.98rem] leading-8 text-slate-300 sm:text-[1.02rem]">
                We help businesses scale through human intelligence, leverage
                intelligent technologies and operational excellence.
              </p>
              <p className="mx-auto mt-4 max-w-3xl text-[0.9rem] leading-8 text-slate-400">
                Integrated solutions across Strategy, Technology, Talent,
                Finance, AI, Legal and Digital Marketing.
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a href="/#connect" className="btn-primary">
                  Book a Consultation
                </a>
                <a
                  href="/#services"
                  className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.04] px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-white/[0.08]"
                >
                  Explore Services
                </a>
              </div>
            </motion.div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#06080d] to-transparent" />
            <div className="absolute -bottom-24 left-1/2 h-44 w-[122%] -translate-x-1/2 rounded-[100%] bg-bg-primary" />
          </div>
        </div>

        <div className="relative z-10 mx-auto mt-2 max-w-7xl px-4 sm:mt-4 sm:px-6 lg:mt-6 lg:px-8">
          <div className="section-intro max-w-3xl">
            <p className="section-kicker">Why Choose Us</p>
            <h2 className="section-title">
              Human Intelligence Meets Intelligent Technology
            </h2>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.16 + index * 0.06 }}
                  className="light-card rounded-[1.45rem] p-6 flex flex-col items-center justify-center text-center"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                    <Icon size={18} />
                  </span>
                  <h3 className="mt-6 font-heading text-[1.2rem] font-semibold leading-8 text-slate-950">
                    {item.title}
                  </h3>
                </motion.article>
              );
            })}
          </div>

          <div id="approach" className="mt-12">
            <div className="section-intro max-w-3xl">
              <p className="section-kicker">Our Approach</p>
              <h2 className="section-title">How We Deliver Value</h2>
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-4">
              {approachSteps.map((step, index) => (
                <motion.article
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.18 + index * 0.06 }}
                  className="light-card rounded-[1.45rem] p-6"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-3 h-2.5 w-2.5 shrink-0 rounded-full bg-blue-600" />
                    <h3 className="font-heading text-[1.25rem] font-semibold text-slate-950">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-8 text-slate-600">
                    {step.description}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="section-shell">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="section-intro max-w-3xl">
            <p className="section-kicker">Services</p>
            <h2 className="section-title">Services we provide</h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {serviceItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  className="light-card rounded-[1.45rem] p-6 flex flex-col items-center justify-center text-center"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                    <Icon size={18} />
                  </span>
                  <h3 className="mt-6 font-heading text-[1.18rem] font-semibold leading-8 text-slate-950">
                    {item.title}
                  </h3>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="solutions" className="section-shell bg-white/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="section-intro">
            <p className="section-kicker">Solutions</p>
            <h2 className="section-title">Solutions</h2>
          </div>

          <div className="mt-12 space-y-6">
            {solutionSections.map((section, index) => {
              const Icon = section.icon;

              return (
                <motion.article
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  className="light-card overflow-hidden rounded-[1.75rem]"
                >
                  <div className="grid gap-0 lg:grid-cols-[0.34fr_0.66fr]">
                    <div className="border-b border-slate-200 bg-[linear-gradient(180deg,rgba(248,250,252,0.95),rgba(239,246,255,0.95))] p-6 lg:border-b-0 lg:border-r">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm">
                        <Icon size={20} />
                      </span>
                      <h3 className="mt-6 font-heading text-[1.35rem] font-semibold leading-8 text-slate-950">
                        {section.title}
                      </h3>
                      <p className="mt-3 text-sm leading-8 text-slate-600">
                        {section.description}
                      </p>
                    </div>

                    <div className="grid gap-3 p-6 sm:grid-cols-2 xl:grid-cols-3">
                      {section.items.map((item) => (
                        <div
                          key={item}
                          className="rounded-[1.15rem] border border-slate-200 bg-white px-4 py-4"
                        >
                          <div className="flex items-start gap-3">
                            <CheckCircle2
                              size={18}
                              className="mt-1 shrink-0 text-cyan-500"
                            />
                            <span className="text-sm leading-7 text-slate-700">
                              {item}
                            </span>
                          </div>
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

      <section id="testimonials" className="section-shell">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="section-intro">
            <p className="section-kicker">Testimonials</p>
            <h2 className="section-title">Trusted by Growing Businesses</h2>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {testimonials.map((quote, index) => (
              <motion.article
                key={quote}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="light-card rounded-[1.6rem] p-7"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <Quote size={20} />
                </span>
                <p className="mt-6 text-[0.96rem] leading-8 text-slate-700">
                  {quote}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="connect" className="section-shell">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] bg-slate-950 px-6 py-10 text-white shadow-[0_28px_80px_rgba(15,23,42,0.18)] sm:px-8 lg:px-10">
            <div className="grid gap-8 lg:grid-cols-[0.62fr_0.38fr] lg:items-center">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-300">
                  Connect
                </p>
                <h2 className="mt-4 max-w-3xl font-heading text-[2rem] font-semibold leading-[1.08] text-white">
                  Ready to Build a Smarter & Future-Ready Business?
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-8 text-slate-300">
                  Partner with us to combine human intelligence, strategy and
                  technology for sustainable business growth.
                </p>
              </div>

              <div className="grid gap-4">
                <a
                  href="mailto:info@ilumaa.com"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-slate-950 transition hover:bg-slate-100"
                >
                  Schedule a Strategy Call
                </a>
                <button
                  type="button"
                  disabled
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-white opacity-600"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
