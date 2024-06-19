import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import AnimatedShinyText from "../magicui/animated-shiny-text";
import SeparateAway from "../magicui/separate-away";
import RetroGrid from "../magicui/retro-grid";

export default function HeroSection() {
  return (
    <div className="mx-auto pt-16 px-4 max-w-[60rem] flex items-center justify-center flex-col gap-20 text-center">
      <div className="flex flex-col items-center justify-center gap-7">
        <div className="z-10 flex relative items-center justify-center">
          <div
            className={cn(
              "group rounded-full border text-base text-white bg-indigo-800 transition-all ease-in hover:cursor-pointer border-white/5 hover:bg-indigo-900 ",
            )}
          >
            <AnimatedShinyText className="inline-flex items-center text-white/70 justify-center px-4 py-1 transition ease-out hover:duration-300 hover:text-white">
              <span>✨ La bibliothèque du développeur</span>
              <ArrowRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </AnimatedShinyText>
          </div>
        </div>
        <RetroGrid />
        <div className="flex flex-col items-center justify-center gap-6">
          <SeparateAway
            upper_text="La banque de ressources"
            lower_text="qu'il te manque"
            duration={1.5}
            hidden_opacity={0}
            visible_opacity={1}
            className="font-display text-center text-4xl font-bold tracking-[-0.02em] text-white md:text-7xl md:leading-[5rem] titleStyle "
          />
          <span className="text-torea-50">
            Améliore tes compétences en pratiquant !
          </span>
        </div>
        <div className="flex items-center justify-center gap-4">
          <PrimaryButton redirectTo="/join" type="button">
            <span className="md:block font-medium">Rejoindre l'aventure</span>
          </PrimaryButton>
          <SecondaryButton redirectTo="/" type="button">
            <span className="md:block font-medium">
              Besoin d'en savoir plus ?
            </span>
          </SecondaryButton>
        </div>
      </div>

      <div>
        <div className="relative w-screen flex justify-center">
          <img src="/img/Hero_img.jpg" alt="logo" />
          <div className="pointer-events-none absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#02030C] "></div>
        </div>
      </div>
    </div>
  );
}
