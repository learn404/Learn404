import { currentUserType } from "@/lib/current-user";
import Image from "next/image";
import SecondaryButton from "../buttons/SecondaryButton";
import { UserChart } from "./user-chart";

interface UserCardProps {
  user: currentUserType;
}

const UserCard = ({ user }: UserCardProps) => {
  return ( 
    <div className="mx-auto flex items-center justify-between flex-wrap gap-4 py-4 px-8 md:py-6 md:px-12 rounded-lg border-2 border-gray-900 bg-gray-950 w-full max-w-4xl">
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
          <SecondaryButton redirectTo="/dashboard/settings" className="mt-4">Settings</SecondaryButton>
        </div>
      </div>

      <UserChart />
    </div>
   );
}
 
export default UserCard;