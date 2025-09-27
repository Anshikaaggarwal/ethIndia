import React from 'react';
import { Button } from '@/components/ui/button';
import { BarChart3, Wallet } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center max-w-4xl mx-auto">
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-pulse">
            <BarChart3 className="w-10 h-10 text-white" />
          </div>
        </div>
        <h1 className="text-6xl md:text-7xl font-bold mb-6">
          <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
            Polymarket
          </span>
          <br />
          <span className="text-white">Leaderboard Analytics</span>
        </h1>
        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
          Track top performers, mirror successful strategies, and unlock advanced market insights 
          with real-time analytics and performance data.
        </p>
        <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-green-500/25">
          <Wallet className="w-5 h-5 mr-3" />
          Connect Wallet
        </Button>
      </div>
    </section>
  );
}