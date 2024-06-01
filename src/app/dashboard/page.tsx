import React from "react";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/buttons/auth/AuthButton";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export default async function Dashboard() {
  const session = await auth();

  const adminCheck = await prisma.user.findFirst({
    where: {
      email: session?.user?.email,
    },
    select: {
      Admin: true,
    },
  });

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
