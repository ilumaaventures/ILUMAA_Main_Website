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

  const navItems = useMemo(
    () => [
      { label: "Services", href: "/#services" },
      { label: "Solutions", href: "/#solutions" },
      { label: "Tech", href: "/tech" },
      { label: "Connect", href: "/#connect" },
      { label: "Opportunities", href: "/#connect" },
    ],
    [],
  );

  const handleLogoClick = (event) => {
    if (typeof window === "undefined") {
      return;
    }

    if (window.location.pathname === "/") {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const navBg = isTechnologyPage
    ? isScrolled
      ? "rgba(203, 206, 211, 0.95)"
      : "rgba(203, 206, 211, 0.98)"
    : isScrolled
      ? "rgba(255, 255, 255, 0.98)"
      : "rgba(255, 255, 255, 1)";

  const borderColor = isTechnologyPage
    ? "rgba(14, 17, 22, 0.12)"
    : isScrolled
      ? "rgba(148,163,184,0.18)"
      : "rgba(148,163,184,0.10)";

  return (
    <motion.header
      initial={false}
      animate={{
        backgroundColor: navBg,
        borderColor: borderColor,
      }}
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl ${
        isTechnologyPage ? "bg-[#CBCED3]" : "bg-white"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6 lg:px-8">
        <a
          href="/"
          onClick={handleLogoClick}
          className="group flex items-center gap-3"
        >
          <img
            src={logoSrc}
            alt="ILUMAA"
            className="h-9 w-auto sm:h-11 object-contain transition-all"
          />
        </a>

        <nav className="hidden items-center gap-1.5 lg:flex">
          {navItems.map((item) => {
            const active = isTechnologyPage
              ? item.href === "/tech" &&
                (window.location.pathname.startsWith("/technology-solutions") ||
                  window.location.pathname.startsWith("/tech"))
              : false;

            return (
              <a
                key={item.label}
                href={item.href}
                className={`px-3.5 py-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] transition ${
                  isTechnologyPage
                    ? active
                      ? "text-slate-950 font-bold"
                      : "text-slate-700 hover:text-slate-950"
                    : active
                      ? "text-slate-950"
                      : "text-slate-500 hover:text-slate-950"
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
            className=" bg-blue-500 rounded-2xl text-xs px-3.5 py-2 text-[12px] font-semibold uppercase tracking-[0.14em] transition text-white"
          >
            Contact Us
          </a>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className={`inline-flex items-center justify-center rounded-full border p-3 shadow-sm lg:hidden ${
            isTechnologyPage
              ? "border-slate-400/40 bg-[#CBCED3] text-slate-950"
              : "border-slate-200 bg-white text-slate-950"
          }`}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`overflow-hidden border-t lg:hidden ${
              isTechnologyPage
                ? "border-slate-400/30 bg-[#CBCED3]"
                : "border-slate-200 bg-white/95"
            }`}
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-2xl border px-4 py-3 text-sm font-semibold uppercase tracking-[0.14em] transition ${
                    isTechnologyPage
                      ? "border-slate-400/30 bg-slate-300/50 text-slate-900 hover:text-slate-950"
                      : "border-slate-200 bg-slate-50 text-slate-600 hover:text-slate-950"
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="/#connect"
                onClick={() => setIsOpen(false)}
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
