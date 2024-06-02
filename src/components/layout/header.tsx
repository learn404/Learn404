import SecondaryButton from "@/components/buttons/SecondaryButton";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { LogIn } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PrimaryButton from "../buttons/PrimaryButton";
import { LogoutButton } from "../buttons/auth/AuthButton";

export default async function Header() {
  const session = await auth();
  let adminCheck;

  if (session) {
    adminCheck = await prisma.user.findFirst({
      where: {
        email: session?.user?.email,
      },
      select: {
        admin: true,
      }
    });
  }

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
              {adminCheck?.admin && (
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
