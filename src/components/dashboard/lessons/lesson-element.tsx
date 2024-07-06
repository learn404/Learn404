import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
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
          <div className="flex flex-col gap-8 p-4 w-[404px] rounded-md border-2 border-gray-800">
            <div className="flex items-center justify-between">
              <div className="rounded-full w-12 h-12 bg-torea-300 flex items-center justify-center">
                <Code size={20} color="black" />
              </div>
              <div className="px-3 py-1 rounded-full bg-torea-950/60 border-2 border-torea-900 text-sm">
                débutant
              </div>
            </div>
            <div>
              <TooltipTrigger className="mb-4">
                <p className="text-start text-lg font-semibold truncate">{lesson.title}</p>
              </TooltipTrigger> 
              <div className="flex items-center gap-3">
                <Link 
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium 
                    ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
                    focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-torea-800 hover:bg-torea-900 text-torea-50
                    h-10 px-4 py-2"
                  href={`/cours/${lesson.slug}`}
                >
                  Commencer
                </Link>
                <Separator orientation="vertical" className={cn('h-10')} />
                <span className="font-semibold text-sm text-gray-300">
                  2h
                </span>
              </div>
            </div>
          </div>
        <TooltipContent side="bottom">
          {lesson.title}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
   );
}
 
export default LessonElement;