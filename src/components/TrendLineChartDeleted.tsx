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
};

const chartConfig = {
  deleted: {
    label: "Deleted",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function TrendLineChart({ trendData }: TrendLineChartProps) {
  return (
    <Card className="p-2 bg-slate-950/40 border-none shadow-white/10 shadow-2xl text-slate-50">
      <CardHeader className="items-end -mt-4">
        <CardTitle className="text-xs font-light">
          روند حذف محتوا در هفته اخیر
        </CardTitle>
      </CardHeader>
      <CardContent className="-ml-12 text-xs">
        {trendData ? (
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={trendData}
              margin={{
                left: 12,
                right: 12,
              }}
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
                dataKey="deleted"
                type="linear"
                fill="var(--color-deleted)"
                fillOpacity={0.6}
                stroke="var(--color-deleted)"
              />
            </AreaChart>
          </ChartContainer>
        ) : (
          <Skeleton className="h-40 w-full" />
        )}
      </CardContent>
    </Card>
  );
}
