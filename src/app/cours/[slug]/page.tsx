import ChapterLessonButton from "@/components/buttons/ChapterLessonButton";
import FinishLesson from "@/components/buttons/FinishLessonButton";
import HeaderDashboard from "@/components/layout/headerDashboard/headerDashboard";
import SheetLessons from "@/components/sheet/sheetLessons";
import { currentUser } from "@/lib/current-user";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import VideoPlayerWithChapters from "./VideoPlayerWithChapters";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getLesson } from "@/lib/lesson";

interface Params {
  params: {
    slug: string;
    title: string;
  };
}

export async function generateMetadata({
  params,
}: Params): Promise<{ title: string }> {
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
  let post = await getLesson(params.slug);


  const datePublished = post.metadata.publishedAt ? post.metadata.publishedAt : "";

  const dateModified = post.metadata.publishedAt ? post.metadata.publishedAt : "";

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

  const lessonProgress = await prisma.lessonProgress.findFirst({
    where: {
      userId: user.id,
      lessonId: lesson.id,
    },
    select: {
      completed: true,
    },
  });

  return (
    <>
      <header className="z-50 relative">
        <HeaderDashboard user={user} title="Cours" />
      </header>
      <div className="z-40 fixed top-20 left-2 ">
        <SheetLessons userId={user.id} />
      </div>

      <main className="text-white flex justify-center flex-col z-50">
        {lesson.playbackId ? (
          <div className="mx-auto w-[75vw] z-50">
            <VideoPlayerWithChapters
              playbackId={lesson.playbackId}
              videoId={lesson.id}
              videoTitle={lesson.title}
              chapters={chapters}
              userId={user.id}
              lessonId={lesson.id}
              lessonProgress={lessonProgress}
            />
          </div>
        ) : (
          <p className="m-auto">Vidéo pas disponible</p>
        )}
        <div className="bg-indigo-800 max-w-[90vw] px-6 py-3 lg:px-24 lg:py-12 gap-3 lg:gap-10 rounded-md mx-auto mb-10 border border-white/10">
          <h1 className="text-lg lg:text-4xl text-center font-bold">
            {lesson.title}
          </h1>
          <div className="flex flex-wrap justify-center items-center mt-3 lg:mt-10 gap-x-10 gap-y-5">
            <Link href="/dashboard">
              <Button variant="secondary">Tableau de bord</Button>
            </Link>

            {!nextLesson?.slug ? (
              <Link href={`/cours/${previousLesson?.slug}`}>
                <Button variant="secondary">Cours précédent</Button>
              </Link>
            ) : (
              <Link href={`/cours/${nextLesson?.slug}`}>
                <Button variant="secondary">Prochain cours</Button>
              </Link>
            )}
            {user.admin ? (
              <>
                <Link href={`/admin/edit-lesson/${params.slug}`}>
                  <Button variant="secondary">Modifier le cours</Button>
                </Link>
                {lesson.playbackId ? (
                  <ChapterLessonButton params={params} />
                ) : (
                  ""
                )}
              </>
            ) : (
              ""
            )}
          </div>
        </div>
        <section id="lesson">
          <script
            type="application/ld+json"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Cours",
                headline: post.metadata.title,
                datePublished: datePublished,
                dateModified: dateModified,
                description: post.metadata.summary,
                image: post.metadata.image
                  ? `learn404.com${post.metadata.image}`
                  : `learn404.com/og?title=${post.metadata.title}`,
                url: `learn404.com/cours/${post.slug}`,
                author: {
                  "@type": "Person",
                  name: "Nicolas Becharat",
                },
              }),
            }}
          />
          <article
            className="max-w-[80vw] z-50 py-4 px-5 prose prose-lg prose-invert m-auto prose-pre:border prose-pre:bg-white/10"
            dangerouslySetInnerHTML={{ __html: post.source }}
          ></article>
        </section>
        <div className="bg-indigo-800 max-w-[90vw] lg:max-w-xl px-6 py-3 lg:px-24 lg:py-12 gap-3 lg:gap-10 rounded-md mx-auto mb-10 border border-white/10">
          <div className="flex  justify-center items-center mt-3 lg:mt-10 gap-x-10 gap-y-5">
            <Link href="/dashboard">
              <Button variant="secondary">Tableau de bord</Button>
            </Link>
            <FinishLesson
              userId={user.id}
              lessonId={lesson.id}
              completed={isCompleted}
              slug={params.slug}
            />
            {!nextLesson?.slug ? (
              <Link href={`/cours/${previousLesson?.slug}`}>
                <Button variant="secondary">Cours précédent</Button>
              </Link>
            ) : (
              <Link href={`/cours/${nextLesson?.slug}`}>
                <Button variant="secondary">Prochain cours</Button>
              </Link>
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
              <p className="text-sm text-center font-bold ">
                {previousLesson?.title}
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}