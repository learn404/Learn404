import { currentUserType } from "@/lib/current-user";
import Image from "next/image";
import Link from "next/link";
import UserDropdown from "./userDropDown";
import SearchInput from "../searchInput";
import { getLessons } from "@/lib/utils";



interface HeaderDashboardProps {
  user: currentUserType;
  title: string;

}

export default async function HeaderDashboard({
  user,
    title,

}: HeaderDashboardProps) {
  const isAvatar = user?.image ? true : false;
  const isAdmin = user?.admin;

  const lesson = await getLessons()


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
        <div className="flex flex-1 items-center space-x-2 justify-end gap-4">
        
          <SearchInput lessons={lesson}/>
          <UserDropdown user={user} isAdmin={isAdmin} isAvatar={isAvatar} />
        </div>
      </div>
    </header>
  );
}
