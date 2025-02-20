"use client";

import { useState } from "react";
import ContentItem from "@/components/ContentItem";
import EditContentForm from "@/components/EditContentForm";

// تعریف نوع داده‌های محتوا
type Content = {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
};

// تعریف Props برای کامپوننت
type ContentListProps = {
  contents: Content[];
  onDelete: (id: string) => void;
  onUpdateContent: (updatedContent: Content) => void; // تابع بروزرسانی محتوا
};

// کامپوننت ContentList: نمایش لیست محتواها و مدیریت ویرایش محتوا
export default function ContentList({
  contents,
  onDelete,
  onUpdateContent,
}: ContentListProps) {
  const [editingContent, setEditingContent] = useState<Content | null>(null);

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-slate-800 text-slate-50">
      {editingContent ? (
        <EditContentForm
          content={editingContent}
          onCancel={() => setEditingContent(null)}
          onUpdateContent={(updatedContent) => {
            // اضافه کردن مقدار `createdAt` از مقدار قبلی محتوا
            onUpdateContent({
              ...updatedContent,
              createdAt: editingContent.createdAt,
            });
            setEditingContent(null);
          }}
        />
      ) : (
        <>
          <h1 className="text-xl font-bold">لیست محتواها</h1>
          <ul className="space-y-4">
            {contents.map((content) => (
              <ContentItem
                key={content.id}
                content={content}
                onEdit={() => setEditingContent(content)}
                onDelete={() => onDelete(content.id)}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
