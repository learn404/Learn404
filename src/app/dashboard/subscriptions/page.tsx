
import PaymentBox from "@/app/stripe/PaymentBox";
import HeaderDashboard from "@/components/layout/headerDashboard/headerDashboard";
import { auth } from "@/lib/auth";

import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <HeaderDashboard />
      <main className="max-w-7xl mx-auto my-12 space-y-5 container">
        <PaymentBox />
      </main>
    </>
  );
}
