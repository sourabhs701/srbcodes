import React from "react";
import { HeroSection } from "@/src/sections/HeroSection";
import { ContactSection } from "@/src/sections/ContactSection";
// import { LogoTicker } from "@/src/sections/LogoTicker";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Professional background grid */}

      {/* Main Content */}
      <div className="relative z-10">
        <section className="container mx-auto px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <HeroSection />
          </div>
        </section>

        {/* LogoTicker Section - Professional Spacing
        <section className="py-20 bg-gradient-to-b from-black to-gray-900/50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
                Trusted by Industry Leaders
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                I&apos;ve had the privilege of working with innovative companies
                and startups across various industries
              </p>
            </div>
            <LogoTicker />
          </div>
        </section> */}

        {/* Contact Section - Untouched as requested */}
        <section className="border-t border-gray-800">
          <ContactSection />
        </section>
      </div>
    </div>
  );
}
