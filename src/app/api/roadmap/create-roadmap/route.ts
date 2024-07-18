import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  
    const { title, content, priority, type, status } = await req.json();

    await prisma.roadmap.create({
        data: {
            title: title,
            description: content,
            priority: priority,
            type: type,
            status: status,
        }
    })


  return NextResponse.json({ message: "Roadmap created" });
}