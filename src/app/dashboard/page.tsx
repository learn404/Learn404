import CategorieLessonsSection from "@/components/dashboard/lessons/categories-lessons-section";
import NextLessonsSection from "@/components/dashboard/lessons/next-lessons-section";
import UserCard from "@/components/dashboard/user-card";
import { ContentLayout } from "@/components/layout/content-layout";
import { Separator } from "@/components/ui/separator";
import { currentUser } from "@/lib/current-user";



export default async function Dashboard() {

  const user = await currentUser();

  return (
      <ContentLayout title="Dashboard" user={user}>
        <main className="max-w-8xl mx-auto my-12 space-y-12 container">
          <UserCard user={user} />
          <section>
            <h2 className="text-2xl font-semibold mb-4">Prochaines lessons</h2>
            <NextLessonsSection isAdmin={user.admin} section="next" />
          </section>
          <Separator />
          <section>
            <CategorieLessonsSection isAdmin={user.admin} />
          </section>
        </main>
      </ContentLayout>
  );
}
