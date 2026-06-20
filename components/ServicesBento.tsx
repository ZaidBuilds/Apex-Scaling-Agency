"use client";

import { use3DTilt } from "@/lib/hooks/use3DTilt";
import { Globe, Search, Megaphone, Share2, FileText, CheckCircle2 } from "lucide-react";

// Sub-component for individual card tilt
function BentoCard({
  children,
  className = "",
  glowColor = "rgba(108, 99, 255, 0.08)",
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}) {
  const { elementRef, handleMouseMove, handleMouseLeave, style } = use3DTilt(6);

  return (
    <div
      ref={elementRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={`glass-panel rounded-2xl p-6 md:p-8 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group hover:border-foreground/10 hover:shadow-md ${className}`}
    >
      {/* Background Hover Glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), ${glowColor}, transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
}

export default function ServicesBento() {
  return (
    <section id="services" className="py-24 bg-[#fcfcf9] relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-apex-primary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-apex-gold">
            Our Expertise
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-normal tracking-tight text-[#111115] mt-2">
            Services Built to Convert
          </h2>
          <p className="text-foreground/50 text-sm max-w-xl mx-auto mt-4 leading-relaxed">
            We combine visual mastery with technical precision to build agency solutions that drive actual customer conversions.
          </p>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px] md:auto-rows-[230px]">
        
        {/* Card 1: Website Building (Hero Card, spans 2 cols on desktop, spans 2 rows) */}
        <BentoCard className="md:col-span-2 md:row-span-2 flex flex-col md:flex-row gap-6 md:gap-8 justify-between">
          <div className="flex-1 flex flex-col justify-between h-full z-10">
            <div>
              <div className="w-12 h-12 rounded-xl bg-apex-primary/5 border border-apex-primary/10 flex items-center justify-center text-apex-primary mb-6">
                <Globe className="size-6" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#111115] mb-3">Premium Website Building</h3>
              <p className="text-foreground/60 text-xs leading-relaxed mb-6">
                Our main flagship service. We build ultra-fast, responsive Next.js apps with custom design systems, clean animations, and headless CMS integrations.
              </p>
              
              <ul className="grid grid-cols-2 gap-3 mb-6 text-xs text-foreground/80">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-apex-gold" /> SEO Optimized Structure
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-apex-gold" /> Custom 3D & Micro-Motion
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-apex-gold" /> Under 1.5s Load Speed
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-apex-gold" /> WhatsApp & CRM Hooked
                </li>
              </ul>
            </div>
            
            <div>
              <span className="inline-block text-[10px] font-bold tracking-wider text-apex-gold uppercase bg-apex-gold/10 px-3 py-1 rounded-full mb-4 border border-apex-gold/20">
                Avg. Delivery: 10-15 Days
              </span>
            </div>
          </div>

          {/* Pure CSS Browser Mockup Dashboard (Light Theme) */}
          <div className="flex-1 h-full min-h-[170px] md:min-h-0 bg-[#ffffff] border border-foreground/5 rounded-xl overflow-hidden flex flex-col z-10 shadow-lg">
            {/* Browser Header */}
            <div className="bg-[#f4f4ec] border-b border-foreground/5 px-4 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#ff5f56]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              </div>
              <div className="bg-foreground/5 rounded-md px-4 py-0.5 text-[9px] text-foreground/40 font-mono tracking-wide w-40 text-center truncate">
                apexscaling.co/dashboard
              </div>
              <div className="w-8" />
            </div>

            {/* Browser Content */}
            <div className="p-4 flex-1 flex flex-col gap-4 text-[10px] font-mono select-none">
              {/* Stat Cards Row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-foreground/[0.01] border border-foreground/5 rounded-lg p-2.5">
                  <div className="text-[9px] text-foreground/40 uppercase mb-1">CONVERSIONS</div>
                  <div className="text-xs font-bold text-apex-gold flex items-center gap-1">
                    <span>+180%</span>
                    <span className="text-[8px] text-[#27c93f]">▲</span>
                  </div>
                </div>
                <div className="bg-foreground/[0.01] border border-foreground/5 rounded-lg p-2.5">
                  <div className="text-[9px] text-foreground/40 uppercase mb-1">SPEED SCORE</div>
                  <div className="text-xs font-bold text-[#27c93f]">99/100</div>
                </div>
              </div>

              {/* Mock Graph Visual */}
              <div className="bg-foreground/[0.01] border border-foreground/5 rounded-lg p-2.5 flex-1 flex flex-col justify-between">
                <div className="text-[9px] text-foreground/40 mb-2">REVENUE GENERATION</div>
                <div className="flex items-end justify-between h-16 gap-1.5 pt-2">
                  <div className="w-full bg-foreground/5 rounded-sm h-[30%] hover:h-[50%] transition-all duration-300" />
                  <div className="w-full bg-foreground/5 rounded-sm h-[45%] hover:h-[65%] transition-all duration-300" />
                  <div className="w-full bg-foreground/5 rounded-sm h-[35%] hover:h-[70%] transition-all duration-300" />
                  <div className="w-full bg-apex-primary/20 rounded-sm h-[60%] hover:h-[80%] transition-all duration-300" />
                  <div className="w-full bg-apex-primary/40 rounded-sm h-[75%] hover:h-[90%] transition-all duration-300" />
                  <div className="w-full bg-apex-primary/70 rounded-sm h-[95%] animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </BentoCard>

        {/* Card 2: SEO */}
        <BentoCard className="flex flex-col justify-between">
          <div className="w-10 h-10 rounded-lg bg-apex-primary/5 border border-apex-primary/10 flex items-center justify-center text-apex-primary">
            <Search className="size-5" />
          </div>
          <div>
            <h4 className="text-lg font-serif font-bold text-foreground mb-2">Search Engine Optimization</h4>
            <p className="text-foreground/50 text-xs leading-relaxed">
              Domain mapping, keyword research, meta schemas, and site architecture optimized to rank high on Google index.
            </p>
          </div>
          <div>
            <span className="text-[9px] font-bold tracking-wide text-apex-gold bg-apex-gold/10 px-2 py-1 rounded border border-apex-gold/20">
              +350% Organic Traffic Reach
            </span>
          </div>
        </BentoCard>

        {/* Card 3: Paid Ads */}
        <BentoCard className="flex flex-col justify-between">
          <div className="w-10 h-10 rounded-lg bg-apex-primary/5 border border-apex-primary/10 flex items-center justify-center text-apex-primary">
            <Megaphone className="size-5" />
          </div>
          <div>
            <h4 className="text-lg font-serif font-bold text-foreground mb-2">Paid Search & Social Ads</h4>
            <p className="text-foreground/50 text-xs leading-relaxed">
              Targeted advertising campaigns on Google Ads and Meta platforms structured to lower customer acquisition costs.
            </p>
          </div>
          <div>
            <span className="text-[9px] font-bold tracking-wide text-apex-gold bg-apex-gold/10 px-2 py-1 rounded border border-apex-gold/20">
              Avg. 4.5x ROAS Metric
            </span>
          </div>
        </BentoCard>

        {/* Card 4: Social Media */}
        <BentoCard className="flex flex-col justify-between">
          <div className="w-10 h-10 rounded-lg bg-apex-primary/5 border border-apex-primary/10 flex items-center justify-center text-apex-primary">
            <Share2 className="size-5" />
          </div>
          <div>
            <h4 className="text-lg font-serif font-bold text-foreground mb-2">Social Media Management</h4>
            <p className="text-foreground/50 text-xs leading-relaxed">
              Content calendars, platform growth strategies, community interactions, and organic reach scaling blueprints.
            </p>
          </div>
          <div>
            <span className="text-[9px] font-bold tracking-wide text-apex-gold bg-apex-gold/10 px-2 py-1 rounded border border-apex-gold/20">
              2.1M Organic Impressions
            </span>
          </div>
        </BentoCard>

        {/* Card 5: Content Creation */}
        <BentoCard className="flex flex-col justify-between">
          <div className="w-10 h-10 rounded-lg bg-apex-primary/5 border border-apex-primary/10 flex items-center justify-center text-apex-primary">
            <FileText className="size-5" />
          </div>
          <div>
            <h4 className="text-lg font-serif font-bold text-foreground mb-2">Copywriting & Content</h4>
            <p className="text-foreground/50 text-xs leading-relaxed">
              High-converting landing page copy, technical blog articles, and visual design assets that sell.
            </p>
          </div>
          <div>
            <span className="text-[9px] font-bold tracking-wide text-apex-gold bg-apex-gold/10 px-2 py-1 rounded border border-apex-gold/20">
              Engaging & SEO Indexed
            </span>
          </div>
        </BentoCard>

      </div>
    </section>
  );
}
