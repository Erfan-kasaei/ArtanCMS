"use client";

import { useEffect, useState } from "react";
import AdminPieChart from "@/components/AdminPieChart";
import ActivityBarChart from "@/components/ActivityBarChart";
import TrendLineChart from "@/components/TrendLineChart";
import StatsOverview from "@/components/StatsOverview";

export default function AdminPanel() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [trendData, setTrendData] = useState(null);

  type AdminStats = {
    totalPosts: number;
    addedToday: number;
    deletedToday: number;
  };

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => setStats(data));

    fetch("/api/stats/trends")
      .then((res) => res.json())
      .then((data) => setTrendData(data));
  }, []);

  return (
    <main className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-xl font-bold text-center">📊 داشبورد ادمین</h1>
      <StatsOverview stats={stats} />
      <ActivityBarChart stats={stats} />
      <TrendLineChart trendData={trendData} />
      <AdminPieChart
        addedToday={stats?.addedToday || 0}
        deletedToday={stats?.deletedToday || 0}
      />
    </main>
  );
}
