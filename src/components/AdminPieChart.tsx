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
  const percentage = ((value / total) * 100).toFixed(1); // درصد مقدار با یک رقم اعشار
  const data = [
    { name: "Value", value },
    { name: "Remaining", value: total - value },
  ];

  return (
    <div className="p-4  text-center font-light ">
      <ResponsiveContainer width="100%" height={120}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="100%"
            startAngle={180}
            endAngle={0}
            innerRadius={60}
            outerRadius={90}
            dataKey="value"
            stroke="false"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Pie>
          {/* نمایش درصد در مرکز نیم‌دایره */}
          <text
            x="50%"
            y="90%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-2xl font-bold fill-white"
          >
            {percentage}%
          </text>
        </PieChart>
      </ResponsiveContainer>
      {/* خط افقی با رنگ چارت */}
      <div
        style={{ borderBottom: `4px solid ${colors[0]}` }}
        className="my-2 mx-12"
      ></div>
      <h3 className="text-sm mb-2">{title}</h3>
    </div>
  );
}
