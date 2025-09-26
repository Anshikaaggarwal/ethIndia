/*
Setup Instructions:
1. Run: npx create-next-app@latest my-app
2. cd my-app
3. Install dependencies:
   npm install tailwindcss class-variance-authority lucide-react @radix-ui/react-slot @radix-ui/react-dialog @radix-ui/react-select
   npm install -D shadcn-ui
4. Setup shadcn/ui: npx shadcn-ui@latest init
5. Add components: npx shadcn-ui@latest add button card dialog input select
6. Replace the main page with this component
*/

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Trophy, 
  TrendingUp, 
  Copy, 
  Wallet, 
  BarChart3, 
  Users, 
  DollarSign, 
  Activity,
  CheckCircle,
  ArrowUpRight,
  PieChart,
  Target
} from 'lucide-react';

const PolymarketAnalytics = () => {
  const [selectedTrader, setSelectedTrader] = useState(null);
  const [showCopyModal, setShowCopyModal] = useState(false);
  const [copySettings, setCopySettings] = useState({
    category: '',
    numberOfBets: '',
    amountPerBet: ''
  });
  const [copiedAddress, setCopiedAddress] = useState('');

  // Mock data
  const leaderboardData = [
    {
      address: '0xa1b2c3d4e5f67890',
      shortAddress: '0xa1b2...7890',
      pnl30d: '+$47,832',
      pnl7d: '+$12,456',
      pnl1d: '+$3,241',
      profit30d: 89.4,
      totalVolume: '$156,780',
      winRate: 73.2,
      categories: [
        { name: 'Sports', pnl: 92.3, volume: '$45,230', trades: 127 },
        { name: 'Politics', pnl: 78.1, volume: '$38,920', trades: 89 },
        { name: 'Finance', pnl: 65.7, volume: '$28,430', trades: 156 },
        { name: 'Crypto', pnl: 54.2, volume: '$44,200', trades: 203 }
      ]
    },
    {
      address: '0xe5f6g7h8i9j01234',
      shortAddress: '0xe5f6...1234',
      pnl30d: '+$38,921',
      pnl7d: '+$9,834',
      pnl1d: '+$2,187',
      profit30d: 67.8,
      totalVolume: '$128,450',
      winRate: 68.9,
      categories: [
        { name: 'Crypto', pnl: 85.6, volume: '$52,340', trades: 178 },
        { name: 'Politics', pnl: 71.2, volume: '$31,850', trades: 92 },
        { name: 'Sports', pnl: 58.4, volume: '$27,190', trades: 134 },
        { name: 'Finance', pnl: 45.8, volume: '$17,070', trades: 67 }
      ]
    },
    {
      address: '0xk1l2m3n4o5p67890',
      shortAddress: '0xk1l2...7890',
      pnl30d: '+$29,456',
      pnl7d: '+$7,823',
      pnl1d: '+$1,654',
      profit30d: 52.3,
      totalVolume: '$98,760',
      winRate: 64.5,
      categories: [
        { name: 'Finance', pnl: 76.9, volume: '$35,670', trades: 145 },
        { name: 'Sports', pnl: 61.3, volume: '$29,450', trades: 112 },
        { name: 'Politics', pnl: 48.7, volume: '$18,340', trades: 78 },
        { name: 'Crypto', pnl: 39.2, volume: '$15,300', trades: 89 }
      ]
    },
    {
      address: '0xq7r8s9t0u1v23456',
      shortAddress: '0xq7r8...3456',
      pnl30d: '+$22,187',
      pnl7d: '+$6,234',
      pnl1d: '+$1,287',
      profit30d: 41.7,
      totalVolume: '$78,920',
      winRate: 59.8,
      categories: [
        { name: 'Politics', pnl: 69.4, volume: '$31,240', trades: 98 },
        { name: 'Crypto', pnl: 55.1, volume: '$23,890', trades: 124 },
        { name: 'Sports', pnl: 42.6, volume: '$15,670', trades: 87 },
        { name: 'Finance', pnl: 31.9, volume: '$8,120', trades: 45 }
      ]
    },
    {
      address: '0xw5x6y7z8a9b01234',
      shortAddress: '0xw5x6...1234',
      pnl30d: '+$18,943',
      pnl7d: '+$4,876',
      pnl1d: '+$987',
      profit30d: 34.8,
      totalVolume: '$65,430',
      winRate: 56.2,
      categories: [
        { name: 'Sports', pnl: 58.7, volume: '$26,180', trades: 156 },
        { name: 'Finance', pnl: 47.3, volume: '$19,450', trades: 78 },
        { name: 'Crypto', pnl: 38.9, volume: '$12,340', trades: 91 },
        { name: 'Politics', pnl: 25.4, volume: '$7,460', trades: 34 }
      ]
    }
  ];

  const copyToClipboard = async (address) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedAddress(address);
      setTimeout(() => setCopiedAddress(''), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
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
        {/* Hero Section */}
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

        {/* Analytics Cards Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="bg-gray-900/60 border-green-500/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-400 text-sm font-medium">Total Volume</p>
                    <p className="text-2xl font-bold text-white">$2.4M</p>
                    <p className="text-xs text-gray-400">+12.5% vs last month</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/60 border-green-500/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-400 text-sm font-medium">Active Traders</p>
                    <p className="text-2xl font-bold text-white">1,247</p>
                    <p className="text-xs text-gray-400">+8.3% vs last week</p>
                  </div>
                  <Users className="w-8 h-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/60 border-green-500/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-400 text-sm font-medium">Avg Win Rate</p>
                    <p className="text-2xl font-bold text-white">68.4%</p>
                    <p className="text-xs text-gray-400">Top 10 performers</p>
                  </div>
                  <Target className="w-8 h-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/60 border-green-500/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-400 text-sm font-medium">Market Activity</p>
                    <p className="text-2xl font-bold text-white">High</p>
                    <p className="text-xs text-gray-400">34.2k trades today</p>
                  </div>
                  <Activity className="w-8 h-8 text-green-400 animate-pulse" />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Leaderboard Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-white">Top </span>
              <span className="text-green-400">Performers</span>
            </h2>
            <p className="text-gray-300 text-lg">Track and mirror the most successful prediction market traders</p>
          </div>

          <Card className="bg-gray-900/50 border-green-500/20 backdrop-blur-sm">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="text-left p-6 text-green-400 font-semibold">Rank</th>
                      <th className="text-left p-6 text-green-400 font-semibold">Address</th>
                      <th className="text-left p-6 text-green-400 font-semibold">30D P&L</th>
                      <th className="text-left p-6 text-green-400 font-semibold">7D P&L</th>
                      <th className="text-left p-6 text-green-400 font-semibold">1D P&L</th>
                      <th className="text-left p-6 text-green-400 font-semibold">Win Rate</th>
                      <th className="text-left p-6 text-green-400 font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboardData.map((trader, index) => (
                      <tr key={trader.address} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors duration-200">
                        <td className="p-6">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                              <span className="text-black font-bold text-sm">#{index + 1}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="flex items-center gap-3">
                            <button 
                              onClick={() => setSelectedTrader(trader)}
                              className="text-green-400 hover:text-green-300 font-mono text-sm bg-gray-800/50 px-3 py-1 rounded-lg hover:bg-gray-700/50 transition-all duration-200"
                            >
                              {trader.shortAddress}
                            </button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(trader.address)}
                              className="h-8 w-8 p-0 hover:bg-gray-800/50"
                            >
                              {copiedAddress === trader.address ? 
                                <CheckCircle className="w-4 h-4 text-green-400" /> : 
                                <Copy className="w-4 h-4 text-gray-400 hover:text-green-400" />
                              }
                            </Button>
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-green-400" />
                            <span className="text-green-400 font-semibold">{trader.pnl30d}</span>
                            <span className="text-xs text-gray-500">({trader.profit30d.toFixed(1)}%)</span>
                          </div>
                        </td>
                        <td className="p-6">
                          <span className="text-green-400 font-semibold">{trader.pnl7d}</span>
                        </td>
                        <td className="p-6">
                          <span className="text-green-400 font-semibold">{trader.pnl1d}</span>
                        </td>
                        <td className="p-6">
                          <span className="text-white font-semibold">{trader.winRate}%</span>
                        </td>
                        <td className="p-6">
                          <Button 
                            onClick={() => handleMirrorTrades(trader)}
                            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
                          >
                            <ArrowUpRight className="w-4 h-4 mr-2" />
                            Mirror Trades
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Performance Charts Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-gray-900/60 border-green-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-green-400">
                  <PieChart className="w-5 h-5" />
                  Category Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Sports</span>
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div className="w-3/4 h-full bg-gradient-to-r from-green-400 to-emerald-500"></div>
                      </div>
                      <span className="text-green-400 font-semibold">34%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Politics</span>
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div className="w-1/2 h-full bg-gradient-to-r from-green-400 to-emerald-500"></div>
                      </div>
                      <span className="text-green-400 font-semibold">28%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Crypto</span>
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div className="w-2/5 h-full bg-gradient-to-r from-green-400 to-emerald-500"></div>
                      </div>
                      <span className="text-green-400 font-semibold">23%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Finance</span>
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div className="w-1/4 h-full bg-gradient-to-r from-green-400 to-emerald-500"></div>
                      </div>
                      <span className="text-green-400 font-semibold">15%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/60 border-green-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-green-400">
                  <Trophy className="w-5 h-5" />
                  Top Performing Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                      <span className="text-black font-bold">1</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">Sports Betting</h3>
                      <p className="text-gray-400 text-sm">Average ROI: +67.8%</p>
                    </div>
                    <span className="text-green-400 font-bold">+$234K</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                      <span className="text-black font-bold">2</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">Politics</h3>
                      <p className="text-gray-400 text-sm">Average ROI: +54.2%</p>
                    </div>
                    <span className="text-green-400 font-bold">+$189K</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                      <span className="text-black font-bold">3</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">Crypto</h3>
                      <p className="text-gray-400 text-sm">Average ROI: +41.6%</p>
                    </div>
                    <span className="text-green-400 font-bold">+$156K</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

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

      {/* Trader Details Modal */}
      <Dialog open={selectedTrader && !showCopyModal} onOpenChange={(open) => !open && setSelectedTrader(null)}>
        <DialogContent className="bg-gray-900 border-green-500/30 text-white max-w-5xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-3">
              <Trophy className="w-6 h-6 text-green-400" />
              <span className="text-white">Trader Performance – </span>
              <span className="text-green-400 font-mono">{selectedTrader?.shortAddress}</span>
            </DialogTitle>
          </DialogHeader>
          {selectedTrader && (
            <div className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <Card className="bg-gray-800/50 border-green-500/20">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-400">{selectedTrader.pnl30d}</div>
                    <div className="text-sm text-gray-400">30 Days P&L</div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-800/50 border-green-500/20">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-white">{selectedTrader.winRate}%</div>
                    <div className="text-sm text-gray-400">Win Rate</div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-800/50 border-green-500/20">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-white">{selectedTrader.totalVolume}</div>
                    <div className="text-sm text-gray-400">Total Volume</div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-800/50 border-green-500/20">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-white">{selectedTrader.categories.reduce((sum, cat) => sum + cat.trades, 0)}</div>
                    <div className="text-sm text-gray-400">Total Trades</div>
                  </CardContent>
                </Card>
              </div>

              <h3 className="text-xl font-bold mb-4 text-green-400">Category Performance</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left p-4 text-green-400 font-semibold">Category</th>
                      <th className="text-left p-4 text-green-400 font-semibold">% P&L</th>
                      <th className="text-left p-4 text-green-400 font-semibold">Volume</th>
                      <th className="text-left p-4 text-green-400 font-semibold">Trades</th>
                      <th className="text-left p-4 text-green-400 font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedTrader.categories
                      .sort((a, b) => b.pnl - a.pnl)
                      .map((category) => (
                        <tr key={category.name} className="border-b border-gray-700/50 hover:bg-gray-800/30 transition-colors duration-200">
                          <td className="p-4">
                            <span className="font-semibold">{category.name}</span>
                          </td>
                          <td className="p-4">
                            <span className="text-green-400 font-semibold">+{category.pnl}%</span>
                          </td>
                          <td className="p-4">
                            <span className="text-gray-300">{category.volume}</span>
                          </td>
                          <td className="p-4">
                            <span className="text-gray-300">{category.trades}</span>
                          </td>
                          <td className="p-4">
                            <Button 
                              onClick={() => handleMirrorTrades(selectedTrader)}
                              size="sm"
                              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold transition-all duration-300 transform hover:scale-105"
                            >
                              <ArrowUpRight className="w-4 h-4 mr-2" />
                              Mirror
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Copy Trading Modal */}
      <Dialog open={showCopyModal} onOpenChange={(open) => !open && setShowCopyModal(false)}>
        <DialogContent className="bg-gray-900 border-green-500/30 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-3">
              <Target className="w-6 h-6 text-green-400" />
              <span className="text-white">Mirror Trades from </span>
              <span className="text-green-400 font-mono">{selectedTrader?.shortAddress}</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 mt-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-green-400">Trading Category</label>
              <Select value={copySettings.category} onValueChange={(value) => setCopySettings({...copySettings, category: value})}>
                <SelectTrigger className="bg-gray-800 border-green-500/30 text-white">
                  <SelectValue placeholder="Select category to mirror" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-green-500/30 text-white">
                  <SelectItem value="all">All Categories</SelectItem>
                  {selectedTrader?.categories.map((cat) => (
                    <SelectItem key={cat.name} value={cat.name.toLowerCase()}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-green-400">Number of Bets</label>
              <Input
                type="number"
                placeholder="e.g., 10"
                value={copySettings.numberOfBets}
                onChange={(e) => setCopySettings({...copySettings, numberOfBets: e.target.value})}
                className="bg-gray-800 border-green-500/30 text-white placeholder-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-green-400">Amount Per Bet (USDC)</label>
              <Input
                type="number"
                placeholder="e.g., 100"
                value={copySettings.amountPerBet}
                onChange={(e) => setCopySettings({...copySettings, amountPerBet: e.target.value})}
                className="bg-gray-800 border-green-500/30 text-white placeholder-gray-500"
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
  );
};

export default PolymarketAnalytics;