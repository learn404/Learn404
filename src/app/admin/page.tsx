import Footer from "@/components/layout/footer";
import HeaderDashboard from "@/components/layout/headerDashboard/headerDashboard";
import prisma from "@/lib/prisma";
import { SquarePen, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/lib/current-user";
import Link from "next/link";
import { LessonTable } from "./lesson-table";
import { lessonColumns } from "./LessonColumns";
import { UserTable } from "./user-table";
import { userColumns } from "./UserColumns";
import AddChangeLogButton from "@/components/buttons/AddChangeLogButton";
import CreateCategoryButton from "@/components/buttons/AddCategoryButton";
import { get } from "http";
import { getTransactions } from "@/lib/utils";


export default async function Admin() {
  const user = await currentUser();

  
 const transactionData = await getTransactions();
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
    lesson.categoryId =
      allCategories
        .find((category) => category.id === lesson.categoryId)
        ?.name.toUpperCase() || "";
  });

  return (
    <div>
      <HeaderDashboard user={user} title="Admin"></HeaderDashboard>
      <div className="flex items-center gap-2 mx-10">
        <Link href="/admin/add-lesson">
          <Button variant="default">
            <SquarePen className="mr-1 w-4" />
            Ajouter un cours
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <AddChangeLogButton />
          <CreateCategoryButton />
        </div>
      </div>
      {/* <div>
        <div className="text-white"> 
        Total de transaction sur les 15 derniers jours {transactionData}
        </div>
      </div> */}
      <div className="mx-auto px-10 lg:flex gap-10">
        <UserTable columns={userColumns} data={allUsers} />
        <LessonTable columns={lessonColumns} data={allLessons} />
      </div>
      <Footer />
    </div>
  );
}
