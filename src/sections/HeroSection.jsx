"use client"
import { useState } from 'react';
import { Clock } from 'lucide-react';
import { NewsletterModal } from "@/src/components/NewsletterModal";

export function HeroSection() {
    const [showNewsletter, setShowNewsletter] = useState(false);

    return (
        <>
            <div className="text-center space-y-16">
                {/* Personal Introduction */}
                <div className="space-y-8">
                    {/* Greeting */}
                    <p className="text-lg text-gray-400 font-light tracking-wide">
                        Hello, I'm Sourabh
                    </p>

                    {/* Main Headline */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-light leading-[0.9] tracking-tight">
                        <span className="text-white">Full-Stack</span>
                        <br />
                        <span className="text-white">Developer</span>
                    </h1>

                    {/* Personal Description */}
                    <p className="text-xl md:text-2xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed">
                        I craft <span className="text-white font-medium">digital solutions</span> that help businesses grow.
                        <br />
                        <span className="text-gray-400">Specializing in modern web applications and scalable systems.</span>
                    </p>
                </div>

                {/* CTA Section */}
                <div className="space-y-8">
                    {/* Availability */}
                    <div className="flex justify-center items-center text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-white" />
                            <span>Available for new projects</span>
                        </div>
                    </div>

                    {/* Newsletter Trigger - Subtle Text Link */}
                    <div className="flex justify-center">
                        <button
                            onClick={() => setShowNewsletter(true)}
                            className="text-gray-400 hover:text-white transition-colors duration-200 underline decoration-gray-600 hover:decoration-white underline-offset-4"
                        >
                            Get notified about new opportunities and insights
                        </button>
                    </div>
                </div>


            </div>
            {/* Newsletter Modal */}
            <NewsletterModal
                isOpen={showNewsletter}
                onClose={() => setShowNewsletter(false)}
            />
        </>
    );
} 