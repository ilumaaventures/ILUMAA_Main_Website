import { motion, useInView } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { useRef } from "react";

function Testimonials({ testimonials }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="opportunities" className="section-shell bg-bg-secondary/55">
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75 }}
        >
          <div className="section-intro">
            <p className="section-kicker">Testimonials</p>
            <h2 className="section-title">Trusted by Growing Businesses</h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
              Trusted by Growing Businesses.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {testimonials.map((entry, index) => (
              <motion.article
                key={entry.quote}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="glass-card group relative overflow-hidden p-8"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent-blue via-accent-cyan to-accent-gold opacity-0 transition duration-300 group-hover:opacity-100" />
                <div className="flex items-center justify-between">
                  <Quote className="text-accent-cyan" size={34} />
                  <div className="flex items-center gap-1 text-accent-gold">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star key={starIndex} size={16} fill="currentColor" />
                    ))}
                  </div>
                </div>
                <p className="mt-6 text-lg leading-8 text-slate-700">
                  "{entry.quote}"
                </p>
                {entry.author ? (
                  <p className="mt-6 font-mono text-xs uppercase tracking-[0.24em] text-text-secondary">
                    {entry.author}
                  </p>
                ) : null}
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Testimonials;
