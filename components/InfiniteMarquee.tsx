import { Cpu, Layers, Paintbrush, Globe, Terminal, Braces, Sparkles, Workflow, Activity, Box } from "lucide-react";

interface TechItem {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const techItems: TechItem[] = [
  { name: "Next.js 15", icon: Cpu, color: "text-[#111115]" },
  { name: "Figma", icon: Paintbrush, color: "text-rose-500" },
  { name: "Spline 3D", icon: Sparkles, color: "text-cyan-500" },
  { name: "Framer Motion", icon: Layers, color: "text-indigo-500" },
  { name: "Tailwind CSS v4", icon: Globe, color: "text-sky-500" },
  { name: "Vercel Hosting", icon: Terminal, color: "text-[#111115]" },
  { name: "n8n Automation", icon: Workflow, color: "text-orange-500" },
  { name: "shadcn/ui", icon: Braces, color: "text-zinc-500" },
  { name: "Three.js", icon: Box, color: "text-emerald-500" },
  { name: "GSAP", icon: Activity, color: "text-green-500" },
];

export default function InfiniteMarquee() {
  const duplicatedTech = [...techItems, ...techItems, ...techItems];

  return (
    <section className="py-20 bg-[#fcfcf9] relative overflow-hidden border-b border-foreground/5">
      {/* Subtle background decorative highlights */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 rounded-full bg-apex-primary/5 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-72 h-72 rounded-full bg-apex-gold/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-apex-gold">
          Powering Your Vision
        </span>
        <h2 className="text-3xl md:text-4xl font-serif font-normal tracking-tight text-[#111115] mt-2">
          Our High-Performance Tech Stack
        </h2>
        <p className="text-foreground/50 text-sm max-w-xl mx-auto mt-4 leading-relaxed">
          We use industry-standard framework utilities to optimize every single pixel for speed, rendering, and search crawlers.
        </p>
      </div>

      {/* Marquee Rows Container */}
      <div className="w-full flex flex-col gap-6 relative">
        {/* Edge Fade Gradients mapping to warm cream body bg */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#fcfcf9] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#fcfcf9] to-transparent z-10 pointer-events-none" />

        {/* Row 1 - Scroll Left */}
        <div className="w-full overflow-hidden flex whitespace-nowrap">
          <div className="flex gap-4 animate-marquee-left hover:[animation-play-state:paused] py-1 cursor-default">
            {duplicatedTech.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={`row1-${idx}`}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-foreground/5 bg-foreground/[0.01] backdrop-blur-xs transition-all duration-300 hover:border-foreground/15 hover:bg-foreground/[0.03]"
                >
                  <Icon className={`size-5 ${item.color}`} />
                  <span className="text-sm font-semibold text-foreground/80">{item.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Row 2 - Scroll Right */}
        <div className="w-full overflow-hidden flex whitespace-nowrap">
          <div className="flex gap-4 animate-marquee-right hover:[animation-play-state:paused] py-1 cursor-default">
            {duplicatedTech.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={`row2-${idx}`}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-foreground/5 bg-foreground/[0.01] backdrop-blur-xs transition-all duration-300 hover:border-foreground/15 hover:bg-foreground/[0.03]"
                >
                  <Icon className={`size-5 ${item.color}`} />
                  <span className="text-sm font-semibold text-foreground/80">{item.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
