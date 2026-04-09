"use client";

import { type RefObject, useEffect } from "react";

/**
 * Maps scroll progress through a tall section to sequential [data-reveal] visibility.
 * Uses safe math when section height ≈ viewport (avoids NaN / negative denominators).
 */
export function useScrollStageReveal(sectionRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = Array.from(
      section.querySelectorAll<HTMLElement>("[data-reveal]")
    );
    const total = items.length;
    if (total === 0) return;

    function update() {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const sectionH = el.offsetHeight;
      const vh = window.innerHeight;
      const scrollable = Math.max(sectionH - vh, 1);
      const scrolled = Math.max(0, -rect.top);
      const progress = Math.min(1, scrolled / scrollable);

      items.forEach((el, i) => {
        const threshold = (i + 1) / (total + 1);
        if (progress >= threshold) {
          el.classList.add("is-visible");
        }
      });
    }

    let ticking = false;
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          update();
          ticking = false;
        });
        ticking = true;
      }
    }

    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => update())
        : null;
    ro?.observe(section);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    requestAnimationFrame(update);

    return () => {
      ro?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
}
