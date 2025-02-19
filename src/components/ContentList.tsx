"use client";

import { useState } from "react";
import ContentItem from "@/components/ContentItem";
import EditContentForm from "@/components/EditContentForm";

// تعریف نوع داده‌های محتوا
type Content = {
  id: string; // شناسه‌ی محتوا
  title: string; // عنوان محتوا
  description?: string; // توضیحات محتوا (اختیاری)
  createdAt: string; // تاریخ ایجاد محتوا
};

// تعریف Props برای کامپوننت
type ContentListProps = {
  contents: Content[]; // لیست محتواها
  onDelete: (id: string) => void; // تابع حذف محتوا
};

// کامپوننت ContentList: نمایش لیست محتواها و مدیریت ویرایش محتوا
export default function ContentList({ contents, onDelete }: ContentListProps) {
  // حالت برای مدیریت محتوایی که در حال ویرایش است
  const [editingContent, setEditingContent] = useState<Content | null>(null);

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-slate-800 text-slate-50">
      {/* اگر محتوایی در حال ویرایش باشد، فرم ویرایش نمایش داده می‌شود */}
      {editingContent ? (
        <EditContentForm
          content={editingContent} // محتوایی که در حال ویرایش است
          onCancel={() => setEditingContent(null)} // لغو ویرایش
        />
      ) : (
        <>
          {/* عنوان لیست محتواها */}
          <h1 className="text-xl font-bold">لیست محتواها</h1>

          {/* لیست محتواها */}
          <ul className="space-y-4">
            {contents.map((content) => (
              <ContentItem
                key={content.id} // کلید منحصر به فرد برای هر آیتم
                content={content} // داده‌های محتوا
                onEdit={() => setEditingContent(content)} // تابع ویرایش محتوا
                onDelete={() => onDelete(content.id)} // تابع حذف محتوا
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
