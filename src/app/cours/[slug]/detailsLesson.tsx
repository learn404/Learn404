"use client";

import ChapterLessonButton from "@/components/buttons/ChapterLessonButton";
import FinishLessonButton from "@/components/buttons/FinishLessonButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, Link as LinkIcon } from "lucide-react";
import Link from "next/link";

export default function DetailsLesson({
  title,
  slug,
  userId,
  lessonId,
  duration,
  repo,
  link,
  description,
  completed,
  admin,
  playbackId,
}: {
  title: string;
  description: string | null;
  slug: string;
  userId: string;
  lessonId: string;
  duration: string | null;
  completed: boolean;
  admin: boolean;
  playbackId: string | null;
  repo: string | null;
  link: string | null;
}) {

  const links = link ? JSON.parse(link) : [];
    
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
       {/*  <Badge variant="secondary">{duration}</Badge> */}
      </div>
      <div className="flex flex-col">
        {description && <p className="text-gray-500">{description}</p>}
      </div>
      <div className="flex flex-col">
        {repo && repo.length > 0 && (
          <div>
            <ul>
              
                <li
                  key={repo}
                  className="hover:bg-torea-50/10 transition-colors p-2 rounded-md cursor-pointer duration-300 flex items-center gap-2 mt-2"
                >
                  <Link href={repo} target="_blank" className="underline">
                    <div className="flex items-center gap-2">
                      <Github className="w-4 h-4" />
                    Repo GitHub du cours
                  </div>
                </Link>
                </li>
              
            </ul>
          </div>
        )}
        {links && links.length > 0 && (
          <div className="mt-2">
            <ul>
              {links.map((link: any) => (
                <li
                  key={link.url}
                  className="hover:bg-torea-50/10 transition-colors p-2 rounded-md cursor-pointer duration-300 "
                >
                  <Link href={link.url} target="_blank" className="underline">
                    <div className="flex items-center gap-2">
                      <LinkIcon className="w-4 h-4" />
                      {link.label}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="flex flex-row lg:flex-col gap-2 mt-4">
        <div className="flex flex-col gap-2">
          {admin ? (
            <div className="flex items-center gap-2">
              <Link href={`/admin/edit-lesson/${slug}`}>
                <Button variant="secondary">Modifier le cours</Button>
              </Link>
              {playbackId ? (
                <ChapterLessonButton params={{ slug: slug }} />
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="hidden lg:block">
          <FinishLessonButton
          lessonId={lessonId}
          userId={userId}
          slug={slug}
          completed={completed}
        />
        </div>
      </div>
    </div>
  );
}
