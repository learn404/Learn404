"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState } from "react";

interface PropsDeleteAccountButton {
  user?: {
    id: string | null; 
  };
  userSearch?: {
    id: string | null;
    name: string | null;
  };
}

export function DeleteAccountButton({ user, userSearch }: PropsDeleteAccountButton) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  const handleChecked = (checked: boolean) => {
    setChecked(checked);
  };

  const handleDeleteAccount = async () => {
    let response;
    if (userSearch) {
      response = await fetch("/api/user/delete-account", {
        method: "POST",
        body: JSON.stringify({ userId: userSearch?.id }),
      });
    } else {
      response = await fetch("/api/user/delete-account", {
        method: "POST",
        body: JSON.stringify({ userId: user?.id }),
      });
    }

    if (!response.ok) {
      const data = await response.json();
      console.log(data);
      console.log("Erreur lors de la suppression du compte");
    } else {
      console.log("Compte supprimé avec succès");
      const data = await response.json();
      toast.success(data.message);
      if (userSearch) {
        router.push("/admin");
        router.refresh();
      } else {
        router.push("/");
        
      }
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Supprimer le compte</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {userSearch ? "Voulez-vous vraiment supprimer ce compte ?" : "Voulez-vous vraiment supprimer votre compte ?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {userSearch ? `Cette action est irréversible. Cela supprimera le compte de ${userSearch?.name} et supprimera toutes les données de notre serveur.` : "Cette action est irréversible. Cela supprimera votre compte et supprimera toutes vos données de notre serveur."}

            <div className="flex items-center space-x-2 mt-2">
              <Checkbox id="terms" onCheckedChange={handleChecked} />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {userSearch ? "Je confirme la suppression de ce compte" : "Je confirme la suppression de mon compte"}
              </label>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteAccount}
            disabled={!checked}
            className={`${!checked ? "cursor-not-allowed opacity-70" : ""}`}
          >
            Continuer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
