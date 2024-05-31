import React from "react";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/buttons/auth/loginButton";
import { auth } from "@/lib/auth";

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const user = session?.user;

  return (
    <main className="max-w-7xl mx-auto my-12 space-y-5 container">
      <h1 className="text-2xl font-semibold">
        Welcome back, {user?.name || user?.email}
      </h1>
      <LogoutButton />
    </main>
  );
}
