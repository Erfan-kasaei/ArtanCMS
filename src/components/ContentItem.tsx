"use client";

import { Button } from "@/components/ui/button";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

// تعریف نوع داده‌های محتوا
type Content = {
  id: string; // شناسه‌ی محتوا
  title: string; // عنوان محتوا
  description?: string; // توضیحات محتوا (اختیاری)
  createdAt: string; // تاریخ ایجاد محتوا
};

// تعریف Props برای کامپوننت
type ContentItemProps = {
  content: Content; // داده‌های محتوا
  onEdit: () => void; // تابع ویرایش محتوا
  onDelete: () => void; // تابع حذف محتوا
};

// کامپوننت ContentItem: نمایش یک آیتم محتوا در لیست
export default function ContentItem({
  content,
  onEdit,
  onDelete,
}: ContentItemProps) {
  return (
    <li className="p-4 border rounded-lg shadow bg-slate-300">
      {/* بخش عنوان و تاریخ ایجاد */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <h2 className="font-semibold text-lg text-gray-900">{content.title}</h2>
        <p className="text-xs text-gray-500 mt-1 md:mt-0">
          {/* نمایش تاریخ ایجاد به فرمت فارسی */}
          {new Date(content.createdAt).toLocaleDateString("fa-IR")}
        </p>
      </div>

      {/* بخش توضیحات محتوا */}
      <p className="text-sm text-gray-700 line-clamp-3 mt-2">
        {content.description}
      </p>

      {/* دکمه‌های ویرایش و حذف */}
      <div className="mt-2 flex gap-2 justify-end">
        {/* دکمه ویرایش */}
        <Button onClick={onEdit} className="p-2">
          <FaRegEdit />
        </Button>

        {/* دکمه حذف */}
        <Button variant="destructive" onClick={onDelete} className="p-2">
          <FaRegTrashAlt />
        </Button>
      </div>
    </li>
  );
}
