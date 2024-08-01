import { DeleteAccountButton } from "@/components/buttons/DeleteAccountButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { currentUserType } from "@/lib/current-user";

interface UserCardAdminProps {
    userSearch: {
        id: string;
        name: string | null ;
        email: string | null ;
        admin: boolean | string | null;
        image: string | null ;
        isMember: boolean | null;
        createdAt: Date | null;
    } | null;
    user: currentUserType;
}

export default function UserCardAdmin({ userSearch, user }: UserCardAdminProps) {
  
    let howManyDays = 0;
    if (userSearch?.createdAt) {
        howManyDays = Math.floor(
          (new Date().getTime() - new Date(userSearch?.createdAt).getTime()) /
            (1000 * 60 * 60 * 24)
        );
    }
    return (
        <div className="border mt-4 lg:mt-0 border-white/10  gap-4 w-fit h-[70vh] flex flex-col justify-center items-center p-10 rounded-lg mx-10 lg:flex-1">
        <div className="">
          {userSearch?.name ? (
            <Avatar className="w-32 h-32">
              {userSearch?.image ? (
                <AvatarImage src={userSearch?.image} alt="@shadcn" />
              ) : (
                <AvatarFallback>{userSearch?.name.charAt(0)}</AvatarFallback>
              )}
              <AvatarFallback>{userSearch?.name.charAt(0)}</AvatarFallback>
            </Avatar>
          ) : (
            <AvatarFallback>'Error'</AvatarFallback>
          )}
        </div>
        {userSearch?.id && (
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold w-fit">{userSearch?.name}</h1>
            <p className="text-sm w-fit text-white/50 font-light">
              {userSearch?.id}
            </p>
            <div className="flex items-center gap-2">
              <p className="text-sm w-fit text-white/50">
                {userSearch?.createdAt
                  ?.toString()
                  .split("T")[0]
                  .split("-")
                  .reverse()
                  .join("/")
                  .split("GM")}
              </p>
              <p className="text-sm w-fit text-white/50">
                ({howManyDays} jours)
              </p>
            </div>

            <p className="text-sm w-fit text-white/50">{userSearch?.email}</p>
            <p className="text-sm w-fit text-white/50">
              {userSearch?.isMember ? "Membre" : "Non membre"}
            </p>
          </div>
        )}
          <DeleteAccountButton userSearch={{ id: userSearch?.id ?? null, name: userSearch?.name ?? null }}  user={{ id: user?.id ?? null }}/>
      </div>
    )
}