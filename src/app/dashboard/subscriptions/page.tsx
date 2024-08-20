import PaymentBox from "@/app/stripe/PaymentBox";
import Footer from "@/components/layout/footer";
import HeaderDashboard from "@/components/layout/headerDashboard/headerDashboard";
import ProductCard from "@/components/subscriptions/product-card";
import { currentUser } from "@/lib/current-user";

import { redirect } from "next/navigation";

export default async function Subscriptions() {

  const user = await currentUser();
  
  if (user?.isMember) {
    redirect("/dashboard");
  }

  return (
    <>
      <HeaderDashboard user={user!} title="Abonnement" />
      <main className="max-w-7xl mx-auto my-20 space-y-5 relative container flex flex-col items-center md:flex-row md:items-start md:justify-center md:gap-x-20 lg:gap-x-40 px-4 md:px-8">
        <div className="w-full max-w-md">
          <PaymentBox userEmail={user?.email!} />
        </div>
        <div className="sticky top-0 w-full max-w-md">
          <ProductCard />
        </div>
  
      </main>
      <Footer />
    </>
  );
}
