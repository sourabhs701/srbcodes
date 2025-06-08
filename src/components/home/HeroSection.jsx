"use client"
import { useState } from 'react';
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { toast } from 'sonner';
import { ArrowRight, Mail } from 'lucide-react';

export function HeroSection() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Subscription failed');
      }

      toast.success('Thank you for subscribing!');
      setEmail('');
    } catch (err) {
      toast.error(err.message || 'Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
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

      {/* Simple Stats */}
      <div className="grid grid-cols-3 gap-8 max-w-md pt-8 border-t border-gray-800">
        <div className="text-center">
          <div className="text-2xl font-bold text-white">22+</div>
          <div className="text-sm text-gray-400">Ideas Shared</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-white">3+</div>
          <div className="text-sm text-gray-400">Years Experience</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-white">100%</div>
          <div className="text-sm text-gray-400">Quality Focus</div>
        </div>
      </div>
    </section>
  );
}