import type { Variants } from "framer-motion";

export const ease = [0.22, 1, 0.36, 1] as const;
export const easeOut = [0.0, 0.0, 0.2, 1] as const;

/* Container that staggers children */
export const staggerContainer = (stagger = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

/* Item that fades up */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

/* Item that fades in flat */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.6, ease } },
};

/* Slides in from left */
export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.7, ease } },
};

/* Slides in from right */
export const slideRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.7, ease } },
};

/* Word-split — wraps each word */
export const wordReveal: Variants = {
  hidden: { y: "110%", opacity: 0 },
  show:   { y: "0%",   opacity: 1, transition: { duration: 0.75, ease } },
};

/* Scale up from 90% */
export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.6, ease } },
};

/* Line draw (width 0 → 100%) */
export const lineExpand: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  show:   { scaleX: 1, originX: 0, transition: { duration: 1.0, ease } },
};

/* Helper — split a string into words for animation */
export function splitWords(text: string): string[] {
  return text.split(" ");
}
