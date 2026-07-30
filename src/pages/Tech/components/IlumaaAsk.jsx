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

const SYSTEM_PROMPT = `You are ILumaa Ask, the official AI technical and product assistant for ILumaa and ILumaaTech.

Your sole focus is to provide comprehensive, accurate, and structured details about ILumaa's platforms, software products, technology stack, engineering architecture, and services.

IDENTITY & RESPONSE GUIDELINES:
- Name: ILumaa Ask.
- Tone: Technical, authoritative, friendly, professional, concise.
- Format: Natural human text using Markdown formatting (bullet points, bold text, clickable links).
- NEVER output raw JSON objects, JSON schema stringifications, or code wrappers around plain text. Always output clean, human-readable conversation text.

DETAILED FEATURED PLATFORMS & SOFTWARE PRODUCTS:

1. **Flance (Business Finance, GST Invoicing & Payroll Suite)**:
   - Link: https://flance.in
   - Features: Order-to-cash billing lifecycle, GST-compliant invoicing (auto CGST/SGST/IGST & TDS calculations), quote/proforma/PO generation, Razorpay payment gateway integration, instant PDF generation via Puppeteer, employee salary structure configuration, payslip generation, leave/attendance tracking, income/expense management, bank statement reconciliation, and real-time P&L reporting.
   - Stack: React · Node.js · MongoDB · Razorpay · Puppeteer

2. **TalentCIO (Talent Intelligence Ecosystem & Recruitment)**:
   - Link: https://talentcio.in
   - Philosophy: "Human Intelligence + Technology = Talent Intelligence"
   - Features: Strategic hiring, candidate sourcing, AI-assisted resume screening & matching, hiring pipelines, interview scheduling, offer management, onboarding readiness, employee operations, leave/attendance tracking, performance management, leadership communities, and secure Role-Based Access Control (RBAC).
   - Stack: React · Node.js · MongoDB · JWT Authentication · Role-Based Access Control

3. **ILUMAA Socials (Community & Creator Social Network)**:
   - Link: https://ilumaasocialmarketing.vercel.app/
   - Features: Community creation, media upload feeds (Cloudinary), creator discovery, sub-second real-time messaging via Socket.IO, live push notifications, trending content algorithms.
   - Stack: React · Node.js · MongoDB · Socket.IO · Cloudinary

4. **Aether OS (Agentic AI Task Layer)**:
   - Features: Intelligent operating layer routing tasks across specialized AI models. Understands user intent, dispatches to AI agents or human operators, and learns from resolutions.

5. **Nimbus ERP (Logistics Operations Backbone)**:
   - Features: Unified enterprise operational backbone connecting finance, multi-branch ops, inventory, and workforce into a real-time single source of truth.

6. **Pulse (Real-time Analytics Engine)**:
   - Features: Sub-second analytics dashboard processing over 40M+ events a day with real-time alerting, anomaly detection, and custom reporting metrics.

7. **Vantage (Multi-Cloud Control Console)**:
   - Features: Single pane of glass console for multi-cloud cost optimization, automated security compliance, and deployment management across AWS, GCP, and Azure.

ENGINEERING & SERVICE DISCIPLINES:
- **Artificial Intelligence**: Agentic pipelines, custom LLMs, RAG (Retrieval-Augmented Generation), vector databases (Pinecone, Chroma), custom model fine-tuning, NLP document parsing.
- **Web Platforms**: Scalable web applications, React, Next.js, Vite, Node.js, Express, Python (FastAPI/Django), Golang, Tailwind CSS, Three.js, GSAP.
- **Mobile Applications**: Native iOS & Android apps, React Native, offline resilience, real-time sync.
- **Cloud Solutions**: AWS (ECS, Lambda, RDS, S3), Docker, Kubernetes, CI/CD automation, sub-10ms uptime monitoring.
- **ERP Systems**: Finance, GST billing, payroll, HRMS, inventory, and operations.

PROCESS & PRICING:
- 7-Stage Assembly Line: Discovery → Wireframes → Design → 2-Week Agile Sprints → Testing → Zero-Downtime Deployment → Live Launch.
- Pricing: Transparent milestone pricing, 2-week dedicated agile sprints, or consulting retainers. Contact ilumaaventures@gmail.com.

CONTACT:
- Email Technical Team: ilumaaventures@gmail.com
- Email Business Advisory: info@ilumaa.com`;

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

  const getLocalResponse = (queryText) => {
    const lower = queryText.toLowerCase();

    // 1. Flance (Billing & Payroll)
    if (
      lower.includes("flance") ||
      lower.includes("billing") ||
      lower.includes("invoice") ||
      lower.includes("payroll") ||
      lower.includes("gst") ||
      lower.includes("tax") ||
      lower.includes("accounting")
    ) {
      return "• **[Flance](https://flance.in)** is our comprehensive financial operations, GST invoicing, and payroll platform.\n\nKey Capabilities:\n• **Order-to-Cash Billing**: GST-compliant invoices, quotes, proformas & purchase orders with auto CGST/SGST/IGST and TDS calculations.\n• **Razorpay Payments**: Automated payment link generation & PDF receipt rendering.\n• **Full Payroll Engine**: Salary structure configuration, payslip generation, leave/attendance integration.\n• **Realtime Finance**: Expense/income tracking, bank statement reconciliation, and P&L reports.\n\nStack: React · Node.js · MongoDB · Razorpay · Puppeteer";
    }

    // 2. TalentCIO (HR & Talent Ecosystem)
    if (
      lower.includes("talentcio") ||
      lower.includes("talent") ||
      lower.includes("recruitment") ||
      lower.includes("hiring") ||
      lower.includes("hrms") ||
      lower.includes("onboarding")
    ) {
      return "• **[TalentCIO](https://talentcio.in)** is an integrated Talent Intelligence Ecosystem built on the philosophy 'Human Intelligence + Technology = Talent Intelligence'.\n\nKey Capabilities:\n• **AI Recruitment Pipeline**: Candidate sourcing, AI-assisted resume screening, interview scheduling & offer management.\n• **Workforce Management**: Onboarding readiness, employee operations, leave/attendance tracking, & performance growth.\n• **Enterprise Security**: Role-Based Access Control (RBAC) & candidate privacy.\n\nStack: React · Node.js · MongoDB · JWT Authentication";
    }

    // 3. ILUMAA Socials (Community & Social Networking)
    if (
      lower.includes("social") ||
      lower.includes("ilumaasocial") ||
      lower.includes("community") ||
      lower.includes("messaging") ||
      lower.includes("socket")
    ) {
      return "• **[ILUMAA Socials](https://ilumaasocialmarketing.vercel.app/)** is a modern social networking platform built for creators, businesses, and communities.\n\nKey Capabilities:\n• **Community Engagement**: Content feeds, media uploads, creator discovery, & post interactions.\n• **Realtime Chat**: Sub-second socket messaging powered by Socket.IO.\n• **Notifications & Media**: Cloudinary media optimization & instant notifications.\n\nStack: React · Node.js · MongoDB · Socket.IO · Cloudinary";
    }

    // 4. Products & Shipped Portfolio
    if (
      lower.includes("aether") ||
      lower.includes("nimbus") ||
      lower.includes("pulse") ||
      lower.includes("vantage") ||
      lower.includes("product") ||
      lower.includes("portfolio") ||
      lower.includes("platform") ||
      lower.includes("work") ||
      lower.includes("shipped")
    ) {
      return "Here are the core platforms and digital products engineered and shipped by ILumaa:\n\n1. **[Flance](https://flance.in)**: Business Finance, Billing & Payroll Platform\n2. **[TalentCIO](https://talentcio.in)**: Talent Intelligence & Recruitment Ecosystem\n3. **[ILUMAA Socials](https://ilumaasocialmarketing.vercel.app/)**: Realtime Community Social Network\n4. **Aether OS**: Agentic AI operating layer that routes tasks across specialized AI models\n5. **Nimbus ERP**: Operations & logistics backbone for multi-branch scaling\n6. **Pulse**: Sub-second analytics dashboard processing over 40M+ events/day\n7. **Vantage**: Single pane of glass multi-cloud cost, security, & deployment console\n\nContact us at [ilumaaventures@gmail.com](mailto:ilumaaventures@gmail.com) to build your custom platform!";
    }

    // 5. AI, Agentic Pipelines, RAG & LLMs
    if (
      lower.includes("ai") ||
      lower.includes("intelligence") ||
      lower.includes("llm") ||
      lower.includes("rag") ||
      lower.includes("agent") ||
      lower.includes("gpt") ||
      lower.includes("fine-tun") ||
      lower.includes("nlp") ||
      lower.includes("model")
    ) {
      return "At **ILumaa**, we engineer custom AI & Agentic Machine Learning solutions:\n\n• **Agentic Pipelines & LLMs**: Workflows that reason, plan, and execute multi-step operations automatically (e.g., Aether OS).\n• **Retrieval-Augmented Generation (RAG)**: Connect your custom enterprise databases to vector search (Pinecone/Chroma) & LLMs.\n• **Model Fine-Tuning**: Adapt open-weights models (LLaMA, Mistral, OpenAI) to your specific domain and brand tone.\n• **Intelligent Data Parsing**: Automated document extraction, sentiment analysis, & NLP text classification.\n\nWant to integrate AI into your software? Email us at [ilumaaventures@gmail.com](mailto:ilumaaventures@gmail.com)!";
    }

    // 6. Technology Stack
    if (
      lower.includes("tech") ||
      lower.includes("stack") ||
      lower.includes("frontend") ||
      lower.includes("backend") ||
      lower.includes("database") ||
      lower.includes("react") ||
      lower.includes("node") ||
      lower.includes("python") ||
      lower.includes("aws") ||
      lower.includes("cloud") ||
      lower.includes("docker")
    ) {
      return "Our production-grade technology stack includes:\n\n• **Frontend**: React, Next.js, Vite, Tailwind CSS, Three.js, GSAP, Framer Motion.\n• **Backend & APIs**: Node.js, Express, Python (FastAPI/Django), Golang, GraphQL, REST.\n• **Databases**: MongoDB, PostgreSQL, Redis, Pinecone & Chroma vector DBs.\n• **Cloud & DevOps**: AWS (ECS, Lambda, RDS, S3), Docker, Kubernetes, GitHub Actions CI/CD.\n• **Realtime & Messaging**: Socket.IO, WebSockets, Kafka, RabbitMQ.";
    }

    // 7. ERP, Web, Mobile, Cloud Services
    if (
      lower.includes("service") ||
      lower.includes("web") ||
      lower.includes("mobile") ||
      lower.includes("app") ||
      lower.includes("erp") ||
      lower.includes("cloud infrastructure")
    ) {
      return "ILumaaTech offers five core engineering disciplines:\n\n1. **Artificial Intelligence**: Custom LLMs, agentic pipelines, RAG, and NLP.\n2. **Web Platforms**: Scalable, high-performance web applications with cinematic interfaces.\n3. **Mobile Apps**: Native-grade iOS and Android experiences built for speed & offline resilience.\n4. **Cloud Solutions**: Elastic, observable AWS infrastructure engineered to scale.\n5. **ERP Systems**: Unified platforms connecting finance, ops, & HR into a single source of truth.";
    }

    // 8. Development Process & 2-Week Sprints
    if (
      lower.includes("process") ||
      lower.includes("sprint") ||
      lower.includes("timeline") ||
      lower.includes("methodology") ||
      lower.includes("how do you work") ||
      lower.includes("steps")
    ) {
      return "Our **7-Stage Product Assembly Line**:\n\n1. **Stage 1 (Idea)**: Interrogate problem scope & define MVP.\n2. **Stage 2 (Wireframe)**: Map user flows, architecture, & edge cases.\n3. **Stage 3 (Design)**: High-fidelity UI/UX & interactive prototypes.\n4. **Stage 4 (Code)**: Production-grade engineering built in 2-week agile sprints.\n5. **Stage 5 (Testing)**: Automated test suites & human QA.\n6. **Stage 6 (Deployment)**: Zero-downtime CI/CD pipelines.\n7. **Stage 7 (Launch)**: Live sub-second monitoring & ongoing scaling dashboards.";
    }

    // 9. Pricing, Cost & Quotes
    if (
      lower.includes("price") ||
      lower.includes("cost") ||
      lower.includes("quote") ||
      lower.includes("rate") ||
      lower.includes("budget") ||
      lower.includes("payment") ||
      lower.includes("pricing") ||
      lower.includes("charge")
    ) {
      return "We offer transparent, value-driven engagement models:\n\n• **Fixed Scope Projects**: Clear milestone-based delivery with fixed pricing.\n• **Dedicated Agile Sprints**: Flexibly deploy a dedicated team of engineers & designers in 2-week sprints.\n• **Consulting Retainers**: Strategic advisory and ongoing technical partnership.\n\nTo get a customized quote for your project, email us at **[ilumaaventures@gmail.com](mailto:ilumaaventures@gmail.com)** with your requirements!";
    }

    // 10. Security & Compliance
    if (
      lower.includes("security") ||
      lower.includes("privacy") ||
      lower.includes("data protection") ||
      lower.includes("host") ||
      lower.includes("soc2") ||
      lower.includes("gdpr") ||
      lower.includes("auth")
    ) {
      return "Security is built into every layer at ILumaaTech:\n\n• **Authentication & Access**: JWT, OAuth2, and Role-Based Access Control (RBAC).\n• **Data Protection**: End-to-end encryption in transit (TLS 1.3) and at rest (AES-256).\n• **Cloud Hosting**: AWS ISO 27001 compliant infrastructure with automatic backups & sub-10ms uptime monitoring.\n• **Code Quality**: Automated vulnerability scanning, linting, and strict peer code reviews.";
    }

    // 11. Team & Careers
    if (
      lower.includes("team") ||
      lower.includes("career") ||
      lower.includes("job") ||
      lower.includes("hiring") ||
      lower.includes("apply") ||
      lower.includes("intern") ||
      lower.includes("operator")
    ) {
      return "ILumaa is powered by **10+ senior operators, AI researchers, & full-stack engineers**.\n\nWe are always looking for exceptional talent in software architecture, AI engineering, product design, & strategy.\n\nTo apply, send your resume, portfolio/GitHub link, and intro to **[ilumaaventures@gmail.com](mailto:ilumaaventures@gmail.com)** or **[info@ilumaa.com](mailto:info@ilumaa.com)**!";
    }

    // 12. Contact
    if (
      lower.includes("contact") ||
      lower.includes("email") ||
      lower.includes("reach") ||
      lower.includes("start") ||
      lower.includes("call") ||
      lower.includes("location") ||
      lower.includes("address") ||
      lower.includes("hello")
    ) {
      return "Connect with ILumaa directly:\n\n• **Technical Inquiries**: [ilumaaventures@gmail.com](mailto:ilumaaventures@gmail.com)\n• **Business Consulting & Advisory**: [info@ilumaa.com](mailto:info@ilumaa.com)\n• **Our Process**: Discovery Call → Architectural Roadmap → Agile 2-Week Sprints → Launch & Scale.\n\nDrop us an email to schedule a consultation!";
    }

    // Default response
    return "I am **ILumaa Ask**, your official technical & product assistant for ILumaa and ILumaaTech!\n\nI can help you with:\n\n• **Shipped Platforms**: [Flance](https://flance.in) (Finance & Payroll), [TalentCIO](https://talentcio.in) (Talent Ecosystem), [ILUMAA Socials](https://ilumaasocialmarketing.vercel.app/) (Social Network)\n• **Software Products**: Aether OS, Nimbus ERP, Pulse Analytics, Vantage Cloud Console\n• **Engineering Disciplines**: Custom AI & LLMs, Web & Mobile Platforms, Cloud Infrastructure, ERP Systems\n• **Process & Quotes**: 2-Week Agile Sprints & Custom Project Quotes (Contact [ilumaaventures@gmail.com](mailto:ilumaaventures@gmail.com))\n\nWhat platform or topic would you like to explore?";
  };

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
      }, 500);
      return;
    }

    try {
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`;

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
      let replyText =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        getLocalResponse(text);

      // Clean up JSON strings if returned by model
      if (typeof replyText === "string" && replyText.trim().startsWith("{")) {
        try {
          const parsed = JSON.parse(replyText);
          if (parsed.reply || parsed.text || parsed.answer || parsed.message) {
            replyText =
              parsed.reply || parsed.text || parsed.answer || parsed.message;
          }
        } catch (e) {
          // If JSON parse fails, use replyText as is
        }
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
    } catch (err) {
      console.warn("Gemini API error (fallback triggered):", err.message);

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
      const isBullet = line.trim().startsWith("•") || line.trim().startsWith("- ");
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
              </strong>,
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
            <span className="text-cyan-400 mt-2 shrink-0 block w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
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
          <div onClick={() => setIsOpen(true)} className="iluma-ask-mascot">
            <img
              src={mascotImg}
              alt="ILumaa Mascot"
              className="w-full h-full object-contain"
            />
          </div>

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
                <Info className="h-3 w-3" /> FEATURED PLATFORMS & TOPICS:
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
              placeholder="Ask about Flance, TalentCIO, AI or our tech..."
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
