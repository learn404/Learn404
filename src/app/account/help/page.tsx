import { Button } from "@/components/ui/button";
import { currentUser } from "@/lib/current-user";
import { DiscordLogoIcon } from "@radix-ui/react-icons";
import AccountLayout from "../account-layout";
import { redirect } from "next/navigation";

export default async function Help() {
  const user = await currentUser();

  if (!user) {
    redirect('/join')
  }

  return (
    <AccountLayout title="Aide / Discord" user={user!}>
      <div>
        <h2 className="text-xl font-semibold text-gray-50">
          Besoin d'aide ?
        </h2>
        <div className="text-gray-200 mt-5">
          <p>
            Bloqué sur un exercice ou sur un projet personnel ? Pas de panique, rejoins
            notre Discord member-only :
          </p>
          <Button className="mt-5 flex items-center">
            <DiscordLogoIcon className="w-6 h-6" color="white" /> Discord
          </Button>
        </div>
        <div className="text-gray-200 mt-5">
          <p className="mb-1">
            Pour toute question relative à un paiement, une facture ou autre, contacte nous à l'adresse suivante : 
          </p>
          <a href="mailto:contact@learn404.com" className="underline text-white">
            contact@learn404.com
          </a>
        </div>
      </div>
    </AccountLayout>
  )
}
