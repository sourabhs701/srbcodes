import React from "react";
import { AboutSection } from "@/src/components/home/AboutSection";
import { HeroSection } from "@/src/components/home/HeroSection";
import { SocialSection } from "@/src/components/home/SocialSection";
import { ContactSection } from "@/src/components/home/ContactSection";

function RightSide() {
  return (
    <div>
      <HeroSection />
      <SocialSection />
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <div className="p-4 md:p-10 flex justify-center">
        <div className="flex flex-col md:flex-row gap-8 md:gap-10">
          <AboutSection />
          <div className="md:flex-1">
            <RightSide />
          </div>
        </div>
      </div>
      <ContactSection />
    </>
  );
}
