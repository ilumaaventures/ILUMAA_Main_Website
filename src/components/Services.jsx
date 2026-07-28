import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Circle } from "lucide-react";
import { useRef } from "react";

function Services({ services }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="services" className="section-shell">
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75 }}
        >
          <div className="section-intro">
            <p className="section-kicker">Services</p>
            <h2 className="section-title">
              Business strategy and consulting practice areas
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
              Business Strategy &amp; Advisory with supporting consulting areas
              across workforce, research, legal, financial and digital growth.
            </p>
          </div>

          <div className="mt-12 space-y-6">
            {services.map((service, index) => (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="glass-card overflow-hidden rounded-[1.75rem]"
              >
                <div className="grid gap-6 lg:grid-cols-[0.34fr_0.66fr]">
                  <div className="border-b border-border-subtle bg-gradient-to-br from-blue-50 via-white to-amber-50 p-7 lg:border-b-0 lg:border-r">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs uppercase tracking-[0.24em] text-accent-blue">
                        Practice 0{index + 1}
                      </span>
                      <ArrowUpRight size={18} className="text-slate-400" />
                    </div>
                    <h3 className="mt-6 font-heading text-3xl font-extrabold text-slate-950">
                      {service.title}
                    </h3>
                    {service.description ? (
                      <p className="mt-4 text-base leading-8 text-slate-600">
                        {service.description}
                      </p>
                    ) : null}
                  </div>

                  <div className="grid gap-3 p-7 sm:grid-cols-2">
                    {service.items.map((item) => (
                      <div
                        key={item}
                        className="rounded-[1.25rem] border border-border-subtle bg-slate-50/80 px-4 py-4"
                      >
                        <div className="flex items-start gap-3">
                          <Circle
                            size={10}
                            fill="currentColor"
                            className="mt-2 shrink-0 text-accent-gold"
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

export default Services;
