import { currentUserType } from "@/lib/current-user";
import HeaderDashboard from "./headerDashboard/headerDashboard";

interface DashboardLayoutProps {
  user: currentUserType;
  title: string;
  children: React.ReactNode;
}

export function DashboardLayout({ user, title, children }: DashboardLayoutProps) {

  return (
    <div>
      <HeaderDashboard user={user} title={title} />
      {children}
    </div>
  )
}