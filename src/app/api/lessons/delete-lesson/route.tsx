import { currentUser } from "@/lib/current-user";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(reponse: NextRequest) {
  const { slug } = await reponse.json();

  const { user } = await currentUser();

  if (!user || !user.admin) {
    return NextResponse.json(
      {
        message:
          "Accès refusé, vous n'êtes pas admin, merci de ne pas tenter de faire des requêtes illégales",
      },
      { status: 403 }
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
