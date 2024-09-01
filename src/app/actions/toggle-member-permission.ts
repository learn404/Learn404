"use server";

import { currentUser } from "@/lib/current-user";
import prisma from "@/lib/prisma";

export default async function ToggleMemberPermission(userId: string) {

  try {
    
    const { user, error } = await currentUser();

    if (error) {
      return { message: null, error: error };
    }

    if (!user?.admin) {
      return { message: null, error: "Vous n'êtes pas autorisé à effectuer cette action." };
    }

    const targetUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        name: true,
        isMember: true,
      }
    });

    if (!targetUser) {
      return { message: null, error: "Utilisateur introuvable." };
    }

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        isMember: !targetUser.isMember,
      },
    });
    
    return (
      !targetUser.isMember === true 
        ? { message: `L'utilisateur ${targetUser.name} est maintenant membre.`, error: null }
        : { message: `L'utilisateur ${targetUser.name} n'est plus membre.`, error: null }
    )
  } catch (error) {
    console.error("MEMBER_TOGGLE_ROLE_ERROR:", error)
    return { message: null, error: "Une erreur s'est produite lors de la mise à jour." };
  }
}