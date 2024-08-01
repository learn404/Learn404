"use client";

import { currentUserType } from "@/lib/current-user";
import { RefreshCcw } from "lucide-react";
import { toast } from "react-toastify";
import { Button } from "../ui/button";

interface ResetProgressionButtonProps {
  user: currentUserType;
}

export default function ResetProgressionButton({ user }: ResetProgressionButtonProps) {

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

  return (
    <Button className="mt-5" onClick={handleResetProgression}>
      <RefreshCcw className="w-5 h-5" /> Reset ma progression
    </Button>
  );
}