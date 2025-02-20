"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";

// تعریف نوع `Content`
type Content = {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
};

// تعریف Props برای کامپوننت
type AddContentFormProps = {
  onAddContent: (newContent: Content) => void;
};

export default function AddContentForm({ onAddContent }: AddContentFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
      toast.error("عنوان الزامی است");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });

    if (res.ok) {
      const newContent = await res.json();
      onAddContent(newContent); // اضافه کردن محتوا به لیست
      toast.success("محتوا با موفقیت اضافه شد");
      setTitle("");
      setDescription("");
    } else {
      toast.error("خطا در افزودن محتوا");
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 border rounded-lg shadow bg-slate-200 text-slate-800"
    >
      <h2 className="text-lg font-bold">افزودن محتوا</h2>
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "در حال افزودن..." : "افزودن"}
      </Button>
    </form>
  );
}
