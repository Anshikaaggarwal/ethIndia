'use client';

import React, { useState } from 'react';
import HeroSection from '@/components/sections/HeroSection';
import AnalyticsCards from '@/components/sections/AnalyticsCard';
import LeaderboardSection from '@/components/sections/LeaderboardSection';
import PerformanceCharts from '@/components/sections/PerformanceCharts';
import TraderDetailsModal from '@/components/modals/TraderDetailModal';
import CopyTradingModal from '@/components/modals/CopyTradingModal';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3 } from 'lucide-react';
import { leaderboardData } from '@/components/data/mockData';
import { copyToClipboard } from '@/components/utils/helpers';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

export default function PolymarketAnalytics() {
  const [selectedTrader, setSelectedTrader] = useState(null);
  const [showCopyModal, setShowCopyModal] = useState(false);
  const [copySettings, setCopySettings] = useState({
    category: '',
    numberOfBets: '',
    amountPerBet: ''
  });
  const [copiedAddress, setCopiedAddress] = useState('');

  const handleCopyAddress = async (address) => {
    const success = await copyToClipboard(address);
    if (success) {
      setCopiedAddress(address);
      setTimeout(() => setCopiedAddress(''), 2000);
    }
  };

  const handleMirrorTrades = (trader) => {
    setSelectedTrader(trader);
    setShowCopyModal(true);
  };

  const handleStartMirroring = () => {
    console.log('Starting to mirror trades:', { trader: selectedTrader, settings: copySettings });
    setShowCopyModal(false);
    setSelectedTrader(null);
    setCopySettings({ category: '', numberOfBets: '', amountPerBet: '' });
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-green-400/10 to-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-emerald-500/5 to-green-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gray-900/20 to-transparent"
           style={{
             backgroundImage: `radial-gradient(circle at 1px 1px, rgba(34,197,94,0.1) 1px, transparent 0)`,
             backgroundSize: '50px 50px'
           }}>
      </div>

      <div className="relative z-10">
        <HeroSection />
        <AnalyticsCards />
        <LeaderboardSection 
          leaderboardData={leaderboardData}
          onSelectTrader={setSelectedTrader}
          onCopyAddress={handleCopyAddress}
          onMirrorTrades={handleMirrorTrades}
          copiedAddress={copiedAddress}
        />
        <PerformanceCharts />

        {/* Subscription Section */}
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
                <Button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105">
                  Subscribe
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Trader Detail Modal */}
        <TraderDetailsModal 
          selectedTrader={selectedTrader}
          isOpen={selectedTrader && !showCopyModal}
          onClose={() => setSelectedTrader(null)}
          onMirrorTrades={handleMirrorTrades}
        />

        {/* Copy Trading Modal */}
        <Dialog open={showCopyModal} onOpenChange={(open) => !open && setShowCopyModal(false)}>
          <DialogContent className="bg-black border-green-700 text-white rounded-xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                <span className="text-white">Mirror Trades from </span>
                <span className="text-green-400 font-mono">{selectedTrader?.address}</span>
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 mt-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Trading Category</label>
                <Select value={copySettings.category} onValueChange={(value) => setCopySettings({...copySettings, category: value})}>
                  <SelectTrigger className="bg-gray-900 border-green-700 text-white">
                    <SelectValue placeholder="Select category to mirror" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-green-700 text-white">
                    <SelectItem value="all">All Categories</SelectItem>
                    {selectedTrader?.categories?.map((cat) => (
                      <SelectItem key={cat.name} value={cat.name.toLowerCase()}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Number of Bets</label>
                <Input
                  type="number"
                  placeholder="e.g., 10"
                  value={copySettings.numberOfBets}
                  onChange={(e) => setCopySettings({...copySettings, numberOfBets: e.target.value})}
                  className="bg-gray-900 border-green-700 text-white placeholder-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Amount Per Bet (USDC)</label>
                <Input
                  type="number"
                  placeholder="e.g., 100"
                  value={copySettings.amountPerBet}
                  onChange={(e) => setCopySettings({...copySettings, amountPerBet: e.target.value})}
                  className="bg-gray-900 border-green-700 text-white placeholder-gray-500"
                />
              </div>

              <Button 
                onClick={handleStartMirroring}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 text-lg transition-all duration-300 transform hover:scale-105"
              >
                Start Mirroring Trades
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
