import prisma from "@/lib/prisma";
import LessonElement from "./lesson-element";

async function getServerSideProps() {
  const res = await prisma.lessons.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      draft: true,
      newLesson: true,
      slug: true,
      sort_number: true,
    },
    orderBy: {
      sort_number: "asc",
    },
    take: 3,
  });
  
  const lessons = res.map((lesson) => ({
    id: lesson.id,
    title: lesson.title,
    description: lesson.description,
    draft: lesson.draft,
    newLesson: lesson.newLesson,
    slug: lesson.slug,
  }));
  return lessons;
}

interface NextLessonsProps {
  isAdmin: boolean;
  section: "all" | "next";
}

const NextLessonsSection = async ({ isAdmin, section }: NextLessonsProps) => {

  const lessons = await getServerSideProps();

  return ( 
    <div className="text-torea-50">
      {isAdmin ? (
        <ul className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {lessons.map((lesson) => (
            <LessonElement key={`next:${lesson.id}`} lesson={lesson}/>
          ))}
        </ul>
      ):(
        <ul className="flex items-start gap-4">
          {lessons
            .filter((lesson) => !lesson.draft)
            .map((lesson) => (
              <LessonElement key={`all:${lesson.id}`} lesson={lesson} />
            ))}
        </ul>
      )}
    </div>
   );
}
 
export default NextLessonsSection;