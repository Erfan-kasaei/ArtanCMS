"use client";

import { useEffect, useState } from "react";
import AdminPieChart from "@/components/AdminPieChart";
import ActivityBarChart from "@/components/ActivityBarChart";
import TrendLineChart from "@/components/TrendLineChart";
import StatsOverview from "@/components/StatsOverview";
import Sidebar from "@/components/Sidebar";

export default function AdminPanel() {
  // حالت‌ها برای نگهداری آمار و داده‌های روند
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [trendData, setTrendData] = useState(null);

  // تعریف نوع داده‌های آمار ادمین
  type AdminStats = {
    totalPosts: number;
    addedToday: number;
    deletedToday: number;
    totalDeleted: number;
  };

  // دریافت آمار و داده‌های روند از API هنگام بارگذاری صفحه
  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => setStats(data));

    fetch("/api/stats/trends")
      .then((res) => res.json())
      .then((data) => setTrendData(data));
  }, []);

  return (
    <main className="px-4 md:px-6 w-full mx-auto space-y-6 min-h-screen">
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        {/* Sidebar: نوار کناری برای دسترسی به بخش‌های مختلف پنل ادمین */}
        <aside className="w-full md:w-1/6 mt-4 md:mt-20">
          <Sidebar />
        </aside>

        {/* Main Content: بخش اصلی محتوای پنل ادمین */}
        <section className="w-full md:w-5/6 flex flex-col space-y-4 md:space-y-6">
          {/* Stats Overview: نمایش خلاصه‌ای از آمار */}
          <StatsOverview stats={stats} />

          {/* Charts Section: بخش نمودارها */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Trend Charts: نمودارهای روند افزوده‌ها و حذف‌ها */}
            <div className="space-y-4">
              <TrendLineChart trendData={trendData} type="added" height={250} />
              <TrendLineChart
                trendData={trendData}
                type="deleted"
                height={250}
              />
            </div>

            {/* Pie Charts and Bar Chart: نمودارهای دایره‌ای و میله‌ای */}
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row justify-center items-center bg-slate-950/40 shadow-sky-700/20 shadow-2xl text-slate-50 rounded-xl p-4">
                <div className="w-full md:w-1/2">
                  <AdminPieChart
                    title="افزوده شده امروز"
                    value={stats?.addedToday ?? 0}
                    total={stats?.totalPosts ?? 1}
                    colors={["#BF2EF0", "#2A004E"]}
                  />
                </div>
                <div className="w-full md:w-1/2 mt-4 md:mt-0">
                  <AdminPieChart
                    title="حذف شده امروز"
                    value={stats?.deletedToday ?? 0}
                    total={stats?.totalDeleted ?? 1}
                    colors={["#D91656", "#3E001F"]}
                  />
                </div>
              </div>

              <ActivityBarChart stats={stats} />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
