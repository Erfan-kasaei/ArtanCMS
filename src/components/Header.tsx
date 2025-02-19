import Link from "next/link";
import { LuLayoutDashboard, LuHouse, LuUser } from "react-icons/lu";
export default function Header() {
  return (
    <header className="p-4 px-12 mt-3 text-center font-extralight max-md:hidden">
      <div className="flex flex-nowrap justify-between">
        <div className="mr-2 flex flex-nowrap gap-5">
          <span className="bg-rose-700 w-8 h-8 rounded-full pt-1 text-xl">
            L
          </span>
          <span className="text-slate-50 text-xl border px-3 border-slate-200">
            Logo
          </span>
        </div>
        <div className="flex flex-nowrap gap-12 ">
          <Link href="/">
            <span className="hover_button">خانه</span>
          </Link>
          <Link href="/admin">
            <span className="hover_button">داشبورد</span>
          </Link>
          <span className="hover_button">اخبار</span>
          <span className="hover_button">درباره ما</span>
        </div>
        <div className="flex flex-nowrap gap-5 ">
          <span className="hover_button">
            <LuUser className="text-2xl" />
          </span>
          <Link href="/admin" className="hover_button">
            <LuLayoutDashboard className="text-2xl" />
          </Link>
        </div>
      </div>
    </header>
  );
}
