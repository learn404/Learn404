import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { getChangelogData } from "@/lib/utils";

import { currentUser } from "@/lib/current-user";
import ChangeLogSection from "./changeLogSection";

export default async function Changelog() {
  const { user, error } = await currentUser();

  if (error) {
    console.error(error);
  }
  
  const ChangelogData = await getChangelogData();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="px-6 lg:px-20 pt-20 flex-1">
        <div className="mx-auto max-w-7xl">          
          <ChangeLogSection
            ChangelogData={ChangelogData}
            isAdmin={user?.admin ?? false}
          />

        </div>
      </div>
      <Footer />
    </div>
  );
}
