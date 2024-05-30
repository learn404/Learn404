import { Camera, SquareUser } from "lucide-react";
import Image from "next/image";
import PrimaryButton from "@/components/buttons/PrimaryButton";

export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <div className="relative overflow-hidden py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl lg:max-w-lg">
            <div className="flex items-center gap-5">
              <Image
                src="/img/logo.png"
                alt="Learn 404"
                width={50}
                height={50}
              />
              <h2 className="md:text-3xl font-bold tracking-tight text-white text-4xl">
                Learn 404
              </h2>
            </div>
            <p className="mt-4 text-lg leading-8 text-gray-300">
              Inscris-toi à notre newsletter pour recevoir des outils et des
              astuces pour devenir un meilleur développeur.
            </p>
            <div className="mt-6 flex max-w-md gap-x-4">
              <label htmlFor="email-address" className="sr-only">
                Adresse email
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"

                placeholder="Entre ton adresse email"
              />

              <PrimaryButton>Je m'inscris</PrimaryButton>
            </div>
            <p className="text-gray-400 text-sm mt-5">
              © {year} Learn404. Tous droits réservés.
            </p>
          </div>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">

                <Camera className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <dt className="mt-4 font-semibold text-white">Réseaux Sociaux</dt>
              <dd className="mt-2 leading-7 text-gray-400">
                Retrouve-nous sur les réseaux sociaux pour suivre nos dernières
                actualités et nos derniers articles.
              </dd>
              <ul>
                <li className="mt-2 leading-7 text-gray-400">
                  <a
                    href="#"
                    className="hover:text-white/80 transition-colors duration-200"
                  >
                    Twitter
                  </a>
                </li>
                <li className="mt-2 leading-7 text-gray-400">
                  <a
                    href="#"
                    className="hover:text-white/80 transition-colors duration-200"
                  >
                    Github
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <SquareUser className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <dt className="mt-4 font-semibold text-white">Contact</dt>
              <dd className="mt-2 leading-7 text-gray-400">
                Tu peux nous contacter en cas de problème ou pour toute autre
                question à l'adresse suivante : <br />
                <span className="italic underline">learn404.dev@gmail.com</span>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
