"use client";

import { useEffect, useState } from "react";
import AdminPieChart from "@/components/AdminPieChart";
import ActivityBarChart from "@/components/ActivityBarChart";
import TrendLineChart from "@/components/TrendLineChart";
import StatsOverview from "@/components/StatsOverview";
import Sidebar from "@/components/Sidebar";
import TrendLineChartDeleted from "@/components/TrendLineChartDeleted";

export default function AdminPanel() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [trendData, setTrendData] = useState(null);

  type AdminStats = {
    totalPosts: number;
    addedToday: number;
    deletedToday: number;
    totalDeleted: number;
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
    <main className="p-6 w-full mx-auto space-y-6">
      <div className="flex flex-nowrap justify-between">
        <div className="w-5/6 flex flex-col ">
          <div>
            <StatsOverview stats={stats} />
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className=" flex flex-col">
              <div>
                <TrendLineChart trendData={trendData} />
              </div>
              <div className="mt-4">
                <TrendLineChartDeleted trendData={trendData} />
              </div>
            </div>
            <div>
              <ActivityBarChart stats={stats} />
            </div>

            <div>
              <div>
                <AdminPieChart
                  title="افزوده شده امروز"
                  value={stats?.addedToday ?? 0}
                  total={stats?.totalPosts ?? 1}
                  colors={["#4CAF50", "#E0E0E0"]}
                />
              </div>
              <div className="mt-4">
                <AdminPieChart
                  title="حذف شده امروز"
                  value={stats?.deletedToday ?? 0}
                  total={stats?.totalPosts ?? 1}
                  colors={["#F44336", "#E0E0E0"]}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/6">
          <Sidebar />
        </div>
      </div>
    </main>
  );
}
