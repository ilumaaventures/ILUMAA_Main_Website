import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const lines = [
  "Strategic Consulting.",
  "Intelligent Solutions.",
  "Scalable Growth.",
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.25,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 34 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-hero-mesh pt-28"
    >
      <div className="absolute inset-0 bg-grid-fade bg-[size:72px_72px] opacity-[0.08]" />
      <div className="absolute left-[8%] top-24 h-60 w-60 rounded-full bg-accent-cyan/14 blur-3xl animate-drift" />
      <div className="absolute right-[12%] top-32 h-72 w-72 rounded-full bg-accent-blue/16 blur-3xl animate-float" />
      <div className="absolute bottom-16 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full bg-accent-gold/12 blur-3xl animate-drift" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="max-w-4xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/90 px-4 py-2 font-mono text-xs uppercase tracking-[0.24em] text-accent-blue shadow-sm"
            >
              <span className="h-2 w-2 rounded-full bg-accent-gold" />
              ILUMAA | Business Consulting & Technology
            </motion.p>

            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="mt-7 space-y-2 font-heading text-5xl font-extrabold leading-[0.95] text-slate-950 sm:text-6xl lg:text-7xl"
            >
              {lines.map((line) => (
                <motion.span key={line} variants={item} className="block">
                  {line}
                </motion.span>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="mt-8 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl"
            >
              We help businesses scale through human intelligence, leverage
              intelligent technologies and operational excellence.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="mt-6 max-w-3xl rounded-[1.25rem] border border-blue-100 bg-white px-5 py-4 font-mono text-xs uppercase tracking-[0.18em] text-slate-500 shadow-[0_18px_40px_rgba(148,163,184,0.16)] sm:text-sm"
            >
              Integrated solutions across Strategy, Technology, Talent, Finance,
              AI, Legal and Digital Marketing.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.95 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <button
                type="button"
                onClick={() =>
                  document
                    .querySelector("#connect")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
                className="btn-primary"
              >
                Book a Consultation
              </button>
              <button
                type="button"
                onClick={() =>
                  document
                    .querySelector("#services")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
                className="btn-secondary"
              >
                Explore Services
              </button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_100%)] p-8 shadow-[0_28px_64px_rgba(15,23,42,0.08)]"
          >
            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-accent-blue via-accent-cyan to-accent-gold" />
            <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-accent-blue/8 blur-3xl" />
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent-blue">
                  Human Intelligence Meets Intelligent Technology
                </p>
                <h2 className="mt-4 max-w-sm font-heading text-3xl font-extrabold text-slate-950">
                  Integrated solutions for modern business growth.
                </h2>
              </div>
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[1.5rem] bg-slate-950 text-center shadow-[0_20px_40px_rgba(15,23,42,0.18)]">
                <div>
                  <div className="font-heading text-2xl font-extrabold text-white">07</div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-slate-300">
                    Domains
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                "Strategy",
                "Technology",
                "Talent",
                "Finance",
                "AI",
                "Legal",
              ].map((entry, index) => (
                <motion.div
                  key={entry}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.55, delay: 0.45 + index * 0.08 }}
                  className="rounded-[1.25rem] border border-slate-100 bg-white px-5 py-4 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-heading text-lg font-bold text-slate-900">
                      {entry}
                    </h3>
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-accent-gold" />
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.95 }}
              className="mt-6 rounded-[1.5rem] bg-slate-950 px-6 py-6 text-white"
            >
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-cyan-300">
                Core statement
              </p>
              <p className="mt-3 text-base leading-8 text-slate-200">
                We help businesses scale through human intelligence, leverage
                intelligent technologies and operational excellence.
              </p>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 1.05 }}
          className="mt-10 grid gap-4 rounded-[2rem] border border-slate-200 bg-white/90 p-5 shadow-[0_24px_60px_rgba(15,23,42,0.05)] sm:grid-cols-3"
        >
          {[
            "Human-Centered Strategic Thinking",
            "Integrated Consulting & Technology Expertise",
            "Long-Term Strategic Partnerships",
          ].map((entry) => (
            <div
              key={entry}
              className="rounded-[1.25rem] border border-slate-100 bg-slate-50/80 px-5 py-5"
            >
              <p className="font-heading text-xl font-bold leading-8 text-slate-900">
                {entry}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.button
        type="button"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        onClick={() =>
          document
            .querySelector("#why-choose-us")
            ?.scrollIntoView({ behavior: "smooth", block: "start" })
        }
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.24em] text-slate-500"
      >
        Scroll
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle bg-white/80 text-accent-cyan shadow-sm">
          <ArrowDown size={16} />
        </span>
      </motion.button>
    </section>
  );
}

export default Hero;
