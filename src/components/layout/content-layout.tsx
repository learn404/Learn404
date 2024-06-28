import HeaderDashboard from "./headerDashboard/headerDashboard";

interface ContentLayoutProps {
  session: any;
  title: string;
  children: React.ReactNode;
}

export function ContentLayout({ session, title, children }: ContentLayoutProps) {

  return (
    <div>
      <HeaderDashboard session={session} title={title} />
      {children}
    </div>
  )
}