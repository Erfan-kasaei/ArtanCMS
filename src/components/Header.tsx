import Link from "next/link";
import { LuLayoutDashboard, LuHouse, LuUser } from "react-icons/lu";

// کامپوننت Header: بخش هدر صفحه
export default function Header() {
  return (
    <header className="p-4 px-12 mt-3 text-center font-extralight max-md:hidden">
      {/* بخش اصلی هدر */}
      <div className="flex flex-nowrap justify-between">
        {/* بخش لوگو */}
        <div className="mr-2 flex flex-nowrap gap-5">
          {/* آیکون لوگو */}
          <span className="bg-rose-700 w-8 h-8 rounded-full pt-1 text-xl">
            L
          </span>
          {/* متن لوگو */}
          <span className="text-slate-50 text-xl border px-3 border-slate-200">
            Logo
          </span>
        </div>

        {/* بخش منوی ناوبری */}
        <div className="flex flex-nowrap gap-12">
          {/* لینک به صفحه اصلی */}
          <Link href="/">
            <span className="hover_button">خانه</span>
          </Link>
          {/* لینک به صفحه داشبورد */}
          <Link href="/admin">
            <span className="hover_button">داشبورد</span>
          </Link>
          {/* آیتم‌های منو */}
          <span className="hover_button">اخبار</span>
          <span className="hover_button">درباره ما</span>
        </div>

        {/* بخش آیکون‌های کاربر و داشبورد */}
        <div className="flex flex-nowrap gap-5">
          {/* آیکون کاربر */}
          <span className="hover_button">
            <LuUser className="text-2xl" />
          </span>
          {/* لینک به صفحه داشبورد */}
          <Link href="/admin" className="hover_button">
            <LuLayoutDashboard className="text-2xl" />
          </Link>
        </div>
      </div>
    </header>
  );
}
