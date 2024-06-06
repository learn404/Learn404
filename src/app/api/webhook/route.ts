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
    
    let event = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET as string);

    if (event.type === "charge.succeeded") {
      // Add user to database
      console.log("AJOUTER L'UTILISATEUR DANS LA BASE DE DONNEES");
    }

    console.log(`Stripe webhook received: ${event.type} at ${datetime}`);
    
    return NextResponse.json({ event: event.type, status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
