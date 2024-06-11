
import PaymentBox from "@/app/stripe/PaymentBox";
import HeaderDashboard from "@/components/layout/headerDashboard/headerDashboard";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

import { redirect } from "next/navigation";

export default async function Subscriptions() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const isMember = await prisma.user.findUnique({
    where: {
      email: session.user?.email!,
    },
    select: {
      isMember: true,
    },
  })

  if (isMember?.isMember) {
    redirect("/dashboard");
  }

  const sessionData = {
    user: {
      name: session?.user?.name as string,
      email: session?.user?.email as string,
      image: session?.user?.image as string,
    },
    expires: session?.expires as string,
  }

  return (
    <>
      <HeaderDashboard session={sessionData}/>
      <main className="max-w-7xl mx-auto my-12 space-y-5 container">
        <PaymentBox userEmail={session.user?.email!} />
      </main>
    </>
  );
}
