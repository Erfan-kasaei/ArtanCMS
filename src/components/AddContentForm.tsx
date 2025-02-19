"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

// کامپوننت AddContentForm: فرم افزودن محتوای جدید
export default function AddContentForm() {
  // حالت‌ها برای عنوان، توضیحات و وضعیت لودینگ
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // استفاده از روتر برای بروزرسانی صفحه پس از افزودن محتوا
  const router = useRouter();

  // تابع ارسال فرم
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // بررسی اینکه عنوان وارد شده است یا خیر
    if (!title) {
      toast.error("عنوان الزامی است");
      return;
    }

    // فعال کردن حالت لودینگ
    setLoading(true);

    // ارسال درخواست POST به API برای افزودن محتوا
    const res = await fetch("/api/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });

    // بررسی پاسخ درخواست
    if (res.ok) {
      toast.success("محتوا با موفقیت اضافه شد");
      setTitle(""); // پاک کردن فیلد عنوان
      setDescription(""); // پاک کردن فیلد توضیحات
      router.refresh(); // بروزرسانی لیست محتواها
    } else {
      toast.error("خطا در افزودن محتوا");
    }

    // غیرفعال کردن حالت لودینگ
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 border rounded-lg bg-slate-200 text-slate-800"
    >
      {/* عنوان فرم */}
      <h2 className="text-lg font-bold">افزودن محتوا</h2>

      {/* فیلد عنوان */}
      <Input
        type="text"
        placeholder="عنوان محتوا"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      {/* فیلد توضیحات */}
      <Textarea
        placeholder="توضیحات (اختیاری)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* دکمه ارسال فرم */}
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "در حال ارسال..." : "افزودن محتوا"}
      </Button>
    </form>
  );
}
