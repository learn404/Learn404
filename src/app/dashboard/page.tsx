import CategorieLessonsSection from "@/components/dashboard/lessons/categories-lessons-section";
import NextLessonsSection from "@/components/dashboard/lessons/next-lessons-section";
import UserCard from "@/components/dashboard/user-card";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import Footer from "@/components/layout/footer";
import { Separator } from "@/components/ui/separator";
import { currentUser } from "@/lib/current-user";
import { getCategoriesWithLessons, getLessonsStartedAndCompleted } from "@/lib/utils";
import { Lessons } from "@prisma/client";
import { Metadata } from 'next';
import { redirect } from "next/navigation";


export type UserBase = {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  isMember: boolean;
  admin: boolean;
  createdAt: Date;
}

export const metadata: Metadata = {
  title: 'Tableau de bord',
}

export default async function Dashboard() {

  const user = await currentUser();
  if (!user?.isMember) {
    redirect("/dashboard/subscriptions");
  }


  const { categories, lessons } = await getCategoriesWithLessons();
  const lessonsStartedAndCompleted = await getLessonsStartedAndCompleted(user!);

  lessons.forEach((lesson: (Lessons & { status?: number })) => {
    if (lessonsStartedAndCompleted.lessonProgress.find((lessonProgress) => (lessonProgress.lessonId === lesson.id) && lessonProgress.completed)) {
      lesson.status = 3;
    } else if (lessonsStartedAndCompleted.lessonProgress.find((lessonProgress) => (lessonProgress.lessonId === lesson.id) && !lessonProgress.completed)) {
      lesson.status = 2;
    } else {
      lesson.status = 1;
    }
  });

  return (
      <DashboardLayout title="Tableau de bord" user={user}>
        <main className="py-12 px-6 md:px-8">
          <div className="max-w-[1436px] w-full mx-auto space-y-12">
            <UserCard user={user} numberOfLessons={lessons.length} lessonsCompleted={lessonsStartedAndCompleted?._count.lessonProgress} />
            <section className="bg-gray-900/50 p-5 md:p-10 rounded-md border-2 border-torea-950 max-w-screen-2xl">
              <h2 className="text-2xl font-semibold mb-4">Prochains cours</h2>
              <NextLessonsSection lessons={lessons} isAdmin={user.admin} />
            </section>
            <Separator />
            <section>
              <CategorieLessonsSection categories={categories} isAdmin={user.admin} lessons={lessons} />
            </section>
          </div>
        </main>
        <Footer />
      </DashboardLayout>
  );
}
