import { useEffect } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import { TechnologySolutionsPage } from "./tech";

function App() {
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "/";
  const isTechnologyPage = pathname.startsWith("/technology-solutions");

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

      const target = document.querySelector(hash);

      if (target) {
        requestAnimationFrame(() => {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
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
