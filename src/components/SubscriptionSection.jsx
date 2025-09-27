import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SubscriptionSection = () => (
  <section className="container mx-auto px-4 py-16">
    <Card className="bg-gradient-to-r from-gray-900/80 via-gray-800/80 to-gray-900/80 border-green-500/30 backdrop-blur-sm max-w-4xl mx-auto">
      <CardContent className="p-12 text-center">
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-4">
          <span className="text-white">Unlock Full Analytics & </span>
          <span className="text-green-400">Deep Category Insights</span>
        </h2>
        <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
          Get access to advanced trader analytics, real-time alerts, historical performance data, 
          and detailed category breakdowns to maximize your trading potential.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <div className="text-left">
            <div className="text-3xl font-bold text-white mb-1">$29<span className="text-lg text-gray-400">/month</span></div>
            <div className="text-sm text-gray-400">Cancel anytime</div>
          </div>
          <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-green-500/25">
            Upgrade to Pro
          </Button>
        </div>
      </CardContent>
    </Card>
  </section>
);

export default SubscriptionSection;
