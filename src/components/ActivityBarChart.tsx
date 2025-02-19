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

// تعریف نوع داده‌های آمار ادمین
type AdminStats = {
  totalPosts: number;
  addedToday: number;
  deletedToday: number;
  totalDeleted: number;
};

// کامپوننت ActivityBarChart: نمایش نمودار میله‌ای فعالیت‌ها
export default function ActivityBarChart({
  stats,
}: {
  stats: AdminStats | null;
}) {
  // آماده‌سازی داده‌ها برای نمودار
  const chartData = stats
    ? [
        { name: "امروز", added_today: stats.addedToday }, // محتواهای اضافه‌شده امروز
        { name: "افزوده‌شده", added: stats.totalPosts }, // کل محتواهای اضافه‌شده

        { name: "امروز", deleted_today: stats.deletedToday }, // محتواهای حذف‌شده امروز
        { name: "حذف‌شده", deleted: stats.totalDeleted }, // کل محتواهای حذف‌شده

        {
          name: "امروز",
          total_today: stats.addedToday + stats.deletedToday, // کل فعالیت‌های امروز
        },
        { name: "کل پست‌ها", total: stats.totalPosts + stats.totalDeleted }, // کل فعالیت‌ها
      ]
    : []; // اگر stats وجود نداشته باشد، آرایه‌ی خالی برگردانده می‌شود

  return (
    <Card className="p-4 bg-slate-950/40 border-none shadow-sky-700/20 shadow-2xl text-slate-50">
      {/* عنوان نمودار */}
      <h2 className="text-sm font-light text-right mb-4">گزارش فعالیت</h2>

      {/* نمایش نمودار یا اسکلتون در صورت عدم وجود داده‌ها */}
      {stats ? (
        <ResponsiveContainer width="100%" height={340}>
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 35,
              left: 0,
              bottom: 5,
            }}
          >
            {/* خطوط شبکه‌ای نمودار */}
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255, 255, 255, 0.1)"
            />

            {/* محور X: نمایش نام‌ها */}
            <XAxis
              dataKey="name"
              stroke="rgba(255, 255, 255, 0.5)" // رنگ محور X
              tick={{ fill: "rgba(255, 255, 255, 0.7)" }} // رنگ متن محور X
            />

            {/* محور Y: نمایش مقادیر */}
            <YAxis
              stroke="rgba(255, 255, 255, 0.5)" // رنگ محور Y
              tick={{ fill: "rgba(255, 255, 255, 0.7)" }} // رنگ متن محور Y
            />

            {/* Tooltip: نمایش اطلاعات هنگام hover روی میله‌ها */}
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "8px",
                color: "#fff",
              }}
            />

            {/* میله‌های نمودار */}
            <Bar
              dataKey="added"
              fill="#009990" // رنگ سبز برای افزوده‌شده
              radius={[4, 4, 0, 0]} // گوشه‌های گرد برای Bar
              animationDuration={1500} // انیمیشن
            />
            <Bar
              dataKey="added_today"
              fill="#009110" // رنگ سبز برای افزوده‌شده امروز
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
              dataKey="deleted_today"
              fill="#D91116" // رنگ قرمز برای حذف‌شده امروز
              radius={[4, 4, 0, 0]} // گوشه‌های گرد برای Bar
              animationDuration={1500} // انیمیشن
            />
            <Bar
              dataKey="total"
              fill="#BF2EF0" // رنگ آبی برای کل پست‌ها
              radius={[4, 4, 0, 0]} // گوشه‌های گرد برای Bar
              animationDuration={1500} // انیمیشن
            />
            <Bar
              dataKey="total_today"
              fill="#BF11F0" // رنگ آبی برای کل پست‌های امروز
              radius={[4, 4, 0, 0]} // گوشه‌های گرد برای Bar
              animationDuration={1500} // انیمیشن
            />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        // نمایش اسکلتون در صورت عدم وجود داده‌ها
        <Skeleton className="h-40 w-full" />
      )}
    </Card>
  );
}
