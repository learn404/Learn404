import { WelcomeEmail } from "@/components/email/welcomeEmail";
import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GooglePovider from "next-auth/providers/google";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_SECRET_KEY);

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GooglePovider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        const user_exist = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        if (!user_exist) {

          await resend.emails.send({
            from: "Learn404 <no-reply@learn404.com>",
            to: [user.email!],
            subject: "Bienvenue sur Learn404 !",
            text: `Bienvenue sur notre plateforme Learn404, ${
              user.name ?? "User"
            }!`,
            react: WelcomeEmail({ name: user.name! }),
            headers: {
              "List-Unsubscribe": `https://${process.env.AUTH_URL}unsubscribe>`,
            },
          });

          await resend.contacts.create({
            email: user.email!,
            unsubscribed: false,
            audienceId: process.env.RESEND_AUDIENCE_ID!,
          });

          await prisma.user.update({
            where: { email: user.email! },
            data: { welcomeEmailSent: true },
          });
        }
      } catch (error) {
        console.error("Erreur envoie mail", error);
      }
      return true;
    },
  },
});
