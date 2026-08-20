import { motion } from "framer-motion";
import {
  ArrowRight,
  Cpu,
  Layers,
  Sparkles,
  ShieldCheck,
  Zap,
  Rocket,
  LineChart,
} from "lucide-react";
import TechTabFolder from "./TechTabFolder";
import { techTracks } from "./techData";

export default function TechnologySolutionsPage() {
  const totalCapabilities = techTracks.reduce(
    (acc, track) => acc + track.items.length,
    0
  );

  return (
    <div className="min-h-screen bg-bg-primary pb-20 pt-24 sm:pt-28 lg:pt-32">
      {/* 1. HERO BANNER FOR TECHNOLOGY */}
      <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1520px]">
          {/* Subtle Ambient Background Gradients */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="relative z-10 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-50/80 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-blue-600 shadow-sm"
            >
              <Sparkles size={13} className="text-cyan-500" />
              <span>Technology & Digital Solutions</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="mt-5 font-heading text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl"
            >
              Engineering Scalable Platforms & Intelligent Systems
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="mt-6 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg"
            >
              We collaborate with forward-looking enterprises and founders to conceptualize,
              architect, and deploy high-performance software, AI-driven automation, data lakehouses,
              and full-spectrum technology ecosystems.
            </motion.p>

            {/* Quick Metrics Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="mt-8 flex flex-wrap items-center gap-4 sm:gap-8"
            >
              <div className="flex items-center gap-3">
                <span className="font-heading text-2xl font-black text-blue-600 sm:text-3xl">
                  {techTracks.length}
                </span>
                <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  Specialized<br />Tracks
                </span>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div className="flex items-center gap-3">
                <span className="font-heading text-2xl font-black text-cyan-600 sm:text-3xl">
                  {totalCapabilities}+
                </span>
                <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  Ready-to-Deploy<br />Capabilities
                </span>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div className="flex items-center gap-3">
                <span className="font-heading text-2xl font-black text-indigo-600 sm:text-3xl">
                  100%
                </span>
                <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  Human-Centered<br />Architecture
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. THE TECH TAB FOLDER SECTION */}
      <section id="tech-tracks" className="mt-14 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1520px]">
          <TechTabFolder />
        </div>
      </section>

      {/* 3. WHY OUR TECHNOLOGY APPROACH STANDS OUT */}
      <section className="mt-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1520px] rounded-[2.5rem] border border-slate-200/90 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 p-8 sm:p-12 lg:p-16">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
              Enterprise Excellence
            </span>
            <h2 className="mt-3 font-heading text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Why Partner With ILUMAA For Technology
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Unlike generic IT agencies, our engineering teams are paired directly with business
              strategists, ensuring every line of code drives measurable ROI and operational resilience.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Zap size={20} />
              </div>
              <h3 className="mt-4 font-heading text-base font-bold text-slate-900">
                Speed to Value
              </h3>
              <p className="mt-2 text-xs leading-6 text-slate-600">
                Modular component architectures and rapid prototyping frameworks accelerate delivery cycles.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                <ShieldCheck size={20} />
              </div>
              <h3 className="mt-4 font-heading text-base font-bold text-slate-900">
                Enterprise Security & Governance
              </h3>
              <p className="mt-2 text-xs leading-6 text-slate-600">
                Built-in compliance, robust RBAC, end-to-end data encryption, and audit-ready architectures.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <Rocket size={20} />
              </div>
              <h3 className="mt-4 font-heading text-base font-bold text-slate-900">
                Cloud-Native Scalability
              </h3>
              <p className="mt-2 text-xs leading-6 text-slate-600">
                Engineered from day one to scale effortlessly from MVP to multi-million user enterprise systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CTA BANNER */}
      <section className="mt-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1520px]">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 px-8 py-12 text-white shadow-2xl sm:px-12 sm:py-16">
            <div className="relative z-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
                  Ready to Build?
                </span>
                <h3 className="mt-3 font-heading text-2xl font-bold sm:text-4xl">
                  Transform Your Tech Roadmap Into Reality
                </h3>
                <p className="mt-3 text-sm text-slate-300">
                  Connect with our technology architects to scope out your application, data platform, or AI initiative.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="mailto:info@ilumaa.com"
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition hover:brightness-110"
                >
                  <span>Book Architecture Review</span>
                  <ArrowRight size={16} />
                </a>
                <a
                  href="/#connect"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm transition hover:bg-white hover:text-slate-950"
                >
                  <span>Contact Team</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
