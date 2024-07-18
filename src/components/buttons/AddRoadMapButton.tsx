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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";

export default function AddRoadMapButton() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target as HTMLFormElement);

    const title = formData.get("title")?.toString();
    const content = formData.get("description")?.toString().replace(/\n/g,'<br>').replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" className="text-blue-500 underline" target="_blank">$1</a>').replace(/(www\.[^\s]+)/g, '<a href="https://$1" className="text-blue-500 underline" target="_blank">$1</a>');
    const priority = formData.get("priority")?.toString();
    const type = formData.get("type")?.toString();
    const status = formData.get("status")?.toString();

    if (!title || !content || !priority || !type || !status) {
      toast.error("Veuillez remplir tous les champs");
      setIsLoading(false);
      return;
    }

    


    try {
      const createRoadmap = () => {
        
        return fetch("/api/roadmap/create-roadmap", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, content, priority, type, status }),
        });
      };

      await toast.promise(createRoadmap(), {
        loading: "Création du roadmap...",
        success: "Roadmap créé avec succès",
        error: "Une erreur est survenue lors de la création du roadmap",
      });

      setOpen(false);
      setIsLoading(false);
      router.refresh();
    } catch (error) {
      setIsLoading(false);
      toast.error("Une erreur est survenue lors de la création du roadmap");
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="default">
            <RefreshCcw className="mr-1 w-4" />
            Ajouter un roadmap
          </Button>
        </DialogTrigger>
        <DialogContent className="border-2 border-white/10 bg-bg-primary">
          <DialogHeader>
            <DialogTitle>Ajouter un roadmap</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <DialogDescription className="flex flex-col gap-4">
              <Label htmlFor="title">Titre</Label>
              <Input id="title" name="title" />
              <Label htmlFor="description">Description</Label>
              <Textarea
                placeholder="Description du roadmap"
                className="resize-none"
                id="description"
                name="description"
              />
              <div className="flex flex-row gap-4">
                <div>
                  <Label htmlFor="priority">Priorité</Label>
                  <Select name="priority">
                    <SelectTrigger className="w-fit">
                      <SelectValue placeholder="Sélectionner une priorité" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Priorité</SelectLabel>
                        <SelectItem value="LOW">Basse</SelectItem>
                        <SelectItem value="MEDIUM">Moyenne</SelectItem>
                        <SelectItem value="HIGH">Haute</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select name="type">
                    <SelectTrigger className="w-fit">
                      <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Type</SelectLabel>
                        <SelectItem value="feature">Feature</SelectItem>
                        <SelectItem value="bug">Bug</SelectItem>
                        <SelectItem value="improvement">
                          Amélioration
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Label htmlFor="status">Status</Label>
              <Select name="status">
                <SelectTrigger className="w-fit">
                  <SelectValue placeholder="Sélectionner un status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="TODO">To do</SelectItem>
                    <SelectItem value="IN_PROGRESS">En cours</SelectItem>
                    <SelectItem value="DONE">Terminé</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
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
