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
    <Card className="p-4">
      <CardHeader className="items-center pb-0">
        <CardTitle>📉 روند تغییرات در ۷ روز اخیر</CardTitle>
        <CardDescription>
          نمایش روند افزوده و حذف‌شدن پست‌ها در هفته اخیر
        </CardDescription>
      </CardHeader>
      <CardContent>
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
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          تغییرات هفتگی <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          نمایش روند تغییرات پست‌ها در هفته اخیر
        </div>
      </CardFooter>
    </Card>
  );
}
