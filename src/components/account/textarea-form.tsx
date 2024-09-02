"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { createFeedbackAction } from "@/app/actions/create-feedback"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

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

export function TextareaForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const response = await createFeedbackAction(data.feedback)
        
    if (response.error) {
      toast.error(response.error)
    } else {
      toast.success("Ton feedback a bien été envoyé ! Merci pour le retour :)")
      form.setValue("feedback", "")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-5 mt-5">
        <FormField
          control={form.control}
          name="feedback"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Textarea
                    placeholder="As-tu des choses à dire sur la plateforme ?"
                    className="resize-none h-32"
                    {...field}
                  />
                  <span className={cn(
                    "absolute right-1 bottom-1 text-sm text-gray-400",
                    field?.value?.length > 250 && "text-red-800"
                  )}>
                    {field?.value?.length || "0"}/250
                  </span>
                </div>
              </FormControl>
              <FormDescription>
                Nous prenons le temps de lire tous vos retours afin d'améliorer au maximum la plateforme !
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Envoyer</Button>
      </form>
    </Form>
  )
}
