import HeaderDashboard from "@/components/layout/headerDashboard/headerDashboard";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";

import { redirect } from "next/navigation";

async function getServerSideProps() {
  const res = await prisma.lessons.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      draft: true,
      newLesson: true,
      slug: true,
      sort_number: true,
    },
    orderBy: {
      sort_number: "asc",
    },
  });
  const lessons = res.map((lesson) => ({
    id: lesson.id,
    title: lesson.title,
    description: lesson.description,
    draft: lesson.draft,
    newLesson: lesson.newLesson,
    slug: lesson.slug,
  }));
  return lessons;
}

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    redirect("/join");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email as string,
    },
    select: {
      name: true,
      email: true,
      isMember: true,
      admin: true,
    },
  });

  if (!user?.isMember) {
    redirect("/dashboard/subscriptions/");
  }

  const sessionData = {
    user: {
      name: session?.user?.name as string,
      email: session?.user?.email as string,
      image: session?.user?.image as string,
    },
    expires: session?.expires as string,
  };

  const lessons = await getServerSideProps();

  return (
    <>
      <HeaderDashboard session={sessionData} />
      <main className="max-w-7xl mx-auto my-12 space-y-5 container">
        <h1 className="text-2xl font-semibold">
          Welcome back, {user?.name || user?.email}
        </h1>
        <section>
          <h2 className="text-xl font-semibold">Lessons</h2>
          {user.admin ? (
            <ul>
              {lessons.map((lesson) => (
                <Link href={`/cours/${lesson.slug}`} key={lesson.id}>
                  <li className="flex items-center justify-between p-4 bg-gray-800 rounded-md">
                    <h3 className="text-lg font-semibold text-white">
                      {lesson.title}
                    </h3>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </li>
                </Link>
              ))}
            </ul>
          ) : (
            <ul>
              {lessons
                .filter((lesson) => !lesson.draft)
                .map((lesson) => (
                  <Link href={`/cours/${lesson.slug}`} key={lesson.id}>
                    <li className="flex items-center justify-between p-4 bg-gray-800 rounded-md">
                      <h3 className="text-lg font-semibold text-white">
                        {lesson.title}
                      </h3>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </li>
                  </Link>
                ))}
            </ul>
          )}
        </section>
      </main>
    </>
  );
}
