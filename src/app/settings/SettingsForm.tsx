"use client";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DeleteAccountButton } from "@/components/buttons/DeleteAccountButton";
import { Download } from "lucide-react";

interface FormSettingProps {
  user: {
    id: string;
    name: string | null;
    email: string | null;
    admin: boolean | string | null;
    image: string | null;
  } | null;
  accountData: {
    id: string;
    userId: string;
    type: string;
    provider: string;
  } | null;
}

export default function FormSetting({ user, accountData }: FormSettingProps) {
  const router = useRouter();

  const user_first_last_name = user?.name?.split(" ") || ["", ""];
  const user_first_name = user_first_last_name[0];
  const user_last_name = user_first_last_name[1];

  const handleResetProgression = async () => {
    try {
      const response = await fetch("/api/user/reset-progression", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user?.id }),
      });

      if (!response.ok) {
        toast.error("Erreur lors de la reinitialisation de la progression");
      }
      toast.success("La progression a été réinitialisée avec succès");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownloadInvoice = async () => {
    router.push("/invoice");
  };

  return (
    <>
      <main className="px-40">
        <div className="space-y-12 ">
          <div className="border-b border-gray-900/10 ">
            <h2 className="text-base font-semibold leading-7 text-gray-100">
              INFORMATIONS PERSONNELLES
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              Ces informations ne sont pas affichées publiquement.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4 lg:flex items-center gap-5">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium leading-6 text-gray-100 "
                  >
                    Prénom
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="title"
                        id="title"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 cursor-not-allowed bg-gray-400 p-2"
                        placeholder={user_first_name}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="sm:col-span-4 mt-4 md:mt-0">
                    <label
                      htmlFor="slug_title"
                      className="block text-sm font-medium leading-6 text-gray-100"
                    >
                      Nom
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          type="text"
                          name="slug_title"
                          id="slug_title"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 cursor-not-allowed bg-gray-400 p-2"
                          placeholder={user_last_name}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="slug_title"
                  className="block text-sm font-medium leading-6 text-gray-100"
                >
                  Email
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="slug_title"
                      id="slug_title"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-4000 placeholder:text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 cursor-not-allowed bg-gray-400 p-2"
                      placeholder={user?.email || ""}
                      disabled
                    />
                  </div>
                </div>
                <div className="sm:col-span-4 mt-4">
                  <label
                    htmlFor="connexion_app"
                    className="block text-sm font-medium leading-6 text-gray-100"
                  >
                    Application de connexion
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="connexion_app"
                        id="connexion_app"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-6000 sm:text-sm sm:leading-6 cursor-not-allowed bg-gray-400 p-2"
                        placeholder={accountData?.provider.toUpperCase() || ""}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-100/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-100">
              PARAMETRE DU COMPTE
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              Ces informations peuvent être modifiées plus tard.
            </p>

            <div className="sm:col-span-3">
              <h3 className="text font-semibold mt-4 py-2">
                Progression des cours
              </h3>
              <div className="py-2">
                <p className="text-gray-400 text-sm">
                  Le bouton de progression est le bouton qui permet de valider
                  un cours terminé.
                </p>
                <p className="text-gray-400 mt-1">
                  {" "}
                  Vous pouvez réintialiser votre progression à tout moment et
                  supprimer alors votre progression
                </p>
              </div>
              <Button
                variant="default"
                onClick={handleResetProgression}
                className="mt-2"
              >
                Réinitialiser la progression
              </Button>
            </div>
            <div className="sm:col-span-3">
              <h3 className="text font-semibold mt-4 py-2">Votre facture</h3>
              <div className="">
                <p className="text-gray-400 text-sm">
                  Vous pouvez voir votre facture et voir les cours que vous avez
                  acheté
                </p>
              </div>
              <Button
                variant="default"
                className="mt-2"
                onClick={handleDownloadInvoice}
              >
                <Download />
                Télécharger votre facture
              </Button>
            </div>
          </div>
          <DeleteAccountButton user={{ id: user?.id ?? null }} />
        </div>
      </main>
    </>
  );
}
