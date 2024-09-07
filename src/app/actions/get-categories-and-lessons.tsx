import prisma from "@/lib/prisma";

export default async function getCategoriesWithLessons() {
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
        select: {
          id: true,
          title: true,
          slug: true
        }
      },
    },
  });

  return categories;
}