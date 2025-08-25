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

                {/* Skills Preview */}
                <div className="max-w-4xl mx-auto">
                    <h3 className="text-xl font-medium text-white mb-8">What I Do</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 border border-gray-800 rounded-lg hover:border-white/20 transition-all duration-300">
                            <div className="text-center space-y-3">
                                <div className="p-3 bg-white/5 rounded-lg w-fit mx-auto">
                                    <span className="text-white text-2xl">⚡</span>
                                </div>
                                <div>
                                    <h4 className="text-white font-medium text-lg mb-2">Web Development</h4>
                                    <p className="text-gray-400 text-sm">Full-stack applications with React, Next.js, Node.js</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 border border-gray-800 rounded-lg hover:border-white/20 transition-all duration-300">
                            <div className="text-center space-y-3">
                                <div className="p-3 bg-white/5 rounded-lg w-fit mx-auto">
                                    <span className="text-white text-2xl">🔧</span>
                                </div>
                                <div>
                                    <h4 className="text-white font-medium text-lg mb-2">Backend Systems</h4>
                                    <p className="text-gray-400 text-sm">APIs, databases, and scalable architectures</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 border border-gray-800 rounded-lg hover:border-white/20 transition-all duration-300">
                            <div className="text-center space-y-3">
                                <div className="p-3 bg-white/5 rounded-lg w-fit mx-auto">
                                    <span className="text-white text-2xl">🚀</span>
                                </div>
                                <div>
                                    <h4 className="text-white font-medium text-lg mb-2">DevOps</h4>
                                    <p className="text-gray-400 text-sm">Deployment, CI/CD, and cloud infrastructure</p>
                                </div>
                            </div>
                        </div>
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