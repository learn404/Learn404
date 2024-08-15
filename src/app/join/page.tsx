import {
  LoginGithubButton,
  LoginGoogleButton,
} from "@/components/buttons/auth/AuthButton";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { auth } from "@/lib/auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Join() {

  const session = await auth();
  
  if (session) {
    redirect("/dashboard");
  }

  return (
    <div>
      <Header />
      <div className="relative">
        <img
          className="absolute left-0 top-[5rem] select-none w-96 h-auto"
          src="/img/LightsLeft 2.webp"
          alt="background"
        />
        <img
          className="absolute right-0 top-[5rem] select-none w-96 h-auto"
          src="/img/LightsRight 2.webp"
          alt="background"
        />
      </div>
      <main className="flex flex-col-reverse justify-center items-center gap-8 lg:flex-row lg:items-center px-6 lg:px-20 py-16 relative z-50 overflow-x-hidden ">
        <div>
          <Image
            src="/img/hero.png"
            alt="card"
            width={750}
            height={750}
            className="min-w-80 lg:ml-0 rounded-xl"
          />
        </div>

        <div className="flex flex-col items-center lg:items-start gap-y-5 lg:gap-y-8 max-w-md max-lg:text-center lg:max-w-md">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium">
            <span className="text-torea-300">
              Connecte-toi
              </span> ou{" "}
            <span className="text-torea-300">Crée un compte</span> pour continuer
          </h2>
          <div className="flex items-center justify-center gap-3">
            <LoginGoogleButton />
            <LoginGithubButton />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
