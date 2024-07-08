import Footer from "@/components/layout/footer";
import HeaderDashboard from "@/components/layout/headerDashboard/headerDashboard";
import prisma from "@/lib/prisma";
import { SquarePen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { currentUser } from "@/lib/current-user";
import Link from "next/link";
import { LessonTable } from "./lesson-table";
import { lessonColumns } from "./LessonColumns";
import { UserTable } from "./user-table";
import { userColumns } from "./UserColumns";

export default async function Admin() {

  const user = await currentUser();

  const allUsers = await prisma.user.findMany();
  const allLessons = await prisma.lessons.findMany();
  const allCategories = await prisma.categories.findMany({
    where: {
      id: {
        in: allLessons.map((lesson) => lesson.categoryId),
      },
    },
    select: {
      id: true, 
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
      <HeaderDashboard user={user} title="Admin"></HeaderDashboard>
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
