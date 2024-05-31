"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Correct import
import { FormEvent } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { EyeIcon, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";

interface FormData {
  email: string;
  password: string;
}

async function submitForm(data: FormData, router: any) {
  const response = await signIn("credentials", {
    redirect: false,
    email: data.email,
    password: data.password,
  });

  if (!response?.error) {
    router.push("/dashboard");
  } else {
    toast.error("Erreur de connexion");
  }
}

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter(); // Move useRouter hook inside the component

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }
    await submitForm({ email, password }, router); // Await submission
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
              <div
                className="absolute right-3 top-2 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <EyeIcon /> : <EyeOff />}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-10 w-full">
          <PrimaryButton>Connecte toi !</PrimaryButton>
        </div>
      </form>
    </>
  );
}
