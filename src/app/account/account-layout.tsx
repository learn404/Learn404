import AccountMenu from "@/components/account/menu-link";
import Footer from "@/components/layout/footer";
import HeaderDashboard from "@/components/layout/headerDashboard/headerDashboard";
import { currentUserType } from "@/lib/current-user";

interface AccountLayoutProps {
  children: React.ReactNode;
  title: string;
  user: currentUserType;
}

export default async function AccountLayout({ children, title, user }: AccountLayoutProps) {
  
  return (
    <>
      <HeaderDashboard
        user={user}
        title={title}
      />
      <main className="max-w-screen-md w-full mx-auto py-12 mb-10 px-4 md:px-8 flex justify-center">
        <AccountMenu />
        <div className="mt-2 w-full">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
