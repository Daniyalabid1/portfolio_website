"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef      = useRef<HTMLDivElement>(null);
  const ringRef     = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current, ring = ringRef.current, prog = progressRef.current;
    if (!dot || !ring || !prog) return;

    let mx = 0, my = 0, rx = 0, ry = 0, raf: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = `${mx}px`; dot.style.top = `${my}px`;
    };
    const onScroll = () => {
      const pct = window.scrollY / Math.max(document.body.scrollHeight - window.innerHeight, 1);
      prog.style.transform = `scaleX(${pct})`;
    };
    const tick = () => {
      rx += (mx - rx) * 0.1; ry += (my - ry) * 0.1;
      ring.style.left = `${rx}px`; ring.style.top = `${ry}px`;
      raf = requestAnimationFrame(tick);
    };

    // Hide until first move
    dot.style.opacity = "0"; ring.style.opacity = "0";
    const show = () => { dot.style.opacity = "1"; ring.style.opacity = "1"; };
    const hide = () => { dot.style.opacity = "0"; ring.style.opacity = "0"; };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll",    onScroll, { passive: true });
    document.addEventListener("mouseenter", show);
    document.addEventListener("mouseleave", hide);
    tick();

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll",    onScroll);
      document.removeEventListener("mouseenter", show);
      document.removeEventListener("mouseleave", hide);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div id="scroll-progress" ref={progressRef} />
      <div id="cursor-dot"  ref={dotRef}  />
      <div id="cursor-ring" ref={ringRef} />
    </>
  );
}
