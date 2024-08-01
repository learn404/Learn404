import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(request: NextRequest) {
    const { email } = await request.json()
    
    try {

      /*   const contact = await prisma.wishlist.findUnique({
            where: {
                email: email
            },
            select : {
                id_resend: true
            }
        }) */

      /*   await resend.contacts.update({
            unsubscribed: true,
            audienceId: process.env.RESEND_AUDIENCE_ID,
            id : contact?.
        }) */

        const contact = await prisma.wishlist.findUnique({
            where: {
                email: email
            }
        })

        if (!contact) {
            return NextResponse.json({ message: "Vous n'êtes pas inscrit à la Wishlist" })
        }

        await prisma.wishlist.delete({
            where: {
            email: email
            }
        })


        return NextResponse.json({ message: "Vous avez été désabonné avec succès" })
    } catch (error) {
        return NextResponse.json({ message: "Une erreur est survenue" })
    }
}