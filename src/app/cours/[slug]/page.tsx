import { getPostBySlug } from "@/lib/mdx";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import HeaderDashboard from "@/components/layout/headerDashboard/headerDashboard";
import MuxPlayer from "@mux/mux-player-react";

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
      <HeaderDashboard session={sessionData} />
      <section className="text-white flex justify-center flex-col">
        {/* https://drive.google.com/uc?id=ID_DU_FICHIER pour upload video sur google drive
         */}

        {lessons.playbackId ? (
          <div className="p-24">
            <MuxPlayer
              max-resolution="720p"
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
          <p className="m-auto">Video not available</p>
        )}

        <div className="container py-4 prose lg:prose-xl prose-invert m-auto">
          {content}
        </div>
      </section>
    </>
  );
}
