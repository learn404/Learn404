"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

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
      toast.promise(
        fetch("/api/user/progress-lesson", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            lessonId,
          }),
        }),
        {
          success: "L'état du cours a été mis à jour",
          error: "La mise à jour de l'état du cours a échoué",
          loading: "Mise à jour de l'état du cours en cours...",
        }
      );
      router.push(`/cours/${slug}`);
      router.refresh();
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <Button
      type="button"
      onClick={finishLesson}
      className="bg-white text-indigo-800 px-4 py-2 rounded-md"
      disabled={isLoading}
      variant="outline"
    >
      {isLoading ? "En cours" : completed ? "Terminé" : "Terminer le cours"}
    </Button>
  );
};

export default FinishLessonButton;
