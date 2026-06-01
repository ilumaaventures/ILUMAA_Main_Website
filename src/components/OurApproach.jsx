import { motion, useInView } from "framer-motion";
import { Route, Search, Settings2, TrendingUp } from "lucide-react";
import { useRef } from "react";

const iconMap = {
  search: Search,
  route: Route,
  settings: Settings2,
  trending: TrendingUp,
};

function OurApproach({ steps }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section className="section-shell bg-bg-secondary/55">
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75 }}
        >
          <div className="section-intro">
            <p className="section-kicker">Our Approach</p>
            <h2 className="section-title">How We Deliver Value</h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
              A simple delivery model built around business understanding,
              roadmap clarity, implementation quality and continuous
              optimization.
            </p>
          </div>

          <div className="relative mt-14 rounded-[2rem] border border-slate-200 bg-white/70 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.05)] backdrop-blur-sm lg:p-8">
            <div className="hidden lg:block">
              <div className="absolute left-[10%] right-[10%] top-24 h-px bg-gradient-to-r from-transparent via-accent-cyan/60 to-transparent animate-pulse-line" />
            </div>

            <div className="grid gap-6 lg:grid-cols-4">
              {steps.map((step, index) => {
                const Icon = iconMap[step.icon];

                return (
                  <motion.article
                    key={step.number}
                    initial={{ opacity: 0, y: 26 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.55, delay: index * 0.1 }}
                    className="glass-card relative p-7 shadow-none"
                  >
                    <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/40 to-transparent lg:hidden" />
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-accent-cyan/30 bg-cyan-50 font-heading text-sm font-bold text-accent-cyan shadow-glow">
                        {step.number}
                      </span>
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border-subtle bg-amber-50 text-accent-gold">
                        <Icon size={22} />
                      </span>
                    </div>
                    <h3 className="mt-6 font-heading text-2xl font-bold text-slate-900">
                      {step.title}
                    </h3>
                    <p className="mt-4 text-base leading-7 text-slate-600">
                      {step.description}
                    </p>
                    <div className="mt-6 h-1.5 w-20 rounded-full bg-gradient-to-r from-accent-blue to-accent-cyan" />
                  </motion.article>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default OurApproach;
