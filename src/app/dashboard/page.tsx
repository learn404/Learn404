import CategorieLessonsSection from "@/components/dashboard/lessons/categories-lessons-section";
import NextLessonsSection from "@/components/dashboard/lessons/next-lessons-section";
import UserCard from "@/components/dashboard/user-card";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import Footer from "@/components/layout/footer";
import { Separator } from "@/components/ui/separator";
import { currentUser } from "@/lib/current-user";
import { getCategoriesWithLessons, getLessonsStartedAndCompleted } from "@/lib/utils";
import { Lessons } from "@prisma/client";

export type UserBase = {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  isMember: boolean;
  admin: boolean;
  createdAt: Date;
}

export default async function Dashboard() {

  const user = await currentUser();
  const { categories, lessons } = await getCategoriesWithLessons();
  const lessonsStartedAndCompleted = await getLessonsStartedAndCompleted(user);

  // On ajoute un status à chaque leçon pour savoir si elle est en cours(2), terminée(3) ou non commencée(1)
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
      <DashboardLayout title="Dashboard" user={user}>
        <main className="max-w-8xl mx-auto py-12 space-y-12 container ">
          <UserCard user={user} numberOfLessons={lessons.length} lessonsCompleted={lessonsStartedAndCompleted?._count.lessonProgress} />
          <section className="bg-gray-900/50 p-5 md:p-10 rounded-md border-2 border-torea-950 max-w-screen-2xl">
            <h2 className="text-2xl font-semibold mb-4">Prochaines lessons</h2>
            <NextLessonsSection lessons={lessons} isAdmin={user.admin} />
          </section>
          <Separator />
          <section>
            <CategorieLessonsSection categories={categories} isAdmin={user.admin} lessons={lessons} />
          </section>
        </main>
        <Footer />
      </DashboardLayout>
  );
}
