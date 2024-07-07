import { currentUserType } from "@/lib/current-user";
import HeaderDashboard from "./headerDashboard/headerDashboard";

interface ContentLayoutProps {
  user: currentUserType;
  title: string;
  children: React.ReactNode;
}

export function ContentLayout({ user, title, children }: ContentLayoutProps) {

  return (
    <div>
      <HeaderDashboard user={user} title={title} />
      {children}
    </div>
  )
}