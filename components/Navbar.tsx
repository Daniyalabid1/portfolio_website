"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ease, staggerContainer, fadeUp } from "@/lib/animations";

const navLinks = [
  { label: "work",       href: "#projects"   },
  { label: "about",      href: "#about"      },
  { label: "skills",     href: "#skills"     },
  { label: "experience", href: "#experience" },
  { label: "contact",    href: "#contact"    },
];

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [active,      setActive]      = useState("");
  const [mobileOpen,  setMobileOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      for (const id of [...navLinks.map(l => l.href.slice(1))].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 160) { setActive(id); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goto = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-4 bg-bg/92 backdrop-blur-2xl border-b border-border"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <a
          href="#"
          onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="flex items-center gap-3 group"
        >
          <motion.span
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.2 }}
            className="font-display font-bold text-sm tracking-tight text-text-primary"
          >
            Daniyal Abid
          </motion.span>
          <span className="flex items-center gap-1.5 font-mono text-[10px] text-text-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-accent pulse-dot inline-block" />
            ISB
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={e => { e.preventDefault(); goto(link.href); }}
              className={`nav-link ${active === link.href.slice(1) ? "active" : ""}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-5">
          <motion.a
            href="mailto:Daniyala714@gmail.com"
            whileHover={{ y: -1 }}
            transition={{ duration: 0.2 }}
            className="font-mono text-[11px] text-text-muted hover:text-accent transition-colors tracking-widest"
          >
            hire me ↗
          </motion.a>
          <motion.a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -1 }}
            transition={{ duration: 0.2 }}
            className="font-mono text-[11px] border border-border px-4 py-2 text-text-secondary hover:border-border-2 hover:text-text-primary transition-all duration-200"
            style={{ borderRadius: "2px" }}
          >
            résumé
          </motion.a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex flex-col justify-center gap-[5px] w-7 h-7"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          {[0,1,2].map(i => (
            <span key={i} className={`block h-px bg-text-secondary transition-all duration-300 ${
              i === 0 ? (mobileOpen ? "rotate-45 translate-y-[7px] w-full" : "w-full") :
              i === 1 ? (mobileOpen ? "opacity-0 w-0" : "w-2/3") :
              (mobileOpen ? "-rotate-45 -translate-y-[7px] w-full" : "w-full")
            }`} />
          ))}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease }}
            className="md:hidden overflow-hidden bg-surface/95 backdrop-blur-2xl border-b border-border"
          >
            <motion.div
              variants={staggerContainer(0.06, 0.05)}
              initial="hidden" animate="show"
              className="max-w-6xl mx-auto px-6 py-8 flex flex-col gap-5"
            >
              {navLinks.map(link => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  variants={fadeUp}
                  onClick={e => { e.preventDefault(); goto(link.href); }}
                  className="font-display text-2xl font-semibold text-text-secondary hover:text-text-primary transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div variants={fadeUp} className="flex gap-5 pt-2 border-t border-border">
                <a href="mailto:Daniyala714@gmail.com" className="font-mono text-xs text-text-muted hover:text-accent transition-colors">hire me</a>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-text-muted hover:text-accent transition-colors">résumé</a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
