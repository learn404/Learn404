import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();

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
