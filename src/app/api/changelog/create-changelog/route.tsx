import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const { title, content, version } = await request.json();
  
  await prisma.changeLog.create({
    data: {
      title,
      content,
      version,
    },
  });


  return NextResponse.json({ message: "Changelog créé avec succès" });
}