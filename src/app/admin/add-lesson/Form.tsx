"use client";

import { Button } from "@/components/ui/button";
import { currentUserType } from "@/lib/current-user";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { addLesson } from "./addLesson";
import CreateCategoryButton from "@/components/buttons/AddCategoryButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";

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
  const router = useRouter();

  useEffect(() => {
    async function fetchCategories() {
      const categories = await fetch("/api/lessons/get-categories", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await categories.json();
      console.log(data);
      setCategories(data);
    }
    fetchCategories();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData(event.currentTarget);
      const response = await addLesson(formData);
      console.log(response);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form className="p-8" onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-100">
              NOUVEAU COURS
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              Ces informations seront affichées publiquement donc soyez sûr de
              ce que vous écrivez.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3 lg:flex items-end gap-5">
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium leading-6 text-gray-100"
                  >
                    Catégorie
                  </label>
                  <div className="mt-2">
                    <Select name="category">
                      <SelectTrigger
                        id="category"
                        className="w-fit rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <SelectValue placeholder="Choisir une catégorie" />
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
                </div>
                
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-100"
                >
                  Titre
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-100 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Nom du cours"
                    />
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label
                    htmlFor="slug_title"
                    className="block text-sm font-medium leading-6 text-gray-100"
                  >
                    Slug
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <span className="flex select-none items-center pl-3 text-gray-400 sm:text-sm">
                        learn404.com/cours/categorie/
                      </span>
                      <input
                        type="text"
                        name="slug_title"
                        id="slug_title"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-100 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="slug du cours"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-100"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-400">
                  Ecris une description du cours en quelques lignes.
                </p>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-100/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-100">
              DÉTAILS DU COURS
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              Ces informations peuvent être modifiées plus tard.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="repository_url"
                  className="block text-sm font-medium leading-6 text-gray-100"
                >
                  Repository URL
                </label>
                <div className="mt-2">
                  <input
                    type="url"
                    name="repository_url"
                    id="repository_url"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="video_url"
                  className="block text-sm font-medium leading-6 text-gray-100"
                >
                  Lien de la vidéo
                </label>
                <div className="mt-2">
                  <input
                    type="url"
                    name="video_url"
                    id="video_url"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="https://drive.google.com/uc?id=ID_DU_FICHIER"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-100">
              Paramètres du cours
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              Les paramètres du cours peuvent être modifiés plus tard.
            </p>

            <div className="mt-10 space-y-10">
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-100">
                  Visibilité
                </legend>
                <div className="mt-6 space-y-6">
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="draft"
                        name="draft"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="draft"
                        className="font-medium text-gray-100"
                      >
                        Brouillon
                      </label>
                      <p className="text-gray-400">
                        Les cours en brouillon ne sont pas visibles par les
                        étudiants.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="newLesson"
                        name="newLesson"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="newLesson"
                        className="font-medium text-gray-100"
                      >
                        Nouveau
                      </label>
                      <p className="text-gray-400">
                        Les nouveaux cours ont un badge spécial.
                      </p>
                    </div>
                  </div>
                  <div className="text-sm leading-6">
                    <label
                      htmlFor="author"
                      className="font-medium text-gray-100"
                    >
                      Le cours est créé par
                    </label>
                    <div className="text-gray-400 flex items-center mt-2">
                      {isAvatar ? (
                        <Image
                          src={user?.image || ""}
                          alt="profile"
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      ) : (
                        <div className="rounded-full bg-white w-10 h-10"></div>
                      )}
                      <label className="ml-2" htmlFor="author">
                        {user?.name}
                      </label>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
        <div className="flex items-center  gap-x-6">
          <Button
            variant="secondary"
            type="button"
            onClick={() => router.push("/admin")}
          >
            Annuler
          </Button>
          <Button variant="default" type="submit" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Créer le cours"
            )}
          </Button>
        </div>
      </form>
    </>
  );
}
