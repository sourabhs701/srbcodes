"use client"
import { useState } from 'react';
import { SocialIcons } from "@/src/components/SocialIcons";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { toast } from 'sonner';
import { Code, Server, Zap, Award, ArrowRight, Mail } from 'lucide-react';
import Iridescence from "@/src/components/ui/Iridescence";
import Noise from "@/src/components/ui/Noise";

export function HeroSection() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const skills = [
        { icon: Code, label: "Full-Stack Development" },
        { icon: Server, label: "Backend Architecture" },
        { icon: Zap, label: "AI Integration" },
        { icon: Award, label: "Enterprise Solutions" }
    ];

    const handleSubscribe = async () => {
        if (!email.trim()) {
            toast.error("Please enter your email address");
            return;
        }

        if (!validateEmail(email)) {
            toast.error("Please enter a valid email address");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("/api/subscribe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: email.trim() }),
            });

            const data = await response.json();

            if (response.status === 200) {
                // More robust checking with trimming and multiple conditions
                const message = data.message?.trim();

                if (message === "You are already subscribed!" || message?.includes("already subscribed")) {
                    toast.info("You are already subscribed!");
                } else if (message === "Successfully subscribed!" || message?.includes("Successfully subscribed")) {
                    toast.success("Thanks for subscribing! 🎉");
                    setEmail("");
                } else {
                    toast.success(message || "Subscribed successfully!");
                    setEmail("");
                }
            } else {
                toast.error(data.error || "Something went wrong. Please try again.");
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
                {/* Left side - About Section */}
                <div className="lg:col-span-5 order-2 lg:order-1">
                    <div className="space-y-12">
                        {/* Profile Section */}
                        <div className="relative space-y-8 p-8 rounded-2xl overflow-hidden">
                            {/* Iridescence background */}
                            <Iridescence
                                color={[0.6, 0.3, 0.6]}
                                mouseReact={false}
                                amplitude={0.2}
                                speed={1.2}
                                className="absolute inset-0 w-full h-full z-0"
                            />

                            {/* Noise overlay */}
                            <div className="absolute inset-0 z-10">
                                <Noise
                                    patternSize={350}
                                    patternScaleX={1}
                                    patternScaleY={1}
                                    patternRefreshInterval={2}
                                    patternAlpha={25}
                                />
                            </div>

                            {/* Profile content with z-index to appear above backgrounds */}
                            <div className="relative z-20">
                                {/* Profile Info */}
                                <div className="text-center lg:text-left space-y-4">
                                    <h2 className="text-3xl font-bold text-white">Full-Stack Engineer</h2>
                                    <div className="space-y-4">
                                        <p className="text-lg text-gray-300 leading-relaxed">
                                            <span className="text-white font-medium">Engineer by trade</span>, designer at heart.
                                            I craft scalable, impactful software.
                                        </p>
                                        <p className="text-lg text-gray-300 leading-relaxed">
                                            Focused on <span className="text-blue-400 font-medium">Backend System Design</span> and
                                            <span className="text-blue-400 font-medium"> Devops</span>.
                                        </p>
                                    </div>
                                </div>


                                {/* Social Icons */}
                                <div className="flex justify-center lg:justify-start">
                                    <SocialIcons />
                                </div>
                            </div>
                        </div>

                        {/* Skills */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold text-white text-center lg:text-left">
                                Core Expertise
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {skills.map((skill, index) => {
                                    const IconComponent = skill.icon;
                                    return (
                                        <div
                                            key={index}
                                            className="flex items-center gap-3 p-4 border border-gray-800 rounded-lg hover:border-gray-700 transition-colors duration-200"
                                        >
                                            <div className="p-2 bg-gray-900 rounded">
                                                <IconComponent className="w-5 h-5 text-blue-500" />
                                            </div>
                                            <span className="text-gray-300 font-medium">{skill.label}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right side - Hero Content */}
                <div className="lg:col-span-7 order-1 lg:order-2">
                    <section className="space-y-12">
                        {/* Main Heading */}
                        <div className="space-y-8">
                            <h1 className="text-5xl md:text-7xl font-bold leading-[0.9] tracking-tight">
                                <span className="text-white">SRB</span>
                                <span className="text-blue-500"> CODES</span>
                                <br />
                                <span className="text-gray-400 text-4xl md:text-6xl font-light">
                                    so you don't have to
                                </span>
                            </h1>

                            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl leading-relaxed font-light">
                                Premium development services for businesses who demand excellence.
                                From scalable systems to intelligent automation.
                            </p>
                        </div>

                        {/* Newsletter Section */}
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Mail className="w-6 h-6 text-blue-500" />
                                    <h3 className="text-xl font-semibold text-white">Weekly Insights</h3>
                                </div>

                                <p className="text-gray-300 text-lg leading-relaxed max-w-xl">
                                    Join <span className="text-white font-medium">22+ entrepreneurs</span> getting
                                    exclusive startup ideas and technical insights.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 max-w-lg">
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="h-12 bg-gray-900 border-gray-700 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    disabled={loading}
                                />
                                <Button
                                    onClick={handleSubscribe}
                                    className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-medium border-0 transition-colors duration-200"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            <span>Subscribing...</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <span>Subscribe</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    )}
                                </Button>
                            </div>

                            <p className="text-sm text-gray-500">
                                Free forever • No spam • Unsubscribe anytime
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
} 