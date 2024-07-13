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

if (!session){
  redirect("/wishlist");
}

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
      <main className="flex flex-col-reverse justify-center items-start lg:flex-row lg:items-center px-12 lg:px-20 py-16 relative z-50 ">
        <div>
          <Image
            src="/img/Card_img.webp"
            alt="card"
            width={750}
            height={750}
            className="-ml-6 min-w-80 lg:ml-0"
          />
        </div>

        <div className="flex flex-col items-start max-w-80 lg:max-w-md">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium">
            <span className="text-torea-300">Sign in</span> or{" "}
            <span className="text-torea-300">Sign up</span> to continue
          </h2>
          <div className="flex items-center justify-center gap-3 mt-5 lg:mt-8">
            <LoginGoogleButton />
            <LoginGithubButton />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
