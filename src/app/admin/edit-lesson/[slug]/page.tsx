
import Footer from "@/components/layout/footer";
import HeaderDashboard from "@/components/layout/headerDashboard/headerDashboard";
import { currentUser } from "@/lib/current-user";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import EditLessonForm from "./Form";

async function getServerSideProps() {
  const res = await prisma.categories.findMany();
  const categories = res.map((category) => ({
    id: category?.id,
    name: category?.name.toUpperCase(),
  }));
  return categories;
}

export default async function Page({ params }: { params: { slug: string } }) {

  const user = await currentUser();

  if (!user?.admin || !user) {
    return redirect("/");
  }

  const lesson = await prisma.lessons.findMany({
    where: {
      slug: params.slug,
    },
  });

  const categoryLesson = await prisma.categories.findMany({
    where: {
      id: lesson[0]?.categoryId,
    },
    select: {
      id: true,
      name: true,
    },
  });
  
  return (
    <>
      <HeaderDashboard user={user} title="Modification cours" />
      <div>
        <EditLessonForm           
          isAdmin={user?.admin}
          user={user}
          params={params}
          lesson={lesson[0]}
          categoryLesson={categoryLesson[0]}
          />
      </div>
      <Footer/>
    </>
  );
}
