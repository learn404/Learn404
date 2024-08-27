"use server";

import { currentUser } from "@/lib/current-user";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { formSchema } from "../account/details/form-details";
import { getBillingInformations } from "./get-billing-informations";

export async function updateDetailsAccount(values: z.infer<typeof formSchema>) {

  try {
    const { user } = await currentUser();
    
    if (!user) {
      return { error: "Utilisateur non trouvé." };
    }

    if (user.name !== values.general.username) {
      await prisma.user.update({
        where: {
          id: user?.id
        },
        data: {
          name: values.general.username
        }
      })

      console.log("Nom utilisateur mis à jour.");
      
    }
    

    const detailsAccount = await getBillingInformations(user?.id);

    // Situation qui ne devrait pas arriver si le webhook est correctement configuré
    if (!detailsAccount && !detailsAccount) {
      await prisma.billingInformations.create({
        data: {
          firstName: values.payment.firstName,
          lastName: values.payment.lastName,
          address: values.payment.address1,
          address2: values.payment.address2,
          city: values.payment.city,
          state: values.payment.state,
          zip: values.payment.postalCode,
          country: values.payment.country,
          updatedAt: new Date(),
          user: {
            connect: {
              id: user?.id
            }
          }
        }
      })

    } else {
      // Update user details
      await prisma.billingInformations.update({
        where: {
          userId: user?.id
        },
        data: {
          firstName: values.payment.firstName,
          lastName: values.payment.lastName,
          address: values.payment.address1,
          address2: values.payment.address2,
          city: values.payment.city,
          state: values.payment.state,
          zip: values.payment.postalCode,
          country: values.payment.country,
          updatedAt: new Date()
        }
      })
    }

    return { success: "Details utilisateur mis à jour." };
  } catch (error: any) {
    return { error: error?.message };
  }
}