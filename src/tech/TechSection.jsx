import { motion } from "framer-motion";
import TechTabFolder from "./TechTabFolder";

export default function TechSection() {
  return (
    <section id="tech" className="section-shell">
      <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8">
        <div className="section-intro text-center">
          <p className="section-kicker">Tech Focus</p>
          <h2 className="section-title">
            Technology Focus Areas & Specialized Capability Tracks
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600">
            Explore our specialized technology tracks across digital platforms, data analytics,
            applied AI, cloud engineering, and automated enterprise operations.
          </p>
        </div>

        <div className="mt-12">
          <TechTabFolder />
        </div>
      </div>
    </section>
  );
}
