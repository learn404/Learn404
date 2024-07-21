"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { currentUserType } from "@/lib/current-user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const generalForm = [
  {
    label: "Nom du compte",
    name: "username",
    value: "",
    needed: true,
    editable: true
  },
  {
    label: "Adresse mail",
    // name: "email",
    value: "",
    needed: true,
    editable: false
  },
  {
    label: "Application de connexion",
    value: "",
    needed: true,
    editable: false
  },
];

const paymentForm =  [
  {
    label: "Prénom",
    name: "firstName",
    value: "Mattéo",
    needed: true,
    editable: true
  },
  {
    label: "Nom",
    name: "lastName",
    value: "Marchelli",
    needed: true,
    editable: true
  },
  {
    label: "Ligne d'adresse 1",
    name: "address1",
    value: "14 rue du bourguignon",
    needed: true,
    editable: true
  },
  {
    label: "Ligne d'adresse 2",
    name: "address2",
    value: "",
    needed: false,
    editable: true
  },
  {
    label: "Ville",
    name: "city",
    value: "Paris",
    needed: true,
    editable: true
  },
  {
    label: "Etat / Province",
    name: "state",
    value: "",
    needed: false,
    editable: true
  },
  {
    label: "Code postal",
    name: "postalCode",
    value: "78170",
    needed: true,
    editable: true
  },
  {
    label: "Pays",
    name: "country",
    value: "France (FR)",
    needed: true,
    editable: true
  },
]

const formSchema = z.object({
  general: z.object({
    username: z.string().min(2, {
      message: "Le nom d'utilisateur doit contenir au moins 2 caractères",
    }),
    // email: z.string().email({
    //   message: "L'adresse e-mail doit être valide",
    // }),
  }),
  payment: z.object({
    firstName: z.string().min(2, {
      message: "Le prénom doit contenir au moins 2 caractères",
    }),
    lastName: z.string().min(2, {
      message: "Le nom doit contenir au moins 2 caractères",
    }),
    address1: z.string().min(2, {
      message: "La ligne d'adresse 1 est obligatoire.",
    }),
    address2: z.string(),
    city: z.string(),
    state: z.string(),
    postalCode: z.string({
      message: "Le code postal est obligatoire.",
    }),
    country: z.string({
      message: "Le pays est obligatoire.",
    }),
  }),
})

type paymentValuesType = "payment.firstName" | "payment.lastName" | "payment.address1" | "payment.address2" | 
  "payment.city" | "payment.state" | "payment.postalCode" | "payment.country";

interface FormDetailsProps {
  user: currentUserType;
  account: {
    id: string;
    userId: string;
    type: string;
    provider: string;
  } | null;
}

const FormDetails = ({ user, account }: FormDetailsProps) => {

  generalForm[0].value = user.name || "";
  generalForm[1].value = user.email || "";
  generalForm[2].value = account?.provider.toUpperCase() || "";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),  
    defaultValues: {
      general: {
        username: generalForm[0].value,
      },
      payment: {
        firstName: paymentForm[0].value,
        lastName: paymentForm[1].value,
        address1: paymentForm[2].value,
        address2: paymentForm[3].value,
        city: paymentForm[4].value,
        state: paymentForm[5].value,
        postalCode: paymentForm[6].value,
        country: paymentForm[7].value
      }
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {

    // A compléter
    console.log(values);
  }

  return ( 
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold text-gray-50">
            Général
          </h2>
          <div className="mt-5 flex flex-col gap-5">
            {generalForm.map((item) => (
              item.name === "username" ? (
                <FormField
                  key={item.label}
                  control={form.control}
                  name="general.username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-400">
                        {item.label} {item.needed && <span>*</span>}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          disabled={!item.editable}
                          className= "h-12 bg-gray-900/80 border-2 border-gray-800 flex items-center rounded-sm text-gray-300 w-full text-base"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              ) : (
                <div key={item.label} className="flex flex-col gap-1">
                  <p className="text-gray-400 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {item.label} {item.needed && <span>*</span>}
                  </p>
                  <div className="h-12 bg-gray-900/80 text-gray-500 border-2 border-gray-800 flex items-center px-3 py-2 rounded-sm mt-2">
                    <span>{item.value}</span>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
        <div className="flex flex-col mt-9">
          <h2 className="text-xl font-semibold text-gray-50">
            Informations de paiement
          </h2>
          <div className="mt-5 flex flex-col gap-5">
            {paymentForm.map((item) => (
                item.name ? (
                  <FormField
                    key={item.label}
                    control={form.control}
                    name={("payment." + item.name) as paymentValuesType}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-400">
                          {item.label} {item.needed && <span>*</span>}
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            disabled={!item.editable}
                            className="h-12 bg-gray-900/80 border-2 border-gray-800 flex items-center pl-3 rounded-sm text-gray-300 text-base w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                ) : (
                  <div key={item.label} className="flex flex-col gap-1">
                    <p className="text-gray-400 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {item.label} {item.needed && <span>*</span>}
                    </p>
                    <div className="h-12 bg-gray-900/80 border-2 border-gray-800 flex items-center pl-3 rounded-sm text-gray-300">
                      <span>{item.value}</span>
                    </div>
                  </div>
                )
              ))}
          </div>
        </div>
        <div className="mt-5 flex items-center justify-end">
          <Button type="submit">Sauvegarder</Button>
        </div>
      </form>
    </Form>
   );
}
 
export default FormDetails;