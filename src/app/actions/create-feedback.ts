"use server";

import { currentUser } from "@/lib/current-user";
import prisma from "@/lib/prisma";

export async function createFeedbackAction(feedback: string) {

  try {

    const { user } = await currentUser();
    if (!user) {
      return { error: "Tu n'as pas la permission pour faire ça." }
    }
    
    if (!feedback || feedback.length < 10) {
      return { error: "Le feedback doit contenir au minimum 10 caractères." }
    }
    
    if (feedback.length > 250) {
      return { error: "Le feedback ne peut pas dépasser 250 caractères." }
    }

    const userFeedbacks = await prisma.user.findUnique({
      where: {
        id: user.id
      },
      select: {
        Feedback: true
      }
    })

    if ( userFeedbacks?.Feedback && userFeedbacks.Feedback.length >= 3) {
      return { error: "Tu as déjà envoyé 3 feedbacks. Si tu veux nous faire plus de retours, rejoins le discord." }
    }

    await prisma.feedback.create({
      data: {
        content: feedback,
        userId: user.id
      }
    })

    return { success: true }
  } catch (error) {
    return { error: "Une erreur est survenue lors de l'envoi de ton feedback." }
  }
}