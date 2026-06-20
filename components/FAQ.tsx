"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is included in the ₹10,000 Starter package?",
    answer: "The Starter package includes a fully responsive 5-page website, basic SEO setup (meta tags, site description, schema markup), a working contact form, social links integration, and standard styling. It's ideal for local businesses, shops, cafes, and personal portfolios.",
  },
  {
    question: "Do you offer domain name registration and hosting?",
    answer: "We assist you in selecting and linking your custom domain (e.g., from Namecheap or Cloudflare) to Vercel hosting. Vercel hosting is free for standard traffic tiers, meaning you won't have to pay recurring monthly hosting fees for a basic marketing website.",
  },
  {
    question: "How long does a standard website project take to deliver?",
    answer: "A Starter website (5 pages) is delivered in 7 to 10 days. More complex interactive projects under the Growth package take 12 to 15 days. Custom 3D applications or full e-commerce setups take 20 to 30 days.",
  },
  {
    question: "Can I manage and update content on my site after launch?",
    answer: "Yes! We can configure a headless Notion CMS. This allows you to update text, photos, services, or case studies directly from your personal Notion page without ever touching a line of code. Updates sync to the website in real-time.",
  },
  {
    question: "What is your development stack, and why next.js?",
    answer: "We build all websites using Next.js 15, Tailwind CSS, and Framer Motion/GSAP. Next.js is selected because it compiles static pages that load under 1.5 seconds, has excellent out-of-the-box SEO rankings, and supports modern interactions far better than WordPress or Wix.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-[#fcfcf9] relative overflow-hidden">
      {/* Background radial spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-apex-primary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-apex-gold">
            Common Questions
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-normal tracking-tight text-[#111115] mt-2">
            Frequently Asked Questions
          </h2>
          <p className="text-foreground/50 text-sm max-w-xl mx-auto mt-4 leading-relaxed">
            Everything you need to know about our digital design services, technical stacks, pricing, and project workflows.
          </p>
        </div>

        {/* Accordion List */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="glass-panel rounded-2xl border border-foreground/5 hover:border-foreground/10 hover:shadow-sm transition-all duration-300 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 text-[#111115] hover:text-apex-primary transition-colors focus:outline-none cursor-pointer"
                >
                  <span className="font-semibold text-sm md:text-base">{faq.question}</span>
                  <div className="shrink-0 p-1.5 rounded-full bg-foreground/5 border border-foreground/5 text-foreground/50">
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-1 text-xs md:text-sm text-foreground/60 leading-relaxed border-t border-foreground/5">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
