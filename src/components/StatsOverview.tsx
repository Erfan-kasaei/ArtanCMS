"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { LuArchive, LuArchiveRestore, LuArchiveX } from "react-icons/lu";

// تعریف نوع داده‌های آمار ادمین
type AdminStats = {
  totalPosts: number; // تعداد کل پست‌ها
  addedToday: number; // تعداد پست‌های اضافه‌شده امروز
  deletedToday: number; // تعداد پست‌های حذف‌شده امروز
  totalDeleted: number; // تعداد کل پست‌های حذف‌شده
};

// کامپوننت StatsOverview: نمایش خلاصه‌ای از آمار سیستم
export default function StatsOverview({ stats }: { stats: AdminStats | null }) {
  return (
    <div>
      {/* اگر آمار وجود داشته باشد، نمایش داده می‌شود */}
      {stats ? (
        <>
          <Card className="p-4 grid grid-cols-3 gap-4 bg-slate-950/40 border-none shadow-sky-700/20 shadow-2xl text-slate-50">
            {/* بخش کل پست‌ها */}
            <div className="menu_button border-l border-slate-400/40 h-auto">
              <LuArchive className="text-3xl text-slate-500" />{" "}
              {/* آیکون آرشیو */}
              <h2 className="text-lg max-md:hidden text-nowrap font-light">
                کل پست‌ها
              </h2>{" "}
              {/* عنوان */}
              <p className="text-sm text-slate-950 bg-sky-400 rounded-full p-1 ml-3">
                {stats.totalPosts + stats.totalDeleted} {/* تعداد کل پست‌ها */}
              </p>
            </div>

            {/* بخش افزوده‌شده */}
            <div className="menu_button border-l border-slate-400/40 h-auto">
              <LuArchiveRestore className="text-3xl text-slate-500" />{" "}
              {/* آیکون بازگردانی */}
              <h2 className="text-lg max-md:hidden font-light">
                افزوده‌شده
              </h2>{" "}
              {/* عنوان */}
              <p className="text-sm text-slate-950 bg-sky-400 rounded-full p-1 ml-3">
                {stats.totalPosts} {/* تعداد پست‌های افزوده‌شده */}
              </p>
            </div>

            {/* بخش حذف‌شده */}
            <div className="menu_button">
              <LuArchiveX className="text-3xl text-slate-500" />{" "}
              {/* آیکون حذف */}
              <h2 className="text-lg max-md:hidden font-light">حذف‌شده</h2>{" "}
              {/* عنوان */}
              <p className="text-sm text-slate-950 bg-sky-400 rounded-full p-1">
                {stats.totalDeleted} {/* تعداد پست‌های حذف‌شده */}
              </p>
            </div>
          </Card>
        </>
      ) : (
        // اگر آمار وجود نداشته باشد، اسکلتون نمایش داده می‌شود
        <>
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </>
      )}
    </div>
  );
}
