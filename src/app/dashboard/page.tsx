import PrimaryButton from "@/components/buttons/PrimaryButton";

import HeaderDashboard from "@/components/layout/headerDashboard/headerDashboard";
import { auth } from "@/lib/auth";

import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const user = session?.user;

  return (
    <>
      <HeaderDashboard />
      <main className="max-w-7xl mx-auto my-12 space-y-5 container">
        <h1 className="text-2xl font-semibold">
          Welcome back, {user?.name || user?.email}
        </h1>
      </main>
    </>
  );
}
