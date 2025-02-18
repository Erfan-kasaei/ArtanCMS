import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const COLORS = ['#10B981', '#EF4444']; // سبز برای افزوده شده، قرمز برای حذف شده

type AdminPieChartProps = {
  addedToday: number;
  deletedToday: number;
};

export default function AdminPieChart({ addedToday, deletedToday }: AdminPieChartProps) {
  const data = [
    { name: 'افزوده شده', value: addedToday },
    { name: 'حذف شده', value: deletedToday },
  ];
  

  return (
    <div className="flex flex-col items-center p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold mb-2">نمودار پست‌های امروز</h2>
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}
