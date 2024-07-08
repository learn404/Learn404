import CategorieLessonsSection from "@/components/dashboard/lessons/categories-lessons-section";
import NextLessonsSection from "@/components/dashboard/lessons/next-lessons-section";
import UserCard from "@/components/dashboard/user-card";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import Footer from "@/components/layout/footer";
import { Separator } from "@/components/ui/separator";
import { currentUser } from "@/lib/current-user";
import prisma from "@/lib/prisma";

async function getCategoriesWithLessons() {
  const res = await prisma.categories.findMany({
    include: {
      Lessons: {
        orderBy: {
          sort_number: 'asc'
        }
      }
    },
    orderBy: {
      sort_number: 'asc'
    }
  })

  const categories = res.filter(category => category.Lessons.length > 0);
  return categories;
}

export default async function Dashboard() {

  const user = await currentUser();
  const categories = await getCategoriesWithLessons();

  return (
      <DashboardLayout title="Dashboard" user={user}>
        <main className="max-w-8xl mx-auto py-12 space-y-12 container">
          <UserCard user={user} />
          <section>
            <h2 className="text-2xl font-semibold mb-4">Prochaines lessons</h2>
            <NextLessonsSection isAdmin={user.admin} />
          </section>
          <Separator />
          <section>
            <CategorieLessonsSection categories={categories} isAdmin={user.admin} />
          </section>
        </main>
        <Footer />
      </DashboardLayout>
  );
}
