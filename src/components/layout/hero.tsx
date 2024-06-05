import { Sparkles } from "lucide-react";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";

export default function HeroSection() {
  return (
    <div className="mx-auto pt-16 px-4 max-w-[60rem] flex items-center justify-center flex-col gap-20 text-center">
      <div className="flex flex-col items-center justify-center gap-7">
        <div className="flex items-center gap-3 py-1 px-4 border-2 border-torea-800 bg-torea-950 rounded-full">
          <span className="text-xs text-torea-100">
            Une bibliothèque grandissante !
          </span>
          {/* <TrendingUp width={16} color="#e6db5b"/> */}
          <Sparkles width={16} color="#e6db5b" />
        </div>
        <div className="flex flex-col items-center justify-center gap-6">
          <h1 className="inline-block font-semibold text-5xl lg:text-7xl font- text-center titleStyle">
            La banque de ressources qu'il te manque
          </h1>
          <span className="text-torea-50">
            Améliore tes compétences en pratiquant !
          </span>
        </div>
        <div className="flex items-center justify-center gap-4">
          <PrimaryButton redirectTo="/waitlist" type="button">
            <span className="md:block font-medium">
              Rejoindre l'aventure
            </span>
          </PrimaryButton>
          <SecondaryButton redirectTo="/" type="button">
            <span className="md:block font-medium">
              Besoin d'en savoir plus ?
            </span>
          </SecondaryButton>
        </div>
      </div>

      <div>
        <img src="/img/Hero_img.jpg" alt="logo" />
      </div>
    </div>
  );
}
