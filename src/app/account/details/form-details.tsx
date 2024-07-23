"use client";

import { updateDetailsAccount } from "@/app/actions/update-details-account";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";


export const formSchema = z.object({
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
  accountDetails: {
    generalInfos: {
      label: string;
      name?: string;
      value: string;
      needed: boolean;
      editable: boolean;
    }[];
    billingInfos: {
      label: string;
      name: string;
      value: string;
      needed: boolean;
      editable: boolean;
    }[];
  };
}

const FormDetails = ({ accountDetails }: FormDetailsProps) => {

  const [isLoading, setIsLoading] = useState(false);

  const detailsCache = useRef({
    general: {
      username: accountDetails.generalInfos[0].value,
    },
    payment: {
      firstName: accountDetails.billingInfos[0].value,
      lastName: accountDetails.billingInfos[1].value,
      address1: accountDetails.billingInfos[2].value,
      address2: accountDetails.billingInfos[3].value,
      city: accountDetails.billingInfos[4].value,
      state: accountDetails.billingInfos[5].value,
      postalCode: accountDetails.billingInfos[6].value,
      country: accountDetails.billingInfos[7].value
    }
  });
  const router = useRouter();  

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),  
    defaultValues: {
      general: {
        username: accountDetails.generalInfos[0].value,
      },
      payment: {
        firstName: accountDetails.billingInfos[0].value,
        lastName: accountDetails.billingInfos[1].value,
        address1: accountDetails.billingInfos[2].value,
        address2: accountDetails.billingInfos[3].value,
        city: accountDetails.billingInfos[4].value,
        state: accountDetails.billingInfos[5].value,
        postalCode: accountDetails.billingInfos[6].value,
        country: accountDetails.billingInfos[7].value
      }
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    
    setIsLoading(true);
  
    if (JSON.stringify(values) === JSON.stringify(detailsCache.current)) {
      toast.info("Aucun changement n'a été effectué.");
      setIsLoading(false);
      return;
    }

    updateDetailsAccount(values);
    detailsCache.current = values;
    toast.success("Vos informations ont été mises à jour.");
    setIsLoading(false);
    router.refresh();
  }

  return ( 
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold text-gray-50">
            Général
          </h2>
          <div className="mt-5 flex flex-col gap-5">
            {accountDetails.generalInfos.map((item) => (
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
            {accountDetails.billingInfos.map((item) => (
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
              ))}
          </div>
        </div>
        <div className="mt-5 flex items-center justify-end">
          <Button type="submit" disabled={isLoading} className={isLoading ? "text-gray-300 bg-torea-800/75 pointer-events-none" : ""}>
            {isLoading 
              ?
                <>
                  <LoaderCircle className=" animate-spin " />
                  {/* <span>Loading...</span> */}
                </>
              : "Sauvegarder"}
          </Button>
        </div>
      </form>
    </Form>
   );
}

 
export default FormDetails;