import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// تابع GET: دریافت آمار کلی از محتواها و محتواهای حذف شده
export async function GET() {
  try {
    // تنظیم تاریخ امروز برای فیلتر محتواهای اضافه‌شده یا حذف‌شده امروز
    const today = new Date();
    today.setHours(0, 0, 0, 0); // شروع امروز (نیمه‌شب)

    // تعداد کل محتواها
    const totalPosts = await prisma.content.count();

    // تعداد محتواهای اضافه‌شده امروز
    const addedToday = await prisma.content.count({
      where: { createdAt: { gte: today } }, // فیلتر بر اساس تاریخ ایجاد
    });

    // تعداد کل محتواهای حذف‌شده
    const totalDeleted = await prisma.deletedContent.count();

    // تعداد محتواهای حذف‌شده امروز
    const deletedToday = await prisma.deletedContent.count({
      where: { deletedAt: { gte: today } }, // فیلتر بر اساس تاریخ حذف
    });

    // ارسال آمار به عنوان پاسخ
    return NextResponse.json({
      totalPosts,
      addedToday,
      deletedToday,
      totalDeleted,
    });
  } catch {
    // در صورت بروز خطا، پیام خطا برگردانده می‌شود
    return NextResponse.json({ error: "خطا در دریافت آمار" }, { status: 500 });
  }
}
