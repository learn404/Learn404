import { auth } from "./auth";
import prisma from "./prisma";

export type currentUserType = {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  isMember: boolean;
  admin: boolean;
  createdAt: Date;
} 

export const currentUser = async () => {

  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return { user: null, error: "No session found" };
    }
  
    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
      select: {
        id: true,
        image: true,
        name: true,
        email: true,
        isMember: true,
        admin: true,
        createdAt: true,
      },
    });
    
    return { user, error: null} ;
  } catch (error) {
    return { user: null, error: "Une erreur est survenue dans la récupération de votre compte." };
  }



}