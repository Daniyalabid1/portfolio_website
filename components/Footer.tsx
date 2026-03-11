"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { socialLinks } from "@/data/social";
import { staggerContainer, fadeUp, fadeIn } from "@/lib/animations";

const GH   = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>;
const LI   = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
const Mail = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></svg>;
const icons: Record<string, React.ReactNode> = { github: <GH/>, linkedin: <LI/>, mail: <Mail/> };

/* Marquee items for footer */
const footerMarquee = [
  "React","Next.js","Three.js","TypeScript","Python","FastAPI","Open to work",
  "Software Engineer","Islamabad PK","AI Integration","3D Visualization",
  "Frontend Craft","Open to work","React","Next.js","Three.js","TypeScript",
];

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const doubled = [...footerMarquee, ...footerMarquee];

  return (
    <footer ref={ref}>
      {/* CTA marquee banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="py-4 border-y border-border marquee-container overflow-hidden"
        style={{ background: "var(--surface)" }}
      >
        <div className="marquee-track" style={{ animationDuration: "22s" }}>
          {doubled.map((item, i) => (
            <span key={i} className="font-mono text-[11px] tracking-widest uppercase flex items-center gap-10">
              <span className={item === "Open to work" ? "text-accent" : "text-text-muted"}>{item}</span>
              <span className="text-text-muted opacity-20">×</span>
            </span>
          ))}
        </div>
      </motion.div>

      {/* Main footer bar */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden" animate={inView ? "show" : "hidden"}
          className="flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          {/* Left */}
          <motion.div variants={fadeUp} className="flex flex-col items-center sm:items-start gap-1">
            <span className="font-display font-bold text-text-primary text-sm tracking-tight">Daniyal Abid</span>
            <span className="font-mono text-[11px] text-text-muted">
              © {new Date().getFullYear()} · Islamabad, PK
            </span>
          </motion.div>

          {/* Centre */}
          <motion.span
            variants={fadeIn}
            className="font-mono text-[11px] text-text-muted hidden sm:block tracking-widest uppercase"
          >
            Designed &amp; built with precision
          </motion.span>

          {/* Right socials */}
          <motion.div
            variants={staggerContainer(0.07)}
            className="flex items-center gap-5"
          >
            {socialLinks.map(s => (
              <motion.a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={s.label}
                variants={fadeUp}
                whileHover={{ y: -3, color: "var(--text-primary)" }}
                transition={{ duration: 0.2 }}
                className="text-text-muted transition-colors"
              >
                {icons[s.icon]}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
