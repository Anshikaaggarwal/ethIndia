import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, ArrowUpRight, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/input";

export const TradingModals = ({
  selectedTrader,
  showCopyModal,
  setShowCopyModal,
  copySettings,
  setCopySettings,
  handleMirrorTrades,
  handleStartMirroring,
  onCloseTraderModal,
}) => (
  <div>
    {/* Trader Performance Modal */}
    <Dialog
      open={!!selectedTrader && !showCopyModal}
      onOpenChange={(open) => !open && onCloseTraderModal()}
    >
      <DialogContent className="bg-gray-900 border-green-500/30 text-white max-w-5xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-3">
            <Trophy className="w-6 h-6 text-green-400" />
            Trader Performance – <span className="text-green-400 font-mono">{selectedTrader?.shortAddress}</span>
          </DialogTitle>
        </DialogHeader>

        {selectedTrader && (
          <div className="mt-6">
            {/* Summary Cards */}
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
          </div>
        )}
      </DialogContent>
    </Dialog>

    {/* Copy Trading Modal */}
    <Dialog open={showCopyModal} onOpenChange={(open) => !open && setShowCopyModal(false)}>
      <DialogContent className="bg-gray-900 border-green-500/30 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-3">
            <Target className="w-6 h-6 text-green-400" />
            Mirror Trades from <span className="text-green-400 font-mono">{selectedTrader?.shortAddress}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          <label className="block text-sm font-medium mb-2 text-green-400">Trading Category</label>
          <Select value={copySettings.category} onValueChange={(value) => setCopySettings({ ...copySettings, category: value })}>
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

          <label className="block text-sm font-medium mb-2 text-green-400">Number of Bets</label>
          <Input
            type="number"
            placeholder="e.g., 10"
            value={copySettings.numberOfBets}
            onChange={(e) => setCopySettings({ ...copySettings, numberOfBets: e.target.value })}
            className="bg-gray-800 border-green-500/30 text-white placeholder-gray-500"
          />

          <label className="block text-sm font-medium mb-2 text-green-400">Amount Per Bet (USDC)</label>
          <Input
            type="number"
            placeholder="e.g., 100"
            value={copySettings.amountPerBet}
            onChange={(e) => setCopySettings({ ...copySettings, amountPerBet: e.target.value })}
            className="bg-gray-800 border-green-500/30 text-white placeholder-gray-500"
          />

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
