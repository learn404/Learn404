import UserCardAdmin from "@/components/cards/userCardAdmin";
import Footer from "@/components/layout/footer";
import HeaderDashboard from "@/components/layout/headerDashboard/headerDashboard";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/lib/current-user";
import prisma from "@/lib/prisma";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function UserProfile({ params }: { params: { id: string } }) {
  const { user, error } = await currentUser();

  if (error) {
    console.error(error);
  }

  if (!user) {
    redirect("/join");
  }

  if (!user?.admin) {
    redirect("/dashboard");
  }

  const userSearch = await prisma.user.findUnique({
    where: {
      id: params?.id,
    },
  });

  // A changer pour l'affichage d'un composant ou d'une page erreur 404 
  if (!userSearch) {
    redirect("/admin");
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
        user={user}
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
