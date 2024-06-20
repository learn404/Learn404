"use client";

import { ArrowRightIcon, CheckCircledIcon } from "@radix-ui/react-icons";
import { memo, useState } from "react";

interface PricingOption {
  name: string;
  price: string;
  lifePrince: string;
  description: string;
  features: string[];
  featuresLife?: string[];
  extraBenefits?: string;
}

interface PricingToggleProps {
  enabled: boolean;
  setEnabled: (e: boolean) => void;
  color?: string;
}

interface PricingCardProps {
  option: PricingOption;
  enabled: boolean;
}

const PricingToggle = memo(
  ({ enabled, setEnabled, color }: PricingToggleProps) => (
    <div className="flex items-center">
      <span
        className={`mr-2 font-bold ${enabled ? "text-neutral-500/60" : ""}`}
      >
        Mois
      </span>
      <label className="inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => setEnabled(e.target.checked)}
          className="sr-only"
        />
        <div
          className={`inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            enabled ? `${color}` : "bg-neutral-400"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              enabled ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </div>
      </label>
      <span
        className={`ml-2 font-bold ${enabled ? "" : "text-neutral-500/60"}`}
      >
        A vie
      </span>
    </div>
  ),
);

const PricingCard = memo(({ option, enabled }: PricingCardProps) => (
  <div
    id="prices"
    className="grid h-full w-full grid-cols-1 rounded-xl border border-neutral-700/50 lg:grid-cols-5"
  >
    <div className="col-span-2 flex flex-col justify-between gap-y-10 rounded-t-xl p-5 cardLinear lg:rounded-t-none lg:rounded-bl-xl lg:rounded-tl-xl">
      <div className="flex flex-col gap-y-2">
        <p className="text-2xl font-semibold text-white">{option.name}</p>
        <p className="mx-0 max-w-md font-medium tracking-tight text-neutral-400">
          {option.description}
        </p>
      </div>
      <div className="flex flex-col gap-y-2">
        <h3 className="text-sm font-medium text-white">
          <span className="text-3xl font-[620] text-white">
            {enabled ? option.lifePrince : option.price}
            <span className="text-sm font-medium text-neutral-400">
              {enabled ? "/à vie" : "/par mois"}
            </span>
          </span>
        </h3>
        <button className="group my-2 flex h-10 w-full items-center justify-center rounded-lg border border-white/10  text-base font-bold  transition duration-100 hover:shadow-md hover:drop-shadow-md bg-indigo-800 text-white">
          <span className="tracking-tight">Choisis ton offre</span>
          <ArrowRightIcon className="ml-2 h-4 w-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100" />
        </button>
      </div>
    </div>
    <div className="col-span-3 flex flex-col justify-center gap-y-5 p-5 lg:pl-10">
      {option.extraBenefits && (
        <p className="text-[15px] font-medium text-neutral-500">
          {option.extraBenefits}
        </p>
      )}
      {option.features.map((feature, index) => (
        <div key={index} className="flex gap-x-3">
          <div className="flex items-center justify-center">
            <CheckCircledIcon className="h-6 w-6 text-green-500" />
          </div>
          <p className="font-medium text-white">{feature}</p>
        </div>
      ))}
      {enabled &&
        option.featuresLife &&
        option.featuresLife.map((feature, index) => (
          <div key={index} className="flex gap-x-3">
            <div className="flex items-center justify-center">
              <CheckCircledIcon className="h-6 w-6 text-green-500" />
            </div>
            <p className="font-medium text-white">{feature}</p>
          </div>
        ))}
    </div>
  </div>
));

export default function Pricing() {
  const [enabled, setEnabled] = useState(false);
  const pricingOptions: PricingOption[] = [
    {
      name: "Abonnement",
      price: "2.99€",
      lifePrince: "20€",
      description:
        "Tu veux devenir un développeur web professionnel ? C'est le bon endroit pour commencer.",
      features: [
        "Accès à tous les cours",
        "Accès aux maquettes Figma",

        "Accès à toutes les nouveautés",
        "Soutenir le projet",
      ],
      extraBenefits: "Abonnement à vie rentable en 6 mois",
      featuresLife: ["Accès au discord privé"],
    },
  ];

  return (
    <section className="mx-auto max-w-5xl py-10">
      <div className="flex flex-col gap-y-2">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-5xl font-bold tracking-tight text-white sm:text-6xl titleStyle">
            Des prix simples pour tout le monde.
          </h2>

          <p className="mt-6 text-xl leading-8 text-white">
            Choisissez un <strong>plan abordable</strong> qui regorge des
            meilleures fonctionnalités pour engager votre public, créer la
            fidélité des clients et augmenter les ventes.
          </p>
        </div>
        <div className="mt-5 flex justify-center">
          <PricingToggle
            enabled={enabled}
            setEnabled={setEnabled}
            color="bg-green-500"
          />
        </div>
        <div className="mx-auto grid h-full w-full max-w-4xl place-content-center items-center gap-6 px-10 py-8 lg:items-start">
          {pricingOptions.map((option, index) => (
            <PricingCard key={index} option={option} enabled={enabled} />
          ))}
        </div>
      </div>
    </section>
  );
}
