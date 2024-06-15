import {
  LoginGithubButton,
  LoginGoogleButton,
} from "@/components/buttons/auth/AuthButton";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function Join() {
  const session = await auth();
  console.log(session);

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
      <main className="lg:flex justify-center items-center p-5 py-15 relative z-50 ">
        <div>
          <Image
            src="/img/Card_img.png"
            alt="card"
            width={750}
            height={750}
            className=""
          />
        </div>

        <div className="flex flex-col items-start max-w-md mx-auto">
          <h2 className="text-5xl font-medium">
            <span className="text-torea-300">Sign in</span> or{" "}
            <span className="text-torea-300">Sign up</span> to continue
          </h2>
          <div className="flex items-center justify-center gap-3 mt-8">
            <LoginGoogleButton />
            <LoginGithubButton />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
