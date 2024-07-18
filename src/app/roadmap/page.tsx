import HeaderDashboard from "@/components/layout/headerDashboard/headerDashboard";
import Header from "@/components/layout/header";
import prisma from "@/lib/prisma";
import Footer from "@/components/layout/footer";

import { auth } from "@/lib/auth";
import AddRoadMapButton from "@/components/buttons/AddRoadMapButton";
import RoadMapSection from "./RoadMapSection";

export default async function Roadmap() {
  const session = await auth();

  let user = null;
  if (session?.user?.email) {
    user = await prisma.user.findFirst({
      where: {
        email: session?.user?.email,
      },
    });
  }

  const roadmaps = await prisma.roadmap.findMany();

  return (
    <div>
      {user ? (
        <HeaderDashboard user={user} title="Roadmap Learn404" />
      ) : (
        <Header />
      )}
      <div className="max-w-[70vw] mx-auto">
        <div className="flex justify-between items-center my-4">
          <h1>Roadmap Learn404</h1>
          {user?.admin ? <AddRoadMapButton /> : null}
        </div>
        <RoadMapSection roadmaps={roadmaps} user={user?.id || ""} />
      </div>
      <Footer />
    </div>
  );
}
