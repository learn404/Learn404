import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { getChangelogData, adminCheckAre } from "@/lib/utils";
import { currentUser } from "@/lib/current-user";

import ChangeLogSection from "./changeLogSection";



export default async function Changelog() {

  const user = await currentUser();

  const ChangelogData = await getChangelogData();
  const isAdminData = await adminCheckAre(user?.email || '');

  return (
    <div>
      <Header />
      <ChangeLogSection ChangelogData={ChangelogData} isAdmin={isAdminData?.admin ?? false} />
      <Footer />
    </div>
  );
}
