"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface FinishLessonButtonProps {
  userId: string;
  lessonId: string;
  completed: boolean;
  slug: string;
}

const FinishLessonButton: React.FC<FinishLessonButtonProps> = ({
  userId,
  lessonId,
  completed,
  slug,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const finishLesson = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/finish-lesson", {
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
    <button
      type="button"
      onClick={finishLesson}
      className="bg-white text-indigo-800 px-4 py-2 rounded-md"
      disabled={isLoading}
    >
      {isLoading ? "En cours" : completed ? "Terminé" : "Terminer le cours"}
    </button>
  );
};

export default FinishLessonButton;