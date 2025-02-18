"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp } from "lucide-react";

type TrendLineChartProps = {
  trendData: { date: string; added: number; deleted: number }[] | null;
};

export default function TrendLineChart({ trendData }: TrendLineChartProps) {
  return (
    <Card className="p-4 bg-slate-950/40 border-none shadow-white/10 shadow-2xl text-slate-50">
      <CardHeader className="items-center pb-0">
        <CardTitle>📉 روند تغییرات در ۷ روز اخیر</CardTitle>
        <CardDescription>
          نمایش روند افزوده و حذف‌شدن پست‌ها در هفته اخیر
        </CardDescription>
      </CardHeader>
      <CardContent>
        {trendData ? (
          <ResponsiveContainer width="100%" height={80}>
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
      </CardContent>
    </Card>
  );
}
