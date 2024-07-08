import HeaderDashboard from "@/components/layout/headerDashboard/headerDashboard";
import { currentUser } from "@/lib/current-user";
import { redirect } from "next/navigation";
import AddLessonForm from "./Form";

export default async function AddLesson() {

  const user = await currentUser();

  if (!user.admin) {
    redirect("/dashboard");
  }

  return (
    <>
      <HeaderDashboard user={user} title="Ajouter un cours"/>
      <main className="px-8">
        <AddLessonForm
          isAdmin={user.admin}
          user={user}
          isAvatar={!!user.image}
        />
      </main>
    </>
  );
}
