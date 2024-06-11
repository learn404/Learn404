import SecondaryButton from "@/components/buttons/SecondaryButton";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { LayoutDashboard, LogIn, Play, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PrimaryButton from "../buttons/PrimaryButton";
import { LogoutButton } from "../buttons/auth/AuthButton";

export default async function Header() {
  const session = await auth();
  let isAdmin = false;

  if (session) {
    const checkAdmin = await prisma.user.findFirst({
      where: {
        email: session?.user?.email,
      },
      select: {
        admin: true,
      },
    });
    if (checkAdmin) {
      isAdmin = checkAdmin.admin;
    }
  }

  return (
    <header className="p-4 m-auto w-full">
      <nav className="rounded-lg bg-black bg-opacity-20 backdrop-blur-xl flex items-center justify-between px-8 py-4 relative">
        <div className="flex items-center justify-start gap-20">
          <Link href="/">
            <div className="flex items-center gap-5">
              <Image src="/img/logo.png" alt="logo" width={30} height={30} />
              <h3 className="hidden md:block text-xl font-semibold text-torea-50">
                Learn404
              </h3>
            </div>
          </Link>
          <div className="hidden lg:flex items-center justify-center gap-6 md:gap-12">
            <Link
              href="/#fonctionnality"
              className="text-gray-400 hover:text-torea-50 duration-200"
            >
              Fonctionnalités
            </Link>
            <Link
              href="/#prices"
              className="text-gray-400 hover:text-torea-50 duration-200"
            >
              Prix
            </Link>
            <Link
              href="/"
              className="text-gray-400 hover:text-torea-50 duration-200"
            >
              A propos
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {session ? (
            <>
              <PrimaryButton redirectTo="/dashboard" type="button">
                <span className="hidden md:block font-medium">Dashboard</span>
                <LayoutDashboard size={20} className="block md:hidden" />
              </PrimaryButton>
              {isAdmin && (
                <PrimaryButton redirectTo="/admin" type="button">
                  <span className="hidden md:block font-medium">Admin</span>
                  <Shield size={20} className="block md:hidden" />
                </PrimaryButton>
              )}
              <LogoutButton />
            </>
          ) : (
            <>
              <PrimaryButton redirectTo="/join" type="button">
                <Play size={20} />
                <span className="md:block font-medium">Acheter</span>
              </PrimaryButton>
              <SecondaryButton redirectTo="/join" type="button">
                <LogIn size={20} />
                <span className="hidden md:block font-medium">
                  Se connecter
                </span>
              </SecondaryButton>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
