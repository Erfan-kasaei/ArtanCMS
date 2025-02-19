import Link from "next/link";
import {
  LuHouse,
  LuLayoutDashboard,
  LuNewspaper,
  LuPower,
} from "react-icons/lu";

// کامپوننت Sidebar: نوار کناری برای دسترسی به بخش‌های مختلف
export default function Sidebar() {
  return (
    <div className="flex flex-row md:flex-col gap-4 rounded-xl text-zinc-300 md:py-12 px-5 md:pl-5 md:ml-3 justify-center md:justify-start">
      {/* لینک به صفحه اصلی */}
      <Link
        href="/"
        className="menu_button2 md:border-b border-b-slate-600 flex items-center"
      >
        <LuHouse className="text-2xl" /> {/* آیکون خانه */}
        <span className="text-sm ml-2 md:ml-5 hidden lg:inline">خانه</span>{" "}
        {/* متن خانه */}
      </Link>

      {/* لینک به صفحه داشبورد */}
      <Link
        href="/admin"
        className="menu_button2 md:border-b border-b-slate-600 flex items-center"
      >
        <LuLayoutDashboard className="text-2xl" /> {/* آیکون داشبورد */}
        <span className="text-sm ml-2 md:ml-5 hidden lg:inline">
          داشبورد
        </span>{" "}
        {/* متن داشبورد */}
      </Link>

      {/* بخش اخبار (بدون لینک) */}
      <div className="menu_button2 md:border-b border-b-slate-600 flex items-center">
        <LuNewspaper className="text-2xl" /> {/* آیکون اخبار */}
        <span className="text-sm ml-2 md:ml-5 hidden lg:inline">
          اخبار
        </span>{" "}
        {/* متن اخبار */}
      </div>

      {/* بخش خروج (بدون لینک) */}
      <div className="menu_button2 flex items-center">
        <LuPower className="text-2xl text-red-400" /> {/* آیکون خروج */}
        <span className="text-sm ml-2 md:ml-5 hidden lg:inline">خروج</span>{" "}
        {/* متن خروج */}
      </div>
    </div>
  );
}
