"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import AddContentForm from "@/components/AddContentForm";
import EditContentForm from "@/components/EditContentForm";

type Content = {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
};

export default function Home() {
  const [contents, setContents] = useState<Content[]>([]);
  const [editingContent, setEditingContent] = useState<Content | null>(null);

  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => setContents(data));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("آیا از حذف این محتوا مطمئن هستید؟")) return;

    const res = await fetch(`/api/content/${id}`, { method: "DELETE" });

    if (res.ok) {
      setContents(contents.filter((content) => content.id !== id));
    } else {
      alert("خطا در حذف محتوا");
    }
  };

  return (
    <main className="p-6 max-w-2xl mx-auto space-y-6">
      <AddContentForm />

      {editingContent ? (
        <EditContentForm content={editingContent} onCancel={() => setEditingContent(null)} />
      ) : (
        <>
          <h1 className="text-xl font-bold">لیست محتواها</h1>
          <ul className="space-y-4">
            {contents.map((content) => (
              <li key={content.id} className="p-4 border rounded-lg shadow">
                <h2 className="font-semibold">{content.title}</h2>
                <p className="text-sm text-gray-600">{content.description}</p>
                <p className="text-xs text-gray-400">{new Date(content.createdAt).toLocaleDateString("fa-IR")}</p>

                <div className="mt-2 flex gap-2">
                  <Button onClick={() => setEditingContent(content)}>ویرایش</Button>
                  <Button variant="destructive" onClick={() => handleDelete(content.id)}>
                    حذف
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}
