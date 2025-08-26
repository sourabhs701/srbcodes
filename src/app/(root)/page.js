import React from "react";
import { HeroSection } from "@/src/sections/HeroSection";
import { ContactCard } from "@/src/sections/ContactSection";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <div className="relative z-10">
        <section className="container mx-auto px-6 py-20">
          <HeroSection />
        </section>
        <section className="border-t border-gray-800">
          <ContactCard />
        </section>
      </div>
    </div>
  );
}
