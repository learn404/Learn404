import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-04-10",
});

// POST /api/webhook
export async function POST(req: NextRequest) {

  const payload = await req.text();
  const sig = req.headers.get("Stripe-Signature") as string;

  try {
    
    let event = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET!)
    if (event.type === "charge.succeeded") {
      const billingDetails = event.data.object.billing_details;
      const fullNameSplit = billingDetails.name?.split(" ");
      
      const user = await prisma.user.update({
        where: {
          email: billingDetails.email!,
        },
        data: {
          isMember: true,
        }
      })
      
      await prisma.billingInformations.create({
        data: {
          userId: user.id,
          firstName: fullNameSplit![0],
          lastName: fullNameSplit![1],
          address: billingDetails.address?.line1 || "",
          address2: billingDetails.address?.line2 || "",
          city: billingDetails.address?.city || "",
          country: billingDetails.address?.country || "",
          zip: billingDetails.address?.postal_code || "",
          state: billingDetails.address?.state || "",
        }
      })
    }

    return NextResponse.json({ event: event.type, status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
