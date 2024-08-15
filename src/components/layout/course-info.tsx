
import NumberTicker from "../magicui/number-ticker";
import prisma from "@/lib/prisma";
import { getLessonNumber, getLessonType } from "@/lib/utils";
const convertDurationToSeconds = (duration: string) => {
  const [hours, minutes, seconds] = duration.split(":").map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

const convertSecondsToDuration = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  if (hours === 0) {
    return 1;
  } else {
    return `${hours}`;
  }
}

const CoursesInfos = async () => {
  const lessonNumber = await getLessonNumber();
  const lessonType = await getLessonType();

  const durationLessons = await prisma.lessons.findMany({
    select: {
      duration: true,
    },
  });

  let durationTotalSeconds = 0;

  durationLessons.forEach((lesson) => {
    if (lesson.duration) {
      durationTotalSeconds += convertDurationToSeconds(lesson.duration);
    }
  });

  const durationTotal = convertSecondsToDuration(durationTotalSeconds);
  const durationTotalNumber = Number(durationTotal);
  return ( 
    <div className="relative px-6 py-[6.25rem] bg-torea-950/30">
      <div className="mx-auto flex flex-col sm:items-center justify-center gap-14">
        <h2 className="text-gray-50 text-3xl sm:text-4xl font-semibold sm:text-center max-sm:text-balance">
          L'essentiel pour débuter
        </h2>
        <div className="text-gray-300 text-lg max-w-screen-md sm:text-center">
          <p>
            Learn404 est un <span className="text-gray-50 font-semibold ">concentré de connaissances</span> que nous avons acquises 
            tout le long de notre apprentissage du développement web.
          </p>
          <p className="mt-5">
            Tu apprendra donc tout ce que l'on sait, en partant de la prise en main d'un environnement de travail jusqu'à nos 
          <span className="text-gray-50 font-semibold "> connaissances actuelles</span>. La plateforme sera mise à jour tous les mois pour y ajouter de nouveaux cours. 
          </p>
        </div>
        <div className="flex items-start flex-wrap gap-y-4 max-w-4xl w-full">
          <div className="flex flex-col items-center justify-between flex-1">
            <span className="font-extrabold text-6xl sm:text-7xl lg:text-8xl textLinear">
              <NumberTicker value={lessonNumber} />
            </span>
            <span className="mt-2 text-center text-lg sm:text-2xl lg:text-3xl font-medium text-gray-300">
              cours
            </span>
          </div>
          <div className="flex flex-col items-center justify-center flex-1 mx-3">
            <span className="font-extrabold text-6xl sm:text-7xl lg:text-8xl textLinear">
              <NumberTicker value={lessonType} />
            </span>
            <span className="mt-2 text-center text-lg sm:text-2xl lg:text-3xl font-medium text-gray-300">
              catégories
            </span>
          </div>
          <div className="flex flex-col items-center justify-center flex-1">
            <span className="font-extrabold text-6xl sm:text-7xl lg:text-8xl textLinear">
              <NumberTicker value={durationTotalNumber} />
            </span>
            <span className="mt-2 text-center text-lg sm:text-2xl lg:text-3xl font-medium text-gray-300">
              heures de cours
            </span>
          </div>
        </div>
      </div>
    </div>
   );
}
 
export default CoursesInfos;