import Image from "next/image";
import { FeatureCard8 } from "../magicui/animated-card-8";

export default async function FonctionnalitySection() {

  return (
    <section
      className="relative px-6 lg:px-20 flex flex-col items-center max-md:gap-16 gap-10 pt-[6.25rem] pb-[12.5rem]"
      id="fonctionnality"
    >
      <div className="mx-auto w-full max-w-[1436px] flex flex-wrap items-center justify-between gap-x-8">
        <div className="max-w-lg">
          <h3 className=" text-2xl sm:text-4xl text-gray-50 font-semibold">
            Suis ta progression.
          </h3>
          <p className="mt-3 lg:text-lg text-gray-300 lg:leading-8">
            Suis ton avancé dans les cours avec nos fonctionnalités de suivi de progression.
          </p>
        </div>
        <div className="w-full max-w-xl aspect-video mt-6 rounded-xl">
          <Image src="/img/progress_screen.png" alt="progression" width={0} height={0} sizes="100vw" className="w-full h-full" />
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

        <div className="relative w-full max-w-xl aspect-video mt-6 rounded-xl">
          <Image src="/img/maquette_screen.png" alt="progression" width={0} height={0} sizes="100vw" className="w-full h-full" />
          <Image src="/img/cursor.png" alt="progression" width={0} height={0} sizes="100vw" className="w-32 h-auto absolute right-28 bottom-20 animate-moveX delay-1000" />
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
        <div className="w-full max-w-xl aspect-video mt-6">
          <FeatureCard8  />
        </div>
      </div>
    </section>
  );
}