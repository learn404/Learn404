import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import SignupForm from "./Form";

export default function Signup() {
  return (
    <div className="">
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
            Rejoins la Waitlist
          </h1>
          <p className="text-center text-gray-300 p-2">
            Remplis le formulaire ci-dessous pour t'inscrire à la waitlist
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="327"
            height="3"
            viewBox="0 0 327 3"
            fill="none"
            className="my-4"
          >
            <path
              d="M1.49689 0.5C0.944611 0.5 0.496887 0.947715 0.496887 1.5C0.496887 2.05228 0.944611 2.5 1.49689 2.5V0.5ZM326.503 0.5L1.49689 0.5V2.5L326.503 2.5V0.5Z"
              fill="url(#paint0_linear_3232_81)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_3232_81"
                x1="337.481"
                y1="79.1317"
                x2="345.557"
                y2="18.0362"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#ECECEC" />
                <stop offset="1" stopColor="#ECECEC" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
          <SignupForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
