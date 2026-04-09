"use client";

import { useRef } from "react";
import { useScrollStageReveal } from "@/hooks/useScrollStageReveal";

export default function Mission() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollStageReveal(sectionRef);

  return (
    <section className="mission mission--scroll-locked" ref={sectionRef}>
      <div className="mission__sticky">
        <div className="mission__media" aria-hidden="true">
          <video
            className="mission__video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/assets/mission/mission-poster.jpg"
          >
            <source src="/assets/mission/mission-background.mp4" type="video/mp4" />
          </video>
          <div className="mission__veil" />
        </div>

        <div className="mission__content">
          <p className="mission__eyebrow" data-reveal>
            Mars Exploration Program
          </p>
          <h2
            className="mission__title"
            aria-label="Roaming the red frontier."
          >
            <span className="mission__title-line" data-reveal>Roaming the</span>
            <span className="mission__title-line" data-reveal>Red frontier.</span>
          </h2>
          <p className="mission__copy" data-reveal>
            From Curiosity to Perseverance, NASA&apos;s rovers traverse the
            Martian landscape searching for signs of ancient life, studying
            geology, and paving the way for future human exploration of the Red
            Planet.
          </p>
          <div className="mission__actions" data-reveal>
            <a className="button button--primary" href="/">
              Discover Missions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
