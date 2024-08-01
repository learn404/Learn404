import { NextRequest, NextResponse } from "next/server";

import  prisma  from "@/lib/prisma";

export async function POST(request: NextRequest) {
    const { categoryName } = await request.json();

    let categoryNameLow = categoryName.toLowerCase().trim();

    const category = await prisma.categories.findFirst({
        where: {
            name: categoryNameLow,
        }
    })

    if (category) {
        return NextResponse.json({ message: "Catégorie existe déjà" }, { status: 400 });
    }

    const newCategory = await prisma.categories.create({
        data: {
            name: categoryNameLow,
        }
    })

    return NextResponse.json({ message: "Catégorie créée avec succès", category: newCategory }, { status: 200 });
}