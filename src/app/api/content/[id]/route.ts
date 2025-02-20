import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// تابع PATCH: ویرایش محتوای موجود
export async function PATCH(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params; // استخراج `params` به‌عنوان یک شیء معمولی

    if (!id) {
      return NextResponse.json({ error: "شناسه معتبر نیست" }, { status: 400 });
    }

    const { title, description } = await req.json();

    const updatedContent = await prisma.content.update({
      where: { id },
      data: { title, description },
    });

    return NextResponse.json(updatedContent);
  } catch {
    return NextResponse.json({ error: "خطا در ویرایش محتوا" }, { status: 500 });
  }
}

// تابع DELETE: حذف محتوا و ذخیره‌ی آن در آرشیو
export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params; // استخراج `params` به‌عنوان یک شیء معمولی

    if (!id) {
      return NextResponse.json({ error: "شناسه معتبر نیست" }, { status: 400 });
    }

    const content = await prisma.content.findUnique({ where: { id } });
    if (!content) {
      return NextResponse.json({ error: "محتوا یافت نشد" }, { status: 404 });
    }

    await prisma.deletedContent.create({
      data: {
        title: content.title,
        description: content.description,
      },
    });

    await prisma.content.delete({ where: { id } });

    return NextResponse.json({ message: "محتوا حذف شد و در آرشیو ذخیره شد" });
  } catch {
    return NextResponse.json({ error: "خطا در حذف محتوا" }, { status: 500 });
  }
}
