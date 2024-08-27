import { currentUser } from "@/lib/current-user";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { SubscriptionEmail } from "../../../../components/email/subscriptionEmail";

const resend = new Resend(process.env.RESEND_SECRET_KEY);

export async function POST(request: NextRequest) {
  const { email }: { email: string } = await request.json();

  const { user } = await currentUser();

  if (!user || user.email !== email) {
    return NextResponse.json({ message: "Accès refusé" }, { status: 403 });
  }

  try {
    await resend.emails.send({
        from: 'Learn404 <no-reply@learn404.com>',
        to: [user?.email!],
        subject: 'Bienvenue sur Learn404 !',
        text: `Bienvenue sur notre plateforme Learn404, ${user?.name ?? 'User'}!`,
        react: SubscriptionEmail({ name: user?.name! }),
        headers: {
          'List-Unsubscribe': `https://${process.env.AUTH_URL}unsubscribe>`,
        },
      });
    } catch (error) {
    console.error("Error sending email", error);
  }
  return NextResponse.json({ success: true });
}
