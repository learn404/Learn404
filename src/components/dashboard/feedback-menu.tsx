"use client";

import { createFeedbackAction } from "@/app/actions/create-feedback";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "../ui/form";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";

const FormSchema = z.object({
  feedback: z
    .string()
    .min(10, {
      message: "Le feedback doit contenir au moins 10 caractères.",
    })
    .max(250, {
      message: "Le feedback ne peut pas dépasser 250 caractères.",
    }),
})

const FeedbackMenu = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { error } = await createFeedbackAction(data.feedback)
        
    if (error) {
      toast.error(error)
    } else {
      toast.success("Ton feedback a bien été envoyé ! Merci pour le retour :)")
      form.setValue("feedback", "")
    }
  }
  
  return ( 
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="border text-gray-300 bg-gray-950 hover:bg-black hover:border-gray-800 transition-none">
          Feedback
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 rounded-md border border-gray-800 bg-gray-950 p-2">
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="feedback"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Ton feedback..."
                        className="w-full h-24 resize-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-gray-200"
                        autoFocus
                        {...field}
                      >
                      </Textarea>
                    </FormControl>
                    <FormDescription className="text-xs text-gray-500">
                      min: 10 caractères | max: 250 caractères
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Separator />
              <div className="w-full">
                <Button 
                  disabled={form.formState.isSubmitting}
                  type="submit" 
                  variant="default" 
                  className={cn(
                  "ml-auto md:text-sm py-2 px-3 font-medium",
                  form.formState.isSubmitting && "opacity-50 cursor-not-allowed"
                )}>
                  {form.formState.isSubmitting 
                    ? <><Loader2Icon className="animate-spin h-5 w-5" /> En cours d'envoi</>
                    : "Envoyer"
                  }
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
   );
}
 
export default FeedbackMenu;