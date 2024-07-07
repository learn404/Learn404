import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const categories = await prisma.categories.findMany(
    {
      select: {
        id: true,
        name: true,
      },
    }
  );
  return NextResponse.json(categories);
}