"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { contactInfo, socialLinks } from "@/data/social";
import { ease, staggerContainer, fadeUp, fadeIn, slideLeft, slideRight, lineExpand } from "@/lib/animations";

type Status = "idle" | "sending" | "sent";

const GH = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>;
const LI = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
const Mail = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></svg>;

const icons: Record<string, React.ReactNode> = { github: <GH />, linkedin: <LI />, mail: <Mail /> };

const inputBase =
  "w-full bg-surface border border-border px-4 py-3.5 font-body text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-border-2 transition-all duration-200";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise(r => setTimeout(r, 1200));
    setStatus("sent");
  };

  return (
    <section id="contact" ref={ref} className="relative py-36">
      {/* Bottom ambient */}
      <div className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(40,40,40,0.08), transparent 70%)" }} />

      <div className="max-w-6xl mx-auto px-6">

        {/* Label row */}
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden" animate={inView ? "show" : "hidden"}
          className="flex items-center gap-4 mb-20"
        >
          <motion.span variants={fadeIn} className="section-label">Contact</motion.span>
          <motion.div variants={lineExpand} className="h-px flex-1 bg-border" />
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-20 items-start">

          {/* LEFT: headline + links */}
          <motion.div
            variants={staggerContainer(0.1, 0.05)}
            initial="hidden" animate={inView ? "show" : "hidden"}
            className="flex flex-col gap-8"
          >
            <motion.h2 variants={fadeUp} className="section-title">
              Let&apos;s make<br />something great
            </motion.h2>
            <motion.p variants={fadeUp}
              className="font-body text-text-secondary text-sm leading-relaxed max-w-xs">
              Open to new roles, freelance work, and interesting technical challenges.
              I usually reply within 24 hours.
            </motion.p>

            {/* Direct contact links */}
            <motion.div variants={staggerContainer(0.07, 0.15)} className="flex flex-col gap-4 pt-2 border-t border-border">
              <motion.a
                variants={fadeUp}
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-3 group"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-text-muted group-hover:text-accent transition-colors">{icons["mail"]}</span>
                <span className="font-mono text-xs text-text-secondary group-hover:text-accent transition-colors">
                  {contactInfo.email}
                </span>
                <span className="ml-auto font-mono text-[10px] text-text-muted opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
              </motion.a>

              {socialLinks.filter(s => s.icon !== "mail").map((s, i) => (
                <motion.a
                  key={s.label}
                  variants={fadeUp}
                  href={s.href}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 group"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-text-muted group-hover:text-accent transition-colors">{icons[s.icon]}</span>
                  <span className="font-mono text-xs text-text-secondary group-hover:text-accent transition-colors">{s.label}</span>
                  <span className="ml-auto font-mono text-[10px] text-text-muted opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                </motion.a>
              ))}

              {/* Availability */}
              <motion.div variants={fadeUp} className="flex items-center gap-3 pt-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent pulse-dot flex-shrink-0" />
                <span className="font-mono text-[11px] text-text-muted tracking-widest">
                  Available · Full-time &amp; freelance · ISB, PK
                </span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* RIGHT: form */}
          <motion.form
            variants={slideRight}
            initial="hidden" animate={inView ? "show" : "hidden"}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 relative"
          >
            {/* Form border frame */}
            <div className="absolute -inset-6 border border-border opacity-30 pointer-events-none" style={{ borderRadius: "4px" }} />

            <div className="grid sm:grid-cols-2 gap-4">
              {(["name", "email"] as const).map(field => (
                <div key={field} className="flex flex-col gap-1.5 relative">
                  <motion.label
                    animate={{ color: focused === field ? "var(--accent)" : "var(--text-muted)" }}
                    transition={{ duration: 0.2 }}
                    className="font-mono text-[11px] tracking-widest uppercase"
                    htmlFor={field}
                  >
                    {field}
                  </motion.label>
                  <input
                    id={field}
                    type={field === "email" ? "email" : "text"}
                    required
                    value={form[field]}
                    onChange={e => setForm({ ...form, [field]: e.target.value })}
                    onFocus={() => setFocused(field)}
                    onBlur={() => setFocused(null)}
                    placeholder={field === "name" ? "Your name" : "your@email.com"}
                    className={inputBase}
                    style={{ borderRadius: "2px", borderColor: focused === field ? "var(--border-2)" : undefined }}
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-1.5">
              <motion.label
                animate={{ color: focused === "message" ? "var(--accent)" : "var(--text-muted)" }}
                transition={{ duration: 0.2 }}
                className="font-mono text-[11px] tracking-widest uppercase"
                htmlFor="message"
              >
                Message
              </motion.label>
              <textarea
                id="message"
                required
                rows={5}
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused(null)}
                placeholder="Tell me about your project..."
                className={inputBase + " resize-none"}
                style={{ borderRadius: "2px", borderColor: focused === "message" ? "var(--border-2)" : undefined }}
              />
            </div>

            <div className="flex items-center gap-4 pt-2">
              <motion.button
                type="submit"
                disabled={status !== "idle"}
                className="btn-primary"
                whileHover={status === "idle" ? { y: -2, boxShadow: "0 12px 40px rgba(255,255,255,0.08)" } : {}}
                whileTap={{ y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <AnimatePresence mode="wait">
                  {status === "idle"    && <motion.span key="idle"    initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>Send message →</motion.span>}
                  {status === "sending" && <motion.span key="sending" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>Sending…</motion.span>}
                  {status === "sent"    && <motion.span key="sent"    initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>✓ Message sent</motion.span>}
                </AnimatePresence>
              </motion.button>

              {status === "sent" && (
                <motion.p
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="font-mono text-[11px] text-text-muted"
                >
                  I&apos;ll reply within 24h
                </motion.p>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
