"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function AddContentForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
      toast.success("محتوا با موفقیت اضافه شد");
      setTitle("");
      setDescription("");
      router.refresh(); // لیست محتواها را بروزرسانی کن
    } else {
      toast.error("خطا در افزودن محتوا");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg shadow bg-white">
      <h2 className="text-lg font-bold">افزودن محتوا</h2>

      <Input
        type="text"
        placeholder="عنوان محتوا"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <Textarea
        placeholder="توضیحات (اختیاری)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "در حال ارسال..." : "افزودن محتوا"}
      </Button>
    </form>
  );
}
