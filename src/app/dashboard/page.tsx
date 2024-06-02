import PrimaryButton from "@/components/buttons/PrimaryButton";
import { LogoutButton } from "@/components/buttons/auth/AuthButton";
import HeaderDashboard from "@/components/layout/headerDashboard/headerDashboard";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();
  console.log("Session:", session);
  
  
  if (!session) {
    redirect("/login");
  }
  
  const adminCheck = await prisma.user.findFirst({
    where: {
      email: session?.user?.email,
    },
    select: {
      admin: true,
    },
  });


  const user = session?.user;

  return (
    <>
      <HeaderDashboard />
      <main className="max-w-7xl mx-auto my-12 space-y-5 container">
        <h1 className="text-2xl font-semibold">
          Welcome back, {user?.name || user?.email}
        </h1>
        {adminCheck?.admin && (
          <PrimaryButton redirectTo="/admin">Admin Dashboard</PrimaryButton>
        )}
        <LogoutButton />
      </main>
    </>
  );
}
