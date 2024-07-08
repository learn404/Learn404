import ChapterLessonButton from "@/components/buttons/ChapterLessonButton";
import FinishLesson from "@/components/buttons/FinishLessonButton";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import HeaderDashboard from "@/components/layout/headerDashboard/headerDashboard";
import SheetLessons from "@/components/sheet/sheetLessons";
import { currentUser } from "@/lib/current-user";
import { getPostBySlug } from "@/lib/mdx";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import VideoPlayerWithChapters from "./VideoPlayerWithChapters";

const getPageContent = async (slug: string) => {
  const { meta, content } = await getPostBySlug(slug);
  return { meta, content };
};

interface Params {
  params: {
    slug: string;
    title: string;
  };
}

export async function generateMetadata({ params }: Params): Promise<{ title: string }> {
  try {
    const title = await prisma.lessons.findFirst({
      where: {
        slug: params.slug,
      },
      select: {
        title: true,
      },
    });
    return { title: title?.title as string };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return { title: "" };
  }
}

export default async function LessonPage({
  params,
}: Params): Promise<JSX.Element> {
  
  const user = await currentUser();
  const { content } = await getPageContent(params.slug);

  const lesson = await prisma.lessons.findFirst({
    where: {
      slug: params.slug,
    },
    select: {
      id: true,
      title: true,
      draft: true,
      playbackId: true,
      sort_number: true,
    },
  });
  const statusLesson = await prisma.lessonProgress.findFirst({
    where: {
      userId: user.id,
      lessonId: lesson?.id,
    },
    select: {
      completed: true,
    },
  });

  const isCompleted = statusLesson?.completed ?? false;

  let nextLesson = await prisma.lessons.findFirst({
    where: {
      sort_number: (lesson?.sort_number as number) + 1,
    },
    select: {
      slug: true,
      title: true,
    },
  });

  let previousLesson;
  if (!nextLesson) {
    previousLesson = await prisma.lessons.findFirst({
      where: {
        sort_number: (lesson?.sort_number as number) - 1,
      },
      select: {
        slug: true,
        title: true,
      },
    });
  }

  if (lesson?.draft && user?.admin === false) {
    redirect("/dashboard");
  }

  if (!lesson) {
    redirect("/dashboard");
  }

  const chapters = await prisma.lessonChapter.findMany({
    where: {
      id_lesson: lesson.id,
    },
  });
  console.log(chapters, 'chapter page');

  return (
    <>
      <header className="z-50 relative">
        <HeaderDashboard user={user} title="Cours" />
      </header>
      <div className="z-50 fixed top-20 left-2 w-full h-full">
        <SheetLessons userId={user.id} />
      </div>

      <main className="text-white flex justify-center flex-col z-0">
        {lesson.playbackId ? (
          <div className="mx-auto w-[75vw] z-50">
            <VideoPlayerWithChapters
              playbackId={lesson.playbackId}
              videoId={lesson.id}
              videoTitle={lesson.title}
              chapters={chapters}
            />
          </div>
        ) : (
          <p className="m-auto">Vidéo pas disponible</p>
        )}
        <div className="bg-indigo-800 max-w-[90vw] lg:max-w-xl px-6 py-3 lg:px-24 lg:py-12 gap-3 lg:gap-10 rounded-md mx-auto mb-10 border border-white/10">
          <h1 className="text-lg lg:text-4xl text-center font-bold">
            {lesson.title}
          </h1>
          <div className="flex flex-wrap justify-center items-center mt-3 lg:mt-10 gap-x-10 gap-y-5">
            <SecondaryButton type="button" redirectTo="/dashboard">
              Dashboard
            </SecondaryButton>

            {!nextLesson?.slug ? (
              <SecondaryButton redirectTo={`/cours/${previousLesson?.slug}`}>
                Cours précédent
              </SecondaryButton>
            ) : (
              <SecondaryButton redirectTo={`/cours/${nextLesson?.slug}`}>
                Prochain cours
              </SecondaryButton>
            )}
            {user.admin ? (
              <>
                <SecondaryButton redirectTo={`/admin/edit-lesson/${params.slug}`}>
                  Modifier le cours
                </SecondaryButton>
                <ChapterLessonButton params={params} />
              </>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="z-50 py-4 px-5 prose lg:prose-xl prose-invert m-auto prose-pre:border prose-pre:bg-white/10">
          {content}
        </div>
        <div className="bg-indigo-800 max-w-[90vw] lg:max-w-xl px-6 py-3 lg:px-24 lg:py-12 gap-3 lg:gap-10 rounded-md mx-auto mb-10 border border-white/10">
          <div className="flex  justify-center items-center mt-3 lg:mt-10 gap-x-10 gap-y-5">
            <SecondaryButton type="button" redirectTo="/dashboard">
              Dashboard
            </SecondaryButton>
            <FinishLesson
              userId={user.id}
              lessonId={lesson.id}
              completed={isCompleted}
              slug={params.slug}
            />
            {!nextLesson?.slug ? (
              <SecondaryButton redirectTo={`/cours/${previousLesson?.slug}`}>
                Cours précédent
              </SecondaryButton>
            ) : (
              <SecondaryButton redirectTo={`/cours/${nextLesson?.slug}`}>
                Prochain cours
              </SecondaryButton>
            )}
          </div>
          {nextLesson ? (
            <div className="flex items mt-5">
              <p className="text-neutral-500">Prochain cours</p>
              <p className="text-lg lg:text-2xl text-center font-bold mt-5">
                {nextLesson?.title}
              </p>
            </div>
          ) : (
            <div className="flex items mt-5">
              <p className="text-white/40">Précédent cours:</p>
              <p className="text-sm  text-center font-bold ">
                {previousLesson?.title}
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
