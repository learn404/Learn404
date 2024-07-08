import HeaderDashboard from "@/components/layout/headerDashboard/headerDashboard";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { DeleteAccountButton } from "@/components/buttons/DeleteAccountButton";
import Footer from "@/components/layout/footer";
import UserCardAdmin from "@/components/cards/userCardAdmin";

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
      <div className="lg:flex mb-4 mx-auto ">
        <div className="w-full lg:w-1/2 mx-auto">
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
       <UserCardAdmin userSearch={userSearch} user={user} />
      </div>
      <Footer />
    </>
  );
}