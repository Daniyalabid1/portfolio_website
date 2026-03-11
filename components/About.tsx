"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { ease, staggerContainer, fadeUp, fadeIn, slideLeft, slideRight, lineExpand } from "@/lib/animations";

const AboutScene = dynamic(() => import("./three/AboutScene"), { ssr: false, loading: () => null });

/* Animated counter */
function Counter({ to, label }: { to: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const raw = parseInt(to.replace(/\D/g, ""), 10);
  const suffix = to.replace(/[0-9]/g, "");
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 20 });
  const displayed = useTransform(spring, v => `${Math.round(v)}${suffix}`);

  useEffect(() => { if (inView) mv.set(raw); }, [inView, mv, raw]);

  return (
    <div className="flex flex-col gap-1 group" style={{ borderRight: "1px solid var(--border)", paddingRight: "32px" }}>
      <motion.span ref={ref} className="font-display font-bold text-text-primary"
        style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", letterSpacing: "-0.04em", lineHeight: 1 }}>
        {displayed}
      </motion.span>
      <span className="font-mono text-[11px] text-text-muted uppercase tracking-widest leading-tight">{label}</span>
    </div>
  );
}

const focuses = [
  { label: "Frontend Engineering", detail: "React · Next.js · TypeScript" },
  { label: "3D Visualization",     detail: "Three.js · React Three Fiber · Mapbox" },
  { label: "AI Integration",        detail: "Diffusion · SAM · ComfyUI pipelines" },
  { label: "Backend Systems",       detail: "FastAPI · Django · Redis queues" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="relative py-36">
      {/* Subtle horizontal rule */}
      <div className="max-w-6xl mx-auto px-6 mb-20">
        <motion.div
          variants={lineExpand} initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="h-px bg-border"
        />
      </div>

      <div className="max-w-6xl mx-auto px-6">

        {/* Label row */}
        <motion.div
          variants={staggerContainer(0.1, 0)}
          initial="hidden" animate={inView ? "show" : "hidden"}
          className="flex items-center gap-4 mb-16"
        >
          <motion.span variants={fadeIn} className="section-label">About</motion.span>
          <motion.div variants={lineExpand} className="h-px flex-1 bg-border" />
        </motion.div>

        {/* Two-column main grid */}
        <div className="grid lg:grid-cols-2 gap-20 items-start">

          {/* LEFT: copy */}
          <motion.div
            variants={staggerContainer(0.1, 0.05)}
            initial="hidden" animate={inView ? "show" : "hidden"}
            className="flex flex-col gap-10"
          >
            {/* Pull headline */}
            <motion.h2
              variants={fadeUp}
              className="font-display font-bold text-text-primary leading-tight"
              style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)", letterSpacing: "-0.03em" }}
            >
              Building where{" "}
              <span style={{ color: "var(--accent)" }}>3D space</span>
              {", "}
              <span className="text-text-secondary">AI systems</span>
              {" "}and frontend craft intersect.
            </motion.h2>

            {/* Body paragraphs */}
            <motion.div variants={staggerContainer(0.08)} className="flex flex-col gap-5">
              {[
                `I'm a software engineer focused on frontend systems, 3D visualization, and AI tooling. My work sits at a rare intersection — I write React components in the morning and wire up diffusion model pipelines in the afternoon.`,
                `At IMARAT Group, I built HouseGen and UrbanGen — AI platforms that let architects and planners interact with generative models through live Three.js scenes, coordinating Redis queues, S3 proxies, SAM segmentation, and ComfyUI workflows.`,
                `I'm drawn to problems where engineering rigor and visual quality need to coexist perfectly.`,
              ].map((p, i) => (
                <motion.p
                  key={i}
                  variants={fadeUp}
                  className="font-body text-text-secondary leading-relaxed"
                  style={{ fontSize: "0.93rem" }}
                >
                  {p}
                </motion.p>
              ))}
            </motion.div>

            {/* Focus grid */}
            <motion.div
              variants={staggerContainer(0.07, 0.1)}
              className="grid grid-cols-2 gap-0 border-t border-border"
            >
              {focuses.map(item => (
                <motion.div
                  key={item.label}
                  variants={fadeUp}
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
                  className="py-5 pr-4 border-b border-border group"
                  style={{ borderRight: "1px solid var(--border)", transition: "background 0.2s" }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <motion.div
                      whileHover={{ scale: 1.5 }}
                      transition={{ duration: 0.2 }}
                      className="dot-marker"
                    />
                    <span className="font-body text-text-primary text-[13px] font-medium">{item.label}</span>
                  </div>
                  <span className="font-mono text-[11px] text-text-muted pl-4">{item.detail}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT: 3D scene + stats */}
          <motion.div
            variants={slideRight}
            initial="hidden" animate={inView ? "show" : "hidden"}
            className="flex flex-col gap-10"
          >
            {/* 3D orb */}
            <motion.div
              className="w-full aspect-square relative"
              style={{ maxWidth: 380 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5, ease }}
            >
              <div className="absolute inset-0" style={{ border: "1px solid var(--border)", borderRadius: "4px", overflow: "hidden" }}>
                <AboutScene />
                {/* Corner marks */}
                {["top-0 left-0","top-0 right-0","bottom-0 left-0","bottom-0 right-0"].map((pos, i) => (
                  <div key={i} className={`absolute ${pos} w-3 h-3`} style={{
                    borderTop: i < 2 ? "1px solid var(--border-2)" : "none",
                    borderBottom: i >= 2 ? "1px solid var(--border-2)" : "none",
                    borderLeft: i % 2 === 0 ? "1px solid var(--border-2)" : "none",
                    borderRight: i % 2 === 1 ? "1px solid var(--border-2)" : "none",
                  }} />
                ))}
              </div>
              {/* Floating label */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-4 left-4 font-mono text-[10px] text-text-muted tracking-widest uppercase"
              >
                3D · Real-time · Interactive
              </motion.div>
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={staggerContainer(0.1, 0.4)}
              initial="hidden" animate={inView ? "show" : "hidden"}
              className="flex items-start gap-8 pt-6"
            >
              <Counter to="2+" label="Years experience" />
              <Counter to="10+" label="Technologies" />
              <Counter to="2" label="AI platforms" />
            </motion.div>

            {/* Education */}
            <motion.div
              variants={fadeUp}
              initial="hidden" animate={inView ? "show" : "hidden"}
              transition={{ delay: 0.5 }}
              className="flex flex-col gap-2 pt-4 border-t border-border"
            >
              <span className="section-label mb-1">Education</span>
              <span className="font-display font-semibold text-text-primary text-sm">BS Computer Science</span>
              <span className="font-body text-text-secondary text-sm">Szabist University · Islamabad</span>
              <span className="font-mono text-[11px] text-text-muted">Oct 2020 — Jul 2024</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
