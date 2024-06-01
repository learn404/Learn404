import Image from "next/image";
import Link from "next/link";
import { auth } from "@/lib/auth";
import UserDropdown from "./userDropDown";
import { redirect } from "next/navigation";

export default async function HeaderDashboard() {
  const session = await auth();
  const isAvatar = session?.user?.image ? true : false;

  if (!session) {
    redirect("/login");
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
        <UserDropdown isAvatar={isAvatar} session={session} />
      </nav>
    </header>
  );
}
