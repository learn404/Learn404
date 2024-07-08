import prisma from "@/lib/prisma";
import LessonElement from "./lesson-element";

async function getServerSideProps() {
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
  return categories;
}

interface NextLessonsProps {
  isAdmin: boolean;
}

const CategorieLessonsSection = async ({ isAdmin }: NextLessonsProps) => {

  const categories = await getServerSideProps();

  return ( 
    <div className="text-torea-50">
      {categories.map((category) => (
        <>
          <div className="my-10" key={category.id}>
            <h2 className="text-2xl font-semibold mb-4 capitalize">{category.name}</h2>
            {isAdmin ? (
              <ul className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">


                {category.Lessons.map((lesson) => (
                  <LessonElement key={`next:${lesson.id}`} lesson={lesson}/>
                ))}

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
        </>
      ))}


    </div>
   );
}
 
export default CategorieLessonsSection;