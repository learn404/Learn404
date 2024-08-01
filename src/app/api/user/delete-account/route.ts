import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { currentUser } from "@/lib/current-user";

export async function POST(req: NextRequest) {
  const { userId } = await req.json();

  try {
    const user = await currentUser();

    if (!user || !user.admin) {
      return NextResponse.json(
        {
          message:
            "Accès refusé, vous n'êtes pas admin, merci de ne pas tenter de faire des requêtes illégales",
        },
        { status: 403 }
      );
    }

    await prisma.session.deleteMany({
      where: { userId },
    });

    await prisma.account.deleteMany({
      where: { userId },
    });

    await prisma.user.delete({
      where: { id: userId },
    });
    return NextResponse.json({
      message: "L'utilisateur a été supprimé avec succès",
      userId,
    });
  } catch (error) {
    console.error(
      "Erreur dans le processus de suppression de l'utilisateur :",
      error
    );
    return NextResponse.json(
      { message: "Echec de la suppression de l'utilisateur" },
      { status: 500 }
    );
  }
}
