"use client";

import { Check } from "lucide-react";
import { memo } from "react";
import PrimaryButton from "../buttons/PrimaryButton";

interface PricingOption {
  name: string;
  price: string;
  description: string;
  features: string[];
  extraBenefits?: string;
}

interface PricingCardProps {
  option: PricingOption;
}

const PricingCard = memo(({ option }: PricingCardProps) => (
  <div
    id="prices"
    className="grid h-full w-full grid-cols-1 rounded-xl border border-neutral-700/50 lg:grid-cols-5"
  >
    <div className="col-span-2 flex flex-col justify-between gap-y-10 rounded-t-xl p-5 cardLinear lg:rounded-t-none lg:rounded-bl-xl lg:rounded-tl-xl">
      <div className="flex flex-col gap-y-2">
        <p className="text-2xl font-semibold text-white">{option.name}</p>
        <p className="mx-0 max-w-md font-medium tracking-tight text-gray-400">
          {option.description}
        </p>
      </div>
      <div className="flex flex-col gap-y-2">
        <h3 className="text-sm font-medium text-white">
          <span className="text-3xl font-[620] text-white">
            {option.price}
            <span className="text-sm font-medium text-gray-400 ml-2">à vie</span>
          </span>
        </h3>
        {/* <Link
          href="/join"
          className="group my-2 flex h-10 w-full items-center justify-center rounded-lg border border-white/10  text-base font-bold  transition duration-100 hover:shadow-md hover:drop-shadow-md bg-indigo-800 text-white"
        >
          <span className="tracking-tight">Je suis prêt !</span>
          <ArrowRightIcon className="ml-2 h-4 w-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100" />
        </Link> */}
        <PrimaryButton redirectTo="/join" type="button">
          Je suis prêt !
        </PrimaryButton>

      </div>
    </div>
    <div className="col-span-3 flex flex-col justify-center gap-y-5 p-5 lg:pl-10">
      {option.extraBenefits && (
        <p className="text-[15px] font-medium text-gray-400">
          {option.extraBenefits}
        </p>
      )}
      {option.features.map((feature, index) => (
        <div key={index} className="flex gap-x-3">
          <div className="flex items-center justify-center">
            <Check className="h-6 w-6 text-green-500" />
          </div>
          <p className="font-medium text-gray-50">{feature}</p>
        </div>
      ))}
    </div>
  </div>
));

export default function Pricing() {
  const pricingOptions: PricingOption[] = [
    {
      name: "Offre",
      price: "19,99€",

      description:
        "Tu veux devenir un développeur web professionnel ? C'est le bon endroit pour commencer.",
      features: [
        "Salons discord privés",
        "+10h de cours vidéos et écrits",
        "Exercices pratiques",
        "Suivi de progression",
        "Paiement en 1 fois",
        "Accès à vie",
      ],
      extraBenefits: "Abonnement à vie avec fonctionnalités futures.",
    },
  ];

  return (
    <section className="mx-auto max-w-5xl max-lg:pt-[6.25rem] pb-[12.5rem] px-6">
      <div className="flex flex-col gap-y-2">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-gray-50 text-3xl sm:text-4xl font-semibold">
            Rejoins Learn404 maintenant.
          </h2>

          <p className="mt-6 text-lg text-gray-400">
            Accède à la plateforme <span className="uppercase text-gray-50 font-medium">à vie</span>
          </p>
        </div>

        <div className="mx-auto grid h-full w-full max-w-4xl place-content-center items-center gap-6 my-6 lg:items-start">
          {pricingOptions.map((option, index) => (
            <PricingCard key={index} option={option} />
          ))}
        </div>
      </div>
    </section>
  );
}
