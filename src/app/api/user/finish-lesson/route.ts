import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const { userId, lessonId } = await req.json();

    const checkProgress = await prisma.lessonProgress.findFirst({
      where: {
        userId: userId,
        lessonId: lessonId,
      },
    });

    if (!checkProgress) {
      const progress = await prisma.lessonProgress.create({
        data: {
          userId: userId,
          lessonId: lessonId,
          completed: true,
        },
      });
    } else {
      await prisma.lessonProgress.update({
        where: {
          id: checkProgress.id,
        },
        data: {
          completed: !checkProgress?.completed,
        },
      });
    }

    return NextResponse.json(
      { message: "Progression mise à jour" },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
