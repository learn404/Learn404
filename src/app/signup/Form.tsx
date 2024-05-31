"use client";

import { FormEvent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { EyeIcon, EyeOff } from "lucide-react";
import Link from "next/link";

interface FormData {
  name: string;
  firstname: string;
  email: string;
  password: string;
}

async function submitForm(data: FormData) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const data = await response.json();
    const token = data.token;

    localStorage.setItem("token", token);
    toast.success(data.message);

    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  } else {
    const data = await response.json();
    toast.error(data.message);
  }
}

export default function Form() {
  const [name, setName] = useState<FormData["name"]>("");
  const [firstname, setFirstname] = useState<FormData["firstname"]>("");
  const [email, setEmail] = useState<FormData["email"]>("");
  const [password, setPassword] = useState<FormData["password"]>("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const validatePassword = (password: string) => {
    return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(password);
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !firstname || !email || !password) {
      toast.error("Remplis tous les champs");
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
    if (password.length < 8) {
      toast.error("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }
    if (!validateEmail(email)) {
      toast.error("L'adresse email n'est pas valide");
      return;
    }
    if (!validatePassword(password)) {
      toast.error(
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial",
      );
      return;
    }

    submitForm({ name, firstname, email, password });
  };

  return (
    <>
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
          <div className="flex-col flex">
            <label className="font-medium mb-1">Mot de passe</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 w-full"
                placeholder="Entre ton mot de passe"
              />
              {showPassword ? (
                <div
                  className="absolute right-3 top-2 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  <EyeIcon />
                </div>
              ) : (
                <div
                  className="absolute right-3 top-2 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  <EyeOff />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-10 w-full">
          <PrimaryButton>Rejoins l'équipe</PrimaryButton>
        </div>
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
        <p className="text-center font-medium">
          Tu as déjà un compte ?{" "}
          <Link href="/login" className="text-indigo-800">
            Connectes toi
          </Link>
        </p>
      </form>
    </>
  );
}