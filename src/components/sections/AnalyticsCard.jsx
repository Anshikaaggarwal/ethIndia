import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, DollarSign, Award } from "lucide-react";

const stats = [
  { title: "Total Traders", value: "12,450", icon: Users },
  { title: "Total Volume", value: "$24.8M", icon: DollarSign },
  { title: "Top ROI", value: "+320%", icon: TrendingUp },
  { title: "Active Categories", value: "18", icon: Award },
];

export default function AnalyticsCards() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="bg-gray-900/60 border-green-500/20 backdrop-blur-sm hover:border-green-500/40 transition"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-green-400">{stat.title}</CardTitle>
              <stat.icon className="h-5 w-5 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
