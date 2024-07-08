import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const { userId } = await request.json();
  
  try {
    if (!userId) {
      return NextResponse.json(
        { message: "Aucun utilisateur trouvé" },
        { status: 400 }
      );
    }
    
     await prisma.account.delete({
      where: {
        userId: userId,
      },
    });

    await prisma.session.deleteMany({
      where: {
        userId: userId,
      },
    });

    await prisma.lessonProgress.deleteMany({
      where: {
        userId: userId,
      },
    });

    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    return NextResponse.json({ message: "Compte supprimé avec succès" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Erreur lors de la suppression du compte" },
      { status: 500 }
    );
  }
}
