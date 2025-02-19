"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

type AdminPieChartProps = {
  title: string;
  value: number;
  total: number;
  colors?: string[];
};

export default function AdminPieChart({
  title,
  value,
  total,
  colors = ["#4CAF50", "#E0E0E0"], // سبز و خاکستری
}: AdminPieChartProps) {
  const data = [
    { name: "Value", value },
    { name: "Remaining", value: total - value },
  ];

  return (
    <div className=" p-4 rounded-2xl text-center bg-slate-950/40 border-none shadow-sky-700/20 shadow-2xl text-slate-50">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <ResponsiveContainer width="100%" height={100}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="100%"
            startAngle={180}
            endAngle={0}
            innerRadius={50}
            outerRadius={90}
            dataKey="value"
            stroke="false"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
