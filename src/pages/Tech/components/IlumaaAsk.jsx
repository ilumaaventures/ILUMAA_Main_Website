import React, { useState, useEffect, useRef } from "react";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  CornerDownLeft,
  Info,
} from "lucide-react";
import mascotImg from "../../../assets/ilumaa-mascot.png";

const PRESETS = [
  {
    id: "ai",
    question: "Tell me about your AI capabilities",
    reply:
      "At ILumaa, we engineer custom AI solutions from the ground up. This includes:\n\n• **Agentic Pipelines & LLMs**: Intelligent workflows that reason, plan, and execute multi-step operations.\n• **Retrieval-Augmented Generation (RAG)**: Connect your custom datasets securely to language models.\n• **Custom Fine-Tuning**: Adapt state-of-the-art open-weights models to your specific brand, tone, or technical domain.\n• **Automation Systems**: Eliminate manual processing tasks using NLP, text classification, and structured data extraction.",
  },
  {
    id: "tech",
    question: "What technologies do you specialize in?",
    reply:
      "We specialize in modern, high-performance technology stacks:\n\n• **Frontend**: React, Next.js, Vite, Tailwind CSS, Framer Motion, and Three.js for cinematic, fluid interfaces.\n• **Backend & APIs**: Node.js, Express, Python (FastAPI/Django), and Golang.\n• **Databases**: MongoDB, PostgreSQL, Redis, and vector databases (Pinecone/Chroma).\n• **Cloud & DevOps**: AWS (Lambda, ECS, RDS, S3), CI/CD automation, and robust monitoring.",
  },
  {
    id: "erp",
    question: "Can you build a custom ERP/Billing app?",
    reply:
      "Absolutely. We have extensive experience building scalable business systems. For example:\n\n• [TalentCIO](https://talentcio.in): A comprehensive human resources and talent intelligence ecosystem.\n• [Flance](https://flance.in): A secure payroll, GST invoicing, and financial management suite.\n\nWe can build custom inventory, payroll, invoicing, and reporting tools tailor-made for your workflow.",
  },
  {
    id: "start",
    question: "How do we get started?",
    reply:
      "Getting started with ILumaa is simple:\n\n1. **Discovery Call**: We chat about your project, goals, and technical bottlenecks.\n2. **Detailed Proposal**: We supply a clean scoping document, architectural draft, and project quote.\n3. **Development Phase**: We build in two-week agile sprints, giving you live staging access to watch progress.\n4. **Launch & Support**: We deploy your solution and offer ongoing maintenance contracts.",
  },
];

