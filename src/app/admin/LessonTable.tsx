import prisma from "@/lib/prisma";
import { User } from "lucide-react";
import Link from "next/link";

async function getServerSideProps() {
  const res = await prisma.lessons.findMany();
  const lessons = res.map((lesson) => ({
    id: lesson?.id,
    title: lesson?.title,
    slug: lesson?.slug,
    draft: lesson?.draft,
  }));
  return lessons;
}
interface Lesson {
  id: string | null;
  title: string | null;
  draft: boolean | null;
  slug: string | null;
}

export default async function LessonTable() {
  const lessons = await getServerSideProps();

  return (
    <>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 overflow-hidden ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="hidden px-2 md:block md:px-6 py-3">
              TITRE
            </th>
            <th scope="col" className="px-2 md:px-6 py-3">
              BROUILLON
            </th>

            <th
              scope="col"
              className="px-2  md:px-6 py-3 flex items-center gap-1"
            >
              <User size={16} />
              <span>{lessons.length}</span>
            </th>
          </tr>
        </thead>

        <tbody className="max-h-[30vh] overflow-y-scroll w-full">
          {lessons.map((lesson) => (
            <TableRow key={lesson.id} lesson={lesson} />
          ))}
        </tbody>
      </table>
    </>
  );
}

function TableRow({ lesson }: { lesson: Lesson }) {
  return (
    <tr className="hover:bg-white/5">
      <td className="px-2 md:px-6 py-3">{lesson.title}</td>
      <td className="px-2 md:px-6 py-3">
        {lesson.draft ? "Brouillon" : "Publié"}
      </td>
      <td className="px-2 md:px-6 py-3 text-right">
        <Link
          href={`admin/edit-lesson/${lesson.slug}`}
          className="font-medium text-blue-600 hover:underline"
        >
          Edit
        </Link>
      </td>
    </tr>
  );
}
