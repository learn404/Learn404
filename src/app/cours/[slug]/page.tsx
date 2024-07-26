import ChapterLessonButton from "@/components/buttons/ChapterLessonButton";
import FinishLesson from "@/components/buttons/FinishLessonButton";
import HeaderDashboard from "@/components/layout/headerDashboard/headerDashboard";
import SheetLessons from "@/components/sheet/sheetLessons";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/lib/current-user";
import { getLesson } from "@/lib/lesson";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import Link from "next/link";
import { redirect } from "next/navigation";
import VideoPlayerWithChapters from "./VideoPlayerWithChapters";
import DetailsLesson from './detailsLesson';

interface Params {
  params: {
    slug: string;
    title: string;
    link: string;
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
  if (!user?.isMember) {
    redirect("/dashboard/subscriptions");
  }
  let post = await getLesson(params.slug);

  const datePublished = post.metadata.publishedAt
    ? post.metadata.publishedAt
    : "";

  const dateModified = post.metadata.publishedAt
    ? post.metadata.publishedAt
    : "";

  const links = post.metadata.link ? post.metadata.link : "";
  const repo = post.metadata.repo ? post.metadata.repo : "";

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
      duration: true,
      description: true,
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

  const secretKey = Buffer.from(
    process.env.MUX_SIGNING_KEY as string,
    "base64"
  ).toString("ascii");

  const token = jwt.sign(
    {
      sub: lesson.playbackId,
      aud: "v",
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      kid: process.env.MUX_SIGNING_KEY_ID,
    },
    secretKey,
    { algorithm: "RS256" }
  );

  return (
    <>
      <header className="z-50 relative">
        <HeaderDashboard user={user} title="Cours" />
      </header>
      <div className="z-[60] fixed top-20 left-2 ">
        <SheetLessons userId={user.id} />
      </div>

      <main className="relative flex grow flex-col">
        <section className="relative ">
          {lesson.playbackId ? (
            <div className="z-50">
              <VideoPlayerWithChapters
                token={token}
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
            <p className="m-auto w-fit">Vidéo pas disponible</p>
          )}
        </section>

        <section className="mx-auto mt-6 flex pb-16 sm:mt-12 max-w-lg md:max-w-prose lg:mt-12 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-3.5 lg:px-4 ">
          <div id="lesson" className="min-w-0 lg:col-span-2 lg:px-2 lg:text-lg">
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
                    url: "https://learn404.com",
                  },
                }),
              }}
            />
            <div className="border-y border-white/5 bg-indigo-800 px-4 py-8 mt-10  rounded-lg sm:border sm:p-4 lg:hidden">
              <div className="flex flex-wrap justify-center items-center mt-3 lg:mt-10 gap-x-10 gap-y-5">
                <DetailsLesson title={lesson.title} description={lesson.description} completed={statusLesson?.completed ?? false} slug={params.slug} userId={user.id} lessonId={lesson.id} duration={lesson.duration} repo={repo} link={links} admin={user.admin} playbackId={lesson.playbackId} />
              </div>
            </div>

            <article
              className="min-w-0 lg:col-span-2 lg:px-2 lg:text-lg z-50 py-4 px-5 prose prose-lg prose-invert m-auto prose-pre:border prose-pre:border-white/10 prose-pre:bg-[#ffffff0a] prose-pre:text-white"
              dangerouslySetInnerHTML={{ __html: post.source }}
            ></article>
          </div>

          <div className="ml-auto hidden px-2 w-full lg:block h-full flex-shrink-0">
            <div className="sticky top-0 w-full pt-2">
              <div className="pt-10 lg:sticky lg:top-0 lg:pt-4">
                <DetailsLesson title={lesson.title} description={lesson.description} completed={statusLesson?.completed ?? false} slug={params.slug} userId={user.id} lessonId={lesson.id} duration={lesson.duration} repo={repo} link={links} admin={user.admin} playbackId={lesson.playbackId} />
              </div>
            </div>
          </div>
        </section>

        <div className="bg-indigo-800 max-w-[90vw] lg:max-w-xl px-6 py-3 lg:px-24 lg:py-12 gap-3 lg:gap-10 rounded-md mx-auto mb-10 border border-white/10">
          <div className="flex justify-start lg:justify-center items-center gap-x-10 gap-y-5 flex-wrap">
            <Link href="/dashboard">
              <Button variant="secondary">Tableau de bord</Button>
            </Link>
            <div className="block lg:hidden">
              <FinishLesson userId={user.id} lessonId={lesson.id} completed={isCompleted} slug={params.slug} />
            </div>
            
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
            <div className="flex flex-col items-start mt-5">
              <p className="text-white/40 text-sm">Prochain cours</p>
              <p className="lg:text-2xl text-left font-bold lg:mt-3">
                {nextLesson?.title}
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-start mt-5">
              <p className="text-white/40 text-sm">Précédent cours:</p>
              <p className="text-sm text-left font-bold lg:mt-3">
                {previousLesson?.title}
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
