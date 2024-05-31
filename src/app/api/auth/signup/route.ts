import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

interface UserRequest {
  firstname: string;
  name: string;
  password: string;
  email: string;
}

export async function POST(request: Request) {
  try {
    const { firstname, name, password, email }: UserRequest =
      await request.json();

    const checkUser = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });
    if (checkUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email: email,
        name: firstname + " " + name,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "User created successfully" },

      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
