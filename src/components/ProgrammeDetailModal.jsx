import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CheckCircle2,
  Calendar,
  Clock,
  Layers,
  Award,
  Users,
  Briefcase,
  ArrowRight,
  Terminal,
  Target,
  Sparkles,
} from "lucide-react";

export default function ProgrammeDetailModal({
  programme,
  isOpen,
  onClose,
  onApply,
}) {
  if (!isOpen || !programme) return null;

  return (
    <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative z-10 w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-200/80 my-8 flex flex-col max-h-[90vh]"
      >
        {/* Header with subtle gradient */}
        <div className="relative px-6 py-6 sm:px-8 sm:py-8 bg-gradient-to-r from-slate-900 via-[#0a1835] to-slate-900 text-white shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition"
            aria-label="Close modal"
          >
            <X size={16} />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1 rounded-full border border-cyan-400/30 bg-cyan-950/70 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cyan-300">
              {programme.code} Track
            </span>
            <span className="rounded-full bg-blue-500/20 px-2.5 py-0.5 text-[10px] font-semibold text-blue-300 border border-blue-400/20">
              Launch Cohort
            </span>
          </div>

          <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            {programme.title}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            {programme.summary}
          </p>

          <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-300 pt-2 border-t border-white/10">
            <div className="flex items-center gap-1.5">
              <Clock size={14} className="text-cyan-400" />
              <span>Mentor-Led Sessions</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Target size={14} className="text-cyan-400" />
              <span>Hands-on Deliverables</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award size={14} className="text-cyan-400" />
              <span>ILUMAA Certificate</span>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto text-slate-700">
          {/* Focus Areas */}
          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
              <Terminal size={16} className="text-blue-600" />
              Core Focus Areas & Competencies
            </h3>
            <div className="flex flex-wrap gap-2">
              {programme.focusAreas.map((area, idx) => (
                <span
                  key={idx}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-800 transition hover:border-blue-300 hover:bg-blue-50/50"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>

          {/* Practical Deliverables */}
          <div className="rounded-2xl border border-slate-200/80 bg-gradient-to-br from-slate-50 to-blue-50/30 p-5">
            <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-slate-900 mb-2 flex items-center gap-2">
              <Briefcase size={16} className="text-blue-600" />
              What You Will Build & Deliver
            </h3>
            <p className="text-xs text-slate-600 mb-3 leading-relaxed">
              Every participant graduates with verifiable proof of work and professional deliverables tailored to impress hiring managers:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
              {programme.deliverables?.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-blue-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Ideal Candidate Profile */}
          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-slate-900 mb-2 flex items-center gap-2">
              <Users size={16} className="text-blue-600" />
              Who This Programme Is Ideal For
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 rounded-xl p-4 border border-slate-200">
              {programme.idealFor}
            </p>
          </div>
        </div>

        {/* Modal Actions Footer */}
        <div className="flex items-center justify-between gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-300 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-slate-700 hover:bg-white transition"
          >
            Close
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onApply(programme.title);
            }}
            className="btn-primary flex items-center gap-2 px-6 py-2.5 text-xs shadow-md"
          >
            <span>Apply For This Track</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
