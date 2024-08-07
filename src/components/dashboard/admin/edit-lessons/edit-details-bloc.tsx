import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { difficulties, status } from "@/lib/constants";

interface EditLinksBlocProps {
  form: any;
  lesson: any;
  slugLesson: any;
  categoryLesson: any;
  categories: {
    id: string;
    name: string;
  }[];
}

const EditDetailsBloc = ({ form, lesson, slugLesson, categoryLesson, categories } : EditLinksBlocProps) => {
  return ( 
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
   );
}
 
export default EditDetailsBloc;