import { NextRequest, NextResponse } from "next/server";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-04-10",
});

export async function POST(req: NextRequest) {

  try {
    
    const { codePromo } = await req.json();

    const promotionsCode = await stripe.promotionCodes.list({
      code: codePromo
    })
    
    return NextResponse.json({ isCodePromoValid: promotionsCode.data.length > 0, percent_off: promotionsCode.data[0]?.coupon.percent_off });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
} 