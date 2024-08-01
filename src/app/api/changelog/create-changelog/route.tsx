import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { currentUser } from "@/lib/current-user";

export async function POST(request: NextRequest) {
  const { title, content, version } = await request.json();

  const user = await currentUser()

  if (!user || !user.admin) {
    return NextResponse.json({ message: "Accès refusé, vous n'êtes pas admin, merci de ne pas tenter de faire des requêtes illégales" }, { status: 403 });
  }
  
  await prisma.changeLog.create({
    data: {
      title,
      content,
      version,
    },
  });


  return NextResponse.json({ message: "Changelog créé avec succès" });
}