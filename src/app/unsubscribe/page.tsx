"use client"
import { z } from "zod";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "react-toastify"
import { useRouter } from 'next/navigation'
const formSchema = z.object({
    email: z.string().email(),
  })

  import { zodResolver } from "@hookform/resolvers/zod"
  import { useForm } from "react-hook-form"


export default function Unsubscribe() {
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "",
        },
      })

      async function onSubmit(values: z.infer<typeof formSchema>) {
            const email = values.email
            try {
                const response = await fetch('/api/unsubscribe', {
                    method: 'POST',
                    body: JSON.stringify({email: email}),
                })
                if (response.ok) {
                    toast.success("Vous avez été désabonné avec succès")
                    router.push('/')
                }
                else {
                    toast.error('Une erreur est survenue')
                }
            } catch (error) {
                toast.error('Une erreur est survenue : ' + error)
            }
      }

  return (
    <div className="flex justify-center items-center h-screen">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input placeholder="email@example.com" {...field} className="w-full text-gray-200"/>
                    </FormControl>
                    <FormDescription>
                        Veuillez entrer votre email pour vous désabonner.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit">Se désabonner</Button>
            </form>
        </Form>
    </div>
  );
}