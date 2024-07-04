import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import UserDropdown from "./userDropDown";

type sessionData = {
  user: {
    name: string | null;
    email: string | null;
    image: string | null;
  };
  expires: string | null;
};

interface HeaderDashboardProps {
  session: sessionData;
  title: string;
}

export default async function HeaderDashboard({
  session,
  title,
}: HeaderDashboardProps) {
  let isAvatar = false;
  let isAdmin = false;

  if (session) {
    isAvatar = session?.user?.image ? true : false;

    const adminCheck = await prisma.user.findFirst({
      where: {
        email: session?.user?.email,
      },
      select: {
        admin: true,
      },
    });

    if (adminCheck) {
      isAdmin = adminCheck.admin;
    }
  }

  return (
    <header className="sticky top-0 z-10 w-full bg-black shadow backdrop-blur border-b-2 border-white/10 py-2 mb-5">
      <div className="mx-4 sm:mx-16 flex h-14 items-center">
        <div className="flex items-center">
          <Link href="/">
            <div className="flex items-center gap-5">
              <Image src="/img/logo.png" alt="logo" width={30} height={30} />
              <h3 className="hidden md:block text-xl font-semibold text-torea-50">
                Learn404
              </h3>
            </div>
          </Link>
          <div className="h-7 shrink-0 px-4">
            <div className="h-full w-[1px] bg-border"></div>
          </div>
          <h1 className="text-xl font-semibold text-torea-50">{title}</h1>
        </div>
        <div className="flex flex-1 items-center space-x-2 justify-end">
        
          <UserDropdown session={session} isAdmin={isAdmin} isAvatar={isAvatar} />
        </div>
      </div>
    </header>
  );
}
