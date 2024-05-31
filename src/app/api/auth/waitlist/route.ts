import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { email, firstname, name } = await request.json();

    const user = await prisma.user.findUnique({
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

    await prisma.waitlist.create({
      data: {
        email: email,
        name: name,
        firstName: firstname,
      },
    });

    return NextResponse.json(
      { message: "Tu es ajouté à la WaitList" },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
