import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";

function Overview({ domains }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="section-shell">
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75 }}
          className="grid gap-8 lg:grid-cols-[0.46fr_0.54fr]"
        >
          <div className="section-intro">
            <p className="section-kicker">Integrated Scope</p>
            <h2 className="section-title">
              Integrated solutions across business and technology
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
              Integrated solutions across Strategy, Technology, Talent, Finance,
              AI, Legal and Digital Marketing.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {domains.map((domain, index) => (
              <motion.article
                key={domain}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="glass-card group rounded-[1.5rem] p-5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent-blue">
                    0{index + 1}
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="text-slate-300 transition group-hover:text-accent-cyan"
                  />
                </div>
                <h3 className="mt-8 font-heading text-2xl font-extrabold text-slate-900">
                  {domain}
                </h3>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Overview;
