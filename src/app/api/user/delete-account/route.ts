import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const { id } = await req.json();

        const roadmap = await prisma.roadmap.update({
            where: { id },
            data: { upvotes: { increment: 1 } }
        });

        console.log(roadmap);
        return NextResponse.json({ message: "Vote added" });
    } catch (error) {
        console.error('Error updating upvotes:', error);
        return NextResponse.json({ message: "Failed to add vote" }, { status: 500 });
    }
}
