import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Minus,
  Maximize2,
  Minimize2,
  Send,
  Paperclip,
  Link2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  FileText,
  Mail,
  User,
  Phone,
  BookOpen,
  Sparkles,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";

/**
 * TARGET EMAIL CONFIGURATION
 */
export const ACCELERATOR_TARGET_EMAIL = "ta@ilumaa.com";

const PROGRAMMES_LIST = [
  "01. Full Stack Developer Professional Accelerator",
  "02. Digital Marketing Professional Accelerator",
  "03. Talent Acquisition Professional Accelerator",
  "04. Talent Management Professional Accelerator",
  "05. Business Development Professional Accelerator",
  "General / Register Interest for Upcoming Programmes",
];

export default function GmailApplyModal({
  isOpen,
  onClose,
  initialProgramme = "",
  initialSubject = "",
}) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [portfolioLink, setPortfolioLink] = useState("");
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef(null);

  // Form Fields
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    programme: PROGRAMMES_LIST[0],
    subject: "",
    background: "",
  });

  const [errors, setErrors] = useState({});

  // Sync initial programme and subject when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsMinimized(false);
      setStatus("idle");
      const matchedProg =
        PROGRAMMES_LIST.find((p) =>
          initialProgramme
            ? p.toLowerCase().includes(initialProgramme.toLowerCase())
            : false
        ) ||
        (initialProgramme ? initialProgramme : PROGRAMMES_LIST[0]);

      const sub =
        initialSubject ||
        `Application: ${matchedProg.replace(/^\d+\.\s*/, "")} - ${formData.fullName || "Candidate"}`;

      setFormData((prev) => ({
        ...prev,
        programme: matchedProg,
        subject: sub,
      }));
    }
  }, [isOpen, initialProgramme, initialSubject]);

  // Auto update subject when programme or name changes (if subject is template)
  const handleNameChange = (e) => {
    const name = e.target.value;
    setFormData((prev) => {
      const progClean = prev.programme.replace(/^\d+\.\s*/, "");
      return {
        ...prev,
        fullName: name,
        subject: `Application: ${progClean} - ${name || "Candidate"}`,
      };
    });
  };

  const handleProgrammeChange = (e) => {
    const prog = e.target.value;
    setFormData((prev) => {
      const progClean = prog.replace(/^\d+\.\s*/, "");
      return {
        ...prev,
        programme: prog,
        subject: `Application: ${progClean} - ${prev.fullName || "Candidate"}`,
      };
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map((f) => ({
        name: f.name,
        size: (f.size / (1024 * 1024)).toFixed(2) + " MB",
      }));
      setAttachedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = "Full name is required";
    if (!formData.email.trim()) {
      errs.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) {
      errs.phone = "Phone / WhatsApp number is required";
    }
    if (!formData.background.trim()) {
      errs.background =
        "Please briefly summarize your foundational knowledge or completed courses";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Convert filled candidate details into a structured email body template
  const formatApplicationTemplate = () => {
    const attachmentNote =
      attachedFiles.length > 0
        ? `\n• Attached Files: ${attachedFiles.map((f) => f.name).join(", ")}`
        : "";

    return (
      `Dear ILUMAA Admissions Team,

I am submitting my application for the ILUMAA Professional Accelerator Programme.

=======================================================
PROGRAMME APPLIED FOR:
${formData.programme}
=======================================================

APPLICANT DETAILS:
• Full Name: ${formData.fullName}
• Email Address: ${formData.email}
• Phone / WhatsApp: ${formData.phone}
• Portfolio / Resume / LinkedIn Link: ${portfolioLink || "N/A"}${attachmentNote}

FOUNDATIONAL KNOWLEDGE & BACKGROUND:
${formData.background}

-------------------------------------------------------
Sent via ILUMAA Accelerator Portal (ilumaa.com/learning)
Destination: ${ACCELERATOR_TARGET_EMAIL}
=======================================================`
    );
  };

  // Direct Gmail web compose link with all fields prefilled
  const getGmailWebUrl = () => {
    const to = encodeURIComponent(ACCELERATOR_TARGET_EMAIL);
    const su = encodeURIComponent(formData.subject);
    const body = encodeURIComponent(formatApplicationTemplate());
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${su}&body=${body}`;
  };

  // Direct mailto launcher as a convenient fallback
  const getMailtoHref = () => {
    const su = encodeURIComponent(formData.subject);
    const body = encodeURIComponent(formatApplicationTemplate());
    return `mailto:${ACCELERATOR_TARGET_EMAIL}?subject=${su}&body=${body}`;
  };

  const handleCopyTemplate = () => {
    try {
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText(formatApplicationTemplate());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.warn("Clipboard copy skipped", err);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("sending");

    const gmailUrl = getGmailWebUrl();

    // Auto copy formatted template to clipboard for convenience
    try {
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText(formatApplicationTemplate());
      }
    } catch (err) {
      console.warn("Clipboard copy skipped", err);
    }

    // Immediately open Gmail compose in a new tab with pre-filled details
    const gmailWin = window.open(gmailUrl, "_blank");

    // If popup was blocked by browser or on mobile, redirect current window
    if (!gmailWin || gmailWin.closed || typeof gmailWin.closed === "undefined") {
      window.location.href = gmailUrl;
    }

    setTimeout(() => {
      setStatus("sent");
    }, 600);
  };

  const handleDiscard = () => {
    if (
      formData.fullName ||
      formData.background ||
      formData.email ||
      attachedFiles.length > 0
    ) {
      if (window.confirm("Discard this application draft?")) {
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          programme: PROGRAMMES_LIST[0],
          subject: "",
          background: "",
        });
        setAttachedFiles([]);
        setPortfolioLink("");
        setErrors({});
        onClose();
      }
    } else {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none flex flex-col justify-end items-end p-2 sm:p-4 md:p-6">
      {/* Background backdrop on full mobile or maximized view */}
      {(isMaximized || (!isMinimized && window.innerWidth < 640)) && (
        <div
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm pointer-events-auto transition-opacity"
          onClick={() => !isMinimized && onClose()}
        />
      )}

      {/* Minimized Bar at Bottom Right (like Gmail minimized composer) */}
      {isMinimized ? (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          className="pointer-events-auto w-full max-w-[320px] sm:max-w-[360px] bg-slate-900 text-white rounded-t-xl shadow-2xl border border-slate-700 overflow-hidden cursor-pointer"
          onClick={() => setIsMinimized(false)}
        >
          <div className="flex items-center justify-between px-4 py-2.5 bg-gradient-to-r from-slate-900 to-slate-800">
            <div className="flex items-center gap-2 truncate">
              <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-xs font-semibold truncate">
                {formData.subject || "Application Draft"}
              </span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0 text-slate-300">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMinimized(false);
                }}
                className="p-1 hover:text-white rounded hover:bg-slate-700/60"
                title="Restore"
              >
                <Maximize2 size={13} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="p-1 hover:text-white rounded hover:bg-slate-700/60"
                title="Close"
              >
                <X size={13} />
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        /* Full Gmail-Style Composer Window */
        <motion.div
          initial={{ y: 40, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 40, opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className={`pointer-events-auto flex flex-col bg-white rounded-xl shadow-[0_20px_60px_rgba(15,23,42,0.35)] border border-slate-200/90 overflow-hidden w-full transition-all duration-200 ${isMaximized
            ? "fixed inset-2 sm:inset-6 md:inset-10 max-w-4xl mx-auto h-[calc(100vh-2rem)] sm:h-[calc(100vh-3rem)] md:h-[calc(100vh-5rem)] z-[10000]"
            : "max-w-[620px] h-[580px] sm:h-[620px] max-h-[90vh]"
            }`}
        >
          {/* 1. Gmail Window Header */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 text-white select-none shrink-0 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded bg-blue-600 text-[10px] font-bold">
                IL
              </span>
              <span className="text-xs font-semibold tracking-wide text-slate-100">
                New Application — ILUMAA Accelerator
              </span>
            </div>

            {/* Window Controls */}
            <div className="flex items-center gap-1 text-slate-300">
              <button
                type="button"
                onClick={() => setIsMinimized(true)}
                className="p-1 hover:text-white rounded hover:bg-slate-800 transition"
                title="Minimize"
              >
                <Minus size={14} />
              </button>
              <button
                type="button"
                onClick={() => setIsMaximized(!isMaximized)}
                className="p-1 hover:text-white rounded hover:bg-slate-800 transition hidden sm:inline-block"
                title={isMaximized ? "Exit Fullscreen" : "Maximize"}
              >
                {isMaximized ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
              </button>
              <button
                type="button"
                onClick={handleDiscard}
                className="p-1 hover:text-white rounded hover:bg-red-600/80 transition"
                title="Close"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* 2. Modal Body */}
          {status === "sent" ? (
            /* Gmail Redirected Confirmation Screen */
            <div className="flex-1 flex flex-col items-center justify-center p-5 sm:p-8 text-center bg-slate-50/50 overflow-y-auto">
              <div className="h-14 w-14 rounded-2xl bg-red-50 border border-red-200 text-red-600 flex items-center justify-center mb-3 shadow-sm">
                <Mail size={30} />
              </div>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-slate-900">
                Opening in Gmail!
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-600 max-w-md leading-relaxed">
                Your application details have been formatted and loaded into Gmail. Please review and click <span className="font-bold text-slate-900">Send</span> in your Gmail compose window to send to:
                <br />
                <span className="font-bold text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded text-xs inline-block mt-1 border border-slate-200">
                  {ACCELERATOR_TARGET_EMAIL}
                </span>
              </p>

              {/* Status Checklist Box */}
              <div className="mt-3.5 p-3.5 rounded-xl bg-white border border-slate-200 text-left text-xs text-slate-700 w-full max-w-md shadow-sm space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                  <CheckCircle2 size={15} />
                  <span>Applicant & Track details filled</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                  <CheckCircle2 size={15} />
                  <span>Destination: {ACCELERATOR_TARGET_EMAIL}</span>
                </div>
                <div className="flex items-center gap-2 text-blue-600 font-semibold">
                  <Sparkles size={15} />
                  <span>Review & click "Send" in Gmail</span>
                </div>
              </div>

              {/* Template Preview with Copy Option */}
              <div className="mt-3 w-full max-w-md text-left">
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold mb-1 px-1">
                  <span>PREFILLED TEMPLATE PREVIEW</span>
                  <button
                    type="button"
                    onClick={handleCopyTemplate}
                    className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 transition"
                  >
                    {copied ? (
                      <>
                        <Check size={12} className="text-emerald-600" />
                        <span className="text-emerald-600 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        <span>Copy Text</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-2.5 rounded-lg bg-slate-900 text-slate-200 text-[11px] font-mono leading-relaxed max-h-24 overflow-y-auto whitespace-pre-wrap select-all border border-slate-800">
                  {formatApplicationTemplate()}
                </pre>
              </div>

              {/* Direct Re-open CTAs */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
                <a
                  href={getGmailWebUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#ea4335] hover:bg-[#d93025] px-4 py-2 text-xs font-semibold text-white shadow-sm transition active:scale-95"
                >
                  <Mail size={14} />
                  <span>Open in Gmail (Web)</span>
                  <ExternalLink size={12} />
                </a>

                <a
                  href={getMailtoHref()}
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  <span>Open in Mail App</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setStatus("idle");
                    onClose();
                  }}
                  className="rounded-full bg-slate-900 px-5 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Gmail Composer Form */
            <form onSubmit={handleSend} className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 text-xs sm:text-sm">
                {/* TO Field */}
                <div className="flex items-center gap-2 border-b border-slate-100 py-1.5">
                  <span className="w-16 shrink-0 text-slate-400 font-medium text-xs">To:</span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 border border-slate-300 px-2.5 py-0.5 text-xs font-medium text-slate-800">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      {ACCELERATOR_TARGET_EMAIL}
                    </span>
                    <span className="text-[10px] text-slate-400 italic">
                      (Applications destination)
                    </span>
                  </div>
                </div>

                {/* FROM / CANDIDATE NAME & EMAIL */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 border-b border-slate-100 py-1.5">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-16 shrink-0 text-slate-400 font-medium text-xs">Name:</span>
                      <input
                        type="text"
                        placeholder="Your Full Name *"
                        value={formData.fullName}
                        onChange={handleNameChange}
                        className={`w-full py-1 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none ${errors.fullName ? "border-b border-red-500" : ""
                          }`}
                        required
                      />
                    </div>
                    {errors.fullName && (
                      <p className="text-[10px] text-red-500 pl-16 mt-0.5">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-14 shrink-0 text-slate-400 font-medium text-xs">Email:</span>
                      <input
                        type="email"
                        placeholder="your.email@example.com *"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className={`w-full py-1 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none ${errors.email ? "border-b border-red-500" : ""
                          }`}
                        required
                      />
                    </div>
                    {errors.email && (
                      <p className="text-[10px] text-red-500 pl-14 mt-0.5">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* PHONE & PROGRAMME SELECTION */}
                <div className="grid grid-cols-1 sm:grid-cols-[0.8fr_1.2fr] gap-2 border-b border-slate-100 py-1.5">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-16 shrink-0 text-slate-400 font-medium text-xs">Phone:</span>
                      <input
                        type="tel"
                        placeholder="+91 / WhatsApp number *"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className={`w-full py-1 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none ${errors.phone ? "border-b border-red-500" : ""
                          }`}
                        required
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-[10px] text-red-500 pl-16 mt-0.5">{errors.phone}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="w-16 shrink-0 text-slate-400 font-medium text-xs">Track:</span>
                    <select
                      value={formData.programme}
                      onChange={handleProgrammeChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs text-slate-800 font-medium focus:outline-none focus:border-blue-500"
                    >
                      {PROGRAMMES_LIST.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* SUBJECT FIELD */}
                <div className="flex items-center gap-2 border-b border-slate-200 py-1.5">
                  <span className="w-16 shrink-0 text-slate-400 font-medium text-xs">Subject:</span>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full py-1 text-xs sm:text-sm text-slate-900 font-medium focus:outline-none"
                    placeholder="Application Subject Line"
                    required
                  />
                </div>

                {/* MESSAGE BODY / FOUNDATIONAL KNOWLEDGE */}
                <div className="pt-2">
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
                    Foundational Knowledge & Experience *
                  </label>
                  <textarea
                    rows={isMaximized ? 6 : 3}
                    placeholder="Already completed a course or built basics? Please describe your foundation (e.g. course taken, languages, tools, degree, or experience)..."
                    value={formData.background}
                    onChange={(e) =>
                      setFormData({ ...formData, background: e.target.value })
                    }
                    className={`w-full resize-none rounded-lg border p-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 ${errors.background ? "border-red-400 bg-red-50/20" : "border-slate-200"
                      }`}
                    required
                  />
                  {errors.background && (
                    <p className="text-[10px] text-red-500 mt-0.5">{errors.background}</p>
                  )}
                </div>

                {/* PORTFOLIO / RESUME LINK (TOGGLEABLE) */}
                {showLinkInput && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="flex items-center gap-2 rounded-lg bg-blue-50/60 border border-blue-200/70 p-2"
                  >
                    <Link2 size={14} className="text-blue-600 shrink-0" />
                    <input
                      type="url"
                      placeholder="Paste your LinkedIn, GitHub, or Google Drive resume link..."
                      value={portfolioLink}
                      onChange={(e) => setPortfolioLink(e.target.value)}
                      className="w-full bg-transparent text-xs text-slate-800 placeholder-slate-500 focus:outline-none"
                    />
                    {portfolioLink && (
                      <button
                        type="button"
                        onClick={() => setPortfolioLink("")}
                        className="text-slate-400 hover:text-slate-700"
                      >
                        <X size={12} />
                      </button>
                    )}
                  </motion.div>
                )}

                {/* ATTACHED FILES CHIPS */}
                {attachedFiles.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {attachedFiles.map((file, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-700 shadow-sm"
                      >
                        <FileText size={12} className="text-blue-500" />
                        <span className="font-medium max-w-[140px] truncate">{file.name}</span>
                        <span className="text-[10px] text-slate-400">({file.size})</span>
                        <button
                          type="button"
                          onClick={() => removeFile(idx)}
                          className="text-slate-400 hover:text-red-500 ml-1"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* 3. Gmail Action Toolbar Footer */}
              <div className="flex items-center justify-between px-4 py-2.5 border-t border-slate-200 bg-slate-50/70 shrink-0">
                <div className="flex items-center gap-2">
                  {/* Blue Send Button */}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex items-center gap-2 rounded-full bg-[#1a73e8] hover:bg-[#1557b0] active:scale-95 px-5 py-2 text-xs font-semibold text-white shadow-sm transition disabled:opacity-50"
                  >
                    {status === "sending" ? (
                      <>
                        <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Application</span>
                        <Send size={13} />
                      </>
                    )}
                  </button>

                  {/* Attachment Icon */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-full transition"
                    title="Attach Resume / Document"
                  >
                    <Paperclip size={16} />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    multiple
                  />

                  {/* Link Icon */}
                  <button
                    type="button"
                    onClick={() => setShowLinkInput(!showLinkInput)}
                    className={`p-2 rounded-full transition ${showLinkInput || portfolioLink
                      ? "text-blue-600 bg-blue-100/60"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                      }`}
                    title="Add Portfolio / LinkedIn link"
                  >
                    <Link2 size={16} />
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-slate-400 hidden sm:inline-block">
                    Draft saved
                  </span>
                  <button
                    type="button"
                    onClick={handleDiscard}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition"
                    title="Discard Draft"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </form>
          )}
        </motion.div>
      )}
    </div>
  );
}
