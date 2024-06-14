import { getPostBySlug } from "@/lib/mdx";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import HeaderDashboard from "@/components/layout/headerDashboard/headerDashboard";

interface Meta {
  title: string;
  [key: string]: any;
}

interface PageContent {
  meta: Meta;
  content: string;
}

const getPageContent = async (slug: string): Promise<PageContent> => {
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
  const { meta } = await getPageContent(params.slug);
  return { title: meta.title };
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

  return (
    <>
      <HeaderDashboard session={sessionData} />
      <section className="py-24 text-white">
        <div className="container py-4 prose prose-invert m-auto">
          {content}
        </div>
      </section>
    </>
  );
}
