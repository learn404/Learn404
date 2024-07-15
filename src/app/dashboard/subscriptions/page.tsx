
import PaymentBox from "@/app/stripe/PaymentBox";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import HeaderDashboard from "@/components/layout/headerDashboard/headerDashboard";
import { auth } from "@/lib/auth";
import { currentUser } from "@/lib/current-user";
import prisma from "@/lib/prisma";

import { redirect } from "next/navigation";

export default async function Subscriptions() {

  const session = await auth();

  if (!session) {
    redirect("/join");
  }

  const user = await prisma.user.findFirst({
    where: {
      email: session?.user?.email,
    },
  });
  
  if (user?.isMember) {
    redirect("/dashboard");
  }

  
  return (
    <>
      <HeaderDashboard user={user!} title="Abonnement" />
      <main className="max-w-7xl mx-auto my-20 space-y-5 container md:flex md:items-start md:justify-center md:gap-x-20 px-12">
        <div className="max-w-lg mt-4 text-torea-50">
          <h1 className="text-4xl font-semibold">Dernière étape</h1>
          <p className="mt-3">Débloque toutes nos connaissances et libère ton potentiel de développeur !</p>
        </div>
        <PaymentBox userEmail={user?.email!} />
      </main>
      <Footer />
    </>
  );
}
