import Image from "next/image";
import { LogIn, LogOut } from "lucide-react";
import Link from "next/link";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import { auth } from "@/lib/auth";
import PrimaryButton from "../buttons/PrimaryButton";
import { LogoutButton } from "../buttons/auth/AuthButton";
import prisma from "@/lib/prisma";

export default async function Header() {
  const session = await auth();
  console.log(session);

  const adminCheck = await prisma.user.findFirst({
    where: {
      email: session?.user?.email,
    },
    select: {
      Admin: true,
    },
  });

  return (
    <header className="p-8 m-auto w-full">
      <nav className="rounded-lg bg-black bg-opacity-20 backdrop-blur-xl flex items-center justify-between px-8 py-4 relative">
        <Link href="/">
          <div className="flex items-center gap-5">
            <Image src="/img/logo.png" alt="logo" width={25} height={25} />
            <h3 className="hidden md:block text-xl font-semibold">Learn404</h3>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          {session ? (
            <>
              <PrimaryButton redirectTo="/dashboard" type="button">
                <span className="hidden md:block font-medium">Dashboard</span>
              </PrimaryButton>
              {adminCheck?.Admin && (
                <PrimaryButton redirectTo="/admin" type="button">
                  <span className="hidden md:block font-medium">Admin</span>
                </PrimaryButton>
              )}
              <LogoutButton />
            </>
          ) : (
            <SecondaryButton redirectTo="/login" type="button">
              <LogIn size={20} />
              <span className="hidden md:block font-medium">Se connecter</span>
            </SecondaryButton>
          )}
        </div>
      </nav>
    </header>
  );
}
