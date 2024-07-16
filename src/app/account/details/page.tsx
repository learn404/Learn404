import { currentUser } from "@/lib/current-user";
import prisma from "@/lib/prisma";
import AccountLayout from "../account-layout";
import FormDetails from "./form-details";
import { redirect } from "next/navigation";



const Details = async () => {

  const user = await currentUser();

  if (!user) {
    redirect('/login')
  }

  const accountData = await prisma.account.findFirst({
    where: {
      userId: user?.id,
    },
    select: {
      id: true,
      userId: true,
      type: true,
      provider: true,
    },
  });


  return ( 
    <AccountLayout title="Mon compte" user={user!}>
      <FormDetails user={user!} account={accountData} />
    </AccountLayout>
   );
}
 
export default Details;