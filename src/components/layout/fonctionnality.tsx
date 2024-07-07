import IconCloud from "@/components/magicui/icon-cloud";
import { getLessonNumber, getLessonType } from "@/lib/utils";
import { Code, CodeXml, LineChart, ListVideo, StickyNote } from "lucide-react";
import Image from "next/image";
import NumberTicker from "../magicui/number-ticker";

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

export default async function FonctionnalitySection() {
  const lessonNumber = await getLessonNumber();
  const lessonType = await getLessonType();

  return (
    <div
      className="relative flex flex-col items-center justify-center w-full gap-10 py-[6.25rem] px-4"
      id="fonctionnality"
    >
      <div className=" flex flex-col items-center justify-center  gap-6 text-center max-w-md pointer-events-none z-50">
        <h2 className=" text-5xl font-semibold titleStyle">Fonctionnalités</h2>
        <p className="text-lg text-torea-50">
          Tu craqueras peut-être devant le panel de fonctionnalités à
          disposition dans la formation.
        </p>
      </div>

      <div className="max-w-6xl flex flex-col gap-5 z-50">
        <div className="flex gap-6 flex-wrap">
          <div className="flex flex-col items-start justify-between flex-1 gap-8 border rounded-[1.25rem] border-[#2E3038] p-10 cardLinear min-w-80">
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-center w-10 h-10 rounded-md bg-[#6128DF] shadow-xl shadow-[#6128DF]/50">
                <LineChart />
              </div>
              <h3 className="text-3xl font-medium">Analytics Dashboard</h3>
              <p>
                Our Analytics Dashboard provides a clear and intuitive interface
                for you to easily analyze your data. From customizable graphs to
                real-time data updates, our dashboard offers everything you need
                to gain valuable insights.
              </p>
            </div>
            <span className="underline text-torea-200 cursor-pointer after:content-['_↗']">
              View dashboard
            </span>
          </div>

          <div className=" flex flex-col items-start justify-between flex-1 gap-8 border rounded-[1.25rem] border-[#2E3038] p-10 cardLinear min-w-80">
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-center w-10 h-10 rounded-md bg-[#9C32CC] shadow-xl shadow-[#9C32CC]/50">
                <ListVideo />
              </div>
              <h3 className="text-3xl font-medium">Formats des cours</h3>
              <p>
                Chaque cours est disponible en format vidéo mais vous avez aussi
                la possibilité d'accéder rapidement à n'importe quelle
                information du cours grâce à leur partie écrite !
              </p>
            </div>
            <span className=" underline text-torea-200 cursor-pointer after:content-['_↗']">
              View tokens
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between flex-wrap border rounded-[1.25rem] border-[#2E3038] p-10 cardLinear min-w-80">
          <div className="flex flex-col items-start justify-between gap-8 lg:max-w-md">
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-center w-10 h-10 rounded-md bg-[#CB2CAE] shadow-xl shadow-[#CB2CAE]/50">
                <CodeXml />
              </div>
              <h3 className="text-3xl font-medium">Code collaboration</h3>
              <p>
                Our advanced code synchronization technology ensures that your
                data is always up-to-date and accurate, no matter where it's
                coming from. Whether you're integrating data from multiple
                sources or working with a team of developers, our
                synchronization technology makes it easy to collaborate and
                ensure that your data is consistent and reliable.
              </p>
            </div>
            <span className=" underline text-torea-200 cursor-pointer after:content-['_↗']">
              View code collaboration
            </span>
          </div>
          <div className="max-w-2xl">
            <Image
              src="/img/Card_img.webp"
              alt="code image"
              className="hidden lg:block w-full h-auto"
              width="0"
              height="0"
              sizes="100vw"
            />
          </div>
        </div>
        <div className="flex gap-6 flex-wrap ">
          <div className="relative flex-none flex-wrap border rounded-[1.25rem] border-[#2E3038] p-10 cardLinear  h-full w-full  items- cardLinear  overflow-hidden  bg-background  pb-20 pt-8  ">
            <IconCloud iconSlugs={slugs} />
            <div className="flex items-center justify-center w-10 h-10 rounded-md bg-[#6128DF] shadow-xl shadow-[#6128DF]/50">
              <Code />
            </div>
            <div className="mt-5">
              <h3 className="text-3xl font-medium">
                Explore de nouvelles technologies
              </h3>
              <p className="mt-5">
                Avec le formation Learn404, vous aurez l'occasion de découvrir
                de nouvelles technologies et de les mettre en pratique dans des
                projets concrets.
              </p>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-between flex-wrap border rounded-[1.25rem] border-[#2E3038] p-10 cardLinear">
            <div className="flex flex-col gap-5 py-4">
              <div className="flex items-center gap-5">
                <NumberTicker value={lessonNumber} />
                <div className="flex items-center text-2xl gap-2">
                  <span className="font-medium">Leçons</span>
                  <StickyNote />
                </div>
              </div>
              <div className="text-lg">
                Il y a {lessonNumber} leçons dans la formation qui traitent de
                différents sujets pour vous aider à devenir un meilleur
                développeur. Chaque leçon est soigneusement conçue pour
                maximiser votre apprentissage avec des exemples pratiques, des
                exercices interactifs.
              </div>
            </div>
            <div className="flex flex-col gap-5 py-4">
              <div className="flex items-center gap-5">
                <NumberTicker value={lessonType} />
                <div className="flex items-center text-2xl gap-2">
                  <span className="font-medium">Catégories</span>
                  <StickyNote />
                </div>
              </div>
              <div className="text-lg">
                Les leçons sont réparties en {lessonType} catégories pour vous
                aider à trouver rapidement ce que vous cherchez. Chaque
                catégorie est conçue pour vous aider à apprendre un sujet
                spécifique.
              </div>
            </div>
            <div className="flex flex-col gap-5 py-4">
              <div className="flex items-center gap-5">
                <NumberTicker value={99} />
                <div className="flex items-center text-2xl gap-2">
                  <span className="font-medium">Heures de cours</span>
                  <StickyNote />
                </div>
              </div>
              <div className="text-lg">
                Il y a un total de 99 heures de cours disponibles, vous offrant
                une expérience d'apprentissage complète et approfondie. Ces
                heures de cours sont conçues pour vous progresser rapidement.
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Particles
        className="absolute inset-0"
        quantity={20}
        ease={20}
        color="#ffffff"
        refresh
      /> */}
    </div>
  );
}
