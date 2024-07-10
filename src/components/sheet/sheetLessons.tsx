import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { CheckCheck, CircleDashed, List, Circle } from "lucide-react";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { getLessonsStartedAndCompleted } from "@/lib/utils";
import { currentUser } from "@/lib/current-user";


type userIdProps = {
  userId: string;
};

export default async function SheetLessons({ userId }: userIdProps) {
  const categories = await prisma.categories.findMany({
    where: {
      Lessons: {
        some: {
          draft: false,
        },
      },
    },
    orderBy: {
      sort_number: "asc",
    },
    include: {
      Lessons: {
        where: {
          draft: false,
          sort_number: {
            gt: 0,
          },
        },
        orderBy: {
          sort_number: "asc",
        },
      },
    },
  });

  type LessonWithFormattedSortNumber = {
    id: string;
    title: string;
    slug: string;
    categoryId: string;
    description: string | null;
    playbackId: string | null;
    duration: string | null;
    repository_url: string | null;
    sort_number: number;
    draft: boolean;
    newLesson: boolean;
    createdAt: Date;
    updatedAt: Date;
    formatted_sort_number?: string;
    status?: number;
  };

  categories.sort((a, b) => (a.sort_number ?? 0) - (b.sort_number ?? 0));

  categories.forEach((category) => {
    category.Lessons.forEach((lesson: LessonWithFormattedSortNumber) => {
      if (lesson.sort_number < 10) {
        lesson.formatted_sort_number = "0" + lesson.sort_number.toString();
      } else {
        lesson.formatted_sort_number = lesson.sort_number.toString();
      }
    });
  });

  const user = await currentUser(); 
  const lessonsStartedAndCompleted = await getLessonsStartedAndCompleted(user);

  categories.forEach((category) => {
    category.Lessons.forEach((lesson: LessonWithFormattedSortNumber) => {
      const lessonProgress = lessonsStartedAndCompleted.lessonProgress.find(
        (lp) => lp.lessonId === lesson.id
      );

      if (lessonProgress) {
        lesson.status = lessonProgress.completed ? 3 : 2;
      } else {
        lesson.status = 1;
      }
    });
  });

  return (
    <>
      <Sheet>
        <SheetTrigger className="z-50 flex items-center w-fit justify-center gap-2 rounded-md px-3.5 py-2.5 text-xs md:text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 border border-input bg-white text-black hover:bg-neutral-300 focus-visible:outline-indigo-500">
          <List className="w-5 h-5" />
        </SheetTrigger>
        <SheetContent className="bg-bg-primary border border-white/10 w-[100vw] lg:w-[30vw]" side="left">
          <SheetHeader>
            <SheetTitle>
              <h1 className="text-2xl font-bold text-white">Cours</h1>
            </SheetTitle>
            <SheetDescription className="overflow-y-auto max-h-[calc(100vh-1rem)] rounded-lg scrollbar-none">
              <ul className="flex flex-col gap-5 my-5">
                {categories.map((category) => (
                  <li key={category.id}>
                    <h2 className="text-lg font-bold text-white">
                      {category.name.toUpperCase()}
                    </h2>
                    <ul className="flex flex-col gap-2 mt-4">
                      {category.Lessons.map(
                        (lesson: LessonWithFormattedSortNumber) => (
                          <li
                            key={lesson.id}
                            className="group flex items-center gap-2 hover:bg-torea-50/10 transition-all duration-300 px-2 py-1 rounded-md"
                          >
                            <Link
                              href={`/cours/${lesson.slug}`}
                              className="text-torea-50 hover:text-torea-50/80 transition-all duration-300 flex justify-between items-center gap-2"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-6 h-6 flex items-center justify-center">
                                  {lesson.status === 3 ? (
                                    <CheckCheck
                                      width={20}
                                      height={20}
                                      color="hsl(var(--chart-2))"
                                    />
                                  ) : lesson.status === 2 ? (
                                    <CircleDashed
                                      width={20}
                                      height={20}
                                      color="hsl(var(--chart-3))"
                                    />
                                  ) : (
                                    <Circle
                                      width={20}
                                      height={20}
                                      color="#6b7280"
                                    />
                                  )}
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-torea-50 group-hover:text-torea-50/80 transition-all duration-300">
                                    {lesson.formatted_sort_number}.{" "}
                                  </span>
                                  {lesson.title}
                                </div>
                              </div>
                              {lesson.duration && (
                                <span className="text-xs text-black bg-torea-50 px-1.5 rounded-md py-0.5 group-hover:text-black/80 group-hover:bg-torea-50/80 transition-all duration-300 h-fit">
                                  {lesson.duration}
                                </span>
                              )}
                            </Link>
                          </li>
                        )
                      )}
                    </ul>
                  </li>
                ))}
              </ul>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
}