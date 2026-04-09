"use client";

import { useEffect } from "react";

export default function StackingScroll() {
  useEffect(() => {
    const panels = Array.from(
      document.querySelectorAll<HTMLElement>(".hero")
    );
    if (!panels.length) return;

    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    let cached: { el: HTMLElement; top: number; height: number }[] = [];

    function cacheLayout() {
      cached = panels.map((p) => ({
        el: p,
        top: p.offsetTop,
        height: p.offsetHeight,
      }));
    }

    function update() {
      if (prefersReduced) return;
      const scrollY = window.scrollY;

      cached.forEach((data) => {
        const scrollPast = scrollY - data.top;

        if (scrollPast <= 0) {
          data.el.style.transform = "";
          data.el.style.opacity = "";
          data.el.style.borderRadius = "";
          return;
        }

        const progress = Math.min(scrollPast / data.height, 1);
        const easeScale = progress * progress;
        const easeOpacity = Math.pow(progress, 1.5);

        data.el.style.transform = `scale(${1 - easeScale * 0.1})`;
        data.el.style.opacity = String(1 - easeOpacity);
        data.el.style.borderRadius = `${easeScale * 32}px`;
      });
    }

    cacheLayout();

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

    function onResize() {
      cacheLayout();
      update();
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return null;
}
