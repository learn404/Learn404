import { SheetMenu } from "@/components/sheet-menu";
import prisma from "@/lib/prisma";
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
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary py-2">
      <div className="mx-4 sm:mx-8 flex h-14 items-center">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <h1 className="font-bold">{title}</h1>
        </div>
        <div className="flex flex-1 items-center space-x-2 justify-end">
          {/* <ModeToggle /> */}
          <UserDropdown session={session} isAdmin={isAdmin} isAvatar={isAvatar} />
        </div>
      </div>
    </header>
  );
}
