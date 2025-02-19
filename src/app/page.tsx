// app/page.tsx
"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import AddContentForm from "@/components/AddContentForm";
import EditContentForm from "@/components/EditContentForm";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

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
    <main className="md:p-6 mt-10 md:mx-10 grid grid-cols-2 gap-10 max-md:grid-cols-1">
      <div className="md:sticky top-4 max-h-screen overflow-y-auto">
        <AddContentForm />
      </div>

      <div className="space-y-4 p-4 border rounded-lg bg-slate-800 text-slate-50">
        {editingContent ? (
          <EditContentForm
            content={editingContent}
            onCancel={() => setEditingContent(null)}
          />
        ) : (
          <>
            <h1 className="text-xl font-bold ">لیست محتواها</h1>
            <ul className="space-y-4">
              {contents.map((content) => (
                <li
                  key={content.id}
                  className="p-4 border rounded-lg shadow bg-slate-300"
                >
                  <div className="flex flex-nowrap justify-between items-center">
                    <h2 className="font-semibold text-lg text-gray-900">
                      {content.title}
                    </h2>
                    <p className="text-xs ml-3 text-gray-500 ">
                      {new Date(content.createdAt).toLocaleDateString("fa-IR")}
                    </p>
                  </div>
                  <p className="text-sm text-gray-700 line-clamp-3">{content.description}</p>
                  <div className="mt-2 flex gap-2 justify-end">
                    <Button onClick={() => setEditingContent(content)}>
                      <FaRegEdit />
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(content.id)}
                    >
                      <FaRegTrashAlt />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </main>
  );
}
