"use client";

import { useEffect, useState } from "react";
import AdminPieChart from "@/components/AdminPieChart";
import ActivityBarChart from "@/components/ActivityBarChart";
import TrendLineChart from "@/components/TrendLineChart";
import StatsOverview from "@/components/StatsOverview";
import Sidebar from "@/components/Sidebar";

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
    <main className="px-6 w-full mx-auto space-y-6">
      <div className="flex flex-nowrap justify-between">
        <div className="w-1/6 mt-20">
          <Sidebar />
        </div>
        <div className="w-5/6 flex flex-col ">
          <div>
            <StatsOverview stats={stats} />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="flex flex-col">
              <div>
                <TrendLineChart
                  trendData={trendData}
                  type="added"
                  height={250}
                />
              </div>
              <div className="mt-4">
                <TrendLineChart
                  trendData={trendData}
                  type="deleted"
                  height={250}
                />
              </div>
            </div>
            <div>
              <div className="flex flex-nowrap justify-center items-center bg-slate-950/40 border-none shadow-sky-700/20 shadow-2xl text-slate-50 rounded-xl">
                <div className="w-1/2">
                  <AdminPieChart
                    title="افزوده شده امروز"
                    value={stats?.addedToday ?? 0}
                    total={stats?.totalPosts ?? 1}
                    colors={["#BF2EF0", "#2A004E"]}
                  />
                </div>
                <div className="w-1/2">
                  <AdminPieChart
                    title="حذف شده امروز"
                    value={stats?.deletedToday ?? 0}
                    total={stats?.totalPosts ?? 1}
                    colors={["#D91656", "#3E001F"]}
                  />
                </div>
              </div>
              <div className="mt-4">
                <ActivityBarChart stats={stats} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
