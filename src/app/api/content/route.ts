import { PrismaClient } from "@prisma/client";

// ایجاد یک نمونه از PrismaClient برای تعامل با دیتابیس
const prisma = new PrismaClient();

// تابع GET: دریافت لیست تمام محتواها از دیتابیس
export async function GET() {
  const contents = await prisma.content.findMany(); // دریافت تمام محتواها
  return Response.json(contents); // ارسال محتواها به عنوان پاسخ
}

// تابع POST: ایجاد محتوای جدید در دیتابیس
export async function POST(req: Request) {
  // دریافت عنوان و توضیحات از بدنه‌ی درخواست
  const { title, description } = await req.json();

  // بررسی اینکه عنوان وارد شده است یا خیر
  if (!title)
    return Response.json({ error: "عنوان الزامی است" }, { status: 400 });

  // ایجاد محتوای جدید در دیتابیس
  const newContent = await prisma.content.create({
    data: { title, description },
  });

  // ارسال محتوای ایجاد شده به عنوان پاسخ با وضعیت 201 (Created)
  return Response.json(newContent, { status: 201 });
}
