import Link from "next/link";
import {
  LuHouse,
  LuLayoutDashboard,
  LuNewspaper,
  LuPower,
} from "react-icons/lu";

export default function Sidebar() {
  return (
    <div className="h-auto flex flex-col gap-4 rounded-xl text-zinc-300 py-12 pl-5 ml-3">
      <Link href="/" className="menu_button2 border-b border-b-slate-600">
        <LuHouse className="text-2xl mr-5" />
        <span className="text-sm mr-7">خانه</span>
      </Link>
      <Link href="/admin" className="menu_button2 border-b border-b-slate-600">
        <LuLayoutDashboard className="text-2xl mr-5" />
        <span className="text-sm mr-7">داشبورد</span>
      </Link>
      <div className="menu_button2 border-b border-b-slate-600">
        <LuNewspaper className="text-2xl mr-5" />
        <span className="text-sm mr-7">اخبار</span>
      </div>
      <div className="menu_button2">
        <LuPower className="text-2xl mr-5" />
        <span className="text-sm mr-7">خروج</span>
      </div>
    </div>
  );
}
