
'use client';

import { ConnectButton } from "@rainbow-me/rainbowkit";

// export default function Home() {
//   return (
//     <main className="flex flex-col items-center justify-center min-h-screen">
//       <h1 className="text-3xl font-bold mb-6">PredApp Prediction Market</h1>
//       <ConnectButton />
//     </main>
//   )
// }


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
import Chatbot from "@/components/Chatbot";
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
                <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-green-500/25">
                  Upgrade to Pro
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-800 py-12">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-400">
              © 2024 Polymarket Analytics. Built for traders, by traders.
            </p>
          </div>
        </footer>
      </div>

      <TraderDetailsModal 
        selectedTrader={selectedTrader}
        isOpen={selectedTrader && !showCopyModal}
        onClose={() => setSelectedTrader(null)}
        onMirrorTrades={handleMirrorTrades}
      />

      <CopyTradingModal
  selectedTrader={selectedTrader}
  isOpen={showCopyModal}
  onClose={() => setShowCopyModal(false)}
  copySettings={copySettings}
  setCopySettings={setCopySettings}
  onStartMirroring={handleStartMirroring}
/>
  <Chatbot />
    </div>
  );
}