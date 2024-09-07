import { currentUser } from "@/lib/current-user";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { code, discount } = await req.json();

  try {
    const { user } = await currentUser();

    if (!user || !user.admin) {
      return NextResponse.json(
        {
          message: "Accès refusé, vous ne pouvez pas effectuer cette action",
        },
        { status: 403 }
      );
    }

    await prisma.coupon.create({
      data: {
        userId: user.id,
        code,
        discount,
      },
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
