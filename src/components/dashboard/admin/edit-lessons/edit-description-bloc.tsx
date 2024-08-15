import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

const EditDescriptionBloc = (form: any) => {
  return ( 
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
   );
}
 
export default EditDescriptionBloc;