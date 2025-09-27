import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Copy, CheckCircle, ArrowUpRight } from 'lucide-react';

export default function LeaderboardSection({ 
  leaderboardData, 
  onSelectTrader, 
  onCopyAddress, 
  onMirrorTrades, 
  copiedAddress 
}) {
  return (
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
                        <div className="w-8 h-8 bg-gradient-to-r  rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">#{index + 1}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => onSelectTrader(trader)}
                          className="text-white  font-mono text-sm bg-gray-800/50 px-3 py-1 rounded-lg hover:bg-gray-700/50 transition-all duration-200"
                        >
                          {trader.shortAddress}
                        </button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onCopyAddress(trader.address)}
                          className="h-8 w-8 p-0 hover:bg-gray-800/50"
                        >
                          {copiedAddress === trader.address ? 
                            <CheckCircle className="w-4 h-4 " /> : 
                            <Copy className="w-4 h-4 text-black-400 " />
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
                        onClick={() => onMirrorTrades(trader)}
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
  );
}