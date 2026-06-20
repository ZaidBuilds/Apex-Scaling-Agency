"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, ShieldCheck, Zap, Layers, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TechLogoProps {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

function TechLogoCard({ name, icon: Icon }: TechLogoProps) {
  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-white/10 hover:bg-white/[0.02] transition-all duration-300 h-28 group relative overflow-hidden">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-t from-white/[0.01] to-transparent" />
      <Icon className="size-8 text-white/40 group-hover:text-apex-gold group-hover:scale-105 transition-all duration-300 mb-2" />
      <span className="text-[10px] font-mono text-white/30 group-hover:text-white/60 transition-colors uppercase tracking-widest">
        {name}
      </span>
    </div>
  );
}

export default function ClientsGrid() {
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  const logos = [
    { name: "Next.js 15", icon: Zap },
    { name: "Figma UI", icon: Layers },
    { name: "Three.js", icon: Sparkles },
    { name: "Secure CRM", icon: ShieldCheck },
  ];

  const handleScrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      const offset = 90;
      const pos = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: pos, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left details block entry
      gsap.fromTo(
        leftColRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: leftColRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Right grid cards stagger entry
      if (rightColRef.current) {
        gsap.fromTo(
          rightColRef.current.children,
          { opacity: 0, y: 25, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: rightColRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="portfolio" className="py-28 bg-transparent relative overflow-hidden px-6 border-t border-white/5">
      {/* Background radial spot */}
      <div className="absolute top-1/2 right-1/2 translate-x-1/3 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/[0.01] blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Column (Sticky content style) */}
        <div ref={leftColRef} className="flex flex-col gap-6 lg:max-w-md opacity-0">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold tracking-widest text-apex-gold uppercase font-mono">
              / PARTNERS & TECH
            </span>
            <div className="w-12 h-[1px] bg-white/10" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-normal text-white leading-[1.15]">
            <em className="italic text-apex-gold font-normal">Trusted</em> by forward-thinking brands.
          </h2>

          <p className="text-white/55 text-xs leading-relaxed">
            We partner with businesses and small agencies across India and the Gulf to build fast, responsive products. Using our high-performance Next.js and Figma stack, we turn ideas into functional digital platforms.
          </p>

          <div className="pt-4">
            <Button
              onClick={() => handleScrollTo("#contact")}
              className="bg-white hover:bg-white/90 text-[#06040a] rounded-full px-6 py-5.5 font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              Get Started
              <ArrowUpRight size={14} />
            </Button>
          </div>
        </div>

        {/* Right Column (Floating Logo Grid) */}
        <div ref={rightColRef} className="grid grid-cols-2 gap-4">
          {logos.map((logo) => (
            <TechLogoCard key={logo.name} {...logo} />
          ))}
        </div>

      </div>
    </section>
  );
}
