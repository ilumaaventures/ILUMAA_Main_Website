import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Zap,
} from "lucide-react";
import { techTracks } from "../techData";

function normalizeTitle(title) {
  if (title === "PRODUCTS & PLATFORM DEVELOPMENT") {
    return "Products & Platform Development";
  }
  return title;
}

export default function TechTabFolder({ initialTrackId = null, showHeader = true }) {
  const [activeTabId, setActiveTabId] = useState(
    initialTrackId || techTracks[0].id
  );

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

  const ActiveIcon = activeTrack.icon;

  return (
    <div className="w-full">
      {/* 1. Header */}
      {showHeader && (
        <div className="mb-8 max-w-3xl">
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

      {/* 2. Domain Selector Tabs */}
      <div className="mb-4 sm:mb-5 rounded-xl border border-slate-200/80 bg-slate-100/80 p-1 shadow-xs">
        <div className="no-scrollbar flex gap-1 overflow-x-auto p-0.5">
          {techTracks.map((track) => {
            const isActive = track.id === activeTabId;
            const Icon = track.icon;

            return (
              <button
                key={track.id}
                type="button"
                onClick={() => setActiveTabId(track.id)}
                className={`group relative flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 sm:px-3.5 sm:py-2 text-left transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-white text-slate-900 shadow-sm border border-slate-200/90 font-bold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/60 font-medium"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-50/70 via-cyan-50/40 to-white"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  />
                )}

                <div className="relative z-10 flex items-center gap-2">
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-md text-xs transition-colors ${
                      isActive
                        ? "bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-xs"
                        : "bg-slate-200/70 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600"
                    }`}
                  >
                    <Icon size={13} />
                  </span>
                  <span className="text-[11.5px] sm:text-xs whitespace-nowrap">
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
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_12px_36px_-10px_rgba(15,23,42,0.06)]"
        >
          {/* Top Accent Gradient Bar */}
          <div className={`h-1 w-full bg-gradient-to-r ${activeTrack.badgeColor}`} />

          <div className="p-4 sm:p-5 lg:p-6 flex flex-col gap-4 sm:gap-5">
            {/* Top Overview: Domain Intro */}
            <div className="border-b border-slate-100/90 pb-3 sm:pb-3.5">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 ring-1 ring-blue-200/60 shadow-xs">
                  <ActiveIcon size={17} />
                </span>
                <h3 className="font-heading text-lg sm:text-xl font-bold tracking-tight text-slate-900 leading-snug">
                  {normalizeTitle(activeTrack.title)}
                </h3>
              </div>

              <p className="mt-1 text-xs sm:text-[13px] font-semibold text-blue-700">
                {activeTrack.subtitle}
              </p>

              {activeTrack.summary && (
                <p className="mt-1 text-[11px] sm:text-xs leading-relaxed text-slate-500 max-w-3xl">
                  {activeTrack.summary}
                </p>
              )}
            </div>

            {/* Specialized Modules Grid */}
            <div>
              <div className="flex items-center justify-between gap-3 mb-2.5">
                <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-slate-700">
                  {activeTrack.label || "Specialized Capabilities & Modules"}
                </h4>
                <span className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-[11px] font-semibold text-blue-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                  {activeTrack.items.length} Modules Available
                </span>
              </div>

              <div className="grid gap-2 sm:gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                {activeTrack.items.map((item) => (
                  <div
                    key={item}
                    className="group flex items-center gap-2.5 rounded-lg border border-slate-200/80 bg-slate-50/40 px-3 py-2 transition-all duration-200 hover:border-blue-400/60 hover:bg-white hover:shadow-xs"
                  >
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <CheckCircle2 size={11} className="stroke-[2.2]" />
                    </div>
                    <span className="text-[11.5px] sm:text-xs font-medium text-slate-800 group-hover:text-blue-950 transition-colors leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Deliverables Strip */}
            {activeTrack.deliverables && (
              <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-2.5 sm:p-3">
                <div className="flex items-center gap-1.5 mb-2">
                  <Zap size={12} className="text-blue-600 fill-blue-600" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                    Key Architectural Deliverables
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeTrack.deliverables.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-600 shadow-xs"
                    >
                      <CheckCircle2 size={11} className="text-cyan-600" />
                      <span>{item}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Track Navigation & Pagination */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrevTab}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-700 shadow-xs transition-all hover:border-blue-300 hover:bg-slate-50 hover:text-blue-700 cursor-pointer"
                >
                  <ArrowLeft size={12} />
                  <span>Previous</span>
                </button>
                <button
                  type="button"
                  onClick={handleNextTab}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-700 shadow-xs transition-all hover:border-blue-300 hover:bg-slate-50 hover:text-blue-700 cursor-pointer"
                >
                  <span>Next</span>
                  <ArrowRight size={12} />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] font-semibold text-slate-400">
                  {String(activeIndex + 1).padStart(2, "0")} / 0{techTracks.length}
                </span>
                <div className="flex items-center gap-1.5">
                  {techTracks.map((track, i) => (
                    <button
                      key={track.id}
                      type="button"
                      onClick={() => setActiveTabId(track.id)}
                      aria-label={`Jump to tab ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        i === activeIndex
                          ? "w-5 bg-gradient-to-r from-blue-600 to-cyan-500 shadow-xs"
                          : "w-1.5 bg-slate-200 hover:bg-slate-300"
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
  );
}
