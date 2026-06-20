"use client";

import { useEffect, useRef, useState } from "react";
import { use3DTilt } from "@/lib/hooks/use3DTilt";
import { ArrowUpRight, TrendingUp, Sparkles, Activity } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Sub-component for individual project card with 3D Tilt
function ProjectCard({
  title,
  category,
  result,
  imageUrl,
  tech,
}: {
  title: string;
  category: string;
  result: string;
  imageUrl: string;
  tech: string[];
}) {
  const { elementRef, handleMouseMove, handleMouseLeave, style } = use3DTilt(6);

  return (
    <div
      ref={elementRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className="glass-panel rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 relative group border border-foreground/5 hover:border-foreground/15 hover:shadow-md h-[380px]"
    >
      {/* Background Hover Highlight */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-t from-apex-primary/5 via-transparent to-transparent z-10" />

      {/* Mock Image Representation */}
      <div className="relative w-full h-[200px] overflow-hidden bg-[#f4f4ec] flex items-center justify-center border-b border-foreground/5">
        {/* Abstract design elements to simulate screenshots */}
        <div className="absolute inset-0 opacity-25 group-hover:scale-105 transition-transform duration-700 pointer-events-none" style={{ backgroundImage: imageUrl }} />
        
        {/* Central Overlay Icon */}
        <div className="w-12 h-12 rounded-full bg-white/40 border border-white/60 flex items-center justify-center text-foreground/50 backdrop-blur-md group-hover:text-foreground group-hover:scale-110 group-hover:border-apex-primary/30 transition-all duration-300 z-10 shadow-sm">
          <ArrowUpRight size={18} />
        </div>

        {/* Hover overlay detail */}
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#fcfcf9] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex gap-1.5 flex-wrap">
          {tech.map((t) => (
            <span key={t} className="text-[9px] font-mono text-foreground/60 bg-foreground/5 px-2 py-0.5 rounded border border-foreground/5 font-semibold">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Details Footer */}
      <div className="p-6 relative z-10 flex-1 flex flex-col justify-between bg-white/70 backdrop-blur-sm">
        <div>
          <span className="text-[10px] font-bold tracking-wider text-apex-primary uppercase mb-1 block">
            {category}
          </span>
          <h4 className="text-base font-serif font-bold text-[#111115] group-hover:text-apex-primary transition-colors duration-300">
            {title}
          </h4>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-foreground/5">
          <span className="text-[10px] font-bold text-foreground/40 uppercase tracking-wider">KEY RESULTS</span>
          <span className="text-xs font-bold text-apex-gold uppercase tracking-wide flex items-center gap-1">
            <TrendingUp size={12} /> {result}
          </span>
        </div>
      </div>
    </div>
  );
}

// Sub-component for individual GSAP scroll counters
function CounterItem({
  target,
  prefix = "",
  suffix = "",
  label,
  icon: Icon,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const obj = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: target,
        duration: 1.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: elementRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
        onUpdate: () => {
          setCount(Math.floor(obj.val));
        },
      });
    }, elementRef);

    return () => ctx.revert();
  }, [target]);

  return (
    <div ref={elementRef} className="flex flex-col items-center p-6 rounded-2xl bg-[#f4f4ec] border border-foreground/5 hover:border-foreground/10 hover:shadow-sm transition-all duration-300 flex-1 min-w-[200px]">
      <div className="w-10 h-10 rounded-full bg-apex-primary/5 border border-apex-primary/10 flex items-center justify-center text-apex-primary mb-4">
        <Icon className="size-5" />
      </div>
      <div className="text-3xl md:text-4xl font-extrabold text-foreground font-mono tracking-tight flex items-center">
        <span>{prefix}</span>
        <span>{count}</span>
        <span>{suffix}</span>
      </div>
      <span className="text-[10px] text-foreground/50 font-bold uppercase tracking-wider mt-2 text-center">
        {label}
      </span>
    </div>
  );
}

export default function PortfolioGrid() {
  const projects = [
    {
      title: "FitLife E-commerce Store",
      category: "E-commerce Development",
      result: "+120% Conversion Lift",
      imageUrl: "radial-gradient(circle at 30% 20%, rgba(108, 99, 255, 0.1), transparent 80%), linear-gradient(135deg, #f0e8f8 0%, #fcfcf9 100%)",
      tech: ["Next.js 15", "Shopify headless", "Tailwind CSS", "Framer Motion"],
    },
    {
      title: "Zenith SaaS Analytics Portal",
      category: "SaaS Development",
      result: "+240% Speed Index",
      imageUrl: "radial-gradient(circle at 70% 80%, rgba(245, 166, 35, 0.1), transparent 80%), linear-gradient(135deg, #e4ede9 0%, #fcfcf9 100%)",
      tech: ["React 19", "GSAP ScrollTrigger", "Chart.js", "Zustand"],
    },
    {
      title: "Aura Premium Cosmetics",
      category: "UX/UI Design & Landing Page",
      result: "₹18L Direct Sales generated",
      imageUrl: "radial-gradient(circle at 50% 50%, rgba(255, 107, 107, 0.08), transparent 80%), linear-gradient(135deg, #f8ebeb 0%, #fcfcf9 100%)",
      tech: ["Next.js", "Tailwind CSS", "Resend API", "Three.js"],
    },
  ];

  return (
    <section id="portfolio" className="py-24 bg-[#fcfcf9] relative overflow-hidden">
      {/* Background spot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-apex-primary/5 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-apex-gold">
            Our Portfolio
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-normal tracking-tight text-[#111115] mt-2">
            Real Projects. Real Results.
          </h2>
          <p className="text-foreground/50 text-sm max-w-xl mx-auto mt-4 leading-relaxed">
            We build websites that look premium and function as conversion engines. Here's what we have built for our partners.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {projects.map((proj) => (
            <ProjectCard key={proj.title} {...proj} />
          ))}
        </div>

        {/* Bottom ROI Counters Row */}
        <div className="flex flex-wrap gap-6 justify-center w-full">
          <CounterItem
            target={350}
            prefix="+"
            suffix="%"
            label="Avg. Traffic Increase"
            icon={TrendingUp}
          />
          <CounterItem
            target={12}
            prefix="₹"
            suffix="L+"
            label="Revenue Generated"
            icon={Sparkles}
          />
          <CounterItem
            target={10}
            prefix=""
            suffix="+"
            label="Early Beta Clients"
            icon={Activity}
          />
        </div>

      </div>
    </section>
  );
}
