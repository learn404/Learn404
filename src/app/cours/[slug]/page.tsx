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
  };
}

export async function generateMetadata({
  params,
}: Params): Promise<{ title: string }> {
  try {
    const { meta } = await getPageContent(params.slug);
    console.log(meta);
    return { title: meta.slug || "" }; // Use meta directly as it's now treated as a string
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
    redirect("/login");
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
      title: params.slug,
    },
    select: {
      id: true,
      title: true,
      draft: true,
      video_url: true,
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
      <section className="py-24 text-white flex justify-center flex-col">
        <h1 className="text-4xl font-bold text-center">{lessons.title}</h1>
        {lessons.video_url ? (
          <MuxPlayer
            className="mx-auto max-w-7xl my-10"
            playbackId={lessons.video_url}
            accentColor="#fefefe"
            metadata={{
              video_id: lessons.id,
              video_title: lessons.title,
            }}
          />
        ) : (
          <p>Video not available</p>
        )}

        <div className="container py-4 prose prose-invert m-auto">
          {content}
        </div>
      </section>
    </>
  );
}
