"use client";

import { useEffect, useRef } from "react";
import { use3DTilt } from "@/lib/hooks/use3DTilt";
import { Globe, Search, MessageSquare, Code2, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CapabilityCardProps {
  title: string;
  italicWord: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  badge: string;
}

function CapabilityCard({ title, italicWord, description, icon: Icon, badge }: CapabilityCardProps) {
  const { elementRef, handleMouseMove, handleMouseLeave, style } = use3DTilt(5);

  return (
    <div
      ref={elementRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className="rounded-2xl p-6 md:p-8 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group hover:border-white/10 hover:shadow-lg h-[260px] bg-[#0d0b12]/85 border border-white/5 backdrop-blur-md cursor-default"
    >
      {/* Background Hover Radial Glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(400px circle at var(--x, 50%) var(--y, 50%), rgba(235, 209, 160, 0.04), transparent 40%)`,
        }}
      />

      <div className="z-10">
        <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-white mb-6 group-hover:text-apex-gold transition-colors">
          <Icon className="size-5" />
        </div>
        <h3 className="text-xl font-serif text-white mb-2 leading-tight">
          {title} <em className="italic text-apex-gold font-normal">{italicWord}</em>
        </h3>
        <p className="text-white/60 text-xs leading-relaxed max-w-sm">
          {description}
        </p>
      </div>

      <div className="z-10 flex items-center justify-between mt-6 pt-4 border-t border-white/5">
        <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest">{badge}</span>
        <ArrowUpRight size={14} className="text-white/30 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
      </div>
    </div>
  );
}

export default function Capabilities() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const capabilitiesList = [
    {
      title: "Premium Website",
      italicWord: "Development",
      description: "Custom UI grids, clean phase motions, and Next.js 15 routing engineered under 1.5s load speeds.",
      icon: Globe,
      badge: "Flagship Service",
    },
    {
      title: "Search Engine",
      italicWord: "Optimization",
      description: "Keywords research, meta schemas structures, and speed optimizations built to rank on Google search.",
      icon: Search,
      badge: "Visibility Boost",
    },
    {
      title: "Copywriting &",
      italicWord: "Content",
      description: "High-converting headings and technical content that sells, structured for direct lead capture.",
      icon: MessageSquare,
      badge: "Conversions Hook",
    },
    {
      title: "Custom CRM",
      italicWord: "Integrations",
      description: "Connecting form submissions directly to Notion databases, Airtable CRM, and Resend mail automation.",
      icon: Code2,
      badge: "Workflow Setup",
    },
  ];

  useEffect(() => {
    if (!cardsContainerRef.current) return;
    const cards = cardsContainerRef.current.children;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 45 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="py-24 bg-transparent relative overflow-hidden px-6">
      {/* Background ambient spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-white/[0.01] blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] font-bold tracking-widest text-apex-gold uppercase font-mono">
                / CAPABILITIES
              </span>
              <div className="w-12 h-[1px] bg-white/10" />
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-normal text-white">
              Services Built to <em className="italic text-apex-gold font-normal">Scale</em>.
            </h2>
          </div>
          <p className="text-white/50 text-xs max-w-sm leading-relaxed">
            We merge design sophistication with advanced technical code to build websites that represent your brand and convert users.
          </p>
        </div>

        {/* Capabilities Grid */}
        <div ref={cardsContainerRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilitiesList.map((cap) => (
            <CapabilityCard key={cap.title} {...cap} />
          ))}
        </div>

      </div>
    </section>
  );
}
