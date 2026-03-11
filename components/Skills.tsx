"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import dynamic from "next/dynamic";
import { skillCategories } from "@/data/skills";
import { ease, staggerContainer, fadeUp, fadeIn, slideLeft, lineExpand } from "@/lib/animations";

const SkillsRing = dynamic(() => import("./three/SkillsRing"), { ssr: false, loading: () => null });

/* Marquee data */
const marqueeItems = [
  "React","Next.js","TypeScript","Three.js","Python","FastAPI","Redis",
  "ComfyUI","Framer Motion","TailwindCSS","PostgreSQL","Docker",
  "React Three Fiber","LangChain","SAM Segmentation","Node.js",
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const doubled = [...marqueeItems, ...marqueeItems];

  return (
    <section id="skills" ref={ref} className="relative py-36">
      <div className="max-w-6xl mx-auto px-6">

        {/* Label row */}
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden" animate={inView ? "show" : "hidden"}
          className="flex items-center gap-4 mb-20"
        >
          <motion.span variants={fadeIn} className="section-label">Skills</motion.span>
          <motion.div variants={lineExpand} className="h-px flex-1 bg-border" />
        </motion.div>

        {/* Main grid: left text/table · right 3D */}
        <div className="grid lg:grid-cols-[3fr_2fr] gap-16 items-start">

          {/* LEFT */}
          <div>
            <motion.div
              variants={staggerContainer(0.08, 0.1)}
              initial="hidden" animate={inView ? "show" : "hidden"}
              className="flex flex-col gap-3 mb-12"
            >
              <motion.h2 variants={fadeUp} className="section-title">
                What I work with
              </motion.h2>
              <motion.p variants={fadeUp}
                className="font-body text-text-secondary text-sm leading-relaxed max-w-md">
                A focused stack built around frontend mastery, 3D rendering, and AI-driven systems.
                Continuously expanding.
              </motion.p>
            </motion.div>

            {/* Skill rows — stagger on enter */}
            <motion.div
              variants={staggerContainer(0.06, 0.15)}
              initial="hidden" animate={inView ? "show" : "hidden"}
              className="border-t border-border"
            >
              {skillCategories.map(cat => (
                <motion.div
                  key={cat.title}
                  variants={fadeUp}
                  className="skill-row group"
                  whileHover={{ paddingLeft: "8px" }}
                  transition={{ duration: 0.25 }}
                >
                  <span className="skill-category">{cat.title}</span>
                  <span className="skill-items">
                    {cat.skills.map((skill, si) => (
                      <span key={skill}>
                        <motion.span
                          whileHover={{ color: "var(--text-primary)" }}
                          className="inline-block"
                          transition={{ duration: 0.15 }}
                        >
                          {skill}
                        </motion.span>
                        {si < cat.skills.length - 1 && (
                          <span className="text-text-muted"> · </span>
                        )}
                      </span>
                    ))}
                  </span>
                </motion.div>
              ))}

              {/* Extra rows */}
              {[
                { title: "Tools",  skills: "Git · VS Code · Figma · Postman · Docker · Vercel · AWS S3" },
                { title: "Certs",  skills: "React.js Basics — Great Learning · Microsoft Learn Ambassador" },
              ].map(row => (
                <motion.div key={row.title} variants={fadeUp} className="skill-row">
                  <span className="skill-category">{row.title}</span>
                  <span className="skill-items">{row.skills}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT: 3D Rings */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, ease, delay: 0.3 }}
            className="relative lg:sticky lg:top-32"
          >
            <div className="w-full aspect-square relative" style={{ maxWidth: 340 }}>
              {/* Border frame */}
              <div className="absolute inset-0" style={{ border: "1px solid var(--border)", borderRadius: "50%" }} />
              <div className="absolute inset-4" style={{ border: "1px dashed var(--border)", borderRadius: "50%", opacity: 0.4 }} />
              <SkillsRing />
              {/* Centre label */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <div className="font-mono text-[10px] text-text-muted tracking-widest uppercase">Stack</div>
                  <div className="font-mono text-[10px] text-text-muted tracking-widest uppercase">Depth</div>
                </div>
              </div>
            </div>
            {/* Currently learning note */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="font-mono text-[11px] text-text-muted mt-6 text-center tracking-widest uppercase"
            >
              Currently exploring · Neural rendering · Spatial AI
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Marquee strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6 }}
        className="mt-24 py-5 border-y border-border marquee-container"
      >
        <div className="marquee-track">
          {doubled.map((item, i) => (
            <span key={i} className="font-mono text-[11px] text-text-muted tracking-widest uppercase flex items-center gap-12">
              {item}
              <span className="text-text-muted opacity-30">·</span>
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
