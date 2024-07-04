import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Code } from "lucide-react";
import Link from "next/link";

type Lesson = {
  id: string;
  title: string;
  description: string | null;
  draft: boolean;
  newLesson: boolean;
  slug: string;
}

interface LessonElementProps {
  lesson: Lesson;
}

const LessonElement = async ({ lesson }: LessonElementProps) => {
  return ( 
    <TooltipProvider delayDuration={100}>
      <Tooltip>
          <Link href={`/cours/${lesson.slug}`} key={lesson.id} className="flex flex-col justify-between p-4 hover:bg-slate-900 w-96 h-40 rounded-md border-2 border-gray-800">
            <div className="flex items-center justify-between">
              <div className="rounded-full w-12 h-12 bg-torea-300 flex items-center justify-center">
                <Code size={20} color="black" />
              </div>
              <div className="flex items-center gap-1">
                {/* <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>En cours</span> */}
                <div className="w-2 h-2 bg-gray-500 rounded-full" />
                <span>Non vu</span>
              </div>
            </div>
            <div className="mt-2">
              <TooltipTrigger>
                <p className="text-start text-lg font-semibold truncate">{lesson.title}</p>
              </TooltipTrigger> 
              {/* <p>30h</p> */}
            </div>
          </Link>
        <TooltipContent side="bottom">
          {lesson.title}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
   );
}
 
export default LessonElement;