import HeaderDashboard from "@/components/layout/headerDashboard/headerDashboard";
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
    <>
      <HeaderDashboard session={sessionData} />
      <main className="max-w-7xl mx-auto my-12 space-y-5 container">
        <h1 className="text-2xl font-semibold">
          Welcome back, {user?.name || user?.email}
        </h1>
      </main>
    </>
  );
}
