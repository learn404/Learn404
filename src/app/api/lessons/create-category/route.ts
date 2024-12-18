import { currentUser } from "@/lib/current-user";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const { categoryName, level, description } = await request.json();

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

  let categoryNameLow = categoryName.trim();

  const category = await prisma.categories.findFirst({
    where: {
      name: categoryNameLow,
    },
  });

  if (category) {
    return NextResponse.json(
      { message: "Catégorie existe déjà" },
      { status: 400 }
    );
  }

  const newCategory = await prisma.categories.create({
    data: {
      name: categoryNameLow,
      level: level,
      description: description,
    }, 
  });

  return NextResponse.json(
    { message: "Catégorie créée avec succès", category: newCategory },
    { status: 200 }
  );
}
