import HeaderDashboard from "@/components/layout/headerDashboard/headerDashboard";
import { currentUser } from "@/lib/current-user";
import { redirect } from "next/navigation";
import AddLessonForm from "./Form";
import { getCategories } from "@/lib/utils";

export default async function AddLesson() {
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

  const categories = await getCategories();

  return (
    <>
      <HeaderDashboard user={user!} title="Ajouter un cours" />
      
      <main className="px-8">
      
        <AddLessonForm
          categories={categories}
          isAdmin={user!.admin}
          isAvatar={!user!.image}
          />
        </main>
      
    </>
  );
}
