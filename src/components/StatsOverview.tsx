"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type AdminStats = {
  totalPosts: number;
  addedToday: number;
  deletedToday: number;
};

export default function StatsOverview({ stats }: { stats: AdminStats | null }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {stats ? (
        <>
          <Card className="p-4">
            <h2 className="text-lg font-semibold">کل پست‌ها</h2>
            <p className="text-2xl">{stats.totalPosts}</p>
          </Card>
          <Card className="p-4">
            <h2 className="text-lg font-semibold">افزوده‌شده امروز</h2>
            <p className="text-2xl text-green-500">{stats.addedToday}</p>
          </Card>
          <Card className="p-4">
            <h2 className="text-lg font-semibold">حذف‌شده امروز</h2>
            <p className="text-2xl text-red-500">{stats.deletedToday}</p>
          </Card>
        </>
      ) : (
        <>
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </>
      )}
    </div>
  );
}
