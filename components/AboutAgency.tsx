"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutAgency() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const words = textRef.current.querySelectorAll(".scroll-word");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { color: "rgba(255, 255, 255, 0.12)" },
        {
          color: (index, target) => {
            return target.classList.contains("italic-gold") ? "#ebd1a0" : "#ffffff";
          },
          stagger: 0.15,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            end: "bottom 55%",
            scrub: 1.0, // Bind color lighting directly to scroll
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const textWords = [
    { text: "We", italic: false },
    { text: "build", italic: false },
    { text: "high-converting", italic: true },
    { text: "digital", italic: false },
    { text: "interfaces.", italic: false },
    { text: "From", italic: false },
    { text: "custom", italic: false },
    { text: "motion", italic: false },
    { text: "design", italic: false },
    { text: "to", italic: false },
    { text: "high-performance", italic: true },
    { text: "Next.js", italic: false },
    { text: "builds,", italic: false },
    { text: "we", italic: false },
    { text: "engineer", italic: false },
    { text: "premium", italic: true },
    { text: "websites", italic: false },
    { text: "that", italic: false },
    { text: "turn", italic: false },
    { text: "attention", italic: false },
    { text: "into", italic: false },
    { text: "adoption,", italic: true },
    { text: "and", italic: false },
    { text: "traffic", italic: false },
    { text: "into", italic: false },
    { text: "scalable", italic: true },
    { text: "revenue.", italic: true },
  ];

  return (
    <section
      ref={containerRef}
      id="about"
      className="py-28 md:py-36 bg-transparent relative overflow-hidden px-6 border-t border-white/5"
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        {/* Section Header Category Tag */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold tracking-widest text-apex-gold uppercase font-mono">
            / OUR MISSION
          </span>
          <div className="w-12 h-[1px] bg-white/10" />
        </div>

        {/* Large Statement (Instrument Serif style with word stagger) */}
        <h2
          ref={textRef}
          className="text-2xl sm:text-4xl md:text-5xl font-serif font-normal leading-[1.4] tracking-tight max-w-4xl select-none"
        >
          {textWords.map((word, idx) => (
            <span
              key={idx}
              className={`scroll-word inline-block mr-[0.25em] ${
                word.italic ? "italic text-apex-gold font-normal italic-gold" : "text-white"
              }`}
            >
              {word.text}
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
}
