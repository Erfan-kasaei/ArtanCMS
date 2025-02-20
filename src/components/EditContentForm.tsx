"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";

type EditContentFormProps = {
  content: { id: string; title: string; description?: string };
  onCancel: () => void;
  onUpdateContent: (updatedContent: { id: string; title: string; description?: string }) => void;
};

export default function EditContentForm({ content, onCancel, onUpdateContent }: EditContentFormProps) {
  const [title, setTitle] = useState(content.title);
  const [description, setDescription] = useState(content.description || "");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title) {
      toast.error("عنوان الزامی است");
      return;
    }

    setLoading(true);

    const res = await fetch(`/api/content/${content.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });

    if (res.ok) {
      const updatedContent = await res.json(); // دریافت مقدار جدید از API
      onUpdateContent(updatedContent); // ارسال مقدار جدید به لیست
      toast.success("محتوا با موفقیت ویرایش شد");
      onCancel();
    } else {
      toast.error("خطا در ویرایش محتوا");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleUpdate} className="space-y-4 p-4 border rounded-lg shadow bg-slate-200 text-slate-800">
      <h2 className="text-lg font-bold">ویرایش محتوا</h2>

      <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />

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
