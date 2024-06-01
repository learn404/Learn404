import PrimaryButton from "@/components/buttons/PrimaryButton";
import UserTable from "./Table";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export default async function AdminDashboard() {
  const session = await auth();

  const adminCheck = await prisma.user.findFirst({
    where: {
      email: session?.user?.email,
    },
    select: {
      Admin: true,
    },
  });

  if (!adminCheck?.Admin) {
    return <h1>Not Authorized</h1>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <PrimaryButton redirectTo="/">Home</PrimaryButton>

      <div className="grid grid-cols-none md:grid-cols-12 md:grid-rows-5 gap-4 p-4">
        <div className="md:col-span-7 bg-white/10 p-4 rounded-lg">
          <h2>Users</h2>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <UserTable />
          </div>
        </div>
        <div className="md:col-span-5  md:col-start-8 bg-white/10">2</div>
      </div>
    </div>
  );
}