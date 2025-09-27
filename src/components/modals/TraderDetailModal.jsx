import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, ArrowUpRight } from 'lucide-react';

export default function TraderDetailsModal({ selectedTrader, isOpen, onClose, onMirrorTrades }) {
  if (!selectedTrader) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-gray-900 border-green-500/30 text-white max-w-5xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-3">
            <Trophy className="w-6 h-6 text-green-400" />
            <span className="text-white">Trader Performance – </span>
            <span className="text-green-400 font-mono">{selectedTrader.shortAddress}</span>
          </DialogTitle>
        </DialogHeader>
        
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
                <div className="text-2xl font-bold text-white">
                  {selectedTrader.categories.reduce((sum, cat) => sum + cat.trades, 0)}
                </div>
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
                          onClick={() => onMirrorTrades(selectedTrader)}
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
      </DialogContent>
    </Dialog>
  );
}