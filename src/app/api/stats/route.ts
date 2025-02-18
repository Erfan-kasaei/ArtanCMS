import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const totalPosts = await prisma.content.count();
    const addedToday = await prisma.content.count({
      where: { createdAt: { gte: today } },
    });
    const totalDeleted = await prisma.deletedContent.count();
    const deletedToday = await prisma.deletedContent.count({
      where: { deletedAt: { gte: today } },
    });

    return NextResponse.json({
      totalPosts,
      addedToday,
      deletedToday,
      totalDeleted,
    });
  } catch (error) {
    return NextResponse.json({ error: "خطا در دریافت آمار" }, { status: 500 });
  }
}
