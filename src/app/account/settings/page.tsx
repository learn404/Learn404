import ResetProgressionButton from "@/components/account/reset-progression-button";
import { currentUser } from "@/lib/current-user";
import AccountLayout from "../account-layout";

export default async function Settings() {
  const user = await currentUser();
  
  return (
    <AccountLayout title="Paramètres" user={user}>
      <div>
        <h2 className="text-xl font-semibold text-gray-50">
            Progression des cours
        </h2>
        <div className="text-gray-300 mt-5">
          <p>
            Votre progression correspond à l'ensemble des cours que vous avez suivis.
          </p>
          <p className="mt-2">
             Vous pouvez remettre à zéro votre progression à tout moment en cliquant sur le bouton ci-dessous.
          </p>
        </div>
        <ResetProgressionButton user={user} />
      </div>
    </AccountLayout>
  )
}
