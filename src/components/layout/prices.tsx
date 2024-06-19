import { Check } from "lucide-react";
import PrimaryButton from "../buttons/PrimaryButton";

export default function PricesSection() {
  return (
    <div
      className="w-full flex items-center justify-center py-24 px-4 text-torea-50 relative"
      id="prices"
    >
      <div className="mx-auto p-10 md:p-14 rounded-3xl shadow-pricing-shadow z-50">
        <div className="max-w-md flex flex-col gap-6">
          <h2 className=" text-3xl md:text-5xl font-bold ">
            Deviens développeur web
          </h2>
          <div className="flex flex-col gap-6">
            <p>
              Unlock the power of data with our cutting-edge analytics product.
              Get instant insights with our{" "}
            </p>
            <div>
              <span className="text-5xl font-semibold mr-2">5€</span>
              <span className=" text-gray-400 ">paiement unique</span>
            </div>
            <div className="w-full h-[1px] bg-red-500 lineLinear my-4"></div>
            <div className="flex flex-col gap-4">
              <span className="inline-flex gap-2">
                <Check /> Accès à l'ensemble des challenges
              </span>
              <span className="inline-flex gap-2">
                <Check /> Accès aux maquettes Figma
              </span>
              <span className="inline-flex gap-2">
                <Check /> Accès aux corrections
              </span>
              <span className="inline-flex gap-2">
                <Check /> Accès au discord privé
              </span>
              <span className="inline-flex gap-2">
                <Check /> Accès à toutes les nouveautés
              </span>
              <span className="inline-flex gap-2">
                <Check /> Soutenir le projet
              </span>
            </div>
            <PrimaryButton redirectTo="/join">
              Acheter la formation
            </PrimaryButton>
          </div>
        </div>
      </div>

      <img
        className="absolute left-0 top-0 select-none w-[40rem] h-auto"
        src="/img/LightsLeft 2.webp"
        alt="background"
      />
      <img
        className="absolute right-0 top-0 select-none w-[40rem] h-auto"
        src="/img/LightsRight 2.webp"
        alt="background"
      />
      {/* <div className="pointer-events-none absolute w-full bottom-0 right-0 h-20 bg-gradient-to-t from-[#02030C]"></div> */}
    </div>
  );
}
