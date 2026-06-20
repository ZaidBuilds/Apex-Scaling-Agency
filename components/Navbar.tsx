"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Technology", href: "#portfolio" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const topOffset = 90; // height of navbar offset
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed left-0 right-0 z-50 transition-all duration-300 w-full ${
          isScrolled
            ? "top-3 md:top-4"
            : "top-5 md:top-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between w-full">
          {/* Logo (Left) */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, "#home")}
            className="flex items-center gap-1.5 text-lg font-bold tracking-tight text-white group"
          >
            <span className="font-semibold text-white/90 group-hover:text-white transition-colors duration-300">apex</span>
            <span className="text-white font-extrabold">scaling</span>
            <span className="w-1.5 h-1.5 rounded-full bg-apex-gold animate-pulse"></span>
          </a>

          {/* Floating Pill Nav Links (Center) */}
          <div className="hidden md:flex items-center gap-7 bg-white/[0.02] border border-white/5 backdrop-blur-md px-6 py-2.5 rounded-full shadow-sm">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-xs font-semibold tracking-wide text-white/60 hover:text-white transition-colors duration-200 relative py-1"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop CTA Button (Right - White Pill) */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              onClick={(e) => {
                const contactEl = document.querySelector("#contact");
                if (contactEl) {
                  contactEl.scrollIntoView({ behavior: "smooth" });
                }
              }}
              variant="default"
              className="bg-white hover:bg-white/90 text-[#06040a] rounded-full px-5 py-5 font-semibold text-xs tracking-wider transition-all shadow-sm cursor-pointer border border-transparent flex items-center gap-1"
            >
              Get started
              <ArrowUpRight size={13} />
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white hover:text-apex-gold transition-colors p-1"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#06040a]/98 backdrop-blur-xl flex flex-col justify-center px-8 pt-24 pb-12 md:hidden"
          >
            <div className="flex flex-col gap-6 items-center">
              {navLinks.map((link, idx) => (
                <motion.a
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-xl font-bold text-white/80 hover:text-white transition-colors"
                >
                  {navLinks[idx].name}
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="w-full mt-6"
              >
                <Button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    const contactEl = document.querySelector("#contact");
                    if (contactEl) {
                      contactEl.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="w-full bg-white hover:bg-white/95 text-[#06040a] rounded-full py-6 font-semibold flex items-center justify-center gap-1.5"
                >
                  Get started
                  <ArrowUpRight size={15} />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
