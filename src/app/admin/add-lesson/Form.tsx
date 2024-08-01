"use client";

import { Button } from "@/components/ui/button";
import { currentUserType } from "@/lib/current-user";
import { ChevronLeft, Loader2, Plus, Minus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { addLesson } from "./addLesson";
import RichTextEditor from "@/components/text-editor";
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name_lesson: z.string().min(2).max(50),
  slug_lesson: z.string().min(2).max(50),
  links: z.array(
    z.object({
      label: z.string().optional(),
      url: z.string().optional(),
    })
  ),
  category: z.string(),
  level: z.string(),
  status: z.string(),
  repository_lesson: z.string().optional(),
  video_lesson: z.string().optional(),
  description_lesson: z.string().optional(),
  content_lesson: z.string().optional(),
});

interface AddLessonFormProps {
  isAdmin: boolean;
  isAvatar: boolean;
  user: currentUserType;
}

export default function AddLessonForm({ user, isAvatar }: AddLessonFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name_lesson: "",
      slug_lesson: "",
      links: [{ label: "", url: "" }],
      category: "",
      level: "",
      status: "",
      repository_lesson: "",
      video_lesson: "",
      description_lesson: "",
      content_lesson: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "links",
  });

  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [nameLesson, setNameLesson] = useState("");
  const [slugLesson, setSlugLesson] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const difficulties = [
    { id: "1", name: "Débutant" },
    { id: "2", name: "Intermédiaire" },
    { id: "3", name: "Avancé" },
  ];
  const status = [
    { id: "1", name: "Brouillon", value: true },
    { id: "2", name: "En ligne", value: false },
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
  }, [nameLesson]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const {
      category,
      level,
      status,
      name_lesson,
      slug_lesson,
      description_lesson,
      video_lesson,
      repository_lesson,
      
      links,
    } = values;




    try {
      const nameLesson = name_lesson;
      const slugLesson = slug_lesson;
      const contentLesson = content;
      const categoryLesson = category;
      const descriptionLesson = description_lesson || "";
      const videoLesson = video_lesson || "";
      const repositoryLesson = repository_lesson || "";
      const draft = status === "1" ? true : false;

      let levelLesson = "BEGINNER";

      if (level === "1") {
        levelLesson = "BEGINNER";
      } else if (level === "2") {
        levelLesson = "INTERMEDIATE";
      } else if (level === "3") {
        levelLesson = "ADVANCED";
      }

      const addFormLesson = () => {
        return addLesson(
          nameLesson,
          slugLesson,
          contentLesson,
          categoryLesson,
          descriptionLesson,
          videoLesson,
          repositoryLesson,
          draft,
          levelLesson,
          links.map(link => ({
            label: link.label || "",
            url: link.url || "",
          })) as { label: string; url: string; }[],
        );
      };

      toast.promise(addFormLesson(), {
        loading: "Ajout du cours...",
        success: `Le cours a été ajouté avec succès !`,
        error: "Erreur lors de l'ajout du cours",
      });
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de l'ajout du cours");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 p-8 max-w-[80vw] m-auto flex-shrink-0 relative"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin">
                <Button
                  variant={"secondary"}
                  className="rounded-md w-fit h-fit"
                >
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
          <div className="grid grid-cols-12 items-start gap-4 mt-4">
            <div className="border-2 border-gray-800 bg-gray-950 rounded-md p-6 h-full hidden lg:block lg:col-span-8">
              <h2 className="font-semibold text-2xl">Contenu</h2>
              <div className="mt-4">
                <RichTextEditor value={content} onChange={setContent} />
                <FormField
                  control={form.control}
                  name="description_lesson"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description du cours</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Description"
                          {...field}
                          className="bg-gray-950"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 w-full col-span-12 lg:col-span-4">
              <div className="border-2 border-gray-800 bg-gray-950 rounded-md p-6 h-full">
                <div>
                  <h2 className="font-semibold text-2xl">Détails du cours</h2>
                  <p className="text-sm text-gray-400 my-2">
                    Les détails du cours seront publiques
                  </p>
                </div>
                <div className="mt-4">
                  <div className="flex flex-col gap-4 my-4">
                    <div className="gap-2 flex flex-col">
                      <FormField
                        control={form.control}
                        name="name_lesson"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="name_lesson">
                              Nom du cours
                            </FormLabel>

                            <FormControl>
                              <Input
                                placeholder="Nom du cours"
                                {...field}
                                className="bg-gray-950"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="gap-2 flex flex-col mt-2">
                      <FormField
                        control={form.control}
                        name="slug_lesson"
                        render={({ field }) => (
                          <FormItem>
                            <Label htmlFor="slug_lesson">Slug du cours</Label>

                            <FormControl>
                              <div className="flex items-center">
                                <span className="mr-2">
                                  https://learn404.com/
                                </span>
                                <Input
                                  id="slug_lesson"
                                  className="bg-gray-950"
                                  placeholder={slugLesson}
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="gap-2 flex flex-col mt-2">
                        <div className="flex items-end justify-between">
                        <FormField
                          control={form.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Catégorie</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="bg-gray-950">
                                    <SelectValue placeholder="Choisir une catégorie" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>
                                      Catégories disponibles
                                    </SelectLabel>
                                    {categories.map((category) => (
                                      <SelectItem
                                        key={category.id}
                                        value={category.id}
                                      >
                                        {category.name}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <AddCategoryButton />
                        </div>
                      </div>
                      <div className="gap-2 flex flex-col mt-2">
                        <FormField
                          control={form.control}
                          name="level"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Niveau</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="bg-gray-950">
                                    <SelectValue placeholder="Choisir un niveau" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Niveau</SelectLabel>
                                    {difficulties.map((difficulty) => (
                                      <SelectItem
                                        key={difficulty.id}
                                        value={difficulty.id}
                                      >
                                        {difficulty.name}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="gap-2 flex flex-col mt-2">
                        <FormField
                          control={form.control}
                          name="status"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Statut</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="bg-gray-950">
                                    <SelectValue placeholder="Choisir un statut" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Statut</SelectLabel>
                                    {status.map((s) => (
                                      <SelectItem key={s.id} value={s.id}>
                                        {s.name}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="gap-2 flex flex-col mt-2">
                        <FormField
                          control={form.control}
                          name="repository_lesson"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Repository</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Lien du repository"
                                  {...field}
                                  className="bg-gray-950"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="gap-2 flex flex-col mt-2">
                        <FormField
                          control={form.control}
                          name="video_lesson"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Lien de la vidéo</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Lien de la vidéo"
                                  {...field}
                                  className="bg-gray-950"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-2 border-gray-800 bg-gray-950 rounded-md p-6 mt-4">
                <h2 className="font-semibold text-2xl">
                  Liens supplémentaires
                </h2>
                {fields.map((field, index) => (
                  <div key={field.id} className="flex flex-col gap-4 mt-4">
                    <div className="flex gap-2 items-center">
                      <FormField
                        control={form.control}
                        name={`links.${index}.label`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Label du lien</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Label"
                                {...field}
                                className="bg-gray-950"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`links.${index}.url`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>URL</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="URL"
                                {...field}
                                className="bg-gray-950"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => remove(index)}
                        className="self-end"
                      >
                        <Minus />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => append({ label: "", url: "" })}
                  className="mt-4"
                >
                  <Plus />
                  Ajouter un lien
                </Button>
              </div>
            </div>
            <div className="border-2 border-gray-800 bg-gray-950 rounded-md p-6 h-full col-span-12 block lg:hidden">
              <h2 className="font-semibold text-2xl">Contenu</h2>
              <div className="mt-4">
                <RichTextEditor value={content} onChange={setContent} />
                <FormField
                  control={form.control}
                  name="description_lesson"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description du cours</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Description"
                          {...field}
                          className="bg-gray-950"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}
