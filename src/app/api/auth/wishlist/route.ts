import { WishlistEmail } from "@/components/email/wishlistEmail";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_SECRET_KEY);
const regexEmail = /(?:[a-z0-9!#$%&'*+\=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gm

export async function POST(request: Request) {
  try {
    const { email }: { email: string } = await request.json();

    if (!email || !regexEmail.test(email)) {
      return NextResponse.json(
        { message: "Adresse email invalide." },
        { status: 400 }
      );
    }

    // On vérifie si l'utilisateur est déjà inscrit à la wishlist
    const user = await prisma.wishlist.findFirst({
      where: {
        email: email,
      },
    });

    // Si l'utilisateur est déjà inscrit à la wishlist, on retourne une erreur
    if (user) {
      return NextResponse.json(
        { message: "Tu es déjà inscrit à la wishlist." },
        { status: 400 }
      );
    }

    // Si l'utilisateur n'est pas inscrit, on l'ajoute à la wishlist
    await prisma.wishlist.create({
      data: {
        email: email,
      },
    });

    // On envoie un email de bienvenue à l'utilisateur
    await resend.emails.send({
      from: "Learn404 <noreply@learn404.com>",
      to: [email],
      subject: "Bienvenue sur la wishlist !",
      text: `Bienvenue sur notre plateforme Learn404, ${email}!`,
      react: WishlistEmail({ name: email }),
    });

    // On ajoute l'utilisateur à la liste de diffusion
    await resend.contacts.create({
      email: email,
      unsubscribed: false,
      audienceId: `${process.env.RESEND_AUDIENCE_ID}`,
    });


    return NextResponse.json(
      { message: "Souscription réussie. Un mail de bienvenue a été envoyé." },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Une erreur est survenue au moment de l'inscription." },
      { status: 400 }
    );
  }
}
