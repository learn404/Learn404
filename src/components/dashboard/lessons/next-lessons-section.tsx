import { Lessons } from "@prisma/client";
import LessonElement from "./lesson-element";

interface NextLessonsProps {
  isAdmin: boolean;
  lessons: (Lessons & { status?: 1 | 2 | 3 })[]; // This is a union type
  // lessonsCompleted: { lessonProgress: LessonProgress[], _count: { lessonProgress: number } };
}

const NextLessonsSection = async ({ isAdmin, lessons }: NextLessonsProps) => {

  let nextLessons = lessons.filter(lesson => lesson.status === 1 || lesson.status === 2).slice(0, 3);

  return ( 
    <div className="text-torea-50">
      {isAdmin ? (
        <div className="flex flex-wrap gap-4">
          {[...nextLessons].map((lesson) => (
            <LessonElement key={`next:${lesson.id}`} lesson={lesson}/>    
          ))}
        </div>
      ) : (
        <div className="flex items-start gap-4">
          {[...nextLessons]
            .filter((lesson) => !lesson.draft)
            .map((lesson) => (
              <LessonElement key={`next:${lesson.id}`} lesson={lesson} />
            ))}
        </div>
      )}
    </div>
   );
}
 
export default NextLessonsSection;