function IlumaaAsk() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      text: "Hi! I'm ILumaa Ask, your technical agent assistant. How can I help you build your next-gen solution today?",
      sender: "ai",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  const chatBodyRef = useRef(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const handleSend = (textToSend) => {
    const text = textToSend || inputValue.trim();
    if (!text) return;

    // Add user message
    const userMsg = {
      id: `user-${Date.now()}`,
      text: text,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue("");
    setIsTyping(true);

    // Simulate chatbot response
    setTimeout(() => {
      let replyText = "";
      const lower = text.toLowerCase();

      // Simple contextual responses
      if (
        lower.includes("ai") ||
        lower.includes("agent") ||
        lower.includes("llm") ||
        lower.includes("gpt")
      ) {
        replyText = PRESETS.find((p) => p.id === "ai").reply;
      } else if (
        lower.includes("tech") ||
        lower.includes("stack") ||
        lower.includes("react") ||
        lower.includes("node") ||
        lower.includes("database")
      ) {
        replyText = PRESETS.find((p) => p.id === "tech").reply;
      } else if (
        lower.includes("erp") ||
        lower.includes("billing") ||
        lower.includes("invoice") ||
        lower.includes("payroll") ||
        lower.includes("finance") ||
        lower.includes("flance") ||
        lower.includes("talentcio")
      ) {
        replyText = PRESETS.find((p) => p.id === "erp").reply;
      } else if (
        lower.includes("start") ||
        lower.includes("hire") ||
        lower.includes("contact") ||
        lower.includes("price") ||
        lower.includes("cost") ||
        lower.includes("call")
      ) {
        replyText = PRESETS.find((p) => p.id === "start").reply;
      } else {
        replyText =
          "Thanks for asking! I specialize in answering questions about ILumaa's technical capabilities, custom software development, and AI integrations.\n\nTo schedule a quick discussion with our engineering team, you can [Book a Discovery Call](https://ilumaa.com/contact) or type another question about our AI, Web, Mobile, or ERP experience!";
      }

      const aiMsg = {
        id: `ai-${Date.now()}`,
        text: replyText,
        sender: "ai",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  // Convert markdown-style links and bolding to JSX
  const formatMessageText = (text) => {
    const lines = text.split("\n");
    return lines.map((line, lIdx) => {
      // Check if it's a bullet point
      const isBullet = line.trim().startsWith("•");
      const cleanLine = isBullet ? line.replace(/^•\s*/, "") : line;

      let lineParts = [];
      let currentIdx = 0;

      // Replace bold and links in line
      const boldAndLinkRegex = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
      const subMatches = [...cleanLine.matchAll(boldAndLinkRegex)];

      if (subMatches.length === 0) {
        lineParts.push(cleanLine);
      } else {
        subMatches.forEach((m) => {
          const matchStart = m.index;
          const matchText = m[0];

          // Push preceding plain text
          if (matchStart > currentIdx) {
            lineParts.push(cleanLine.substring(currentIdx, matchStart));
          }

          if (matchText.startsWith("**")) {
            // Bold
            lineParts.push(
              <strong
                key={`b-${matchStart}`}
                className="font-semibold text-slate-150"
              >
                {matchText.slice(2, -2)}
              </strong>,
            );
          } else {
            // Link
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
                </a>,
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
            <span className="text-purple-400 mt-2 shrink-0 block w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            <span className="text-slate-300 leading-relaxed text-[13.5px]">
              {lineParts}
            </span>
          </div>
        );
      }

      return (
        <p
          key={lIdx}
          className="text-slate-300 leading-relaxed text-[13.5px] mt-1.5 first:mt-0"
        >
          {lineParts}
        </p>
      );
    });
  };

  return (
    <div className="iluma-ask-widget pointer-events-none">
      {/* Floating Mascot Button */}
      {!isOpen && (
        <div className="flex flex-col items-center select-none">
          {/* Mascot Character Image */}
          <div
            onClick={() => setIsOpen(true)}
            className="iluma-ask-mascot"
          >
            <img
              src={mascotImg}
              alt="ILumaa Mascot"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Ask Ilumaa Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="iluma-ask-btn"
          >
            <span className="text-cyan-400 font-bold text-lg leading-none animate-pulse">
              ✦
            </span>
            <span className="font-semibold text-sm tracking-wide">
              Ask ILUMAA
            </span>
          </button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="iluma-ask-window">
          {/* Chat Header */}
          <div className="flex items-center justify-between border-b border-slate-800/60 bg-slate-900/40 px-4 py-3.5 rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full border border-cyan-500/30 bg-slate-950 flex items-center justify-center">
                <img
                  src={mascotImg}
                  alt="ILumaa Mascot"
                  className="h-full w-full object-cover transform translate-y-0.5"
                />
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-slate-950"></span>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-100 flex items-center gap-1.5 font-heading">
                  Ask Ilumaa
                  <Sparkles className="h-3 w-3 text-cyan-400 animate-pulse" />
                </h4>
                <p className="text-[10px] text-cyan-400 font-mono tracking-wider font-medium">
                  ONLINE EXPERT
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1.5 text-slate-400 hover:bg-slate-800/60 hover:text-slate-100 transition-colors"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div
            ref={chatBodyRef}
            className="iluma-ask-chat-body flex-1 overflow-y-auto px-4 py-4 space-y-4"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-br-none shadow-[0_4px_16px_rgba(6,182,212,0.15)]"
                      : "bg-slate-900/80 text-slate-200 border border-slate-800/80 rounded-bl-none"
                  }`}
                >
                  {msg.sender === "user" ? (
                    <p className="leading-relaxed text-[13.5px]">{msg.text}</p>
                  ) : (
                    <div>{formatMessageText(msg.text)}</div>
                  )}
                  <span
                    className={`block mt-1 text-[9px] text-right font-mono ${
                      msg.sender === "user"
                        ? "text-cyan-200/70"
                        : "text-slate-500"
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl rounded-bl-none px-4 py-3 flex items-center gap-1">
                  <span className="typing-dot h-1.5 w-1.5 rounded-full bg-cyan-400 block"></span>
                  <span className="typing-dot h-1.5 w-1.5 rounded-full bg-cyan-400 block"></span>
                  <span className="typing-dot h-1.5 w-1.5 rounded-full bg-cyan-400 block"></span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          {messages.length === 1 && !isTyping && (
            <div className="px-4 pb-3 pt-1 space-y-2">
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold flex items-center gap-1 font-mono">
                <Info className="h-3 w-3" /> SUGGESTED TOPICS:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {PRESETS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleSend(p.question)}
                    className="text-[11px] bg-slate-900 hover:bg-slate-800 text-cyan-300 hover:text-cyan-200 border border-slate-850 hover:border-cyan-500/30 px-2.5 py-1.5 rounded-full text-left transition-all duration-200"
                  >
                    {p.question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chat Footer / Input */}
          <div className="border-t border-slate-800/60 bg-slate-950 px-3.5 py-3 rounded-b-2xl flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask anything about our tech..."
              disabled={isTyping}
              className="flex-1 bg-slate-900/80 border border-slate-800/80 rounded-full px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors disabled:opacity-50"
            />
            <button
              onClick={() => handleSend()}
              disabled={isTyping || !inputValue.trim()}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default IlumaaAsk;
