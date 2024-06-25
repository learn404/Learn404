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
  });

  const sessionData = {
    user: {
      name: session?.user?.name as string,
      email: session?.user?.email as string,
      image: session?.user?.image as string,
    },
    expires: session?.expires as string,
  };

  return (
    <>
      <HeaderDashboard session={sessionData} />
      <SettingsForm user={user} />

      <Footer />
    </>
  );
}
