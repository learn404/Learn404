"use client";

import { Button } from "@/components/ui/button";
import { currentUserType } from "@/lib/current-user";
import { ChevronLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { addLesson } from "./addLesson";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { toast } from "sonner";
import AddCategoryButton from "@/components/buttons/AddCategoryButton";
interface AddLessonFormProps {
  isAdmin: boolean;
  isAvatar: boolean;
  user: currentUserType;
}

export default function AddLessonForm({ user, isAvatar }: AddLessonFormProps) {
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [nameLesson, setNameLesson] = useState("");
  const [slugLesson, setSlugLesson] = useState("");
  const router = useRouter();

  const difficulties = [
    { id: "1", name: "Débutant" },
    { id: "2", name: "Intermédiaire" },
    { id: "3", name: "Avancé" },
  ];

  const status = [
    { id: "1", name: "Brouillon", value : true},
    { id: "2", name: "En ligne" , value : false},
  ];

  useEffect(() => {
    async function fetchCategories() {
      const categories = await fetch("/api/lessons/get-categories", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await categories.json();
      setCategories(data);
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    setSlugLesson(
      nameLesson
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "")
    );
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget);

      const nameLesson = formData.get("name_lesson")?.toString()!;
      const categoryLesson = formData.get("category")!.toString();
      const levelLesson = formData.get("level")!;
      const status = formData.get('status')?.toString() || ""

      let draft = true 

      if (status ==="1"){
        draft = true 
      }
      else if (status==="2"){
        draft = false
      }

      let level = "BEGINNER";

      if (levelLesson === "1") {
        level = "BEGINNER";
      } else if (levelLesson === "2") {
        level = "INTERMEDIATE";
      } else if (levelLesson === "3") {
        level = "ADVANCED";
      }

      if (!nameLesson || !categoryLesson || !levelLesson) {
        toast.error("Veuillez remplir les champs obligatoires");
        return;
      }

      toast.promise(
        addLesson(
            nameLesson,
            formData.get("slug_lesson")?.toString() || slugLesson,
            categoryLesson,
            formData.get("description_lesson")?.toString() || "",
            formData.get("video_lesson")?.toString() || "",
            formData.get("repository_lesson")?.toString() || "",
            draft,
            level.toString() as string,
        ),
        {
          loading: "Ajout du cours...",
          success: `Le cours a été ajouté avec succès !`,
          error: "Erreur lors de l'ajout du cours",
        }
      );
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de l'ajout du cours");
    }finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <form className="p-8 max-w-[80vw] m-auto" onSubmit={handleSubmit}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant={"secondary"} className="rounded-md w-fit h-fit">
                <ChevronLeft className="w-4 h-4 " />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl">Ajout du cours {nameLesson}</h1>
            </div>
            <Badge className="bg-red-800">Non Enregistrer</Badge>
          </div>
          <div className="flex items-center gap-4">
            <Button variant={"default"} disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Enregistrer"
              )}
            </Button>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-start gap-4 mt-4">
          <div className="flex flex-col gap-4 w-full lg:w-[50vw] ">
            <div className="border-2 border-gray-800 bg-gray-950 rounded-md p-6">
              <div>
                <h2 className="font-semibold text-2xl">Détails du cours</h2>
                <p className="text-sm text-gray-400 my-2">
                  Les détails du cours seront publiques
                </p>
              </div>
              <div className="mt-4">
                <div className="flex flex-col gap-4 my-4">
                  <div className="gap-2 flex flex-col">
                    <Label htmlFor="name_lesson">Nom du cours</Label>
                    <Input
                      id="name_lesson"
                      name="name_lesson"
                      className="bg-gray-950"
                      onChange={(event) => setNameLesson(event.target.value)}
                    />
                  </div>
                  <div className="gap-2 flex flex-col mt-2">
                    <Label htmlFor="slug_lesson">Slug du cours</Label>
                    <div className="flex items-center">
                      <span className="mr-2">https://learn404.com/</span>
                      <Input
                        id="slug_lesson"
                        name="slug_lesson"
                        className="bg-gray-950"
                        placeholder={slugLesson}
                      />
                    </div>
                  </div>
                  <div className="gap-2 flex flex-col mt-2">
                    <Label htmlFor="description_lesson">Description</Label>
                    <Textarea
                      id="description_lesson"
                      name="description_lesson"
                      className="bg-gray-950"
                      placeholder="Description du cours"
                    />
                  </div>
                  <div className="gap-2 flex flex-col">
                    <Label htmlFor="repository_lesson">
                      Repository Github{" "}
                      <span className="text-gray-400">(Optionnel)</span>
                    </Label>
                    <Input
                      id="repository_lesson"
                      name="repository_lesson"
                      className="bg-gray-950"
                      type="url"
                    />
                  </div>
                  <div className="gap-2 flex flex-col">
                    <Label htmlFor="video_lesson">
                      Vidéo URL{" "}
                      <span className="text-gray-400">(Optionnel)</span>
                    </Label>
                    <Input
                      id="video_lesson"
                      name="video_lesson"
                      className="bg-gray-950"
                      type="url"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-2 border-gray-800 bg-gray-950 rounded-md p-6">
              <div>
                <h2 className="font-semibold text-2xl">Catégories du cours</h2>
              </div>
              <div className="mt-4 flex flex-col lg:flex-row justify-start lg:items-center gap-6">
                <div className="flex items-end gap-2">
                  <div className="flex flex-col gap-2">
                  <Label htmlFor="category">Catégorie</Label>
                  <Select name="category">
                    <SelectTrigger
                      id="category"
                      className="w-[200px] rounded-md bg-gray-950 "
                    >
                      <SelectValue placeholder="Choisir la catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Catégories</SelectLabel>
                        {categories.map((category: any) => (
                          <SelectItem value={category.id} key={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  </div>
                  <AddCategoryButton title="+" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="level">Niveau</Label>
                  <Select name="level">
                    <SelectTrigger
                      id="level"
                      className="w-[200px] rounded-md bg-gray-950 "
                    >
                      <SelectValue placeholder="Choisir le niveau" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Niveaux</SelectLabel>
                        {difficulties.map((difficulty: any) => (
                          <SelectItem value={difficulty.id} key={difficulty.id}>
                            {difficulty.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:flex-col flex gap-4 lg:flex-1 ">
            <div className="border-2 border-gray-800 bg-gray-950 rounded-md p-4 flex-auto">
              <div>
                <h2 className="font-semibold text-2xl">Status du cours</h2>
              </div>
              <div className="flex flex-col gap-2 mt-4">
                <Label htmlFor="status">Status</Label>
                <Select name="status">
                  <SelectTrigger id="status" className="rounded-md bg-gray-950">
                    <SelectValue placeholder="Choisir le status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      {status.map((state: any) => (
                        <SelectItem value={state.id} key={state.id}>
                          {state.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className=" border-2 border-gray-800 bg-gray-950 rounded-md p-6 flex-auto">
              <div>
                <h2 className="font-semibold text-2xl">Supprimer le cours</h2>
                <p className="text-sm text-gray-400 my-2">
                  Suppression définitive du cours
                </p>
              </div>
              <div className="mt-4">
                <Button
                  variant="destructive"
                  type="button"
                  disabled
                  className="pointer-events-auto cursor-not-allowed"
                >
                  Supprimer le cours
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
