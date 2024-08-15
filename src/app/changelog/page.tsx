import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { getChangelogData, adminCheckAre } from "@/lib/utils";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import AddChangeLogButton from "@/components/buttons/AddChangeLogButton";

import ChangeLogSection from "./changeLogSection";

export default async function Changelog() {
  const session = await auth();

  const user = await prisma.user.findFirst({
    where: {
      email: session?.user?.email,
    },
  });
  const ChangelogData = await getChangelogData();
  const isAdminData = await adminCheckAre(user?.email || "");

  console.log(user);

  return (
    <div>
      <Header />
      {user && user.admin ? <AddChangeLogButton /> : null}{" "}
      <ChangeLogSection
        ChangelogData={ChangelogData}
        isAdmin={isAdminData?.admin ?? false}
      />
      <Footer />
    </div>
  );
}
