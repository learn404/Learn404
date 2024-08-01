'use client'

import Prism from 'prismjs';


import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-javascript';






import { useEffect } from 'react';

export default function ArticleLesson({lesson}: {lesson: string}) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <article
    className="min-w-0 lg:col-span-2 lg:px-2 lg:text-lg z-50 py-4 px-5 text-lg text-white m-auto prose-pre:border pre:border-white/10 pre:bg-[#ffffff0a] w-full "
    dangerouslySetInnerHTML={{  __html: lesson }}
  ></article>
  )
}