import Header from "@/components/layout/header";
import HeaderDashboard from "@/components/layout/headerDashboard/headerDashboard";
import Footer from "@/components/layout/footer";
import { getChangelogData, adminCheckAre } from "@/lib/utils";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

import ChangeLogSection from "./changeLogSection";



export default async function Changelog() {

  const session = await auth()

  const user = await prisma.user.findFirst({
    where: {
      email: session?.user?.email
    }
  })
  const ChangelogData = await getChangelogData();
  const isAdminData = await adminCheckAre(user?.email || '');

  return (
    <div>
      {user ? (
        <HeaderDashboard user={user} title="Journal des modifications" />
      ) : (
        <Header />
      )}
      <ChangeLogSection ChangelogData={ChangelogData} isAdmin={isAdminData?.admin ?? false} />
      <Footer />
    </div>
  );
}
