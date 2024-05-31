"use client";

import { FormEvent } from "react";
import { useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import PrimaryButton from "@/components/buttons/PrimaryButton";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormData {
  name: string;
  firstname: string;
  email: string;
}

async function submitForm(data: FormData) {
  // console.log(data);
  const response = await fetch("api/auth/waitlist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const data = await response.json();
    toast.success(data.message);
    setTimeout(() => {
      window.location.href = "/";
    }, 5000);
  } else {
    const data = await response.json();
    toast.error(data.message);
  }
}

export default function Signup() {
  const [name, setName] = useState<FormData["name"]>("");
  const [firstname, setFirstname] = useState<FormData["firstname"]>("");
  const [email, setEmail] = useState<FormData["email"]>("");

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !firstname || !email) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    if (name.length < 3) {
      toast.error("Le nom doit contenir au moins 3 caractères");
      return;
    }
    if (firstname.length < 2) {
      toast.error("Le prénom doit contenir au moins 2 caractères");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("L'adresse email n'est pas valide");
      return;
    }

    submitForm({ name, firstname, email });
  };

  return (
    <div className="">
      <Header />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={true}
        theme="light"
      />
      <div className="relative">
        <img
          className="absolute left-0 top-[10rem] select-none w-96 h-auto "
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
        <div className="bg-black bg-opacity-20 rounded-lg border border-gray-100 p-5 md:p-16  mt-0 md:mt-5 backdrop-blur-xl shadow-custom-shadow">
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
          <form className="p-4" onSubmit={handleFormSubmit}>
            <div className="flex flex-col md:flex-row w-full gap-4">
              <div className="flex flex-col text-left md:w-1/2">
                <label className="font-medium mb-1">Nom</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  placeholder="Entre ton nom de famille"
                />
              </div>
              <div className="flex flex-col text-left md:w-1/2">
                <label className="font-medium mb-1">Prénom</label>
                <input
                  type="text"
                  name="firstname"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  placeholder="Entre ton prénom"
                />
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-4">
              <div className="flex-col flex">
                <label className="font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  placeholder="Entre ton email"
                />
              </div>
            </div>
            <div className="flex justify-center mt-10 w-full">
              <PrimaryButton>Rejoins l'équipe</PrimaryButton>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
