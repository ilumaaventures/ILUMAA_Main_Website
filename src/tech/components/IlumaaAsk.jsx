import React, { useState, useEffect, useRef } from "react";
import { X, Send, Sparkles, Info } from "lucide-react";
import mascotImg from "../assets/ilumaa-mascot.png";

const PRESETS = [
  {
    id: "flance",
    question: "Tell me about Flance (Billing & Payroll)",
    reply:
      "• **[Flance](https://flance.in)** is our all-in-one financial operations, GST invoicing, and payroll platform.\n\nKey Capabilities:\n• **Order-to-Cash Billing**: GST-compliant invoices, quotes, proformas & purchase orders with auto CGST/SGST/IGST and TDS calculations.\n• **Razorpay Payments**: Automated payment link generation & PDF receipt rendering.\n• **Full Payroll Engine**: Salary structure configuration, payslip generation, leave/attendance integration.\n• **Realtime Finance**: Expense/income tracking, bank statement reconciliation, and P&L reports.\n\nStack: React · Node.js · MongoDB · Razorpay · Puppeteer",
  },
  {
    id: "talentcio",
    question: "Tell me about TalentCIO (HR & Recruitment)",
    reply:
      "• **[TalentCIO](https://talentcio.in)** is an integrated Talent Intelligence Ecosystem built on the philosophy 'Human Intelligence + Technology = Talent Intelligence'.\n\nKey Capabilities:\n• **AI Recruitment Pipeline**: Candidate sourcing, AI-assisted resume screening, interview scheduling & offer management.\n• **Workforce Management**: Onboarding readiness, employee operations, leave/attendance tracking, & performance growth.\n• **Enterprise Security**: Role-Based Access Control (RBAC) & candidate privacy.\n\nStack: React · Node.js · MongoDB · JWT Authentication",
  },
  {
    id: "socials",
    question: "Tell me about ILUMAA Socials",
    reply:
      "• **[ILUMAA Socials](https://ilumaasocialmarketing.vercel.app/)** is a modern social networking platform built for creators, businesses, and communities.\n\nKey Capabilities:\n• **Community Engagement**: Content feeds, media uploads, creator discovery, & post interactions.\n• **Realtime Chat**: Sub-second socket messaging powered by Socket.IO.\n• **Notifications & Media**: Cloudinary media optimization & instant notifications.\n\nStack: React · Node.js · MongoDB · Socket.IO · Cloudinary",
  },
  {
    id: "ai",
    question: "What AI & Agentic solutions do you build?",
    reply:
      "At ILumaa, we engineer custom AI & Agentic systems:\n\n• **Agentic Pipelines & LLMs**: Workflows that reason, plan, and execute multi-step operations automatically (e.g. Aether OS).\n• **Retrieval-Augmented Generation (RAG)**: Connect your private enterprise databases securely to vector search.\n• **Custom Model Fine-Tuning**: Train and fine-tune open-weights models (LLaMA, Mistral, OpenAI) to your specific domain.\n• **Intelligent Data Parsing**: Automated document extraction, sentiment analysis, & NLP classification.",
  },
  {
    id: "tech",
    question: "What is your core Technology Stack?",
    reply:
      "Our production-grade stack includes:\n\n• **Frontend**: React, Next.js, Vite, Tailwind CSS, Three.js, GSAP, Framer Motion.\n• **Backend**: Node.js, Express, Python (FastAPI/Django), Golang, GraphQL.\n• **Databases**: MongoDB, PostgreSQL, Redis, Pinecone & Chroma vector DBs.\n• **Cloud & DevOps**: AWS (ECS, Lambda, RDS, S3), Docker, Kubernetes, CI/CD pipelines.\n• **Realtime**: Socket.IO, WebSockets, Kafka.",
  },
  {
    id: "erp",
    question: "Can you build custom ERP or SaaS software?",
    reply:
      "Yes! We design and build custom SaaS, ERP, CRM, and business operations software tailored to your workflow.\n\nExamples include:\n• [Flance](https://flance.in): Finance & Billing ERP\n• [TalentCIO](https://talentcio.in): HR & Talent Intelligence System\n• **Nimbus ERP**: Operations & logistics backbone\n• **Pulse**: Sub-second realtime analytics dashboard (40M+ events/day)\n• **Vantage**: Multi-cloud cost & security control console",
  },
  {
    id: "process",
    question: "How do your 2-week sprints & process work?",
    reply:
      "Our 7-Stage Value Delivery Process:\n\n1. **Idea & Discovery**: Deep problem scoping.\n2. **Wireframes & Architecture**: System design & flow mapping.\n3. **High-Fidelity UI/UX**: Cinematic interface design.\n4. **2-Week Agile Sprints**: Continuous engineering with live staging access.\n5. **Automated Testing**: Load testing & security QA.\n6. **Zero-Downtime Rollout**: Automated CI/CD deployment.\n7. **Launch & Scale**: Live sub-second monitoring & observability.",
  },
  {
    id: "contact",
    question: "How do we request a project quote?",
    reply:
      "Getting started is simple:\n\n• **Email Technical Teams**: [ilumaaventures@gmail.com](mailto:ilumaaventures@gmail.com)\n• **Email Advisory Teams**: [info@ilumaa.com](mailto:info@ilumaa.com)\n• **Discovery Session**: We analyze your requirements, outline the architecture, and provide a clear milestone quote.",
  },
];

