"use client";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";

type TrendLineChartProps = {
  trendData: { date: string; added: number; deleted: number }[] | null;
  type: "added" | "deleted";
  height?: number; // ارتفاع قابل تنظیم
};

const chartConfig = {
  added: {
    label: "Added",
    color: "hsl(var(--chart-6))",
  },
  deleted: {
    label: "Deleted",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function TrendLineChart({
  trendData,
  type,
  height = 200, // مقدار پیش‌فرض برای ارتفاع
}: TrendLineChartProps) {
  const title =
    type === "added"
      ? "روند افزودن محتوا در هفته اخیر"
      : "روند حذف محتوا در هفته اخیر";

  return (
    <Card className="p-2 bg-slate-950/40 border-none shadow-sky-700/20 shadow-2xl text-slate-50 h-80">
      <CardHeader className="-mt-4">
        <CardTitle className="text-xs font-light text-right">{title}</CardTitle>
      </CardHeader>
      <CardContent className="-ml-12 text-xs h-[${height}px]">
        {trendData ? (
          <ChartContainer config={chartConfig}>
            <AreaChart
              width={500}
              height={height}
              accessibilityLayer
              data={trendData}
              margin={{
                left: 12,
                right: 12,
              }}
              style={{ height }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 10)}
              />
              <YAxis />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" hideLabel />}
              />
              <Area
                dataKey={type}
                type="linear"
                fill={`var(--color-${type})`}
                fillOpacity={0.6}
                stroke={`var(--color-${type})`}
              />
            </AreaChart>
          </ChartContainer>
        ) : (
          <Skeleton className="w-full" style={{ height: `${height}px` }} /> // تنظیم ارتفاع Skeleton
        )}
      </CardContent>
    </Card>
  );
}
