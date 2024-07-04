import HeaderDashboard from "@/components/layout/headerDashboard/headerDashboard";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { DeleteAccountButton } from "@/components/buttons/DeleteAccountButton";

export default async function UserProfile({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();

  if (!session) {
    redirect("/join");
  }

  const userSearch = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
  });

  const user = await prisma.user.findUnique({
    where: {
      id: session?.user?.id as string,
    },
  });

  if (!user?.admin) {
    redirect("/");
  }

  const sessionData = {
    user: {
      name: session?.user?.name as string,
      email: session?.user?.email as string,
      image: session?.user?.image as string,
    },
    expires: session?.expires as string,
  };

  let howManyDays = 0;

  if (userSearch?.createdAt) {
    howManyDays = Math.floor(
      (new Date().getTime() - new Date(userSearch?.createdAt).getTime()) /
        (1000 * 60 * 60 * 24)
    );
  }

  const progression = await prisma.lessonProgress.findMany({
    where: {
      userId: userSearch?.id,
    },
  });

  const lessonTitle = await prisma.lessons.findMany({
    where: {
        id: {
            in: progression.map((progress) => progress.lessonId),
        },
    },
  });


  return (
    <>
      <HeaderDashboard
        session={sessionData}
        title={`Profil utilisateur de ${userSearch?.name}`}
      />
    <Link href="/admin">
      <Button variant="default" className="m-4 ">
        <ArrowLeftIcon className="w-4 h-4 mr-2" />
        Retour 
      </Button>
      </Link>
      <div className="flex">
        <div className="w-1/2">
            {progression.length > 0 ? (
                
           
        <ol className="relative border-s border-gray-700 ml-4">
            {progression.map((progress) => (
          
            <li className="mb-4 ms-4 ">
              <div className="absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 border border-gray-900 bg-gray-700"></div>
              <time className="mb-1 text-sm font-normal leading-none text-gray-500">
                {progress.createdAt.toString().split("T")[0].split('GM')[0].split('-').reverse().join('/')}
              </time>
              <h3 className="text-lg font-semibold text-white">
                {lessonTitle.find((lesson) => lesson.id === progress.lessonId)?.title}
              </h3>
            </li>
        
          ))}
        </ol>
         ) : (
            <p className="text-white/50 ml-4">Aucune progression trouvée</p>
         )}
        </div>

        <div className="border border-white/10  gap-4 w-fit h-[85vh] flex flex-col justify-center items-center p-10 rounded-lg mx-10 flex-1">
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
      </div>
    </>
  );
}
