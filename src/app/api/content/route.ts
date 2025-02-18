// app/api/content/route.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const contents = await prisma.content.findMany();
  return Response.json(contents);
}

export async function POST(req: Request) {
  const { title, description } = await req.json();
  if (!title)
    return Response.json({ error: "عنوان الزامی است" }, { status: 400 });

  const newContent = await prisma.content.create({
    data: { title, description },
  });

  return Response.json(newContent, { status: 201 });
}
