"use client"
import { useState } from 'react';
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { toast } from 'sonner';

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
    <section className="p-4 md:p-5">
      <div className="mb-8 md:mb-10">
        <h1 className="font-handwritten text-3xl md:text-4xl">
          AI Services <br />
          <span className="relative inline-block">
            <span className="absolute inset-0 bg-blue-400 rotate-[-2deg] z-0"></span>
            <span className="relative z-10 px-1 font-bold">to help you win</span>
          </span><br className="hidden md:block" />
          on the internet.
        </h1>
        <p className="mt-4 text-sm md:text-base">
          i write a weekly letter called <strong>what i did this week</strong>
        </p>
      </div>
      <div className="space-y-2">
        <p className="text-sm md:text-base">You can subscribe below to get free access</p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-md">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 border border-gray-300 rounded shadow-inner px-4 py-2"
            disabled={loading}
          />
          <Button
            onClick={handleSubscribe}
            className="bg-gray-100 border border-gray-300 text-gray-800 shadow hover:bg-gray-200"
            disabled={loading}
          >
            {loading ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </div>
        <p className="text-gray-600 text-sm">
          <span className="text-blue-500 font-bold mr-1">22+</span>
          free startup ideas given since 2020
        </p>
      </div>
    </section>
  );
}