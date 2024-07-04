import Footer from "@/components/layout/footer";
import HeaderDashboard from "@/components/layout/headerDashboard/headerDashboard";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { SquarePen } from "lucide-react";

import { User, userColumns } from "./UserColumns";
import { Lesson, lessonColumns } from "./LessonColumns";
import { UserTable } from "./user-table";
import { LessonTable } from "./lesson-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Admin() {

  const session = await auth();

  if (!session) {
    redirect("/join");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email as string,
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      admin: true,
      isMember: true,
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

  const allUsers = await prisma.user.findMany();
  const allLessons = await prisma.lessons.findMany();
  const allCategories = await prisma.categories.findMany({
    where: {
      id: {
        in: allLessons.map((lesson) => lesson.categoryId),
      },
    },
    select: {
      id: true,  // Ajouter cette ligne pour obtenir les IDs des catégories
      name: true,
    },
  });
  
  allLessons.forEach((lesson) => {
    lesson.categoryId = allCategories.find(
      (category) => category.id === lesson.categoryId
    )?.name.toUpperCase() || "";
  });
  

  return (
    <div>
      <HeaderDashboard session={sessionData} title="Admin"></HeaderDashboard>
      <Link href="/admin/add-lesson">
        <Button variant="default" className="mx-10"><SquarePen className="mr-1 w-4"/>
        Ajouter un cours</Button>
      </Link>
      <div className="mx-auto px-10 lg:flex gap-10">
        <UserTable columns={userColumns} data={allUsers} />
        <LessonTable columns={lessonColumns} data={allLessons} />
      </div>
      <Footer />
    </div>
  );
}
