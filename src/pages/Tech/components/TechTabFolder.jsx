import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  FolderKanban,
  LayoutGrid,
  Sparkles,
  Layers,
  ExternalLink,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { techTracks } from "../techData";

function normalizeTitle(title) {
  if (title === "PRODUCTS & PLATFORM DEVELOPMENT") {
    return "Products & Platform Development";
  }
  return title;
}

export default function TechTabFolder({
  initialTrackId = null,
  showViewToggle = true,
  showHeader = true,
}) {
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
      {/* 1. Header & View Mode Switcher */}
      <div className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        {showHeader && (
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-50/80 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-blue-600 shadow-xs mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
              <span>Technology &amp; Digital Solutions</span>
            </div>
            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.6rem] leading-[1.15]">
              Building the{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                Digital Foundation
              </span>
              <br className="hidden sm:inline" /> for Modern Businesses
            </h2>
            <p className="mt-3.5 text-sm sm:text-base leading-relaxed text-slate-600">
              We deliver enterprise-grade technology solutions that enable organizations
              to innovate faster, operate smarter, and scale with confidence.
            </p>
          </div>
        )}

        {showViewToggle && (
          <div className="flex shrink-0 items-center justify-start md:justify-end">
            <div className="inline-flex items-center rounded-2xl border border-slate-200/80 bg-slate-100/90 p-1.5 shadow-inner">
              <button
                type="button"
                onClick={() => setViewMode("tab")}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all duration-200 ${
                  viewMode === "tab"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <FolderKanban size={15} />
                <span>Tab Explorer</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all duration-200 ${
                  viewMode === "grid"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <LayoutGrid size={15} />
                <span>Full Ecosystem</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {viewMode === "tab" ? (
        <div className="flex flex-col gap-6">
          {/* 2. Elevated Modern Tab Track Navigation */}
          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-1.5 shadow-xs">
            <div className="no-scrollbar flex gap-2 overflow-x-auto p-1">
              {techTracks.map((track, idx) => {
                const isActive = track.id === activeTabId;
                const Icon = track.icon;

                return (
                  <button
                    key={track.id}
                    type="button"
                    onClick={() => setActiveTabId(track.id)}
                    className={`group relative flex shrink-0 items-center gap-2.5 rounded-xl border px-3.5 py-2.5 sm:px-4 sm:py-3 text-left transition-all duration-200 ${
                      isActive
                        ? "border-blue-500/40 bg-white shadow-md shadow-blue-500/10 ring-1 ring-blue-500/25"
                        : "border-transparent bg-transparent hover:border-slate-200 hover:bg-white/80 text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeFolderTabPill"
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-50/60 via-cyan-50/30 to-white"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}

                    <div className="relative z-10 flex items-center gap-2.5">
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs transition-all duration-200 ${
                          isActive
                            ? "bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-sm shadow-blue-500/30"
                            : "bg-slate-200/70 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600"
                        }`}
                      >
                        <Icon size={16} />
                      </span>

                      <span
                        className={`text-xs sm:text-[13px] font-bold leading-tight ${
                          isActive ? "text-slate-900" : "text-slate-700"
                        }`}
                      >
                        {track.tabLabel}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Showcase Interactive Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTrack.id}
              initial={{ opacity: 0, y: 16, scale: 0.995 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.995 }}
              transition={{ duration: 0.32, ease: "easeOut" }}
              className="relative overflow-hidden rounded-[2rem] border border-slate-200/90 bg-white shadow-[0_24px_64px_-12px_rgba(15,23,42,0.08),_0_0_1px_rgba(15,23,42,0.1)]"
            >
              {/* Top Accent Gradient Bar */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${activeTrack.badgeColor}`} />

              <div className="grid gap-0 lg:grid-cols-[0.38fr_0.62fr]">
                {/* Left Panel: Executive Overview & Deliverables */}
                <div className="flex flex-col justify-between border-b border-slate-100 bg-gradient-to-b from-slate-50/90 via-slate-50/40 to-white p-7 sm:p-9 lg:border-b-0 lg:border-r lg:p-10">
                  <div>
                    {/* Track Pill & Category */}
                    <div className="flex items-center gap-3">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white p-2.5 text-blue-600 shadow-sm ring-1 ring-slate-200/70">
                        {(() => {
                          const Icon = activeTrack.icon;
                          return <Icon size={24} />;
                        })()}
                      </span>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="rounded-md bg-blue-100/70 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-blue-700">
                            Track 0{activeIndex + 1}
                          </span>
                          <span className="text-[11px] font-semibold text-slate-500">
                            {activeTrack.shortTag.replace(/^\d+\s*\/\s*/, "")}
                          </span>
                        </div>
                        <span className="block text-[11px] font-medium text-slate-400 mt-0.5">
                          Enterprise Solution Suite
                        </span>
                      </div>
                    </div>

                    {/* Normalized Title */}
                    <h3 className="mt-5 font-heading text-2xl font-bold tracking-tight text-slate-900 sm:text-[1.65rem] leading-tight">
                      {normalizeTitle(activeTrack.title)}
                    </h3>

                    {/* Value Proposition Callout */}
                    <div className="mt-3.5 border-l-2 border-blue-500 pl-3.5 py-0.5">
                      <p className="text-sm font-semibold leading-snug text-blue-700">
                        {activeTrack.subtitle}
                      </p>
                    </div>

                    {/* Summary Narrative */}
                    {activeTrack.summary && (
                      <p className="mt-4 text-xs sm:text-[13px] leading-relaxed text-slate-600">
                        {activeTrack.summary}
                      </p>
                    )}

                    {activeTrack.detail && (
                      <p className="mt-2.5 text-xs leading-relaxed text-slate-500">
                        {activeTrack.detail}
                      </p>
                    )}

                    {/* Key Architectural Deliverables */}
                    {activeTrack.deliverables && (
                      <div className="mt-6 rounded-2xl border border-slate-200/80 bg-white/95 p-4 shadow-xs">
                        <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-900">
                          <Zap size={13} className="text-blue-600 fill-blue-600" />
                          Key Architectural Deliverables
                        </span>
                        <ul className="mt-3 space-y-2">
                          {activeTrack.deliverables.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2.5 text-xs font-medium text-slate-700 leading-snug"
                            >
                              <CheckCircle2
                                size={14}
                                className="mt-0.5 shrink-0 text-cyan-600 stroke-[2.2]"
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Consultation CTA */}
                  <div className="mt-8 border-t border-slate-100 pt-5">
                    <a
                      href="mailto:info@ilumaa.com"
                      className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-blue-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/35 hover:-translate-y-0.5"
                    >
                      <span>Consult on {activeTrack.tabLabel}</span>
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </a>
                  </div>
                </div>

                {/* Right Panel: Capabilities & Specialized Modules Grid */}
                <div className="flex flex-col justify-between p-7 sm:p-9 lg:p-10">
                  <div>
                    {/* Header */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                      <div>
                        <h4 className="font-heading text-base font-bold text-slate-900">
                          {activeTrack.label || "Specialized Capabilities & Modules"}
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Production-grade architectures ready for enterprise integration
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                        {activeTrack.items.length} Modules Available
                      </span>
                    </div>

                    {/* Symmetrical High-Performance Tile Grid */}
                    <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                      {activeTrack.items.map((item, itemIdx) => (
                        <motion.div
                          key={item}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.22, delay: itemIdx * 0.025 }}
                          whileHover={{ scale: 1.015, y: -2 }}
                          className="group relative flex items-center gap-3 rounded-xl border border-slate-200/70 bg-gradient-to-br from-white to-slate-50/50 p-3.5 transition-all duration-200 hover:border-blue-400/60 hover:bg-white hover:shadow-[0_8px_20px_-4px_rgba(37,99,235,0.12)] cursor-default"
                        >
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-200 shadow-xs">
                            <CheckCircle2 size={14} className="stroke-[2.2]" />
                          </div>
                          <span className="text-xs sm:text-[13px] font-semibold text-slate-800 group-hover:text-blue-950 transition-colors leading-snug">
                            {item}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Folder Tab Bottom Navigation */}
                  <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-5">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handlePrevTab}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-xs transition-all hover:border-blue-300 hover:bg-slate-50 hover:text-blue-700"
                      >
                        <ArrowLeft size={13} />
                        <span>Previous Track</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleNextTab}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-xs transition-all hover:border-blue-300 hover:bg-slate-50 hover:text-blue-700"
                      >
                        <span>Next Track</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-semibold text-slate-400">
                        {String(activeIndex + 1).padStart(2, "0")} / 0{techTracks.length}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {techTracks.map((track, i) => (
                          <button
                            key={track.id}
                            type="button"
                            onClick={() => setActiveTabId(track.id)}
                            aria-label={`Jump to tab ${i + 1}`}
                            className={`h-2 rounded-full transition-all duration-300 ${
                              i === activeIndex
                                ? "w-6 bg-gradient-to-r from-blue-600 to-cyan-500 shadow-xs"
                                : "w-2 bg-slate-200 hover:bg-slate-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        /* 4. Full Ecosystem Grid View */
        <div className="grid gap-6 sm:gap-8">
          {techTracks.map((track, index) => {
            const Icon = track.icon;

            return (
              <motion.article
                key={track.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="overflow-hidden rounded-[2rem] border border-slate-200/90 bg-white shadow-md transition-all duration-300 hover:shadow-xl"
              >
                <div className={`h-1.5 w-full bg-gradient-to-r ${track.badgeColor}`} />

                <div className="grid gap-0 lg:grid-cols-[0.34fr_0.66fr]">
                  <div className="flex flex-col justify-between border-b border-slate-100 bg-gradient-to-b from-slate-50/90 to-white p-6 sm:p-8 lg:border-b-0 lg:border-r">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm ring-1 ring-slate-200/80">
                          <Icon size={22} />
                        </span>
                        <span className="rounded-md bg-blue-100/70 px-2.5 py-0.5 font-mono text-[11px] font-bold text-blue-700">
                          Track 0{index + 1}
                        </span>
                      </div>

                      <h3 className="mt-4 font-heading text-xl font-bold leading-snug text-slate-900">
                        {normalizeTitle(track.title)}
                      </h3>
                      <p className="mt-2 text-xs font-semibold text-blue-700 leading-relaxed">
                        {track.subtitle}
                      </p>
                      {track.summary && (
                        <p className="mt-3 text-xs leading-relaxed text-slate-600">
                          {track.summary}
                        </p>
                      )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100">
                      <a
                        href="mailto:info@ilumaa.com"
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <span>Consult on {track.tabLabel}</span>
                        <ArrowRight size={13} />
                      </a>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                          Available Modules &amp; Solutions
                        </span>
                        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600">
                          {track.items.length} Modules
                        </span>
                      </div>

                      <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
                        {track.items.map((item) => (
                          <div
                            key={item}
                            className="flex items-center gap-2.5 rounded-xl border border-slate-200/80 bg-slate-50/50 p-3 hover:bg-white hover:border-blue-300 transition-colors"
                          >
                            <CheckCircle2
                              size={14}
                              className="shrink-0 text-cyan-600 stroke-[2]"
                            />
                            <span className="text-xs font-semibold text-slate-800">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
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
