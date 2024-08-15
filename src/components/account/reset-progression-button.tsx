"use client";

import { currentUserType } from "@/lib/current-user";
import { RefreshCcw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Button } from "../ui/button";

interface ResetProgressionButtonProps {
  user: currentUserType;
}

export default function ResetProgressionButton({ user }: ResetProgressionButtonProps) {

  const [isModalOpen, setIsModalOpen] = useState(false);

  
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
    setIsModalOpen(false)
  };

  return (
    <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <AlertDialogTrigger asChild>
        <Button className="mt-5">
          <RefreshCcw className="w-5 h-5" /> Réinitialiser ma progression
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Es-tu sûr ?</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action est irréversible. Cela supprimera définitivement ta progression. 
            Tu pourras cependant noter manuellement les cours comme terminé.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={handleResetProgression}>Réinitialiser</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}