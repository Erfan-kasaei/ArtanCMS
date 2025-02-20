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

// تعریف Props برای کامپوننت
type TrendLineChartProps = {
  trendData: { date: string; added: number; deleted: number }[] | null; // داده‌های روند
  type: "added" | "deleted"; // نوع نمودار (افزوده‌شده یا حذف‌شده)
  height?: number; // ارتفاع قابل تنظیم نمودار
};

// تنظیمات نمودار بر اساس نوع
const chartConfig = {
  added: {
    label: "Added", // برچسب برای افزوده‌شده
    color: "hsl(var(--chart-6))", // رنگ نمودار
  },
  deleted: {
    label: "Deleted", // برچسب برای حذف‌شده
    color: "hsl(var(--chart-1))", // رنگ نمودار
  },
} satisfies ChartConfig;

// کامپوننت TrendLineChart: نمایش نمودار روند افزوده‌ها یا حذف‌ها
export default function TrendLineChart({
  trendData,
  type,
  height = 200, // ارتفاع پیش‌فرض
}: TrendLineChartProps) {
  // عنوان نمودار بر اساس نوع
  const title =
    type === "added"
      ? "روند افزودن محتوا در هفته اخیر"
      : "روند حذف محتوا در هفته اخیر";

  return (
    <Card className="p-2 bg-slate-950/40 border-none shadow-sky-700/20 shadow-2xl text-slate-50 h-80">
      {/* عنوان نمودار */}
      <CardHeader className="-mt-4">
        <CardTitle className="text-xs font-light text-right">
          {trendData ? title : <Skeleton className="h-4 w-48" />}
        </CardTitle>
      </CardHeader>

      {/* محتوای نمودار */}
      <CardContent className="-ml-12 text-xs h-[${height}px]">
        {trendData ? (
          // اگر داده‌ها وجود داشته باشند، نمودار نمایش داده می‌شود
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
              {/* خطوط شبکه‌ای */}
              <CartesianGrid vertical={false} />
              {/* محور X: نمایش تاریخ‌ها */}
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 10)} // فرمت تاریخ
              />
              {/* محور Y: نمایش مقادیر */}
              <YAxis />
              {/* Tooltip: نمایش اطلاعات هنگام hover روی نمودار */}
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" hideLabel />}
              />
              {/* Area: نمایش داده‌ها به صورت نمودار */}
              <Area
                dataKey={type}
                type="linear"
                fill={`var(--color-${type})`} // رنگ پر کردن
                fillOpacity={0.6} // شفافیت پر کردن
                stroke={`var(--color-${type})`} // رنگ خط
              />
            </AreaChart>
          </ChartContainer>
        ) : (
          // اگر داده‌ها وجود نداشته باشند، اسکلتون نمایش داده می‌شود
          <div className="ml-10 flex flex-col gap-4">
            {/* اسکلتون عنوان */}
            <Skeleton className="h-4 w-44" />
            {/* اسکلتون نمودار */}
            <Skeleton className="w-full h-56 rounded-md" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
