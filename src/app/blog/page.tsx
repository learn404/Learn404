import { getBlogPosts } from "@/lib/blog";
import Link from "next/link";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { currentUser } from "@/lib/current-user";
import HeaderDashboard from "@/components/layout/headerDashboard/headerDashboard";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export const metadata = {
  title: "Blog",
  description:
    "Découvrez tous nos articles de blog sur le développement web et l'informatique.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  const user = await currentUser();



  return (
    <>
{user ? <HeaderDashboard user={user} title="Blog" /> : <Header />}
      <section className="max-w-screen-xl mx-auto px-4">
        <h1 className="font-bold text-2xl mb-8 tracking-tighter ">Blog</h1>

        {posts
          .sort((a, b) => {
            if (
              new Date(a.metadata.publishedAt) >
              new Date(b.metadata.publishedAt)
            ) {
              return -1;
            }
            return 1;
          })
          .map((post, id) => (
            <div key={post.slug}>
              <TooltipProvider delayDuration={1000}>
                <Tooltip>
                  
                    <Link
                      className="flex flex-col space-y-1 mb-4 gap-8 p-4 rounded-md border-2 border-gray-800 bg-gray-950 w-fit"
                href={`/blog/${post.slug}`}
              >
                <div className="w-full flex flex-col">
                  <TooltipTrigger>
                  <p className="tracking-tight font-medium text-lg">{post.metadata.title}</p>
                  </TooltipTrigger>
                  <TooltipContent>
                  <p className="tracking-tight">{post.metadata.title}</p>
                  </TooltipContent>
                  <p className="h-6 text-xs text-muted-foreground">
                    {post.metadata.publishedAt}
                    </p>
                  
                </div>
              </Link>
              </Tooltip>
              </TooltipProvider>
            </div>
          ))}
      </section>
      <Footer />
    </>
  );
}
