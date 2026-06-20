"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import gsap from "gsap";

export default function HeroMarketing3D() {
  const [scrollY, setScrollY] = useState(0);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Track scroll position to fade out scroll indicator
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP Entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in headline
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power4.out" }
      );

      // Subtitle entry
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 0.45, ease: "power2.out" }
      );

      // CTAs entry
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 0.75, ease: "power2.out" }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleScrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      const offset = 80;
      const pos = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: pos, behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full bg-transparent flex flex-col justify-center items-center overflow-hidden pt-28 pb-32 px-6"
    >

      {/* 2. Headline Overlay Content */}
      <div className="max-w-4xl mx-auto text-center relative z-20 select-none pb-20">
        
        {/* Sub-badge */}
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-white/10 bg-white/[0.02] text-[10px] font-bold tracking-wider text-white/50 uppercase mb-8 backdrop-blur-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-apex-gold animate-pulse" />
          Specializing in premium website building
        </span>

        {/* Serif Editorial Headline (Instrument Serif Style) */}
        <h1
          ref={headlineRef}
          className="text-4xl sm:text-6xl md:text-7xl font-serif font-normal tracking-tight text-white mb-8 leading-[1.08] opacity-0"
        >
          Powering the <em className="italic text-apex-gold font-normal">next generation</em> of business websites.
        </h1>

        {/* Sub-paragraph */}
        <p
          ref={subtitleRef}
          className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto mb-10 leading-relaxed opacity-0"
        >
          We design and engineer high-converting websites, custom web & mobile applications, and high-ROI marketing campaigns structured to scale your business revenue.
        </p>

        {/* Action CTAs */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center opacity-0"
        >
          <Button
            onClick={() => window.open("https://calendly.com/collab-zaidbuilds/30min", "_blank")}
            className="w-full sm:w-auto bg-white hover:bg-white/90 text-[#06040a] rounded-full px-8 py-6 font-semibold uppercase tracking-wider text-[10px] shadow-sm cursor-pointer border border-transparent transition-colors flex items-center gap-1.5"
          >
            Book a Consultation
            <ArrowUpRight size={14} />
          </Button>

          <Button
            onClick={() => handleScrollTo("#services")}
            variant="outline"
            className="w-full sm:w-auto text-white rounded-full px-8 py-6 font-semibold border-white/10 hover:border-white/30 bg-white/[0.03] hover:bg-white/[0.08] uppercase tracking-wider text-[10px] transition-colors"
          >
            Learn More
          </Button>
        </div>

      </div>

      {/* 3. Animated Scroll Indicator */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 z-20 transition-opacity duration-300"
        style={{ opacity: Math.max(0, 1 - scrollY / 150) }}
      >
        <span className="text-[9px] font-semibold tracking-widest uppercase">Scroll down</span>
        <div className="w-5 h-8 rounded-full border border-white/20 flex justify-center p-1.5 animate-bounce">
          <ArrowDown size={10} className="text-white/50" />
        </div>
      </div>
    </section>
  );
}
