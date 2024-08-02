import ResetProgressionButton from "@/components/account/reset-progression-button";
import { DeleteAccountButton } from "@/components/buttons/DeleteAccountButton";
import { currentUser } from "@/lib/current-user";
import AccountLayout from "../account-layout";

export default async function Settings() {
  const user = await currentUser();
  
  return (
    <AccountLayout title="Paramètres" user={user!}>
      {user?.isMember && (
        <div className="mb-9">
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
          <ResetProgressionButton user={user!} />
        </div>
      )}

      <div className="border border-rose-950/80 bg-rose-950/20 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-gray-50">
          Supprimer le compte
        </h2>
        <div className="text-gray-300 mt-4">
          <p>
             <span className="font-semibold">ATTENTION :</span> Supprimer votre compte est une action irréversible. Cela supprimera toutes vos données de notre serveur.
          </p>
          <p className="mt-2">
            Il n'est pour le moment pas possible de récupérer vos données après la suppression de votre compte.
          </p>
        </div>
        <DeleteAccountButton user={user!} className="mt-4" />
      </div>
    </AccountLayout>
  )
}
