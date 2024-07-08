import { NextRequest, NextResponse } from "next/server";
import  prisma  from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const { name, start, slug } = await request.json();

 if (!name || !start || !slug) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  // si start est sous forme 00:00:00, on la convertit en secondes
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