import Link from "next/link";
import { LuLayoutDashboard, LuHouse } from "react-icons/lu";
export default function Header() {
  return (
    <header className="p-4 text-center">
      <div className="flex flex-nowrap gap-3 ">
        <Link href="/">
          <LuHouse className="text-2xl" />
        </Link>
        <Link href="/admin">
          <LuLayoutDashboard className="text-2xl" />
        </Link>
      </div>
    </header>
  );
}
