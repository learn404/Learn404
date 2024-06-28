// lib/utils.ts
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
  const typeLesson = prisma.categories.count();
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
