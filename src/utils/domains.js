/**
 * Domain & URL Configuration for multi-domain routing:
 * - Main Website: ilumaa.com (Local dev default: http://localhost:5173)
 * - Tech Website: tech.ilumaa.com (Local dev default: http://localhost:5174)
 * - Learning Website: learning.ilumaa.com (Local dev default: http://localhost:5175)
 */

export const getLearningUrl = () => {
  if (import.meta.env.VITE_LEARNING_URL) {
    return import.meta.env.VITE_LEARNING_URL;
  }

  if (typeof window !== "undefined") {
    const isLocalhost =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";

    if (isLocalhost) {
      const port = import.meta.env.VITE_LEARNING_PORT || "5175";
      return `http://localhost:${port}`;
    }
  }

  return "https://learning.ilumaa.com";
};

export const getTechUrl = () => {
  if (import.meta.env.VITE_TECH_URL) {
    return import.meta.env.VITE_TECH_URL;
  }

  if (typeof window !== "undefined") {
    const isLocalhost =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";

    if (isLocalhost) {
      const port = import.meta.env.VITE_TECH_PORT || "5174";
      return `http://localhost:${port}`;
    }
  }

  return "https://tech.ilumaa.com";
};

export const getMainUrl = () => {
  if (import.meta.env.VITE_MAIN_URL) {
    return import.meta.env.VITE_MAIN_URL;
  }

  if (typeof window !== "undefined") {
    const isLocalhost =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";

    if (isLocalhost) {
      const port = import.meta.env.VITE_MAIN_PORT || "5173";
      return `http://localhost:${port}`;
    }
  }

  return "https://ilumaa.com";
};

export const isTechnologyDomain = () => {
  if (typeof window === "undefined") {
    return false;
  }

  const { hostname, port, pathname } = window.location;
  const isLocalhost =
    hostname === "localhost" || hostname === "127.0.0.1";
  const techPort = String(import.meta.env.VITE_TECH_PORT || "5174");

  // Production or staging subdomain (e.g. tech.ilumaa.com, tech.vercel.app, etc.)
  if (hostname.startsWith("tech.") || hostname === "tech.ilumaa.com") {
    return true;
  }

  // Local development tech port (e.g. port 5174)
  if (isLocalhost && port === techPort) {
    return true;
  }

  // Path fallback
  if (
    pathname.startsWith("/technology-solutions") ||
    pathname.startsWith("/tech")
  ) {
    return true;
  }

  return false;
};
