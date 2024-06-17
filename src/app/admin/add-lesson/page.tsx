import HeaderDashboard from "@/components/layout/headerDashboard/headerDashboard";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import AddLessonForm from "./Form";

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
