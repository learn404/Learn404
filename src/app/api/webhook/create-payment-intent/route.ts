import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

type PaymentInformations = {
  basePrice: number,
  basePriceFormated: string,
  finalPrice: number,
  finalPriceFormated: string,
  currency: string;
  promo: number;
  code?: string;
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-04-10",
});

export async function POST(req: NextRequest) {
  
  try {

    let paymentInformations: PaymentInformations = {
      basePrice: 19.99,
      basePriceFormated: "EUR 19.99",
      finalPrice: 19.99,
      finalPriceFormated: "EUR 19.99",
      promo: 0,
      currency: "eur",
    };

    const { email, code } = await req.json();
    
    // If the code is not empty, check if it is valid
    if (code && code !== "") {
      const promotion = await stripe.promotionCodes.list({
        code,
      });      

      // If the promotion code is not valid, return an error
      if (promotion.data.length === 0) {
        return NextResponse.json({ success: false, error: "The promotion code is not valid." });
      }

      // If the promotion code is valid, we apply the discount
      paymentInformations.promo = promotion.data[0].coupon.percent_off as number;
      
      // Calculate the final price
      paymentInformations.finalPrice = Number((paymentInformations.basePrice - (paymentInformations.promo / 100 * paymentInformations.basePrice)).toFixed(2));  
      paymentInformations.finalPriceFormated = `${paymentInformations.currency.toUpperCase()} ${paymentInformations.finalPrice}`;

      // Set the promotion code
      paymentInformations.code = code;
    }    
    
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(paymentInformations.finalPrice * 100),
      currency: paymentInformations.currency,
      receipt_email: email,
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional
      // because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({ 
      success: true,
      clientSecret: paymentIntent.client_secret,
      fullPrice: paymentInformations,
     });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message});
  }
}
