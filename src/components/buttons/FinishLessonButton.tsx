"use client";

import { useState } from "react";
import { toast } from "react-toastify";
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
      const response = await fetch("/api/user/finish-lesson", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          lessonId,
        }),
      });
      if (!response.ok) {
        throw new Error("La mise à jour de l'état du cours a échoué");
      }
      toast.success("L'état du cours a été mis à jour");
      router.push(`/cours/${slug}`);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("La mise à jour de l'état du cours a échoué");
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
