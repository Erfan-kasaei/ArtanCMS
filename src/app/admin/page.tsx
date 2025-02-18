"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AdminPanel() {
  const [stats, setStats] = useState({
    totalPosts: 0,
    addedToday: 0,
    deletedToday: 0,
  });

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, []);

  const chartData = [
    { name: "افزوده‌شده", value: stats.addedToday },
    { name: "حذف‌شده", value: stats.deletedToday },
    { name: "کل پست‌ها", value: stats.totalPosts },
  ];

  return (
    <main className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-xl font-bold text-center">📊 داشبورد ادمین</h1>

      <div className="grid grid-cols-3 gap-4">
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
      </div>

      <Card className="p-4">
        <h2 className="text-lg font-semibold text-center">📈 گزارش فعالیت</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </main>
  );
}
