import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let trendData = [];

    for (let i = 6; i >= 0; i--) {
      let date = new Date(today);
      date.setDate(today.getDate() - i);

      const addedCount = await prisma.content.count({
        where: {
          createdAt: { gte: date, lt: new Date(date.getTime() + 86400000) },
        },
      });

      const deletedCount = await prisma.deletedContent.count({
        where: {
          deletedAt: { gte: date, lt: new Date(date.getTime() + 86400000) },
        },
      });

      trendData.push({
        date: date.toLocaleDateString("fa-IR"),
        added: addedCount,
        deleted: deletedCount,
      });
    }

    return NextResponse.json(trendData);
  } catch (error) {
    return NextResponse.json(
      { error: "خطا در دریافت روند آمار" },
      { status: 500 }
    );
  }
}
