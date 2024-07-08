import HeaderDashboard from "@/components/layout/headerDashboard/headerDashboard";
import Footer from "@/components/layout/footer";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

import SettingsForm from "./SettingsForm";

export default async function Settings() {
  const session = await auth();

  if (!session) {
    redirect("/join");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email as string,
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      admin: true,
      isMember: true,
    },
  });

  const sessionData = {
    user: {
      name: session?.user?.name as string,
      email: session?.user?.email as string,
      image: session?.user?.image as string,
    },
    expires: session?.expires as string,
  };

  const accountData = await prisma.account.findFirst({
    where: {
      userId: user?.id,
    },
    select: {
      id: true,
      userId: true,
      type: true,
      provider: true,
    },
  });

  return (
    <>
      <HeaderDashboard
        session={sessionData}
        title="Paramètres"
      ></HeaderDashboard>
      <SettingsForm user={user} accountData={accountData} />
      <Footer />
    </>
  );
}
