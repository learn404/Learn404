"use client";

import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import PrimaryButton from "@/components/buttons/PrimaryButton";

interface FormData {
  name: string;
  firstname: string;
  email: string;
}

async function submitForm(data: FormData) {
  console.log(data);
  const response = await fetch("/api/auth/waitlist", {
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

export default function SignupForm() {
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

    if (firstname.length < 2) {
      toast.error("Le prénom doit contenir au moins 2 caractères");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("L'adresse email n'est pas valide");
      return;
    }

    console.log("submitting form");

    submitForm({ name, firstname, email });
  };

  return (
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
        <PrimaryButton type="submit">Rejoins l'équipe</PrimaryButton>
      </div>
    </form>
  );
}
