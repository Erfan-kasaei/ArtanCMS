"use client";
import { useEffect, useState } from "react";
import AddContentForm from "@/components/AddContentForm";
import ContentList from "@/components/ContentList";

// تعریف نوع داده‌های محتوا
type Content = {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
};

export default function Home() {
  // حالت برای نگهداری لیست محتواها
  const [contents, setContents] = useState<Content[]>([]);

  // دریافت محتواها از API هنگام بارگذاری صفحه
  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => setContents(data));
  }, []);

  // تابع حذف محتوا
  const handleDelete = async (id: string) => {
    if (!confirm("آیا از حذف این محتوا مطمئن هستید؟")) return;

    const res = await fetch(`/api/content/${id}`, { method: "DELETE" });

    if (res.ok) {
      // به‌روزرسانی لیست محتواها پس از حذف
      setContents(contents.filter((content) => content.id !== id));
    } else {
      alert("خطا در حذف محتوا");
    }
  };

  return (
    <main className="p-4 md:p-6 mt-10 md:mx-10 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* بخش افزودن محتوا: فرمی برای اضافه کردن محتواهای جدید */}
      <div className="md:sticky top-4 h-fit">
        <AddContentForm />
      </div>

      {/* بخش لیست محتواها: نمایش لیست محتواها و امکان حذف */}
      <ContentList contents={contents} onDelete={handleDelete} />
    </main>
  );
}
