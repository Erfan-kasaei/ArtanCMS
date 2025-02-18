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
    <Card className="p-4">
      <h2 className="text-lg font-semibold text-center">📈 گزارش فعالیت</h2>
      {stats ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="added" fill="#34d399" />
            <Bar dataKey="deleted" fill="#ef4444" />
            <Bar dataKey="total" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <Skeleton className="h-40 w-full" />
      )}
    </Card>
  );
}
