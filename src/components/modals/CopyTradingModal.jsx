'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function CopyTradingModal({
  selectedTrader,
  isOpen,
  onClose,
  copySettings,
  setCopySettings,
  onStartMirroring
}) {
  if (!selectedTrader) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black border-green-700 text-white rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            <span className="text-white">Mirror Trades from </span>
            <span className="text-green-400 font-mono">{selectedTrader.address}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Trading Category Dropdown */}
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2 text-gray-300">Trading Category</label>
              <Select
                value={copySettings.category}
                onValueChange={(value) => setCopySettings({ ...copySettings, category: value })}
              >
                <SelectTrigger className="bg-gray-900 border-green-700 text-white w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-green-700 text-white">
                  <SelectItem value="all">All Categories</SelectItem>
                  {selectedTrader.categories?.map((cat) => (
                    <SelectItem key={cat.name} value={cat.name.toLowerCase()}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Number of Bets Input */}
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2 text-gray-300">Number of Bets</label>
              <Input
                type="number"
                placeholder="e.g., 10"
                value={copySettings.numberOfBets}
                onChange={(e) => setCopySettings({ ...copySettings, numberOfBets: e.target.value })}
                className="bg-gray-900 border-green-700 text-white placeholder-gray-500 w-full"
              />
            </div>

            {/* Amount Per Bet Input */}
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2 text-gray-300">Amount Per Bet (USDC)</label>
              <Input
                type="number"
                placeholder="e.g., 100"
                value={copySettings.amountPerBet}
                onChange={(e) => setCopySettings({ ...copySettings, amountPerBet: e.target.value })}
                className="bg-gray-900 border-green-700 text-white placeholder-gray-500 w-full"
              />
            </div>
          </div>

          {/* Start Mirroring Button */}
          <Button
            onClick={onStartMirroring}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 text-lg transition-all duration-300 transform hover:scale-105"
          >
            Start Mirroring Trades
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
