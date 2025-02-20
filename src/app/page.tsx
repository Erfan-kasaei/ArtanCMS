"use client";
import { useEffect, useState } from "react";
import AddContentForm from "@/components/AddContentForm";
import ContentList from "@/components/ContentList";

type Content = {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
};

export default function Home() {
  const [contents, setContents] = useState<Content[]>([]);

  // دریافت داده‌ها از API هنگام بارگذاری صفحه
  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => setContents(data));
  }, []);

  // حذف محتوا
  const handleDelete = async (id: string) => {
    if (!confirm("آیا از حذف این محتوا مطمئن هستید؟")) return;

    const res = await fetch(`/api/content/${id}`, { method: "DELETE" });

    if (res.ok) {
      setContents(contents.filter((content) => content.id !== id));
    } else {
      alert("خطا در حذف محتوا");
    }
  };

  // اضافه کردن محتوا
  const handleAddContent = (newContent: Content) => {
    setContents([...contents, newContent]);
  };

  // بروزرسانی محتوا بعد از ویرایش
  const handleUpdateContent = (updatedContent: Content) => {
    setContents((prevContents) =>
      prevContents.map((content) =>
        content.id === updatedContent.id ? updatedContent : content
      )
    );
  };

  return (
    <main className="p-4 md:p-6 mt-10 md:mx-10 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="md:sticky top-4 h-fit">
        <AddContentForm onAddContent={handleAddContent} />
      </div>
      <ContentList
        contents={contents}
        onDelete={handleDelete}
        onUpdateContent={handleUpdateContent} // ارسال تابع بروزرسانی
      />
    </main>
  );
}
