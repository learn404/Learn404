// lib/utils.ts
import { UserBase } from "@/app/dashboard/page";
import prisma from "@/lib/prisma";
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getLessonNumber = () => {
  const numberLesson = prisma.lessons.count({
    where: {
      draft: false,
    },
  });
  return numberLesson;
};

export const getLessonType = () => {
  const typeLesson = prisma.categories.count({
    where: {
      Lessons: {
        some: {
          draft: false,
        },
      },
    },
  });
  return typeLesson;
};

export const getLastSortNumber = async () => {
  const lastSortNumber = await prisma.lessons.findFirst({
    orderBy: {
      sort_number: "desc",
    },
    select: {
      sort_number: true,
    },
  });
  return lastSortNumber;
};

export const lessonCheckExist = async (slug_title: string) => {
  const existLesson = await prisma.lessons.findFirst({
    where: {
      slug: slug_title,
    },
  });
  return existLesson;
};

export const adminCheckAre = async (email: string) => {
  const admin = await prisma.user.findFirst({
    where: {
      email: email,
    },
    select: {
      admin: true,
    },
  });
  return admin;
};

export const getLessonBySlug = async (slug: string) => {
  const lesson = await prisma.lessons.findFirst({
    where: {
      slug: slug,
    },
  });
  return lesson;
};

export async function getLessonsStartedAndCompleted(user: UserBase) {
  const lessonsStartedAndCompleted = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      _count: {
        select: {
          lessonProgress: {
            where: {
              completed: true
            }
          },
        },
      },
      lessonProgress: true      
    }
  })

  // Check if lessonsStartedAndCompleted is null and return a default object if so
  if (lessonsStartedAndCompleted === null) {
    return {
      _count: {
        lessonProgress: 0, // Default to 0 if no lessons completed
      },
      lessonProgress: [], // Default to an empty array
    };
  }

  return lessonsStartedAndCompleted;
}

export async function getCategoriesWithLessons() {
  const res = await prisma.categories.findMany({
    include: {
      Lessons: {
        orderBy: {
          sort_number: 'asc'
        }
      }
    },
    orderBy: {
      sort_number: 'asc'
    }
  })

  const categories = res.filter(category => category.Lessons.length > 0);
  const lessons = await prisma.lessons.findMany({
    orderBy: {
      sort_number: 'asc'
    }
  })

  return { categories, lessons };
}