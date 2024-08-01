import prisma from "@/lib/prisma";
import { getLessonNumber, getLessonType } from "@/lib/utils";

const slugs = [
  "typescript",
  "javascript",
  "dart",
  "java",
  "react",
  "flutter",
  "android",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "amazonaws",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "jest",
  "cypress",
  "docker",
  "git",
  "jira",
  "github",
  "gitlab",
  "visualstudiocode",
  "androidstudio",
  "sonarqube",
  "figma",
];


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

export default async function FonctionnalitySection() {
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
    <section
      className="relative px-6 flex flex-col items-center max-md:gap-16 gap-10 py-[6.25rem]"
      id="fonctionnality"
    >
      <div className="mx-auto w-full max-w-[1436px] flex flex-wrap items-center justify-between gap-x-8">
        <div className="max-w-lg">
          <h3 className=" text-2xl sm:text-4xl text-gray-50 font-semibold">
            Suis ta progression.
          </h3>
          <p className="mt-3 lg:text-lg text-gray-300 lg:leading-8">
            Suivez votre avancé dans les cours avec nos fonctionnalités de suivi de progression.
          </p>
        </div>
        <div className="w-full max-w-xl aspect-video bg-gray-950 border border-gray-800 mt-6 rounded-xl">
          <div className="w-full h-full" />
        </div>
      </div>
      <div className="mx-auto w-full max-w-[1436px] flex lg:flex-row-reverse flex-wrap items-center justify-between gap-x-8">
        <div className="max-w-lg">
          <h3 className=" text-2xl sm:text-4xl text-gray-50 font-semibold">
            Pratique avec des maquettes.
          </h3>
          <p className="mt-3 lg:text-lg text-gray-300 lg:leading-8">
            Apprends en pratiquant grâce à des exercices de reproduction avec maquettes Figma.   
          </p>
        </div>

        <div className="w-full max-w-xl aspect-video bg-gray-950 border border-gray-800 mt-6 rounded-xl">
          <div className="w-full h-full" />
        </div>
      </div>
      <div className="mx-auto w-full max-w-[1436px] flex flex-wrap items-center justify-between gap-x-8">
        <div className="max-w-lg">
          <h3 className=" text-2xl sm:text-4xl text-gray-50 font-semibold">
            Le même objectif.
          </h3>
          <p className="mt-3 lg:text-lg text-gray-300 lg:leading-8">
            Entoure toi de personnes qui ont la même passion que toi et grandis dans un environnement 
            propice à l'évolution en rejoignant le discord privé.
          </p>
        </div>
        <div className="w-full max-w-xl aspect-video bg-gray-950 border border-gray-800 mt-6 rounded-xl">
          <div className="w-full h-full" />
        </div>
      </div>
    </section>
  );
}