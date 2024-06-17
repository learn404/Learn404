import { getPostBySlug } from "@/lib/mdx";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import HeaderDashboard from "@/components/layout/headerDashboard/headerDashboard";
import MuxPlayer from "@mux/mux-player-react";
import SecondaryButton from "@/components/buttons/SecondaryButton";

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
  const { content } = await getPageContent(params.slug);

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

  const lessons = await prisma.lessons.findFirst({
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

  let nextLesson = await prisma.lessons.findFirst({
    where: {
      sort_number: (lessons?.sort_number as number) + 1,
    },
    select: {
      slug: true,
    },
  });

  if (lessons?.draft && user?.admin === false) {
    redirect("/dashboard");
  }

  if (!lessons) {
    redirect("/dashboard");
  }

  return (
    <>
      <header className="z-50 relative">
        <HeaderDashboard session={sessionData} />
      </header>

      <main className="text-white flex justify-center flex-col z-0">
        {/* https://drive.google.com/uc?id=ID_DU_FICHIER pour upload video sur google drive
         */}

        {lessons.playbackId ? (
          <div className="mx-auto w-[75vw]">
            <MuxPlayer
              stream-type="on-demand"
              autoPlay={false}
              max-resolution="1080p"
              preload="false"
              playbackId={lessons.playbackId}
              accentColor="#fefefe"
              metadata={{
                video_id: lessons.id,
                video_title: lessons.title,
              }}
            />
          </div>
        ) : (
          <p className="m-auto">Vidéo pas disponible</p>
        )}
        <div className=" bg-indigo-800  max-w-xl px-24 py-12 gap-10 rounded-md mx-auto mb-10 border  border-white/10">
          <h1 className="text-4xl text-center font-bold">{lessons.title}</h1>
          <div className="flex justify-center items-center mt-10 gap-10">
            <SecondaryButton type="button" redirectTo="/dashboard">
              Dashboard
            </SecondaryButton>
            {!nextLesson?.slug ? (
              ""
            ) : (
              <SecondaryButton redirectTo={`/cours/${nextLesson?.slug}`}>
                Next lesson
              </SecondaryButton>
            )}
          </div>
        </div>
        <div className="py-4 prose lg:prose-xl prose-invert m-auto  prose-pre:border prose-pre:bg-white/10">
          {content}
        </div>
        <div className=" bg-indigo-800 max-w-6xl px-24 py-12 gap-10 rounded-md mx-auto mb-10 border  border-white/10">
          <div className="flex justify-center items-center mt-10 gap-10">
            <SecondaryButton type="button" redirectTo="/dashboard">
              Dashboard
            </SecondaryButton>
            {!nextLesson?.slug ? (
              ""
            ) : (
              <SecondaryButton redirectTo={`/cours/${nextLesson?.slug}`}>
                Next lesson
              </SecondaryButton>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
