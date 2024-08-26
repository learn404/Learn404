"use client";

import PrimaryButton from "@/components/buttons/PrimaryButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Loader2, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const regexEmail = 
  /(?:[a-z0-9!#$%&'*+\=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gm


export default function FormWishlist() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
  
    try {
      const formData = new FormData(event.target as HTMLFormElement);
      const email = formData.get("email")?.toString().toLowerCase().trim();

      if (!email || !regexEmail.test(email)) {
        toast.error("Adresse email invalide.");
        return;
      }
  
      const res = await fetch("/api/auth/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
  
    } catch (error) {
      console.error("Error submitting form.");
      toast.error("Une erreur est survenue. Veuillez réessayer plus tard.");
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full mt-5 flex flex-col gap-5">
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input
            placeholder="Entre ton email"
            name="email"
            className="text-gray-200 w-full max-w-sm focus-visible:ring-1 
            focus-visible:ring-torea-800 focus-visible:ring-offset-2"
          />
        </div>
        <div>
          <PrimaryButton 
            type="submit"
            className={cn(
              "inline-flex items-center gap-0",
              isLoading 
                ? "cursor-not-allowed text-gray-300"
                : "border-torea-800"
            )}  
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 text-gray-400 animate-spin" />
                Envoi en cours
              </>
            ) : (
              <>
                <Mail className="w-5 h-5 mr-2" />
                S'abonner
              </>
            )}
          </PrimaryButton>
        </div>
      </form>
    </>
  );
}