import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// تابع PATCH: ویرایش محتوای موجود
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // دریافت عنوان و توضیحات جدید از بدنه‌ی درخواست
    const { title, description } = await req.json();

    // به‌روزرسانی محتوا در دیتابیس
    const updatedContent = await prisma.content.update({
      where: { id: params.id }, // شناسه‌ی محتوایی که باید ویرایش شود
      data: { title, description }, // داده‌های جدید
    });

    // ارسال محتوای ویرایش شده به عنوان پاسخ
    return NextResponse.json(updatedContent);
  } catch (error) {
    // در صورت بروز خطا، پیام خطا برگردانده می‌شود
    return NextResponse.json({ error: "خطا در ویرایش محتوا" }, { status: 500 });
  }
}

// تابع DELETE: حذف محتوا و ذخیره‌ی آن در آرشیو
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // یافتن محتوای مورد نظر برای حذف
    const content = await prisma.content.findUnique({
      where: { id: params.id },
    });

    // اگر محتوا یافت نشد، خطا برگردانده می‌شود
    if (!content) {
      return NextResponse.json({ error: "محتوا یافت نشد" }, { status: 404 });
    }

    // ذخیره‌ی محتوا در جدول آرشیو قبل از حذف
    await prisma.deletedContent.create({
      data: {
        title: content.title,
        description: content.description,
      },
    });

    // حذف محتوا از جدول اصلی
    await prisma.content.delete({ where: { id: params.id } });

    // ارسال پیام موفقیت‌آمیز
    return NextResponse.json({ message: "محتوا حذف شد و در آرشیو ذخیره شد" });
  } catch (error) {
    // در صورت بروز خطا، پیام خطا برگردانده می‌شود
    return NextResponse.json({ error: "خطا در حذف محتوا" }, { status: 500 });
  }
}
