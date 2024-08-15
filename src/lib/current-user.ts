import { redirect } from "next/navigation";
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

  const session = await auth();
  
  if (!session) {
    redirect("/join");
  }

  const user = await prisma.user.findFirst({
    where: {
      email: session?.user?.email as string,
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


  return user ;
}