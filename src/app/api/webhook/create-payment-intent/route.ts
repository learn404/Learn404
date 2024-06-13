import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-04-10",
});


export async function POST(req: NextRequest) {
  try {
    
    const { email } = await req.json();    

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 599,
      currency: "eur",
      receipt_email: email,
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional
      // because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });
    
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }



};