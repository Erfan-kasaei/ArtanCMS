"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type AdminStats = {
  totalPosts: number;
  addedToday: number;
  deletedToday: number;
};

export default function ActivityBarChart({
  stats,
}: {
  stats: AdminStats | null;
}) {
  const chartData = stats
    ? [
        { name: "افزوده‌شده", added: stats.addedToday },
        { name: "حذف‌شده", deleted: stats.deletedToday },
        { name: "کل پست‌ها", total: stats.totalPosts },
      ]
    : [];

  return (
    <Card className="p-4 bg-slate-950/40 border-none shadow-sky-700/20 shadow-2xl text-slate-50">
      <h2 className="text-sm font-light text-right mb-4">گزارش فعالیت</h2>
      {stats ? (
        <ResponsiveContainer width="100%" height={370}>
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 35,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255, 255, 255, 0.1)"
            />
            {/* خطوط شبکه‌ای */}
            <XAxis
              dataKey="name"
              stroke="rgba(255, 255, 255, 0.5)" // رنگ محور X
              tick={{ fill: "rgba(255, 255, 255, 0.7)" }} // رنگ متن محور X
            />
            <YAxis
              stroke="rgba(255, 255, 255, 0.5)" // رنگ محور Y
              tick={{ fill: "rgba(255, 255, 255, 0.7)" }} // رنگ متن محور Y
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "8px",
                color: "#fff",
              }} // استایل Tooltip
            />
            <Bar
              dataKey="added"
              fill="#009990" // رنگ سبز برای افزوده‌شده
              radius={[4, 4, 0, 0]} // گوشه‌های گرد برای Bar
              animationDuration={1500} // انیمیشن
            />
            <Bar
              dataKey="deleted"
              fill="#D91656" // رنگ قرمز برای حذف‌شده
              radius={[4, 4, 0, 0]} // گوشه‌های گرد برای Bar
              animationDuration={1500} // انیمیشن
            />
            <Bar
              dataKey="total"
              fill="#BF2EF0" // رنگ آبی برای کل پست‌ها
              radius={[4, 4, 0, 0]} // گوشه‌های گرد برای Bar
              animationDuration={1500} // انیمیشن
            />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <Skeleton className="h-40 w-full" />
      )}
    </Card>
  );
}
