"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

interface FinishLessonButtonProps {
  userId: string;
  lessonId: string;
  completed: boolean;
  slug: string;
}

const FinishLessonButton = ({
  userId,
  lessonId,
  completed,
  slug,
}: FinishLessonButtonProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const finishLesson = async () => {
    setIsLoading(true);
    try {
      const sendFinishLessonRequest = () => {
        return fetch ("/api/user/progress-lesson", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            lessonId,
          }),
        });
      };
      await toast.promise(sendFinishLessonRequest, {
        success: "L'état du cours a été mis à jour",
        error: "La mise à jour de l'état du cours a échoué",
        loading: "Mise à jour de l'état du cours en cours...",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      router.refresh();
    }
  };

  return (
    <Button
      type="button"
      onClick={finishLesson}
      className="bg-white text-indigo-800 px-4 py-2 rounded-md"
      disabled={isLoading}
      variant="outline"
    >
      {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (completed ? "Terminé" : "Terminer le cours")}
    </Button>
  );
};

export default FinishLessonButton;
