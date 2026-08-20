import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  FolderKanban,
  LayoutGrid,
  Layers,
  Sparkles,
} from "lucide-react";
import { techTracks } from "./techData";

export default function TechTabFolder({ initialTrackId = null, showViewToggle = true }) {
  const [activeTabId, setActiveTabId] = useState(
    initialTrackId || techTracks[0].id
  );
  const [viewMode, setViewMode] = useState("tab"); // "tab" | "grid"

  const activeIndex = techTracks.findIndex((track) => track.id === activeTabId);
  const activeTrack = activeIndex >= 0 ? techTracks[activeIndex] : techTracks[0];

  const handlePrevTab = () => {
    const prevIdx = (activeIndex - 1 + techTracks.length) % techTracks.length;
    setActiveTabId(techTracks[prevIdx].id);
  };

  const handleNextTab = () => {
    const nextIdx = (activeIndex + 1) % techTracks.length;
    setActiveTabId(techTracks[nextIdx].id);
  };

  return (
    <div className="w-full">
      {/* Folder Header Controls: Mode Toggle & Active Indicator */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
          <FolderKanban size={16} className="text-blue-600" />
          <span>Technology Folder Directory</span>
          <span className="rounded-full bg-blue-100/80 px-2.5 py-0.5 text-[10px] font-bold text-blue-700">
            {techTracks.length} Specialized Tracks
          </span>
        </div>

        {showViewToggle && (
          <div className="flex items-center rounded-xl border border-slate-200 bg-slate-100/80 p-1 text-xs">
            <button
              type="button"
              onClick={() => setViewMode("tab")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-medium transition-all ${viewMode === "tab"
                  ? "bg-white font-semibold text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
                }`}
            >
              <FolderKanban size={14} />
              <span>Tab Folder</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-medium transition-all ${viewMode === "grid"
                  ? "bg-white font-semibold text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
                }`}
            >
              <LayoutGrid size={14} />
              <span>All Tracks View</span>
            </button>
          </div>
        )}
      </div>

      {viewMode === "tab" ? (
        <div className="flex flex-col gap-6">
          {/* TAB BAR (Folder Tabs) */}
          <div className="relative">
            {/* Scrollable Container */}
            <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2 pt-1 sm:gap-3">
              {techTracks.map((track, idx) => {
                const isActive = track.id === activeTabId;
                const Icon = track.icon;

                return (
                  <button
                    key={track.id}
                    type="button"
                    onClick={() => setActiveTabId(track.id)}
                    className={`group relative flex shrink-0 items-center gap-2.5 rounded-2xl border px-4 py-3 text-left transition-all duration-200 sm:px-5 sm:py-3.5 ${isActive
                        ? "border-blue-500/40 bg-white shadow-[0_8px_24px_rgba(37,99,235,0.12)] ring-2 ring-blue-500/20"
                        : "border-slate-200/90 bg-white/70 hover:border-slate-300 hover:bg-white text-slate-600 hover:text-slate-900"
                      }`}
                  >
                    {/* Active Background Pill Indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeFolderTab"
                        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-50/50 via-cyan-50/30 to-white"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}

                    <div className="relative z-10 flex items-center gap-2.5">
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-xl text-xs transition-all ${isActive
                            ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-sm"
                            : "bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600"
                          }`}
                      >
                        <Icon size={16} />
                      </span>

                      <div>
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`font-mono text-[10px] font-bold uppercase tracking-wider ${isActive ? "text-blue-600" : "text-slate-400"
                              }`}
                          >
                            0{idx + 1}
                          </span>
                        </div>
                        <span
                          className={`block font-heading text-xs font-bold leading-tight sm:text-[13px] ${isActive ? "text-slate-950" : "text-slate-700"
                            }`}
                        >
                          {track.tabLabel}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ACTIVE TAB FOLDER CONTENT CARD */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTrack.id}
              initial={{ opacity: 0, y: 15, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.99 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative overflow-hidden rounded-[2.2rem] border border-slate-200/90 bg-white shadow-[0_16px_48px_rgba(15,23,42,0.06)]"
            >
              {/* Top Accent Gradient Bar */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${activeTrack.badgeColor}`} />

              <div className="grid gap-0 lg:grid-cols-[0.38fr_0.62fr]">
                {/* Left Sidebar of Folder Card */}
                <div className="flex flex-col justify-between border-b border-slate-200 bg-[linear-gradient(180deg,rgba(248,250,252,0.98),rgba(239,246,255,0.85))] p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-white p-3 text-blue-600 shadow-md ring-1 ring-slate-100">
                          {(() => {
                            const Icon = activeTrack.icon;
                            return <Icon size={26} />;
                          })()}
                        </span>
                        <div>
                          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-blue-600">
                            Track 0{activeIndex + 1} of 0{techTracks.length}
                          </span>
                          <span className="block text-[11px] font-semibold text-slate-400">
                            {activeTrack.shortTag}
                          </span>
                        </div>
                      </div>

                      <span className="font-heading text-4xl font-extrabold text-slate-200/80">
                        0{activeIndex + 1}
                      </span>
                    </div>

                    <h3 className="mt-6 font-heading text-2xl font-bold tracking-tight text-slate-950 sm:text-[1.7rem]">
                      {activeTrack.title}
                    </h3>

                    <p className="mt-3 text-sm font-semibold leading-6 text-blue-700">
                      {activeTrack.subtitle}
                    </p>

                    <div className="my-5 h-px bg-slate-200/80" />

                    {activeTrack.summary && (
                      <p className="text-sm leading-relaxed text-slate-600">
                        {activeTrack.summary}
                      </p>
                    )}

                    {activeTrack.detail && (
                      <p className="mt-3 text-xs leading-relaxed text-slate-500">
                        {activeTrack.detail}
                      </p>
                    )}

                    {/* Key Deliverables Tag List */}
                    {activeTrack.deliverables && (
                      <div className="mt-6 rounded-2xl border border-blue-100 bg-white/90 p-4 shadow-sm">
                        <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-800">
                          <Sparkles size={13} className="text-cyan-500" />
                          Key Architectural Deliverables
                        </span>
                        <ul className="mt-2.5 space-y-1.5">
                          {activeTrack.deliverables.map((item) => (
                            <li
                              key={item}
                              className="flex items-center gap-2 text-xs text-slate-600"
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Consultation CTA for this tab */}
                  <div className="mt-8 border-t border-slate-200/80 pt-6">
                    <a
                      href="mailto:info@ilumaa.com"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md transition hover:brightness-105"
                    >
                      <span>Consult on {activeTrack.tabLabel}</span>
                      <ArrowRight size={14} />
                    </a>
                  </div>
                </div>

                {/* Right Area of Folder Card: Capability Grid */}
                <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
                  <div>
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                      <div>
                        <h4 className="font-heading text-base font-bold text-slate-900">
                          {activeTrack.label || "Specialized Capability Track:"}
                        </h4>
                        <p className="text-xs text-slate-500">
                          Modular solutions ready for enterprise integration
                        </p>
                      </div>
                      <span className="rounded-full bg-slate-100 px-3 py-1 font-mono text-xs font-semibold text-slate-700">
                        {activeTrack.items.length} Modules
                      </span>
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {activeTrack.items.map((item, itemIdx) => (
                        <motion.div
                          key={item}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25, delay: itemIdx * 0.03 }}
                          whileHover={{ scale: 1.02, x: 2 }}
                          className="group relative flex items-start gap-3 rounded-2xl border border-slate-200/90 bg-slate-50/50 p-4 transition-all duration-200 hover:border-blue-300 hover:bg-white hover:shadow-md"
                        >
                          <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-white text-cyan-600 shadow-sm ring-1 ring-slate-200 group-hover:bg-blue-600 group-hover:text-white group-hover:ring-blue-600 transition-colors">
                            <CheckCircle2 size={14} />
                          </div>
                          <div>
                            <span className="text-xs font-bold leading-5 text-slate-800 transition-colors group-hover:text-blue-900 sm:text-[13px]">
                              {item}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Folder Tab Navigation Buttons (Prev / Next) */}
                  <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-6">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handlePrevTab}
                        className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-blue-300 hover:bg-slate-50"
                      >
                        <ArrowLeft size={14} />
                        <span>Previous Track</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleNextTab}
                        className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-blue-300 hover:bg-slate-50"
                      >
                        <span>Next Track</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {techTracks.map((track, i) => (
                        <button
                          key={track.id}
                          type="button"
                          onClick={() => setActiveTabId(track.id)}
                          aria-label={`Jump to tab ${i + 1}`}
                          className={`h-2 rounded-full transition-all ${i === activeIndex
                              ? "w-6 bg-blue-600"
                              : "w-2 bg-slate-200 hover:bg-slate-300"
                            }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        /* ALL TRACKS EXPANDED GRID VIEW */
        <div className="space-y-8">
          {techTracks.map((track, index) => {
            const Icon = track.icon;

            return (
              <motion.article
                key={track.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="overflow-hidden rounded-[2rem] border border-slate-200/90 bg-white shadow-md transition-all hover:shadow-xl"
              >
                <div className={`h-1.5 w-full bg-gradient-to-r ${track.badgeColor}`} />

                <div className="grid gap-0 lg:grid-cols-[0.34fr_0.66fr]">
                  <div className="border-b border-slate-200 bg-[linear-gradient(180deg,rgba(248,250,252,0.95),rgba(239,246,255,0.95))] p-6 sm:p-8 lg:border-b-0 lg:border-r">
                    <div className="flex items-center justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm">
                        <Icon size={22} />
                      </span>
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="mt-5 font-heading text-[1.35rem] font-bold leading-8 text-slate-950">
                      {track.title}
                    </h3>
                    <p className="mt-2 text-sm font-semibold text-blue-700">
                      {track.subtitle}
                    </p>
                    {track.summary && (
                      <p className="mt-3 text-xs leading-6 text-slate-600">
                        {track.summary}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-3 p-6 sm:grid-cols-2 xl:grid-cols-3 sm:p-8">
                    {track.items.map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50/60 p-3.5"
                      >
                        <CheckCircle2
                          size={16}
                          className="mt-0.5 shrink-0 text-cyan-500"
                        />
                        <span className="text-xs font-medium leading-5 text-slate-700">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      )}
    </div>
  );
}
