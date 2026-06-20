"use client";

import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Sparkles, TrendingUp, ArrowRight } from "lucide-react";

// Helper component for animated number counters
function AnimatedCount({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    let start = displayValue;
    const end = value;
    if (start === end) return;

    const duration = 300; // fast transition for slider responsiveness
    const startTime = performance.now();

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out quad
      const ease = progress * (2 - progress);
      const current = Math.round(start + (end - start) * ease);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setDisplayValue(end);
      }
    };

    requestAnimationFrame(update);
  }, [value]);

  return <span>{displayValue.toLocaleString("en-IN")}</span>;
}

export default function ROICalculator() {
  const [visitors, setVisitors] = useState(5000);
  const [conversionRate, setConversionRate] = useState(1.5);
  const [aov, setAov] = useState(1500);

  // Math conversions
  const currentConversions = Math.round(visitors * (conversionRate / 100));
  const currentRevenue = currentConversions * aov;

  // Let's assume a better website increases the conversion rate by a relative 30%
  // e.g. from 1.5% to 1.95%.
  const improvedRate = conversionRate * 1.3;
  const projectedConversions = Math.round(visitors * (improvedRate / 100));
  const projectedRevenue = projectedConversions * aov;
  const revenueLift = projectedRevenue - currentRevenue;

  // Dynamic copy based on conversion numbers
  const getDynamicCTA = () => {
    if (revenueLift < 10000) {
      return "Let's capture this additional revenue";
    } else if (revenueLift < 50000) {
      return "Let's double these numbers together";
    } else {
      return "You are leaving major money on the table. Let's fix it!";
    }
  };

  return (
    <section id="roi" className="py-24 bg-[#fcfcf9] relative overflow-hidden">
      {/* Background spotlights */}
      <div className="absolute bottom-1/4 left-10 w-96 h-96 rounded-full bg-apex-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 right-10 w-96 h-96 rounded-full bg-apex-gold/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-apex-gold">
            ROI Estimator
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-normal tracking-tight text-[#111115] mt-2">
            Calculate Your Revenue Lift
          </h2>
          <p className="text-foreground/50 text-sm max-w-xl mx-auto mt-4 leading-relaxed">
            See how fixing your design, speed, and CTA hooks directly changes your agency bottom line.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="glass-panel rounded-3xl p-6 md:p-10 border border-foreground/5 relative overflow-hidden">
          {/* Top header decoration */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-apex-primary to-transparent" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            
            {/* Left Inputs Column */}
            <div className="flex flex-col gap-6">
              
              {/* Visitors Slider */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground/80 font-medium flex items-center gap-1.5">
                    Monthly Traffic
                  </span>
                  <span className="text-foreground font-bold bg-foreground/5 px-2.5 py-0.5 rounded border border-foreground/5 font-mono text-xs">
                    {visitors.toLocaleString()} visitors
                  </span>
                </div>
                <Slider
                  value={[visitors]}
                  onValueChange={(val: any) => setVisitors(val[0])}
                  min={100}
                  max={50000}
                  step={100}
                  className="py-2"
                />
                <div className="flex justify-between text-[9px] text-foreground/50 font-mono">
                  <span>100</span>
                  <span>25,000</span>
                  <span>50,000</span>
                </div>
              </div>

              {/* Conversion Rate Slider */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground/80 font-medium">
                    Current Conversion Rate
                  </span>
                  <span className="text-foreground font-bold bg-foreground/5 px-2.5 py-0.5 rounded border border-foreground/5 font-mono text-xs">
                    {conversionRate.toFixed(1)}%
                  </span>
                </div>
                <Slider
                  value={[conversionRate]}
                  onValueChange={(val: any) => setConversionRate(val[0])}
                  min={0.1}
                  max={10.0}
                  step={0.1}
                  className="py-2"
                />
                <div className="flex justify-between text-[9px] text-foreground/50 font-mono">
                  <span>0.1%</span>
                  <span>5.0%</span>
                  <span>10.0%</span>
                </div>
              </div>

              {/* AOV Input */}
              <div className="flex flex-col gap-2.5">
                <label className="text-xs text-foreground/75 font-semibold" htmlFor="aov">
                  Average Order Value (AOV) / Price (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40 font-mono text-sm">
                    ₹
                  </span>
                  <input
                    id="aov"
                    type="number"
                    value={aov === 0 ? "" : aov}
                    onChange={(e) => setAov(Number(e.target.value))}
                    className="w-full bg-[#ffffff] border border-foreground/10 hover:border-foreground/25 focus:border-apex-primary rounded-xl pl-9 pr-4 py-3 text-sm text-foreground font-medium outline-none transition-all font-mono"
                    placeholder="1,500"
                  />
                </div>
              </div>

            </div>

            {/* Right Output Column (Warm Light Gray Background) */}
            <div className="flex flex-col justify-between h-full bg-[#f4f4ec] border border-foreground/5 rounded-2xl p-6 md:p-8 relative">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <span className="text-[9px] font-bold tracking-wider text-apex-gold uppercase bg-apex-gold/10 px-2.5 py-0.5 rounded border border-apex-gold/20 flex items-center gap-1.5 w-fit">
                    <Sparkles className="size-3" /> Projected +30% Design Lift
                  </span>
                  <h4 className="text-xs font-semibold text-foreground/50 mt-4 uppercase tracking-wider">
                    Additional Monthly Revenue
                  </h4>
                </div>
                <div className="text-apex-primary p-2 bg-apex-primary/5 border border-apex-primary/10 rounded-xl">
                  <TrendingUp className="size-5" />
                </div>
              </div>

              <div className="mb-8">
                <div className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground font-mono">
                  ₹<AnimatedCount value={revenueLift} />
                </div>
                <p className="text-[11px] text-foreground/50 mt-2 leading-relaxed">
                  Estimated increase based on relative 30% conversion optimization.
                </p>
              </div>

              <div className="space-y-3 pt-6 border-t border-foreground/10 text-xs text-foreground/50">
                <div className="flex justify-between">
                  <span>Current Revenue:</span>
                  <span className="font-mono text-foreground/80">₹{currentRevenue.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Projected Revenue:</span>
                  <span className="font-mono text-foreground/80">₹{projectedRevenue.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="mt-8">
                <Button
                  onClick={() => {
                    const contactEl = document.querySelector("#contact");
                    if (contactEl) {
                      contactEl.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="w-full bg-black hover:bg-black/90 text-white font-semibold rounded-xl py-5.5 flex items-center justify-center gap-2 group transition-all cursor-pointer"
                >
                  <span>{getDynamicCTA()}</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
