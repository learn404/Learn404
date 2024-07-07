import { currentUserType } from "@/lib/current-user";
import { UserChart } from "./user-chart";

interface UserCardProps {
  user: currentUserType;
}

const UserCard = ({ user }: UserCardProps) => {
  return ( 
    <div className="mx-auto flex items-center justify-between flex-wrap gap-4 py-4 px-10 md:py-6 md:px-12 rounded-lg border-2 border-gray-900 bg-gray-950 w-full max-w-4xl">
      <div className="flex items-start">
        <img src={user.image ?? ""} alt="profile picture" className="w-16 md:w-20 aspect-square rounded-full" />
        <div className="ml-8 md:mt-2.5">
          <div className="flex items-start md:items-center flex-col md:flex-row gap-x-3">
            <p className="text-xl font-bold text-torea-50">
              {user.name}
            </p>
            <p className="text-sm text-gray-500 translate-y-0.5">
              {user.id}
            </p>
          </div> 
          <span className="font-semibold text-sm text-gray-500">Membre</span> 
        </div>
      </div>

      <UserChart />
    </div>
   );
}
 
export default UserCard;