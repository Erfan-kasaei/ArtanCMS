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
    await prisma.content.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "محتوا حذف شد" });
  } catch (error) {
    return NextResponse.json({ error: "خطا در حذف محتوا" }, { status: 500 });
  }
}
