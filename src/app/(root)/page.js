import React from "react";
import { HeroSection } from "@/src/sections/HeroSection";
import { ContactSection } from "@/src/sections/ContactSection";
import { LogoTicker } from "@/src/sections/LogoTicker";
export default function HomePage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Minimal background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-6 pb-16 pt-8 md:pb-24 md:pt-8">
          <HeroSection />
        </section>
        {/* <LogoTicker /> */}
        {/* Contact Section */}
        <section className="border-t border-gray-800">
          <ContactSection />
        </section>
      </div>
    </div>
  );
}
