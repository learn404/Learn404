import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-04-10",
});

// POST /api/webhook
export async function POST(req: NextRequest) {

  const payload = await req.text();
  const res = JSON.parse(payload);
  const sig = req.headers.get("Stripe-Signature") as string;
  const datetime =  new Date(res?.created * 1000).toLocaleString();

  try {
    
    let event = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET!)
    if (event.type === "charge.succeeded") {
      // Add user to database
      console.log(`Stripe webhook received: ${event.type} at ${datetime}`);
      
      const userEmail = event.data.object.billing_details.email as string;
      console.log("USER EMAIL: ", userEmail);

      await prisma.user.update({
        where: {
          email: userEmail,
        },
        data: {
          isMember: true,
        }
      })
  
    }

    return NextResponse.json({ event: event.type, status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
