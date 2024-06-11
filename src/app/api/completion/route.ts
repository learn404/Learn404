import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {  

  try {

    const { payment_intent, payment_intent_client_secret } = await req.json();

    if (!payment_intent || !payment_intent_client_secret) {
      throw new Error("Missing payment_intent or payment_intent_client_secret");
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: "2024-04-10",
    });

    const response = await stripe.paymentIntents.retrieve(payment_intent);
    
    return NextResponse.json({ response }, {status: 200});
  } catch (error: any) {
   
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

}