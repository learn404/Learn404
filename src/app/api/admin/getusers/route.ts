import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        Admin: true,
        createdAt: true,
      },
    });
    users.sort((a, b) => {
      return a.createdAt > b.createdAt ? -1 : 1;
    });

    return NextResponse.json(
      { message: "Users fetched successfully", users: users },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
