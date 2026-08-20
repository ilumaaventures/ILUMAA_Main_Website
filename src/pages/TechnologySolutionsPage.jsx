import { motion } from "framer-motion";
import {
  BarChart3,
  BrainCircuit,
  Building2,
  CheckCircle2,
  Cloud,
  Cpu,
  LineChart,
} from "lucide-react";

const technologySections = [
  {
    title: "PRODUCTS & PLATFORM DEVELOPMENT",
    subtitle: "Building Scalable Digital Platforms with Human-Centered Innovation",
    summary:
      "We collaborate with businesses, entrepreneurs and institutions to conceptualize, develop and scale technology-driven platforms tailored to modern market needs.",
    detail:
      "Our approach combines strategic consulting, human intelligence and advanced technology to build scalable, future-ready digital ecosystems.",
    label: "Specialized Areas:",
    icon: Building2,
    items: [
      "Web & Mobile Application Development",
      "Property & Real Estate Platforms",
      "Business Management Platforms",
      "Marketplace Solutions",
      "Enterprise Portals",
      "SaaS Products",
      "AI-Powered Applications",
      "Workflow & Automation Platforms",
      "Custom Digital Ecosystems",
    ],
  },
  {
    title: "Technology & Digital Solutions",
    subtitle:
      "Designing and developing scalable technology ecosystems for modern businesses.",
    icon: Cpu,
    items: [
      "CRM / ERP / HRMS Platforms",
      "Cloud & Infrastructure Solutions",
      "Brand Strategy & Positioning",
      "Performance Marketing",
      "SEO & Organic Growth",
      "Social Media Marketing",
      "Lead Generation Campaigns",
      "Content & Creative Solutions",
      "Website & Digital Presence Management",
      "Marketing Automation",
    ],
  },
  {
    title: "Business Intelligence & Data Analytics",
    subtitle:
      "Transforming data into actionable business intelligence and growth insights.",
    icon: BarChart3,
    items: [
      "Data Visualization & Dashboard Development (Power BI, Tableau, Looker, etc.)",
      "Predictive & Prescriptive Analytics",
      "Customer & Market Analytics",
      "Operational Efficiency Analytics",
      "KPI & Performance Reporting",
      "Data Strategy & Governance",
      "Business Performance Analytics",
    ],
  },
  {
    title: "AI & Machine Learning Consulting",
    subtitle:
      "Enabling intelligent automation and AI-driven business transformation.",
    icon: BrainCircuit,
    items: [
      "AI Strategy & Consulting",
      "Machine Learning Model Development",
      "AI Model Deployment & Optimization",
      "Natural Language Processing (NLP) Solutions",
      "Computer Vision Solutions",
      "Recommendation Engines",
      "AI-Powered Decision Systems",
      "AI Process Optimization",
    ],
  },
  {
    title: "Big Data & Cloud Consulting",
    subtitle:
      "Building scalable data ecosystems and modern cloud-based infrastructures.",
    icon: Cloud,
    items: [
      "Big Data Architecture Design",
      "Data Warehousing & Lakehouse Solutions",
      "ETL / ELT Pipeline Development",
      "Cloud-Based Data Solutions (AWS, Azure, Google Cloud)",
      "Scalable Data Engineering",
      "Enterprise Data Platforms",
      "Data Migration & Modernization",
    ],
  },
  {
    title: "AI-Powered Automation Solutions",
    subtitle:
      "Automating business processes to improve speed, efficiency and scalability.",
    icon: LineChart,
    items: [
      "Workflow Automation",
      "AI-Driven Chatbots & Virtual Assistants",
      "Intelligent Document Processing",
      "Process Automation Systems",
      "Smart Business Operations",
      "AI-Based Customer Support Automation",
      "Robotic Process Automation (RPA)",
    ],
  },
];

function TechnologySolutionsPage() {
  return (
    <>
      <section className="section-shell pt-28 lg:pt-32">
        <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8">
          <div className="section-intro">
            <p className="section-kicker">Tech</p>
            <h2 className="section-title">Technology solutions</h2>
          </div>

          <div className="mt-12 space-y-6">
            {technologySections.map((section, index) => {
              const Icon = section.icon;

              return (
                <motion.article
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  className="light-card overflow-hidden rounded-[1.8rem]"
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
                        {section.subtitle}
                      </p>
                      {section.summary ? (
                        <p className="mt-4 text-sm leading-8 text-slate-600">
                          {section.summary}
                        </p>
                      ) : null}
                      {section.detail ? (
                        <p className="mt-4 text-sm leading-8 text-slate-600">
                          {section.detail}
                        </p>
                      ) : null}
                      {section.label ? (
                        <p className="mt-4 text-sm font-semibold leading-7 text-slate-800">
                          {section.label}
                        </p>
                      ) : null}
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
    </>
  );
}

export default TechnologySolutionsPage;
