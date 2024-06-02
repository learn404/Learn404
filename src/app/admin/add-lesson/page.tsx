import HeaderDashboard from "@/components/layout/headerDashboard/headerDashboard";
import AddLessonForm from "./Form";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function AddLesson() {
  const session = await auth();

  let isAdmin = false;
  let isAvatar = false;

  if (!session) {
    return redirect("/");
  }

  if (session) {
    isAvatar = session?.user?.image ? true : false;
    const adminCheck = await prisma.user.findFirst({
      where: {
        email: session?.user?.email,
      },
      select: {
        admin: true,
      },
    });

    if (adminCheck?.admin) {
      isAdmin = true;
    }
  }

  if (!isAdmin) {
    redirect("/dashboard");
  }

  return (
    <>
      <HeaderDashboard />
      <main className="px-8">
        <AddLessonForm
          isAdmin={isAdmin}
          session={session}
          isAvatar={isAvatar}
        />
      </main>
    </>
  );
}
