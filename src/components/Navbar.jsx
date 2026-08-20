import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

function Navbar({ isTechnologyPage }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const logoSrc = `${import.meta.env.BASE_URL}ilumaa_logo.png`;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 18);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = useMemo(() => {
    return [
      { label: "Home", href: "/" },
      { label: "Solutions", href: "/#solutions" },
      { label: "Tech", href: "/technology-solutions" },
      { label: "Connect", href: "/#connect" },
    ];
  }, []);

  const getTargetY = (targetId) => {
    if (targetId === "connect") {
      const solutionsEl = document.getElementById("solutions");
      if (solutionsEl) {
        const testimonialsEl = document.getElementById("testimonials");
        const testimonialsHeight = testimonialsEl ? testimonialsEl.offsetHeight : 550;
        return solutionsEl.offsetTop + solutionsEl.offsetHeight + testimonialsHeight + 40;
      }
    }
    if (targetId === "solutions") {
      const solutionsEl = document.getElementById("solutions");
      if (solutionsEl) {
        return solutionsEl.offsetTop;
      }
    }
    const el = document.getElementById(targetId);
    return el ? el.offsetTop - 65 : 0;
  };

  const handleLinkClick = (event, href) => {
    if (typeof window === "undefined") {
      return;
    }

    // 1. HOME BUTTON - Direct instant navigation
    if (href === "/") {
      if (window.location.pathname === "/" || window.location.pathname === "") {
        event.preventDefault();
        window.history.pushState(null, "", "/");
        window.scrollTo(0, 0);
      }
      return;
    }

    // 2. CONNECT / SOLUTIONS - Direct instant navigation
    if (href.startsWith("/#") || href.startsWith("#")) {
      const targetId = href.replace(/^\/?#/, "");

      const el = document.getElementById(targetId);
      if (el) {
        event.preventDefault();
        const targetY = getTargetY(targetId);
        window.history.pushState(null, "", `#${targetId}`);
        window.scrollTo(0, Math.max(0, targetY));
        return;
      }

      if (window.location.pathname !== "/") {
        event.preventDefault();
        window.location.href = href;
      }
    }
  };

  const handleLogoClick = (event) => {
    if (typeof window === "undefined") {
      return;
    }

    if (window.location.pathname === "/" || window.location.pathname === "") {
      event.preventDefault();
      window.history.pushState(null, "", "/");
      window.scrollTo(0, 0);
    }
  };

  return (
    <motion.header
      initial={false}
      animate={{
        backgroundColor: isScrolled
          ? "rgba(255, 255, 255, 0.96)"
          : "rgba(255, 255, 255, 0.90)",
        borderColor: isScrolled
          ? "rgba(226, 232, 240, 0.9)"
          : "rgba(241, 245, 249, 0.8)",
        boxShadow: isScrolled
          ? "0 4px 20px -2px rgba(15, 23, 42, 0.06)"
          : "0 1px 4px rgba(15, 23, 42, 0.03)",
      }}
      className="fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl transition-all"
    >
      <div className="mx-auto flex max-w-[1520px] items-center justify-between gap-4 px-4 py-2 sm:px-6 sm:py-2.5 lg:px-8">
        <a
          href="/"
          onClick={handleLogoClick}
          className="group flex items-center gap-2 transition hover:opacity-90"
        >
          <img
            src={logoSrc}
            alt="ILUMAA"
            className="h-9 w-auto sm:h-10 object-contain"
          />
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = isTechnologyPage
              ? item.href === "/technology-solutions" &&
                window.location.pathname.startsWith("/technology-solutions")
              : item.href === "/" && window.location.pathname === "/" && !window.location.hash;

            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] transition ${
                  active
                    ? "bg-slate-100 text-slate-950 font-bold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="hidden lg:flex">
          <a
            href="/#connect"
            onClick={(e) => handleLinkClick(e, "/#connect")}
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-accent-blue to-accent-cyan px-4 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.16em] text-white shadow-[0_3px_10px_rgba(77,124,255,0.25)] transition hover:brightness-105"
          >
            Contact Us
          </a>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white p-1.5 text-slate-800 shadow-sm transition hover:bg-slate-50 lg:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-slate-200 bg-white/95 lg:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    handleLinkClick(e, item.href);
                    setIsOpen(false);
                  }}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-slate-600 transition hover:border-accent-blue/30 hover:text-slate-950"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="/#connect"
                onClick={(e) => {
                  handleLinkClick(e, "/#connect");
                  setIsOpen(false);
                }}
                className="btn-primary mt-1 w-full"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navbar;
