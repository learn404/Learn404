import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { userId } = await req.json();

  try {
    const user = await prisma.user.delete({
      where: { id: userId },
    });
    return NextResponse.json({ message: "L'utilisateur a été supprimé avec succès", user });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { message: "Echec de la suppression de l'utilisateur" },
      { status: 500 }
    );
  }
}