function IlumaaAsk() {
  const [isOpen, setIsOpen] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      sender: "bot",
      text: "Hi! I'm ILumaa Ask, your technical agent assistant. How can I help you build your digital platform?",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const chatBodyRef = useRef(null);
  const chatEndRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -y * 22, y: x * 22 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleSend = (textToSend = null) => {
    const query = textToSend || inputValue.trim();
    if (!query || isTyping) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue("");
    setIsTyping(true);

    const preset = PRESETS.find(
      (p) => p.question.toLowerCase() === query.toLowerCase()
    );

    setTimeout(() => {
      const replyText = preset
        ? preset.reply
        : `Thanks for your message! Our engineering team will analyze "${query}". For instant architectural discussions, reach out to connect@ilumaa.com.`;

      const botMsg = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 550);
  };

  // Format markdown text to JSX
  const formatMessageText = (text) => {
    let safeText = text;
    if (typeof text !== "string") {
      try {
        safeText = JSON.stringify(text);
      } catch (e) {
        safeText = String(text);
      }
    }

    const lines = safeText.split("\n");
    return lines.map((line, lIdx) => {
      const isBullet =
        line.trim().startsWith("•") || line.trim().startsWith("- ");
      const cleanLine = isBullet ? line.replace(/^(•|-)\s*/, "") : line;

      let lineParts = [];
      let currentIdx = 0;

      const boldAndLinkRegex = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
      const subMatches = [...cleanLine.matchAll(boldAndLinkRegex)];

      if (subMatches.length === 0) {
        lineParts.push(cleanLine);
      } else {
        subMatches.forEach((m) => {
          const matchStart = m.index;
          const matchText = m[0];

          if (matchStart > currentIdx) {
            lineParts.push(cleanLine.substring(currentIdx, matchStart));
          }

          if (matchText.startsWith("**")) {
            lineParts.push(
              <strong
                key={`b-${matchStart}`}
                className="font-semibold text-slate-100"
              >
                {matchText.slice(2, -2)}
              </strong>
            );
          } else {
            const linkMatch = matchText.match(/\[(.*?)\]\((.*?)\)/);
            if (linkMatch) {
              lineParts.push(
                <a
                  key={`l-${matchStart}`}
                  href={linkMatch[2]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 underline font-medium"
                >
                  {linkMatch[1]}
                </a>
              );
            }
          }
          currentIdx = matchStart + matchText.length;
        });

        if (currentIdx < cleanLine.length) {
          lineParts.push(cleanLine.substring(currentIdx));
        }
      }

      if (isBullet) {
        return (
          <div key={lIdx} className="flex gap-2 items-start mt-2 ml-1">
            <span className="text-cyan-400 mt-2 shrink-0 block w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            <span className="text-slate-300 leading-relaxed text-[13px]">
              {lineParts}
            </span>
          </div>
        );
      }

      return (
        <p
          key={lIdx}
          className="text-slate-300 leading-relaxed text-[13px] mt-1.5 first:mt-0"
        >
          {lineParts}
        </p>
      );
    });
  };

  return (
    <>
      {/* 1. In-Page Section: Mascot Character with 3D Mouse Tilt & Pill Button */}


      {/* 2. Floating Mascot + Pill Trigger in Bottom Right (When Closed) */}
      {!isOpen && (
        <div
          className="fixed bottom-6 right-6 z-50 flex flex-col items-end select-none cursor-pointer group"
          onClick={() => setIsOpen(true)}
        >
          <div
            className="relative w-24 h-32 md:w-32 md:h-40 transition-transform duration-300 drop-shadow-[0_12px_24px_rgba(0,0,0,0.7)]"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${tilt.x || tilt.y ? 1.1 : 1
                })`,
              transition: "transform 0.15s ease-out",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-blue-600/30 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity"></div>
            <img
              src={mascotImg}
              alt="Ask ILUMAA Mascot"
              className="relative z-10 w-full h-full object-contain"
            />
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(true);
            }}
            className="mt-1.5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 text-white font-semibold text-xs border border-slate-700/80 hover:border-cyan-400/80 shadow-[0_10px_30px_rgba(0,0,0,0.8)] hover:shadow-[0_10px_35px_rgba(56,189,248,0.4)] transition-all duration-300 transform group-hover:-translate-y-0.5 cursor-pointer backdrop-blur-md"
          >
            <span className="text-cyan-400 font-bold text-sm leading-none animate-pulse">
              ✦
            </span>
            <span className="tracking-wide">Ask ILUMAA</span>
          </button>
        </div>
      )}

      {/* 3. Floating Chatbot Drawer Window in Bottom Right */}
      {isOpen && (
        <div className="fixed bottom-5 right-4 sm:right-6 z-[10000] w-[90vw] sm:w-[340px] md:w-[350px] h-[460px] max-h-[75vh] bg-[#0A0D14] border border-slate-800/90 rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col transition-all duration-300">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800/80 bg-slate-900/80 px-3.5 py-2.5">
            <div className="flex items-center gap-2.5">
              <div className="relative h-8 w-8 overflow-hidden rounded-full border border-cyan-500/40 bg-slate-950 flex items-center justify-center shrink-0">
                <img
                  src={mascotImg}
                  alt="ILumaa Mascot"
                  className="h-full w-full object-cover transform translate-y-0.5"
                />
                <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 border-2 border-slate-950"></span>
              </div>
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1 font-heading">
                  Ask Ilumaa
                  <Sparkles className="h-3 w-3 text-cyan-400" />
                </h4>
                <p className="text-[9px] text-cyan-400 font-mono tracking-widest font-semibold">
                  ONLINE EXPERT
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 text-slate-400 hover:bg-slate-800/80 hover:text-white transition-colors cursor-pointer"
              aria-label="Close chat"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Messages Body */}
          <div
            ref={chatBodyRef}
            className="flex-1 overflow-y-auto px-3 py-3 space-y-3 bg-[#0A0D14]/95 text-xs no-scrollbar"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
              >
                <div
                  className={`max-w-[88%] rounded-xl px-3 py-2.5 text-[11.5px] leading-relaxed ${msg.sender === "user"
                    ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-br-none shadow-[0_4px_16px_rgba(6,182,212,0.2)]"
                    : "bg-slate-900/90 text-slate-200 border border-slate-800/90 rounded-bl-none"
                    }`}
                >
                  {msg.sender === "user" ? (
                    <p>{msg.text}</p>
                  ) : (
                    <div>{formatMessageText(msg.text)}</div>
                  )}
                  <span className="block mt-1 text-[8.5px] text-right font-mono text-slate-500">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {/* Preset Topics List */}
            {messages.length === 1 && !isTyping && (
              <div className="pt-1 space-y-1.5">
                <p className="text-[9.5px] text-slate-400 uppercase tracking-widest font-bold flex items-center gap-1 font-mono">
                  <Info className="h-2.5 w-2.5 text-cyan-400" /> FEATURED PLATFORMS & TOPICS:
                </p>
                <div className="flex flex-col gap-1.5">
                  {PRESETS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => handleSend(p.question)}
                      className="w-full text-left text-[11px] bg-slate-900/90 hover:bg-slate-800/90 text-slate-200 hover:text-white border border-slate-800 hover:border-cyan-500/40 px-3 py-2 rounded-lg transition-all duration-200 font-medium flex items-center justify-between group cursor-pointer"
                    >
                      <span>{p.question}</span>
                      <span className="text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl rounded-bl-none px-3 py-2 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce"></span>
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Footer */}
          <div className="border-t border-slate-800/80 bg-[#07090F] px-3 py-2.5 flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about Flance, TalentCIO, AI..."
              disabled={isTyping}
              className="flex-1 bg-slate-900/90 border border-slate-800 rounded-full px-3.5 py-1.5 text-[11px] text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
            />
            <button
              onClick={() => handleSend()}
              disabled={isTyping || !inputValue.trim()}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white transition-all hover:scale-105 active:scale-95 disabled:opacity-40 cursor-pointer shrink-0"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default IlumaaAsk;
