import prisma from "@/lib/prisma";

export async function getBillingInformations(userId: string) {
  try {

    const billingInformation = await prisma.billingInformations.findUnique({
      where: {
        userId: userId
      }
    })

    return billingInformation;
  } catch (error) {
    return { error: "Une erreur est survenue" };
  }
}