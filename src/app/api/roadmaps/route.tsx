import { NextResponse, NextRequest } from "next/server";
import  prisma  from "@/lib/prisma";

export async function POST(req: NextRequest) {
    const { id, userId } = await req.json();


    const existingVote = await prisma.roadmapVote.findFirst({
        where: {
            userId: userId,
            roadmapId: id
        }
    })

    if (existingVote) {
        await prisma.roadmapVote.delete({
            where: {
                id: existingVote.id
            }
        })
        await prisma.roadmap.update({
            where: {
                id: id
            },
            data: {
                upvotes: {
                    decrement: 1
                }
            }
        })

        return NextResponse.json({ amount: -1 });
    }


    await prisma.roadmap.update({
        where: {
            id: id
        },
        data: {
            upvotes : {
                increment: 1
            }
        }
    });

    await prisma.roadmapVote.create({
        data: {
            userId: userId,
            roadmapId: id
        }
    })

    return NextResponse.json({ amount: 1 });

}