import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Form from "./Form";
import { LoginButton } from "@/components/buttons/auth/loginButton";

export default async function Signup() {
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
          className="absolute left-0 top-[10rem] select-none w-96 h-auto"
          src="/img/LightsLeft 2.webp"
          alt="background"
        />
        <img
          className="absolute right-0 top-[10rem] select-none w-96 h-auto"
          src="/img/LightsRight 2.webp"
          alt="background"
        />
      </div>
      <main className="flex justify-center items-center p-5 relative z-50">
        <div className="bg-black bg-opacity-20 rounded-lg border border-gray-100 p-5 md:p-16 mt-0 md:mt-5 backdrop-blur-xl shadow-custom-shadow">
          <h1 className="font-bold text-4xl md:text-5xl text-center">
            Rejoins la formation
          </h1>
          <p className="text-center text-gray-300 p-2">
            Remplis le formulaire ci-dessous pour t'inscrire à la formation
          </p>
          <Form />
          <LoginButton />
        </div>
      </main>
      <Footer />
    </div>
  );
}
