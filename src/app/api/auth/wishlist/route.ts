import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { email, } = await request.json();

    const user = await prisma.wishtlist.findFirst({
      where: { email },
      select: {
        id: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Tu es déjà inscris à la WhiteList" },
        { status: 404 },
      );
    }

    await prisma.wishtlist.create({
      data: {
        email: email,
      },
    });

    return NextResponse.json(
      { message: "Tu es ajouté à la Wishlist" },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
