import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_SECRET_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    console.log(email);

    const user = await prisma.wishlist.findFirst({
      where: {
        email: email,
      },
    });

    if (user) {
      return NextResponse.json(
          { message: "Tu es déjà inscris à la wishlist" },
          { status: 404 },
      );
  }

    await prisma.wishlist.create({
      data: {
        email: email,
      },
    });



    await resend.emails.send({
      from: 'Learn404 <noreply@learn404.com>',
      to: [email],
      subject: 'Hello world',
      html: '<p>Hello world</p>',
    });


await resend.contacts.create({
  email: email,
  unsubscribed: false,
  audienceId: '6029319e-c00c-4af2-984c-d5e97e5d3050'

});




    return NextResponse.json(
      { message: "Tu es ajouté à la Wishlist" },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
