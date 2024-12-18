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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Layers3 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddCategoryButton({title}: {title?: string }) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target as HTMLFormElement);

    const categoryName = formData.get("category-name")?.toString();
    const level = formData.get("level")?.toString();
    const description = formData.get("description")?.toString();

    const createCategory = () => {
      return fetch("/api/lessons/create-category", {
        method: "POST",
        body: JSON.stringify({
          categoryName: categoryName,
          level: level,
          description: description,
        }),
      });
    }

    toast.promise(createCategory,
      {
        loading: "Chargement...",
        success: "Catégorie ajoutée avec succès",
        error: "Une erreur est survenue lors de l'ajout de la catégorie",
      }
    );
    setIsLoading(false);
    setOpen(false);
    router.refresh();
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="default">
            <Layers3 className="mr-1 w-4" />
            {title}
          </Button>
        </DialogTrigger>
        <DialogContent className="border-2 border-white/10 bg-bg-primary max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Ajouter une catégorie</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmitCategory}>
            <DialogDescription className="flex flex-col gap-4">
              <Label htmlFor="category-name">Nom de la catégorie</Label>
              
              <Input id="category-name" name="category-name" placeholder="Nom de la catégorie" />
              <Select name="level" defaultValue="BEGINNER">
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un niveau" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BEGINNER">Débutant</SelectItem>
                  <SelectItem value="INTERMEDIATE">Intermédiaire</SelectItem>
                  <SelectItem value="ADVANCED">Avancé</SelectItem>
                </SelectContent>
              </Select>
              <Textarea name="description" placeholder="Description de la catégorie" />
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
