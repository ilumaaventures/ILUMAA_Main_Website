/**
 * Unified Domain & URL Configuration:
 * Automatically adapts based on the active domain:
 *
 * 1. Production Custom Domains (*.ilumaa.com):
 *    - Main: https://ilumaa.com
 *    - Tech: https://tech.ilumaa.com
 *    - Learning: https://learning.ilumaa.com
 *
 * 2. Vercel Staging / Deployments (*.vercel.app):
 *    - Main: https://ilumaa-main-website.vercel.app
 *    - Tech: https://tech-ilumaa-fe.vercel.app
 *    - Learning: https://learning-ilumaa-fe.vercel.app
 *
 * 3. Local Development (localhost / 127.0.0.1):
 *    - Main: http://localhost:5173
 *    - Tech: http://localhost:5174
 *    - Learning: http://localhost:5175
 */

export const getLearningUrl = () => {
  if (typeof window !== "undefined") {
    const { hostname } = window.location;
    const isLocalhost =
      hostname === "localhost" || hostname === "127.0.0.1";

    if (isLocalhost) {
      const port = import.meta.env.VITE_LEARNING_PORT || "5175";
      return `http://localhost:${port}`;
    }

    // Official Production Custom Domains
    if (hostname === "ilumaa.com" || hostname.endsWith(".ilumaa.com")) {
      return "https://learning.ilumaa.com";
    }

    // Vercel Preview / Production App Domains
    if (hostname.endsWith(".vercel.app")) {
      return "https://learning-ilumaa-fe.vercel.app";
    }
  }

  if (import.meta.env.VITE_LEARNING_URL) {
    return import.meta.env.VITE_LEARNING_URL;
  }

  // Default production fallback
  return "https://learning.ilumaa.com";
};

export const getTechUrl = () => {
  if (typeof window !== "undefined") {
    const { hostname } = window.location;
    const isLocalhost =
      hostname === "localhost" || hostname === "127.0.0.1";

    if (isLocalhost) {
      const port = import.meta.env.VITE_TECH_PORT || "5174";
      return `http://localhost:${port}`;
    }

    // Official Production Custom Domains
    if (hostname === "ilumaa.com" || hostname.endsWith(".ilumaa.com")) {
      return "https://tech.ilumaa.com";
    }

    // Vercel Preview / Production App Domains
    if (hostname.endsWith(".vercel.app")) {
      return "https://tech-ilumaa-fe.vercel.app";
    }
  }

  if (import.meta.env.VITE_TECH_URL) {
    return import.meta.env.VITE_TECH_URL;
  }

  // Default production fallback
  return "https://tech.ilumaa.com";
};

export const getMainUrl = () => {
  if (typeof window !== "undefined") {
    const { hostname } = window.location;
    const isLocalhost =
      hostname === "localhost" || hostname === "127.0.0.1";

    if (isLocalhost) {
      const port = import.meta.env.VITE_MAIN_PORT || "5173";
      return `http://localhost:${port}`;
    }

    // Official Production Custom Domains
    if (hostname === "ilumaa.com" || hostname.endsWith(".ilumaa.com")) {
      return "https://ilumaa.com";
    }

    // Vercel Preview / Production App Domains
    if (hostname.endsWith(".vercel.app")) {
      return "https://ilumaa-main-website.vercel.app";
    }
  }

  if (import.meta.env.VITE_MAIN_URL) {
    return import.meta.env.VITE_MAIN_URL;
  }

  // Default production fallback
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

  // Official custom domains
  if (
    hostname === "tech.ilumaa.com" ||
    hostname.startsWith("tech.ilumaa.")
  ) {
    return true;
  }

  // Vercel deployment domains
  if (
    hostname === "tech-ilumaa-fe.vercel.app" ||
    hostname.includes("tech-ilumaa")
  ) {
    return true;
  }

  // Generic tech prefix
  if (hostname.startsWith("tech.")) {
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

export const isLearningDomain = () => {
  if (typeof window === "undefined") {
    return false;
  }

  const { hostname, port, pathname } = window.location;
  const isLocalhost =
    hostname === "localhost" || hostname === "127.0.0.1";
  const learningPort = String(import.meta.env.VITE_LEARNING_PORT || "5175");

  // Official custom domains
  if (
    hostname === "learning.ilumaa.com" ||
    hostname.startsWith("learning.ilumaa.")
  ) {
    return true;
  }

  // Vercel deployment domains
  if (
    hostname === "learning-ilumaa-fe.vercel.app" ||
    hostname.includes("learning-ilumaa")
  ) {
    return true;
  }

  // Generic learning prefix
  if (hostname.startsWith("learning.")) {
    return true;
  }

  // Local development learning port (e.g. port 5175)
  if (isLocalhost && port === learningPort) {
    return true;
  }

  // Path fallback
  if (pathname.startsWith("/learning")) {
    return true;
  }

  return false;
};

export const isMainDomain = () => {
  if (typeof window === "undefined") {
    return false;
  }

  const { hostname, port } = window.location;
  const isLocalhost =
    hostname === "localhost" || hostname === "127.0.0.1";
  const mainPort = String(import.meta.env.VITE_MAIN_PORT || "5173");

  // Official custom domain
  if (
    hostname === "ilumaa.com" ||
    hostname === "www.ilumaa.com"
  ) {
    return true;
  }

  // Vercel deployment domain
  if (
    hostname === "ilumaa-main-website.vercel.app" ||
    hostname.includes("ilumaa-main")
  ) {
    return true;
  }

  if (isLocalhost && port === mainPort) {
    return true;
  }

  return false;
};
