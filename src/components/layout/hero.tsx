import Image from "next/image";
import PrimaryButton from "../buttons/PrimaryButton";

export default function HeroSection() {
  return (
    <div className="px-6 pb-8 pt-10 sm:pb-16 lg:flex lg:px-20 lg:py-32">
      <div className="mx-auto max-w-[1436px] w-full lg:flex">
        <div className="mx-auto max-w-3xl md:flex-shrink-0 mt-16">
          <div>
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-50" >
              Apprends le développement web
            </h1>
            <p className="mt-4 text-base sm:text-xl font-medium text-gray-300">
              Rejoins le programme Learn404 et commence l'aventure pour devenir développeur web.  
            </p>
          </div>
          <div className="mt-8">
            <PrimaryButton redirectTo="/join" type="button">
              <Image src="/img/Logo_icon_blanc.svg" alt="logo icon" width={20} height={20} sizes="10vw" />
              <span className="font-medium">Rejoindre Learn404</span>
            </PrimaryButton>
          </div>
        </div>
        <div className="relative mx-auto mt-16 flex max-w-3xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none rounded-xl border border-gray-800 bg-gray-950">
            <Image src="/img/Hero_img.webp" alt="App screenshot" width="882" height="1200" className="w-[76rem] rounded-md shadow-2xl border:1px solid rgba(255,255,255,.1)" />
          </div>
          <div className="hidden lg:block absolute -bottom-16 -left-52 w-44">
            <Image src="/img/arrow.svg" alt="wave" width={0} height={0} sizes="20vw" className="w-full h-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}
