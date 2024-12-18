import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type FooterLink = { id: number; title: string; url: string };

const footerLinks: FooterLink[][] = [
  [
    { id: 1, title: "Condition d'utilisation", url: "/legal/condition-general-utilisation" },
    { id: 2, title: "Mentions légales", url: "mentions-legales" },
    { id: 3, title: "Journal des modifications", url: "/changelog" }, 
    { id: 4, title: "Contact", url: "mailto:contact@learn404.com" },
  ],
];
export default function Footer() {
  return (
    <footer className="px-6 lg:px-20">
      <div className="mx-auto w-full max-w-[1436px]">
        <div className="border-b border-dashed border-slate-400/20 py-10">
          <div className="flex flex-col items-center justify-center gap-y-3 lg:flex-row lg:items-center lg:justify-between">
            <h3 className="max-w-sm text-balance text-center text-2xl font-bold text-white md:text-start md:text-4xl">
              Tu as encore des questions ?
            </h3>
            <div className="flex flex-col items-center justify-center gap-x-5 gap-y-2 py-4 sm:flex-row">
              <Link
                href="https://discord.gg/VQvwt7amg2"
                className="flex h-10 w-56 items-center justify-center rounded-full text-base font-semibold transition ease-out hover:ring-2  hover:ring-offset-2 bg-indigo-800 text-white hover:ring-indigo-900 hover:ring-offset-black lg:h-12 lg:text-base"
              >
                <span className="tracking-tight">Rejoins le discord</span>
                <ChevronRightIcon className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col py-10 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col items-start justify-start gap-y-5">
            <Link href="/" className="flex items-center gap-x-2.5">
              <Image
                className="h-8 w-8 rounded-md"
                src="/img/logo.png"
                alt=""
                width={250}
                height={250}
              />
              <h1 className="text-xl font-bold text-white">Learn404</h1>
            </Link>
            <p className="tracking-tight text-white">
              La plateforme des développeurs pour apprendre et partager leurs
              connaissances.
            </p>
            <p className="text-sm tracking-tight text-white/50 sm:text-center">
              Tous droits réservés © {new Date().getFullYear()} Learn404{" "}
            </p>
          </div>
          <div className="pt-5 md:w-1/2">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-x-3 gap-y-2 md:gap-y-0 px-0 lg:px-10">
              {footerLinks.map((column, columnIndex) => (
                <ul key={columnIndex} className="flex flex-col gap-y-2">
                  {column.map((link) => (
                    <li
                      key={`flink:${link.id}`}
                      className="group inline-flex cursor-pointer items-center justify-start gap-1 text-[15px]/snug font-medium  duration-200 text-white/50 hover:text-white/30"
                    >
                      <Link href={link.url}>{link.title}</Link>
                      <ChevronRightIcon className="h-4 w-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100" />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
