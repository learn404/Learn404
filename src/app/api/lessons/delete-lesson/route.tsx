import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(reponse: NextRequest) {
  const { slug, userId } = await reponse.json();

  const checkAdmin = await prisma.user.findFirst({
    where: { id: userId },
    select: {
      admin: true,
    },
  });
  if (!checkAdmin) {
    return NextResponse.json(
      { message: "Vous n'êtes pas admin" },
      { status: 401 }
    );
  }
  const lesson = await prisma.lessons.findFirst({
    where: { slug: slug },
    select: {
      id: true,
    },
  });

  if (!lesson) {
    return NextResponse.json({ message: "Cours introuvable" }, { status: 404 });
  }

  await prisma.lessons.delete({
    where: {
      id: lesson.id,
    },
  });
  return NextResponse.json({ message: "Cours supprimé avec succès" });
}
