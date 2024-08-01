import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(request: NextRequest) {
    const { id } = await request.json();
    const response = await prisma.changeLog.delete({
        where: {
            id: id,
        },
    });
    return NextResponse.json(response);
}