import PrimaryButton from "@/components/buttons/PrimaryButton";
import HeaderDashboard from "@/components/layout/headerDashboard/headerDashboard";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import LessonTable from "./LessonTable";
import UserTable from "./UserTable";

export default async function AdminDashboard() {
  const session = await auth();
  if (!session) {
    return redirect("/");
  }

  const adminCheck = await prisma.user.findFirst({
    where: {
      email: session?.user?.email,
    },
    select: {
      admin: true,
    },
  });

  if (!adminCheck?.admin || !session || !adminCheck) {
    return redirect("/");
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
    <div>
      <HeaderDashboard session={sessionData} />
      <main className="px-4">
        <h1 className="py-8 text-2xl font-bold">Admin Dashboard</h1>
        <PrimaryButton redirectTo="/admin/add-lesson">Add Lesson</PrimaryButton>
        <div className="grid grid-cols-none md:grid-cols-12 gap-4">
          <div className="md:col-span-7 bg-white/10 p-4 rounded-lg">
            <h2 className="p-2 font-semibold text-xl">Users</h2>
            <div className="z-10  max-h-[40vh] overflow-y-auto shadow-md sm:rounded-lg">
              <UserTable />
            </div>
          </div>
          <div className="md:col-span-5 md:col-start-8 bg-white/10 p-4 rounded-lg">
            <h2 className="p-2 font-semibold text-xl">Lessons</h2>
            <div className="z-10 max-h-[40vh] overflow-y-auto shadow-md sm:rounded-lg">
              <LessonTable />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
