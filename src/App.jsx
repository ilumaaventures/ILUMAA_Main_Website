import { useEffect } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import { TechnologySolutionsPage } from "./tech";

function App() {
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "/";
  const isTechnologyPage =
    pathname.startsWith("/technology-solutions") ||
    pathname.startsWith("/tech");

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const navigationEntry = performance
      .getEntriesByType("navigation")
      .at(0);
    const isReload = navigationEntry?.type === "reload";

    if (isReload && window.location.pathname === "/") {
      if (window.location.hash) {
        window.history.replaceState(
          null,
          "",
          `${window.location.pathname}${window.location.search}`,
        );
      }

      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
      });
    }

    const scrollToHash = () => {
      const { hash } = window.location;

      if (!hash) {
        return;
      }

      const tryScroll = () => {
        const targetId = hash.replace(/^#/, "");
        const target = document.getElementById(targetId);
        if (target) {
          if (targetId === "connect") {
            const solutionsEl = document.getElementById("solutions");
            if (solutionsEl) {
              const testimonialsEl = document.getElementById("testimonials");
              const testimonialsHeight = testimonialsEl ? testimonialsEl.offsetHeight : 550;
              const targetY = solutionsEl.offsetTop + solutionsEl.offsetHeight + testimonialsHeight + 40;
              window.scrollTo(0, targetY);
              return true;
            }
          }
          if (targetId === "solutions") {
            const solutionsEl = document.getElementById("solutions");
            if (solutionsEl) {
              window.scrollTo(0, solutionsEl.offsetTop);
              return true;
            }
          }
          window.scrollTo(0, Math.max(0, target.offsetTop - 65));
          return true;
        }
        return false;
      };

      if (!tryScroll()) {
        setTimeout(tryScroll, 120);
        setTimeout(tryScroll, 450);
      }
    };

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);

    return () => window.removeEventListener("hashchange", scrollToHash);
  }, [pathname]);

  return (
    <div className="site-shell min-h-screen bg-bg-primary text-text-primary">
      <Navbar isTechnologyPage={isTechnologyPage} />
      <main>
        {isTechnologyPage ? <TechnologySolutionsPage /> : <HomePage />}
      </main>
      <Footer isTechnologyPage={isTechnologyPage} />
    </div>
  );
}

export default App;
