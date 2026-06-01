import { motion, useInView } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useRef } from "react";

function Solutions({ solutions }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="solutions" className="section-shell bg-bg-secondary/55">
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75 }}
        >
          <div className="section-intro">
            <p className="section-kicker">Solutions</p>
            <h2 className="section-title">
              Solution pillars with dedicated capability groupings
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
              Building high-performing teams, scalable technology ecosystems,
              strategic intelligence, legal-financial clarity and digital brand
              growth.
            </p>
          </div>

          <div className="mt-12 space-y-6">
            {solutions.map((solution, index) => (
              <motion.article
                key={solution.key}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="glass-card overflow-hidden rounded-[1.75rem]"
              >
                <div className="grid gap-6 lg:grid-cols-[0.38fr_0.62fr]">
                  <div className="border-b border-border-subtle bg-white p-7 lg:border-b-0 lg:border-r">
                    <div className="font-mono text-xs uppercase tracking-[0.24em] text-accent-blue">
                      Solution 0{index + 1}
                    </div>
                    <h3 className="mt-4 font-heading text-3xl font-extrabold text-slate-950">
                      {solution.title}
                    </h3>
                    <p className="mt-4 text-base leading-8 text-slate-600">
                      {solution.description}
                    </p>
                  </div>

                  <div className="grid gap-3 p-7 sm:grid-cols-2">
                    {solution.items.map((item) => (
                      <div
                        key={item}
                        className="rounded-[1.25rem] border border-border-subtle bg-slate-50/90 px-4 py-4"
                      >
                        <div className="flex items-start gap-3">
                          <CheckCircle2
                            size={18}
                            className="mt-1 shrink-0 text-accent-gold"
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
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Solutions;
