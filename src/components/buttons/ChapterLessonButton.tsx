"use client";
import { Button } from "@/components/ui/button";
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
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ChapterLessonButton({
  params,
}: {
  params: { slug: string };
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    try {
      const formData = new FormData(event?.currentTarget);


      toast.promise(
        fetch("/api/lessons/add-chapter", {
          method: "POST",
          body: JSON.stringify({
            name: formData.get("name"),
            start: formData.get("start"),
            slug: params.slug,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }),
        {
          success: "Chapitre ajouté avec succès",
          error: "Une erreur est survenue lors de l'ajout du chapitre",
          loading: "Ajout du chapitre en cours...",
        }
      );
      router.push(`/cours/${params.slug}`);
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">
          Ajouter un chapitre
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-black">
        <DialogHeader>
          <DialogTitle>Ajouter un chapitre</DialogTitle>
          <DialogDescription>Ajoute un chapitre à la Vidéo</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nom du chapitre
              </Label>
              <Input
                id="name"
                name="name"
                defaultValue="Chapitre 1"
                className="col-span-3 block flex-1 border bg-transparent py-1.5  text-gray-100 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Début du chapitre
              </Label>
              <Input
                id="start"
                name="start"
                defaultValue="00:00:00"
                className="col-span-3 block flex-1 border  bg-transparent py-1.5  text-gray-100 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              Ajouter
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
