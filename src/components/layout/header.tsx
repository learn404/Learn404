import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { LayoutDashboard, LogIn, Play, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
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
        <div className="flex items-center justify-start gap-10 lg:gap-16">
          <Link href="/">
            <div className="flex items-center gap-5">
              <Image src="/img/logo.png" alt="logo" width={30} height={30} />
              <h3 className="hidden md:block text-xl font-semibold text-torea-50">
                Learn404
              </h3>
            </div>
          </Link>
          <div className="hidden lg:flex items-center justify-center gap-9">
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
              <Link href="/dashboard">
                <Button variant="default">
                  <LayoutDashboard size={20} />
                <span className="font-medium text-sm">Dashboard</span>
              </Button>
              </Link>
              {isAdmin && (
                <Link href="/admin">
                <Button variant="default" type="button">
                  <span className="hidden md:block font-medium">Admin</span>
                  <Shield size={20} className="block md:hidden" />
                </Button>
                </Link>
              )}
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href="/join">
                <Button variant="default">
                  <Play size={20} />
                  <span className="md:block font-medium">Acheter</span>
                </Button>
              </Link>
              <Link href="/join">
                <Button variant="secondary">
                  <LogIn size={20} />
                <span className="hidden md:block font-medium">
                  Se connecter
                </span>
              </Button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}