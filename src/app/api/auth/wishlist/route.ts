import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Resend } from "resend";
import wishlistEmail from "@/components/email/wishlistEmail";

const resend = new Resend(process.env.RESEND_SECRET_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    const user = await prisma.wishlist.findFirst({
      where: {
        email: email,
      },
    });

    if (user) {
      return NextResponse.json(
        { message: "Tu es déjà inscris à la wishlist" },
        { status: 404 }
      );
    }

    

    await resend.emails.send({
      from: "Learn404 <noreply@learn404.com>",
      to: [email],

      subject: "Confirmation d'inscription à la Wishlist Learn404",
      react: wishlistEmail({ name: "Cher(e) Membre" }),
      text: "Bienvenue sur la Wishlist de Learn404 !",
      headers: {
        'List-Unsubscribe': '<https://learn404.com/unsubscribe>',
      },
    });

     const contact = await resend.contacts.create({
      email: email,
      unsubscribed: false,
      audienceId: process.env.RESEND_AUDIENCE_ID || "",
    });

    await prisma.wishlist.create({
      data: {
        email: email,
       
      },
    });

    return NextResponse.json(
      { message: "Tu es ajouté à la Wishlist" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
