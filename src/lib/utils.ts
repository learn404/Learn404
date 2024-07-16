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


  if (lessonsStartedAndCompleted === null) {
    return {
      _count: {
        lessonProgress: 0,
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

export async function getChangelogData() {
  const res = await prisma.changeLog.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })
  return res;
}

export async function getLessons() {
  const res = await prisma.lessons.findMany({
    orderBy: {
      sort_number: 'asc'
    }
  })
  return res;
}

export async function getTransactions() {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

  const fifteenDaysAgo = Math.floor(Date.now() / 1000) - (15 * 24 * 60 * 60);

  const transactions = await stripe.charges.list({
    limit: 100,
    created: {
      gte: fifteenDaysAgo
    }
  });
  
  const transationLength = transactions.data.length;

  return transationLength;

}


export async function getUpvotes(id: string) {
  const upvotes = await prisma.roadmap.findFirst({
    where: {
      id: id
    },
    select : {
      upvotes: true
    }
  })
  return upvotes;
}

export async function upvoteRoadmap(id: string) {


  const upvote = await prisma.roadmap.update({
    where: {
      id: id
    },
    data: {
      upvotes: {
        increment: +1
      }
    }
  })

  return upvote;
}



export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('fr-FR', { month: 'long', day: 'numeric', year: 'numeric' });
}