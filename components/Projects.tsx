"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { projects } from "@/data/projects";
import { ease, staggerContainer, fadeUp, fadeIn, lineExpand } from "@/lib/animations";

export default function Projects() {
  const ref  = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [expanded, setExpanded] = useState<number | null>(null);
  const [hovered,  setHovered]  = useState<number | null>(null);

  return (
    <section id="projects" ref={ref} className="relative py-36">
      <div className="max-w-6xl mx-auto px-6">

        {/* Label row */}
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden" animate={inView ? "show" : "hidden"}
          className="flex items-center gap-4 mb-20"
        >
          <motion.span variants={fadeIn} className="section-label">Selected work</motion.span>
          <motion.div variants={lineExpand} className="h-px flex-1 bg-border" />
          <motion.a
            variants={fadeIn}
            href="https://github.com/Daniyalabid1"
            target="_blank" rel="noopener noreferrer"
            className="font-mono text-[11px] text-text-muted hover:text-accent transition-colors tracking-widest uppercase"
            whileHover={{ y: -1 }}
          >
            GitHub ↗
          </motion.a>
        </motion.div>

        {/* Section title */}
        <motion.div
          variants={staggerContainer(0.08, 0.05)}
          initial="hidden" animate={inView ? "show" : "hidden"}
          className="mb-14"
        >
          <motion.h2 variants={fadeUp} className="section-title">Things I&apos;ve built</motion.h2>
        </motion.div>

        {/* Project rows */}
        <motion.div
          variants={staggerContainer(0.09, 0.1)}
          initial="hidden" animate={inView ? "show" : "hidden"}
          className="relative"
        >
          {projects.map((project, i) => {
            const isOpen = expanded === project.id;
            const isHov  = hovered  === project.id;

            return (
              <motion.div key={project.id} variants={fadeUp}>

                {/* ─ Row ─ */}
                <motion.div
                  className="project-row"
                  onHoverStart={() => setHovered(project.id)}
                  onHoverEnd={() => setHovered(null)}
                  onClick={() => setExpanded(isOpen ? null : project.id)}
                  style={{ cursor: "none" }}
                  layout
                >
                  {/* Index */}
                  <motion.span
                    className="project-index"
                    animate={{ opacity: isHov ? 1 : 0.4 }}
                    transition={{ duration: 0.2 }}
                  >
                    0{i + 1}
                  </motion.span>

                  {/* Title + meta */}
                  <div className="flex flex-col gap-2 min-w-0">
                    <span className="project-title-link">
                      {project.title}
                      <motion.span
                        className="project-arrow"
                        animate={{ opacity: isHov ? 1 : 0, x: isHov ? 0 : -6 }}
                        transition={{ duration: 0.2 }}
                      >
                        →
                      </motion.span>
                    </span>
                    <div className="flex flex-wrap items-center gap-3">
                      {project.tag && <span className="tag">{project.tag}</span>}
                      <span className="font-mono text-[11px] text-text-muted">
                        {project.tech.slice(0, 3).join(" · ")}
                        {project.tech.length > 3 && ` +${project.tech.length - 3}`}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col items-end gap-2.5 flex-shrink-0">
                    <div className="flex items-center gap-3">
                      <motion.a
                        href={project.github}
                        target="_blank" rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        whileHover={{ y: -1, color: "var(--text-primary)" }}
                        className="font-mono text-[11px] text-text-muted border border-border px-3 py-1 transition-colors"
                        style={{ borderRadius: "2px" }}
                      >
                        GitHub
                      </motion.a>
                      {project.demo !== "#" && (
                        <motion.a
                          href={project.demo}
                          target="_blank" rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          whileHover={{ y: -1 }}
                          className="font-mono text-[11px] text-accent border border-border-2 px-3 py-1 hover:border-accent transition-colors"
                          style={{ borderRadius: "2px" }}
                        >
                          Live ↗
                        </motion.a>
                      )}
                    </div>
                    {/* +/– toggle */}
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25, ease }}
                      className="font-mono text-sm text-text-muted hidden sm:block leading-none"
                    >
                      +
                    </motion.span>
                  </div>
                </motion.div>

                {/* ─ Expanded panel ─ */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="detail"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.38, ease }}
                      className="overflow-hidden"
                    >
                      <motion.div
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.28, ease }}
                        className="pl-14 pr-4 pb-8 pt-3 flex flex-col gap-5"
                      >
                        <p className="font-body text-text-secondary text-sm leading-relaxed max-w-2xl">
                          {project.description}
                        </p>
                        <motion.div
                          variants={staggerContainer(0.04)}
                          initial="hidden" animate="show"
                          className="flex flex-wrap gap-2"
                        >
                          {project.tech.map(t => (
                            <motion.span
                              key={t}
                              variants={{ hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1 } }}
                              whileHover={{ borderColor: "var(--border-2)", color: "var(--text-primary)" }}
                              className="font-mono text-[11px] text-text-muted border border-border px-2.5 py-1 transition-colors"
                              style={{ borderRadius: "2px" }}
                            >
                              {t}
                            </motion.span>
                          ))}
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Footer hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="font-mono text-[11px] text-text-muted mt-10 tracking-widest"
        >
          Click any row to expand details ↓
        </motion.p>
      </div>
    </section>
  );
}
