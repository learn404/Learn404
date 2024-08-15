import { currentUser } from "@/lib/current-user";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { name, start, slug } = await request.json();

  const user = await currentUser()

  if (!user || !user.admin) {
    return NextResponse.json({ message: "Accès refusé, vous n'êtes pas admin, merci de ne pas tenter de faire des requêtes illégales" }, { status: 403 });
  }

 if (!name || !start || !slug) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }


  const start_in_seconds = start.split(':').reduce((acc: number, time: string) => acc * 60 + parseInt(time), 0);

  const id_lesson = await prisma.lessons.findFirst({
    where: {
      slug: slug,
    },
  })

  if (!id_lesson) {
    return NextResponse.json({ message: 'Lesson not found' }, { status: 404 });
  }


  const chapter = await prisma.lessonChapter.create({
    data: {
      name,
      start: start_in_seconds,
      Lessons: {
        connect: {
        id: id_lesson.id,
        },
      },
    },
  });

  console.log(chapter);


  return NextResponse.json({ message: 'Chapter added' });
}