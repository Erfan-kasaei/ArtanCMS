"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { LuArchive, LuArchiveRestore, LuArchiveX } from "react-icons/lu";

type AdminStats = {
  totalPosts: number;
  addedToday: number;
  deletedToday: number;
  totalDeleted: number;
};

export default function StatsOverview({ stats }: { stats: AdminStats | null }) {
  return (
    <div>
      {stats ? (
        <>
          <Card className="p-4 grid grid-cols-3 gap-4 bg-slate-950/40 border-none shadow-sky-700/20 shadow-2xl text-slate-50">
            <div className="menu_button border-l border-slate-400/40 h-auto">
              <LuArchive className="text-3xl text-slate-500" />
              <h2 className="text-lg max-md:hidden text-nowrap font-light">کل پست‌ها</h2>
              <p className="text-sm text-slate-950 bg-sky-400 rounded-full p-1 ml-3">
                {stats.totalPosts + stats.totalDeleted}
              </p>
            </div>
            <div className="menu_button border-l border-slate-400/40 h-auto">
              <LuArchiveRestore className="text-3xl text-slate-500" />
              <h2 className="text-lg max-md:hidden font-light">افزوده‌شده</h2>
              <p className="text-sm text-slate-950 bg-sky-400 rounded-full p-1 ml-3">
                {stats.totalPosts}
              </p>
            </div>
            <div className="menu_button">
              <LuArchiveX className="text-3xl text-slate-500" />
              <h2 className="text-lg max-md:hidden font-light">حذف‌شده</h2>
              <p className="text-sm text-slate-950 bg-sky-400 rounded-full p-1">
                {stats.totalDeleted}
              </p>
            </div>
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
