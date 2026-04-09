"use client";

import { useRef } from "react";
import { useScrollStageReveal } from "@/hooks/useScrollStageReveal";

export default function Satellite() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollStageReveal(sectionRef);

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
