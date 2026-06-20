"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowUpRight, Copy, Check } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const emailAddress = "collab.zaidbuilds@gmail.com";
  const [copied, setCopied] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(emailAddress);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = emailAddress;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const topOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (!contentRef.current) return;
    const items = contentRef.current.children;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="border-t border-white/5 bg-transparent pt-28 pb-10 relative overflow-hidden px-6"
    >
      {/* Background Decorative spotlight */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-white/[0.01] blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto flex flex-col gap-20">
        
        {/* Top Footer Callout */}
        <div ref={contentRef} className="flex flex-col gap-6 max-w-2xl">
          <span className="text-[10px] font-bold tracking-widest text-apex-gold uppercase font-mono opacity-0">
            / GET IN TOUCH
          </span>
          <h3 className="text-3xl sm:text-5xl font-serif text-white leading-[1.12] opacity-0">
            Ready to <em className="italic text-apex-gold font-normal">scale</em> your digital presence?
          </h3>
          <p className="text-white/50 text-xs leading-relaxed max-w-md opacity-0">
            Speak to your new design and development team today. Click below to copy our contact email.
          </p>

          {/* Interactive Copy-to-Clipboard Email Widget */}
          <div className="pt-2 opacity-0">
            <button
              onClick={handleCopyEmail}
              className="relative inline-flex items-center gap-3 py-1 cursor-pointer text-white/40 hover:text-white transition-colors duration-200 focus:outline-none group text-lg sm:text-2xl font-mono select-none"
              aria-label="Copy email address"
            >
              <span className="relative pb-1">
                {emailAddress}
                {/* Underline Hover Animation */}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </span>
              
              {/* Copy Icon Indicator */}
              <div className="size-8 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-center text-white/30 group-hover:text-white group-hover:bg-white/[0.05] transition-all">
                {copied ? <Check size={14} className="text-[#ebd1a0]" /> : <Copy size={14} />}
              </div>

              {/* Tooltip Balloon */}
              <span
                className={`absolute left-0 -top-10 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white transition-all duration-200 pointer-events-none ${
                  copied
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-2 scale-95"
                }`}
              >
                Email Copied!
              </span>
            </button>
          </div>
        </div>

        {/* Links Grid & Brand Details */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pt-12 border-t border-white/5">
          
          {/* Logo and Tagline */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-1.5 text-lg font-bold tracking-tight text-white">
              <span>apex</span>
              <span className="text-white font-extrabold">scaling</span>
              <span className="w-1.5 h-1.5 rounded-full bg-apex-gold"></span>
            </div>
            <p className="text-white/45 text-xs max-w-xs leading-relaxed">
              We design and build high-performance websites from India & the Gulf. Delivering conversion engines for startups, founders, and small enterprises.
            </p>
          </div>

          {/* Nav Links Column */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/40 font-mono">Navigation</h4>
            <ul className="flex flex-col gap-2.5 text-xs text-white/60">
              <li>
                <a href="#services" onClick={(e) => handleLinkClick(e, "#services")} className="hover:text-white transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#portfolio" onClick={(e) => handleLinkClick(e, "#portfolio")} className="hover:text-white transition-colors">
                  Partners & Tech
                </a>
              </li>
              <li>
                <a href="https://wa.me/917303030707?text=Hi%20Apex%20Scaling%2C%20I'd%20like%20to%20get%20a%20free%20quote." target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  WhatsApp Direct <ArrowUpRight size={12} />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/40 font-mono">Location</h4>
            <p className="text-xs text-white/60 leading-relaxed">
              Mumbai, India & Gulf region.<br />
              Remote collaboration worldwide.
            </p>
          </div>

        </div>

        {/* Copyright Footer Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-white/30 border-t border-white/5 pt-8">
          <p>© {currentYear} Apex Scaling. All rights reserved.</p>
          <p className="font-mono">Precision code. Premium design.</p>
        </div>

      </div>
    </footer>
  );
}
