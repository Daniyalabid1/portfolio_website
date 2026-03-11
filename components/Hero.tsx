"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import dynamic from "next/dynamic";
import { ease, staggerContainer, wordReveal, fadeIn, fadeUp } from "@/lib/animations";

const HeroScene = dynamic(() => import("./three/HeroScene"), { ssr: false, loading: () => null });

const words1 = ["Daniyal"];
const words2 = ["Abid"];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });

  const nameY   = useTransform(scrollYProgress, [0, 1], ["0%",  "18%"]);
  const tagY    = useTransform(scrollYProgress, [0, 1], ["0%",  "30%"]);
  const sceneY  = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const goto = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section ref={sectionRef} id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden">

      {/* 3D scene — full-bleed right side, parallax */}
      <motion.div
        style={{ y: sceneY }}
        className="absolute right-[-8%] top-0 bottom-0 w-[60vw] pointer-events-none"
      >
        {/* Radial vignette */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 60% at 60% 50%, rgba(40,40,40,0.12), transparent 70%)" }} />
        <div className="w-full h-full opacity-70">
          <HeroScene />
        </div>
        {/* Left content-fade */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, #050505 0%, #050505 10%, transparent 55%)" }} />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-60" style={{ background: "linear-gradient(to bottom, transparent, #050505)" }} />
      </motion.div>

      <div className="relative max-w-6xl mx-auto px-6 w-full pt-36 pb-20">

        {/* Status badge */}
        <motion.div
          variants={fadeIn} initial="hidden" animate="show"
          transition={{ delay: 0.05 }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent pulse-dot" />
          <span className="font-mono text-[11px] tracking-widest text-text-muted uppercase">
            Open to opportunities · Islamabad, PK
          </span>
        </motion.div>

        {/* Giant name — word-split parallax */}
        <motion.div style={{ y: nameY }}>
          {/* First name */}
          <motion.div
            className="overflow-hidden mb-1"
            variants={staggerContainer(0.06, 0.1)}
            initial="hidden" animate="show"
          >
            <div className="flex gap-[0.06em] flex-wrap">
              {["D","a","n","i","y","a","l"].map((ch, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.span
                    variants={wordReveal}
                    className="hero-title block"
                    style={{ fontSize: "clamp(4.5rem, 12vw, 10.5rem)" }}
                  >
                    {ch}
                  </motion.span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Last name */}
          <motion.div
            className="overflow-hidden mb-10"
            variants={staggerContainer(0.05, 0.25)}
            initial="hidden" animate="show"
          >
            <div className="flex gap-[0.06em] flex-wrap">
              {["A","b","i","d"].map((ch, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.span
                    variants={wordReveal}
                    className="hero-title block"
                    style={{
                      fontSize: "clamp(4.5rem, 12vw, 10.5rem)",
                      color: "transparent",
                      WebkitTextStroke: "1.5px rgba(180,180,180,0.55)",
                    }}
                  >
                    {ch}
                  </motion.span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Role / bio — separate parallax layer */}
        <motion.div style={{ y: tagY, opacity }}>
          <motion.div
            variants={staggerContainer(0.12, 0.55)}
            initial="hidden" animate="show"
            className="flex flex-col gap-5"
          >
            {/* Role bar */}
            <motion.div variants={fadeUp} className="flex items-center gap-4">
              <div className="h-px w-6 bg-text-muted" />
              <span className="font-body text-text-secondary" style={{ fontSize: "1rem" }}>
                Software Engineer — Frontend · 3D · AI Integration
              </span>
            </motion.div>

            {/* Bio */}
            <motion.p
              variants={fadeUp}
              className="font-body text-text-muted leading-relaxed max-w-sm"
              style={{ fontSize: "0.9rem" }}
            >
              Building immersive web applications at{" "}
              <span className="text-text-secondary">IMARAT Group</span> — where 3D
              visualization meets AI-driven architectural design.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 pt-2">
              <button onClick={() => goto("#projects")} className="btn-primary">
                Selected Work
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>
              <button onClick={() => goto("#contact")} className="btn-outline">
                Get in touch
              </button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Bottom social + scroll */}
        <motion.div
          variants={fadeIn} initial="hidden" animate="show"
          transition={{ delay: 1.1 }}
          className="flex items-center gap-7 mt-20 pt-8 border-t border-border"
          style={{ opacity: "var(--opacity-bottom, 1)" } as React.CSSProperties}
        >
          {[
            { label: "GitHub",   href: "https://github.com/Daniyalabid1" },
            { label: "LinkedIn", href: "https://linkedin.com/in/daniyal-abid-web-developer" },
            { label: "Email",    href: "mailto:Daniyala714@gmail.com" },
          ].map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="font-mono text-[11px] tracking-widest text-text-muted hover:text-accent transition-colors uppercase"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              {s.label}
            </motion.a>
          ))}

          <div className="ml-auto flex items-center gap-3">
            <motion.div
              animate={{ scaleY: [1, 0.4, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-10 bg-gradient-to-b from-transparent via-text-muted to-transparent"
            />
            <span className="font-mono text-[10px] text-text-muted tracking-widest uppercase">scroll</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
