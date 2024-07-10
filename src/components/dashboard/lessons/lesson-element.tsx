import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Lessons } from "@prisma/client";
import { CheckCheck, CircleDashed, Code } from "lucide-react";
import Link from "next/link";

interface LessonElementProps {
  lesson: (Lessons & { status?: 1 | 2 | 3 }) | undefined;
}

const levelMap = {
  BEGINNER: 'Débutant',
  INTERMEDIATE: 'Intermédiaire',
  ADVANCED: 'Avancé',
}

const LessonElement = ({ lesson }: LessonElementProps) => {
  return ( 
    <TooltipProvider delayDuration={100}>
      <Tooltip>
          <div className="flex-1 flex flex-col gap-8 p-4 rounded-md border-2 border-gray-800 bg-gray-950 min-w-72 md:min-w-80">
            <div className="flex items-center justify-between">
              <div className="rounded-full w-12 h-12 bg-gray-800 flex items-center justify-center">
                <Code size={23} color="#eef2ff" />
                {/* {lesson.sort_number} */}
              </div>
              <div className="px-3 py-1 rounded-full bg-torea-950/60 border-2 border-torea-900 text-sm">
                {levelMap[lesson?.level!]}
              </div>
            </div>
            <div className="flex flex-col">
              <TooltipTrigger className="mb-4 w-auto">
                <p className="text-start text-base lg:text-lg font-semibold truncate">{lesson?.title}</p>
              </TooltipTrigger> 
              <div className="flex items-center gap-3">
                <Link 
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium 
                    ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
                    focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-torea-800 hover:bg-torea-900 text-torea-50
                    h-10 px-4 py-2"
                  href={`/cours/${lesson?.slug}`}
                >
                  {lesson?.status === 3 ? "Revoir" : lesson?.status === 2 ? "Reprendre" : "Commencer"}
                </Link>
                <Separator orientation="vertical" className={cn('h-10')} />
                <span className="font-semibold text-sm text-gray-300">
                  {lesson?.duration ?? "Durée introuvable"}
                </span>
                <Separator orientation="vertical" className={cn('h-10')} />
                <span className="font-semibold text-sm text-gray-300">
                {lesson?.status === 3 
                  ?  <CheckCheck width={20} height={20} color="hsl(var(--chart-2))" />
                  : lesson?.status === 2 
                    ? <CircleDashed width={20} height={20} color="hsl(var(--chart-3))" /> 
                    : "A voir"}
                </span>
              </div>
            </div>
          </div>
        <TooltipContent side="bottom">
          {lesson?.title}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
   );
}
 
export default LessonElement;