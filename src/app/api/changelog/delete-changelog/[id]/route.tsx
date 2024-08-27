import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { currentUser } from "@/lib/current-user";

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();

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
  const response = await prisma.changeLog.delete({
    where: {
      id: id,
    },
  });
  return NextResponse.json(response);
}
