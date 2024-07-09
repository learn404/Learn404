import { Categories, Lessons } from "@prisma/client";
import LessonElement from "./lesson-element";

interface NextLessonsProps {
  isAdmin: boolean;
  categories: (Categories & { Lessons: Lessons[] })[];
  lessons: (Lessons & { status?: 1 | 2 | 3 })[]; // This is a union type
}

const CategorieLessonsSection = async ({ isAdmin, categories, lessons }: NextLessonsProps) => {

  return ( 
    <div className="text-torea-50">
      {categories.map((category) => (
          <div className="my-10" key={category.id}>
            <h2 className="text-2xl font-semibold mb-4 capitalize">{category.name}</h2>
            {isAdmin ? (
              <ul className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {category.Lessons.map((lesson) => {
                  const foundLesson = lessons.find(lessonWithStatus => lesson.id === lessonWithStatus.id);
                  return <LessonElement key={`all:${lesson.id}`} lesson={foundLesson}/>
                })}

              </ul>
            ) : (
              <ul className="flex items-start gap-4">
                {category.Lessons
                  .filter(lesson => !lesson.draft)
                  .map(lesson => (
                    <LessonElement key={`all:${lesson.id}`} lesson={lesson} />
                  ))}
              </ul>
            )}
          </div>
      ))}


    </div>
   );
}
 
export default CategorieLessonsSection;