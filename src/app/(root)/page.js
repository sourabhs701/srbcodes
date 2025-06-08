import React from "react";
import { AboutSection } from "@/src/components/home/AboutSection";
import { HeroSection } from "@/src/components/home/HeroSection";
import { SocialSection } from "@/src/components/home/SocialSection";
import { ContactSection } from "@/src/components/home/ContactSection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Minimal background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-6 pb-16 pt-8 md:pb-24 md:pt-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
              {/* Left side - About Section */}
              <div className="lg:col-span-5 order-2 lg:order-1">
                <AboutSection />
              </div>

              {/* Right side - Hero Content */}
              <div className="lg:col-span-7 order-1 lg:order-2">
                <HeroSection />
                <div className="mt-12">{/* <SocialSection /> */}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="border-t border-gray-800">
          <ContactSection />
        </section>
      </div>
    </div>
  );
}
