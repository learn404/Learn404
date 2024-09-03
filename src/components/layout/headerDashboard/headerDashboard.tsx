import FeedbackMenu from "@/components/dashboard/feedback-menu";
import { currentUserType } from "@/lib/current-user";
import { getLessons } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import SearchInput from "../searchInput";
import UserDropdown from "./userDropDown";

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

  const lesson = await getLessons();

  return (
    <header className="z-10 bg-bg-primary shadow backdrop-blur border-b-2 border-gray-900 py-2 mb-5 px-6 md:px-8">
      <div className="max-w-[1436px] w-full mx-auto flex h-14 items-center">
        <div className="flex items-center">
          <Link href="/" className="flex-1 flex items-center gap-2">
            <Image src="/img/logo_text.svg" alt="logo" width={0} height={0} sizes="20vw" className="w-32 h-auto" />
          </Link>
          <div className="hidden md:block h-7 shrink-0 px-4">
            <div className="h-full w-[1px] bg-border"></div>
          </div>
          <h1 className="hidden md:block text-xl font-medium text-torea-50">{title}</h1>
        </div>
        <div className="flex flex-1 items-center space-x-2 justify-end gap-4">
          <div className="hidden lg:flex items-center gap-2">
            <FeedbackMenu />
            <SearchInput lessons={lesson}/>
          </div>
          <UserDropdown user={user} isAdmin={isAdmin} isAvatar={isAvatar} />
        </div>
      </div>
    </header>
  );
}
