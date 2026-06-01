import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function CTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="connect" className="section-shell">
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75 }}
          className="relative overflow-hidden rounded-[2rem] border border-slate-800 bg-[linear-gradient(135deg,#0f172a_0%,#132238_52%,#0b1d34_100%)] px-6 py-16 shadow-[0_24px_80px_rgba(15,23,42,0.18)] sm:px-10 lg:px-14"
        >
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:28px_28px] opacity-[0.10]" />
          <div className="absolute -right-10 top-0 h-44 w-44 rounded-full bg-accent-cyan/18 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-52 w-52 rounded-full bg-accent-gold/18 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-cyan-300">
                Connect
              </p>
              <h2 className="mt-4 max-w-3xl font-heading text-4xl font-extrabold text-white sm:text-5xl">
                Ready to Build a Smarter & Future-Ready Business?
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                Partner with us to combine human intelligence, strategy and
                technology for sustainable business growth.
              </p>
            </div>

            <div className="flex flex-col gap-4 lg:items-end">
              <a href="mailto:info@ilumaa.com" className="btn-primary w-full justify-center lg:w-auto">
                Schedule a Strategy Call
              </a>
              <a href="mailto:info@ilumaa.com" className="btn-secondary w-full justify-center lg:w-auto">
                Contact Us
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default CTA;
