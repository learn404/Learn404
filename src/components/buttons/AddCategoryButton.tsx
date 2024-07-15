"use client";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Layers3 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddCategoryButton() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target as HTMLFormElement);

    const categoryName = formData.get("category-name")?.toString();

    toast.promise(
      fetch("/api/lessons/create-category", {
        method: "POST",
        body: JSON.stringify({
          categoryName: categoryName,
        }),
      }),
      {
        loading: "Chargement...",
        success: "Catégorie ajoutée avec succès",
        error: "Une erreur est survenue lors de l'ajout de la catégorie",
      }
    );
    setIsLoading(false);
    router.push("/admin/add-lesson");
    router.refresh();
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default">
            <Layers3 className="mr-1 w-4" />
            Ajouter une catégorie
          </Button>
        </DialogTrigger>
        <DialogContent className="border-2 border-white/10 bg-bg-primary">
          <DialogHeader>
            <DialogTitle>Ajouter une catégorie</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmitCategory}>
            <DialogDescription className="flex flex-col gap-4">
              <Label htmlFor="category-name">Nom de la catégorie</Label>
              <Input id="category-name" name="category-name" />
            </DialogDescription>
            <DialogFooter className="flex justify-end">
              <Button
                variant="default"
                className="mt-4"
                disabled={isLoading}
                type="submit"
              >
                {isLoading ? "Chargement..." : "Ajouter"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
