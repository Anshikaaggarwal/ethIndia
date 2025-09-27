import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Trophy } from "lucide-react";

export default function PerformanceCharts() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Category Distribution */}
        <Card className="bg-gray-900/60 border-green-500/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-green-400">
              <PieChart className="w-5 h-5" /> Category Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["Sports", "Politics", "Crypto", "Finance"].map((cat, i) => (
                <div
                  key={cat}
                  className="flex items-center justify-between"
                >
                  <span className="text-gray-300">{cat}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
                        style={{ width: `${[34, 28, 23, 15][i]}%` }}
                      />
                    </div>
                    <span className="text-green-400 font-semibold">
                      {[34, 28, 23, 15][i]}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Categories */}
        <Card className="bg-gray-900/60 border-green-500/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-green-400">
              <Trophy className="w-5 h-5" /> Top Performing Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            {["Sports Betting", "Politics", "Crypto"].map((cat, i) => (
              <div
                key={cat}
                className="flex items-center gap-4 mb-6 last:mb-0"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                  <span className="text-black font-bold">{i + 1}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold">{cat}</h3>
                  <p className="text-gray-400 text-sm">
                    Average ROI: +{[67.8, 54.2, 41.6][i]}%
                  </p>
                </div>
                <span className="text-green-400 font-bold">
                  +${[234000, 189000, 156000][i].toLocaleString("en-US")}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
