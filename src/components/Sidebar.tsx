import { LuHouse } from "react-icons/lu";

export default function Sidebar() {
  return (
    <section className="h-[95vh] flex flex-col bg-blue-dark rounded-3xl min-w-72 text-zinc-50 py-12">
      <div className="py-3 px-8 flex flex-nowrap justify-between items-center hover:bg-black/60">
        <span>گزینه تست</span>
        <LuHouse />
      </div>
      <div className="py-3 px-8 flex flex-nowrap justify-between items-center hover:bg-black/60">
        <span>گزینه تست</span>
        <LuHouse />
      </div>
      <div className="py-3 px-8 flex flex-nowrap justify-between items-center hover:bg-black/60">
        <span>گزینه تست</span>
        <LuHouse />
      </div>
      <div className="py-3 px-8 flex flex-nowrap justify-between items-center hover:bg-black/60">
        <span>گزینه تست</span>
        <LuHouse />
      </div>
    </section>
  );
}
