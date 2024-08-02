import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import PrimaryButton from "../buttons/PrimaryButton";
import DropdownLanding from "../dropdown-landing";

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
    <header className="px-6 lg:px-20 pt-6">
      <nav className="mx-auto flex items-center gap-2 max-w-[1436px]">
        <Link href="/" className="flex-1 flex items-center gap-2">
          <Image src="/img/logo_text.svg" alt="logo" width={0} height={0} sizes="20vw" className="w-32 h-auto" />
        </Link>
        <div className="text-gray-400 flex items-center font-medium max-md:hidden">
          <Link href="/#fonctionnality" className="hover:text-gray-200 transition-colors px-5 py-4">Features</Link>
          <Link href="/#prices" className="hover:text-gray-200 transition-colors px-5 py-4">Pricing</Link>
          <Link href="/#faq" className="hover:text-gray-200 transition-colors px-5 py-4">FAQ</Link>
        </div>
        <div className="flex-1 flex items-center gap-1 justify-end">
          {session ? (
            <DropdownLanding session={session} isAdmin={isAdmin} />
          ) : (
            <>
              <PrimaryButton redirectTo="/join" type="button">
                <Image src="/img/Logo_icon_blanc.svg" alt="logo icon" width={20} height={20} sizes="10vw" />
                <span className="md:block font-medium">Rejoindre Learn404</span>
              </PrimaryButton>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}