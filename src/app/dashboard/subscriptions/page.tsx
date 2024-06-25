
import PaymentBox from "@/app/stripe/PaymentBox";
import Footer from "@/components/layout/footer";
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
      <main className="max-w-7xl mx-auto my-20 space-y-5 container md:flex md:items-start md:justify-center md:gap-x-20 px-12">
        <div className="max-w-lg mt-4 text-torea-50">
          <h1 className="text-4xl font-semibold">Dernière étape</h1>
          <p className="mt-3">Débloque toutes nos connaissances et libère ton potentiel de développeur !</p>
        </div>
        <PaymentBox userEmail={session.user?.email!} />
      </main>
      <Footer />
    </>
  );
}
