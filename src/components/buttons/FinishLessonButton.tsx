"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { CheckCircleIcon, CircleIcon } from "lucide-react";


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
  const [isCompleted, setIsCompleted] = useState(completed);


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
      setIsCompleted(!isCompleted);
      router.refresh();
      
    }
  };

  return (
    <div> 
    {isCompleted ? (
      <>
        <Button variant="outline" onClick={finishLesson}>
          <CheckCircleIcon className="w-4 h-4 text-green-500" />
          <p className="text-green-500">Terminé</p>
        </Button>
      </>
    ) : (
      <>
        <Button variant="outline" onClick={finishLesson}  >
          <CircleIcon className="w-4 h-4 text-gray-800" />
          <p className="text-gray-800">Terminer le cours</p>
        </Button>
      </>
    )}
  </div>
  );
};

export default FinishLessonButton;
