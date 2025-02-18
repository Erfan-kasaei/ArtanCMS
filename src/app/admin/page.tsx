"use client";

import { useEffect, useState } from "react";
import AdminPieChart from "@/components/AdminPieChart";
import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

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

      <div className="grid grid-cols-3 gap-4">
        {stats ? (
          <>
            <Card className="p-4">
              <h2 className="text-lg font-semibold">کل پست‌ها</h2>
              <p className="text-2xl">{stats.totalPosts}</p>
            </Card>
            <Card className="p-4">
              <h2 className="text-lg font-semibold">افزوده‌شده امروز</h2>
              <p className="text-2xl text-green-500">{stats.addedToday}</p>
            </Card>
            <Card className="p-4">
              <h2 className="text-lg font-semibold">حذف‌شده امروز</h2>
              <p className="text-2xl text-red-500">{stats.deletedToday}</p>
            </Card>
          </>
        ) : (
          <>
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </>
        )}
      </div>

      <Card className="p-4">
        <h2 className="text-lg font-semibold text-center">📈 گزارش فعالیت</h2>
        {stats ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={[
                { name: "افزوده‌شده", value: stats.addedToday },
                { name: "حذف‌شده", value: stats.deletedToday },
                { name: "کل پست‌ها", value: stats.totalPosts },
              ]}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <Skeleton className="h-40 w-full" />
        )}
      </Card>

      <Card className="p-4">
        <h2 className="text-lg font-semibold text-center">
          📉 روند تغییرات در ۷ روز اخیر
        </h2>
        {trendData ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="added" stroke="#34d399" />
              <Line type="monotone" dataKey="deleted" stroke="#ef4444" />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <Skeleton className="h-40 w-full" />
        )}
      </Card>
      <AdminPieChart
        addedToday={stats?.addedToday || 0}
        deletedToday={stats?.deletedToday || 0}
      />
    </main>
  );
}
