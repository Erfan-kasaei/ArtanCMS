import { TrendingUp } from "lucide-react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type AdminPieChartProps = {
  addedToday: number;
  deletedToday: number;
};

export default function AdminPieChart({
  addedToday,
  deletedToday,
}: AdminPieChartProps) {
  const totalPosts = addedToday + deletedToday;
  const chartData = [
    { name: "افزوده شده", value: addedToday, color: "#10B981" },
    { name: "حذف شده", value: deletedToday, color: "#EF4444" },
  ];

  const chartConfig: ChartConfig = {
    added: {
      label: "افزوده شده",
      color: "#10B981",
    },
    deleted: {
      label: "حذف شده",
      color: "#EF4444",
    },
  };

  return (
    <Card className="flex flex-col bg-slate-950/40 border-none shadow-sky-700/20 shadow-2xl text-slate-50">
      <CardHeader className="items-center pb-0">
        <CardTitle>📊 نمودار پست‌های امروز</CardTitle>
        <CardDescription>نمایش پست‌های افزوده و حذف‌شده امروز</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalPosts.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          پست‌ها
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="value"
              stackId="a"
              cornerRadius={5}
              fill={chartData[0].color}
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="value"
              fill={chartData[1].color}
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          افزایش روند امروز <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          نمایش درصد تغییرات امروز
        </div>
      </CardFooter>
    </Card>
  );
}
