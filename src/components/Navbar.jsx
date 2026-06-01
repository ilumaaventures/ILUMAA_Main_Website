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
    if (isTechnologyPage) {
      return [
        { label: "Services", href: "/#services" },
        { label: "Solutions", href: "/#solutions" },
        { label: "Tech", href: "/technology-solutions" },
        { label: "Connect", href: "/#connect" },
        { label: "Opportunities", href: "/#connect" },
      ];
    }

    return [
      { label: "Services", href: "/#services" },
      { label: "Solutions", href: "/#solutions" },
      { label: "Tech", href: "/technology-solutions" },
      { label: "Connect", href: "/#connect" },
      { label: "Opportunities", href: "/#connect" },
    ];
  }, [isTechnologyPage]);

  const handleLogoClick = (event) => {
    if (typeof window === "undefined") {
      return;
    }

    if (window.location.pathname === "/") {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={false}
      animate={{
        backgroundColor: isScrolled
          ? "rgba(255, 255, 255, 0.9)"
          : "rgba(255, 255, 255, 0.72)",
        borderColor: isScrolled
          ? "rgba(148,163,184,0.18)"
          : "rgba(148,163,184,0.10)",
      }}
      className="fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <a
          href="/"
          onClick={handleLogoClick}
          className="group flex items-center gap-3"
        >
          <img
            src={logoSrc}
            alt="ILUMAA"
            className="h-14 w-auto sm:h-16"
          />
          {/* <div className="font-heading text-lg font-bold tracking-[0.16em] text-slate-950 sm:text-xl">
            ILUMAA
          </div> */}
        </a>

        <nav className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => {
            const active = isTechnologyPage
              ? item.href === "/technology-solutions" &&
                window.location.pathname.startsWith("/technology-solutions")
              : item.href.includes("#connect")
                ? false
                : false;

            return (
              <a
                key={item.label}
                href={item.href}
                className={`px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.16em] transition ${
                  active
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
          <a href="/#connect" className="btn-primary">
            Contact Us
          </a>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white p-3 text-slate-950 shadow-sm lg:hidden"
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
            className="overflow-hidden border-t border-slate-200 bg-white/95 lg:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-slate-600 transition hover:border-accent-blue/30 hover:text-slate-950"
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
