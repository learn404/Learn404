
import HeaderDashboard from "@/components/layout/headerDashboard/headerDashboard";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import Footer from "@/components/layout/footer";
import { adminCheckAre } from "@/lib/utils";
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

  const session = await auth();
  if (!session) {
    return redirect("/");
  }

  const adminCheck = await adminCheckAre(session?.user?.email as string);

  if (!adminCheck?.admin || !session || !adminCheck) {
    return redirect("/");
  }

  const sessionData = {
    user: {
      name: session?.user?.name as string,
      email: session?.user?.email as string,
      image: session?.user?.image as string,
    },
    expires: session?.expires as string,
  };

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
      <HeaderDashboard session={sessionData} title="Modification cours" />
      <div>
        <EditLessonForm           
        isAdmin={adminCheck?.admin}
          session={sessionData}
          params={params}
          lesson={lesson[0]}
          categoryLesson={categoryLesson[0]}
          />
      </div>
      <Footer/>
    </>
  );
}
