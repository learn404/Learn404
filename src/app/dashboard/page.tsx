import LessonsSection from "@/components/dashboard/lessons/lesson-section";
import { ContentLayout } from "@/components/layout/content-layout";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

import { redirect } from "next/navigation";


export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    redirect("/join");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email as string,
    },
    select: {
      name: true,
      email: true,
      isMember: true,
      admin: true,
    },
  });

  if (!user?.isMember) {
    redirect("/dashboard/subscriptions/");
  }

  const sessionData = {
    user: {
      name: session?.user?.name as string,
      email: session?.user?.email as string,
      image: session?.user?.image as string,
    },
    expires: session?.expires as string,
  };


  return (
      <ContentLayout title="Dashboard" session={sessionData}>
        <main className="max-w-8xl mx-auto my-12 space-y-7 container">
          {/* <h1 className="text-2xl font-semibold">
            Welcome back, {user?.name || user?.email}
          </h1> */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Prochaines lessons</h2>
            <LessonsSection isAdmin={user.admin} section="next" />
          </section>
          <Separator />
          <section>
            <h2 className="text-xl font-semibold mb-4">Toutes les lessons</h2>
            <LessonsSection isAdmin={user.admin} section="all" />
          </section>
        </main>
      </ContentLayout>
  );
}
