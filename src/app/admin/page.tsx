import PrimaryButton from "@/components/buttons/PrimaryButton";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

import HeaderDashboard from "@/components/layout//headerDashboard/headerDashboard";
import UserTable from "./Table";

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
  console.log(adminCheck);
  if (!adminCheck?.admin || !session || !adminCheck) {
    return redirect("/");
  }

  return (
    <div>
      <HeaderDashboard />
      <main className="px-4">
        <h1 className="py-8 text-2xl font-bold">Admin Dashboard</h1>
        <PrimaryButton redirectTo="/admin/add-lesson">Add Lesson</PrimaryButton>
        <div className="grid grid-cols-none md:grid-cols-12 md:grid-rows-5 gap-4 ">
          <div className="md:col-span-7 bg-white/10 p-4 rounded-lg">
            <h2 className="p-2 font-semibold text-xl">Users</h2>
            <div className="z-10 relative overflow-x-auto shadow-md sm:rounded-lg">
              <UserTable />
            </div>
          </div>
          <div className="md:col-span-5  md:col-start-8 bg-white/10">2</div>
        </div>
      </main>
    </div>
  );
}
