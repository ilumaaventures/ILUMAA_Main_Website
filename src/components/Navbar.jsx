import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Menu, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { getMainUrl, getTechUrl, getLearningUrl } from "../utils/domains";

function Navbar({ isTechnologyPage, pathname = "" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const logoSrc = `${import.meta.env.BASE_URL}ilumaa_logo.png`;
  const techUrl = getTechUrl();
  const mainUrl = getMainUrl();
  const learningUrl = getLearningUrl();

  const currentPath =
    pathname || (typeof window !== "undefined" ? window.location.pathname : "/");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 18);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const desktopNavItems = useMemo(() => {
    if (isTechnologyPage) {
      return [
        { label: "Home", href: mainUrl },
        { label: "Learning", href: learningUrl },
        { label: "Solutions", href: `${mainUrl}#solutions` },
        { label: "Tech", href: techUrl },
        { label: "Connect", href: `${mainUrl}#connect` },
      ];
    }
    return [
      { label: "Home", href: "/" },
      { label: "Learning", href: learningUrl },
      { label: "Solutions", href: "/#solutions" },
      { label: "Tech", href: techUrl },
      { label: "Connect", href: "/#connect" },
    ];
  }, [isTechnologyPage, mainUrl, techUrl, learningUrl]);

  const mobileNavItems = useMemo(() => {
    if (isTechnologyPage) {
      return [
        { label: "Home", href: mainUrl },
        { label: "Learning", href: learningUrl },
        { label: "Solutions", href: `${mainUrl}#solutions` },
        { label: "Tech", href: techUrl },
        { label: "Connect", href: `${mainUrl}#connect` },
      ];
    }
    return [
      { label: "Home", href: "/" },
      { label: "Learning", href: learningUrl },
      { label: "Why Choose Us", href: "/#why-choose-us" },
      { label: "Our Solutions", href: "/#solutions" },
      { label: "Our Approach", href: "/#approach" },
      { label: "Tech", href: techUrl },
      { label: "Connect", href: "/#connect" },
    ];
  }, [isTechnologyPage, mainUrl, techUrl, learningUrl]);

  const handleNav = (event, href, isMobile = false) => {
    if (typeof window === "undefined") {
      return;
    }

    if (isMobile) {
      setIsOpen(false);
    }

    // External link redirect (e.g. https://tech.ilumaa.com)
    if (href.startsWith("http://") || href.startsWith("https://")) {
      return;
    }

    // Learning Page Navigation
    if (href === "/learning") {
      event.preventDefault();
      if (window.location.pathname !== "/learning") {
        window.history.pushState(null, "", "/learning");
        window.dispatchEvent(new Event("popstate"));
      }
      if (isMobile) {
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 80);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    // 1. HOME BUTTON - Direct smooth navigation
    if (href === "/") {
      event.preventDefault();
      if (window.location.pathname !== "/" && window.location.pathname !== "") {
        window.history.pushState(null, "", "/");
        window.dispatchEvent(new Event("popstate"));
      }
      if (isMobile) {
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 80);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    // 2. CONNECT / SOLUTIONS / SECTIONS - Direct smooth navigation
    if (href.startsWith("/#") || href.startsWith("#")) {
      const targetId = href.replace(/^\/?#/, "");

      if (window.location.pathname === "/" || window.location.pathname === "") {
        event.preventDefault();
        const el = document.getElementById(targetId);
        if (el) {
          window.history.pushState(null, "", `#${targetId}`);
          if (isMobile) {
            setTimeout(() => {
              el.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 80);
          } else {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
          return;
        }
      }

      if (window.location.pathname !== "/") {
        event.preventDefault();
        window.history.pushState(null, "", `/#${targetId}`);
        window.dispatchEvent(new Event("popstate"));
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 120);
        return;
      }
    }
  };

  const handleLogoClick = (event) => {
    if (typeof window === "undefined") {
      return;
    }

    if (isTechnologyPage) {
      event.preventDefault();
      window.location.href = mainUrl;
      return;
    }

    event.preventDefault();
    if (window.location.pathname !== "/" && window.location.pathname !== "") {
      window.history.pushState(null, "", "/");
      window.dispatchEvent(new Event("popstate"));
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.header
      initial={false}
      animate={{
        backgroundColor: isScrolled
          ? "rgba(255, 255, 255, 0.96)"
          : "rgba(255, 255, 255, 0.92)",
        borderColor: isScrolled
          ? "rgba(226, 232, 240, 0.9)"
          : "rgba(241, 245, 249, 0.8)",
        boxShadow: isScrolled
          ? "0 4px 20px -2px rgba(15, 23, 42, 0.06)"
          : "0 1px 4px rgba(15, 23, 42, 0.03)",
      }}
      className="fixed inset-x-0 top-0 z-50 w-full max-w-full border-b backdrop-blur-xl transition-all"
    >
      <div className="mx-auto flex w-full max-w-[1520px] items-center justify-between gap-3 px-4 py-2 sm:px-6 sm:py-2.5 lg:px-8">
        <a
          href={isTechnologyPage ? mainUrl : "/"}
          onClick={handleLogoClick}
          className="group flex items-center gap-2 transition hover:opacity-90"
        >
          <img
            src={logoSrc}
            alt="ILUMAA"
            className="h-8 w-auto sm:h-9 md:h-10 object-contain"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {desktopNavItems.map((item) => {
            const isLearningActive = currentPath.startsWith("/learning");
            const active = isTechnologyPage
              ? item.label === "Tech"
              : item.href === "/learning"
              ? isLearningActive
              : !isLearningActive &&
                item.href === "/" &&
                (currentPath === "/" || currentPath === "") &&
                (typeof window === "undefined" || !window.location.hash);

            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNav(e, item.href, false)}
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

        {/* Desktop CTA */}
        <div className="hidden lg:flex">
          <a
            href={isTechnologyPage ? `${mainUrl}#connect` : "/#connect"}
            onClick={(e) => handleNav(e, isTechnologyPage ? `${mainUrl}#connect` : "/#connect", false)}
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-accent-blue to-accent-cyan px-4 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.16em] text-white shadow-[0_3px_10px_rgba(77,124,255,0.25)] transition hover:brightness-105"
          >
            Contact Us
          </a>
        </div>

        {/* Mobile Hamburger Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200/90 bg-white text-slate-800 shadow-sm transition hover:border-blue-400/60 hover:bg-slate-50 hover:text-blue-600 active:scale-95 lg:hidden"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={18} strokeWidth={2.2} /> : <Menu size={18} strokeWidth={2.2} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-slate-200/80 bg-white/98 shadow-xl backdrop-blur-2xl lg:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 sm:px-6">
              {mobileNavItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNav(e, item.href, true)}
                  className="flex items-center justify-between rounded-xl border border-slate-200/70 bg-slate-50/70 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-slate-700 transition hover:border-blue-300 hover:bg-blue-50/50 hover:text-blue-600 active:scale-[0.99]"
                >
                  <span>{item.label}</span>
                  <ChevronRight size={14} className="text-slate-400" />
                </a>
              ))}
              <a
                href={isTechnologyPage ? `${mainUrl}#connect` : "/#connect"}
                onClick={(e) => handleNav(e, isTechnologyPage ? `${mainUrl}#connect` : "/#connect", true)}
                className="btn-primary mt-1 w-full justify-center py-2.5 text-xs"
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
