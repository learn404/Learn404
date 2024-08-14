import { currentUser } from "@/lib/current-user";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId }: { userId: string } = await req.json();

  try {
    const user = await currentUser();
    
    if (!user || (user?.id !== userId && !user.admin)) {
      return NextResponse.json(
        {
          message: "Accès refusé, vous ne pouvez pas supprimer ce profil",
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
