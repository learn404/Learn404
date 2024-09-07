import prisma from "@/lib/prisma";

export async function getLessonsForShortcut() {
  const res = await prisma.lessons.findMany({
    select: {
      id: true,
      title: true,
      slug: true, 
    }
  })
  return res;
}