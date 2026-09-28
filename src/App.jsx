import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LearningPage from "./pages/LearningPage";
import { TechnologySolutionsPage } from "./tech";
import { getTechUrl, getLearningUrl, isTechnologyDomain } from "./utils/domains";

function App() {
  const [pathname, setPathname] = useState(
    typeof window !== "undefined" ? window.location.pathname : "/"
  );
  const isTechnologyPage = isTechnologyDomain();
  const isLearningRoute =
    pathname.startsWith("/learning") ||
    pathname.replace(/\/$/, "") === "/learning";

  useEffect(() => {
    const handleLocationChange = () => {
      setPathname(window.location.pathname);
    };

    if (typeof window !== "undefined") {
      const isTechRoute =
        window.location.pathname.startsWith("/technology-solutions") ||
        window.location.pathname.startsWith("/tech");

      const techUrl = getTechUrl();
      const currentOrigin = window.location.origin;

      // If accessing legacy /technology-solutions or /tech route on the main domain/port, redirect to Tech URL
      if (isTechRoute && currentOrigin !== techUrl) {
        window.location.replace(techUrl);
        return;
      }

      // If accessing /learning route on the main domain/port, redirect to Learning URL (learning.ilumaa.com or localhost:5175)
      const isLearning =
        window.location.pathname.startsWith("/learning") ||
        window.location.pathname.replace(/\/$/, "") === "/learning";
      const learningUrl = getLearningUrl();

      if (isLearning && currentOrigin !== learningUrl) {
        window.location.replace(learningUrl);
        return;
      }
    }

    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

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
          target.scrollIntoView({ behavior: "smooth", block: "start" });
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
    <div className="site-shell min-h-screen w-full max-w-full bg-bg-primary text-text-primary">
      <Navbar isTechnologyPage={isTechnologyPage} pathname={pathname} />
      <main className="w-full max-w-full">
        {isTechnologyPage ? (
          <TechnologySolutionsPage />
        ) : isLearningRoute ? (
          <LearningPage />
        ) : (
          <HomePage />
        )}
      </main>
      <Footer isTechnologyPage={isTechnologyPage} />
    </div>
  );
}

export default App;
