import { currentUser } from "@/lib/current-user";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const { userId, lessonId, hasWatchedOneMinute } = await req.json();

    const user = await currentUser();

    if (!user || user.id !== userId) {
      return NextResponse.json({ message: "Accès refusé" }, { status: 403 })
    };

    const checkProgress = await prisma.lessonProgress.findFirst({
      where: {
        userId: userId,
        lessonId: lessonId,
      },
    });

    if (!checkProgress && hasWatchedOneMinute) {
      await prisma.lessonProgress.create({
        data: {
          userId: userId,
          lessonId: lessonId,
          completed: false,
        },
      });
    } else if ((!hasWatchedOneMinute) && (!checkProgress)) {
      await prisma.lessonProgress.create({
        data: {
          userId: userId,
          lessonId: lessonId,
          completed: true,
        },
      });
    } else if (checkProgress && checkProgress.completed === true) {
      await prisma.lessonProgress.delete({
        where: {
          id: checkProgress.id,
        },
      });
    } else if (checkProgress && checkProgress.completed === false) {
      await prisma.lessonProgress.update({
        where: {
          id: checkProgress.id,
        },
        data: {
          completed: true,
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
