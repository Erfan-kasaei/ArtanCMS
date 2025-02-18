// app/api/content/[id]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ویرایش محتوا
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const { title, description } = await req.json();
    const updatedContent = await prisma.content.update({
      where: { id: params.id },
      data: { title, description },
    });
    return NextResponse.json(updatedContent);
  } catch (error) {
    return NextResponse.json({ error: "خطا در ویرایش محتوا" }, { status: 500 });
  }
}

// حذف محتوا
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const content = await prisma.content.findUnique({
      where: { id: params.id },
    });

    if (!content) {
      return NextResponse.json({ error: "محتوا یافت نشد" }, { status: 404 });
    }

    await prisma.deletedContent.create({
      data: {
        title: content.title,
        description: content.description,
      },
    });

    await prisma.content.delete({ where: { id: params.id } });

    return NextResponse.json({ message: "محتوا حذف شد و در آرشیو ذخیره شد" });
  } catch (error) {
    return NextResponse.json({ error: "خطا در حذف محتوا" }, { status: 500 });
  }
}

