import Footer from "@/components/layout/footer";
import HeaderDashboard from "@/components/layout/headerDashboard/headerDashboard";
import prisma from "@/lib/prisma";

import { currentUser } from "@/lib/current-user";
import SettingsForm from "./SettingsForm";

export default async function Settings() {
  const user = await currentUser();

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
        user={user}
        title="Paramètres"
      ></HeaderDashboard>
      <SettingsForm user={user} accountData={accountData} />
      <Footer />
    </>
  );
}
