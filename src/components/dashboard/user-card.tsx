import { currentUserType } from "@/lib/current-user";
import Image from "next/image";
import Link from "next/link";
import { UserChart } from "./user-chart";

interface UserCardProps {
  user: currentUserType;
  numberOfLessons: number;
  lessonsCompleted: number | undefined;
}


const UserCard = async ({ user, numberOfLessons, lessonsCompleted }: UserCardProps) => {

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
          <p className="font-semibold text-sm text-gray-500 max-md:mt-1">Membre</p> 
          <Link 
            href="/account/details" 
            className="z-50 mt-4 inline-flex border-gray-800 rounded-md px-3.5 py-2.5 text-xs md:text-sm
             shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
            focus-visible:outline-indigo-500 border text-gray-300 bg-gray-950 hover:bg-black hover:border-gray-800 transition-none"
            >
            Compte
          </Link>
        </div>
      </div>

      <UserChart lessonsNumber={numberOfLessons} lessonsCompleted={lessonsCompleted} />
    </div>
   );
}
 
export default UserCard;