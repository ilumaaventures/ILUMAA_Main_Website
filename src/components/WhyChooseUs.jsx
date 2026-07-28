import { motion, useInView } from "framer-motion";
import {
  BarChart3,
  BrainCircuit,
  BriefcaseBusiness,
  Handshake,
  Network,
  Rocket,
} from "lucide-react";
import { useRef } from "react";

const iconMap = {
  brain: BrainCircuit,
  network: Network,
  chart: BarChart3,
  rocket: Rocket,
  briefcase: BriefcaseBusiness,
  handshake: Handshake,
};

function WhyChooseUs({ items }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="why-choose-us" className="section-shell">
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75 }}
        >
          <div className="section-intro">
            <p className="section-kicker">Why Choose Us</p>
            <h2 className="section-title">
              Human Intelligence Meets Intelligent Technology
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
              Human Intelligence Meets Intelligent Technology.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {items.map((item, index) => {
              const Icon = iconMap[item.icon];

              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 26 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                  whileHover={{ y: -8, scale: 1.01 }}
                  className="glass-card group relative overflow-hidden p-7"
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent-blue via-accent-cyan to-accent-gold opacity-0 transition duration-300 group-hover:opacity-100" />
                  <div className="flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-accent-cyan/20 bg-cyan-50 text-accent-cyan transition group-hover:border-accent-cyan/40 group-hover:shadow-glow">
                      <Icon size={24} />
                    </div>
                    <span className="font-heading text-4xl font-extrabold text-slate-100">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-6 font-heading text-2xl font-bold text-slate-900">
                    {item.title}
                  </h3>
                  {item.description ? (
                    <p className="mt-4 text-base leading-7 text-slate-600">
                      {item.description}
                    </p>
                  ) : null}
                </motion.article>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
