import { NextResponse, NextRequest } from "next/server";
import { Resend } from "resend";
import { SubscriptionEmail } from "../../../../components/email/subscriptionEmail"
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";



const resend = new Resend(process.env.RESEND_SECRET_KEY);

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  console.log(user);

  try {
    await resend.emails.send({
        from: 'Learn404 <no-reply@learn404.com>',
        to: [user?.email!],
        subject: 'Bienvenue sur Learn404 !',
        text: `Bienvenue sur notre plateforme Learn404, ${user?.name ?? 'User'}!`,
        react: SubscriptionEmail({ name: user?.name! }),
        headers: {
          'List-Unsubscribe': `https://${process.env.AUTH_URL}/api/email/unsubscribe>`,
        },
      });
    } catch (error) {
    console.error("Error sending email", error);
  }
  return NextResponse.json({ success: true });
}
