"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

// تعریف نوع Props برای کامپوننت
type AdminPieChartProps = {
  title: string; // عنوان نمودار
  value: number; // مقدار فعلی
  total: number; // مقدار کل
  colors?: string[]; // رنگ‌های نمودار (پیش‌فرض: سبز و خاکستری)
};

// کامپوننت AdminPieChart: نمایش یک نمودار نیم‌دایره‌ای (Pie Chart)
export default function AdminPieChart({
  title,
  value,
  total,
  colors = ["#4CAF50", "#E0E0E0"], // رنگ‌های پیش‌فرض: سبز و خاکستری
}: AdminPieChartProps) {
  // محاسبه درصد مقدار فعلی نسبت به مقدار کل
  const percentage = ((value / total) * 100).toFixed(1); // درصد با یک رقم اعشار

  // داده‌های نمودار
  const data = [
    { name: "Value", value }, // بخش مربوط به مقدار فعلی
    { name: "Remaining", value: total - value }, // بخش باقی‌مانده
  ];

  return (
    <div className="p-4 text-center font-light">
      {/* ResponsiveContainer برای واکنش‌گرا کردن نمودار */}
      <ResponsiveContainer width="100%" height={120}>
        <PieChart>
          {/* Pie: بخش اصلی نمودار نیم‌دایره‌ای */}
          <Pie
            data={data} // داده‌های نمودار
            cx="50%" // موقعیت افقی مرکز نمودار
            cy="100%" // موقعیت عمودی مرکز نمودار (پایین)
            startAngle={180} // زاویه شروع (180 درجه برای نیم‌دایره)
            endAngle={0} // زاویه پایان (0 درجه برای نیم‌دایره)
            innerRadius={60} // شعاع داخلی
            outerRadius={90} // شعاع خارجی
            dataKey="value" // کلید داده‌ها
            stroke="false" // غیرفعال کردن خطوط مرزی
          >
            {/* Cell: تعیین رنگ برای هر بخش از نمودار */}
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Pie>

          {/* نمایش درصد در مرکز نیم‌دایره */}
          <text
            x="50%" // موقعیت افقی متن
            y="90%" // موقعیت عمودی متن
            textAnchor="middle" // تراز متن به وسط
            dominantBaseline="middle" // تراز عمودی متن به وسط
            className="text-2xl font-bold fill-white" // استایل متن
          >
            {percentage}%
          </text>
        </PieChart>
      </ResponsiveContainer>

      {/* خط افقی با رنگ بخش اصلی نمودار */}
      <div
        style={{ borderBottom: `4px solid ${colors[0]}` }} // رنگ خط مطابق با رنگ بخش اصلی
        className="my-2 mx-12"
      ></div>

      {/* عنوان نمودار */}
      <h3 className="text-sm mb-2">{title}</h3>
    </div>
  );
}
