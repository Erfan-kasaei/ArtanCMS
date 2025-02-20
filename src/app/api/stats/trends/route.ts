import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// تابع GET: دریافت روند آمار محتواهای اضافه‌شده و حذف‌شده در ۷ روز اخیر
export async function GET() {
  try {
    // تنظیم تاریخ امروز برای محاسبه‌ی روند
    const today = new Date();
    today.setHours(0, 0, 0, 0); // شروع امروز (نیمه‌شب)

    // آرایه‌ای برای ذخیره‌ی داده‌های روند
    const trendData = [];

    // حلقه برای محاسبه‌ی آمار هر روز در ۷ روز اخیر
    for (let i = 6; i >= 0; i--) {
      // محاسبه‌ی تاریخ روز مورد نظر
      const date = new Date(today);
      date.setDate(today.getDate() - i);

      // تعداد محتواهای اضافه‌شده در روز مورد نظر
      const addedCount = await prisma.content.count({
        where: {
          createdAt: {
            gte: date, // بزرگ‌تر یا مساوی تاریخ شروع روز
            lt: new Date(date.getTime() + 86400000), // کوچک‌تر از تاریخ شروع روز بعد
          },
        },
      });

      // تعداد محتواهای حذف‌شده در روز مورد نظر
      const deletedCount = await prisma.deletedContent.count({
        where: {
          deletedAt: {
            gte: date, // بزرگ‌تر یا مساوی تاریخ شروع روز
            lt: new Date(date.getTime() + 86400000), // کوچک‌تر از تاریخ شروع روز بعد
          },
        },
      });

      // افزودن داده‌های روز به آرایه‌ی trendData
      trendData.push({
        date: date.toLocaleDateString("fa-IR"), // تاریخ به فرمت فارسی
        added: addedCount, // تعداد محتواهای اضافه‌شده
        deleted: deletedCount, // تعداد محتواهای حذف‌شده
      });
    }

    // ارسال داده‌های روند به عنوان پاسخ
    return NextResponse.json(trendData);
  } catch {
    // در صورت بروز خطا، پیام خطا برگردانده می‌شود
    return NextResponse.json(
      { error: "خطا در دریافت روند آمار" },
      { status: 500 }
    );
  }
}
