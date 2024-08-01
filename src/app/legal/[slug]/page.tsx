import { getPost } from "@/lib/legal";

import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}): Promise<Metadata | undefined> {
  let post = await getPost(params.slug);

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  let ogImage = image ? `learn404.com${image}` : `learn404.com/og?title=${title}`; 

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `learn404.com/legal/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Legal({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  let post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
    <Header />
    <section id="legal">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LegalDocument",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `learn404.com${post.metadata.image}`
              : `learn404.com/og?title=${post.metadata.title}`,
            url: `learn404.com/legal/${post.slug}`,
            author: {
              "@type": "Person",
              name: "Nicolas Becharat",
            },
          }),
        }}
      />
      
      <div className="flex flex-col  max-w-3xl m-auto">
          <div className="bg-indigo-800 min-w-sm lg:min-w-lg w-full px-6 py-3 lg:py-12 gap-3 lg:gap-10 rounded-md mx-auto mb-10 border border-white/10 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <h1 className="title font-medium text-2xl tracking-tighter max-w-[650px]">
                {post.metadata.title}
              </h1>
              <div className="flex justify-between items-center mt-2 mb-8 text-sm max-w-[650px]">
                <Suspense fallback={<p className="h-5" />}>
                  <p className="text-sm text-neutral-400">
                    {formatDate(post.metadata.publishedAt)}
                  </p>
                </Suspense>
              </div>
            </div>
          </div>
          <article
            className="z-50 py-4 px-5 prose lg:prose-xl prose-invert m-auto prose-pre:border prose-pre:bg-white/10"
            dangerouslySetInnerHTML={{ __html: post.source }}
          ></article>
        </div>
    </section>
    <Footer />
    </>
  );
}
