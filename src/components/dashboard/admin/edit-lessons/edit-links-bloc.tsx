import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";
import { FieldArrayMethodProps, FieldArrayWithId } from "react-hook-form";

interface EditLinksBlocProps {
  fields: FieldArrayWithId<{
    links: {
        label?: string | undefined;
        url?: string | undefined;
    }[];
    name_lesson?: string | undefined;
    slug_lesson?: string | undefined;
    status?: string | undefined;
    category?: string | undefined;
    content_lesson?: string | undefined;
  }, "links", "id">[];
  form: any;
  append: (value: {
      label?: string | undefined;
      url?: string | undefined;
    } | {
      label?: string | undefined;
      url?: string | undefined;
    }[], options?: FieldArrayMethodProps) => void;
  remove: (index: number | number[]) => void;
}

const EditLinksBloc = ({ fields, form, append, remove } : EditLinksBlocProps) => {
  return ( 
    <div className="border-2 border-gray-800 bg-gray-950 rounded-md p-6">
      <h2 className="font-semibold text-2xl">
        Liens supplémentaires
      </h2>
      {fields.map((field, index) => (
        <div key={field.id} className="flex flex-col mt-4">
          <div className="flex gap-2 items-center">
            <FormField
              control={form.control}
              name={`links.${index}.label`}
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Label du lien</FormLabel> */}
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
                  {/* <FormLabel>URL</FormLabel> */}
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
              variant="ghost"
              onClick={() => remove(index)}
              className={cn("self-end text-red-500 hover:text-red-600 hover:bg-red-500/10")}
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
   );
}
 
export default EditLinksBloc;