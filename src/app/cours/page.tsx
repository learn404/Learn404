
import { getLessonPosts } from "@/lib/lesson";
import Link from "next/link";

export const metadata = {
    title: "Cours",
    description: "Cours de formation",
};


export default async function LegalPage() {
    const posts = await getLessonPosts();

  return (
    <section>
    
        <h1 className="font-medium text-2xl mb-8 tracking-tighter">Cours</h1>

      {posts
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1;
          }
          return 1;
        })
        .map((post, id) => (
          <div key={post.slug}>
            <Link
              className="flex flex-col space-y-1 mb-4"
              href={`/legal/${post.slug}`}
            >
              <div className="w-full flex flex-col">
                <p className="tracking-tight">{post.metadata.title}</p>
                <p className="h-6 text-xs text-muted-foreground">
                  {post.metadata.publishedAt}
                </p>
              </div>
            </Link>
          </div>
        ))}
    </section>
  );
}
