import { LuHouse } from "react-icons/lu";

export default function Sidebar() {
  return (
    <div className="h-auto flex flex-col rounded-xl  text-zinc-300 py-12 pr-5 mr-3">
      <div className="py-7 px-8 flex flex-nowrap justify-between items-center hover:bg-black/60 duration-300 border-b border-b-slate-600 ">
        <span>گزینه تست</span>
        <LuHouse className="text-2xl" />
      </div>
      <div className="py-7 px-8 flex flex-nowrap justify-between items-center hover:bg-black/60 duration-300 border-b border-b-slate-600">
        <span>گزینه تست</span>
        <LuHouse className="text-2xl" />
      </div>
      <div className="py-7 px-8 flex flex-nowrap justify-between items-center hover:bg-black/60 duration-300 border-b border-b-slate-600">
        <span>گزینه تست</span>
        <LuHouse className="text-2xl" />
      </div>
      <div className="py-7 px-8 flex flex-nowrap justify-between items-center hover:bg-black/60 duration-300">
        <span>گزینه تست</span>
        <LuHouse className="text-2xl" />
      </div>
    </div>
  );
}
