import { motion, useInView } from "framer-motion";
import { ChevronRight, Cpu } from "lucide-react";
import { useRef } from "react";
import TechTabFolder from "../tech/components/TechTabFolder";

function Tech({ sections }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  if (!sections || sections.length === 0) {
    return (
      <section id="tech" className="section-shell">
        <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8">
          <div className="section-intro text-center">
            <p className="section-kicker">Tech</p>
            <h2 className="section-title">
              Technology Focus Areas & Specialized Capability Tracks
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600">
              Explore our specialized technology tracks across digital platforms, data analytics,
              applied AI, cloud engineering, and automated enterprise operations.
            </p>
          </div>

          <div className="mt-12">
            <TechTabFolder />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="tech" className="section-shell">
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75 }}
        >
          <div className="section-intro">
            <p className="section-kicker">Tech</p>
            <h2 className="section-title">
              Technology focus areas and specialized capability tracks
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
              Products and platforms, data analytics, AI consulting, big data
              and cloud consulting, and AI-powered automation solutions.
            </p>
          </div>

          <div className="mt-12 grid gap-6 xl:grid-cols-2">
            {sections.map((section, index) => (
              <motion.article
                key={section.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                whileHover={{ y: -6 }}
                className="glass-card relative overflow-hidden p-8"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent-blue via-accent-cyan to-transparent" />
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-accent-blue/20 bg-blue-50 text-accent-cyan">
                      <Cpu size={22} />
                    </span>
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent-blue">
                        {section.title}
                      </p>
                      <h3 className="mt-2 font-heading text-2xl font-extrabold text-slate-950">
                        {section.heading}
                      </h3>
                    </div>
                  </div>
                  <span className="font-heading text-5xl font-extrabold text-slate-100">
                    0{index + 1}
                  </span>
                </div>
                <p className="mt-5 text-base leading-8 text-slate-600">
                  {section.description}
                </p>
                {section.subheading ? (
                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    {section.subheading}
                  </p>
                ) : null}
                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {section.items.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-border-subtle bg-slate-50/90 px-4 py-4"
                    >
                      <div className="flex items-start gap-2.5">
                        <ChevronRight
                          size={18}
                          className="mt-1 shrink-0 text-accent-gold"
                        />
                        <span className="text-sm leading-7 text-slate-700">{item}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Tech;
