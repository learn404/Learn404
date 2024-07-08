import { currentUserType } from "@/lib/current-user";
import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { UserChart } from "./user-chart";

interface UserCardProps {
  user: currentUserType;
}


const UserCard = async ({ user }: UserCardProps) => {
  
  async function getLessonsCompleted() {
    const lessonsCompleted = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        _count: {
          select: {
            lessonProgress: true,
          }
        }
      }
    })

    const lessons = await prisma.lessons.findMany({})

    return { lessonsCompleted, lessonsNumber: lessons.length };
  }

  const { lessonsCompleted, lessonsNumber } = await getLessonsCompleted();
  
  return ( 
    <div className="mx-auto flex items-center justify-between flex-wrap gap-4 py-4 px-8 md:py-6 md:px-12 rounded-lg border-2 border-gray-800 bg-gray-950 w-full max-w-4xl">
      <div className="flex items-start">
        <Image src={user.image ?? ""} alt="profile picture" width={64} height={64} className="hidden md:block md:w-20 aspect-square rounded-full" />
        <div className="ml-8 md:mt-2.5">
          <div className="flex items-start md:items-center flex-col md:flex-row gap-x-3">
            <p className="text-xl font-bold text-torea-50">
              {user.name}
            </p>
            <p className="text-sm text-gray-500 translate-y-0.5">
              {user.id}
            </p>
          </div> 
          <p className="font-semibold text-sm text-gray-500">Membre</p> 
          <Link 
            href="/settings" 
            className="z-50 mt-4 inline-flex border border-white/10 rounded-md px-3.5 py-2.5 text-xs md:text-sm
            text-gray-200 shadow-sm hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
            focus-visible:outline-indigo-500"
            >
            Paramètres
          </Link>
        </div>
      </div>

      <UserChart lessonsNumber={lessonsNumber} lessonsCompleted={lessonsCompleted?._count.lessonProgress} />
    </div>
   );
}
 
export default UserCard;