"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AnimatedSubscribeButton } from "@/components/magicui/animated-subscribe-button";
import { useState } from "react";
import { toast } from "sonner";
import { redirect, useRouter } from "next/navigation";


export default function FormWishlist() {
  const [isLoading, setIsLoading] = useState(false);
  const [subscribeStatus, setSubscribeStatus] = useState(false);

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData(event.target as HTMLFormElement);

      const email = formData.get("email")?.toString().toLowerCase().trim();

      if (!email) {
        toast.error("Veuillez entrer une adresse email valide");
        setSubscribeStatus(false);
        setIsLoading(false);
        return;
      }

      if (!email.includes("@") || !email.includes(".")) {
        toast.error("Veuillez entrer une adresse email valide");
        setSubscribeStatus(false);
        setIsLoading(false);
        return;
      }

      if (email.length < 5) {
        toast.error("Veuillez entrer une adresse email valide");
        setSubscribeStatus(false);
        setIsLoading(false);
        return;
      }

      toast.promise(fetch("/api/auth/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      }),
      {
        loading: "Chargement...",
        success: "Inscription réussie",
        error: "Une erreur est survenue lors de l'inscription",
      })
      toast.promise(fetch("/api/auth/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      }),
      {
        loading: "Chargement...",
        success: "Inscription réussie",
        error: "Une erreur est survenue lors de l'inscription",
      })
    } catch (error) {
      console.error("Error submitting form:", error);
      if (error) {
        setSubscribeStatus(false);
        
      } else {
        setSubscribeStatus(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Label htmlFor="email">Email</Label>
        <Input
          placeholder="Email"
          name="email"
          className="text-gray-800 max-w-lg"
        />
        <p className="text-sm text-gray-400 font-medium py-2 max-w-lg">
          Tu t'inscris à la newsletter de Learn404 ainsi qu'à la wishlist qui te
          donnera un avantage considérable...
        </p>
        <AnimatedSubscribeButton
          initialText="S'abonner"
          changeText={"Abonné"}
          buttonColor="white"
          buttonTextColor={"text-gray-800"}
          subscribeStatus={subscribeStatus}
        />
      </form>
    </>
  );
}
