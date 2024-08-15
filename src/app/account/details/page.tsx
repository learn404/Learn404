import { currentUser } from "@/lib/current-user";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import AccountLayout from "../account-layout";
import FormDetails from "./form-details";



const Details = async () => {

  const user = await currentUser();

  if (!user?.isMember) {
    redirect("/account/settings");
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

  const billingData = await prisma.billingInformations.findUnique({
    where: {
      userId: user?.id,
    }
  })

  const accountDetails = {
    generalInfos: [
      {
        label: "Nom du compte",
        name: "username",
        value: user?.name || "",
        needed: true,
        editable: true
      },
      {
        label: "Adresse mail",
        value: user?.email || "",
        needed: true,
        editable: false
      },
      {
        label: "Application de connexion",
        value: accountData?.provider.toUpperCase() || "",
        needed: true,
        editable: false
      },
    ],
    billingInfos: [
      {
        label: "Prénom",
        name: "firstName",
        value: billingData?.firstName || "",
        needed: true,
        editable: true
      },
      {
        label: "Nom",
        name: "lastName",
        value: billingData?.lastName || "",
        needed: true,
        editable: true
      },
      {
        label: "Ligne d'adresse 1",
        name: "address1",
        value: billingData?.address || "",
        needed: true,
        editable: true
      },
      {
        label: "Ligne d'adresse 2",
        name: "address2",
        value: billingData?.address2 || "",
        needed: false,
        editable: true
      },
      {
        label: "Ville",
        name: "city",
        value: billingData?.city || "",
        needed: true,
        editable: true
      },
      {
        label: "Etat / Province",
        name: "state",
        value: billingData?.state || "",
        needed: false,
        editable: true
      },
      {
        label: "Code postal",
        name: "postalCode",
        value: billingData?.zip || "",
        needed: true,
        editable: true
      },
      {
        label: "Pays",
        name: "country",
        value: billingData?.country || "",
        needed: true,
        editable: true
      },
  ]}

  return ( 
    <AccountLayout title="Mon compte" user={user!}>
      <FormDetails accountDetails={accountDetails!} />
    </AccountLayout>
   );
}
 
export default Details;