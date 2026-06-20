"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import HeroMarketing3D from "@/components/HeroMarketing3D";
import AboutAgency from "@/components/AboutAgency";
import Capabilities from "@/components/Capabilities";
import ClientsGrid from "@/components/ClientsGrid";
import Footer from "@/components/Footer";

// Load the 3D Canvas dynamically to prevent hydration errors and optimize page load
const Hero3DCanvas = dynamic(() => import("@/components/Hero3DCanvas"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 z-[-1] bg-[#06040a] flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin" />
    </div>
  ),
});

export default function Home() {
  return (
    <div className="relative min-h-screen w-full flex flex-col bg-[#06040a]">
      {/* Global Scroll-Linked 3D Canvas Background */}
      <Hero3DCanvas />

      {/* 1. Floating Pill Navbar */}
      <Navbar />

      <main className="flex-1 w-full relative z-10">
        {/* 2. Interactive 3D Torus Knot Helix Hero */}
        <HeroMarketing3D />

        {/* 3. Large Editorial About Statement */}
        <AboutAgency />

        {/* 4. Capabilities Cards Grid */}
        <Capabilities />

        {/* 5. Split Partners & Tech Stack Grid */}
        <ClientsGrid />
      </main>

      {/* 6. Contact Footer & Clipboard Email Tooltip */}
      <Footer />
    </div>
  );
}
