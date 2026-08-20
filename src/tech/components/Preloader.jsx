import React from "react";

const techMessages = [
  "Initializing AI",
  "Loading Cloud Services",
  "Optimizing Experience",
  "Preparing Workspace",
  "Almost Ready...",
];

const Preloader = ({ progress, isLoading }) => {
  const currentMessage =
    techMessages[
      Math.min(
        Math.floor((progress / 100) * techMessages.length),
        techMessages.length - 1,
      )
    ];

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 transition-all duration-700 ${
        isLoading ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      {/* Background Blur */}
      <div className="absolute h-96 w-96 rounded-full bg-blue-200/40 blur-3xl animate-pulse"></div>

      <div className="relative flex w-full max-w-md flex-col items-center px-8">
        {/* Logo */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-xl shadow-blue-300/40">
            <span className="text-2xl font-black text-white">I</span>
          </div>

          <div>
            <h1 className="text-3xl font-black tracking-wide text-slate-900">
              ILUMAA
            </h1>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-600">
              Technology
            </p>
          </div>
        </div>

        {/* Loader */}
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-4 border-blue-100"></div>

          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 animate-spin"></div>

          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-300/40"></div>
        </div>

        {/* Status */}
        <p className="mt-8 text-sm font-medium text-slate-500">
          {currentMessage}
        </p>

        {/* Progress */}
        <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-400 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-3 flex w-full justify-between text-xs font-medium text-slate-500">
          <span>{progress}%</span>
          <span>Loading Assets</span>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex items-center gap-2">
          <span className="h-2 w-2 animate-ping rounded-full bg-blue-500"></span>
          <span className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Building Intelligent Experiences
          </span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
