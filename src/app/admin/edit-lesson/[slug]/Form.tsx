"use client";

import { editLesson } from "@/app/actions/editLesson";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { currentUserType } from "@/lib/current-user";
import { ChevronLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import EditDescriptionBloc from "@/components/dashboard/admin/edit-lessons/edit-description-bloc";
import EditDetailsBloc from "@/components/dashboard/admin/edit-lessons/edit-details-bloc";
import EditLinksBloc from "@/components/dashboard/admin/edit-lessons/edit-links-bloc";
import RichTextEditor from "@/components/text-editor";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {
  Form
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
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
        loading: "Ajout des modifications...",
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

  if (lesson.draft === false) {
    lesson.draft = "En ligne";
  } else if (lesson.draft === true) {
    lesson.draft = "Brouillon";
  }

  if (lesson.level === "BEGINNER") {
    lesson.level = "Débutant";
  } else if (lesson.level === "INTERMEDIATE") {
    lesson.level = "Intermédiaire";
  } else if (lesson.level === "ADVANCED") {
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
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost"
                    className={cn("text-red-500 hover:text-red-600 hover:bg-red-500/10", isLoading && "cursor-not-allowed")}
                  >
                    Supprimer
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Es-tu sûr de supprimer le cours?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Tu ne pourras pas revenir en arrière et tu perdras tout ce que tu as écrit. 
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
          <div className="grid grid-cols-12 items-start gap-4 mt-4">
            <div className="border-2 border-gray-800 bg-gray-950 rounded-md p-6 h-full hidden lg:block lg:col-span-8">
              <h2 className="font-semibold text-2xl">Contenu</h2>
              <div className="mt-4">
                <RichTextEditor value={content} onChange={setContent} />
                <EditDescriptionBloc form={form} />
              </div>
            </div>
            <div className="flex flex-col gap-4 w-full col-span-12 lg:col-span-4">
              <EditDetailsBloc 
                form={form} 
                lesson={lesson} 
                slugLesson={slugLesson} 
                categories={categories} 
                categoryLesson={categoryLesson}
              /> 
              <EditLinksBloc 
                fields={fields} 
                form={form} 
                remove={remove} 
                append={append} 
              />
            </div>
            <div className="border-2 border-gray-800 bg-gray-950 rounded-md p-6 h-full col-span-12 block lg:hidden">
              <h2 className="font-semibold text-2xl">Contenu</h2>
              <div className="mt-4">
                <RichTextEditor value={content} onChange={setContent} />
                <EditDescriptionBloc form={form} />
              </div>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}
