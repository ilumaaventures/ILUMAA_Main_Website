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

  const handleSend = async (textToSend) => {
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

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    if (!textToSend) setInputValue("");
    setIsTyping(true);

    const SYSTEM_PROMPT = `You are ILumaa Ask, the official AI technical assistant for ILumaa and ILumaaTech.

COMPREHENSIVE ILUMAA KNOWLEDGE BASE (TECH & HOME ECOSYSTEM):

1. **ABOUT ILUMAA & ILUMATECH**:
   - Tagline: "Strategic Consulting. Intelligent Solutions. Scalable Growth." | "Minds behind the digital grid."
   - Philosophy: "Human Intelligence Meets Intelligent Technology"
   - Integrated solutions across Strategy, Technology, Talent, Finance, AI, Legal, and Digital Marketing.

2. **SOLUTIONS & SERVICE DOMAINS**:
   - **Talent & Workforce Solutions**: Executive hiring, HR consulting, payroll & HRMS solutions, workforce planning, performance management, compliance, employer branding, talent strategy.
   - **Technology & Digital Solutions**: Product & platform development, SaaS & marketplace solutions, Web & mobile app development, property platforms, CRM/ERP/HRMS platforms, cloud infrastructure, AI integrations, UI/UX architecture.
   - **Market Research & Strategic Intelligence**: Market research & surveys, competitor analysis, consumer insights, feasibility studies, business intelligence, strategic data consulting.
   - **Legal & Financial Consulting**: Business registration & structuring, contract support, legal compliance advisory, accounting & bookkeeping, tax & regulatory support, MIS financial reporting, payroll compliance.
   - **Digital Marketing & Brand Growth**: Brand strategy & positioning, performance marketing, SEO & organic growth, social media marketing, lead generation, content & creative solutions, marketing automation.
   - **Business Strategy & Advisory**: Operational excellence, business transformation, process optimization, change management, startup & scale-up consulting.

3. **OUR FEATURED PROJECTS & URLS** (ALWAYS include markdown links):
   - **[Flance](https://flance.in)**: Business Finance, Billing & Payroll Platform. Features order-to-cash lifecycle, GST-compliant invoicing, auto tax calculations (CGST/SGST/IGST & TDS), Razorpay integration, PDF generation, employee salary structures, payslips, expense tracking, and P&L statements. Tech Stack: React, Node.js, MongoDB, Razorpay, Puppeteer.
   - **[TalentCIO](https://talentcio.in)**: Talent Intelligence Ecosystem & Talent Acquisition. Philosophy: "Human Intelligence + Technology = Talent Intelligence". Features candidate sourcing, AI resume screening, interview scheduling, onboarding, attendance, performance management, and role-based access control. Tech Stack: React, Node.js, MongoDB, JWT, RBAC.
   - **[ILUMAA Socials](https://ilumaasocialmarketing.vercel.app/)**: Social Media & Networking Platform. Features community creation, post sharing, media uploads, following creators, real-time Socket.IO messaging, and live notifications. Tech Stack: React, Node.js, MongoDB, Socket.IO, Cloudinary.

4. **OUR TEAM**:
   - Powered by a team of **10+ experienced operators and engineers** specializing in system architecture, AI research, full-stack web platforms, mobile engineering, and cloud infrastructure.

5. **HOW TO CONNECT & START A PROJECT**:
   - Contact Emails: [hello@ilummtech.com](mailto:hello@ilummtech.com) | [info@ilumaa.com](mailto:info@ilumaa.com)
   - Approach (4 Steps):
     1. **Understand**: Analyze business challenges, people, and opportunities.
     2. **Strategize**: Create intelligent transformation roadmaps.
     3. **Build & Implement**: Execute scalable consulting and technology solutions in 2-week agile sprints.
     4. **Optimize & Scale**: Improve systems, performance, and long-term growth.

6. **CAREERS & HOW TO APPLY**:
   - Send resume, portfolio/GitHub link, and intro to [hello@ilummtech.com](mailto:hello@ilummtech.com) or [info@ilumaa.com](mailto:info@ilumaa.com).

STRICT RULES:
- ONLY answer questions about ILumaa, ILumaaTech, our team, strategy/tech/finance/marketing services, or our projects ([Flance](https://flance.in), [TalentCIO](https://talentcio.in), [ILUMAA Socials](https://ilumaasocialmarketing.vercel.app/)).
- Reject completely off-topic questions by politely directing users to ask about ILumaa services!`;

    const getLocalResponse = (queryText) => {
      const lower = queryText.toLowerCase();

      // Digital Marketing & Branding
      if (
        lower.includes("marketing") ||
        lower.includes("seo") ||
        lower.includes("brand") ||
        lower.includes("lead generation") ||
        lower.includes("social media marketing")
      ) {
        return "At **ILumaa**, our Digital Marketing & Brand Growth solutions include:\n\n• Brand Strategy & Positioning\n• Performance Marketing & Lead Generation\n• SEO & Organic Search Growth\n• Social Media Marketing & Content Creation\n• Website & Digital Presence Management\n\nConnect with us at [info@ilumaa.com](mailto:info@ilumaa.com) to scale your brand!";
      }

      // Legal & Financial Consulting
      if (
        lower.includes("legal") ||
        lower.includes("financial") ||
        lower.includes("compliance") ||
        lower.includes("taxation") ||
        lower.includes("accounting") ||
        lower.includes("bookkeeping")
      ) {
        return "Our **Legal & Financial Consulting** services provide business clarity & compliance:\n\n• Business Registration & Structuring\n• Legal Compliance & Contract Support\n• Accounting, Bookkeeping & Payroll Compliance\n• Taxation, Regulatory Support & Financial Controls\n• MIS & Financial Reporting";
      }

      // Market Research & Intelligence
      if (
        lower.includes("market research") ||
        lower.includes("research") ||
        lower.includes("competitor") ||
        lower.includes("analytics") ||
        lower.includes("intelligence") ||
        lower.includes("consumer insight")
      ) {
        return "Our **Market Research & Strategic Intelligence** team helps you make data-driven decisions:\n\n• Industry & Competitor Analysis\n• Consumer Insights & Feasibility Studies\n• Market Research Surveys & Opportunity Assessment\n• Business Intelligence & Reporting";
      }

      // Strategy & Consulting
      if (
        lower.includes("strategy") ||
        lower.includes("consulting") ||
        lower.includes("advisory") ||
        lower.includes("growth") ||
        lower.includes("transformation") ||
        lower.includes("scaling")
      ) {
        return "ILumaa's **Strategic Consulting & Advisory** helps businesses scale efficiently:\n\n• Business Strategy & Expansion Planning\n• Operational Excellence & Process Optimization\n• Organizational Development & Change Management\n• Startup & Scale-up Consulting\n\nBook a strategy call at [info@ilumaa.com](mailto:info@ilumaa.com)!";
      }

      // Team & Operators
      if (
        lower.includes("team") ||
        lower.includes("member") ||
        lower.includes("operator") ||
        lower.includes("who built") ||
        lower.includes("who works")
      ) {
        return "ILumaa is powered by a team of **10+ experienced operators and engineers** specializing in system architecture, AI research, full-stack web platforms, mobile engineering, and cloud infrastructure.\n\nWant to collaborate with our team? Contact us at [hello@ilummtech.com](mailto:hello@ilummtech.com)!";
      }

      // Contact & Connection
      if (
        lower.includes("contact") ||
        lower.includes("connect") ||
        lower.includes("email") ||
        lower.includes("reach") ||
        lower.includes("hire") ||
        lower.includes("talk") ||
        lower.includes("call") ||
        lower.includes("book") ||
        lower.includes("consult")
      ) {
        return "You can connect with the ILumaa team directly:\n\n• **Email**: [hello@ilummtech.com](mailto:hello@ilummtech.com) | [info@ilumaa.com](mailto:info@ilumaa.com)\n• **Our 4-Step Approach**: Understand → Strategize → Build & Implement (2-week agile sprints) → Optimize & Scale!\n\nSchedule a consultation via email to kick off your project.";
      }

      // Apply / Careers / Jobs
      if (
        lower.includes("apply") ||
        lower.includes("job") ||
        lower.includes("career") ||
        lower.includes("join") ||
        lower.includes("work with") ||
        lower.includes("hiring") ||
        lower.includes("intern")
      ) {
        return "Interested in joining the ILumaa team?\n\nWe are always looking for driven full-stack engineers, AI architects, strategists, and UI/UX craftsmen.\n\nTo apply, send your resume, GitHub/portfolio link, and a short intro to **[hello@ilummtech.com](mailto:hello@ilummtech.com)** or **[info@ilumaa.com](mailto:info@ilumaa.com)**!";
      }

      // Process & Sprints
      if (
        lower.includes("process") ||
        lower.includes("how it works") ||
        lower.includes("sprint") ||
        lower.includes("steps") ||
        lower.includes("workflow") ||
        lower.includes("approach")
      ) {
        return "Our 4-Step Value Delivery Approach:\n\n1. **Understand**: Analyze business challenges, people, and opportunities.\n2. **Strategize**: Create intelligent, business-focused transformation roadmaps.\n3. **Build & Implement**: Execute scalable tech & consulting solutions in 2-week agile sprints.\n4. **Optimize & Scale**: Continuously improve systems and business performance.";
      }

      // Flance
      if (
        lower.includes("flance") ||
        lower.includes("billing") ||
        lower.includes("invoice") ||
        lower.includes("payroll") ||
        lower.includes("finance") ||
        lower.includes("gst")
      ) {
        return "• **[Flance](https://flance.in)** is our comprehensive financial operations, GST invoicing, and payroll suite. It handles order-to-cash, automatic tax (CGST/SGST/IGST & TDS) calculations, Razorpay payments, employee salary structures, payslip generation, and P&L reporting.\n\nStack: React · Node.js · MongoDB · Razorpay · Puppeteer";
      }

      // TalentCIO
      if (
        lower.includes("talentcio") ||
        lower.includes("talent") ||
        lower.includes("hiring platform") ||
        lower.includes("recruitment") ||
        lower.includes("hr")
      ) {
        return "• **[TalentCIO](https://talentcio.in)** is a modern Talent Intelligence Ecosystem unifying hiring, candidate sourcing, AI resume screening, interview scheduling, onboarding, attendance, and workforce growth.\n\nStack: React · Node.js · MongoDB · JWT Authentication · Role-Based Access Control";
      }

      // ILumaa Socials
      if (
        lower.includes("social") ||
        lower.includes("ilumaasocial") ||
        lower.includes("community")
      ) {
        return "• **[ILUMAA Socials](https://ilumaasocialmarketing.vercel.app/)** is a modern social networking platform built for communities, creators, and businesses. Features real-time Socket.IO messaging, post sharing, media uploads, and live notifications.\n\nStack: React · Node.js · MongoDB · Socket.IO · Cloudinary";
      }

      // AI capabilities
      if (
        lower.includes("ai") ||
        lower.includes("agent") ||
        lower.includes("llm") ||
        lower.includes("rag") ||
        lower.includes("nlp") ||
        lower.includes("gpt")
      ) {
        return "At **ILumaa**, we engineer custom AI solutions from the ground up:\n\n• **Agentic Pipelines & LLMs**: Workflows that reason, plan, and execute multi-step operations.\n• **Retrieval-Augmented Generation (RAG)**: Connect custom datasets securely to language models.\n• **Custom Fine-Tuning**: Adapt open-weights models to your brand tone and domain.";
      }

      // Tech Stack & Services
      if (
        lower.includes("tech") ||
        lower.includes("stack") ||
        lower.includes("service") ||
        lower.includes("react") ||
        lower.includes("node") ||
        lower.includes("cloud") ||
        lower.includes("erp") ||
        lower.includes("mobile")
      ) {
        return "We offer comprehensive services across Strategy, Technology & Operations:\n\n1. **AI Solutions & LLMs** (RAG, Agentic Workflows)\n2. **Technology & Platforms** (React, Next.js, Web & Mobile, Property Platforms, ERPs)\n3. **Talent & HR Solutions** (Executive Hiring, HRMS, Payroll)\n4. **Legal & Financial Advisory** (GST, Taxes, MIS Reporting)\n5. **Digital Marketing & Growth** (SEO, Brand Positioning, Lead Generation)\n6. **Market Research & Analytics**\n\nReach out at [info@ilumaa.com](mailto:info@ilumaa.com) or [hello@ilummtech.com](mailto:hello@ilummtech.com) to start building!";
      }

      return "I am **ILumaa Ask**, your assistant for ILumaa & ILumaaTech!\n\nHere is what you can ask me about:\n\n• **Featured Platforms**: [Flance](https://flance.in) | [TalentCIO](https://talentcio.in) | [ILUMAA Socials](https://ilumaasocialmarketing.vercel.app/)\n• **Services**: AI Solutions, Web & Mobile, Strategy, Talent/HR, Legal/Finance, Digital Marketing\n• **Approach & Process**: Understand → Strategize → Build → Scale\n• **Contact & Careers**: Email [hello@ilummtech.com](mailto:hello@ilummtech.com) or [info@ilumaa.com](mailto:info@ilumaa.com)\n\nHow can I help you build your business today?";
    };

    const geminiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!geminiKey) {
      setTimeout(() => {
        const fallbackReply = getLocalResponse(text);
        const aiMsg = {
          id: `ai-${Date.now()}`,
          text: fallbackReply,
          sender: "ai",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setMessages((prev) => [...prev, aiMsg]);
        setIsTyping(false);
      }, 600);
      return;
    }

    try {
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`;

      // Convert message history for Gemini (roles: 'user' and 'model')
      const formattedHistory = updatedMessages
        .filter((m) => m.id !== "welcome")
        .map((m) => ({
          role: m.sender === "user" ? "user" : "model",
          parts: [{ text: m.text }],
        }));

      const payload = {
        systemInstruction: {
          parts: [{ text: SYSTEM_PROMPT }],
        },
        contents:
          formattedHistory.length > 0
            ? formattedHistory
            : [{ role: "user", parts: [{ text: text }] }],
      };

      const res = await fetch(geminiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(
          errData?.error?.message || `Gemini API status ${res.status}`,
        );
      }

      const data = await res.json();
      const replyText =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        getLocalResponse(text);

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
    } catch (err) {
      console.warn("Gemini API error (fallback triggered):", err.message);
      
      // Seamless Fallback: Provide smart local response so UI never breaks
      const fallbackReply = getLocalResponse(text);
      const errorMsg = {
        id: `ai-fb-${Date.now()}`,
        text: fallbackReply,
        sender: "ai",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
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
          <div onClick={() => setIsOpen(true)} className="iluma-ask-mascot">
            <img
              src={mascotImg}
              alt="ILumaa Mascot"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Ask Ilumaa Button */}
          <button onClick={() => setIsOpen(true)} className="iluma-ask-btn">
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
