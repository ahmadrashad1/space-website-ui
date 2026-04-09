"use client";

import { useEffect, useRef } from "react";

export default function Satellite() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = Array.from(
      section.querySelectorAll<HTMLElement>("[data-reveal]")
    );
    const total = items.length;

    function update() {
      const rect = section!.getBoundingClientRect();
      const scrollable = section!.scrollHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollable));

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

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="satellite satellite--scroll-locked" ref={sectionRef}>
      <div className="satellite__sticky">
        <div className="satellite__media" aria-hidden="true">
          <video
            className="satellite__video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/assets/satellite/satellite-poster.jpg"
          >
            <source src="/assets/satellite/satellite-background.mp4" type="video/mp4" />
          </video>
          <div className="satellite__veil" />
        </div>

        <div className="satellite__content">
          <p className="satellite__eyebrow" data-reveal>
            Orbital Satellite Network
          </p>
          <h2
            className="satellite__title"
            aria-label="Eyes in orbit watching over Earth."
          >
            <span className="satellite__title-line" data-reveal>Eyes in orbit</span>
            <span className="satellite__title-line" data-reveal>Watching over</span>
            <span className="satellite__title-line" data-reveal>Earth.</span>
          </h2>
          <p className="satellite__copy" data-reveal>
            NASA&apos;s fleet of Earth-observing satellites monitors our planet
            around the clock — tracking weather systems, mapping terrain,
            measuring ocean currents, and capturing data that shapes our
            understanding of climate change.
          </p>
          <div className="satellite__actions" data-reveal>
            <a className="button button--primary" href="/">
              Explore Satellites
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
