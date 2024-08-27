import { currentUser } from "@/lib/current-user";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();

    const { user } = await currentUser();

    if (!user || (!user.admin && user.id !== userId)) {
      return NextResponse.json(
        {
          message:
            "Accès refusé, vous n'êtes pas admin, merci de ne pas tenter de faire des requêtes illégales",
        },
        { status: 403 }
      );
    }

    await prisma.lessonProgress.deleteMany({
      where: {
        userId: userId,
      },
    });

    return NextResponse.json(
      { message: "La progression a été réinitialisée avec succès" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Erreur lors de la reinitialisation de la progression" },
      { status: 500 }
    );
  }
}
