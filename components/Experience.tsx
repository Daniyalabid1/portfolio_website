"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { experiences } from "@/data/experience";
import { ease, staggerContainer, fadeUp, fadeIn, slideLeft, lineExpand } from "@/lib/animations";

export default function Experience() {
  const ref = useRef(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" ref={ref} className="relative py-36">
      <div className="max-w-6xl mx-auto px-6">

        {/* Label row */}
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden" animate={inView ? "show" : "hidden"}
          className="flex items-center gap-4 mb-20"
        >
          <motion.span variants={fadeIn} className="section-label">Experience</motion.span>
          <motion.div variants={lineExpand} className="h-px flex-1 bg-border" />
        </motion.div>

        {/* Two-col layout */}
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">

          {/* LEFT sticky header */}
          <div className="flex flex-col gap-6 lg:sticky lg:top-32">
            <motion.div
              variants={staggerContainer(0.1, 0.05)}
              initial="hidden" animate={inView ? "show" : "hidden"}
              className="flex flex-col gap-4"
            >
              <motion.h2 variants={fadeUp} className="section-title">
                Where I&apos;ve<br />worked
              </motion.h2>
              <motion.p variants={fadeUp}
                className="font-body text-text-secondary text-sm leading-relaxed">
                Building production AI and 3D visualization platforms from Islamabad.
              </motion.p>
              <motion.a
                variants={fadeUp}
                href="/resume.pdf"
                target="_blank" rel="noopener noreferrer"
                whileHover={{ x: 3 }}
                className="inline-flex items-center gap-2 font-mono text-[11px] text-text-muted hover:text-accent transition-colors w-fit tracking-widest uppercase"
              >
                Download resume
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/>
                </svg>
              </motion.a>
            </motion.div>

            {/* Decorative timeline line (drawn on enter) */}
            <div className="relative hidden lg:block">
              <motion.div
                initial={{ scaleY: 0 }}
                animate={inView ? { scaleY: 1 } : {}}
                transition={{ duration: 1.4, ease, delay: 0.3 }}
                style={{ originY: 0 }}
                className="w-px h-40 bg-gradient-to-b from-border to-transparent"
              />
            </div>
          </div>

          {/* RIGHT: experience entries */}
          <motion.div
            variants={staggerContainer(0.13, 0.1)}
            initial="hidden" animate={inView ? "show" : "hidden"}
            className="flex flex-col"
          >
            {experiences.map((exp, i) => (
              <motion.article
                key={exp.id}
                variants={fadeUp}
                className="py-10 border-b border-border first:border-t group relative"
              >
                {/* Hover left accent line */}
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-px bg-accent"
                  initial={{ scaleY: 0 }}
                  whileHover={{ scaleY: 1 }}
                  transition={{ duration: 0.35, ease }}
                  style={{ originY: 0 }}
                />

                <div className="pl-0 group-hover:pl-5 transition-all duration-300">
                  {/* Meta header */}
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="font-display font-bold text-text-primary" style={{ fontSize: "1rem" }}>
                          {exp.role}
                        </h3>
                        {exp.current && (
                          <motion.span
                            className="tag"
                            animate={{ opacity: [1, 0.6, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            Current
                          </motion.span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-body text-accent text-sm">{exp.company}</span>
                        <span className="text-text-muted text-xs">·</span>
                        <span className="font-mono text-[11px] text-text-muted">{exp.location}</span>
                      </div>
                    </div>
                    <span className="font-mono text-[11px] text-text-muted">{exp.duration}</span>
                  </div>

                  {/* Bullets with stagger */}
                  <motion.ul
                    variants={staggerContainer(0.06)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-40px" }}
                    className="flex flex-col gap-3"
                  >
                    {exp.bullets.map((bullet, bi) => (
                      <motion.li
                        key={bi}
                        variants={{ hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0, transition: { duration: 0.4, ease } } }}
                        className="flex gap-3 items-start"
                      >
                        <span className="font-mono text-text-muted text-xs mt-1 flex-shrink-0">—</span>
                        <span className="font-body text-text-secondary text-sm leading-relaxed">{bullet}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </motion.article>
            ))}

            {/* Education row */}
            <motion.div
              variants={fadeUp}
              className="py-10"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <span className="section-label mb-1">Education</span>
                  <h3 className="font-display font-bold text-text-primary" style={{ fontSize: "1rem" }}>
                    BS Computer Science
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="font-body text-text-secondary text-sm">Szabist University</span>
                    <span className="text-text-muted text-xs">·</span>
                    <span className="font-mono text-[11px] text-text-muted">Islamabad</span>
                  </div>
                </div>
                <span className="font-mono text-[11px] text-text-muted">Oct 2020 — Jul 2024</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
