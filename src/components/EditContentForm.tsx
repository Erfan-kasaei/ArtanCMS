"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";

// تعریف Props برای کامپوننت
type EditContentFormProps = {
  content: { id: string; title: string; description?: string }; // محتوایی که باید ویرایش شود
  onCancel: () => void; // تابع لغو ویرایش
};

// کامپوننت EditContentForm: فرم ویرایش محتوا
export default function EditContentForm({
  content,
  onCancel,
}: EditContentFormProps) {
  // حالت‌ها برای عنوان، توضیحات و وضعیت لودینگ
  const [title, setTitle] = useState(content.title);
  const [description, setDescription] = useState(content.description || "");
  const [loading, setLoading] = useState(false);

  // تابع ارسال فرم برای ویرایش محتوا
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    // بررسی اینکه عنوان وارد شده است یا خیر
    if (!title) {
      toast.error("عنوان الزامی است");
      return;
    }

    // فعال کردن حالت لودینگ
    setLoading(true);

    // ارسال درخواست PATCH به API برای ویرایش محتوا
    const res = await fetch(`/api/content/${content.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });

    // بررسی پاسخ درخواست
    if (res.ok) {
      toast.success("محتوا با موفقیت ویرایش شد");
      onCancel(); // بستن فرم ویرایش
    } else {
      toast.error("خطا در ویرایش محتوا");
    }

    // غیرفعال کردن حالت لودینگ
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleUpdate}
      className="space-y-4 p-4 border rounded-lg shadow bg-slate-200 text-slate-800"
    >
      {/* عنوان فرم */}
      <h2 className="text-lg font-bold">ویرایش محتوا</h2>

      {/* فیلد عنوان */}
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      {/* فیلد توضیحات */}
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* دکمه‌های ذخیره و لغو */}
      <div className="flex gap-2">
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "در حال بروزرسانی..." : "ذخیره تغییرات"}
        </Button>
        <Button variant="secondary" onClick={onCancel} className="w-full">
          لغو
        </Button>
      </div>
    </form>
  );
}
