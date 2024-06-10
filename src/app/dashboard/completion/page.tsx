import HeaderDashboard from "@/components/layout/headerDashboard/headerDashboard";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Completion() {

  const session = await auth();
  
  if (!session) {
    redirect("/login");
  }

  const sessionData = {
    user: {
      name: session?.user?.name as string,
      email: session?.user?.email as string,
      image: session?.user?.image as string,
    },
    expires: session?.expires as string,
  }

  return (
    <div>
      <HeaderDashboard session={sessionData}/>
      <h1>Votre achat a bel et bien été pris en compte, vous avez maintenant accès à votre dashboard</h1>
      <Link href={"/dashboard"}>
        Dashboard
      </Link>
    </div>
  )
} 