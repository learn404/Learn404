"use client";

import { editLesson } from "@/app/actions/editLesson";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { currentUserType } from "@/lib/current-user";
import { ChevronLeft, Loader2, Minus, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import RichTextEditor from "@/components/text-editor";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  name_lesson: z.string().optional(),
  slug_lesson: z.string().optional(),
  links: z.array(
    z.object({
      label: z.string().optional(),
      url: z.string().optional(),
    })
  ),
  category: z.string().optional(),
  level: z.string().optional(),
  status: z.string().optional(),
  repository_lesson: z.string().optional(),
  video_lesson: z.string().optional(),
  description_lesson: z.string().optional(),
  content_lesson: z.string().optional(),
});
interface EditLessonFormProps {
  isAdmin: boolean;
  user: currentUserType;
  params: { slug: string };
  lesson: any;
  categoryLesson: any;
}
export default function EditLessonForm({
  user,
  params,
  lesson,
  categoryLesson,
}: EditLessonFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );
  const [nameLesson, setNameLesson] = useState(lesson.title);
  const [slugLesson, setSlugLesson] = useState(lesson.slug);
  const [content, setContent] = useState(lesson.contentLesson);

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

      const editFormLesson = () => {
        return editLesson(
          nameLesson || lesson.title,
          slugLesson || lesson.slug,
          categoryLesson || lesson.category,
          descriptionLesson,
          videoLesson,
          repositoryLesson,
          draft,
          levelLesson,
          params,
          links.map((link) => ({
            label: link.label || "",
            url: link.url || "",
          })) as { label: string; url: string }[],
          contentLesson
        );
      };

      toast.promise(editFormLesson(), {
        loading: "Enregistrement du cours de la modification...",
        success: "Le cours a été modifié avec succès",
        error: "Le cours n'a pas été modifié",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
      router.push(`/cours/${slugLesson}`);
      router.refresh();
    }
  }

  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    try {
      const deleteFormLesson = () => {
        return fetch("/api/lessons/delete-lesson", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ slug: params.slug, userId: user.id }),
        });
      };

      toast.promise(deleteFormLesson(), {
        loading: "Suppression du cours...",
        success: "Le cours a été supprimé avec succès",
        error: "Le cours n'a pas été supprimé",
      });
    } catch (error) {
      console.error("Error deleting lesson:", error);
    } finally {
      setIsLoading(false);
      router.push("/admin");
      router.refresh();
    }
  };

  const difficulties = [
    { id: "1", name: "Débutant" },
    { id: "2", name: "Intermédiaire" },
    { id: "3", name: "Avancé" },
  ];

  const status = [
    { id: "1", name: "Brouillon" },
    { id: "2", name: "En ligne" },
  ];

  if (lesson.draft === false) {
    lesson.draft = "En ligne";
  } else if (lesson.draft === true) {
    lesson.draft = "Brouillon";
  }

  if (lesson.level === "BEGINNER") {
    lesson.level = "Débutant";
  } else if (lesson.level === "INTERMEDIATE") {
    lesson.level = "Intermédiaire";
  }
  if (lesson.level === "ADVANCED") {
    lesson.level = "Avancé";
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
                <h1 className="text-2xl">
                  Modification du cours : {nameLesson}
                </h1>
              </div>
              <Badge
                className={
                  lesson.draft === "En ligne" ? "bg-green-500" : "bg-yellow-500"
                }
              >
                {lesson.draft}
              </Badge>
            </div>
            <div className="flex items-center gap-4">
              <Button variant={"default"} disabled={isLoading} type="submit">
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Enregistrer"
                )}
              </Button>
              <Button variant={"destructive"} onClick={handleDelete} type="button">Supprimer le cours</Button>
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
                          placeholder={lesson.description}
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
                                placeholder={lesson.title}
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
                                    <SelectValue
                                      placeholder={categoryLesson?.name}
                                    />
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
                                    <SelectValue placeholder={lesson.level} />
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
                                    <SelectValue placeholder={lesson.draft} />
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
                                  placeholder={
                                    lesson.repository_url || "Repository URL"
                                  }
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
                                  placeholder={
                                    lesson.videoId || "Lien de la vidéo"
                                  }
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
              <div className="border-2 border-gray-800 bg-gray-950 rounded-md p-6">
                <h2 className="font-semibold text-2xl">
                  Liens supplémentaires
                </h2>
                {fields.map((field, index) => (
                  <div key={field.id} className="flex flex-col">
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
