"use client"
import { useState } from 'react';
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { toast } from 'sonner';
import { ArrowRight, Mail, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function NewsletterModal({ isOpen, onClose }) {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

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
                const message = data.message?.trim();

                if (message === "You are already subscribed!" || message?.includes("already subscribed")) {
                    toast.info("You are already subscribed!");
                } else if (message === "Successfully subscribed!" || message?.includes("Successfully subscribed")) {
                    toast.success("Thanks for subscribing! 🎉");
                    setEmail("");
                    onClose();
                } else {
                    toast.success(message || "Subscribed successfully!");
                    setEmail("");
                    onClose();
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
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="relative w-full max-w-md bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden"
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors duration-200"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Modal Content */}
                            <div className="p-8">
                                {/* Header */}
                                <div className="text-center mb-6">
                                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Mail className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-semibold text-white mb-2">
                                        Stay in the Loop
                                    </h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        Get notified about new projects, tech insights, and exclusive opportunities
                                    </p>
                                </div>

                                {/* Form */}
                                <div className="space-y-4">
                                    <Input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email address"
                                        className="h-12 bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-white focus:ring-2 focus:ring-white/25"
                                        disabled={loading}
                                    />
                                    <Button
                                        onClick={handleSubscribe}
                                        className="w-full h-12 bg-white hover:bg-gray-100 text-black font-medium border-0 transition-all duration-200"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                                                <span>Subscribing...</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <span>Subscribe Now</span>
                                                <ArrowRight className="w-4 h-4" />
                                            </div>
                                        )}
                                    </Button>
                                </div>

                                {/* Footer */}
                                <div className="mt-6 text-center">
                                    <p className="text-xs text-gray-500">
                                        No spam • Unsubscribe anytime • Your data is safe
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
